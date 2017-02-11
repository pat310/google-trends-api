'use strict';
const rp = require('request-promise');

export function todaysDate() {
  const d = new Date();
  let month = (d.getMonth() + 1).toString();

  month = month.length < 2 ? '0' + month : month;
  const day = d.getDate().toString();
  const year = d.getFullYear().toString();

  return `${year}-${month}-${day}`;
};

export function constructObj(args) {
  let cbFunc;
  let obj;

  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'object') obj = args[i];
    else if (typeof args[i] === 'function') cbFunc = args[i];
  }

  if (!cbFunc) {
    cbFunc = (err, res) => {
      if (err) return err;
      return res;
    };
  }

  if (!obj) obj = new Error('Must supply an object');
  if (!obj.keyword) obj = new Error('Must have a keyword');
  if (!obj.time) obj.time = `2004-01-01 ${todaysDate()}`;

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
