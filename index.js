require('babel-core/register');

var tools = require('./utils/tools');

//Parameters: array of key words, country to search (optional)
tools.topRelated('javascript')
.then(function(topRelated){
	console.log("here are the topRelated", topRelated);
})
.catch(function(err){
	console.log("there was an error", err);
	return err;
});

// exports.search = tools;
// console.log('now here');

// exports.printMsg = function() {
//   console.log("This is a message from the demo package");
// }