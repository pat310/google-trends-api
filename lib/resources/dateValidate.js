'use strict';

function isValid(date) {
	if (date.length !== 6) return false;

	var month = parseInt(date[4] + date[5]);
	if (month > 12 || month === 0) return false;

	var today = getToday();
	if (parseInt(today) - parseInt(date) < 0) return false;

	return !isNaN(parseInt(date));
}

function getToday() {
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth();
	var day = today.getDate();

	month = month - 1;

	if (month <= 0) {
		year -= 1;
		month = month + 12;
	}

	if (month < 10) year += '0';
	year += String(month);

	return year;
}

module.exports = {
	isValid: isValid,
	getToday: getToday
};