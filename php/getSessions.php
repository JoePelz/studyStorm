<?php

///////////////////////////////////////////////
//
//  This script is run when the webpage loads.
//  It gets the active study sessions from MySQL 
//  and returns them to the client as JSON data.
//
///////////////////////////////////////////////

require_once('./config.php');

$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD)
	or die('Failed to connect to server: ' . mysql_error());

$db = mysql_select_db(DB_DATABASE) or die("Unable to select database");


//disable expired sessions on the server.
//UPDATE `sessions` SET `endTime2` = CONVERT_TZ(NOW(), '+0:00', '-7:00') WHERE `sessions`.`sessionId` = 2;
$qry = "UPDATE `sessions` SET `isActive`=0 WHERE `endTime2` < CONVERT_TZ(NOW(), '+0:00', '-7:00')";
mysql_query($qry);


//data available: studName, sessionId, courseName, details, startTime, endTime, location, studId, isActive
$qry = "SELECT u.studName, s.* FROM sessions s, students u WHERE u.studId=s.studId";
$result = mysql_query($qry);
$courseArray = array();

if ($result) {
	while ($row = mysql_fetch_assoc($result)) {
		$courseArray[] = $row;
	}
	print json_encode($courseArray);
} else {
	die("Query failed");
	}

mysql_close($con);

?>


