'use strict';
import request from './request';

export function isLessThan7Days(date1, date2) {
  return (Math.abs(date2 - date1) / (24 * 60 * 60 * 1000)) < 7;
};

export function convertDateToString(d, shouldIncludeTime) {
  let month = (d.getUTCMonth() + 1).toString();

  month = month.length < 2 ? '0' + month : month;
  const day = d.getUTCDate().toString();
  const year = d.getUTCFullYear().toString();
  const hour = d.getUTCHours();
  const minute = d.getUTCMinutes();

  if (shouldIncludeTime) {
    return `${year}-${month}-${day}T${hour}\\:${minute}\\:00`;
  }

  return `${year}-${month}-${day}`;
};

export function formatTime(obj) {
  if (obj.startTime && !(obj.startTime instanceof Date)) {
    return new Error('startTime must be a Date object');
  }
  if (obj.endTime && !(obj.endTime instanceof Date)) {
    return new Error('endTime must be a Date object');
  }

  if (obj.startTime && obj.endTime && obj.startTime > obj.endTime) {
    const temp = obj.startTime;

    obj.startTime = obj.endTime;
    obj.endTime = temp;
  }

  if (!obj.endTime) obj.endTime = new Date();
  if (!obj.startTime) obj.startTime = new Date('2004-01-01');

  const shouldIncludeTime = isLessThan7Days(obj.startTime, obj.endTime);

  const startTime = convertDateToString(obj.startTime, shouldIncludeTime);
  const endTime = convertDateToString(obj.endTime, shouldIncludeTime);

  obj.time = `${startTime} ${endTime}`;
  return obj;
};

export function constructObj(obj, cbFunc) {
  if (typeof obj === 'function') cbFunc = obj;

  if (!obj || !!obj && typeof obj !== 'object' || Array.isArray(obj)) {
    obj = new Error('Must supply an object');
  } else if (!obj.keyword) obj = new Error('Must have a keyword field');

  if (!!cbFunc && typeof cbFunc !== 'function') {
    obj = new Error('Callback function must be a function');
  }

  if (!obj.hl) obj.hl = 'en-US';

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
};

export function formatResolution(resolution = '') {
  const resolutions = ['COUNTRY', 'REGION', 'CITY', 'DMA'];
  const isResValid = resolutions.some((res) => {
    return res === resolution.toUpperCase();
  });

  if (isResValid) return resolution.toUpperCase();
  return '';
}

export function getResults(searchType, obj, cookie) {
  const map = {
    'interest over time': {
      path: '/trends/api/widgetdata/multiline',
      pos: 0,
    },
    'interest by region': {
      path: '/trends/api/widgetdata/comparedgeo',
      pos: 1,
      resolution: formatResolution(obj.resolution),
    },
    'related topics': {
      path: '/trends/api/widgetdata/relatedsearches',
      pos: 2,
    },
    'related queries': {
      path: '/trends/api/widgetdata/relatedsearches',
      pos: 3,
    },
  };

// 'https://trends.google.com/trends/api/explore?hl=en-US&amp;req={"comparisonItem":[{"keyword":"pig","startTime":"2017-02-06T00:00:00.000Z","endTime":"2017-02-07T00:00:00.000Z","hl":"en-US","time":"2017-02-6T0\\:0\\:00 2017-02-7T0\\:0\\:00"}],"cat":0}&amp;tz=300'

  const options = {
    method: 'GET',
    host: 'trends.google.com',
    path: '/trends/api/explore',
    qs: {
      hl: obj.hl,
      req: JSON.stringify({comparisonItem: [obj], cat: 0}),
      tz: 300,
    },
  };

  if (cookie) options.cookie = cookie;
  const {pos, path, resolution} = map[searchType];

  return request(options)
  .then((results) => {
    const parsedResults = JSON.parse(results.slice(4)).widgets;
    let req = parsedResults[pos].request;

    if (resolution) req.resolution = resolution;
    req = JSON.stringify(req);
    const token = parsedResults[pos].token;
    const nextOptions = {
      path,
      method: 'GET',
      host: 'trends.google.com',
      qs: {
        hl: obj.hl,
        req,
        token,
        tz: 300,
      },
    };

    if (cookie) nextOptions.cookie = cookie;

    return request(nextOptions);
  })
  .then((res) => {
    return res.slice(5);
  });

};
