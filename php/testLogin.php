<?php

session_start();

if (isset($_SESSION['studId']) 
 && isset($_SESSION['email']) 
 && isset($_SESSION['studName'])) {

	//connect to mysql
	//send query
	//read results
	//if user has a active session
		$results["sessionId"] = //blah
	//no 'else' is needed

	$results = array();
	$results["loggedIn"] = TRUE;
	$results["studId"]   = $_SESSION['studId'];
	$results["studName"] = $_SESSION['studName'];
	$results["email"]    = $_SESSION['email'];
	echo json_encode($results);
} else {
	$results = array();
	$results["loggedIn"] = FALSE;
	echo json_encode($results);
}

?>