'use strict';

var rp = require('request-promise');
const COUNTRY = require('../resources/countryCodes.js');
var callback = require('../resources/callbacks.js');

module.exports = function(country, cbFunc){
	var obj = callback.replaceCallback({country: country, cbFunc: cbFunc});
	country = obj.country;
	cbFunc = obj.cbFunc;

	if(typeof arguments[0] === 'object' && !Array.isArray(arguments[0])) country = arguments[0].geo;

	country = country || 'US';
	if(country.length > 2) country = COUNTRY.getAbbreviation(country.toUpperCase());
	var countryCode = COUNTRY.getCode(country);
	if(!countryCode) return Promise.reject(cbFunc('Could not locate country'));

	var options = {
		uri: 'http://hawttrends.appspot.com/api/terms/',
		json: true
	};

	return rp(options)
	.then(function(results){
		return cbFunc(null, results[countryCode]);
	})
	.catch(function(err){
		return Promise.reject(cbFunc(err));
	});
};