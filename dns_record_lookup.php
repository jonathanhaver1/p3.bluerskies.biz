<?php

$resultDNS = dns_get_record($_POST['domainString']);

echo $resultDNS;

?>