<?php

$resultDNS = dns_get_record($_POST['domainString']);

if ($resultDNS == null) {

	print ("<br>No Record Found<br>");

} else {

	echo json_encode ($resultDNS);

}

?>