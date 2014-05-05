<?php
session_start();

include_once 'config.php';
$con = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die(mysql_error());
mysql_select_db(DB_DATABASE) or die('database not found');

$email = $_POST['loginEmail'];
$password = $_POST['loginPassword'];

$qry = "SELECT * FROM students WHERE email = '$email' AND password = '$password'";
$result = mysql_query($qry);

if($result) {
	if(mysql_num_rows($result)) {
		session_regenerate_id();
		$studArray = mysql_fetch_assoc($result);
		$_SESSION['studName'] = $studArray['studName'];
		$_SESSION['email'] = $studArray['email'];
		$_SESSION['studId'] = $studArray['studId'];
		session_write_close();
		header("location: ../index.php");
		exit();
	} else {
			echo "invalid name or password!" . mysql_error();
			exit();
		}
} else {
		die("query failed. " . mysql_error());
	}


mysql_close($con);

?>