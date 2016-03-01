var googleTrends = require('./');
var util = require('util');

//uncomment the code within each example to run it

/* ~=~=~=~=~=~=~=~=~=~= EXAMPLE 1 =~=~=~=~=~=~=~=~=~=~ */
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



/* ~=~=~=~=~=~=~=~=~=~= EXAMPLE 2 =~=~=~=~=~=~=~=~=~=~ */
/* ~=~=~=~=~=~=~=~=~=~= hotTrends =~=~=~=~=~=~=~=~=~=~ */
// //Parameters: takes a country as a string (optional, 'US' is default)
// // optionally as the first argument pass an object: {geo: 'US'}
// googleTrends.hotTrends()
// .then(function(results){
// 	console.log("these are the results", results);
// })
// .catch(function(err){
// 	console.log("there was an err", err);
// });


/* ~=~=~=~=~=~=~=~=~=~= EXAMPLE 3 =~=~=~=~=~=~=~=~=~=~ */
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


/* ~=~=~=~=~=~=~=~=~=~= EXAMPLE 4 =~=~=~=~=~=~=~=~=~=~ */
/* ~=~=~=~=~=~=~=~=~=~= top30in30 =~=~=~=~=~=~=~=~=~=~ */
// //Parameters: none
// googleTrends.top30in30()
// .then(function(results){
// 	console.log('here are the results', util.inspect(results, {showHidden: false, depth: null}));
// })
// .catch(function(err){
// 	console.log("there was an error", err);
// });



/* ~=~=~=~=~=~=~=~=~=~= EXAMPLE 5 =~=~=~=~=~=~=~=~=~=~ */
/* ~=~=~=~=~=~=~=~=~=~= allTopCharts =~=~=~=~=~=~=~=~=~=~ */
// // Parameters: date in format yyyymm where January is 01 (optional, today's date is default), country code as string (optional, 'US' is default)
// // optionally as the first argument pass an object: {country: 'US', date: '201601'}
// googleTrends.allTopCharts({country: 'US', date: '201601'})
// .then(function(results){
// 	console.log('here are the results', util.inspect(results, {showHidden: false, depth: null}));
// })
// .catch(function(err){
// 	console.log("there was an error", err);
// });



/* ~=~=~=~=~=~=~=~=~=~= EXAMPLE 6 =~=~=~=~=~=~=~=~=~=~ */
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