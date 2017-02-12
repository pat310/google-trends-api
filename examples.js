'use strict';

var googleTrends = require('./lib/google-trends-api.js');
var util = require('util');

// 'Numbers represent search interest relative to the highest point on the chart for the given region and time. A value of 100 is the peak popularity for the term. A value of 50 means that the term is half as popular. Likewise a score of 0 means the term was less than 1% as popular as the peak.'

// must be an object, {keyword: 'SOME KEYWORD'}
// object optionally contains {startTime: new Date()} and/or {endTime: new Date()}
// object optionally contains {geo: 'some geocode string'} geocode string example 'US' or 'US-CA-800'
/*googleTrends.trends({keyword: 'OJ Simpson', startTime: new Date('2017-02-01'), endTime: new Date('2017-02-06')})
.then((res) => {
  console.log('this is res', res);
})
.catch((err) => {
  console.log('got the error', err);
})*/


// 'See in which location your term was most popular during the specified time frame. Values are calculated on a scale from 0 to 100, where 100 is the location with the most popularity as a fraction of total searches in that location, a value of 50 indicates a location which is half as popular, and a value of 0 indicates a location where the term was less than 1% as popular as the peak. <p><p> <b>Note:</b> A higher value means a higher proportion of all queries, not a higher absolute query count. So a tiny country where 80% of the queries are for "bananas" will get twice the score of a giant country where only 40% of the queries are for "bananas".'

// must be an object, {keyword: 'SOME KEYWORD'}
// object optionally contains {startTime: new Date()} and/or {endTime: new Date()}
// object optionally contains {geo: 'some geocode string'} geocode string example 'US' or 'US-CA' or 'US-CA-800'
// object optionally contains {resolution: enumerated string [COUNTRY, REGION, CITY, DMA]}
googleTrends.comparedGeo({keyword: 'OJ Simpson', startTime: new Date('2017-02-01'), endTime: new Date('2017-02-06'), geo: 'US', resolution: 'dMa'})
.then((res) => {
  console.log('this is res', res);
})
.catch((err) => {
  console.log('got the error', err);
})


// googleTrends.relatedTopics({keyword: 'Donald Trump', startTime: new Date('2017-02-06'), endTime: new Date('2017-02-10')})
// .then((res) => {
//   console.log('this is res', res);
// })
// .catch((err) => {
//   console.log('got the error', err);
// })

// googleTrends.relatedQueries({keyword: 'Donald Trump', startTime: new Date('2017-02-06'), endTime: new Date('2017-02-10')})
// .then((res) => {
//   console.log('this is res', res);
// })
// .catch((err) => {
//   console.log('got the error', err);
// })


//uncomment the code within each example to run it
/* ~=~=~=~=~=~=~=~=~=~= EXAMPLE 1 =~=~=~=~=~=~=~=~=~=~ */
/* ~=~=~=~=~=~=~=~=~=~= trendData =~=~=~=~=~=~=~=~=~=~ */
// // Parameters: array of key words (required)
// // optionally as the first argument pass an object instead: {keywords: ['dog']}
// googleTrends.trendData({keyword: 'Oj Simpson', time: 'today 5-y', geo: ''})
// .then(function(trendData){
// 	console.log('here are the results', util.inspect(trendData, {showHidden: false, depth: null}));
// })
// .catch(function(err){
// 	console.log("there was an error", err);
// 	return err;
// });

// // Trend data example with multiple keywords
// googleTrends.trendData(['swimming', 'olympics'])
// .then(function(trendData){
// 	console.log('here are the results', util.inspect(trendData, {showHidden: false, depth: null}));
// })
// .catch(function(err){
// 	console.log("there was an error", err);
// 	return err;
// });

// // Trend data example with a time period provided (timePeriod is an optional parameter)
// googleTrends.trendData({keywords: 'OJ Simpson', timePeriod: {type: 'day', value: 5}})
// .then(function(trendData){
// 	console.log('here are the results', util.inspect(trendData, {showHidden: false, depth: null}));
// })
// .catch(function(err){
// 	console.log("there was an error", err);
// 	return err;
// });


/* ~=~=~=~=~=~=~=~=~=~= EXAMPLE 2 =~=~=~=~=~=~=~=~=~=~ */
/* ~=~=~=~=~=~=~=~=~=~= topRelated =~=~=~=~=~=~=~=~=~=~ */
// // Parameters: array of key words (optional), country as a string (optional, 'US' is default)
// // optionally as the first argument pass an object: {keywords: ['dog'], geo: 'US'}
// googleTrends.topRelated({keywords: 'dog house'})
// .then(function(topRelated){
// 	console.log("here are the topRelated", topRelated);
// })
// .catch(function(err){
// 	console.log("there was an error", err);
// 	return err;
// });

