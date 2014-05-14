<?php
session_start();

/////////////////////////////////////////
//
//  This script is run from the Forgot form.
//  It accepts an email POST data 
//  and searches the students table for matches
//
//  If a match is found, Ideal a confirmation is send (not done yet.)
//  This means that session data is set, including:
//      $_SESSION['studName']
//      $_SESSION['studId']
//      $_SESSION['email']
//
//  Returns a string indicating success or other.
//
/////////////////////////////////////////

//Defines the variables for connecting to MySQL.
include_once 'config.php';

$con = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die(mysql_error());
mysql_select_db(DB_DATABASE) or die('database not found');

$email = $_POST['forgotPassEmail'];


$qry = "SELECT * FROM students WHERE email = '$email'";
$result = mysql_query($qry);

if($result) {
	if(mysql_num_rows($result)) {
		//session_regenerate_id(); //no need to regenerate because no need to create a new session but need to re-generate a new password
		$studArray = mysql_fetch_assoc($result); //Fetch a result row as an associative array
		//$_SESSION['studName'] = $studArray['studName']; //no session
		//$_SESSION['email'] = $studArray['email'];
		//$_SESSION['studId'] = $studArray['studId'];
		//session_write_close();
		//header("location: ../index.php");
		echo "Success!";
		exit();
	} else {
		echo "Invalid email" . mysql_error();
		exit();
	}
} else {
	die("query failed. " . mysql_error());
}


mysql_close($con);

?>
