<?php
session_start();
include 'config.php';
$con = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die (mysql_error());
mysql_select_db(DB_DATABASE) or die(mysql_error());

$qry = "UPDATE students SET currentSession=0 WHERE studId=" . $_SESSION['studId'];
if ($result = mysql_query($qry)) {
	echo "Success!";
	exit();
} else {
		die("Error: did not leave session!\n" . mysql_error());
}

mysql_close($con);

?>