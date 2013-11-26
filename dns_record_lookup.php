<?php

$resultDNS = dns_get_record($_POST['domainString']);

echo json_encode($resultDNS);

?>