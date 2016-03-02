'use strict';

var rp = require('request-promise');
// const COUNTRY = require('../resources/countryCodes.js');
// const DATE = require('../resources/dateValidate.js');
var createObj = require('../resources/callbacks.js');
var checkErrors = require('../resources/errorHandling.js');

module.exports = function request(cid, date, geo, cbFunc){
	var obj = createObj(Array.from(arguments), request);

	var error = checkErrors(obj);
	if(error instanceof Error) return Promise.reject(obj.cbFunc(error));
	console.log("here is obj", obj);
	// if(!obj.category) return Promise.reject('Category must be provided');

	// obj.date = !!obj.date ? String(obj.date) : DATE.getToday();
	// if(!DATE.isValid(obj.date)) return Promise.reject(obj.cbFunc('Date is invalid'));

	// obj.country = obj.country || 'US';
	// if(obj.country.length > 2) obj.country = COUNTRY.getAbbreviation(obj.country.toUpperCase());
	// if(!obj.country || !COUNTRY.getCode(obj.country)) return Promise.reject(obj.cbFunc('Could not locate country'));

	var options = {
		method: 'POST',
		uri: 'http://www.google.com/trends/topcharts/trendingchart',
		form: {
			ajax: '1',
			geo: obj.country,
			date: obj.date,
			cid: obj.cid
		},
		json: true
	};

	return rp(options)
	.then(function(results){
		return obj.cbFunc(null, results);
	})
	.catch(function(err){
		return Promise.reject(obj.cbFunc(err));
	});
};