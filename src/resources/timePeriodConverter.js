'use strict';

module.exports = function(timePeriodObj){
	if(!timePeriodObj) return '';
	if(typeof timePeriodObj !== 'object') return new Error('timePeriod must be an object of type {type: enum, value: number}');
	
	const enumTypes = {
		hour: ['now', 'H'],
		day: ['now', 'd'],
		month: ['today', 'm'],
		year: ['today', 'm']
	};

	if(typeof timePeriodObj.type !== 'string' || !enumTypes[timePeriodObj.type.toLowerCase()]) return new Error('type must be one of the specified enumerated types');
	if(!timePeriodObj.value || typeof timePeriodObj.value !== 'number' ) return new Error('timePeriod value must be a number');

	return `date=${enumTypes[timePeriodObj.type.toLowerCase()][0]} ${timePeriodObj.type.toLowerCase() === 'year' ? Math.round(timePeriodObj.value) * 12 : Math.round(timePeriodObj.value)}-${enumTypes[timePeriodObj.type.toLowerCase()][1]}`;
}