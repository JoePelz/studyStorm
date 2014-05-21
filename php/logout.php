<?php
session_start();
session_destroy();
setcookie("username", $_SESSION['studName'], time() - 1);
echo "Success!";
//////////////////////////////////////////
//
//  All this script does is destroy the user's session,
//  effectively logging them out.
//
//////////////////////////////////////////
?>
