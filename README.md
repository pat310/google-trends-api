#An API layer ontop of google trends
<hr>

##Installation
<hr>
To install this package, clone this git repository and include it in your project's node_modules or simply:

`npm install google-trends`

Require google-google trends in your script and give it a variable name:

`var googleTrends = require('PATH_TO_NODE_MODULES/google-trends/')`

You will now be able to access the googleTrends methods in your script.  See the [API section](#API) below to see the methods available and how they work.

##API
<hr>
The following methods are available on your variable set to `require('PATH_TO_NODE_MODULES/google-trends/')`.  In other words, if `var googleTrends = require('PATH_TO_NODE_MODULES/google-trends/')`, then you have access to `googleTrends.METHODNAME()`.

For all the examples, the assumption is that `var googleTrends = require('PATH_TO_NODE_MODULES/google-trends/')`.  

For each of the API methods, rather than providing the parameters to the function in a specific order such as `googleTrends.topRelated('keyword', 'country')`, you can provide the function with an object.  The keys of the object are as follows:

* geo: 'country code provided as a string',
* date: 'date provided in format yyyymm as a string. note, the date must be at least one month behind'
* category: 'a string for a specific category',
* keywords: 'either an array of keywords as strings or a singular keyword as a string'

*Note:* Google may limit the number of requests you can make in a specific amount of time.  If that happens, an error will be returned stating, "Quota limit exceeded, try again later"

The following API methods are available:
* [topRelated](#topRelated()): returns the top related key words to a provided keyword or an array of keywords along with it's percentage of correlation.
* [hotTrends](#hotTrends()): returns the top 20 trending searches for a given location.
* [top30in30](#top30in30()): returns the top 30 searches in the past 30 days
* [allTopCharts](#allTopCharts()): returns the top trending charts for a given date and location.  Charts contain information such as title, description, source, a jumpFactory, etc.
* [categoryTopCharts](#categoryTopCharts()): returns the top trending charts for a given category, date, and location.

###topRelated()
<hr>
####Syntax
`googleTrends.topRelated(['keywords'], 'country')`

`['keywords']` is either an array of keywords as strings or a string with one keyword
`country` is an optional string for the country.  It is preferred that the country is provided as a country code, for example, 'united states' should be provided as 'US', 'japan' should be provided as 'JP', etc.  If no country code is provided, 'US' is assumed by default

####Example
#####Input
`googleTrends.topRelated('dog house')` provides the top related keywords to 'dog house' in the 'US'.  Optionally, the input could have been provided as `googleTrends.topRelated({keywords: 'dog house'})`.

#####Output
```
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

###hotTrends()
<hr>

###top30in30()
<hr>

###allTopCharts()
<hr>

###categoryTopCharts()
<hr>

##Promises
<hr>

##Callbacks
<hr>

{
geo: 'CODE',
date: '201601',
category: 'Dogs',
keywords: ['Dogs', 'Cats', 'Bears']
}