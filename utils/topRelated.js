var rp = require('request-promise');
var cheerio = require('cheerio');

module.exports = function(items){
	Promise.all(promiseArr(items))
	.then(function(htmlStrings){
		return htmlStrings.map(function(htmlString){
			return parseHtml(htmlString);
		});
	})
	.catch(function(err){
		console.log("there was an error", err);
	});
};

function promiseArr(items){
	return items.map(function(item){
		return rp(`http://www.google.com/trends/fetchComponent?hl=en-US&q=${item}&geo=US&cid=RISING_QUERIES_0_0`);
	});
}

function parseHtml(htmlString){
	$ = cheerio.load(htmlString);
	if($('.errorTitle').text()) return new Error('Quota limit exceeded');
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