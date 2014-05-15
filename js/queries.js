/* 
 * Purpose: This function runs when the page loads 
			and does a lot of setup tasks.
			It also attaches onclick functions to several buttons:
				-Delete button
				-Add Session button
				-Edit Session button
				-Registration button
				-Login button
				-Logout button
				-security code submit

			It calls getSessions to fill the main browsing page
			It calls updateLogin to display welcome messages and the correct buttons
			It calls populateSessionForm to fill the edit session form
 * Params: none
 * Return: none
 */
 
$(document).ready(function() {
	// Add onclick event to the Delete Session button
	$("#deleteSessionButton").click(delSession);

	// Add onclick event to the Add Session button
	$("#addSessionSubmit").click(addSession);

	// Add onclick event to the Add Session button
	$("#editSessionSubmit").click(editSession);

	// Add onclick event to the Register button
	$("#regSubmit").click(register);

	// Add onclick event to the Login button
	$("#loginSubmit").click(login);

	// Add onclick event to the Logout button
	$("#btnLogout").click(logout);
	
	// Check security code on submit
	$("#regSecCodeSubmit").click(checkSecCode);
	
	//add onclick event to come up with confirmation
	$("#forgotPassSubmit").click(forgotPass);
	
	getSizes();
	//$.mobile.loading('show');
	updateLogin();
	
}); /*==== /$(document).ready() ====*

/*
 *Purpose: Creates a loading icon and text when called.
 *
 *Params: none
 *Return: none
*/
/*$.mobile.loading( 'show', {
					text: 'loading',
					textVisible: true,
					theme: 'b',
					html: ""
					});
*/
/* 
 * Function: getSizes()
 * Purpose: detects device's width and height, and adjusts various 
 *			elements accordingly.
 *
 * Params: none
 * Return: none
 */

function getSizes() {
	var deviceWidth = $(window).width();
	var deviceHeight = $(window).height();
	// Sets the disclaimer writeup overflow according to device height.
	$("#disclaimerDiv").height( deviceHeight * .55 );
	// Sets the size of the logo according to device width.
	$("#logo > img").width( deviceWidth * .8);
}

/* 
 * Function: delSession()
 * Purpose: Send a request to delete the user's current session.
 *          
 *			User is redirected to the main page on completion.
 *
 * Params: none
 * Return: none
 */
function delSession() {
	$.mobile.loading('show');
	$.ajax({
		url: "./php/delSession.php",
		cache: false,
		success: function(data, status) {
			$.mobile.changePage("#mainPage");
			updateLogin();
			$.mobile.loading('hide');
		}
	});
	return false;
}

/* 
 * Function: addSession()
 * Purpose: validate the data in the form, 
 *          and if it's okay, send an ajax request 
 *          to add a new session.
 *
 *          Calls addSessionSuccess(data, status) if ajax works
 *          and addSessionError(data, status) if not.
 * Params: 
 *      data: empty object
 *      status: string indicating success/error
 * Return: none
 */
function addSession() {
	if(!addSessionValidate()) {
		return false;
	}
	$.mobile.loading('show');
	var formData = $("#userSessionForm").serialize();
	
	$.ajax({
		type: "POST",
		url: "./php/addSession.php",
		cache: false,
		data: formData,
		success: addSessionSuccess,
		error: addSessionError
	});
	return false;
}
	
/* 
 * Function: addSessionSuccess(data, status)
 * Purpose: Supplemental to addSession(), above.
 *          Runs if AJAX succeeded.
 *          
 *          If adding worked take the user to the main page
 *          Else make an alertbox that gives you the ajax response data
 * Params: 
 *      data: empty object
 *      status: string indicating success/error
 * Return: none
 */
function addSessionSuccess(data, status) {
	data = $.trim(data);
	if (data == "Success!") {
		$.mobile.changePage("#mainPage");
		updateLogin();
	} else {
		alert("Response data: " + data);
	}
	$.mobile.loading('hide');
}
/* 
 * Function: addSessionError(data, status)
 * Purpose: Supplemental to addSession(), above.
 *          Runs if AJAX failed.
 *          Pops up an alert box to display the status code.
 * Params: 
 *      data: empty object
 *      status: string indicating success/error
 * Return: none
 */
