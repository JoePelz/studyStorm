<?php
session_start();

/////////////////////////////////////////
//
//  This script checks secCode and email and updates the password in database
//  It accepts an email POST data 
//  and searches the students table for matches
//
//  If a match is found, Ideal a confirmation is send (not done yet.)
//     
//
//  Returns a string indicating success or other.
//
/////////////////////////////////////////

//Defines the variables for connecting to MySQL.
include_once 'config.php';

$con = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die(mysql_error());
mysql_select_db(DB_DATABASE) or die('database not found');

$email = $_POST['forgotPassEmail'];
$secCode = $_POST['secCode'];
$password = $_POST['FPPassword'];
$confirmPassword = $_POST['FPConfirmPassword'];

$qry = "SELECT * FROM students WHERE email='$email' AND secCode='$secCode'";
$result = mysql_query($qry);


if (mysql_num_rows($result)) {
	$qry = "UPDATE students SET password='$password' WHERE email='$email'";
	$result = mysql_query($qry);
	
	if ($result) {
		echo "Success!";
		exit();
	} else {
		echo "incorrect code?";
	}
} else {
		echo mysql_error();
}






	



mysql_close($con);

?>