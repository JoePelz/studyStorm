<?php

//////////////////////////////////////////////
//
//  This script pulls a row from the MySQL sessions table.
//  The sessionId to retrieve is sent as GET data.
//  Returns JSON encoded row information.
//
//////////////////////////////////////////////
session_start();
require_once('./config.php');
include('./getMembers.php');
$membersCount = sizeof($studentsArray);

$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD)
	or die('Failed to connect to server: ' . mysql_error());

$db = mysql_select_db(DB_DATABASE) or die("Unable to select database");


//data available: studName, sessionId, courseName, details, startTime, endTime, location, studId, isActive
$qry = "SELECT u.studName, s.*, l.* FROM sessions s, students u, locations l WHERE u.studId=s.studId AND s.location=l.locationName AND s.sessionId=".$_GET['sessionId']." LIMIT 1";
$result = mysql_query($qry);


if ($result) {
	$row = mysql_fetch_array($result, MYSQL_ASSOC);
	$row['membersCount'] = "".$membersCount."";
	
	// Check if user has already joined this group
	$row['hasJoined'] = FALSE;
	if ($row['sessionId'] == $_SESSION['currentSession']) {
		$row['hasJoined'] = TRUE;
	}
	
	
	
	print json_encode($row);
} else {
	die("Query failed");
}

mysql_close($con);

?>


