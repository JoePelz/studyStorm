<?php
include 'config.php';
session_start();
$con = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die(mysql_error());
mysql_select_db(DB_DATABASE) or die("No database found. " . mysql_error());

$qry = "SELECT u.*, s.*, l.* FROM students u, sessions s, locations l
				WHERE s.sessionId=u.currentSession
				AND s.isActive=1
				AND s.location=l.locationName";
$result = mysql_query($qry);

if ($result) {
	$markersArray = array();
	while ($row = mysql_fetch_assoc($result)) {
		$markersArray[] = $row;
	}
}	else {
	$markersArray['isAllGravy'] = FALSE;
	$markersArray['message'] = "Query failed";
	}

echo json_encode($markersArray);

mysql_close($con);

?>