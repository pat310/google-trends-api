require('babel-core/register');

var tools = require('./utils/');

// //Parameters: array of key words, country as a string (optional, 'US' is default)
// tools.topRelated('dog house')
// .then(function(topRelated){
// 	console.log("here are the topRelated", topRelated);
// })
// .catch(function(err){
// 	console.log("there was an error", err);
// 	return err;
// });

// //Parameters: takes a country as a string (optional, 'US' is default)
// tools.hotTrends()
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

// //Parameters: date in format yyyymm where January is 01 (optional, today's date is default), country code as string (optional, 'US' is default)
// tools.allTopCharts()
// .then(function(results){
// 	console.log('got your results here', results);
// })
// .catch(function(err){
// 	console.log("there was an error", err);
// });

//Parameters: category (required), date in format yyyymm where January is 01 (optional, today's date is default), country code as string (optional, 'US' is default)
tools.categoryTopCharts('actors')
.then(function(results){
	console.log('results here', results);
})
.catch(function(err){
	console.log('there was an error', err);
});

// module.exports = require('./utils/');
// console.log('now here');

// exports.printMsg = function() {
//   console.log("This is a message from the demo package");
// }