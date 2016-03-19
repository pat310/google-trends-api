#google-trends-api

[![NPM](https://nodei.co/npm/google-trends-api.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/google-trends-api/)

[![npm version](https://badge.fury.io/js/google-trends-api.svg)](https://badge.fury.io/js/google-trends-api)
[![Build status](https://img.shields.io/travis/pat310/google-trends-api.svg?style=flat-square)](https://travis-ci.org/pat310/google-trends-api/)
[![Coverage Status](https://coveralls.io/repos/github/pat310/google-trends-api/badge.svg?branch=master)](https://coveralls.io/github/pat310/google-trends-api?branch=master)
[![Dependency Status](https://img.shields.io/david/pat310/google-trends-api.svg?style=flat-square)](https://david-dm.org/pat310/google-trends-api)
[![Known Vulnerabilities](https://snyk.io/test/github/pat310/google-trends-api/badge.svg)](https://snyk.io/test/github/pat310/google-trends-api)

##Introduction
This library provides an API layer to [google trends](https://www.google.com/trends/) data.  It is constantly being expanded and improved so please check back frequently.  Also, please feel free to contribute to make the library even better! :dog:

Simple to use:
```js
var googleTrends = require('google-trends-api');

var options = {
	geo: 'country name',
	date: 'yyyymm',
	keywords: ['some', 'list', 'of', 'keywords'],
	category: 'some category'
}

googleTrends.apiMethod(options)
.then(function(results){
	console.log("Here are your google trend results!", results);
})
.catch(function(err){
	console.log("there was an error :(", err);
});
```

##Table of contens
* [Installation](#installation)
* [API](#api)
	* [Promises](#promises)
	* [Callbacks](#callbacks)
	* [Examples](#examples)
	* [API Methods](#api-methods)
		* [trendData](#trenddata)
		* [topRelated](#toprelated)
		* [hotTrends](#hottrends)
		* [hotTrendsDetail](#hottrendsdetail)
		* [top30in30](#top30in30)
		* [allTopCharts](#alltopcharts)
		* [categoryTopCharts](#categorytopcharts)
* [Potential Errors](#potential-errors)

<hr>

## Installation
To install this package, clone this git repository and include it in your project's node_modules or simply:

```
npm install google-trends-api
```

Require google-trends-api in your script and give it a variable name:

```js
var googleTrends = require('google-trends-api');
```

You will now be able to access methods on `googleTrends`.  See the [API Methods section](#api-methods) below to see the methods available and their syntax.

[back to top](#introduction)

<hr>

## API

### Promises
By default, all the API's return a promise for the results.  Example:
```js
googleTrends.topRelated({keywords: 'dog house'})
.then(function(results){
	console.log("Here are the results!", results);
})
.catch(function(err){
	console.error('We have an error!', err);
})
```

Would console.log:
```js
Here are the results! [ { 'dog house grill': 'Breakout',
    'best house dog': '+170%',
    'the dog house': '+140%',
    'the house': '+130%',
    'house of dog': '+100%',
    'large dog house': '+90%',
    'house train dog': '+80%',
    'small dog house': '+80%',
    'animal house': '+70%',
    'big dog house': '+70%' } ];
```

### Callbacks
All API methods can also take a callback function as the last input parameter.  For example:
```js
googleTrends.topRelated({keywords: 'dog dreams'}, function(err, results){
	if(err) console.error('there was an error!', err);
	else console.log('results', results);
})
```

Would console.log:
```js
results [ { 'do dog dreams': 'Breakout',
    'dog dream meaning': 'Breakout',
    'dog dreams meaning': 'Breakout',
    'dog in dreams': 'Breakout',
    'dreams about dog': 'Breakout',
    'dreams of dogs': 'Breakout',
    'my dog dreams': 'Breakout',
    'pet dreams': 'Breakout' } ]
```

### Examples
The examples shown for each API method can be run by changing into the home `google-trends` directory and running `node examples.js`.  **Note:** Each example in [examples.js](/examples.js) need to be uncommented.

### API Methods
The following API methods are available:
* [trendData](#trenddata): returns the historical trend data to a provided keyword or an array of keywords.
* [topRelated](#toprelated): returns the top related keywords to a provided keyword or an array of keywords along with it's percentage of correlation.
* [hotTrends](#hottrends): returns the current top 20 trending searches for a given location.
* [hotTrendsDetail](#hottrendsdetail): same as the [hotTrends](#hottrends) results except with more detail such as links, publication date, approximate traffic, etc.
* [top30in30](#top30in30): returns the top 30 searches in the past 30 days
* [allTopCharts](#alltopcharts): returns the top trending charts for a given date and location.  Charts contain information such as title, description, source, a jumpFactory, etc.
* [categoryTopCharts](#categorytopcharts): returns the top trending charts for a given category, date, and location.

For each of the API methods, rather than providing the parameters to the function in a specific order such as `googleTrends.topRelated('keyword', 'country')`, you can provide the function with an "options" object.  Keys that are not required for the method are simply ignored.  The available keys of the options object are as follows:

* `geo`: 'country code provided as a string',
* `date`: 'date provided in format yyyymm as a string where January starts at 01,
* `category`: 'a string for a specific category',
* `keywords`: 'either an array of keywords as strings or a singular keyword as a string'

[back to top](#introduction)

<hr>

#### trendData()
*Returns the historical trend data to a provided keyword or an array of keywords.*

#####Syntax
`googleTrends.trendData(['keywords'])`

* `['keywords']` - either an array of keywords as strings or a string with one keyword.  If keywords is an array, the results will be returned in an array of the same order as the input.  Entering a keyword is **required**.

#####Example
The following example provides the historical trend data for 'OJ Simpson'.  Optionally, the input could have been provided as `googleTrends.trendData({keywords: 'OJ Simpson'})`.  Any other keys provided in the object will be ignore.

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
[ [ { 'May 2014': '10' },
    { 'June 2014': '3' },
    { 'July 2014': '3' },
    { 'August 2014': '3' },
    { 'September 2014': '5' },
    { 'October 2014': '4' },
    { 'November 2014': '3' },
    { 'December 2014': '4' },
    { 'January 2015': '4' },
    { 'February 2015': '3' },
    { 'March 2015': '4' },
    { 'April 2015': '4' },
    { 'May 2015': '4' },
    { 'June 2015': '3' },
    { 'July 2015': '3' },
    { 'August 2015': '8' },
    { 'September 2015': '12' },
    { 'October 2015': '5' },
    { 'November 2015': '7' },
    { 'December 2015': '14' },
    { 'January 2016': '72' },
    { 'February 2016': '100' } ] ]
```

[back to top](#introduction)

<hr>

#### topRelated()
*Returns the top related keywords for a provided keyword or an array of keywords*

#####Syntax
`googleTrends.topRelated(['keywords'], 'country')`

* `['keywords']` - either an array of keywords as strings or a string with one keyword.  If keywords is an array, the results will be returned in an array of the same order as the input.  Entering a keyword is **required**.

* `country` - an optional string for the country.  Although the library can figure out the country from a formal name, it is preferred that the country is provided as a country code, for example, 'united states' should be provided as 'US', 'japan' should be provided as 'JP', etc.  If no country code is provided, 'US' is assumed by default

#####Example
The following example provides the top related keywords to 'dog house' in the 'US'.  Optionally, the input could have been provided as `googleTrends.topRelated({keywords: 'dog house', geo: 'US'})`.  Order of the keys does not matter and any other keys provided in the object will be ignore.

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
[ { 'dog house grill': 'Breakout',
    'best house dog': '+170%',
    'the dog house': '+140%',
    'the house': '+130%',
    'house of dog': '+100%',
    'large dog house': '+90%',
    'house train dog': '+80%',
    'small dog house': '+80%',
    'animal house': '+70%',
    'big dog house': '+70%' } ];
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

#### hotTrendsDetail()
*Returns the current top 20 trending searches for a given location*

#####Syntax
`googleTrends.hotTrendsDetail('country')`

* `country` - an optional string for the country.  Although the library can figure out the country from a formal name, it is preferred that the country is provided as a country code, for example, 'united states' should be provided as 'US', 'japan' should be provided as 'JP', etc.  If no country code is provided, 'US' is assumed by default.

#####Example
The following example provides the top 20 trending searches in the 'US'.  Optionally, the input could have been provided as `googleTrends.hotTrendsDetail({geo: 'US'})`.  Any other keys provided in the object will be ignore.

######Input
```js
googleTrends.hotTrendsDetail('US')
.then(function(results){
	console.log(results);
})
.catch(function(err){
	console.log(err);
});
``` 

######Output
**Note:** Only showing some returned data for brevity

```js
{ rss:
   { '$':
      { version: '2.0',
        'xmlns:ht': 'http://www.google.com/trends/hottrends',
        'xmlns:atom': 'http://www.w3.org/2005/Atom' },
     channel:
      [ { title: [ 'Hot Trends' ],
          link: [ 'http://www.google.us/trends/hottrends?pn=p1' ],
          'atom:link':
           [ { '$':
                { href: 'http://www.google.us/trends/hottrends/atom/feed?pn=p1',
                  rel: 'self',
                  type: 'application/rss+xml' } } ],
          description: [ 'Recent hot searches' ],
          item:
           [ { title: [ 'Melania Trump' ],
               description: [ '' ],
               link: [ 'http://www.google.us/trends/hottrends?pn=p1#a=20160301-Melania+Trump' ],
               pubDate: [ 'Tue, 01 Mar 2016 01:00:00 -0800' ],
               'ht:picture': [ '//t2.gstatic.com/images?q=tbn:ANd9GcT9MS12TcSh5cRqw6CGr7FXqTELrlqBPY-f6Nnpksa_Duy753wXe8jq1Q_fl9DVFRYqEHFW3BLA' ],
               'ht:picture_source': [ 'Politico (blog)' ],
               'ht:approx_traffic': [ '100,000+' ],
               'ht:news_item':
                [ { 'ht:news_item_title': [ '<b>Melania Trump</b> goes on the attack' ],
                    'ht:news_item_snippet': [ '<b>Melania Trump</b> said Marco Rubio&#39;s campaign has taken a “desperate tone” toward Donald Trump, but the Republican front-runner&#39;s wife is unbothered. Rubio finally engaged Donald Trump at last Thursday&#39;s Republican debate and hasn&#39;t let up since,&nbsp;...' ],
                    'ht:news_item_url': [ 'http://www.politico.com/blogs/2016-gop-primary-live-updates-and-results/2016/03/melania-trump-marco-rubio-220015' ],
                    'ht:news_item_source': [ 'Politico (blog)' ] },
                  { 'ht:news_item_title': [ '<b>Melania Trump</b>: &#39;Donald will change tone if he becomes president&#39;' ],
                    'ht:news_item_snippet': [ 'Her comments came during a CNN interview with Anderson Cooper in which the host brought up the frequent insults fired between the Republican presidential candidates and the criticism Donald <b>Trump</b> has received for his tone on the campaign trail.' ],
                    'ht:news_item_url': [ 'http://www.independent.co.uk/news/people/melania-trump-donald-will-change-tone-if-he-becomes-president-a6904786.html' ],
                    'ht:news_item_source': [ 'The Independent' ] } ] },
                    ...
```

[back to top](#introduction)

<hr>

#### top30in30()
*Returns the top 30 searches in the past 30 days*

#####Syntax
`googleTrends.top30in30()`

* `top30in30` does not take in parameters

#####Example
The following example returns the top 30 searches in the past 30 days.

######Input
```js
googleTrends.top30in30()
.then(function(results){
	console.log(results);
})
.catch(function(err){
	console.log(err);
});
```

######Output
**Note:** Only showing some returned data for brevity

```js
{
  "summaryMessage": "Showing top 30 searches in past 30 days",
  "dataUpdateTime": 1456776000,
  "weekDaysList": [
    {
      "title": "Sun"
    },
    {
      "title": "Mon"
    },
    {
      "title": "Tue"
    },
    {
      "title": "Wed"
    },
    {
      "title": "Thu"
    },
    {
      "title": "Fri"
    },
    {
      "title": "Sat"
    }
  ],
  "monthsList": [
    {
      "title": "January",
      "height": 1
    },
    {
      "title": "February",
      "height": 4
    }
  ],
  "weeksList": [
    {
      "daysList": [
        {
          "date": "20160131",
          "formattedDate": "31",
          "longFormattedDate": "January 31",
          "data": {
            "numOfAdditionalTrends": 19,
            "trend": {
              "title": "Frederick Douglass",
              "titleLinkUrl": "/search?q=frederick+douglass",
              "relatedSearchesList": [],
              "formattedTraffic": "10,000,000+",
              "trafficBucketLowerBound": 10000000,
              "hotnessLevel": 5,
              "hotnessColor": "#d04108",
              "imgUrl": "//t0.gstatic.com/images?q=tbn:ANd9GcRCCrM-fy25_79vt3P5YBXG_nZyhK4zya6kP5oMDSyts5WRMMlhxdUBtTKKVnFLgu2C0qXL6iU",
              "imgSource": "CNN International",
              "imgLinkUrl": "http://www.cnn.com/2016/02/01/living/frederick-douglass-google-doodle-black-history-month-feat/index.html",
              "newsArticlesList": [
                {
                  "title": "Who&#39;s <b>Frederick Douglass</b>? Learn more about civil rights leader and movement",
                  "link": "http://www.cnn.com/2016/02/01/living/frederick-douglass-google-doodle-black-history-month-feat/index.html",
                  "source": "CNN International",
                  "snippet": "His autobiography &quot;Narrative of the Life of <b>Frederick Douglass</b>, An American&quot; is a good place to start. &quot;Ain&#39;t I a Woman?&quot; Former slave Sojourner Truth told of the horror as an African-American woman in slavery in &quot;Ain&#39;t I a Woman?&quot; the speech she gave <b>...</b>"
                },
                {
                  "title": "<b>Frederick Douglass</b>: America&#39;s great abolitionist",
                  "link": "http://www.csmonitor.com/USA/Society/2016/0201/Frederick-Douglass-America-s-great-abolitionist",
                  "source": "Christian Science Monitor",
                  "snippet": "<b>Frederick</b> Augustus Washington Bailey was born into slavery in Maryland early in the 19th century. After beginning his life on a plantation, <b>Douglass</b> was sent to Baltimore, where he was first exposed to the alphabet and literacy. Allowing slaves to <b>...</b>"
                }
              ],
              "startTime": 1454302800,
              "shareUrl": "https://www.google.com/trends/hottrends?stt=Frederick+Douglass&std=20160131&pn=p1#a=20160131-Frederick+Douglass",
              "date": "20160131",
              "exploreUrl": "/trends/explore#q=frederick+douglass&date=today+1-m&geo=US"
            }
          }
        },
        ...
```

[back to top](#introduction)

<hr>

#### allTopCharts()
*Returns the top trending charts for a given date and location*

#####Syntax
`googleTrends.allTopCharts('date', 'country')`

* `date` - an optional string provided as 'yyyymm'.  January === 01, December === 12.  Note that google does not aggregate the data for the current month, so the date provided must always be at least one month behind.  If no date is provided, the most recent date available is assumed.

* `country` - an optional string for the country.  Although the library can figure out the country from a formal name, it is preferred that the country is provided as a country code, for example, 'united states' should be provided as 'US', 'japan' should be provided as 'JP', etc.  If no country code is provided, 'US' is assumed by default.

#####Example
The following example provides the top charts in January 2016 in the 'US'.  Optionally, the input could have been provided as `googleTrends.allTopCharts({geo: 'US', date: '201601'})`.  Order of the keys does not matter and any other keys provided in the object will be ignore.

######Input
```js
googleTrends.allTopCharts('201601', 'US')
.then(function(results){
	console.log(results);
})
.catch(function(err){
	console.log(err);
});
```
 

######Output
**Note:** Only showing some returned data for brevity

```js
{
  "summaryMessage": "Showing all charts",
  "prevTimePeriod": "201512",
  "nextTimePeriod": "",
  "isMonthlyTimePeriod": true,
  "data": {
    "chartList": [
      {
        "trendingChart": {
          "entityList": [
            {
              "title": "David Bowie",
              "titleLength": 11,
              "description": {
                "description": "David Robert Jones, known as David Bowie, was an English singer, songwriter and musician, who also worked as an actor and record producer...",
                "source": "Wikipedia",
                "sourceUrl": "http://en.wikipedia.org/wiki/David_Bowie"
              },
              "shareUrl": "http://www.google.com/trends/topcharts?vm=trendingchart&cid=actors&date=201601&geo=US&cat&mid=/m/01vsy7t",
              "twitterShareUrlTitle": "David Bowie #1 in Google Trends Actors trending chart",
              "idForTracking": "David Bowie",
              "exploreUrl": "/trends/explore#cmpt=q&q=/m/01vsy7t&date=1/2016+1m&geo=US",
              "jumpFactorSummary": "+3,700%",
              "topChartRank": 1,
              "titleLinkUrl": "/search?q=David+Bowie"
            },
            {
              "title": "Alan Rickman",
              "titleLength": 12,
              "description": {
                "description": "Alan Sidney Patrick Rickman, was an English actor and director, known for playing a variety of roles on stage and screen...",
                "source": "Wikipedia",
                "sourceUrl": "http://en.wikipedia.org/wiki/Alan_Rickman"
              },
              "shareUrl": "http://www.google.com/trends/topcharts?vm=trendingchart&cid=actors&date=201601&geo=US&cat&mid=/m/09y20",
              "twitterShareUrlTitle": "Alan Rickman #2 in Google Trends Actors trending chart",
              "idForTracking": "Alan Rickman",
              "exploreUrl": "/trends/explore#cmpt=q&q=/m/09y20&date=1/2016+1m&geo=US",
              "jumpFactorSummary": "+7,500%",
              "topChartRank": 2,
              "titleLinkUrl": "/search?q=Alan+Rickman"
            },
            ...
```

[back to top](#introduction)

<hr>

#### categoryTopCharts()
*Returns the top trending charts for a given category, date and location*

#####Syntax
`googleTrends.categoryTopCharts('category', 'date', 'country')`

* `category` - a specific category provided as a string that you wish to search for.  `category` is a **required** parameter.

* `date` - an optional string provided as 'yyyymm'.  January === 01, December === 12.  Note that google does not aggregate the data for the current month, so the date provided must always be at least one month behind.  If no date is provided, the most recent date available is assumed.

* `country` - an optional string for the country.  Although the library can figure out the country from a formal name, it is preferred that the country is provided as a country code, for example, 'united states' should be provided as 'US', 'japan' should be provided as 'JP', etc.  If no country code is provided, 'US' is assumed by default.

#####Example
The following example provides the top charts for actors in January 2016 in the 'US'.  Optionally, the input could have been provided as `googleTrends.categoryTopCharts({category: 'actors', geo: 'US', date: '201601'})`.  Order of the keys does not matter and any other keys provided in the object will be ignore.

######Input
```js
googleTrends.categoryTopCharts('actors', '201601', 'US'})
.then(function(results){
	console.log(results);
})
.catch(function(err){
	console.log(err);
});
``` 

######Output
**Note:** Only showing some returned data for brevity

```js
{
  "data": {
    "entityList": [
      {
        "title": "David Bowie",
        "titleLength": 11,
        "description": {
          "description": "David Robert Jones, known as David Bowie, was an English singer, songwriter and musician, who also worked as an actor and record producer...",
          "source": "Wikipedia",
          "sourceUrl": "http://en.wikipedia.org/wiki/David_Bowie"
        },
        "shareUrl": "http://www.google.com/trends/topcharts?vm=trendingchart&cid=actors&date=201601&geo=US&cat&mid=/m/01vsy7t",
        "twitterShareUrlTitle": "David Bowie #1 in Google Trends Actors trending chart",
        "idForTracking": "David Bowie",
        "exploreUrl": "/trends/explore#cmpt=q&q=/m/01vsy7t&date=1/2016+1m&geo=US",
        "jumpFactorSummary": "+3,700%",
        "topChartRank": 1,
        "titleLinkUrl": "/search?q=David+Bowie"
      },
      {
        "title": "Alan Rickman",
        "titleLength": 12,
        "description": {
          "description": "Alan Sidney Patrick Rickman, was an English actor and director, known for playing a variety of roles on stage and screen...",
          "source": "Wikipedia",
          "sourceUrl": "http://en.wikipedia.org/wiki/Alan_Rickman"
        },
        "shareUrl": "http://www.google.com/trends/topcharts?vm=trendingchart&cid=actors&date=201601&geo=US&cat&mid=/m/09y20",
        "twitterShareUrlTitle": "Alan Rickman #2 in Google Trends Actors trending chart",
        "idForTracking": "Alan Rickman",
        "exploreUrl": "/trends/explore#cmpt=q&q=/m/09y20&date=1/2016+1m&geo=US",
        "jumpFactorSummary": "+7,500%",
        "topChartRank": 2,
        "titleLinkUrl": "/search?q=Alan+Rickman"
      },
      ...
```

[back to top](#introduction)

<hr>

##Potential errors
* Entering an incorrect or invalid country code will result in the following error: `'Could not locate country'`
* Entering an invalid date will result in the following error: `'Date is invalid'`
* If a required field is not provided, the following error will be returned: `FIELD must be provided`
* Exceeding the quota limits from google will result in the following error: `'Quota limit exceeded, try again later'`

[back to top](#introduction)
