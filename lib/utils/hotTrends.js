var rp = require('request-promise');
const COUNTRY = require('../resources/countryCodes.js');

module.exports = function(country){
	country = country || 'US';
	if(country.length > 2) country = COUNTRY.getAbbreviation(country.toUpperCase());
	var countryCode = COUNTRY.getCode(country);
	if(!countryCode) return Promise.reject('Could not locate country');

	var options = {
		uri: 'http://hawttrends.appspot.com/api/terms/',
		json: true
	};

	return rp(options)
	.then(function(results){
		return results[countryCode];
	});
};