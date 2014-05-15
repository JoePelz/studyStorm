<?php

session_start();
include 'config.php';
$con = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die(mysql_error());
mysql_select_db(DB_DATABASE) or die(mysql_error());

$email = $_POST['confirmEmail'];
$secCode = rand();
$json = array();

$qry = "SELECT * FROM students WHERE email='$email'";
$result = mysql_query($qry);
if (mysql_num_rows($result)) {
	$qry = "UPDATE students SET secCode='$secCode' WHERE email='$email'";
	if ($result = mysql_query($qry)) {
		$json['email'] = $email;
		$json['secCode'] = $secCode;
		$json['isAllGravy'] = TRUE;
		$json['info'] = "An email has been sent!";
	}	else {
			$json['isAllGravy'] = FALSE;
			$json['info'] = "An email has not been sent for whatever reason!";
		}
} else {
		$json['isAllGravy'] = FALSE;
		$json['info'] = "That email is not in our database!";
	}

echo json_encode($json);


?>