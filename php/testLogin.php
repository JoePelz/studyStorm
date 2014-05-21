<?php

session_start();

/////////////////////////////////////////////////
//
//  This script checks if the user is logged in
//  and returns useful information if so.
//  
//  Returned data includes:
//      "loggedIn", 
//      "studId", 
//      "studName", 
//      "email", 
//      "sessionId"
//      "currentSession"
//
////////////////////////////////////////////////

if (isset($_COOKIE["username"])) {
	//connect to mysql
	include 'config.php';
	$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD) or die(mysql_error());
	mysql_select_db(DB_DATABASE) or die("No database, foo'!");
	
	
	//If the user has an active session,
	//  Set session to that
	//Else
	//  Set session to -1
	$session = 0;
	$studName = "" + $_COOKIE['username'] + "a";
	$qryCookie = "SELECT * FROM students WHERE studName = $studName";
	$resultCookie = mysql_query($qryCookie);
	if ($resultCookie) {
		if(mysql_num_rows($resultCookie)) {
			$row = mysql_fetch_array($resultCookie);
			session_regenerate_id();
			$_SESSION['studName'] = $row['studName'];
			$_SESSION['email'] = $row['email'];
			$_SESSION['studId'] = $row['studId'];
			$_SESSION['currentSession'] = $row['currentSession'];
			session_write_close();
		}
	}	
	//connection was only opened if there was a cookie for that user.
	mysql_close($con);
} 


if (isset($_SESSION['studId']) 
 && isset($_SESSION['email']) 
 && isset($_SESSION['studName'])) {

	//connect to mysql
	include 'config.php';
	$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD) or die(mysql_error());
	mysql_select_db(DB_DATABASE) or die("No database, foo'!");
	
	
	//If the user has an active session,
	//  Set session to that
	//Else
	//  Set session to -1
	$session = 0;
	$qry = "SELECT sessionId FROM sessions WHERE isActive = 1 AND studId = " . $_SESSION['studId'];
	$result = mysql_query($qry);
	if($result) {
		if(mysql_num_rows($result)) {
			$row = mysql_fetch_array($result);
			$session = $row['sessionId'];
		}
	}
	
	//---- check/update the current session value ----//
	$_SESSION["currentSession"] = 0;
	$qry = "SELECT u.currentSession FROM students u JOIN sessions s ON u.currentSession=s.sessionId WHERE s.isActive = 1 AND u.studId=" . $_SESSION['studId'];
	if ($result = mysql_query($qry)) {
		if(mysql_num_rows($result)) {
			$currentSessionArray = mysql_fetch_assoc($result);
			$_SESSION["currentSession"] = $currentSessionArray["currentSession"];
		}
	}

	$results = array();
	$results["loggedIn"]  = TRUE;
	$results["studId"]    = $_SESSION['studId'];
	$results["studName"]  = $_SESSION['studName'];
	$results["email"]     = $_SESSION['email'];
	$results["currentSession"] = $_SESSION['currentSession'];
	$results["sessionId"] = $session;
	
	echo json_encode($results);
	
	//connection was only opened if the user was logged in.
	mysql_close($con);
} else {
	$results = array();
	$results["loggedIn"] = FALSE;
	echo json_encode($results);
}

?>
