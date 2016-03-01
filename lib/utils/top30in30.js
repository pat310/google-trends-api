'use strict';

var rp = require('request-promise');
var callback = require('../resources/callbacks.js');

module.exports = function (cbFunc) {
	var obj = callback.replaceCallback({cbFunc: cbFunc});
	cbFunc = obj.cbFunc;

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
		return cbFunc(null, results);
	})
	.catch(function(err){
		return Promise.reject(cbFunc(err));
	});

};