<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Study Sessions</title>
</head>

<body>
<h1>Study Storm</h1>
<?php
if (isset($_SESSION['email'])) {
echo 'Welcome, ' . $_SESSION['studName'] . '!<hr>';
} else {
	echo 'not logged in. <br>';
}
?>
<a href="signInForm.html">Sign in</a>
<a href="registerForm.html">Register</a>
<a href="addSessionForm.html">Add Session</a>
<a href="addSessionForm.html">Add session</a>
<hr />
	<ul>
		<li><a href="details.php?name=Carter">Carter</a></li>
		<li><a href="details.php?name=Arnold">Arnold</a></li>
		<li><a href="details.php?name=Samuel">Samuel</a></li>
	</ul>
</body>
</html>
