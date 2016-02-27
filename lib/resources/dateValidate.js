function isValid(date){
	if(date.length !== 6) return false;
	
	var month = parseInt(date[4] + date[5]);
	if(month > 12 || month === 0) return false;

	var today = getToday();
	if(parseInt(today) - parseInt(date) < 0) return false;

	return !isNaN(parseInt(date));
}

function getToday(){
	var today = new Date();
	var date = today.getFullYear();
	var month = today.getMonth();

	if(month === 0){
		date -= 1;
		month = 12;
	}

	if(month < 10) date += '0';
	date += String(month);

	return date;
}

module.exports = {
	isValid: isValid,
	getToday: getToday
};