function addSessionValidate() {
var courseValid;
var locationValid;
var timeValid;
var detailsValid;

	if (!testCourseValid('courseName')) {
		$('itmCourse').className="badInput";
		$('errCourse').innerHTML = "You must select a course";
		courseValid = false;
	}
	else {
		$('itmCourse').className = "";
		$('errCourse').innerHTML = "";
		courseValid = true;
	}
	
	if (!testLocationValid('location')) {
		$('itmLocation').className="badInput";
		$('errLocation').innerHTML = "You must enter a location";
		locationValid = false;
	}
	else {
		$('itmLocation').className = "";
		$('errLocation').innerHTML = "";
		locationValid = true;
	}
	
	if (!testTimeValid('startTime') || !testTimeValid('endTime')) {
		$('itmTime').className="badInput";
		$('errTime').innerHTML = "You must choose a time";
		timeValid = false;
	}
	else {
		$('itmTime').className = "";
		$('errTime').innerHTML = "";
		timeValid = true;
	}
	
	if (!testDetailsValid('details')) {
		$('itmDetails').className="badInput";
		$('errDetails').innerHTML = "You must enter details";
		detailsValid = false;
	}
	else {
		$('itmDetails').className = "";
		$('errDetails').innerHTML = "";
		detailsValid = true;
	}
	
	return false;
}

function $(id) {
	var element = document.getElementById(id);
	if (element == null )
		alert("programmer error: " + id + "does not exist.");
	return element;
}

function testCourseValid(id) {
	if ($(id).selectedIndex == 0) {
		return false;
	}
	else {
		return true;
	}
}

function testLocationValid(id) {
	if ($(id).value == "") {
		return false;
	}
	else {
		return true;
	}
}

function testTimeValid(id) {
	if ($(id).value == "") {
		return false;
	}
	else {
		return true;
	}
}

function testDetailsValid(id) {
	if ($(id).value == "") {
		return false;
	}
	else {
		return true;
	}
}