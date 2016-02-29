'use strict';

var rp = require('request-promise');

module.exports = function () {
	var options = {
		method: 'POST',
		uri: 'http://www.google.com/trends/hottrends/hotItems',
		form: {
			ajax: '1',
			pn: 'p1',
			htv: 'm'
		},
		json: true
	};

	return rp(options)
	.then(function(results){
		return results;
	});

};