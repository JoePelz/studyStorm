<?php
session_start();

//////////////////////////////////////////////////
//
//  This script is run when the user submits the Edit Session form.
//  It takes all the form fields as POST data.
//  
//  It does not do any validation.
//
//  It modifies the user's current session to reflect the new data.
//
//  It returns a text string.
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


/*
UPDATE  sessions SET  
`courseName` =  'comp1510',
`details` =  'making games',
`startTime` =  '07:11:00',
`startTime2` =  '2014-05-13 07:11:00',
`location` =  'SE12' 
WHERE  `sessions`.`sessionId` =58;
*/

$qry = "UPDATE sessions SET 
`courseName`='$courseName', 
`details`='$details', 
`startTime`='$startTS', 
`endTime`='$endTS', 
`location`='$location'
WHERE `studId`=" . $_SESSION['studId'] . " AND `isActive`=1";

$result = mysql_query($qry);

if ($result) {
	echo 'Success!';
	exit();
} else {
	echo 'ERROR, edit failed!' . mysql_error();
}

mysql_close($con);
?>