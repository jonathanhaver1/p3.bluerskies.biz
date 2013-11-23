<?php

$resultDNS = dns_get_record($_POST['domainString']);

print_r($resultDNS);

?>