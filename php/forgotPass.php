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


$qry = "SELECT * FROM students WHERE email = '$email'";
$result = mysql_query($qry);
$json = array();
if($result) {
	if(mysql_num_rows($result)) {
		$studArray = mysql_fetch_assoc($result); //Fetch a result row as an associative array
		if ($studArray['hasConfirmed'] == 1) {
			$f_contents = file("lines.txt");
			$line = $f_contents[array_rand($f_contents)];
			$line = trim($line);
			$randNum = rand() % 8 + 2;
			$secCode = $line . $randNum;
			$qry = "UPDATE students SET secCode='$secCode' WHERE email='$email'";
			if ($result = mysql_query($qry)) {
				$json['email'] = $email;
				$json['secCode'] = $secCode;
				$json['success'] = TRUE;
			} else {
					$json['success'] = FALSE;
					$json['errorMessage'] = "Did not update code. " . mysql_error();
			}
		}
		else {
			$json['success'] = FALSE;
			$json['errorMessage'] = "Not confirmed";
		}
	} else {
			$json['success'] = FALSE;
			$json['errorMessage'] = "No match found";
	}
} else {
		$json['success'] = FALSE;
		$json['errorMessage'] = "Query failed. " . mysql_error();
}

echo json_encode($json);

mysql_close($con);

?>
