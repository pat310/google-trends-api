'use strict';

const {
	constructObj,
	getResults,
} = require('../resources/utilities');

export default function request(obj) {

  return getResults('interest over time', constructObj(obj))
  .then((res) => {
    console.log('res!', res);
  });

	// var error = checkErrors(obj);
	// if(error instanceof Error) return Promise.reject(obj.cbFunc(error));

	// return Promise.all(promiseArr(obj.keywords, obj.timePeriod))
	// .then(function(results){
	// 	return obj.cbFunc(null, reduceArrayDimensions(results));
	// })
	// .catch(function(err){
	// 	return Promise.reject(obj.cbFunc(err));
	// });
};

// function promiseArr(keywords, timePeriod){
// 	return groupKeywords(keywords).map(function(keyword, index, arr){
// 		return rp(`http://www.google.com/trends/fetchComponent?q=${keyword}&cid=TIMESERIES_GRAPH_0&export=3&${timePeriod}`)
// 		.then(function(htmlString){
// 			return parseJSON(htmlString, arr[index].split(','));
// 		});
// 	});
// }