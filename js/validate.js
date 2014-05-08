
/***********************************************************************
 * Validate study session information before adding it or modifying it.
 ***********************************************************************/

/*  
 * Function: addSessionValidate()
 * Purpose: Test all conditions in the form
 */
function addSessionValidate() {
var courseValid;
var locationValid;
var timeValid;
var detailsValid;

	if (!testCourseValid('#courseName')) {
		$('#errCourse').removeClass("goodInput").addClass("badInput");
		$("#errCourse").html("Select a course");
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
		$('#errLocation').html("Enter a location");
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
		$('#errTime').html("Choose a time");
		timeValid = false;
	}
	else {
		$('#errTime').removeClass("badInput").addClass("goodInput");
		$('#errTime').html("Valid");
		timeValid = true;
	}
	
	if (!testDetailsValid('#details')) {
		$('#errDetails').removeClass("goodInput").addClass("badInput");
		$('#errDetails').html("Enter some details");
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

/* 
 * Function: testCourseValid(id)
 * Purpose: Test if a course has been selected for the study session.
 *          and give feedback if invalid.
 * Params:
 *      id - The id of the option box to test.
 * Return true if course is valid
 */
function testCourseValid(id) {
	if ($(id).prop("selectedIndex") == 0) {
		$('#errCourse').removeClass("goodInput").addClass("badInput");
		$("#errCourse").html("Select a course");
		return false;
	}
	else {
		$('#errCourse').removeClass("badInput").addClass("goodInput");
		$("#errCourse").html("Valid");
		return true;
	}
}

/* 
 * Function: testLocationValid(id)
 * Purpose: Test if a location has been entered and show an error if not.
 * Params:
 *      id - The id of the textbox to test.
 * Return true if location is valid
 */
function testLocationValid(id) {
	if ($(id).val() == "") {
		$('#errLocation').removeClass("goodInput");
		$('#errLocation').addClass("badInput");
		$('#errLocation').html("Enter a location");
		return false;
	}
	else {
		$('#errLocation').removeClass("badInput");
		$('#errLocation').addClass("goodInput");
		$('#errLocation').html("Valid");
		return true;
	}
}

/* 
 * Function: testTimeValid(id)
 * Purpose: Test if the user has entered a time.
 * Params:
 *      id - The id of the time input to test.
 * Return true if the time is valid.
 */
function testTimeValid(id) {
	if ($(id).val() == "") {
		$('#errTime').removeClass("goodInput").addClass("badInput");
		$('#errTime').html("Choose a time");
		return false;
	}
	else {
		$('#errTime').removeClass("badInput").addClass("goodInput");
		$('#errTime').html("Valid");
		return true;
	}
}

/* 
 * Function: testDetailsValid(id)
 * Purpose: Test if the user has entered any details.
 * Params:
 *      id - The id of the text input to test.
 * Return true if any details are entered.
 */
function testDetailsValid(id) {
	if ($(id).val() == "") {
		$('#errDetails').removeClass("goodInput").addClass("badInput");
		$('#errDetails').html("Enter some details");
		return false;
	}
	else {
		$('#errDetails').removeClass("badInput").addClass("goodInput");
		$('#errDetails').html("Valid");
		return true;
	}
}
/*
 *  End of add/modify session validation.
 */



/*******************************************************************
 *  Validate registration information before allowing registration.
 *******************************************************************/

/* 
 * Function: validateEmail(id, err)
 * Purpose: Show an error if the email is invalid.
 * Params:
 *      id  - The id of the email input to test.
 *      err - The id of the div that holds the error message.
 */
function validateEmail(id, err){
    if (testValidEmail(id)) {
        $(id).addClass('goodInput').removeClass('badInput');
        $(err).addClass('invisible');
    } else {
        $(id).addClass('badInput').removeClass('goodInput');
        $(err).removeClass('invisible');
    }
}

//Helper functions it tests if string ends with another string
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

/* 
 * Function: testValidEmail(id)
 * Purpose: test if an email is valid (ends with my.bcit.ca)
 * Params:
 *      id  - The id of the email input to test.
 * Return: True if the email is valid.
 */
function testValidEmail(id){
    var elem = $(id);
    var value = elem.val();
    value = value.trim();
    return (value.endsWith("my.bcit.ca"));
}

/* 
 * Function: validateName(id, err)
 * Purpose: Show an error if the username is invalid.
 * Params:
 *      id  - The id of the name input to test.
 *      err - The id of the div that holds the error message.
 */
function validateName(id, err){
    if (testValidName(id)) {
        $(id).addClass('goodInput').removeClass('badInput');
        $(err).addClass('invisible');
    } else {
        $(id).addClass('badInput').removeClass('goodInput');
        $(err).removeClass('invisible');
    }
}

/* 
 * Function: testValidName(id)
 * Purpose: Test if the username is valid (at least two letters, non-space).
 * Params:
 *      id  - The id of the name input to test.
 * Return: True if the name is valid.
 */
function testValidName(id){
    var elem = $(id);
    var value = elem.val();
    value = value.trim();
    return (value.length >= 2);
}

/* 
 * Function: validatePass(id, err)
 * Purpose: Show an error if the password is invalid.
 * Params:
 *      id  - The id of the password input to test.
 *      err - The id of the div that holds the error message.
 */
function validatePass(id, err){
    if (testValidPass(id)) {
        $(id).addClass('goodInput').removeClass('badInput');
        $(err).addClass('invisible');
    } else {
        $(id).addClass('badInput').removeClass('goodInput');
        $(err).removeClass('invisible');
    }
}

/* 
 * Function: testValidPass(id)
 * Purpose: Test if the password is valid (4+ chars, no spaces)
 * Params:
 *      id - The id of the password input to test.
 * Return: True if the password is valid.
 */
function testValidPass(id){
    var elem = $(id);
    var value = elem.val();
    value.replace(/\s/, "");
    return (value.length >= 4);
}

/* 
 * Function: validateMatching(id1, id2, err)
 * Purpose: Show an error if the values of the ids don't match.
 * Params:
 *      id1 - The id of first  element to test.
 *      id2 - The id of second element to test.
 *      err - The id of the div that holds the error message.
 */
function validateMatching(id1, id2, err){
    if (testMatching(id1, id2)) {
        $(id2).addClass('goodInput').removeClass('badInput');
        $(err).addClass('invisible');
    } else {
        $(id2).addClass('badInput').removeClass('goodInput');
        $(err).removeClass('invisible');
    }
}

/* 
 * Function: testMatching(id1, id2)
 * Purpose: Test if the password is valid (4+ chars, no spaces)
 * Params:
 *      id - The id of the password input to test.
 * Return: True if the password is valid.
 */
function testMatching(id1, id2){
    var val1 = $(id1).val();
    var val2 = $(id2).val();
    return (val1 == val2);
}

/* 
 * Function: validateForm()
 * Purpose: Test all the elements of the registration form
 * Return: true if everything checks out.
 */
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
}

/*****************************************************
 *  Validate disclaimer before allowing registration.
 *****************************************************/

/* 
 * Function: disclaimerCheckboxValidation(checkboxId, hiddenElementId)
 * Purpose: Display the continue button only if the user 
 *  		agrees to the terms of use.
 *
 */
function disclaimerCheckboxValidation(checkboxId, hiddenElementId){
	if($(checkboxId)[0].checked) { 
		$(hiddenElementId).fadeIn('fast');
	} else {
		$(hiddenElementId).fadeOut('fast');
	}
}
