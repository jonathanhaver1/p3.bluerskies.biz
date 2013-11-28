<?php

    $toAddress = $_POST['emailAddressSend'];
    $message = $_POST['messageSend'];

	//send email
    mail($toAddress, "test", $message);

  	echo $toAddress

?>