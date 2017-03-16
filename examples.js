'use strict';

var googleTrends = require('./lib/google-trends-api.min.js');
var util = require('util');

/******************** Interest over time **************************/

// googleTrends.interestOverTime({keyword: 'Valentines Day'})
// .then((res) => {
//   console.log('this is res', res);
// })
// .catch((err) => {
//   console.log('got the error', err);
//   console.log('error message', err.message);
//   console.log('request body',  err.requestBody);
// });

// googleTrends.interestOverTime({keyword: 'Valentines Day', startTime: new Date(Date.now() - (4 * 60 * 60 * 1000))}, function(err, results) {
//   if (err) console.log('oh no error!', err);
//   else console.log(results);
// });


/******* Interest over time - Comparing multiple keywords *********/
// googleTrends.interestOverTime({keyword: ['Valentines Day', 'Christmas Day']})
// .then((res) => {
//   console.log('this is res', res);
// })
// .catch((err) => {
//   console.log('got the error', err);
// })


/******************** Interest by region **************************/


// googleTrends.interestByRegion({keyword: 'Donald Trump', startTime: new Date('2017-02-01'), endTime: new Date('2017-02-06'), resolution: 'CITY'})
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// })

// googleTrends.interestByRegion({keyword: 'Donald Trump', startTime: new Date('2017-02-01'), endTime: new Date('2017-02-06'), geo: 'US-CA'})
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// })


/******************** Related queries **************************/

// googleTrends.relatedQueries({keyword: 'Westminster Dog Show'})
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// })

/******************** Related topics **************************/

// googleTrends.relatedTopics({keyword: 'Chipotle', startTime: new Date('2015-01-01'), endTime: new Date('2017-02-10')})
// .then((res) => {
//   console.log(res);
// })
// .catch((err) => {
//   console.log(err);
// });
