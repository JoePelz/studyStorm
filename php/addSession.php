<?php
    include 'config.php';
	$conn=mysqli_connect(DB_HOST, DB_USER,DB_PASSWORD);
    // Get connected
    if (mysqli_connect_errno())
      {
      echo "Connection to database failed. MySQL error " . mysqli_connect_error();
      }

	
    $courseName = $_POST['courseName'];
	$startTime = $_POST['startTime'];
	$endTime = $_POST['endTime'];
	$location = $_POST['location'];
	$details = $_POST['details'];
	

    $myrequ = "INSERT INTO sessions (courseName, startTime, endTime, location, details, studID, isActive) VALUES ('$courseName', '$startTime', '$endTime', '$location', '$details', '1', 'true')";

        mysqli_query($conn, $myrequ);
        echo "worked".$num;
	} else {
        echo $acct;
    }

    mysqli_close($conn);
?>
