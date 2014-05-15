<?php
session_start();
include 'config.php';
$con = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die(mysql_error());
mysql_select_db(DB_DATABASE) or die('No database found!');

$secCode = $_POST['secCode'];
$confirmEmail = $_POST['confirmEmail'];

$qry = "SELECT * FROM students WHERE email='$confirmEmail' AND secCode='$secCode'";
$result = mysql_query($qry);

if (mysql_num_rows($result)) {
	$qry = "UPDATE students SET hasConfirmed=1 WHERE email='$confirmEmail'";
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