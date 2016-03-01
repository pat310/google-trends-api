'use strict';

const DATE = require('./dateValidate.js');

function exists(args){
	return Array.from(args).some(function(argument){
		return typeof argument === 'function';
	});
}

function generic(err, results){
	if(err) return err;
	return results;
}

var defaultMap = {
	country: 'US',
	date: DATE.getToday()
};

function replaceCallback(obj){
	for(var key in obj){
		if(typeof obj[key] === 'function'){
			obj.cbFunc = obj[key];
			if(defaultMap[key]) obj[key] = defaultMap[key];
		}
	}

	obj.cbFunc = obj.cbFunc || generic;

	return obj;
}

module.exports = {
	exists: exists,
	replaceCallback: replaceCallback
};