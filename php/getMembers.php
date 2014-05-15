<?php

///////////////////////////////////////////////
//
//  This script is run when the user selects a session.
//  It gets the active members from that study sessions from MySQL 
//  and returns them to getDetails.php to be added into the JSON object.
//
///////////////////////////////////////////////

require_once('./config.php');

$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD)
	or die('Failed to connect to server: ' . mysql_error());

$db = mysql_select_db(DB_DATABASE) or die("Unable to select database");


//data available: studName, sessionId, courseName, details, startTime, endTime, location, studId, isActive
$qry = "SELECT u.studName FROM students u WHERE u.currentSession=".$_GET['sessionId']."";
$result = mysql_query($qry);
$studentsArray = array();

if ($result) {
	while ($row = mysql_fetch_assoc($result)) {
		$studentsArray[] = $row;
	}
} else {
	die("Query failed");
	}

mysql_close($con);

?>


