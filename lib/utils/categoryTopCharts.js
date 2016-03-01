'use strict';

var rp = require('request-promise');
const COUNTRY = require('../resources/countryCodes.js');
const DATE = require('../resources/dateValidate.js');
var callback = require('../resources/callbacks.js');

module.exports = function(category, date, country, cbFunc){
	var obj = callback.replaceCallback({category: category, date: date, country: country, cbFunc: cbFunc});
	category = obj.category;
	country = obj.country;
	date = obj.date;
	cbFunc = obj.cbFunc;

	if(typeof arguments[0] === 'object' && !Array.isArray(arguments[0])){
		country = arguments[0].geo;
		date = arguments[0].date
		category = arguments[0].category;
	}

	if(!category) return Promise.reject('Category must be provided');

	date = !!date ? String(date) : DATE.getToday();
	if(!DATE.isValid(date)) return Promise.reject(cbFunc('Date is invalid'));

	country = country || 'US';
	if(country.length > 2) country = COUNTRY.getAbbreviation(country.toUpperCase());
	if(!country || !COUNTRY.getCode(country)) return Promise.reject(cbFunc('Could not locate country'));

	var options = {
		method: 'POST',
		uri: 'http://www.google.com/trends/topcharts/trendingchart',
		form: {
			ajax: '1',
			geo: country,
			date: date,
			cid: category
		},
		json: true
	};

	return rp(options)
	.then(function(results){
		return cbFunc(null, results);
	})
	.catch(function(err){
		return Promise.reject(cbFunc(err));
	});
};