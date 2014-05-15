<?php

session_start();
include 'config.php';
$con = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die(mysql_error());
mysql_select_db(DB_DATABASE) or die(mysql_error());

$qry = "SELECT * FROM locations";
$result = mysql_query($qry);
if ($result) {
	while ($row = mysql_fetch_assoc($result)) {
		$JSON[] = $row;
	}
	echo json_encode($JSON);
}	else {
		$JSON[]['locationName'] = "Doesn't work. " . mysql_error();
		echo json_encode($JSON);
	}
	
mysql_close($con);
?>