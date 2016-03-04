'use strict';

var cheerio = require('cheerio');

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

module.exports = parseHtml;