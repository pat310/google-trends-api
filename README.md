# google-trends-api

[![NPM](https://nodei.co/npm/google-trends-api.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/google-trends-api/)

[![npm version](https://badge.fury.io/js/google-trends-api.svg)](https://badge.fury.io/js/google-trends-api)
[![Build status](https://img.shields.io/travis/pat310/google-trends-api.svg?style=flat-square)](https://travis-ci.org/pat310/google-trends-api/)
[![Coverage Status](https://coveralls.io/repos/github/pat310/google-trends-api/badge.svg?branch=master)](https://coveralls.io/github/pat310/google-trends-api?branch=master)
[![Code Climate](https://codeclimate.com/github/pat310/google-trends-api/badges/gpa.svg)](https://codeclimate.com/github/pat310/google-trends-api)
[![Dependency Status](https://img.shields.io/david/pat310/google-trends-api.svg?style=flat-square)](https://david-dm.org/pat310/google-trends-api)
[![Known Vulnerabilities](https://snyk.io/test/github/pat310/google-trends-api/badge.svg)](https://snyk.io/test/github/pat310/google-trends-api)

## v3 to v4
[Big changes](/CHANGES.md)!  The old google-trends endpoints are deprecated and are heavily throttled so this library has changed significantly.  You can choose to download the old version via `npm install google-trends-api@3.0.2` but it is discouraged.

## Introduction
This library provides an API layer to [google trends](https://www.google.com/trends/) data.  Due to CORS restrictions, this library is intended to be used in node.  It is constantly being expanded and improved so please check back frequently.  Also, please feel free to contribute to make the library even better! :dog:

### Syntax
```js
const googleTrends = require('google-trends-api');

googleTrends.apiMethod(optionsObject, [callback])
```

#### Parameters
**optionsObject**
An object with the following options keys:
* **keyword** Target search term(s) `string` or `array` if you wish to compare search terms **required**
* **startTime** Start of time period of interest (`new Date()` object).  If `startTime` is not provided, a date of January 1, 2004 is assumed (this is the oldest available google trends data)
* **endTime** End of time period of interest (`new Date()` object). If `endTime` is not provided, the current date is selected.
* **geo** Location of interest (`string` or `array` if you wish to provide separate locations for each keyword).
* **hl** Preferred language (`string` [defaults to english](https://sites.google.com/site/tomihasa/google-language-codes))
* **timezone** Timezone (`number` defaults to the time zone difference, in minutes, from UTC to current locale (host system settings))
* **category** Category to search within (`number` defaults to [all categories](https://github.com/pat310/google-trends-api/wiki/Google-Trends-Categories))
* **property** Google property to filter on. Defaults to web search. (enumerated `string` ['images', 'news', 'youtube' or 'froogle'] where froogle is Google Shopping results)
* **resolution** Granularity of the geo search (enumerated `string` ['COUNTRY', 'REGION', 'CITY', 'DMA']).  `resolution` is specific to the [interestByRegion](#interestByRegion) method.
* **granularTimeResolution** Boolean that dictates if the results should be given in a finer time resolution (if `startTime` and `endTime` is less than one day, this should be set to `true`)

**callback**
Optional callback function where the first parameter is an error and the second parameter is the result.  If no callback is provided, then a promise is returned.

## Table of contents
* [Installation](#installation)
* [API](#api)
  * [Promises](#promises)
  * [Callbacks](#callbacks)
  * [Proxy Server](#proxy-server)
  * [Examples](#examples)
  * [API Methods](#api-methods)
    * [autoComplete](#autocomplete)
    * [dailyTrends](#dailyTrends)
    * [interestOverTime](#interestovertime)
    * [interestByRegion](#interestbyregion)
    * [realTimeTrends](#realTimeTrends)
    * [relatedQueries](#relatedqueries)
    * [relatedTopics](#relatedtopics)
* [Geo help](#geo-help)
* [List of categories](https://github.com/pat310/google-trends-api/wiki/Google-Trends-Categories)
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

### Proxy Server
A proxy server can be used by specifying an http agent as part of the query. This example uses [https-proxy-agent](https://www.npmjs.com/package/https-proxy-agent)

```js
const HttpsProxyAgent = require('https-proxy-agent');

let proxyAgent =  new HttpsProxyAgent('http://proxy-host:8888/');

let query = {
    keyword: 'Women\'s march',
    agent: proxyAgent
};

googleTrends.interestOverTime(query)
.then(function(results){
  console.log('These proxied results are incredible', results);
})
.catch(function(err){
  console.error('Oh no there was an error, double check your proxy settings', err);
});
```

### Multiple Keywords
Compare multiple keywords with any of the api methods by supplying an `array` instead of a single `string`
```js
googleTrends.interestOverTime({keyword: ['Women\'s march', 'Trump Inauguration']})
.then(function(results){
  console.log('These results are awesome', results);
})
.catch(function(err){
  console.error('Oh no there was an error', err);
});
```


### Examples
There are examples available for each API method in the root directory of the module.  **Note:** Each example in [examples.js](/examples.js) needs to be uncommented.

### API Methods
The following API methods are available:
* [autoComplete](#autocomplete): Returns the results from the "Add a search term" input box in the google trends UI. These results (Topics) can then be used in the other API methods. **Note**: Search terms and Topics are measured differently, so `relatedTopics` will not work with comparisons that contain both Search terms and Topics.

* [dailyTrends](#dailyTrends): Daily Search Trends highlights searches that jumped significantly in traffic among all searches over the past 24 hours and updates hourly. These search trends show the specific queries that were searched, and the absolute number of searches made. 20 daily trending search results are returned.You can search retroactively for up to 15 days in the past.

* [interestOverTime](#interestovertime): Numbers represent search interest relative to the highest point on the chart for the given region and time. A value of 100 is the peak popularity for the term. A value of 50 means that the term is half as popular. Likewise a score of 0 means the term was less than 1% as popular as the peak. If you use multiple keywords for a comparison, the return data will also contain an average result for each keyword.

* [interestByRegion](#interestbyregion): See in which location your term was most popular during the specified time frame. Values are calculated on a scale from 0 to 100, where 100 is the location with the most popularity as a fraction of total searches in that location, a value of 50 indicates a location which is half as popular, and a value of 0 indicates a location where the term was less than 1% as popular as the peak. <p><p> **Note:** A higher value means a higher proportion of all queries, not a higher absolute query count. So a tiny country where 80% of the queries are for "bananas" will get twice the score of a giant country where only 40% of the queries are for "bananas".

* [realTimeTrends](#realTimeTrends): Realtime Search Trends highlight stories that are trending across Google surfaces within the last 24 hours, and are updated in realtime. These stories are a collection of Knowledge Graph topics, Search interest, trending YouTube videos, and/or Google News articles detected by Google's algorithms. 13 real time trending stories are returned.

* [relatedQueries](#relatedqueries): Users searching for your term also searched for these queries. The following metrics are returned:
  * **Top** - The most popular search queries. Scoring is on a relative scale where a value of 100 is the most commonly searched query, 50 is a query searched half as often, and a value of 0 is a query searched for less than 1% as often as the most popular query.
  * **Rising** - Queries with the biggest increase in search frequency since the last time period. Results marked "Breakout" had a tremendous increase, probably because these queries are new and had few (if any) prior searches.

* [relatedTopics](#relatedtopics): Users searching for your term also searched for these topics. The following metrics are returned:
  * **Top** - The most popular topics. Scoring is on a relative scale where a value of 100 is the most commonly searched topic, a value of 50 is a topic searched half as often, and a value of 0 is a topic searched for less than 1% as often as the most popular topic.
  * **Rising** - Related topics with the biggest increase in search frequency since the last time period. Results marked "Breakout" had a tremendous increase, probably because these topics are new and had few (if any) prior searches.

[back to top](#introduction)

<hr>

#### autoComplete
* Results from the "add a search term" input box in the google trends UI*

#### Syntax
`googleTrends.autoComplete({keyword: string}, cbFunc)`

Requires an `object` as the first parameter with the following keys:
* `keyword` - **required** - type `string` - the search term of interest
* `hl` - *optional* - type `string` - preferred language code for results (defaults to english)

Optional callback `function` as the second parameter (otherwise returns a promise)

##### Example
Returning the auto-complete results for 'Back to School'

###### Input
```js
googleTrends.autoComplete({keyword: 'Back to School'})
.then(function(results) {
  console.log(results);
})
.catch(function(err) {
  console.error(err);
})
```

###### Output
```js
{"default":{"topics":[{"mid":"/m/0414j6","title":"Back to School","type":"1986 film"},{"mid":"/m/068pw8","title":"Back to school","type":"Topic"},{"mid":"/m/04vwgn","title":"Fight Back to School","type":"1991 film"},{"mid":"/m/05357_","title":"Tax holiday","type":"Holiday"},{"mid":"/m/02pb6kt","title":"Fight Back to School II","type":"1992 film"}]}}
```
**Note:** You can then use these results in the other API methods. For example, if you wanted `interestOverTime` for 'Back to School' where the type is 'Topic', you would then use:
`googleTrends.interestOverTime({keyword: '/m/068pw8'})`

[back to top](#introduction)

<hr>

#### dailyTrends
*Daily Search Trends highlights searches that jumped significantly in traffic among all searches over the past 24 hours and updates hourly. These search trends show the specific queries that were searched, and the absolute number of searches made. 20 daily trending search results are returned*

##### Syntax
`googleTrends.dailyTrends({ geo: string }, cbFunc)`

Requires an `object` as the first parameter with the following keys:

* `geo` - **required** - type `string` - geocode for a country. For example, `geo: 'US'` will target United States or `geo: 'FR'` will target France. 
* `hl` - *optional* - type `string` - preferred language code for results (defaults to english). 
* `timezone` - *optional* - type `number` - preferred timezone (defaults to the time zone difference, in minutes, from UTC to current locale (host system settings))
* `trendDate` - *optional* - type `Date` object - the date you are interesting in retrieving trends information for (defaults to the current date). **Note that querying for a date more than 15 days in the past will result in an error.**

Optional callback `function` as the second parameter (otherwise returns a promise)

##### Example
Returning real time trending stories for the United States region.

###### Input
```js
googleTrends.dailyTrends({
  trendDate: new Date('2019-01-10'),
  geo: 'US',
}, function(err, results) {
  if (err) {
    console.log(err);
  }else{
    console.log(results);
  }
});
```

###### Output
```js
{
  default : [Object]{
    trendingSearchesDays : [Array]
      [0] : [Object]{
        date : String
        formattedDate: String
        trendingSearches : [Array]{
          [0] : [Object] //First trending result
        }
      [1] : [Object]{
        date : String
        formattedDate: String
        trendingSearches : [Array]{
          [0] : [Object] //first trending result
          ...
          [19] : [Object] //20th trending result
        }
      }
    }
    endDateForNextRequest : String,
    rssFeedPageUrl : String,
  }
}
```

[back to top](#introduction)

<hr>

#### interestOverTime
*Search interest relative to the highest point on the chart for the given region and time (100 is the peak popularity for the term)*

##### Syntax
`googleTrends.interestOverTime({keyword: string, startTime: Date, endTime: Date, geo: string}, cbFunc)`

Requires an `object` as the first parameter with the following keys:
* `keyword` - **required** - type `string` or `array` - the search term(s) of interest
* `startTime` - *optional* - type `Date` object - the start of the time range of interest (defaults to `new Date('2004-01-01')` if not supplied)
* `endTime` - *optional* - type `Date` object - the end of the time range of interest (defaults to `new Date(Date.now())` if not supplied)
* `geo` - *optional* - type `string` or `array` - geocode(s) for a country, region, or DMA depending on the granularity required (defaults to worldwide). For example, `geo: 'US-CA-800'` will target the Bakersfield, California, United States or `geo: 'US'` will just target the US. Passing `geo: ['US-CA, US-VA'], keyword: ['wine', 'peanuts']` will search for wine in California and peanuts in Virginia.
* `hl` - *optional* - type `string` - preferred language code for results (defaults to english)
* `timezone` - *optional* - type `number` - preferred timezone (defaults to the time zone difference, in minutes, from UTC to current locale (host system settings))
* `category` - *optional* - type `number` - a number corresponding to a particular category to query within (defaults to all categories), see the [category wiki](https://github.com/pat310/google-trends-api/wiki/Google-Trends-Categories) for a complete list
* `granularTimeResolution` - *optional* - type `boolean` - if `true`, will try to return results to a finer time resolution (only relevant for `startTime` and `endTime` less than one week)

Optional callback `function` as the second parameter (otherwise returns a promise)

The resolution of the search changes automatically depending on the search duration.  The wider the duration window, the worse the resolution (for example, a search duration with a `startTime` and `endTime` that ends years apart will return a resolution in months, while a search duration with a `startTime` and `endTime` a few hours apart will return a resolution in minutes).

##### Example 1
Returning the search interest over time for 'Valentines Day' (by default from 2004-01-01 to today)

###### Input
```js
googleTrends.interestOverTime({keyword: 'Valentines Day'})
.then(function(results){
  console.log(results);
})
.catch(function(err){
  console.error(err);
});
```

###### Output
```js
{"default":{"timelineData":[{"time":"1072915200","formattedTime":"Jan 2004","formattedAxisTime":"Jan 1, 2004","value":[26],"formattedValue":["26"]},{"time":"1075593600","formattedTime":"Feb 2004","formattedAxisTime":"Feb 1, 2004","value":[74],"formattedValue":["74"]},
...
{"time":"1483228800","formattedTime":"Jan 2017","formattedAxisTime":"Jan 1, 2017","value":[18],"formattedValue":["18"]},{"time":"1485907200","formattedTime":"Feb 2017","formattedAxisTime":"Feb 1, 2017","value":[72],"formattedValue":["72"]}],"averages":[]}}
```

##### Example 2
Returning the search interest over time for 'Valentines Day' from the past four hours.  Note that the resolution is by minute since our query duration is shorter.

###### Input
```js
googleTrends.interestOverTime({keyword: 'Valentines Day', startTime: new Date(Date.now() - (4 * 60 * 60 * 1000))}, function(err, results) {
  if (err) console.log('oh no error!', err);
  else console.log(results);
});
```

###### Output
```js
{"default":{"timelineData":[{"time":"1487026800","formattedTime":"Feb 13, 2017 at 6:00 PM","formattedAxisTime":"6:00 PM","value":[49],"formattedValue":["49"]},{"time":"1487026860","formattedTime":"Feb 13, 2017 at 6:01 PM","formattedAxisTime":"6:01 PM","value":[50],"formattedValue":["50"]},
...
{"time":"1487040180","formattedTime":"Feb 13, 2017 at 9:43 PM","formattedAxisTime":"9:43 PM","value":[88],"formattedValue":["88"]},{"time":"1487040240","formattedTime":"Feb 13, 2017 at 9:44 PM","formattedAxisTime":"9:44 PM","value":[81],"formattedValue":["81"]}],"averages":[]}}
```

[back to top](#introduction)

<hr>

#### interestByRegion
*See in which location your term was most popular during the specified time frame. Values are calculated on a scale from 0 to 100, where 100 is the location with the most popularity as a fraction of total searches in that location.*

##### Syntax
`googleTrends.interestByRegion({keyword: string, startTime: Date, endTime: Date, geo: string, resolution: string}, cbFunc)`

Requires an `object` as the first parameter with the following keys:
* `keyword` - **required** - type `string` or `array` - the search term(s) of interest
* `startTime` - *optional* - type `Date` object - the start of the time range of interest (defaults to `new Date('2004-01-01')` if not supplied)
* `endTime` - *optional* - type `Date` object - the end of the time range of interest (defaults to `new Date(Date.now())` if not supplied)
* `geo` - *optional* - type `string` or `array` - geocode(s) for a country, region, or DMA depending on the granularity required (defaults to worldwide). For example, `geo: 'US-CA-800'` will target the Bakersfield, California, United States or `geo: 'US'` will just target the US. Passing `geo: ['US-CA, US-VA'], keyword: ['wine', 'peanuts']` will search for wine in California and peanuts in Virginia.
* `resolution` - *optional* - type `enumerated string` either `COUNTRY`, `REGION`, `CITY` or `DMA`.  Resolution is selected by default otherwise.  Trying to select a resolution larger than a specified `geo` will return an error.
* `hl` - *optional* - type `string` - preferred language code for results (defaults to english)
for results (defaults to english)
* `timezone` - *optional* - type `number` - preferred timezone (defaults to the time zone difference, in minutes, from UTC to current locale (host system settings))
* `category` - *optional* - type `number` - a number corresponding to a particular category to query within (defaults to all categories), see the [category wiki](https://github.com/pat310/google-trends-api/wiki/Google-Trends-Categories) for a complete list

Optional callback `function` as the second parameter (otherwise returns a promise)

##### Example 1
Returning the search interest by cities around the world for 'Donald Trump' from February 01, 2017 to February 06, 2017.

###### Input
```js
googleTrends.interestByRegion({keyword: 'Donald Trump', startTime: new Date('2017-02-01'), endTime: new Date('2017-02-06'), resolution: 'CITY'})
.then((res) => {
  console.log(res);
})
.catch((err) => {
  console.log(err);
})
```

###### Output
```js
{"default":{"geoMapData":[{"coordinates":{"lat":18.594395,"lng":-72.3074326},"geoName":"Port-au-Prince","value":[100],"formattedValue":["100"],"maxValueIndex":0},{"coordinates":{"lat":43.467517,"lng":-79.6876659},"geoName":"Oakville","value":[90],"formattedValue":["90"],"maxValueIndex":0},
...
{"coordinates":{"lat":40.9312099,"lng":-73.8987469},"geoName":"Yonkers","value":[69],"formattedValue":["69"],"maxValueIndex":0}]}}
```

##### Example 2
Returning the search interest by cities in California for 'Donald Trump' from February 01, 2017 to February 06, 2017.

###### Input
```js
googleTrends.interestByRegion({keyword: 'Donald Trump', startTime: new Date('2017-02-01'), endTime: new Date('2017-02-06'), geo: 'US-CA'})
.then((res) => {
  console.log(res);
})
.catch((err) => {
  console.log(err);
})
```

###### Output
```js
{"default":{"geoMapData":[{"geoCode":"807","geoName":"San Francisco-Oakland-San Jose CA","value":[100],"formattedValue":["100"],"maxValueIndex":0},{"geoCode":"828","geoName":"Monterey-Salinas CA","value":[100],"formattedValue":["100"],"maxValueIndex":0},
...
{"geoCode":"811","geoName":"Reno NV","value":[12],"formattedValue":["12"],"maxValueIndex":0},{"geoCode":"813","geoName":"Medford-Klamath Falls OR","value":[4],"formattedValue":["4"],"maxValueIndex":0}]}}
```

[back to top](#introduction)

<hr>

#### realtimeTrends
*Realtime Search Trends highlight stories that are trending across Google surfaces within the last 24 hours, and are updated in realtime. 13 real time trending stories are returned*

##### Syntax
`googleTrends.realTimeTrends({ geo: string }, cbFunc)`

Requires an `object` as the first parameter with the following keys:

* `geo` - **required** - type `string` - geocode for a country. For example, `geo: 'US'` will target United States or `geo: 'FR'` will target France. 
* `hl` - *optional* - type `string` - preferred language code for results (defaults to english)
for results (defaults to english)
* `timezone` - *optional* - type `number` - preferred timezone (defaults to the time zone difference, in minutes, from UTC to current locale (host system settings))
* `category` - *optional* - type `string` - a string corresponding to a particular category to query within (defaults to all categories): 
  All          : 'all'
  Entertainment: 'e'
  Business     : 'b'
  Science/Tech : 't'
  Health       : 'm'
  Sports       : 's'
  Top Stories  : 'h' 

Optional callback `function` as the second parameter (otherwise returns a promise)

##### Example
Returning real time trending stories for the United States region.

###### Input
```js
googleTrends.realTimeTrends({
    geo: 'US',
    category: 'all',
}, function(err, results) {
    if (err) {
       console.log(err);
    } else {
      console.log(results);
    } 
});
```

###### Output
```js
{
	featuredStoryIds : [Array], // Empty
	trendingStoryIds : [Array], // 300 trending story IDs
  storySummaries : [Object]
    {
	  featuredStories : [Array], // Empty
    trendingStories : [Array], // 13 top trending stories
    },
	date : "Date-String",
  hideAllImages : Boolean,
}
```

[back to top](#introduction)

<hr>

#### relatedQueries
*Users searching for your term also searched for these queries.*

##### Syntax
`googleTrends.relatedQueries({keyword: string, startTime: Date, endTime: Date, geo: string}, cbFunc)`

Requires an `object` as the first parameter with the following keys:
* `keyword` - **required** - type `string` or `array` - the search term(s) of interest
* `startTime` - *optional* - type `Date` object - the start of the time range of interest (defaults to `new Date('2004-01-01')` if not supplied)
* `endTime` - *optional* - type `Date` object - the end of the time range of interest (defaults to `new Date(Date.now())` if not supplied)
* `geo` - *optional* - type `string` or `array` - geocode(s) for a country, region, or DMA depending on the granularity required (defaults to worldwide). For example, `geo: 'US-CA-800'` will target the Bakersfield, California, United States or `geo: 'US'` will just target the US. Passing `geo: ['US-CA, US-VA'], keyword: ['wine', 'peanuts']` will search for wine in California and peanuts in Virginia.
* `hl` - *optional* - type `string` - preferred language code for results (defaults to english)
for results (defaults to english)
* `timezone` - *optional* - type `number` - preferred timezone (defaults to the time zone difference, in minutes, from UTC to current locale (host system settings))
* `category` - *optional* - type `number` - a number corresponding to a particular category to query within (defaults to all categories), see the [category wiki](https://github.com/pat310/google-trends-api/wiki/Google-Trends-Categories) for a complete list

Optional callback `function` as the second parameter (otherwise returns a promise)

##### Example
Returning top related queries for 'Westminster Dog show' with default startTime, endTime, and geo categories

###### Input
```js
googleTrends.relatedQueries({keyword: 'Westminster Dog Show'})
.then((res) => {
  console.log(res);
})
.catch((err) => {
  console.log(err);
})
```

###### Output
```js
{"default":{"rankedList":[{"rankedKeyword":[{"query":"dog show 2016","value":100,"formattedValue":"100","link":"/"},{"query":"2016 westminster dog show","value":95,"formattedValue":"95","link":"/"},
...
{"query":"dogs","value":20,"formattedValue":"20","link":"/"}]},{"rankedKeyword":[{"query":"dog show 2016","value":836500,"formattedValue":"Breakout","link":"/"},{"query":"2016 westminster dog show","value":811550,"formattedValue":"Breakout","link":"/"},
...
{"query":"who won the westminster dog show","value":59000,"formattedValue":"Breakout","link":"/"}]}]}}
```

[back to top](#introduction)

<hr>

#### relatedTopics
*Users searching for your term also searched for these topics*

##### Syntax
`googleTrends.relatedTopics({keyword: string, startTime: Date, endTime: Date, geo: string}, cbFunc)`

Requires an `object` as the first parameter with the following keys:
* `keyword` - **required** - type `string` or `array` - the search term(s) of interest
* `startTime` - *optional* - type `Date` object - the start of the time range of interest (defaults to `new Date('2004-01-01')` if not supplied)
* `endTime` - *optional* - type `Date` object - the end of the time range of interest (defaults to `new Date(Date.now())` if not supplied)
* `geo` - *optional* - type `string` or `array` - geocode(s) for a country, region, or DMA depending on the granularity required (defaults to worldwide). For example, `geo: 'US-CA-800'` will target the Bakersfield, California, United States or `geo: 'US'` will just target the US. Passing `geo: ['US-CA, US-VA'], keyword: ['wine', 'peanuts']` will search for wine in California and peanuts in Virginia.
* `hl` - *optional* - type `string` - preferred language code for results (defaults to english)
for results (defaults to english)
* `timezone` - *optional* - type `number` - preferred timezone (defaults to the time zone difference, in minutes, from UTC to current locale (host system settings))
* `category` - *optional* - type `number` - a number corresponding to a particular category to query within (defaults to all categories), see the [category wiki](https://github.com/pat310/google-trends-api/wiki/Google-Trends-Categories) for a complete list

Optional callback `function` as the second parameter (otherwise returns a promise)

##### Example
Returning top related topics for 'Chipotle' from January 1st, 2015 to February 10th, 2017.

###### Input
```js
googleTrends.relatedTopics({keyword: 'Chipotle', startTime: new Date('2015-01-01'), endTime: new Date('2017-02-10')})
.then((res) => {
  console.log(res);
})
.catch((err) => {
  console.log(err);
})
```

###### Output
```js
{"default":{"rankedList":[{"rankedKeyword":[{"topic":{"mid":"/m/01b566","title":"Chipotle Mexican Grill","type":"Restaurant company"},"value":100,"formattedValue":"100","link":"/"},{"topic":{"mid":"/m/02f217","title":"Chipotle","type":"Jalape\u00f1o"},"value":5,"formattedValue":"5","link":"/"},
...
{"topic":{"mid":"/m/01xg7s","title":"Chorizo","type":"Topic"},"value":0,"formattedValue":"0","link":"/"}]},{"rankedKeyword":[{"topic":{"mid":"/m/09_yl","title":"E. coli","type":"Bacteria"},"value":40700,"formattedValue":"Breakout","link":"/"},
...
{"topic":{"mid":"/m/0dqc4","title":"Caridea","type":"Animal"},"value":40,"formattedValue":"+40%","link":"/"}]}]}}
```

[back to top](#introduction)


<hr>



<hr>

## Geo help
Unfortunately support is not offered for zip codes at this time.  The user must enter a country code, region (or state) code, and/or DMA (Designated Market Area) code.

* A list of country codes can be found here: [country code list](https://github.com/datasets/country-codes/blob/master/data/country-codes.csv)
* A list of DMAs can be found here: [DMA list](https://support.google.com/richmedia/answer/2745487?hl=en)
* A list of available languages can be found here: [language codes](https://sites.google.com/site/tomihasa/google-language-codes)

<hr>

## Big Thanks
* To [dreyco676](https://github.com/dreyco676) for the heads up on the deprecated routes and new end points.  Checkout the [python google trends](https://github.com/GeneralMills/pytrends)

[back to top](#introduction)
