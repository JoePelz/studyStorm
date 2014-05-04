<?php
	session_start();
    include 'config.php';
	$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD) or die(mysql_error());
	mysql_select_db(DB_DATABASE) or die("Error to connect to database.");
    // Get connected

    $courseName = $_POST['courseName'];
	$startTime = $_POST['startTime'];
	$endTime = $_POST['endTime'];
	$location = $_POST['location'];
	$details = $_POST['details'];
	$studId = 1;
	

    $myrequ = "INSERT INTO sessions (courseName, startTime, endTime, location, details, studID, isActive) VALUES ('$courseName', '$startTime', '$endTime', '$location', '$details', '$studId', 'true')";

    $result = mysql_query($myrequ);
	
	
    echo "Session added by Carter";

	mysql_close($con);
?>
