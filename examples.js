'use strict';

var googleTrends = require(__dirname + '/');
var util = require('util');

//uncomment the code within each example to run it
/* ~=~=~=~=~=~=~=~=~=~= EXAMPLE 1 =~=~=~=~=~=~=~=~=~=~ */
/* ~=~=~=~=~=~=~=~=~=~= trendData =~=~=~=~=~=~=~=~=~=~ */
// // Parameters: array of key words (required)
// // optionally as the first argument pass an object: {keywords: ['dog']}
// googleTrends.trendData({keywords: 'OJ Simpson'})
// .then(function(trendData){
// 	console.log("here is the trendData", trendData);
// })
// .catch(function(err){
// 	console.log("there was an error", err);
// 	return err;
// });

// Trend data example with multiple keywords
// googleTrends.trendData({keywords: ['Olympics', 'Michael Phelps']})
// .then(function(trendData){
// 	console.log("here is the trendData", trendData);
// })
// .catch(function(err){
// 	console.log("there was an error", err);
// 	return err;
// });



/* ~=~=~=~=~=~=~=~=~=~= EXAMPLE 2 =~=~=~=~=~=~=~=~=~=~ */
/* ~=~=~=~=~=~=~=~=~=~= topRelated =~=~=~=~=~=~=~=~=~=~ */
// // Parameters: array of key words (required), country as a string (optional, 'US' is default)
// // optionally as the first argument pass an object: {keywords: ['dog'], geo: 'US'}
// googleTrends.topRelated({keywords: 'dog house'})
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