function addSessionError(data, status) {
	alert("Something went wrong " + data);
}

/* 
 * Function: editSession()
 * Purpose: validate the data in the form, 
 *          and if it's okay, send an ajax request 
 *          to update the user's session.
 *
 *          (intentionally uses addSession's success/fail functions)
 *          Calls addSessionSuccess(data, status) if ajax works
 *          and addSessionError(data, status) if not.
 * Params: 
 *      data: empty object
 *      status: string indicating success/error
 * Return: none
 */
function editSession() {
	if(!addSessionValidate()) {
		return false;
	}
	$.mobile.loading('show');
	var formData = $("#userSessionForm").serialize();
	
	$.ajax({
		type: "POST",
		url: "./php/editSession.php",
		cache: false,
		data: formData,
		success: addSessionSuccess,
		error: addSessionError
	});
	return false;
}


/* 
 * Function: register(data, status)
 * Purpose: validate the data in the form, 
 *          and if it's okay, send an ajax request 
 *          to register the user.
 *
 *          Calls regSuccess(data, status) if ajax works
 *          and regError if not.
 * Params: 
 *      data: empty object
 *      status: string indicating success/error
 * Return: none
 */
function register() {
	if(!validateForm()) {
		return false;
	}
	$.mobile.loading('show');
	var formData = $("#regForm").serialize();
	
	$.ajax({
		type: "POST",
		url: "./php/register.php",
		cache: false,
		data: formData,
		success: regSuccess,
		error: errorMsg
	});
	return false;
}
/* 
 * Function: regSuccess(data, status)
 * Purpose: Supplemental to register(), above.
 *          Runs if AJAX succeeded.
 *          
 *          If registration worked, it indicates you succeeded 
 *             and takes you to the login page.
 *          Else if gives you the reason it failed.
 * Params: 
 *      data: empty object
 *      status: string indicating success/error
 * Return: none
 */
function regSuccess(data, status) {
	data = $.trim(data);
	data = $.parseJSON(data);
	

	if (data.hasErrors == false) {
		//data should have hasErrors, secCode, email
		var msg = "Your confirmation code is:\r\n\r\n" + data.secCode + "\r\n";
		msg += "To get back to the email confirmation page, enter your email at the login page.";
		sendEmail(
			data.email, 
			"Study Storm email confirmation code", 
			msg, 
			function() {
				$.mobile.changePage("#confirmEmailPage");
			}); 
	} else {
		$("#regResult").html("Response data: " + data);	
	}
	$.mobile.loading('hide');
}
/* 
 * Function: errorMsg(data, status)
 * Purpose: Generic error message that can be reused throughout various scripts
 *
 * Params: 
 *      data: empty object
 *      status: string indicating success/error
 * Return: none
 */
function errorMsg(data, status) {
	alert("something went wrong:\nData: " + data + "\nStatus: " + status);
}
/* 
 * Function: checkSecCode()
 * Purpose: Checks the security code entered by the user. 
 *					Sets hasConfirmed in the database to '1' if it is correct.
 *          
 * Params: 
 *      none
 * Return: none
 */
function checkSecCode() {
	$.mobile.loading('show');
	var formData = $("#confirmEmailForm").serialize();
	
	$.ajax({
		type: "POST",
		cache: false,
		url: "./php/checkSecCode.php",
		data: formData,
		success: secCodeSuccess,
		error: errorMsg
	});
	return false;
}
/* 
 * Function: secCodeSuccess(data, status)
 * Purpose: Supplemental to checkSecCode(), above.
 *          Runs if AJAX succeeded.
 *          
 *          If check Security Code worked, it indicates you succeeded 
 *             and takes you to the login page.
 *          Else if gives you the reason it failed.
 * Params: 
 *      data: empty object
 *      status: string indicating success/error
 * Return: none
 */
function secCodeSuccess(data, status) {
		if (data == "Success!") {
			$.mobile.changePage("#loginPage");
			$("#loginResult").html("You have been successfully registered!");
		} else {
				$("#confirmEmailMsg").fadeIn(250);
				$("#confirmEmailMsg").addClass("badInput");
				$("#confirmEmailMsg").html("Incorrect email or security code");
				$("#confirmEmailMsg").delay(2000).fadeOut(250);
		}
		$.mobile.loading('hide');
	}
