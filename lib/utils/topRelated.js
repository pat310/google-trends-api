'use strict';

var rp = require('request-promise');
var createObj = require(__dirname + '/../resources/callbacks.js');
var checkErrors = require(__dirname + '/../resources/errorHandling.js');
var parseHtml = require(__dirname + '/../resources/htmlParser.js').parseHtml;

module.exports = function request(keywords, geo, cbFunc) {
	var obj = createObj(arguments, request);

	var error = checkErrors(obj);
	if (error instanceof Error) return Promise.reject(obj.cbFunc(error));

	return Promise.all(promiseArr(obj.keywords, obj.geo)).then(function (results) {
		return obj.cbFunc(null, results);
	}).catch(function (err) {
		return Promise.reject(obj.cbFunc(err));
	});
};

function promiseArr(keywords, country) {
	return keywords.map(function (keyword) {
		return rp('http://www.google.com/trends/fetchComponent?hl=en-US&q=' + keyword + '&geo=' + country + '&cid=RISING_QUERIES_0_0').then(function (htmlStrings) {
			return parseHtml(htmlStrings);
		});
	});
}