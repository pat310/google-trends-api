'use strict';

var googleTrends = require('./lib/google-trends-api.js');
var util = require('util');

// 'Numbers represent search interest relative to the highest point on the chart for the given region and time. A value of 100 is the peak popularity for the term. A value of 50 means that the term is half as popular. Likewise a score of 0 means the term was less than 1% as popular as the peak.'

// must be an object, {keyword: 'SOME KEYWORD'}
// object optionally contains {startTime: new Date()} and/or {endTime: new Date()}
// object optionally contains {geo: 'some geocode string'} geocode string example 'US' or 'US-CA-800'
/*googleTrends.trends({keyword: 'OJ Simpson', startTime: new Date('2017-02-01'), endTime: new Date('2017-02-06')})
.then((res) => {
  console.log('this is res', res);
})
.catch((err) => {
  console.log('got the error', err);
})*/


// 'See in which location your term was most popular during the specified time frame. Values are calculated on a scale from 0 to 100, where 100 is the location with the most popularity as a fraction of total searches in that location, a value of 50 indicates a location which is half as popular, and a value of 0 indicates a location where the term was less than 1% as popular as the peak. <p><p> <b>Note:</b> A higher value means a higher proportion of all queries, not a higher absolute query count. So a tiny country where 80% of the queries are for "bananas" will get twice the score of a giant country where only 40% of the queries are for "bananas".'

// must be an object, {keyword: 'SOME KEYWORD'}
// object optionally contains {startTime: new Date()} and/or {endTime: new Date()}
// object optionally contains {geo: 'some geocode string'} geocode string example 'US' or 'US-CA' or 'US-CA-800'
// object optionally contains {resolution: enumerated string [COUNTRY, REGION, CITY, DMA]}
googleTrends.comparedGeo({keyword: 'OJ Simpson', startTime: new Date('2017-02-01'), endTime: new Date('2017-02-06'), geo: 'US', resolution: 'dMa'})
.then((res) => {
  console.log('this is res', res);
})
.catch((err) => {
  console.log('got the error', err);
})


// googleTrends.relatedTopics({keyword: 'Donald Trump', startTime: new Date('2017-02-06'), endTime: new Date('2017-02-10')})
// .then((res) => {
//   console.log('this is res', res);
// })
// .catch((err) => {
//   console.log('got the error', err);
// })

// googleTrends.relatedQueries({keyword: 'Donald Trump', startTime: new Date('2017-02-06'), endTime: new Date('2017-02-10')})
// .then((res) => {
//   console.log('this is res', res);
// })
// .catch((err) => {
//   console.log('got the error', err);
// })