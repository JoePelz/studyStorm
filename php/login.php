<?php
session_start();

/////////////////////////////////////////
//
//  This script is run from the login form.
//  It accepts an email and password as POST data 
//  and searches the students table for matches
//
//  If a match is found, the user is logged in.
//  This means that session data is set, including:
//      $_SESSION['studName']
//      $_SESSION['studId']
//      $_SESSION['email']
//
//  Returns a string indicating success or other.
//
/////////////////////////////////////////

include_once 'config.php';
$con = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die(mysql_error());
mysql_select_db(DB_DATABASE) or die('database not found');

$email = $_POST['loginEmail'];
$password = $_POST['loginPassword'];
$this = $_POST['rememberMe'];
$JSON = array();

$qry = "SELECT * FROM students WHERE email = '$email'";
$result = mysql_query($qry);

if($result) {
	if(mysql_num_rows($result)) {
		session_regenerate_id();
		$studArray = mysql_fetch_assoc($result);
		$_SESSION['studName'] = $studArray['studName'];
		$_SESSION['email'] = $studArray['email'];
		$_SESSION['studId'] = $studArray['studId'];
		$_SESSION['currentSession'] = $studArray['currentSession'];
		session_write_close();	
		//JSON TIME!!
		$JSON['hasValidEmail'] = TRUE;
		
		if (password_verify($password, $studArray['password'])) {
			$JSON['hasValidPassword'] = TRUE;
		}	else {
				$JSON['hasValidPassword'] = FALSE;
			}
		
		if ($studArray['hasConfirmed'] == 1) {
			$JSON['hasConfirmed'] = TRUE;
		}	else {
				$JSON['hasConfirmed'] = FALSE;
			}
		$JSON['this'] = $this;
		echo json_encode($JSON);
		exit();
	} else {
		$JSON['hasValidEmail'] = FALSE;
		echo json_encode($JSON);
		exit();
	}
} else {
	die("query failed. " . mysql_error());
}


mysql_close($con);

?>
