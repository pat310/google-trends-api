'use strict';

var rp = require('request-promise');
var cheerio = require('cheerio');
const COUNTRY = require('../resources/countryCodes.js');

module.exports = function(keywords, country){

	if(typeof arguments[0] === 'object' && !Array.isArray(arguments[0])){
		country = arguments[0].geo;
		keywords = arguments[0].keywords;
	}

	keywords = Array.isArray(keywords) ? keywords : [keywords];
	return Promise.all(promiseArr(keywords, country))
	.then(function(htmlStrings){
		return htmlStrings.map(function(htmlString){
			return parseHtml(htmlString);
		});
	});
};

function promiseArr(keywords, country){
	country = country || 'US';
	if(country.length > 2) country = COUNTRY.getAbbreviation(country.toUpperCase());
	if(!COUNTRY.getCode(country)) return [Promise.reject('Could not locate country')];

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