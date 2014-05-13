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
	$("#secCodeSubmit").click(checkSecCode);
	
	getSizes();
	updateLogin();
}); /*==== /$(document).ready() ====*/

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
	$.ajax({
		url: "./php/delSession.php",
		cache: false,
		success: function(data, status) {
			location.hash = "mainPage";
			updateLogin();
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
		location.hash = "mainPage";
		updateLogin();
	} else {
		alert("Response data: " + data);
	}
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
	var formData = $("#regForm").serialize();
	
	$.ajax({
		type: "POST",
		url: "./php/register.php",
		cache: false,
		data: formData,
		success: regSuccess,
		error: regError
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
	if (data == "Success!") {
		location.hash = "confirmEmailPage";
	} else {
			$("#regResult").html("Response data: " + data);
	}
}
/* 
 * Function: regError(data, status)
 * Purpose: Supplemental to register(), above.
 *          Runs if AJAX failed.
 *          Pops up an alert box to display the status code.
 * Params: 
 *      data: empty object
 *      status: string indicating success/error
 * Return: none
 */
function regError(data, status) {
	alert("something went wrong: " + status);
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
	
	var formData = $("#confirmEmailForm").serialize();
	
	$.ajax({
		type: "POST",
		cache: false,
		url: "./php/checkSecCode.php",
		data: formData,
		success: secCodeSuccess,
		error: function(data, status) {
			alert("Something went wrong.\nStatus: " + status + "\nData: " + data);
		}
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
			location.hash = "loginPage";
			$("#loginResult").html("You have been successfully registered!");
		} else {
				$("#confirmEmailMsg").fadeIn(250);
				$("#confirmEmailMsg").addClass("badInput");
				$("#confirmEmailMsg").html("Incorrect email or security code");
				$("#confirmEmailMsg").delay(2000).fadeOut(250);
		}
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
	data = $.trim(data);
	if (data == "Success!") {
		updateLogin();
		location.hash="mainPage";
	} else {
		$("#loginResult").html("Did not log in!\nData: " + data);
	}
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
	$.ajax({
		url: "./php/logout.php",
		cache: false,
		success: updateLogin
	});
	return false;
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
	} else {
		$.getJSON("./php/getDetails.php?sessionId=" + sessionId, function(result) {

		//The form to fill in
		form = document.getElementById("userSessionForm");
		
		form.courseName.value = result.courseName;
		//refreshes the select list and forces a rebuild. Required in order to show the 
		//selected item from the database.
		$("#courseName").selectmenu('refresh', true);
		
		//convert time from date-timestamp to h:mm
		var t = result.startTime2.split(/[- :]/);
		var sTime = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
		var start = sTime.getHours() + ":";
		if (sTime.getMinutes() < 10) { start += "0"; }
		start += sTime.getMinutes();
		var t = result.endTime2.split(/[- :]/);
		var eTime = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
		var end = eTime.getHours() + ":";
		if (eTime.getMinutes() < 10) { end += "0"; }
		end += eTime.getMinutes();

		form.location.value = result.location;
		form.startTime.value = start;
		form.endTime.value = end;
		form.details.value = result.details;
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
				var t = sessions[i][j].startTime2.split(/[- :]/);
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
	//query server
	function updateSuccess(data, status) {
		info = $.parseJSON(data);
		if (info.loggedIn) {
			$("#mainWelcome").html("Welcome, " + info.studName);
		} else {
			$("#mainWelcome").html("Not logged in.");
		}
		
		// if there is a session for that user, then...
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
			$("#menuLeft").html("Add Session");
			$("#addSessionSubmit").removeClass("invisible");
			$("#editSessionSubmit").addClass("invisible");
			$("#deleteSessionButton").addClass("invisible");
			$("#userSessionPage h1").html("Add Session");
		}
	}

	$.ajax({
			url: "./php/testLogin.php",
			cache: false,
			success: updateSuccess
	});
	
	getSessions();
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
	$.getJSON("../php/getDetails.php?sessionId=" + sessionId, function(result){
		var header = "";
		var content = "";

		//get times:
		var t = result.startTime2.split(/[- :]/);
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
		
		var t = result.endTime2.split(/[- :]/);
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
		content += "</ul>";
		content += "<div id='mapCanvas' style='height: 200px;'></div>";
		$("#detailsHeader").html(header);
		$("#detailsContent").html(content);
		
		var lat = 49.2482696;
		var lng = -123.0010414;
		var title = result.studName + ", " + result.courseName;
		initialize(lat,lng,title);
	});
}

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

 $(function() {      
      //Enable swiping...
      $(document).swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount) {
          //$(this).text("You swiped " + direction );  
		  alert("You swiped in " + direction);
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:0
      });
    });

