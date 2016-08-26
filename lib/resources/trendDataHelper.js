'use strict';

function groupKeywords(arr) {
	var limit = 5;
	var newArr = [];
	for (var i = 0; i < arr.length; i += limit) {
		newArr.push(arr.slice(i, i + limit).join(','));
	}
	return newArr;
}

function reduceArrayDimensions(arr) {
	return arr.reduce(function (acc, curr) {
		return acc.concat(curr);
	}, []);
}

module.exports = {
	groupKeywords: groupKeywords,
	reduceArrayDimensions: reduceArrayDimensions
};