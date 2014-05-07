<?php
session_start();
include 'config.php';
$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD) or die(mysql_error());
mysql_select_db(DB_DATABASE) or die("No database, foo'!");


$courseName = mysql_real_escape_string($_POST['courseName']);
$startTime = mysql_real_escape_string($_POST['startTime']);
$endTime = mysql_real_escape_string($_POST['endTime']);
$location = mysql_real_escape_string($_POST['location']);
$details = mysql_real_escape_string($_POST['details']);
$studId = $_SESSION['studId'];


echo $courseName . "<BR>";
echo $startTime . "<BR>";
echo $endTime . "<BR>";
echo $location . "<BR>";
echo $details . "<BR>";


$myrequ = "INSERT INTO sessions (courseName, startTime, endTime, location, details, studID, isActive) VALUES ('$courseName', '$startTime', '$endTime', '$location', '$details', '$studId', 'true')";
$result = mysql_query($myrequ);

if ($result) {
echo 'Added to database! <a href="../index.php">Back to main</a>';
} else {
echo 'ERROR, did not add to database! <a href="../addSessionForm.html">Back to form</a>';
}

mysql_close($con);
?>
