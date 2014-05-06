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
