function isValid(date){
	if(date.length !== 6) return false;
	return !isNaN(parseInt(date));
}

function getToday(){
	var today = new Date();
	var date = String(today.getFullYear());
	var month = today.getMonth() + 1;
	if(month < 10) date += '0';
	date += String(month);

	return date;
}

module.exports = {
	isValid: isValid,
	getToday: getToday
};