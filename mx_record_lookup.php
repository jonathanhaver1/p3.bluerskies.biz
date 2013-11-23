<?php

$resultDNS = dns_get_record($_POST['domainString'],DNS_MX);

print_r($resultDNS);

?>