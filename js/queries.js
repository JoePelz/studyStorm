$(document).ready(function() {

	getSessions();
	
    function regError(data, status) {
        alert("something went wrong: " + status);
    }

		
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
	
    $("#btnLogout").click(function(){

        $.ajax({
            url: "./php/logout.php",
            cache: false,
            success: function(a, b) {updateLogin();}
        });
        return false;
    });

	updateLogin();
	getSessionDetails();
}); /*==== /$(document).ready() ====*/



/*====================================*/


function getSessionDetails() {
	$.getJSON("./php/getDetails.php", function(result) {
		document.getElementById("addSessionPage").getElementsByTagName("h1")[0].innerHTML = "Edit Session";
		document.getElementById("addSessionForm").courseName.value = result.courseName;
		document.getElementById("addSessionForm").location.value = result.location;
		document.getElementById("addSessionForm").startTime.value = result.startTime;
		document.getElementById("addSessionForm").endTime.value = result.endTime;
		document.getElementById("addSessionForm").details.value = result.details;
		});
}

function getSessions() {
	$("#courseDest").html("Loading...");
	$.getJSON("./php/getSessions.php", function(result) {
		var content = "";

		courses = [];
		for (var i = 0; i < result.length; i++) {
			if (courses.indexOf(result[i].courseName) == -1) {
				courses.push(result[i].courseName);
			}
		}
		
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
		$('div[data-role=collapsible]').collapsible();
	});
}

function updateLogin() {
	//query server
	function updateSuccess(data, status) {
		info = $.parseJSON(data);
		if (info.loggedIn) {
			$("#mainWelcome").html("Welcome, " + info.studName);
			$("#btnLogout").removeClass("invisible");
			$("#btnRegister").addClass("invisible");
			$("#btnAddSession").removeClass("invisible");
		} else {
			$("#mainWelcome").html("Not logged in.");
			$("#btnLogout").addClass("invisible");
			$("#btnRegister").removeClass("invisible");
			$("#btnAddSession").addClass("invisible");
		}
	}

	$.ajax({
            url: "./php/testLogin.php",
            cache: false,
            success: updateSuccess
	});
}

			
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
