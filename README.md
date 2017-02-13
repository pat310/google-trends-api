#google-trends-api

[![NPM](https://nodei.co/npm/google-trends-api.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/google-trends-api/)

[![npm version](https://badge.fury.io/js/google-trends-api.svg)](https://badge.fury.io/js/google-trends-api)
[![Build status](https://img.shields.io/travis/pat310/google-trends-api.svg?style=flat-square)](https://travis-ci.org/pat310/google-trends-api/)
[![Coverage Status](https://coveralls.io/repos/github/pat310/google-trends-api/badge.svg?branch=master)](https://coveralls.io/github/pat310/google-trends-api?branch=master)
[![Code Climate](https://codeclimate.com/github/pat310/google-trends-api/badges/gpa.svg)](https://codeclimate.com/github/pat310/google-trends-api)
[![Dependency Status](https://img.shields.io/david/pat310/google-trends-api.svg?style=flat-square)](https://david-dm.org/pat310/google-trends-api)
[![Known Vulnerabilities](https://snyk.io/test/github/pat310/google-trends-api/badge.svg)](https://snyk.io/test/github/pat310/google-trends-api)

##v3 to v4
[Big changes](/CHANGES.md)!  The old google-trends endpoints are deprecated and are heavily throttled so this library has changed significantly.  You can choose to download the old version via `npm install google-trends-api@3.0.2` but it is discouraged.

##Introduction
This library provides an API layer to [google trends](https://www.google.com/trends/) data.  It is constantly being expanded and improved so please check back frequently.  Also, please feel free to contribute to make the library even better! :dog:

###Syntax
```js
const googleTrends = require('google-trends-api');

googleTrends.apiMethod(optionsObject, [callback])
```

####Parameters
**optionsObject**
An object with the following options keys:
* **keyword** Target search term (string) **required**
* **startTime** Start of time period of interest (`new Date()` object).  If `startTime` is not provided, a date of January 1, 2004 is assumed (this is the oldest available google trends data)
* **endTime** End of time period of interest (`new Date()` object). If `endTime` is not provided, the current date is selected.
* **geo** Location of interest (string).
* **resolution** Granularity of the geo search (enumerated string ['COUNTRY', 'REGION', 'CITY', 'DMA']).  `resolution` is specific to the [interestByRegion](#interestByRegion) method.

**callback**
Optional callback function where the first parameter is an error and the second parameter is the result.  If no callback is provided, then a promise is returned.

##Table of contents
* [Installation](#installation)
* [API](#api)
  * [Promises](#promises)
  * [Callbacks](#callbacks)
  * [Examples](#examples)
  * [API Methods](#api-methods)
    * [interestOverTime](#interestOverTime)
    * [interestByRegion](#interestByRegion)
    * [relatedQueries](#relatedQueries)
    * [relatedTopics](#relatedTopics)
* [Big Thanks](#big-thanks)

<hr>

## Installation
To install this package, clone this git repository and include it in your project's node_modules or simply:

```
npm install google-trends-api
```

Require google-trends-api in your script and give it a variable name:

```js
const googleTrends = require('google-trends-api');
```

You will now be able to access methods on `googleTrends`.  See the [API Methods section](#api-methods) below to see the methods available and their syntax.

[back to top](#introduction)

<hr>

## API

### Promises
By default, all the API's return a promise for the results.  Example:
```js
googleTrends.interestOverTime({keyword: 'Women\'s march'})
.then(function(results){
  console.log('These results are awesome', results);
})
.catch(function(err){
  console.error('Oh no there was an error', err);
});
```

### Callbacks
All API methods can alternatively take a callback function as the second parameter.  For example:
```js
googleTrends.interestOverTime({keyword: 'Women\'s march'}, function(err, results){
  if(err) console.error('there was an error!', err);
  else console.log('my sweet sweet results', results);
})
```

### Examples
There are examples available for each API method in the root directory of the module.  **Note:** Each example in [examples.js](/examples.js) need to be uncommented.

### API Methods
The following API methods are available:
* [trendData](#trenddata): returns the historical trend data to a provided keyword or an array of keywords - optionally accepts a `timePeriod` object
* [topRelated](#toprelated): returns terms that are most frequently searched with the term(s) you entered in the same search session, within the chosen category (optional) and country (optional). If you didn't enter a search term, top searches overall are shown.
* [risingSearches](#risingsearches): returns terms that were searched for with the term you entered (or overall, if no keyword was entered), which had the most significant growth in volume in the requested time period. For each rising search term, you’ll see a percentage of the term’s growth compared to the previous time period. If you see “Breakout” instead of a percentage, it means that the search term grew by more than 5000%.
* [hotTrends](#hottrends): returns the current top 20 trending searches for a given location.

[back to top](#introduction)

<hr>

#### trendData()
*Returns the historical trend data to a provided keyword or an array of keywords.*

#####Syntax
`googleTrends.trendData(['keywords'], {type: 'string', value: number})`

* `['keywords']` - either an array of keywords as strings or a string with one keyword.  If keywords is an array, the results will be returned in an array of the same order as the input.  Entering a keyword is **required**.

* `{type: 'string', value: number}` - the `timePeriod` object that must be formatted with keys `type` (which is an enumerated string of either 'hour', 'day', 'month', or 'year') and `value` (which is a number).  Entering a `timePeriod` is optional.  If no `timePeriod` object is provided, by default all past trend data will be returned, otherwise trend data for the given time period will be returned.

#####Example
The following example provides the historical trend data for 'OJ Simpson'.  Optionally, the input could have been provided as `googleTrends.trendData({keywords: 'OJ Simpson'})`.

######Input
```js
googleTrends.trendData('OJ Simpson')
.then(function(results){
  console.log(results);
})
.catch(function(err){
  console.error(err);
});
```

######Output
```js
[ { query: 'oj simpson',
    values:
     [ { date: '2003-12-01T05:00:00.000Z', value: 4 },
       { date: '2004-01-01T05:00:00.000Z', value: 4 },
       { date: '2004-02-01T05:00:00.000Z', value: 3 },
       { date: '2004-03-01T05:00:00.000Z', value: 4 },
       { date: '2004-04-01T05:00:00.000Z', value: 5 },
       { date: '2004-05-01T04:00:00.000Z', value: 7 },
       { date: '2004-06-01T04:00:00.000Z', value: 2 },
       { date: '2004-07-01T04:00:00.000Z', value: 2 },
       { date: '2004-08-01T04:00:00.000Z', value: 2 },
       { date: '2004-09-01T04:00:00.000Z', value: 4 },
       { date: '2004-10-01T04:00:00.000Z', value: 4 },
       { date: '2004-11-01T05:00:00.000Z', value: 3 },
       { date: '2004-12-01T05:00:00.000Z', value: 3 },
       ... more items ] } ]
```

#####Example
The following example provides the historical trend data for 'swimming' and the 'olympics'.  Optionally, the input could have been provided as `googleTrends.trendData({keywords: ['swimming', 'olympics']})`.

######Input
```js
googleTrends.trendData(['swimming', 'olympics'])
.then(function(results){
  console.log(results);
})
.catch(function(err){
  console.error(err);
});
```

######Output
```js
[ { query: 'swimming',
    values:
     [ { date: '2003-12-01T05:00:00.000Z', value: 7 },
       { date: '2004-01-01T05:00:00.000Z', value: 7 },
       { date: '2004-02-01T05:00:00.000Z', value: 7 },
       { date: '2004-03-01T05:00:00.000Z', value: 7 },
       { date: '2004-04-01T05:00:00.000Z', value: 8 },
       { date: '2004-05-01T04:00:00.000Z', value: 9 },
       { date: '2004-06-01T04:00:00.000Z', value: 10 },
       { date: '2004-07-01T04:00:00.000Z', value: 11 },
       { date: '2004-08-01T04:00:00.000Z', value: 7 },
       { date: '2004-09-01T04:00:00.000Z', value: 6 },
       { date: '2004-10-01T04:00:00.000Z', value: 5 },
       { date: '2004-11-01T05:00:00.000Z', value: 4 },
       { date: '2004-12-01T05:00:00.000Z', value: 6 },
       { date: '2005-01-01T05:00:00.000Z', value: 6 },
       { date: '2005-02-01T05:00:00.000Z', value: 6 },
       ... more items ] },
  { query: 'olympics',
    values:
     [ { date: '2003-12-01T05:00:00.000Z', value: 3 },
       { date: '2004-01-01T05:00:00.000Z', value: 4 },
       { date: '2004-02-01T05:00:00.000Z', value: 4 },
       { date: '2004-03-01T05:00:00.000Z', value: 4 },
       { date: '2004-04-01T05:00:00.000Z', value: 5 },
       { date: '2004-05-01T04:00:00.000Z', value: 5 },
       { date: '2004-06-01T04:00:00.000Z', value: 8 },
       { date: '2004-07-01T04:00:00.000Z', value: 66 },
       { date: '2004-08-01T04:00:00.000Z', value: 8 },
       { date: '2004-09-01T04:00:00.000Z', value: 3 },
       { date: '2004-10-01T04:00:00.000Z', value: 3 },
       ... more items ] } ]
```

#####Example
The following example provides the historical trend data for 'OJ Simpson' for the past 5 days.  Optionally, the input could have been provided as `googleTrends.trendData('OJ Simpson', {type: 'day', value: 5})`.

######Input
```js
googleTrends.trendData({keywords: 'Oj Simpson', timePeriod: {type: 'day', value: 5}})
.then(function(results){
  console.log(results);
})
.catch(function(err){
  console.error(err);
});
```

######Output
```js
[ { query: 'oj simpson',
    values:
     [ { date: '2016-10-17T21:00:00.000Z', value: 20 },
       { date: '2016-10-17T22:00:00.000Z', value: 18 },
       { date: '2016-10-17T23:00:00.000Z', value: 17 },
       { date: '2016-10-18T00:00:00.000Z', value: 23 },
       { date: '2016-10-18T01:00:00.000Z', value: 20 },
       { date: '2016-10-18T02:00:00.000Z', value: 22 },
       { date: '2016-10-18T03:00:00.000Z', value: 19 },
       { date: '2016-10-18T04:00:00.000Z', value: 15 },
       { date: '2016-10-18T05:00:00.000Z', value: 11 },
       { date: '2016-10-18T06:00:00.000Z', value: 8 },
       { date: '2016-10-18T07:00:00.000Z', value: 7 },
       { date: '2016-10-18T08:00:00.000Z', value: 7 },
       { date: '2016-10-18T09:00:00.000Z', value: 6 },
       { date: '2016-10-18T10:00:00.000Z', value: 7 },
       { date: '2016-10-18T11:00:00.000Z', value: 7 },
       { date: '2016-10-18T12:00:00.000Z', value: 10 },
       { date: '2016-10-18T13:00:00.000Z', value: 10 },
       { date: '2016-10-18T14:00:00.000Z', value: 10 },
       { date: '2016-10-18T15:00:00.000Z', value: 11 },
       { date: '2016-10-18T16:00:00.000Z', value: 13 },
       { date: '2016-10-18T17:00:00.000Z', value: 13 },
       { date: '2016-10-18T18:00:00.000Z', value: 18 },
       { date: '2016-10-18T19:00:00.000Z', value: 16 },
       { date: '2016-10-18T20:00:00.000Z', value: 16 },
       { date: '2016-10-18T21:00:00.000Z', value: 19 },
       { date: '2016-10-18T22:00:00.000Z', value: 33 },
       { date: '2016-10-18T23:00:00.000Z', value: 81 },
       { date: '2016-10-19T00:00:00.000Z', value: 100 },
       { date: '2016-10-19T01:00:00.000Z', value: 30 },
       ... more items ] } ]
```

[back to top](#introduction)

<hr>

#### topRelated()
*Returns terms that are most frequently searched with the term you entered in the same search session, within the chosen category (optional) and country (optional). If you didn't enter a search term, top searches overall are shown*

#####Syntax
`googleTrends.topRelated(['keywords'], {type: 'string', value: number}, 'country')`

* `['keywords']` - either an array of keywords as strings or a string with one keyword.  If keywords is an array, the results will be returned in an array of the same order as the input.  If no keyword is entered, top searches overall are shown

* `{type: 'string', value: number}` - the `timePeriod` object that must be formatted with keys `type` (which is an enumerated string of either 'hour', 'day', 'month', or 'year') and `value` (which is a number).  Entering a `timePeriod` is optional.  If no `timePeriod` object is provided, by default all past data will be used

* `country` - an optional string for the country.  Although the library can figure out the country from a formal name, it is preferred that the country is provided as a country code, for example, 'united states' should be provided as 'US', 'japan' should be provided as 'JP', etc.  If no country code is provided, 'US' is assumed by default

#####Example
The following example provides the top related keywords to 'dog house' in the 'US'.  Optionally, the input could have been provided as `googleTrends.topRelated({keywords: 'dog house', geo: 'US'})`.  Order of the keys does not matter.

######Input
```js
googleTrends.topRelated('dog house', 'US')
.then(function(results){
  console.log(results);
})
.catch(function(err){
  console.error(err);
});
```

######Output
```js
[ { 'the dog house': '100',
    'the house': '100',
    'house of dog': '50',
    'dog house plans': '15',
    'dog training': '15',
    'dog house training': '15',
    'house train dog': '15',
    'build dog house': '10',
    'best house dog': '10',
    'dog houses': '10' } ]
```

[back to top](#introduction)

<hr>

#### risingSearches()
*Returns terms that were searched for with the term you entered (or overall, if no keyword was entered), which had the most significant growth in volume in the requested time period. For each rising search term, you’ll see a percentage of the term’s growth compared to the previous time period. If you see “Breakout” instead of a percentage, it means that the search term grew by more than 5000%.*

#####Syntax
`googleTrends.risingSearches(['keywords'], {type: 'string', value: number}, 'country')`

* `['keywords']` - either an array of keywords as strings or a string with one keyword.  If keywords is an array, the results will be returned in an array of the same order as the input.  If no keyword is entered, top searches overall are shown

* `{type: 'string', value: number}` - the `timePeriod` object that must be formatted with keys `type` (which is an enumerated string of either 'hour', 'day', 'month', or 'year') and `value` (which is a number).  Entering a `timePeriod` is optional.  If no `timePeriod` object is provided, by default all past data will be used

* `country` - an optional string for the country.  Although the library can figure out the country from a formal name, it is preferred that the country is provided as a country code, for example, 'united states' should be provided as 'US', 'japan' should be provided as 'JP', etc.  If no country code is provided, 'US' is assumed by default

#####Example
The following example provides the top related keywords to 'dog house' in the 'US'.  Optionally, the input could have been provided as `googleTrends.risingSearches({keywords: 'dog house', geo: 'US'})`.  Order of the keys does not matter.

######Input
```js
googleTrends.risingSearches('dog house', 'US')
.then(function(results){
  console.log(results);
})
.catch(function(err){
  console.error(err);
});
```

######Output
```js
[ { 'little dog house': '+250%',
    'dog house grill': '+140%',
    'large dog house': '+90%',
    'best house dog': '+80%',
    'hot dog house': '+70%',
    'the dog house': '+70%',
    'the house': '+70%',
    'house of dog': '+50%',
    'house train dog': '+40%' } ]
```

[back to top](#introduction)

<hr>

#### hotTrends()
*Returns the current top 20 trending searches for a given location*

#####Syntax
`googleTrends.hotTrends('country')`

* `country` - an optional string for the country.  Although the library can figure out the country from a formal name, it is preferred that the country is provided as a country code, for example, 'united states' should be provided as 'US', 'japan' should be provided as 'JP', etc.  If no country code is provided, 'US' is assumed by default.

#####Example
The following example provides the top 20 trending searches in the 'US'.  Optionally, the input could have been provided as `googleTrends.hotTrends({geo: 'US'})`.  Any other keys provided in the object will be ignore.

######Input
```js
googleTrends.hotTrends('US')
.then(function(results){
  console.log(results);
})
.catch(function(err){
  console.log(err);
});
```

######Output
```js
[ 'Donald Drumpf',
  'Mark Ruffalo',
  'Ashley Graham',
  'Raspberry Pi 3',
  'Oscars 2016',
  'Why is there a leap day',
  'Brie Larson',
  'Alicia Vikander',
  'Mark Rylance',
  'Room',
  'Stacey Dash',
  'Mad Max Fury Road',
  'merkin',
  'Alejandro González Iñárritu',
  'Sam Smith',
  'The Big Short',
  'The Hateful Eight',
  'Jennifer Lawrence',
  'Why Does Leap Year Have 366 Days',
  'Inside Out' ];
```

[back to top](#introduction)

<hr>

##Big Thanks
* To [dreyco676](https://github.com/dreyco676) for the heads up on the deprecated routes and new end points.  Checkout the [python google trends](https://github.com/GeneralMills/pytrends)

[back to top](#introduction)
