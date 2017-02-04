'use strict';

var rp = require('request-promise');
var createObj = require('./../resources/callbacks.js');
var checkErrors = require('./../resources/errorHandling.js');
var parseJSON = require('./../resources/htmlParser.js').parseJSON;
var groupKeywords = require('./../resources/trendDataHelper.js').groupKeywords;
var reduceArrayDimensions = require('./../resources/trendDataHelper.js').reduceArrayDimensions;

module.exports = function request(keywords, timePeriod, cbFunc){
	var obj = createObj(arguments, request);

	var error = checkErrors(obj);
	if(error instanceof Error) return Promise.reject(obj.cbFunc(error));

	return Promise.all(promiseArr(obj.keywords, obj.timePeriod))
	.then(function(results){
		return obj.cbFunc(null, reduceArrayDimensions(results));
	})
	.catch(function(err){
		return Promise.reject(obj.cbFunc(err));
	});
};

function promiseArr(keywords, timePeriod){
	return groupKeywords(keywords).map(function(keyword, index, arr){
		return rp(`http://www.google.com/trends/fetchComponent?q=${keyword}&cid=TIMESERIES_GRAPH_0&export=3&${timePeriod}`)
		.then(function(htmlString){
			return parseJSON(htmlString, arr[index].split(','));
		});
	});
}