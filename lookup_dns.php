<?php

$result = dns_get_record($_POST['domain'],DNS_MX);

echo $result;