/* 
 * Function: login()
 * Purpose: Send the login form data to login.php
 *          to log the user in.
 *
 *          calls loginSuccess(data, status) if successful
 *          else  loginError(data, status) if ajax fails (can't find login.php)
 * Params: none
 * Return: false
 */
function login(){
	$.mobile.loading('show');
	var formData = $("#loginForm").serialize();
		
	$.ajax({
		type: "POST",
		url: "./php/login.php",
		cache: false,
		data: formData,
		success: loginSuccess,
		error: loginError
	});
	return false;
}
/* 
 * Function: loginSuccess(data, status)
 * Purpose: Supplemental to login(), above.
 *          Runs if AJAX succeeded.
 *
 *          If login info is correct: update the site and go to the main page
 *          If login isn't successful: print an error message on the login page.
 * Params: 
 *      data: the returned data from the php file
 *      status: string indicating success/error
 * Return: none
 */
function loginSuccess(data, status) {
	var data = $.parseJSON(data);
	
	if (data.hasValidEmail && data.hasValidPassword && data.hasConfirmed) {
		updateLogin();
		$.mobile.changePage("#mainPage");
	} else if (data.hasValidEmail && !data.hasConfirmed) {
		$.mobile.changePage("#confirmEmailPage");
	} else {
		$("#loginResult").html("Invalid email or password!");
	}
	$.mobile.loading('hide');
	/* old code to be erased when consensus is achieved
	data = $.trim(data);
	if (data == "Success!") {
		updateLogin();
		$.mobile.changePage("#mainPage");
	} else {
			$("#loginResult").html("Did not log in!\nData: " + data);
	}
	*/
}
/* 
 * Function: loginError(data, status)
 * Purpose: Supplemental to login(), above.
 *          Runs if AJAX failed.
 *          Pops up an alert box.
 * Params: 
 *      data: empty object
 *      status: string indicating success/error
 * Return: none
 */
function loginError(data, status) {
	alert("something went wrong: " + status);
}

/* 
 * Function: logout()
 * Purpose: run the logout php script and 
 *          update the webpage.
 * Params: none
 * Return: false
 */
function logout() {
	$.mobile.loading('show');
	$.ajax({
		url: "./php/logout.php",
		cache: false,
		success: updateLogin,
		error: errorMsg
	});
	return false;
}

/*
 * Function: forgotPass()
 * Purpose: Send the forgotPassForm data to forgotPass.php
 *          to log the user in.
 *
 *          calls forgotPassConfirm fade in(data, status) if successful
 *          else  loginError(data, status) if ajax fails (can't find forgotPass.php)
 * Params: none
 * Return: false
 */
function forgotPass(){
	var formData = $("#forgotPassForm").serialize();
	$.mobile.loading('show');
	
	$.ajax({
		type: "POST",
		url: "./php/forgotPass.php",
		cache: false,
		data: formData,
		success: forgotPassConfirm,
		error: loginError
	});
	return false;
}

/*
 * Function: forgotPassConfirm(data, status)
 * Purpose: Supplemental to forgotPass(), above.
 *          Runs if AJAX succeeded.
 *
 *          If email info is correct: continue to confirmation and password update
 *          If email does not exist -isn't successful: print an error message on the forgotPass page (login page.
 * Params: 
 *      data: the returned data from the php file
 *      status: string indicating success/error
 * Return: none
 */
function forgotPassConfirm(data, status) {
	data = $.trim(data);
	if (data == "Success!") {
		$("#continueConfirm").fadeIn('fast');
		$("#forgotPassEmail").prop('disabled', true);
		$("#errForgotPassEmail").html("");
	} else if (data == "Confirm Registration"){
		
		$("#errForgotPassEmail").html("Must confirm registration:");
	
	} else {
		$("#errForgotPassEmail").html("Did not find account!\nData: " + data);
	}
	$.mobile.loading('hide');
}



