<?php
session_start();
include 'php/config.php';
$con = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die(mysql_error());
mysql_select_db(DB_DATABASE) or die(mysql_error());
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.2/jquery.mobile-1.4.2.min.css" />
<link rel="stylesheet" href="css/style.css">
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="http://code.jquery.com/mobile/1.4.2/jquery.mobile-1.4.2.min.js"></script>
<script src="./js/queries.js"></script>
<script src="./js/validate.js"></script>
<title>Study Storm</title>
</head>
<body>

<section data-role="page" id="mainPage">
	<div data-role="header">
		<div data-role="header">
			<div data-role="navbar">
				<ul>
					<li><a href="#addSessionPage" class="ui-btn" data-rel="dialog" data-transition="pop" data-icon="plus">Add Session</a></li>
					<li><a href="#loginPage" class="ui-btn" data-rel="dialog" data-transition="pop" data-icon="back">Sign In</a></li>
				</ul>
			</div><!-- /data-role=navbar" -->
		</div><!-- /data-role="header" -->
	</div><!-- /data-role="header" -->

	<div data-role="main" class="ui-content">
		<?php
		if (isset($_SESSION['email'])) {
			echo 'Welcome, ' . $_SESSION['studName'] . '!<hr>';
			echo '<a href="php/logout.php" data-ajax="false">Log Out</a> ';
			echo '<a href="#addSessionPage" data-rel="dialog" data-transition="pop">Add Session</a>';
		} else {
				echo 'not logged in. <br>';
				echo '<a href="#regPage" data-rel="dialog">Register</a>';
			}
		?>

		<hr />
		<div id="courseDest">
			Stuff goes here
		</div>
		
		<div data-role="collapsibleset" data-inset="false">
			<div data-role="collapsible">
				<h1>Expand!</h1>
				<ul>
				<?php
				require_once('./php/config.php');

				$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD)
					or die('Failed to connect to server: ' . mysql_error());

				$db = mysql_select_db(DB_DATABASE) or die("Unable to select database");


				//data available: studName, sessionId, courseName, details, startTime, endTime, location, studId, isActive
				$qry = "SELECT u.studName, s.startTime, s.sessionId FROM sessions s, students u WHERE u.studId=s.studId"; #AND s.isActive=1";
				$result = mysql_query($qry);

				if ($result) {
					while ($row = mysql_fetch_assoc($result)) {
						echo "\t\t<li>";
						echo "<a href='#detailsPage' onclick='getDetails(".$row['sessionId'].")' data-rel='dialog' data-transition='pop'>";
						echo $row['studName']."</a>\t";
						echo $row['startTime']."\t";
						echo "</li>\n";
					}
				} else {
					die("Query failed");
				}

				mysql_close($con);
				?>
				</ul>
			</div><!-- /data-role="collapsible" -->
		</div><!-- /data-role="collapsibleset" -->
	</div><!-- /data-role="main" -->
</section><!-- /#mainPage -->





<section data-role="page" id="loginPage">
	<div data-role="header">
		<h1>Sign In</h1>
	</div>
	<div data-role="main" class="ui-content">
		<form method="post" action="php/login.php" id="loginForm" data-ajax="false">
			<label for="loginEmail">Email</label>
			<input type="email" name="loginEmail" id="loginEmail">
			<label for="loginPassword">Password</label>
			<input type="password" name="loginPassword" id="loginPassword">
			<a href="#">Forgot password?</a>
			<input type="submit" value="Log In">
		</form>
	<a href="#regPage" data-role="button" data-rel="dialog" data-transition="slide">Register</a>
	</div><!-- /data-role="main" -->
</section><!-- /#loginPage -->






<section data-role="page" id="detailsPage">
	<div data-role="header">
	
	</div>
	<div data-role="main" class="ui-content">
		<div id="dest"></div>
	</div><!-- /data-role="main" -->
</section><!-- /#detailsPage -->





<section data-role="page" id="regPage">
	<div data-role="header">
		<h1>Register</h1>
	</div>
	<div data-role="main" class="ui-content">
		<form id="regForm">
		
			<label for="regEmail">Email (must be a valid bcit email account):</label>
			<input type="email" name="regEmail" id="regEmail" onkeyup="validateEmail('#regEmail', '#errRegEmail');">
			<div id="errRegEmail" class="errMsg invisible">Your email must be from my.bcit.ca</div>
			
			<label for="regStudName">Choose a name (one that people might recognize!):</label>
			<input type="text" name="regStudName" id="regStudName" onkeyup="validateName('#regStudName', '#errRegName');">
			<div id="errRegName" class="errMsg invisible">Your name must be at least 2 letters.</div>

			<label for="regPassword">Choose a password:</label>
			<input type="password" name="regPassword" id="regPassword" onkeyup="validatePass('#regPassword', '#errRegPass');">
			<div id="errRegPass" class="errMsg invisible">Your password must be at least 4 letters.</div>

			<label for="regConfirmPassword">Confirm your password:</label>
			<input type="password" name="regConfirmPassword" id="regConfirmPassword" onkeyup="validateMatching('#regPassword', '#regConfirmPassword', '#errRegConfirmPass')">
			<div id="errRegConfirmPass" class="errMsg invisible">Your passwords don't match right now.</div>

			<input type="submit" value="Register" id="regSubmit">
		</form>
        <div id="regResult"></div>
	</div><!-- /data-role="main" -->
</section><!-- /#regPage -->



<section data-role="page" id="addSessionPage">
	<div data-role="header">
		<h1>Add Session</h1>
	</div>
	<div data-role="main" class="ui-content">
		<form method="post" action="php/addSession.php" onsubmit="return addSessionValidate()">

			<label for="courseName">Select a Course: <span id="errCourse"></span></label>
			<div id="itmCourse">
				<select name="courseName" id="courseName" onblur="testCourseValid('#courseName')">
					<option value="">Select One</option>
					<option value="comp1510">comp1510</option>
					<option value="comp1536">comp1536</option>
					<option value="comp1111">comp1111</option>
					<option value="comp1100">comp1100</option>
					<option value="comp1113">comp1113</option>
					<option value="comm1116">comm1116</option>
					<option value="busa2720">busa2720</option>
				</select>
			</div><!-- /#itmCourse -->

			<div id="itmLocation">
				<label for="location">Location: <span id="errLocation"></span></label>
				<input type="text" name="location" id="location" onkeyup="testLocationValid('#location')">
			</div><!-- /end itmLocation div -->

			<label for="startTime">Start Time: <span id="errTime"></span></label>
			<div id="itmTime">
				<input type="time" name="startTime" id="startTime" onkeyup="testTimeValid('#startTime')">
				<label for="endTime">End Time: </label>
				<input type="time" name="endTime" id="endTime" onkeyup="testTimeValid('#endTime')">
			</div><!-- /end itmTime div -->

			<label for="details">Details: <span id="errDetails"></span></label>
			<div id="itmDetails">
				<textarea name="details" id="details" onkeyup="testDetailsValid('#details')"></textarea>
			</div><!-- /end itmDetails -->

			<input type="Submit" value="Add">

		</form>
	</div><!-- /data-role="main" -->
</section>

</body>
</html>
