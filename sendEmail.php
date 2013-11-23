<?php

    $toAddress = $_POST['emailAddress'];
    $message = $_POST['message'];

	//send email
    mail($toAddress, "test", $message);

  	echo $toAddress

?>