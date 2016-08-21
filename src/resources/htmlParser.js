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

function parseJSON(htmlString){
	if(htmlString && htmlString.indexOf('errorTitle') !== -1)
		throw new Error('Quota limit exceeded, try again later');
	try {
        var parsedTrends, trendsData = [], google = { 'visualization': { 'Query': { 'setResponse': function(data) { parsedTrends = data; } } } }
        eval(htmlString);
        if(!parsedTrends) {
        	return [];
        }
        if(parsedTrends.table) {
        	for(let i = 1; i < parsedTrends.table.cols.length; i++){
        		trendsData.push({
        			query: parsedTrends.table.cols[i].label,
        			values: []
        		});
        	}
        	for(let j = 0; j < parsedTrends.table.rows.length; j++){
        		var data = parsedTrends.table.rows[j].c, date = data[0].v;
        		for(let k = 1; k < data.length; k++){
        			trendsData[k-1].values.push({
        				date: date.toUTCString(),
        				value: data[k].v
        			})
        		}
        	}
        	return trendsData;
        }
        return [];
    } catch (err) {
    	console.log(err);
        return [];
    }
}

module.exports = {
	parseHtml: parseHtml,
	parseJSON: parseJSON
};