// // topRelated example with timePeriod object
// googleTrends.topRelated({keywords: 'dog house', timePeriod: {type: 'hour', value: 5}})
// .then(function(topRelated){
// 	console.log("here are the topRelated", topRelated);
// })
// .catch(function(err){
// 	console.log("there was an error", err);
// 	return err;
// });



/* ~=~=~=~=~=~=~=~=~=~= EXAMPLE 3 =~=~=~=~=~=~=~=~=~=~ */
/* ~=~=~=~=~=~=~=~=~=~= hotTrends =~=~=~=~=~=~=~=~=~=~ */
// //Parameters: takes a country as a string (optional, 'US' is default)
// // optionally as the first argument pass an object: {geo: 'US'}
// googleTrends.hotTrends('US')
// .then(function(results){
// 	console.log("these are the results", results);
// })
// .catch(function(err){
// 	console.log("there was an err", err);
// });


/* ~=~=~=~=~=~=~=~=~=~= EXAMPLE 4 =~=~=~=~=~=~=~=~=~=~ */
/* ~=~=~=~=~=~=~=~=~=~= hotTrendsDetail =~=~=~=~=~=~=~=~=~=~ */
// //Parameters: takes a country as a string (optional, 'US' is default)
// // optionally as the first argument pass an object: {geo: 'US'}
// googleTrends.hotTrendsDetail()
// .then(function(results){
// 	console.log('here are the results', util.inspect(results, {showHidden: false, depth: null}));
// })
// .catch(function(err){
// 	console.log("there was an err", err);
// });


/* ~=~=~=~=~=~=~=~=~=~= EXAMPLE 5 =~=~=~=~=~=~=~=~=~=~ */
/* ~=~=~=~=~=~=~=~=~=~= top30in30 =~=~=~=~=~=~=~=~=~=~ */
// //Parameters: none
// googleTrends.top30in30()
// .then(function(results){
// 	console.log('here are the results', util.inspect(results, {showHidden: false, depth: null}));
// })
// .catch(function(err){
// 	console.log("there was an error", err);
// });



/* ~=~=~=~=~=~=~=~=~=~= EXAMPLE 6 =~=~=~=~=~=~=~=~=~=~ */
/* ~=~=~=~=~=~=~=~=~=~= allTopCharts =~=~=~=~=~=~=~=~=~=~ */
// // Parameters: date in format yyyymm where January is 01 (optional, today's date is default), country code as string (optional, 'US' is default)
// // optionally as the first argument pass an object: {geo: 'US', date: '201601'}
// googleTrends.allTopCharts({geo: 'US', date: '201601'})
// .then(function(results){
// 	console.log('here are the results', util.inspect(results, {showHidden: false, depth: null}));
// })
// .catch(function(err){
// 	console.log("there was an error", err);
// });



/* ~=~=~=~=~=~=~=~=~=~= EXAMPLE 7 =~=~=~=~=~=~=~=~=~=~ */
/* ~=~=~=~=~=~=~=~=~=~= categoryTopCharts =~=~=~=~=~=~=~=~=~=~ */
// //Parameters: category (required), date in format yyyymm where January is 01 (optional, today's date is default), country code as string (optional, 'US' is default)
// // optionally as the first argument pass an object: {category: 'actors', geo: 'US', date:'201601'}
// googleTrends.categoryTopCharts({category: 'actors', geo: 'US', date:'201601'})
// .then(function(results){
// 	console.log('here are the results', util.inspect(results, {showHidden: false, depth: null}));
// })
// .catch(function(err){
// 	console.log('there was an error', err);
// });



/* ~=~=~=~=~=~=~=~=~=~= EXAMPLE 8 =~=~=~=~=~=~=~=~=~=~ */
/* ~=~=~=~=~=~=~=~=~=~= risingSearches =~=~=~=~=~=~=~=~=~=~ */
// // Parameters: array of key words (optional), country as a string (optional, 'US' is default)
// // optionally as the first argument pass an object: {keywords: ['dog'], geo: 'US'}
// googleTrends.risingSearches({keywords: 'dog house'})
// .then(function(risingSearches){
// 	console.log("here are the risingSearches", risingSearches);
// })
// .catch(function(err){
// 	console.log("there was an error", err);
// 	return err;
// });

// // risingSearches example with timePeriod object
// googleTrends.risingSearches({keywords: 'dog house', timePeriod: {type: 'hour', value: 5}})
// .then(function(risingSearches){
// 	console.log("here are the risingSearches", risingSearches);
// })
// .catch(function(err){
// 	console.log("there was an error", err);
// 	return err;
// });