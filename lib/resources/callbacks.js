'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function generic(err, results) {
	if (err) return err;
	return results;
}

var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
	var fnStr = func.toString().replace(STRIP_COMMENTS, '');
	var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
	if (result === null) result = [];
	return result;
}

function parseArguments(args, func) {
	args = Array.prototype.slice.call(args);
	var parameters = getParamNames(func);

	var returnObj = parameters.reduce(function (acc, curr, index) {
		if ((_typeof(args[index]) !== 'object' || Array.isArray(args[index])) && curr !== 'cbFunc') acc[curr] = typeof args[index] !== 'function' ? args[index] : undefined;
		if (typeof args[index] === 'function') acc.cbFunc = args[index];
		return acc;
	}, {});

	if (_typeof(args[0]) === 'object' && !Array.isArray(args[0])) mergeObjs(args[0], returnObj);

	returnObj.cbFunc = typeof returnObj.cbFunc === "function" ? returnObj.cbFunc : generic;

	if (returnObj.keywords) returnObj.keywords = Array.isArray(returnObj.keywords) ? returnObj.keywords : [returnObj.keywords];

	return returnObj;
}

function mergeObjs(obj1, obj2) {
	for (var key in obj1) {
		if (key === 'category') obj2.cid = obj1[key];else obj2[key] = obj1[key];
	}
}

module.exports = parseArguments;