<?php

session_start();

/////////////////////////////////////////
//
//  This script is run from the Edit Session form.
//  When run, it closes the user's current study session
//  by setting isActive to 0.
//
//  Returns a string indicating success or other.
//
/////////////////////////////////////////

include 'config.php';
$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD) or die(mysql_error());
mysql_select_db(DB_DATABASE) or die("No database, foo'!");


//Query:  UPDATE  `sessions` SET `isActive`='0' WHERE `isActive`='1' AND `studId`=23;

$qry = "UPDATE `sessions` SET `isActive`='0' WHERE `isActive`='1' AND `studId`=" . $_SESSION['studId'];
$result = mysql_query($qry);

if($result) {
	echo "success!";
} else {
	die("query failed. " . mysql_error());
}

?>