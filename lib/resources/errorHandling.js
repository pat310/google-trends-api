'use strict';

var COUNTRY = require(__dirname + '/countryCodes.js');
var DATE = require(__dirname + '/dateValidate.js');

function checkErrors(obj) {
	var keys = Object.keys(obj);

	if (findKey('cid', keys) && !obj.cid) return new Error('Category must be provided');
	if (findKey('keywords', keys) && !obj.keywords) return new Error('Keywords must be provided');

	obj.date = !!obj.date ? String(obj.date) : DATE.getToday();
	if (!DATE.isValid(obj.date)) return new Error('Date is invalid');

	obj.geo = obj.geo || 'US';
	if (obj.geo.length > 2) obj.geo = COUNTRY.getAbbreviation(obj.geo.toUpperCase());
	if (!obj.geo || !COUNTRY.getCode(obj.geo)) return new Error('Could not locate country');

	obj.countryDomain = COUNTRY.getDomain(obj.geo);
	obj.countryCode = COUNTRY.getCode(obj.geo);
}

function findKey(searchKey, keys) {
	return keys.some(function (key) {
		return key === searchKey;
	});
}

module.exports = checkErrors;