#Google-trends - API Layer

##Introduction
This library provides an API layer to [google trends](https://www.google.com/trends/) data.  It is constantly being expanded and improved so please check back frequently.  Also, please feel free to contribute to make the library even better! :dog:

Simple to use:
```js
var googleTrends = require('google-trends');

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
		* [topRelated](#toprelated)
		* [hotTrends](#hottrends)
		* [top30in30](#top30in30)
		* [allTopCharts](#alltopcharts)
		* [categoryTopCharts](#categorytopcharts)
* [Potential Errors](#potential-errors)

<hr>
##Installation
To install this package, clone this git repository and include it in your project's node_modules or simply:

`npm install google-trends`

Require google-trends in your script and give it a variable name:

`var googleTrends = require('PATH_TO_NODE_MODULES/google-trends/');`

You will now be able to access the googleTrends methods in your script.  See the [API section](#api) below to see the methods available and how they work.

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
Support for callbacks coming soon!  Please check back.

### Examples
The examples shown for each API method can be run by changing into the home `google-trends` directory and running `node examples.js`.  **Note:** Each example in [examples.js](/examples.js) need to be uncommented.

### API Methods
The following API methods are available:
* [topRelated](#toprelated): returns the top related keywords to a provided keyword or an array of keywords along with it's percentage of correlation.
* [hotTrends](#hottrends): returns the current top 20 trending searches for a given location.
* [top30in30](#top30in30): returns the top 30 searches in the past 30 days
* [allTopCharts](#alltopcharts): returns the top trending charts for a given date and location.  Charts contain information such as title, description, source, a jumpFactory, etc.
* [categoryTopCharts](#categorytopcharts): returns the top trending charts for a given category, date, and location.

For each of the API methods, rather than providing the parameters to the function in a specific order such as `googleTrends.topRelated('keyword', 'country')`, you can provide the function with an "options" object.  Keys that are not required for the method are simply ignored.  The available keys of the options object are as follows:

* `geo`: 'country code provided as a string',
* `date`: 'date provided in format yyyymm as a string where January starts at 01,
* `category`: 'a string for a specific category',
* `keywords`: 'either an array of keywords as strings or a singular keyword as a string'

<hr>
#### topRelated()
*Returns the top related keywords for a provided keyword or an array of keywords*

#####Syntax
`googleTrends.topRelated(['keywords'], 'country')`

* `['keywords']` - either an array of keywords as strings or a string with one keyword.  If keywords is an array, the results will be returned in an array of the same order as the input.  Entering a keyword is **required**.

* `country` - an optional string for the country.  Although the library can figure our the country from a formal name, it is preferred that the country is provided as a country code, for example, 'united states' should be provided as 'US', 'japan' should be provided as 'JP', etc.  If no country code is provided, 'US' is assumed by default

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

<hr>
#### hotTrends()
*Returns the current top 20 trending searches for a given location*

#####Syntax
`googleTrends.hotTrends('country')`

* `country` - an optional string for the country.  Although the library can figure our the country from a formal name, it is preferred that the country is provided as a country code, for example, 'united states' should be provided as 'US', 'japan' should be provided as 'JP', etc.  If no country code is provided, 'US' is assumed by default.

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

<hr>
#### top30in30()
*Returns the top 30 searches in the past 30 days*

#####Syntax
`googleTrends.top30in30()`

`top30in30` does not take in parameters

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

<hr>
#### allTopCharts()
*Returns the top trending charts for a given date and location*

#####Syntax
`googleTrends.allTopCharts('date', 'country')`

* `date` - an optional string provided as 'yyyymm'.  January === 01, December === 12.  Note that google does not aggregate the data for the current month, so the date provided must always be at least one month behind.  If no date is provided, the most recent date available is assumed.

* `country` - an optional string for the country.  Although the library can figure our the country from a formal name, it is preferred that the country is provided as a country code, for example, 'united states' should be provided as 'US', 'japan' should be provided as 'JP', etc.  If no country code is provided, 'US' is assumed by default.

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

<hr>
#### categoryTopCharts()
*Returns the top trending charts for a given category, date and location*

#####Syntax
`googleTrends.categoryTopCharts('category', 'date', 'country')`

* `category` - a specific category provided as a string that you wish to search for.  `category` is a **required** parameter.

* `date` - an optional string provided as 'yyyymm'.  January === 01, December === 12.  Note that google does not aggregate the data for the current month, so the date provided must always be at least one month behind.  If no date is provided, the most recent date available is assumed.

* `country` - an optional string for the country.  Although the library can figure our the country from a formal name, it is preferred that the country is provided as a country code, for example, 'united states' should be provided as 'US', 'japan' should be provided as 'JP', etc.  If no country code is provided, 'US' is assumed by default.

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

<hr>
##Potential errors
* Entering an incorrect or invalid country code will result in the following error: `'Could not locate country'`
* Entering an invalid date will result in the following error: `'Date is invalid'`
* If a required field is not provided, the following error will be returned: `FIELD must be provided`
* Exceeding the quota limits from google will result in the following error: `'Quota limit exceeded, try again later'`