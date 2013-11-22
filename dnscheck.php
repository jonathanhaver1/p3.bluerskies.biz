<?php
//DNSCheck server script for use with dnscheck.js
//FILENAME: dnscheck.php
//06-02-2007
//Eli Moulton

if ($_GET['domain'])
{
	$lookupData = dns_get_record($_GET['domain'],DNS_A);
	if ($lookupData)
	{
		echo $lookupData[0]['ip'];
	}
	else
		echo -100;
}
else
{
	echo -150;
}
?>