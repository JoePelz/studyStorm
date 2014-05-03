<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Details</title>
</head>

<body>

<?php
require_once('./php/config.php');

$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD)
	or die('Failed to connect to server: ' . mysql_error());

$db = mysql_select_db(DB_DATABASE) or die("Unable to select database");


//data available: studName, sessionId, courseName, details, startTime, endTime, location, studId, isActive
$qry = "SELECT u.studName, s.* FROM sessions s, students u WHERE u.studId=s.studId AND s.sessionId=".$_GET['sessionId'];
$result = mysql_query($qry);


if ($result) {
	while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
		echo "<h1>".$row['studName']."'s Study Session</h1>\n";
		echo "<ul>\n";
		echo "<li>Subject: ".$row['courseName']."</li>\n";
		echo "<li>Time: ".$row['startTime']." to ".$row['endTime']."</li>\n";
		echo "<li>Location: ".$row['location']."</li>\n";
		echo "<li>Details: ".$row['details']."</li>\n";
		echo "</ul>\n";
	}
} else {
	die("Query failed");
}

mysql_close($con);
?>

</body>
</html>
