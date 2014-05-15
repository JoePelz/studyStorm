<?php
session_start();

/////////////////////////////////////////
//
//  This script is run from the Forgot form.
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
$secCode = $_POST['secCodePassword'];
$password = $_POST['forgotPassNew'];
$qry = "SELECT * FROM students WHERE email = '$email'";

//secCode = '$secCode' AND password = '$password'";
$result = mysql_query($qry);

//-- Validation --
//Placeholder for errors
$errmsg_arr = array();
$errflag = false;

if($result) {
//Check that password is 4+ non-space characters.
if (strlen($password) < 4 || strstr($password, " ") != FALSE) {
    $errmsg_arr[] = "<p>Password must be at least 4 characters, and not contain whitespace</p>";
    $errflag = true;
}

//Check that passwords match
if (strcmp($password, $confirmPassword) != 0) {
    $errflag = true;
    $errmsg_arr[] = "<p>Passwords do not match.</p>";
}

$qry = "INSERT INTO students (studName, email, password, secCode, hasConfirmed) VALUES ('$studName', '$email', '$password', '$secCode', 0)";
	
	
	
	
} else {
	die("query failed. " . mysql_error());
}


mysql_close($con);

?>