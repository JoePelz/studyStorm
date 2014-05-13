<?php

///////////////////////////////////////////////////
// This script is run with POST data from the registration form.
// It adds a new user to the students database 
// if all the validation checks out fine.
///////////////////////////////////////////////////

include 'config.php';
$con = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die(mysql_error());
mysql_select_db(DB_DATABASE) or die('No database found!');


//Prevent MySQL injection attacks 
//by filtering out dangerous characters.
$studName = mysql_real_escape_string($_POST['regStudName']);
$email = mysql_real_escape_string($_POST['regEmail']);
$password = mysql_real_escape_string($_POST['regPassword']);
$confirmPassword = mysql_real_escape_string($_POST['regConfirmPassword']);
$secCode = rand();

//-- Validation --
//Placeholder for errors
$errmsg_arr = array();
$errflag = false;

//Check that email is valid and ends with my.bcit.ca
if (!preg_match( "/^[A-Z0-9._%+-]+@my.bcit.ca$/i", $email )) {
	$errmsg_arr[] = "<p>You must use a bcit email address.</p>";
	$errflag = true;
}

//Check that username is at least 2 letters.
$test = @trim($studName);
if (strlen($test) <= 2) {
    $errmsg_arr[] = "<p>Username must be at least 2 letters.</p>";
    $errflag = true;
}

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

//Check that user doesn't already exist
$qry = "SELECT `studName` FROM `students` WHERE `email`=\"" . $email . "\"";
$result = mysql_query($qry);
if(mysql_num_rows($result) != 0) {
    $errflag = true;
    $errmsg_arr[] = "<p>A user with that email already exists!</p>";
}

//Insert into the table!
if ($errflag == true) {
    $output = "";
    foreach ($errmsg_arr as $err) {
        $output .= $err;
    }
    echo $output;
} else {
    $qry = "INSERT INTO students (studName, email, password, secCode, hasConfirmed) VALUES ('$studName', '$email', '$password', '$secCode', 0)";
    $result = mysql_query($qry);
    if($result) {
			// Write email
			$msg = "<p>Here is your security code for Study Storm registration:</p>\n";
			$msg .= "<h2>" . $secCode . "</h2>";
			$msg .= "<p>Please enter this code in the required field.</p>";
			$msg = wordwrap($msg, 70);
			// Send email
			mail($email, "Study Storm Security Code", $msg);
						
    	echo 'Success!';
    } else {
    	echo 'ERROR, did not add student to database!';
    }
}

mysql_close($con);

?>
