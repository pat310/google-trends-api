'use strict';

require('babel-core/register');

var tools = require('./lib/utils/');

// // Parameters: array of key words (required), country as a string (optional, 'US' is default)
// // optionally as the first argument pass an object: {keywords: ['dog'], geo: 'US'}
// tools.topRelated({keywords: 'dog'})
// .then(function(topRelated){
// 	console.log("here are the topRelated", topRelated);
// })
// .catch(function(err){
// 	console.log("there was an error", err);
// 	return err;
// });

// //Parameters: takes a country as a string (optional, 'US' is default)
// // optionally as the first argument pass an object: {geo: 'US'}
// tools.hotTrends({geo: 'JP'})
// .then(function(results){
// 	console.log("these are the results", results);
// })
// .catch(function(err){
// 	console.log("there was an err", err);
// });

// //Parameters: none
// tools.top30in30()
// .then(function(results){
// 	console.log("these are the results", results);
// });

// // Parameters: date in format yyyymm where January is 01 (optional, today's date is default), country code as string (optional, 'US' is default)
// // optionally as the first argument pass an object: {country: 'US', date: '201601'}
// tools.allTopCharts({country: 'US', date: '201601'})
// .then(function(results){
// 	console.log('got your results here', results);
// })
// .catch(function(err){
// 	console.log("there was an error", err);
// });

// //Parameters: category (required), date in format yyyymm where January is 01 (optional, today's date is default), country code as string (optional, 'US' is default)
// // optionally as the first argument pass an object: {category: 'actors', geo: 'US', date:'201601'}
// tools.categoryTopCharts({category: 'actors', geo: 'US', date:'201601'})
// .then(function(results){
// 	console.log('results here', results);
// })
// .catch(function(err){
// 	console.log('there was an error', err);
// });

// module.exports = require('./lib/utils/');
// console.log('now here');

// exports.printMsg = function() {
//   console.log("This is a message from the demo package");
// }