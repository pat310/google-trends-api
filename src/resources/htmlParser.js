'use strict';

function parseHtml(searchType, htmlString) {
    var errorRegex = /errorTitle/;
    if(htmlString.match(errorRegex)) return new Error('Quota limit exceeded, try again later');

    var listItemsRegex, barValuesRegex, listItemsRemoveRegex, barValuesRemoveRegex;
    if(searchType === 'topRelated'){
        listItemsRegex = /\"trends\.PageTracker\.analyticsTrackEvent\(\'top keywords drilldown\'\)\;\"(\s)*\>(\s)*(\n)*((\w|\s)*)?/gm;
        barValuesRegex = /\<div class\=\"trends-hbars-value\"\>(\s)*(\d*)/gm;
        listItemsRemoveRegex = /\"trends\.PageTracker\.analyticsTrackEvent\(\'top keywords drilldown\'\)\;\"(\s)*\>(\s)*/;
        barValuesRemoveRegex = /\<div class\=\"trends-hbars-value\"\>(\s)*/;
    }else if(searchType === 'risingSearches'){
        listItemsRegex = /\"trends\.PageTracker\.analyticsTrackEvent\(\'rising drilldown\'\)\;\"(\s)*\>(\s)*(\n)*((\w|\s)*)?/gm;
        barValuesRegex = /\<td class\=\"trends-bar-chart-value-cell trends-bar-chart-row(-first|-last)?\"\>(\s)*(\S)*/gm;
        listItemsRemoveRegex = /\"trends\.PageTracker\.analyticsTrackEvent\(\'rising drilldown\'\)\;\"(\s)*\>(\s)*/;
        barValuesRemoveRegex = /\<td class\=\"trends-bar-chart-value-cell trends-bar-chart-row(-first|-last)?\"\>(\s)*/;
    }

    var listItems = (htmlString.match(listItemsRegex) || []).map(function(val){
        return val.replace(listItemsRemoveRegex, '');
    });

    var barValues = (htmlString.match(barValuesRegex) || []).map(function(val){
        return val.replace(barValuesRemoveRegex, '');
    });

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
                date = new Date(data[0].v);
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
