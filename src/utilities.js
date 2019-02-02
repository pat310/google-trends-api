'use strict';
export function isLessThan7Days(date1, date2) {
  return (Math.abs(date2 - date1) / (24 * 60 * 60 * 1000)) < 7;
}

export function convertDateToString(d, shouldIncludeTime, formatWithoutDashes) {
  let month = (d.getUTCMonth() + 1).toString();
  let day = d.getUTCDate().toString();

  const dash = formatWithoutDashes ? '' : '-';

  month = month.length < 2 ? '0' + month : month;
  day = formatWithoutDashes && day.length < 2 ? '0' + day : day;

  const year = d.getUTCFullYear().toString();
  const hour = d.getUTCHours();
  const minute = d.getUTCMinutes();

  if (shouldIncludeTime) {
    return `${year}${dash}${month}${dash}${day}T${hour}\\:${minute}\\:00`;
  }

  return `${year}${dash}${month}${dash}${day}`;
}

export function formatTime(obj) {
  if (obj.startTime && obj.endTime && obj.startTime > obj.endTime) {
    const temp = obj.startTime;

    obj.startTime = obj.endTime;
    obj.endTime = temp;
  }

  if (!obj.endTime) obj.endTime = new Date();
  if (!obj.startTime) obj.startTime = new Date('2004-01-01');

  const shouldIncludeTime = isLessThan7Days(obj.startTime, obj.endTime);

  const startTime = convertDateToString(obj.startTime,
    shouldIncludeTime && obj.granularTimeResolution);
  const endTime = convertDateToString(obj.endTime,
    shouldIncludeTime && obj.granularTimeResolution);

  obj.time = `${startTime} ${endTime}`;
  return obj;
}

function validateGeo(obj) {
  const multiGeoKeyword = Array.isArray(obj.geo) && Array.isArray(obj.keyword);

  if (multiGeoKeyword && obj.geo.length !== obj.keyword.length) {
    return new Error('Geo length must be equal to keyword length');
  }

  return obj;
}

function validateTime(obj) {
  if (obj.startTime && !(obj.startTime instanceof Date)) {
    obj = new Error('startTime must be a Date object');
  }

  if (obj.endTime && !(obj.endTime instanceof Date)) {
    obj = new Error('endTime must be a Date object');
  }

  return obj;
}

const invalidCb = cb => !!cb && typeof cb !== 'function';

function validateObj(obj, cbFunc) {
  if (!obj) {
    obj = new Error('Must supply an object');
  } else if (!!obj && typeof obj !== 'object' || Array.isArray(obj)) {
    obj = new Error('Must supply an object');
  } else if (!obj.keyword) {
    obj = new Error('Must have a keyword field');
  }

  if (invalidCb(cbFunc)) {
    obj = new Error('Callback function must be a function');
  }

  obj = validateGeo(obj);
  obj = validateTime(obj);

  return obj;
}

/**
 * Validates the obj and callback
 * and sets defaults for anything that haven't been supplied
 * @param {Object} obj - the object with .keyword property
 * @param {Function} cb - an optional callback function
 * @return {Object} - object with decorated obj and cbFunc properties
 */
export function constructInterestObj(obj, cbFunc) {

  if (typeof obj === 'function') cbFunc = obj;

  obj = validateObj(obj, cbFunc);

  if (!obj.hl) obj.hl = 'en-US';
  if (!obj.category) obj.category = 0;
  if (!obj.timezone) obj.timezone = new Date().getTimezoneOffset();

  const possibleProperties = ['images', 'news', 'youtube', 'froogle', ''];

  if (possibleProperties.indexOf(obj.property) === -1) {
    obj.property = '';
  }

  if (!cbFunc) {
    cbFunc = (err, res) => {
      if (err) return err;
      return res;
    };
  }

  obj = formatTime(obj);

  return {
    cbFunc,
    obj,
  };
}

export function formatResolution(resolution = '') {
  const resolutions = ['COUNTRY', 'REGION', 'CITY', 'DMA'];
  const isResValid = resolutions.some((res) => {
    return res === resolution.toUpperCase();
  });

  if (isResValid) return resolution.toUpperCase();
  return '';
}

/**
 * Parse the result of the google api as JSON
 * Throws an Error if the JSON is invalid
 * @param  {String} results
 * @return {Object}
 */
export function parseResults(results) {
  // If this fails, you've hit the rate limit or Google has changed something
  try {
    return JSON.parse(results.slice(4)).widgets;
  } catch (e) {
    // Throw the JSON error e.g.
    // { message: 'Unexpected token C in JSON at position 0',
    //   requestBody: '<!DOCTYPE html><html>...'}
    e.requestBody = results;
    throw e;
  }
}

/**
 * Create the array of comparisonItems to be used
 * @param  {Object} obj The query obj with .keyword property and optionally
 *                      the .geo property
 * @return {Array}     Returns an array of comparisonItems
 */
