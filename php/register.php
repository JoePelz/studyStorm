<?php
include 'config.php';
$con = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die(mysql_error());
mysql_select_db(DB_DATABASE) or die('No database found!');

$studName = mysql_real_escape_string($_POST['regStudName']);
$email = mysql_real_escape_string($_POST['regEmail']);
$password = mysql_real_escape_string($_POST['regPassword']);

echo $studName . "<br>";
echo $email . "<br>";
echo $password . "<br>";

$qry = "INSERT INTO students (studName, email, password) VALUES ('$studName', '$email', '$password')";
$result = mysql_query($qry);

if($result) {
	echo 'Successfully added student to database! <a href="../index.php">Home</a>';
} else {
	echo 'ERROR, did not add student to database!';
	}


mysql_close($con);

?>