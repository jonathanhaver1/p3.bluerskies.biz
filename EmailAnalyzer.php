<!DOCTYPE HTML>
 <html>

	 <head>


	 	<link rel="stylesheet" type="text/css" href="generalStyle.css">
		<script type="text/javascript" src="EmailAnalyzer.js"></script>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>


	</head>

	<body>

		<h1>Communication Tester</h1>
		<i>Test your email and your mobile messaging</i><br>

		<h2>Electronic Mail (email)</h2>

		<h3>Syntax Check<br>
			Domain Extraction<br>
			Reachability Test</h3>

		<span id = "description">This module checks the syntax of an email address, extracts the domain,<br>
			displays the domain on the line below the button,<br>
			and then looks up the domain in the mail server mx record<br>
			to make sure it is a valid email address which can be reached.</span><span>
		
		<form name="emailForm" method="post" action="#"><br>

				Email Address<br>
				<input type="text" name="emailAddress" id="emailAddress"><br><br>
			  	<input type="button" name="Button" value="Check Syntax" onClick ="checkSyntax()">
			  <br><br>
		</form>

		<span style ="color: navy; font:bold 16px Georgia, serif;">= DOMAIN =</span><br><div id = "domainName"></div><br>
		<span style ="color: navy; font:bold 16px Georgia, serif;">= IS THERE A DNS RECORD? =</span><br> <div id = "mxRecordExists"></div><br>

		If you want to see the MX or DNS records click one of the following:<br><br>

		<form>
			Domain:<br>
			<input type='text' id='emailDomain' name='emailDomain'><br><br>
			<input type="radio" name="records" onclick="dns_record(emailDomain)" value="DNS Records">DNS Records<br>
			<input type="radio" name="records" onclick="mx_record(emailDomain)" value="MX Record">MX Records<br><br>
		</form>

		<span style ="color: navy; font:bold 16px Georgia, serif;">= RECORD =</span><br> <div id = "record"></div><br>


	 <h3>Send Test Email</h3>

	 	<form>
		    <label for='emailAddress'>Email Address:</label><br>
			<input type='text' id='emailAddress' name='emailAddress'><br><br>
			 <textarea id="message">
		    Lorem ipsum...
			</textarea><br><br>
			<button onclick="sendEmil(toAddress, textMail); return false">Send</button>
		</form>


	<h2>Mobile Text Message (SMS)</h2>

	<h3>Test Message</h3>

	You can send an SMS to a mobile phone number<br>
	with one of the following carriers:<br><br>

	<form name="smsForm" method="post" action="#" onSubmit="return sendTextMessage()">
		Phone Number<br>
   		<input type='number' name='phoneNumber' id='phoneNumber'><br><br>
   		Test Message<br>
   		<input type='text' name='message' id='message'><br><br>
   		Carrier<br>
   		<select name="carrier">
		   	<option value="1">T-Mobile
			<option value="2">Virgin Mobile
			<option value="3">Cingular
			<option value="4">Sprint
			<option value="5">Verizon
			<option value="6">Nextel
		</select><br><br>

		<input type="submit" name="Submit" Value="send test SMS">
	</form>

		</body>

 </html> 