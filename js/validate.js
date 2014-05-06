function addSessionValidate() {
var courseValid;
var locationValid;
var timeValid;
var detailsValid;

	if (!testCourseValid('#courseName')) {
		$('#errCourse').removeClass("goodInput").addClass("badInput");
		$("#errCourse").html("You must select a course");
		courseValid = false;
	}
	else {
		$('#errCourse').removeClass("badInput").addClass("goodInput");
		$("#errCourse").html("Valid");
		courseValid = true;
	}
	
	if (!testLocationValid('#location')) {
		$('#errLocation').removeClass("goodInput");
		$('#errLocation').addClass("badInput");
		$('#errLocation').html("You must enter a location");
		locationValid = false;
	}
	else {
		$('#errLocation').removeClass("badInput");
		$('#errLocation').addClass("goodInput");
		$('#errLocation').html("Valid");
		locationValid = true;
	}
	
	if (!testTimeValid('#startTime') || !testTimeValid('#endTime')) {
		$('#errTime').removeClass("goodInput").addClass("badInput");
		$('#errTime').html("You must choose a time");
		timeValid = false;
	}
	else {
		$('#errTime').removeClass("badInput").addClass("goodInput");
		$('#errTime').html("Valid");
		timeValid = true;
	}
	
	if (!testDetailsValid('#details')) {
		$('#errDetails').removeClass("goodInput").addClass("badInput");
		$('#errDetails').html("You must enter details");
		detailsValid = false;
	}
	else {
		$('#errDetails').removeClass("badInput").addClass("goodInput");
		$('#errDetails').html("Valid");
		detailsValid = true;
	}

	if (courseValid && locationValid && timeValid && detailsValid) {
		return true;
	}
	else {
		return false;
	}
}

/*=============================================================*/

function testCourseValid(id) {
	if ($(id).prop("selectedIndex") == 0) {
		$('#errCourse').removeClass("goodInput").addClass("badInput");
		$("#errCourse").html("You must select a course");
		return false;
	}
	else {
		$('#errCourse').removeClass("badInput").addClass("goodInput");
		$("#errCourse").html("Valid");
		return true;
	}
}

function testLocationValid(id) {
	if ($(id).val() == "") {
		$('#errLocation').removeClass("goodInput");
		$('#errLocation').addClass("badInput");
		$('#errLocation').html("You must enter a location");
		return false;
	}
	else {
		$('#errLocation').removeClass("badInput");
		$('#errLocation').addClass("goodInput");
		$('#errLocation').html("Valid");
		return true;
	}
}

function testTimeValid(id) {
	if ($(id).val() == "") {
		$('#errTime').removeClass("goodInput").addClass("badInput");
		$('#errTime').html("You must choose a time");
		return false;
	}
	else {
		$('#errTime').removeClass("badInput").addClass("goodInput");
		$('#errTime').html("Valid");
		return true;
	}
}

function testDetailsValid(id) {
	if ($(id).val() == "") {
		$('#errDetails').removeClass("goodInput").addClass("badInput");
		$('#errDetails').html("You must enter details");
		return false;
	}
	else {
		$('#errDetails').removeClass("badInput").addClass("goodInput");
		$('#errDetails').html("Valid");
		return true;
	}
}

//Helper functions it tests if string ends with another string
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

//Test if an email address is valid my.bcit.ca address
function validateEmail(id, err){
    if (testValidEmail(id)) {
        $(id).addClass('goodInput').removeClass('badInput');
        $(err).addClass('invisible');
    } else {
        $(id).addClass('badInput').removeClass('goodInput');
        $(err).removeClass('invisible');
    }
}

function testValidEmail(id){
    var elem = $(id);
    var value = elem.val();
    value = value.trim();
    return (value.endsWith("my.bcit.ca"));
}

//Test if a User Name is valid (at least 2 non-space characters)
function validateName(id, err){
    if (testValidName(id)) {
        $(id).addClass('goodInput').removeClass('badInput');
        $(err).addClass('invisible');
    } else {
        $(id).addClass('badInput').removeClass('goodInput');
        $(err).removeClass('invisible');
    }
}

function testValidName(id){
    var elem = $(id);
    var value = elem.val();
    value = value.trim();
    return (value.length >= 2);
}

//Test if a password is valid (at least 4 non-space characters)
function validatePass(id, err){
    if (testValidPass(id)) {
        $(id).addClass('goodInput').removeClass('badInput');
        $(err).addClass('invisible');
    } else {
        $(id).addClass('badInput').removeClass('goodInput');
        $(err).removeClass('invisible');
    }
}

function testValidPass(id){
    var elem = $(id);
    var value = elem.val();
    value.replace(/\s/, "");
    return (value.length >= 4);
}

//Test if two things (passwords) match
function validateMatching(id1, id2, err){
    if (testMatching(id1, id2)) {
        $(id2).addClass('goodInput').removeClass('badInput');
        $(err).addClass('invisible');
    } else {
        $(id2).addClass('badInput').removeClass('goodInput');
        $(err).removeClass('invisible');
    }
}

function testMatching(id1, id2){
    var val1 = $(id1).val();
    var val2 = $(id2).val();
    return (val1 == val2);
}

function validateForm() {
    result = true;

    if (!testValidEmail('#regEmail')) {
        validateEmail('#regEmail', '#errRegEmail');
        result = false;
    }
    if (!testValidName('#regStudName')) {
        validateName('#regStudName', '#errRegName');
        result = false;
    }
    if (!testValidPass('#regPassword')) {
        validatePass('#regPassword', '#errRegPass');
        result = false;
    }
    if (!testMatching('#regPassword', '#regConfirmPassword')) {
        validateMatching('#regPassword', '#regConfirmPassword', '#errRegConfirmPass');
        result = false;
    }
    return result;
    alert("result");
}
