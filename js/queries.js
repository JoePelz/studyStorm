/* 
 * Purpose: This function runs when the page loads 
			and does a lot of setup tasks.
			It also attaches onclick functions to several buttons:
				-Registration button
				-Login button
				-Add Session button
				-Logout button

			It calls getSessions to fill the main browsing page
			It calls updateLogin to display welcome messages and the correct buttons
			It calls populateSessionForm to fill the edit session form
 * Params: none
 * Return: none
 */
$(document).ready(function() {
    // Add onclick event to the Add Session button
	$("#userSessionSubmit").click(addSession);
	
	// Add onclick event to the Register button
    $("#regSubmit").click(register);

    // Add onclick event to the Login button
	$("#loginSubmit").click(login);
    
    // Add onclick event to the Logout button
	$("#btnLogout").click(logout);
	
	getSizes();
	getSessions();
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
		location.hash="loginPage";
		$("#loginResult").html("You have been successfully registered!");
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
		$("#loginResult").html("Oh no! " + data);
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
	$.getJSON("./php/getDetails.php?sessionId=" + sessionId, function(result) {
		document.getElementById("userSessionPage").getElementsByTagName("h1")[0].innerHTML = "Edit Session";
		document.getElementById("userSessionSubmit").innerHTML = "Submit";

		//The form to fill in
		form = document.getElementById("userSessionForm");
		
		form.courseName.value = result.courseName;
		//refreshes the select list and forces a rebuild. Required in order to show the 
		//selected item from the database.
		$("#courseName").selectmenu('refresh', true);
		form.location.value = result.location;
		form.startTime.value = result.startTime;
		form.endTime.value = result.endTime;
		form.details.value = result.details;
		});
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
				var time = new Date(sessions[i][j].startTime2);
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
		}	else {
				$("#mainWelcome").html("Not logged in.");
		}
		
		// if there is a session for that user, then...
		if (info.sessionId > 0) {
			//change page to show edit links
			$("#menuLeft").attr("onclick", "populateSessionForm(" + info.sessionId + ")");
			$("#menuLeft").html("Edit Session");
			$("#deleteSessionButton").removeClass("invisible");
		} else {
				$("#menuLeft").removeAttr("onclick");
				$("#menuLeft").html("Add Session");
				$("#deleteSessionButton").addClass("invisible");
		}
	}

	$.ajax({
            url: "./php/testLogin.php",
            cache: false,
            success: updateSuccess
	});
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
		//Format the content into html.
		header += result.studName + "'s Study Session";
		content += "<ul>";
		content += "<li>Subject: "  + result.courseName + "</li>";
		content += "<li>Time: "     + result.startTime  + " to " + result.endTime + "</li>";
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