export function formatComparisonItems(obj) {
  const isMultiRegion = obj.geo && Array.isArray(obj.geo);
  let isMultiKeyword = Array.isArray(obj.keyword);

  // Duplicate keywords to match the length of geo
  if (isMultiRegion && !isMultiKeyword) {
    obj.keyword = Array(obj.geo.length).fill(obj.keyword);
    isMultiKeyword = true;
  }

  // If we are requesting an array of keywords for comparison
  if (isMultiKeyword) {

    // Map the keywords to the items array
    let items = obj.keyword.reduce((arr, keyword) => {
      // Add the keyword to the array
      arr.push({ ...obj, keyword });

      return arr;
    }, []);

    // Is there an array of regions as well?
    if (isMultiRegion) {

      obj.geo.forEach((region, index) => {
        items[index].geo = region;
      });
    }

    return items;
  }

  return [obj];
}

export function getInterestResults(request) {
  return (searchType, obj) => {
    const map = {
      'Auto complete': {
        path: `/trends/api/autocomplete/${encodeURIComponent(obj.keyword)}`,
      },
      'Interest over time': {
        path: '/trends/api/widgetdata/multiline',
        _id: 'TIMESERIES',
      },
      'Interest by region': {
        path: '/trends/api/widgetdata/comparedgeo',
        resolution: formatResolution(obj.resolution),
        _id: 'GEO_MAP',
      },
      'Related topics': {
        path: '/trends/api/widgetdata/relatedsearches',
        _id: 'RELATED_TOPICS',
      },
      'Related queries': {
        path: '/trends/api/widgetdata/relatedsearches',
        _id: 'RELATED_QUERIES',
      },
    };

    const options = {
      method: 'GET',
      host: 'trends.google.com',
      path: '/trends/api/explore',
      qs: {
        hl: obj.hl,
        req: JSON.stringify({
          comparisonItem: formatComparisonItems(obj),
          category: obj.category,
          property: obj.property,
        }),
        tz: obj.timezone,
      },
    };

    if (obj.agent) options.agent = obj.agent;

    const { path, resolution, _id } = map[searchType];

    return request(options)
    .then((results) => {
      const parsedResults = parseResults(results);

      /**
       * Search for the id that matches the search result
       * Auto complete does not have results on initial query
       * so just pass the first available result with request
      */
      const resultObj = parsedResults.find(({ id = '', request }) => {
        return id.indexOf(_id) > -1 ||
          (searchType === 'Auto complete' && request);
      });

      if (!resultObj) {
        const errObj = {
          message: 'Available widgets does not contain selected api type',
          requestBody: results,
        };

        throw errObj;
      }

      let req = resultObj.request;
      const token = resultObj.token;

      if (resolution) req.resolution = resolution;
      req.requestOptions.category = obj.category;
      req.requestOptions.property = obj.property;
      req = JSON.stringify(req);

      const nextOptions = {
        path,
        method: 'GET',
        host: 'trends.google.com',
        qs: {
          hl: obj.hl,
          req,
          token,
          tz: obj.timezone,
        },
      };

      if (obj.agent) nextOptions.agent = obj.agent;

      return request(nextOptions);
    })
    .then((res) => {
      try {
        /** JSON.parse will decode unicode */
        const results = JSON.stringify(JSON.parse(res.slice(5)));

        return results;
      } catch (e) {
        /** throws if not valid JSON, so just return unaltered res string */
        return res;
      }
    });
  };
}

export function getTrendingResults(request) {
  return (searchType, obj) => {
    const searchTypeMap = {
      'Daily trends': {
        path: '/trends/api/dailytrends',
        extraParams: {
          ed: convertDateToString(obj.trendDate, false, true),
          ns: obj.ns,
        },
      },
      'Real time trends': {
        path: '/trends/api/realtimetrends',
        extraParams: {
          fi: 0,
          fs: 0,
          ri: 300, // # of trending stories IDs returned
          rs: 20,
          sort: 0,
        },
      },
    };

    const options = {
      method: 'GET',
      host: 'trends.google.com',
      path: searchTypeMap[searchType].path,
      qs: {
        hl: obj.hl,
        tz: obj.timezone,
        geo: obj.geo,
        cat: obj.category,
      },
    };

    if (obj.agent) options.agent = obj.agent;

    options.qs = {...options.qs, ...searchTypeMap[searchType].extraParams};

    return request(options)
    .then((res) => {
      try {
        /** JSON.parse will decode unicode */
        return JSON.stringify(JSON.parse(res.slice(5)));
      } catch (e) {
        /** throws if not valid JSON, so just return unaltered res string */
        return res;
      }
    });
  };
}

export function constructTrendingObj(obj, cbFunc) {
  if (typeof obj === 'function') cbFunc = obj;

  if (!obj || !!obj && typeof obj !== 'object' || Array.isArray(obj)) {
    obj = new Error('Must supply an object');
  } else {
    if (!obj.trendDate || !(obj.trendDate instanceof Date)) {
      delete obj.trendDate;
    }

    const date = new Date();
    const defaults = { hl: 'en-US',
                      category: 'all',
                      timezone: date.getTimezoneOffset(),
                      trendDate: date,
                      ns: 15,
                    };

    obj = { ...defaults, ...obj }; // Merge user params into obj with defaults
  }

  if (invalidCb(cbFunc)) {
    obj = new Error('Callback function must be a function');
  }

  if (!obj.geo) {
    obj = new Error('Must supply an geographical location (geo)');
  }

  if (!cbFunc) {
    cbFunc = (err, res) => {
      if (err) return err;
      return res;
    };
  }

  return {
    cbFunc,
    obj,
  };
}
