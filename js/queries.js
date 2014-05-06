$(document).ready(function() {
    function regSuccess(data, status) {
			data = $.trim(data);
			
			$("#regResult").html("Response data: " + data);
    }

    function regError(data, status) {
        alert("something went wrong: " + status);
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

		getSessions();
		
			function loginSuccess(data, status) {
			data = $.trim(data);
			if (data == "Success!") {
				updateLogin();
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
});

function getSessions() {
	$.getJSON("./php/getSessions.php", function(result) {
		var output = "";
		output += "<ul>";
		
		for (var i = 0; i < result.length; i++) {
			output += "<li>" + result[i].startTime + "&nbsp;&nbsp;&nbsp;&nbsp;";
			output += "<a href=\"#detailsPage\" onclick=\"getDetails(" + result[i].sessionId + ")\" data-rel=\"dialog\" data-transition=\"pop\">" + result[i].studName + "</a>&nbsp;&nbsp;&nbsp;&nbsp;";
			output += result[i].courseName + "</li>";
		}
		output += "</ul>";
		$("#courseDest").html(output);
	});

function updateLogin() {
	//query server
	function loginSuccess(data, status) {
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
            success: loginSuccess
        });
}

			
function getDetails(sessionId) {
	//The id of the element to put detail info into.
	var target = "#dest";

	//use AJAX to ask getDetails.php for information.
	//the returned data is in JSON format.
	$.getJSON("../php/getDetails.php?sessionId=" + sessionId, function(result){
		var output = "";
		
		//Format the output into html.
		//TODO:  convert to object notation instead of using strings.
		output += "<h1>" + result.studName + "'s Study Session</h1>";
		output += "<ul>";
		output += "<li>Subject: "  + result.courseName + "</li>";
		output += "<li>Time: "     + result.startTime  + " to " + result.endTime + "</li>";
		output += "<li>Location: " + result.location   + "</li>";
		output += "<li>Details: "  + result.details    + "</li>";
		output += "</ul>";
		$(target).html(output);
	});
}
