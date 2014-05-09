<?php

session_start();

if (isset($_SESSION['studId']) 
 && isset($_SESSION['email']) 
 && isset($_SESSION['studName'])) {

	//connect to mysql
	include 'config.php';
	$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD) or die(mysql_error());
	mysql_select_db(DB_DATABASE) or die("No database, foo'!");
	//send query
	$myrequ = "SELECT * FROM sessions WHERE isActive=1";
	//read results
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

	mysql_close($con);

	$results = array();
	$results["loggedIn"] = TRUE;
	$results["studId"]   = $_SESSION['studId'];
	$results["studName"] = $_SESSION['studName'];
	$results["email"]    = $_SESSION['email'];
	$results["sessionId"] = $session;
	echo json_encode($results);
} else {
	$results = array();
	$results["loggedIn"] = FALSE;
	echo json_encode($results);
}

?>