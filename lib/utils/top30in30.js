'use strict';

var rp = require('request-promise');
var createObj = require('../resources/callbacks.js');

module.exports = function request(cbFunc) {
	var obj = createObj(Array.from(arguments), request);

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
		return obj.cbFunc(null, results);
	})
	.catch(function(err){
		return Promise.reject(obj.cbFunc(err));
	});

};