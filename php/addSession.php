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
$startHour = substr($startTime, 0, 2);
$startMinute = substr($startTime, 3, 2);
$start->setTime($startHour, $startMinute);
//turn date + time into timestamp
$startTS = $start->format('Y-m-d H:i:s');

//get current date and time
$end = new DateTime();
//replace hour/min/second
$endHour = substr($endTime, 0, 2);
$endMinute = substr($endTime, 3, 2);
$end->setTime($endHour, $endMinute);
//turn date + time into timestamp
$endTS = $end->format('Y-m-d H:i:s');


$myrequ = "INSERT INTO sessions (courseName, startTime, endTime, startTime2, endTime2, location, details, studID, isActive) VALUES ('$courseName', '$startTime', '$endTime', '$startTS', '$endTS', '$location', '$details', '$studId', 1)";
$result = mysql_query($myrequ);

if ($result) {
	echo 'Success!';
	exit();
} else {
	echo 'ERROR, did not add to database!' . mysql_error();
}

mysql_close($con);
?>
