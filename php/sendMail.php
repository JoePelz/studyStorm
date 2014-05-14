<?php

$message = $_POST['message'];
$email = $_POST['email'];
$subject = $_POST['subject'];

// In case any of our lines are larger than 70 characters, we should use wordwrap()
$message = wordwrap($message, 70, "\r\n");

$headers = 'From: info@studystorm.org' . "\r\n" .
    'Reply-To: info@studystorm.org' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

// Send the mail!
mail($email, $subject, $message, $headers);

echo "Success!";

?>
