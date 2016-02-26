var rp = require('request-promise');
const COUNTRY = require('../resources/countryCodes.js');

module.exports = function(country){
	country = country || 'US';
	var countryCode = COUNTRY.getCode(country);
	if(!countryCode) return Promise.reject(`country ${country} not available`);

	var options = {
		uri: 'http://hawttrends.appspot.com/api/terms/',
		json: true
	};

	return rp(options)
	.then(function(results){
		return results[countryCode];
	});
};