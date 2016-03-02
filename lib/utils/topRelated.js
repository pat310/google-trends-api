'use strict';

var rp = require('request-promise');
var cheerio = require('cheerio');
var createObj = require('../resources/callbacks.js');
var checkErrors = require('../resources/errorHandling.js');

module.exports = function request(keywords, geo, cbFunc){
	var obj = createObj(Array.from(arguments), request);

	var error = checkErrors(obj);
	if(error instanceof Error) return Promise.reject(obj.cbFunc(error));

	return Promise.all(promiseArr(obj.keywords, obj.geo))
	.then(function(htmlStrings){
		return obj.cbFunc(null, htmlStrings.map(function(htmlString){
			return parseHtml(htmlString);
		}));
	})
	.catch(function(err){
		return Promise.reject(obj.cbFunc(err));
	});
};

function promiseArr(keywords, country){
	return keywords.map(function(keyword){
		return rp(`http://www.google.com/trends/fetchComponent?hl=en-US&q=${keyword}&geo=${country}&cid=RISING_QUERIES_0_0`);
	});
}

function parseHtml(htmlString){
	var $ = cheerio.load(htmlString);
	if($('.errorTitle').text()) throw new Error('Quota limit exceeded, try again later');

	var listItems = $('a').attr('onclick', "trends.PageTracker.analyticsTrackEvent('rising drilldown');").text();
	var barValues = $('td.trends-bar-chart-value-cell').text();
	
	listItems = removeWhiteSpace(listItems.replace(/\r?\n|\r/g, ",").split(','));
	barValues = removeWhiteSpace(barValues.replace(/\r?\n|\r/g, "!").split('!'));

	if(listItems.length === barValues.length){
		return listItems.reduce(function(acc, curr, index){
			acc[curr] = barValues[index];
			return acc;
		}, {});
	}

	return listItems;

}

function removeWhiteSpace(arr){
	return arr.reduce(function(acc, curr){
		if(curr.trim() !== "") acc.push(curr.trim());
		return acc;
	}, []);
}