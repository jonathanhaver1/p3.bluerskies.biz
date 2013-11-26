<?php

$resultDNS = dns_get_record($_POST['domainString'],DNS_MX);

echo json_encode($resultDNS);

?>