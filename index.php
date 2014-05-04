<?php
session_start();
include 'php/config.php';
$con = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die(mysql_error());
mysql_select_db(DB_DATABASE) or die(mysql_error());
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Study Sessions</title>
</head>

<body>
<h1>Study Storm</h1>

<?php
if (isset($_SESSION['email'])) {
	echo 'Welcome, ' . $_SESSION['studName'] . '!<hr>';
	echo '<a href="php/signOut.php">Sign Out</a> ';
	echo '<a href="addEssionForm.html">Add Session</a>';
} else {
		echo 'not logged in. <br>';
		echo '<a href="signInForm.html">Sign in</a> ';
		echo '<a href="registerForm.html">Register</a>';
	}
?>

<hr />
	<ul>

<?php
require_once('./php/config.php');

$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD)
	or die('Failed to connect to server: ' . mysql_error());

$db = mysql_select_db(DB_DATABASE) or die("Unable to select database");


//data available: studName, sessionId, courseName, details, startTime, endTime, location, studId, isActive
$qry = "SELECT u.studName, s.startTime, s.sessionId FROM sessions s, students u WHERE u.studId=s.studId"; #AND s.isActive=1";
$result = mysql_query($qry);


if ($result) {
	while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
		echo "\t\t<li>";
		echo "<a href='details.html?sessionId=".$row['sessionId']."'>";
		echo $row['studName']."</a>\t";
		echo $row['startTime']."\t";
		echo "</li>\n";
	}
} else {
	die("Query failed");
}

mysql_close($con);
?>

	</ul>
</body>
</html>