/* 
 * Function: populateSessionForm()
 * Purpose: Get the details of a particular study session
 *			and plop them into the add session form.
 *
 * Params: sessionId
 * Return: none
 */
function populateSessionForm(sessionId) {

	if (sessionId == 0) {
		//The form to fill in
		form = document.getElementById("userSessionForm");
		
		form.courseName.value = "";
		//refreshes the select list and forces a rebuild. Required in order to show the 
		//selected item from the database.
		$("#courseName").selectmenu('refresh', true);
		form.location.value = "";
		form.startTime.value = "";
		form.endTime.value = "";
		form.details.value = "";
		$('#errCourse').html("");
		$('#errLocation').html("");
		$('#errTime').html("");
		$('#errTime2').html("");
		$('#errDetails').html("");
	} else {
		$.mobile.loading('show');
		$.getJSON("./php/getDetails.php?sessionId=" + sessionId, function(result) {

		//The form to fill in
		form = document.getElementById("userSessionForm");
		
		form.courseName.value = result.courseName;
		//refreshes the select list and forces a rebuild. Required in order to show the 
		//selected item from the database.
		$("#courseName").selectmenu('refresh', true);
		
		//convert time from date-timestamp to h:mm
		var t = result.startTime.split(/[- :]/);
		var sTime = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
		var start = sTime.getHours() + ":";
		if (sTime.getMinutes() < 10) { start += "0"; }
		start += sTime.getMinutes();
		var t = result.endTime.split(/[- :]/);
		var eTime = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
		var end = eTime.getHours() + ":";
		if (eTime.getMinutes() < 10) { end += "0"; }
		end += eTime.getMinutes();

		form.location.value = result.location;
		form.startTime.value = start;
		form.endTime.value = end;
		form.details.value = result.details;
		$.mobile.loading('hide');
		});
	}
}

/* 
 * Function: getSessions()
 * Purpose: Retrieves rows from the sessions table 
 *          and uses that information to fill the browse page.
 *
 *			The data is scanned once to fill an array of course names,
 *			then it is scanned again to fill collapsible sets on the main page.
 *
 *			Finally, the data is written into the html,
 *			and the divs are processed by jquery
 * Params: none
 * Return: none
 */
function getSessions() {
	$.mobile.loading('show');
	$.getJSON("./php/getSessions.php", function(result) {
		var content = "";

		courses = [];
		//Search through the results for unique course names
		for (var i = 0; i < result.length; i++) {
			if (courses.indexOf(result[i].courseName) == -1) {
				courses.push(result[i].courseName);
			}
		}
		
		sessions = [];
		for (var i = 0; i < courses.length; i++) {
			cluster = [];
			for (var j = 0; j < result.length; j++) {
				if (result[j].courseName == courses[i]) {
					cluster.push(result[j]);
				}
			}
			sessions.push(cluster);
		}


		//For each course heading, insert a <ul> and all the 
		// results that match that course name.
		content += '<div data-role="collapsibleset" data-inset="false" data-collapsed-icon="carat-d" data-expanded-icon="carat-u" data-iconpos="right">';
		for (var i=0; i < courses.length; i++) {
			content += '<div data-role="collapsible">';
			content += "<h1>" + courses[i] + '<span class="ui-li-count" style="right: 50px;">'+sessions[i].length+'</span>' + "</h1>";
			content += "<ul>";
			for (var j = 0; j < sessions[i].length; j++) {
				var t = sessions[i][j].startTime.split(/[- :]/);
				var time = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);

				var hours = time.getHours();
				var half = "am";
				if (hours > 12) {
					hours -= 12;
					half = "pm";
				}
				var minutes = time.getMinutes();
				if (minutes < 10) { minutes = "0" + minutes; }

                content += "<li>" + hours + ":" + minutes + half + "&nbsp;&nbsp;&nbsp;&nbsp;";
                content += "<a href=\"#detailsPage\" onclick=\"getDetails(" + sessions[i][j].sessionId + ")\" data-rel=\"dialog\" data-transition=\"pop\">" + sessions[i][j].studName + "</a>&nbsp;&nbsp;&nbsp;&nbsp;";
                content += sessions[i][j].courseName + "</li>";
			}
			content += "</ul>";
            content += "</div>";
		}
		content += "</div>";

		$("#courseDest").html(content);
		//These lines ask JQM to process the divs, 
		//and implement the collapsible data-role
		$('div[data-role=collapsible]').collapsible();
		$('div[data-role=collapsibleset]').collapsibleset();
		$.mobile.loading('hide');
	});
}

