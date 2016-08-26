'use strict';

var rp = require('request-promise');
var createObj = require(__dirname + '/../resources/callbacks.js');
var checkErrors = require(__dirname + '/../resources/errorHandling.js');

module.exports = function request(geo, cbFunc) {
	var obj = createObj(arguments, request);

	var error = checkErrors(obj);
	if (error instanceof Error) return Promise.reject(obj.cbFunc(error));

	var options = {
		uri: 'http://hawttrends.appspot.com/api/terms/',
		json: true
	};

	return rp(options).then(function (results) {
		return obj.cbFunc(null, results[obj.countryCode]);
	}).catch(function (err) {
		return Promise.reject(obj.cbFunc(err));
	});
};