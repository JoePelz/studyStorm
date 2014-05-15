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
//			"currentSession"
//
////////////////////////////////////////////////
if (isset($_SESSION['studId']) 
 && isset($_SESSION['email']) 
 && isset($_SESSION['studName'])) {

	//connect to mysql
	include 'config.php';
	$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD) or die(mysql_error());
	mysql_select_db(DB_DATABASE) or die("No database, foo'!");
	$results = array();
	
	
	
	//------ CHECK IF USER HAS CREATED AN ACTIVE SESSION ----//
	$myrequ = "SELECT * FROM sessions WHERE isActive=1";
	$result = mysql_query($myrequ);

	$session = -1;
	//while there's still rows to check in the result array,
	while($rowActive=mysql_fetch_array($result)){
		$studId = $_SESSION['studId'];
		//check if student h3as an active session
		if ($rowActive['studId'] == $studId) {
			//if user has a active session, let a variable be created with that session num (> 0)
			$session = $rowActive['sessionId'];
			//no 'else' is needed
		}
	}
	
	//---- CHECK IF USER HAS JOINED A GROUP ----//
	$_SESSION["currentSession"] = 0;
	$myrequ = "SELECT currentSession FROM students WHERE studId=" . $_SESSION['studId'] . " AND currentSession!=0";
	if ($result = mysql_query($myrequ)) {
		$currentSessionArray = mysql_fetch_assoc($result);
		$_SESSION["currentSession"] = $currentSessionArray["currentSession"];
	}


	$results["loggedIn"] = "yes";
	$results["studId"] = $_SESSION['studId'];
	$results["studName"] = $_SESSION['studName'];
	$results["email"] = $_SESSION['email'];
	$results["currentSession"] = $_SESSION['currentSession'];
	$results["sessionId"] = $session;
	
	echo json_encode($results);
	
	//connection was only opened if the user was logged in.
	mysql_close($con);
} else {
	$results = array();
	$results["loggedIn"] = "no";
	echo json_encode($results);
}

?>
