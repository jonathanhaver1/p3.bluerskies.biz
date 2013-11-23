<?php

$resultDNS = dns_get_record($_POST['domainString']);
if ($resultDNS == null) {
	print("***** No DNS entry found *****");
} else {
	print("***** DNS entry found *****");
}

?>