<?php

/*
* This function looks up the MX record for a given domain
* and returns the JSCON encoded array of the result
*/

$resultDNS = dns_get_record($_POST['domainString'],DNS_MX);

if ($resultDNS == null) {

	print ("<br>No Record Found<br>");

} else {

	echo json_encode ($resultDNS);

}

?>