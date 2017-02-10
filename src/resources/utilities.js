'use strict';
const rp = require('request-promise');

exports.constructObj = function(obj) {
  return obj;
};

exports.getResults = function(searchType, obj) {
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
      tz: 360,
      req: JSON.stringify({comparisonItem: [obj], cat: 0}),
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

}