'use strict';

function parseHtml(searchType, htmlString) {
    var errorRegex = /errorTitle/;
    if(htmlString.match(errorRegex)) return new Error('Quota limit exceeded, try again later');

    var listItemsRegex, barValuesRegex;
    if(searchType === 'topRelated'){
        listItemsRegex = /\"trends\.PageTracker\.analyticsTrackEvent\(\'top keywords drilldown\'\)\;\"(\s)*\>(\s)*(.*?)\<\/a\>/gm;
        barValuesRegex = /\<div class\=\"trends-hbars-value\"\>(\s)*(\S)*(.*?)\<\/div\>/gm;
    }else if(searchType === 'risingSearches'){
        listItemsRegex = /\"trends\.PageTracker\.analyticsTrackEvent\(\'rising drilldown\'\)\;\"(\s)*\>(\s)*(.*?)\<\/a\>/gm;
        barValuesRegex = /\<td class\=\"trends-bar-chart-value-cell trends-bar-chart-row(-first|-last)?\"\>(\s)*(\S)*/gm;
    }

    var listItems = htmlString.match(listItemsRegex) || [];
    var barValues = htmlString.match(barValuesRegex) || [];

    if(searchType === 'topRelated'){    
        listItems = listItems.map(function(val){
            return val.replace(/\"trends\.PageTracker\.analyticsTrackEvent\(\'top keywords drilldown\'\)\;\"(\s)*\>(\s)*/, '').replace(/\<\/a\>/, '');
        });

        barValues = barValues.map(function(val){
            return val.replace(/\<div class\=\"trends-hbars-value\"\>(\s)*/, '').replace(/\<\/div\>/, '');
        });
    }else if(searchType === 'risingSearches'){
        listItems = listItems.map(function(val){
            return val.replace(/\"trends\.PageTracker\.analyticsTrackEvent\(\'rising drilldown\'\)\;\"(\s)*\>(\s)*/, '').replace(/\<\/a\>/, '');
        });
        barValues = barValues.map(function(val){
            return val.replace(/\<td class\=\"trends-bar-chart-value-cell trends-bar-chart-row(-first|-last)?\"\>(\s)*/, '').replace(/\<\/div\>/, '');
        });
    }

    if (listItems.length === barValues.length) {
        return listItems.reduce(function(acc, curr, index) {
            acc[curr] = barValues[index];
            return acc;
        }, {});
    }

    return listItems;

}


function parseJSON(htmlString) {
    if (htmlString && htmlString.indexOf('errorTitle') !== -1)
        return new Error('Quota limit exceeded, try again later');
    var parsedTrends, trendsData = [],
        google = { 'visualization': { 'Query': { 'setResponse': function(data) { parsedTrends = data; } } } }
    try {
        eval(htmlString);
    } catch (e) {
        return [];
    }
    if (!parsedTrends) {
        return [];
    }
    if (parsedTrends.table) {
        for (let i = 1; i < parsedTrends.table.cols.length; i++) {
            trendsData.push({
                query: parsedTrends.table.cols[i].label,
                values: []
            });
        }
        for (let j = 0; j < parsedTrends.table.rows.length; j++) {
            var data = parsedTrends.table.rows[j].c,
                date = new Date(data[0].f);
            for (let k = 1; k < data.length; k++) {
                if (data[k]) {
                    trendsData[k - 1].values.push({
                        date: date.toISOString(),
                        value: data[k].v
                    })
                }
            }
        }
        return trendsData;
    }
    return [];
}

module.exports = {
    parseHtml: parseHtml,
    parseJSON: parseJSON
};