/* 
 * Function: updateLogin()
 * Purpose: This function runs every time the web page loads or the user logs in.
 *			It gets data from the server including if the user is logged in 
 *			and their current session id.
 *			It updates the main page to:
 *			   -shows the welcome message or "not logged in"
 *             -hides/shows buttons for registration
 *			   -hides/shows adding or editing session.
 * Params: none
 * Return: none
 */
function updateLogin() {
	$.mobile.loading('show');
	function updateSuccess(data, status) {
		try {
			//if code below here runs, means json is valid
			var info = $.parseJSON(data);
		} catch(e){
			//if code below here runs, means json is invalid
			alert("didn't work, " + e);
		}
		if (info.loggedIn == "yes") {
			$("#mainWelcome").html("Welcome, " + info.studName);
		} else {
			$("#mainWelcome").html("Not logged in.");
		}
			
		// if there is an active session that user has created, then...
		if (info.sessionId > 0) {
			//change page to show edit links
			$("#menuLeft").attr("onclick", "populateSessionForm(" + info.sessionId + ")");
			$("#menuLeft").html("Edit Session");
			$("#addSessionSubmit").addClass("invisible");
			$("#editSessionSubmit").removeClass("invisible");
			$("#deleteSessionButton").removeClass("invisible");
			$("#userSessionPage h1").html("Edit Session");
		} else {
			$("#menuLeft").attr("onclick", "populateSessionForm(0)");
			$("#menuLeft").attr("href", "#userSessionPage");
			$("#menuLeft").html("Add Session");
			$("#addSessionSubmit").removeClass("invisible");
			$("#editSessionSubmit").addClass("invisible");
			$("#deleteSessionButton").addClass("invisible");
			$("#userSessionPage h1").html("Add Session");
			
		}
		
		// Check if user has joined a session
		if (info.currentSession > 0) {
			$("#menuLeft").html("View Joined Session");
			$("#menuLeft").attr("href", "#detailsPage");
			$("#menuLeft").attr("onclick", "getDetails(" + info.currentSession + ")");
		}
		$.mobile.loading('hide');
	}

	$.ajax({
			url: "./php/testLogin.php",
			cache: false,
			success: updateSuccess,
			error: errorMsg
	});
		
	getSessions();
	
	//$.mobile.loading();
}

/* 
 * Function: getDetails(sessionId)
 * Purpose: Get the details of a particular session 
 *          and print them into the details page
 * Params:
 *		sessionId - The id of the session to retrieve.
 * Return: none
 */
function getDetails(sessionId) {
	//use AJAX to ask getDetails.php for information.
	//the returned data is in JSON format.
	$.mobile.loading('show');
	$.getJSON("./php/getDetails.php?sessionId=" + sessionId, function(result){
		var header = "";
		var content = "";
		//get times:
		var t = result.startTime.split(/[- :]/);
		var time = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
		var hours = time.getHours();
		var half = "am";
		if (hours > 12) { 
			hours -= 12;
			half = "pm";
		}
		var minutes = time.getMinutes();
		if (minutes < 10) { minutes = "0" + minutes; }
		var start = hours + ":" + minutes + half;
		
		var t = result.endTime.split(/[- :]/);
		var time = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
		var hours = time.getHours();
		var half = "am";
		if (hours > 12) { 
			hours -= 12;
			half = "pm";
		}
		var minutes = time.getMinutes();
		if (minutes < 10) { minutes = "0" + minutes; }
		var end = hours + ":" + minutes + half;


		//Format the content into html.
		header += result.studName + "'s Study Session";
		content += "<ul>";
		content += "<li>Subject: "  + result.courseName + "</li>";
		content += "<li>Time: "     + start  + " to " + end + "</li>";
		content += "<li>Location: " + result.location   + "</li>";
		content += "<li>Details: "  + result.details    + "</li>";
		content += "<li>Members: "  + result.membersCount    + "</li>";
		content += "</ul>";
		content += "<div data-role='button' name='joinLeaveButton' id='joinLeaveButton' onclick='joinSession(" + result.sessionId + ")'>Join</div>";
		content += "<div id='mapCanvas' style='height: 200px;'></div>";
		$("#detailsHeader").html(header);
		$("#detailsContent").html(content);
		$("#joinLeaveButton").button();
		
		// Check if user has already joined group, and changed 'Join' button accordingly
		if (result.hasJoined) {
			$("#joinLeaveButton").html("Leave Session").attr("onclick", "leaveSession()");
		}
		
		var lat = result.latitude;
		var lng = result.longitude;
		var title = result.studName + ", " + result.courseName;
		initialize(lat,lng,title);
		$.mobile.loading('hide');
	});
}
/* 
 * Function: joinSession(sessionId)
 * Purpose: Joins the session that the user is currently viewing.
 *
 * Params:
 *		sessionId - The id of the session to join.
 * Return: none
 */
