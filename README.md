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
    * [interestOverTime](#interestovertime)
    * [interestByRegion](#interestbyregion)
    * [relatedQueries](#relatedqueries)
    * [relatedTopics](#relatedtopics)
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
There are examples available for each API method in the root directory of the module.  **Note:** Each example in [examples.js](/examples.js) needs to be uncommented.

### API Methods
The following API methods are available:
* [interestOverTime](#interestovertime): Numbers represent search interest relative to the highest point on the chart for the given region and time. A value of 100 is the peak popularity for the term. A value of 50 means that the term is half as popular. Likewise a score of 0 means the term was less than 1% as popular as the peak.'

* [interestByRegion](#interestbyregion): See in which location your term was most popular during the specified time frame. Values are calculated on a scale from 0 to 100, where 100 is the location with the most popularity as a fraction of total searches in that location, a value of 50 indicates a location which is half as popular, and a value of 0 indicates a location where the term was less than 1% as popular as the peak. <p><p> **Note:** A higher value means a higher proportion of all queries, not a higher absolute query count. So a tiny country where 80% of the queries are for "bananas" will get twice the score of a giant country where only 40% of the queries are for "bananas".


* [relatedQueries](#relatedqueries): Users searching for your term also searched for these queries. The following metrics are returned:
  * **Top** - The most popular search queries. Scoring is on a relative scale where a value of 100 is the most commonly searched query, 50 is a query searched half as often, and a value of 0 is a query searched for less than 1% as often as the most popular query.
  * **Rising** - Queries with the biggest increase in search frequency since the last time period. Results marked "Breakout" had a tremendous increase, probably because these queries are new and had few (if any) prior searches.

* [relatedTopics](#relatedtopics): Users searching for your term also searched for these topics. The following metrics are returned:
  * **Top** - The most popular topics. Scoring is on a relative scale where a value of 100 is the most commonly searched topic, a value of 50 is a topic searched half as often, and a value of 0 is a topic searched for less than 1% as often as the most popular topic.
  * **Rising** - Related topics with the biggest increase in search frequency since the last time period. Results marked "Breakout" had a tremendous increase, probably because these topics are new and had few (if any) prior searches.

[back to top](#introduction)

<hr>

#### interestOverTime
*Search interest relative to the highest point on the chart for the given region and time (100 is the peak popularity for the term)*

#####Syntax
`googleTrends.interestOverTime({keyword: string, startTime: Date, endTime: Date}, cbFunc)`

Requires an `object` as the first parameter with the following keys:
* `keyword` - **required** - type `string` - the search term of interest
* `startTime` - *optional* - type `Date` object - the start of the time range of interest (defaults to `new Date('2004-01-01')` if not supplied)
* `endTime` - *optional* - type `Date` object - the end of the time range of interest (defaults to `new Date(Date.now())` if not supplied)
* `geo` - *optional* - type `string` - geocode for a country, region, or DMA depending on the granularity required (defaults to worldwide).  For example, `geo: 'US-CA-800'` will target the Bakersfield, California, United States or `geo: 'US'` will just target the US.

Optional callback `function` as the second parameter (otherwise returns a promise)

#####Example 1
Returning the search interest over time for 'Valentines Day' (by default from 2004-01-01 to today)

######Input
```js
googleTrends.interestOverTime({keyword: 'Valentines Day'})
.then(function(results){
  console.log(results);
})
.catch(function(err){
  console.error(err);
});
```

######Output
```js
{"default":{"timelineData":[{"time":"1072915200","formattedTime":"Jan 2004","formattedAxisTime":"Jan 1, 2004","value":[26],"formattedValue":["26"]},{"time":"1075593600","formattedTime":"Feb 2004","formattedAxisTime":"Feb 1, 2004","value":[74],"formattedValue":["74"]},
...
{"time":"1483228800","formattedTime":"Jan 2017","formattedAxisTime":"Jan 1, 2017","value":[18],"formattedValue":["18"]},{"time":"1485907200","formattedTime":"Feb 2017","formattedAxisTime":"Feb 1, 2017","value":[72],"formattedValue":["72"]}],"averages":[]}}
```

#####Example 2
Returning the search interest over time for 'Valentines Day' from 2017-02-08 to 2017-02-14 with a callback function.  Note that the resolution is by hour since our query duration is shorter.

######Input
```js
googleTrends.interestOverTime({keyword: 'Valentines Day', startTime: new Date('2017-02-08'), endTime: new Date('2017-02-14')}, function(err, results) {
  if (err) console.log('oh no error!', err);
  else console.log(results);
});
```

######Output
```js
{"default":{"timelineData":[{"time":"1486512000","formattedTime":"Feb 7, 2017 at 7:00 PM","formattedAxisTime":"Feb 7 at 7:00 PM","value":[11],"formattedValue":["11"]},{"time":"1486515600","formattedTime":"Feb 7, 2017 at 8:00 PM","formattedAxisTime":"Feb 7 at 8:00 PM","value":[12],"formattedValue":["12"]},
...
{"time":"1487026800","formattedTime":"Feb 13, 2017 at 6:00 PM","formattedAxisTime":"Feb 13 at 6:00 PM","value":[78],"formattedValue":["78"]},{"time":"1487030400","formattedTime":"Feb 13, 2017 at 7:00 PM","formattedAxisTime":"Feb 13 at 7:00 PM","value":[100],"formattedValue":["100"]}],"averages":[]}}
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
