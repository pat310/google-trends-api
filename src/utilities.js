'use strict';
import cheerio from 'cheerio';
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

export function getResults(searchType, obj) {
  const map = {
    'interestByRegion': {
      path: '/trends/api/widgetdata/multiline',
      pos: 0,
    },
    'interestOverTime': {
      path: '/trends/api/widgetdata/comparedgeo',
      pos: 1,
      resolution: formatResolution(obj.resolution),
    },
    'relatedQueries': {
      path: '/trends/api/widgetdata/relatedsearches',
      pos: 2,
    },
    'relatedTopics': {
      path: '/trends/api/widgetdata/relatedsearches',
      pos: 3,
    },
  };

  const options = {
    host: 'www.google.com',
    method: 'GET',
    path: '/trends/api/explore',
    qs: {
      hl: obj.hl,
      req: JSON.stringify({comparisonItem: [obj], cat: 0}),
      tz: 300,
    },
  };

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
      host: 'www.google.com',
      qs: {
        hl: obj.hl,
        req,
        token,
        tz: 300,
      },
    };

    return request(nextOptions);
  })
  .then((res) => {
    return res.slice(5);
  });

};

export function login(email, password) {
  const options = {
    host: 'accounts.google.com',
    method: 'GET',
    path: '/ServiceLogin',
  };

  const authOptions = {
    host: 'accounts.google.com',
    method: 'POST',
    path: '/ServiceLoginAuth',
  };

  request(options)
  .then((results) => {
    const $ = cheerio.load(results);

    console.log($('form').serializeArray());
    // console.log('these are the results', results);
  });

  // "https://accounts.google.com/ServiceLogin"
  // "https://accounts.google.com/ServiceLoginAuth"
};
