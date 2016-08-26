'use strict';

var rp = require('request-promise');
var createObj = require(__dirname + '/../resources/callbacks.js');
var checkErrors = require(__dirname + '/../resources/errorHandling.js');

module.exports = function request(date, geo, cbFunc) {
	var obj = createObj(arguments, request);

	var error = checkErrors(obj);
	if (error instanceof Error) return Promise.reject(obj.cbFunc(error));

	var options = {
		method: 'POST',
		uri: 'http://www.google.com/trends/topcharts/category',
		form: {
			ajax: '1',
			geo: obj.geo,
			date: obj.date
		},
		json: true
	};

	return rp(options).then(function (results) {
		return obj.cbFunc(null, results);
	}).catch(function (err) {
		return Promise.reject(obj.cbFunc(err));
	});
};