function joinSession(sessionId) {
	$.mobile.loading('show');
	$.ajax({
		url:"./php/joinSession.php?sessionId=" + sessionId,
		cache: false,
		success: joinSuccess,
		error: errorMsg
	});
	return false;
}
/* 
 * Function: joinSuccess(data, status)
 * Purpose: Supplemental to joinSession(), above.
 *          Runs if AJAX succeeded.
 *
 * Params: 
 *      data: the returned data from the php file
 *      status: string indicating success/error
 * Return: none
 */
function joinSuccess(result, data) {
	if (result == "Success!") {
		$("#joinLeaveButton").html("Leave");
		updateLogin();
	} else {
			alert("Error: did not join group.\nresult: " + result + "\ndata: " + data);
	}
	$.mobile.loading('hide');
}
/* 
 * Function: leaveSession(sessionId)
 * Purpose: Leaves the session that the user is currently viewing.
 *
 * Params:
 *		sessionId - The id of the session to leave.
 * Return: none
 */
function leaveSession() {
	$.mobile.loading('show');
	
	$.ajax({
		url: "./php/leaveSession.php",
		cache: false,
		success: function() {
			$.mobile.changePage("#mainPage");
			updateLogin();
			$.mobile.loading('hide');
		},
		error: errorMsg
	});
	return false;
}
/*
function leaveSuccess(result, data) {
	$("#menuLeft").html("Add Session").attr("onclick",
}
*/
/* 
 * Function: initialize(lat, lng, title)
 * Purpose: Get map coordinates and place them on a map.
 * Params:
 *		lat - latitude.
 *		lng - longitude.
 *		title - Student and course
 * Return: none
 */
function initialize(lat, lng, title) {
	// Coords for BCIT: 49.2482696, -123.0010414
  var myLatlng = new google.maps.LatLng(lat,lng);
  var mapOptions = {
    zoom: 17,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: title
  });
	
	//google.maps.event.addDomListener(window, 'load', initialize);

}

/* 
 * Function: sendEmail(email, subject, message, onSuccess)
 * Purpose: Send an email.
 * Params:
 *		email     - The address of the recipient
 *		subject   - The email subject
 *		message   - The message for the email
 *      onSuccess - The function to run on success. (result, status) params optional.
 * Return: none
 */
function sendEmail(email, subject, message, onSuccess) {	
	$.ajax({
		url: "http://joepolygon.com/sendMail.php",
		data: {'message':message, 'email':email, 'subject':subject},
		type: "POST",
		cache: false,
		success: onSuccess
	});
}


 $(function() {
      //Enable swiping...
      $(document).swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount) {
          //$(this).text("You swiped " + direction );  
		  //alert("You swiped in " + direction);
		  //location.hash="userSessionPage";
		  //Make swipe right take user to userSessionPage.
		  if (direction == "right") {
				$.mobile.changePage("#userSessionPage");
			}
		  if (direction == "down") {
				updateLogin();
			}
		  //alert("You swiped in " + direction);

        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:0
      });
    });

