'use strict';

var rp = require('request-promise');
var createObj = require(__dirname + '/../resources/callbacks.js');
var checkErrors = require(__dirname + '/../resources/errorHandling.js');
var parseHtml = require(__dirname + '/../resources/htmlParser.js').parseHtml.bind(null, 'topRelated');

module.exports = function request(keywords, timePeriod, geo, cbFunc){
	var obj = createObj(arguments, request);
	if(!obj.keywords) delete obj.keywords;

	var error = checkErrors(obj);
	if(error instanceof Error) return Promise.reject(obj.cbFunc(error));

	return Promise.all(promiseArr(obj.keywords || [''], obj.timePeriod, obj.geo))
	.then(function(results){
		return obj.cbFunc(null, results);
	})
	.catch(function(err){
		return Promise.reject(obj.cbFunc(err));
	});
};

function promiseArr(keywords, timePeriod, country){
	return keywords.map(function(keyword){
		return rp(`http://www.google.com/trends/fetchComponent?hl=en-US&q=${keyword}&geo=${country}&cid=TOP_QUERIES_0_0&${timePeriod}`)
		.then(function(htmlStrings){
			return parseHtml(htmlStrings);
		});
	});
}