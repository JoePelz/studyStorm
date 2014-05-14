<?php

session_start();
include_once 'config.php';
$con = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die(mysql_error());
mysql_select_db(DB_DATABASE) or die('database not found');

$sessionId = $_GET['sessionId'];

$qry = "UPDATE students SET currentSession='$sessionId' WHERE studId=" . $_SESSION['studId'];
$result = mysql_query($qry);

if ($result) {
	// Deactivate any current sessions created by user, if any.
	$qry = "UPDATE sessions SET isActive=0 WHERE studId=" . $_SESSION['studId'];
	$result = mysql_query($qry);
	
	echo "Success!";
	exit();
} else {
		echo "Error: did not join group.";
}
mysql_close($con);
?>