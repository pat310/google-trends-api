'use strict';

var cheerio = require('cheerio');

function parseHtml(htmlString){
	var $ = cheerio.load(htmlString);
	if($('.errorTitle').text()) return new Error('Quota limit exceeded, try again later');

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

function parseJSON(htmlString, wordArr){
	var dates = htmlString.match(/\"f\"\:\"\w+ \d{4}\"/g);
	var data = htmlString.match(/\"f\"\:\"\d+\"/g);

	if(!!dates && Array.isArray(dates)){
		return dates.reduce(function(acc, curr, index){
			for(let i = 0; i < wordArr.length; i++){
				let obj = {};
				obj[curr.split('"')[3]] = data[index + i].split('"')[3];
				if(!acc[i % wordArr.length]) acc[i % wordArr.length] = [];
				acc[i % wordArr.length].push(obj);
			}
			return acc;
		},[]);
	}

	return new Error('An error occured, try again later');
}

module.exports = {
	parseHtml: parseHtml,
	parseJSON: parseJSON
};