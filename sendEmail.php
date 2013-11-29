<?php

/*
* This function sends an email (over SMTP)
* and returns the destination address after
* it sent the message
*/

    $toAddress = $_POST['emailAddressSend'];
    $message = $_POST['messageSend'];

	//send email
    mail($toAddress, "test", $message);

  	echo $toAddress

?>