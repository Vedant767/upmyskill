<?php

// Replace this with your own email address
// $to = 'info@quidditchfinance.com';
$to = 'contact@upmyskill.in';

function url(){
  return sprintf(
    "%s://%s",
    isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
    $_SERVER['SERVER_NAME']
  );
}

if($_POST) {

   $name = trim(stripslashes($_POST['name']));
   $email = trim(stripslashes($_POST['email']));
   $telephone = trim(stripslashes($_POST['telephone']));
   $contact_message = trim(stripslashes($_POST['message']));

   
	if ($subject == '') { $subject = "Interested for the course"; }

   // Set Message
   $message .= "Email from: " . $name . "<br />";
   $message .= "Email address: " . $email . "<br />";
   $message .= "Phone Number: " . $telephone . "<br />";
   $message .= "Message: <br />";
   $message .= nl2br($contact_message);
   $message .= "<br /> ----- <br /> This email was sent from your site " . url() . " contact form. <br />";

   // Set From: header
   $from =  $name . " <" . $email . ">";

   // Email Headers
	$headers = "From: " . $from . "\r\n";
	$headers .= "Reply-To: ". $email . "\r\n";
 	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

   ini_set("sendmail_from", $to); // for windows server
   $mail = mail($to, $subject, $message, $headers);

	if ($mail) {
      header ("Location: https://upmyskill.in"); }
   else { echo "Something went wrong. Please try again."; }

}

?>