function getDetails() {
	//The id of the element to put detail info into.
	var target = "#dest";
	//The error message if sessionId is missing
	var errorMsgSession = "<p>No session specified.</p>";


	//look in the URL for a sessionID to fetch
	//if sessionId is not found, abort.
	var url = window.location;
	var patt = /sessionId=([0-9]+)/;
	var result = patt.exec(url);
	if (result) {
		var sessionId = result[1];
	} else {
		$(target).html(errorMsgSession);
		return;
	}

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
