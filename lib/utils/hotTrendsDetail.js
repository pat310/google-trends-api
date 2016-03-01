'use strict';

var rp = require('request-promise');
const COUNTRY = require('../resources/countryCodes.js');
var parser = require('xml2js').parseString;
var callback = require('../resources/callbacks.js');

module.exports = function(country, cbFunc){
	var obj = callback.replaceCallback({country: country, cbFunc: cbFunc});
	country = obj.country;
	cbFunc = obj.cbFunc;

	if(typeof arguments[0] === 'object' && !Array.isArray(arguments[0])) country = arguments[0].geo;

	country = country || 'US';
	if(country.length > 2) country = COUNTRY.getAbbreviation(country.toUpperCase());
	var countryDomain = COUNTRY.getDomain(country);
	if(!countryDomain) return Promise.reject(cbFunc('Could not locate country'));

	var options = {
		uri: `http://www.${countryDomain}/trends/hottrends/atom/feed`
	};

	return rp(options)
	.then(function(results){
		return new Promise(function(resolve, reject){
			parser(results, function(err, result){
				if(err) reject(cbFunc(err));
				resolve(cbFunc(null, result));
			});
		});
	})
	.catch(function(err){
		return Promise.reject(cbFunc(err));
	});
};