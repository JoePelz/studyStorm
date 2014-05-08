/* 
 * Purpose: This function runs when the page loads 
			and does a lot of setup tasks.
			It also attaches onclick functions to several buttons:
				-Registration button
				-Login button
				-Add Session button
				-Logout button

			It calls getSessions to fill the main browsing page
			It calls updateLogin to display welcome messages and the right buttons
			It calls getSessionDetails to fill the edit session form
 * Params: none
 * Return: none
 */
$(document).ready(function() {
	
	/**********************************************
	 * Add onclick event to the Add Session button
	 **********************************************/
	$("#addSessionSubmit").click(function() {
	
		if(!addSessionValidate()) {
			return false;
		}
	
		var formData = $("#addSessionForm").serialize();
		
		$.ajax({
			type: "POST",
			url: "./php/addSession.php",
			cache: false,
			data: formData,
			success: addSessionSuccess,
			error: addSessionError
		});
		return false;
	});
	
	function addSessionSuccess(data, status) {
		data = $.trim(data);
		if (data = "Success!") {
			location.hash = "mainPage";
		} else {
				alert("Response data: " + data);
		}
	}
	
	function addSessionError(data, status) {
		alert("Something went wrong " + data);
	}
	
	
	/*******************************************
	 * Add onclick event to the Register button
	 *******************************************/
	$("#regSubmit").click(function(){

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
	});

	function regSuccess(data, status) {
		data = $.trim(data);
		if (data == "Success!") {
			location.hash="loginPage";
			$("#loginResult").html("You have been successfully registered!");
		} else {
			$("#regResult").html("Response data: " + data);
		}
	}

	function regError(data, status) {
		alert("something went wrong: " + status);
	}

	/*******************************************
	 * Add onclick event to the Login button
	 *******************************************/
	$("#loginSubmit").click(function(){

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
	});

	function loginSuccess(data, status) {
		data = $.trim(data);
		if (data == "Success!") {
			updateLogin();
			$( "#myPop" ).popup( "open" );
			location.hash="mainPage";
		} else {
			$("#loginResult").html("Oh no! " + data);
		}
	}

	function loginError(data, status) {
		alert("something went wrong: " + status);
	}

	/*******************************************
	 * Add onclick event to the Logout button
	 *******************************************/
	$("#btnLogout").click(function(){

		$.ajax({
			url: "./php/logout.php",
			cache: false,
			success: function(a, b) {updateLogin();}
		});
		return false;
	});

	getSessions();
	updateLogin();
	getSessionDetails();
}); /*==== /$(document).ready() ====*/


/* 
 * Function: getSessionDetails()
 * Purpose: Get the details of a particular study session
 *			and plop them into the add session form.
 *
 *			Currently hard-coded to get session 0.
 * Params: none
 * Return: none
 */
function getSessionDetails() {
	$.getJSON("./php/getDetails.php", function(result) {
		document.getElementById("addSessionPage").getElementsByTagName("h1")[0].innerHTML = "Edit Session";
		
		//The form to fill in
		form = document.getElementById("addSessionForm")
		
		form.courseName.value = result.courseName;
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
	$("#courseDest").html("Loading...");
	$.getJSON("./php/getSessions.php", function(result) {
		var content = "";

		courses = [];
		//Search through the results for unique course names
		for (var i = 0; i < result.length; i++) {
			if (courses.indexOf(result[i].courseName) == -1) {
				courses.push(result[i].courseName);
			}
		}
		
		//For each course heading, insert a <ul> and all the 
		// results that match that course name.
		content += '<div data-role="collapsibleset" data-inset="false" data-collapsed-icon="carat-d" data-expanded-icon="carat-u" data-iconpos="right">';
		for (var i=0; i < courses.length; i++) {
			content += '<div data-role="collapsible">';
			content += "<h1>" + courses[i] + "</h1>";
			content += "<ul>";
			for (var j = 0; j < result.length; j++) {
				if (result[j].courseName == courses[i]) {
					content += "<li>" + result[j].startTime + "&nbsp;&nbsp;&nbsp;&nbsp;";
					content += "<a href=\"#detailsPage\" onclick=\"getDetails(" + result[j].sessionId + ")\" data-rel=\"dialog\" data-transition=\"pop\">" + result[j].studName + "</a>&nbsp;&nbsp;&nbsp;&nbsp;";
					content += result[j].courseName + "</li>";
				}
			}
			content += "</ul></div>";
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
			$("#btnLogout").removeClass("invisible");
			$("#btnRegister").addClass("invisible");
			// if there is a session for that user, then...
			if (info.sessionId > 0) {
				//change page to show edit links
				$("#menuLeft").attr("href", "http://studystorm.org/_rosanna/#editSessionPage");
				$("#menuLeft").html("Edit Session");
				$("#btnEditSession").removeClass("invisible");
				$("#btnAddSession").addClass("invisible");
			}
			else {
				//otherwise show add links
				$("#btnEditSession").addClass("invisible");
				$("#btnAddSession").removeClass("invisible");
			}
		} else {
			//if not logged in show register button
			$("#mainWelcome").html("Not logged in.");
			$("#btnLogout").addClass("invisible");
			$("#btnRegister").removeClass("invisible");
			$("#btnAddSession").addClass("invisible");
			$("#btnEditSession").addClass("invisible");
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
	$("#detailsContent").html("Loading...");
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
		$("#detailsHeader").html(header);
		$("#detailsContent").html(content);
	});
}
