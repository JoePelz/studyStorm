<?php
    include 'connection.php';
    // Get connected
    if (mysqli_connect_errno())
      {
      echo "Connection to database failed. MySQL error " . mysqli_connect_error();
      }

	
    $name = $_POST['name'];
	$time = $_POST['time'];
	$location = $_POST['location'];
	$details = $_POST['details'];
	

    $myrequ = "INSERT INTO sessions (id, name, time, location, details) VALUES ('$num', '$name', '$time', '$location', '$details')";

        mysqli_query($myconn, $myrequ);
        echo "worked".$num;
	} else {
        echo $acct;
    }

    mysqli_close($myconn);
?>
