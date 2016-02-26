var rp = require('request-promise');
var cheerio = require('cheerio');
const COUNTRY = require('../resources/countryCodes.js');

module.exports = function(items, country){
	Promise.all(promiseArr(items, country))
	.then(function(htmlStrings){
		return htmlStrings.map(function(htmlString){
			return parseHtml(htmlString);
		});
	})
	.catch(function(err){
		console.log("there was an error", err);
	});
};

function promiseArr(items, country){
	country = country || 'US';
	if(country.length > 2) country = COUNTRY.getAbbreviation(country);
	if(!COUNTRY.getCode(country)){
		console.log('yea we are rejecting')
		return [new Promise(function(resolve, reject){
			reject('Could not locate country');
		})];
	}

	return items.map(function(item){
		return rp(`http://www.google.com/trends/fetchComponent?hl=en-US&q=${item}&geo=${country}&cid=RISING_QUERIES_0_0`);
	});
}

function parseHtml(htmlString){
	$ = cheerio.load(htmlString);
	if($('.errorTitle').text()) return new Error('Quota limit exceeded, try again later');

	var listItems = $('a').attr('onclick', "trends.PageTracker.analyticsTrackEvent('rising drilldown');").text();
	var barValues = $('td.trends-bar-chart-value-cell').text();
	
	listItems = listItems.replace(/\r?\n|\r/g, ",").split(',').map(function(listItem){
		return listItem.trim();
	})
	.filter(function(listItem){
		return listItem !== "";
	});

	barValues = barValues.replace(/\r?\n|\r/g, ",").split(',').map(function(barValue){
		return barValue.trim();
	})
	.filter(function(barValue){
		return barValue.trim() !== "";
	});

	return listItems.reduce(function(acc, curr, index){
		acc[curr] = barValues[index];
		return acc;
	}, {});
}