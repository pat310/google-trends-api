'use strict';
const rp = require('request-promise');

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

export function constructObj(args) {

  let obj = args[0];

  if (!obj || !!obj && typeof obj !== 'object' || Array.isArray(obj)) {
    obj = new Error('Must supply an object');
  } else if (!obj.keyword) obj = new Error('Must have a keyword field');

  let cbFunc = typeof args[0] === 'function' ? args[0] : args[1];

  if (!!cbFunc && typeof cbFunc !== 'function') {
    obj = new Error('Callback function must be a function');
  }

  if (!cbFunc) {
    console.log('creating callback!!!!!!!!!!!!!')
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

export function getResults(searchType, obj) {
  const map = {
    'interest over time': {
      uri: 'https://www.google.com/trends/api/widgetdata/multiline',
      pos: 0,
    },
    'interest by region': {
      uri: 'https://www.google.com/trends/api/widgetdata/comparedgeo',
      pos: 1,
    },
    'related topics': {
      uri: 'https://www.google.com/trends/api/widgetdata/relatedsearches',
      pos: 2,
    },
    'related queries': {
      uri: 'https://www.google.com/trends/api/widgetdata/relatedsearches',
      pos: 3,
    },
  };

  const options = {
    method: 'GET',
    uri: 'https://www.google.com/trends/api/explore',
    qs: {
      hl: 'en-US',
      req: JSON.stringify({comparisonItem: [obj], cat: 0}),
      tz: 360,
    },
  };

  return rp(options)
  .then((results) => {
    const parsedResults = JSON.parse(results.slice(4)).widgets;
    const req = JSON.stringify(parsedResults[map[searchType].pos].request);
    const token = parsedResults[map[searchType].pos].token;
    const nextOptions = {
      method: 'GET',
      uri: map[searchType].uri,
      qs: {
        req,
        token,
        tz: 360,
      },
    };

    return rp(nextOptions);
  })
  .then((res) => {
    return res.slice(5);
  });

};
