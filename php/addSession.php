<?php
session_start();

//////////////////////////////////////////////////
//
//  This script is run when the user submits the Add Session form.
//  It takes all the form fields as POST data.
//  
//  Does not do any validation.
//
//  Inserts the submitted information into the sessions table.
//
//  Returns a text string.
//
//////////////////////////////////////////////////

include 'config.php';
$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD) or die(mysql_error());
mysql_select_db(DB_DATABASE) or die("No database, foo'!");


$courseName = mysql_real_escape_string($_POST['courseName']);
$startTime = mysql_real_escape_string($_POST['startTime']);
$endTime = mysql_real_escape_string($_POST['endTime']);
$location = mysql_real_escape_string($_POST['location']);
$details = mysql_real_escape_string($_POST['details']);
$studId = $_SESSION['studId'];

//convert start and end times into timestamps
date_default_timezone_set("America/Vancouver");
//get current date and time
$start = new DateTime();
//replace hour/min/second
$startHM = date_parse($startTime);
$start->setTime($startHM['hour'], $startHM['minute']);
//turn date + time into timestamp
$startTS = $start->format('Y-m-d H:i:s');

//get current date and time
$end = new DateTime();
//replace hour/min/second
$endHM = date_parse($endTime);
$end->setTime($endHM['hour'], $endHM['minute']);
//turn date + time into timestamp
$endTS = $end->format('Y-m-d H:i:s');


$qry = "INSERT INTO sessions (courseName, startTime, endTime, location, details, studID, isActive) VALUES ('$courseName', '$startTS', '$endTS', '$location', '$details', '$studId', 1)";
$result = mysql_query($qry);

if ($result) {
	//set the student's current session to n, where n is the id of the session they just created.
	$qry = "UPDATE students u JOIN sessions s ON (u.studId = s.studId)
			SET u.currentSession = s.sessionId
			WHERE u.studId = " . $_SESSION['studId'] . " AND s.isActive = 1";
	$result = mysql_query($qry);
	if ($result) {
		echo 'Success!';
	} else {
		echo 'ERROR, auto-add to session failed! ' . mysql_error();
	}
} else {
	echo 'ERROR, did not add to database! ' . mysql_error();
}

mysql_close($con);
?>
