<?php

/*
* This function tries to look up the DNS record for a given domain
* and returns a string, containing a message that it was either
* found or not found
*/

$resultDNS = dns_get_record($_POST['domainString']);

if ($resultDNS == null) {

	print("***** No DNS entry found *****");

} else {

	print("***** DNS entry found *****");
	
}

?>