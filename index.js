require('babel-core/register');

var tools = require('./utils/');

//Parameters: array of key words, country as a string (optional)
tools.topRelated('dog')
.then(function(topRelated){
	console.log("here are the topRelated", topRelated);
})
.catch(function(err){
	console.log("there was an error", err);
	return err;
});

//Parameters: takes a country as a string (optional)
// tools.hotTrends()
// .then(function(results){
// 	console.log("these are the results", results);
// })
// .catch(function(err){
// 	console.log("there was an err", err);
// });

// module.exports = require('./utils/');
// console.log('now here');

// exports.printMsg = function() {
//   console.log("This is a message from the demo package");
// }