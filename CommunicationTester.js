//-------------------------------------------------------------------------------------
//----------------------- EMAIL SYNTAX AND CHARACTER CHECK ----------------------------

function checkCharactersEmailAddress (emailAddress) {

    characterTest = /^[\w!#$%&\'*+\-\/=?^`{|}~]+(\.[\w!#$%&\'*+\-\/=?^`{|}~]+)*@[a-z\d]([a-z\d-]*[a-z\d])?(\.[a-z\d]([a-z\d-]*[a-z\d])?)*\.[a-z]{2,6}$/i
    lengthTest = /^(.{1,64})@(.{4,255})$/
    if (characterTest.test(emailAddress) && lengthTest.test(emailAddress)) {
    	return true
    } else {
    	return false
    }
}

function checkSyntax(){
	var email = document.emailForm.emailAddress
	var emailString = email.value


	if (email.value==null){
		alert ("No email address entered")
	}
	if (checkCharactersEmailAddress(email.value)==false){
    	alert ("This email address is not valid")
	} else {
		alert ("This email address is valid")
	}

	// extract domain
	var emailDomain = emailString.replace(/.*@/, "")
  document.getElementById('domainName').innerHTML=emailDomain

  mx_lookup (emailDomain)

 }

//-------------------------------------------------------------------------------------
//----------------------- DOMAIN NAME SYNTAX AND CHARACTER CHECK  ---------------------


function checkDomainName (domainName) {

  var regExp = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/) 
  domainName.match(regExp)

  if (domainName==null){
    alert ("No domain name entered")
    return false
  }
  if (!domainName.match(regExp)){
    alert ("This domain name is not valid\n\nPlease enter it again")
    return false
  } else {
    return true
  }

}

//-------------------------------------------------------------------------------------
//----------------------- MX LLOKUP ---------------------------------------------------

function mx_lookup (domainName) {

  alert("The domain name is "+ domainName + "\n\nI will now check the DNS records for this domain");

  $.ajax({
    type: "POST",
    url: "lookup_dns.php",
    data: {domainString: domainName.toString()}, 
    cache: false,

    success: function(response){
      $('#mxRecordExists').html(response);

  }
    });
}


//------------------------------------------------------------------------------------
//----------------------- RECORDS ----------------------------------------------------


function dns_record (domainName) {

  dn = domainName.value

  if (checkDomainName (dn)) {

    alert("Looking up the DNS record for "+ dn)


    $.ajax({
      type: "POST",
      url: "dns_record_lookup.php",
      data: {domainString: dn}, 
      cache: false,

      success: function(response){

        var stringResponse = JSON.stringify(response,null,0);

        parseResponse = beautifyRecords(stringResponse);

        $('#record').html(parseResponse);
      }
    });
  }
}

function mx_record (domainName) {

  dn = domainName.value

  if (checkDomainName (dn)) {

    alert("Looking up the MX Record for " + dn)

    $.ajax({
      type: "POST",
      url: "mx_record_lookup.php",
      data: {domainString: dn}, 
      cache: false,

      success: function(response){

        var stringResponse = JSON.stringify(response,null,0);

        parseResponse = beautifyRecords(stringResponse);

        $('#record').html(parseResponse);
      }
    });
  }
}

//------------------------------------------------------------------------------------
//--------------------------- SEND EMAIL ---------------------------------------------

// convert to string value

function testEmail(emailAddress, emailMessage) {

  var emailAddressString = emailAddress.value.toString()
  var emailMessageString = emailMessage.value.toString()

  sendTestEmail(emailAddressString, emailMessageString) 
}

// email sender

function sendTestEmail(emailAddressString, emailMessageString) {

  if (checkCharactersEmailAddress (emailAddressString)) {
    var alertText = "Sending the email to :" + emailAddressString + ", message: " + emailMessageString
    alert(alertText)

    $.ajax({
    type: "POST",
      url: "sendEmail.php",
      data: {emailAddressSend: emailAddressString, messageSend: emailMessageString},
      cache: false,
      success: function(toAddress){
      alert ("Email to " + toAddress.toString() + " has been sent successfully")
      }
    });
  } else {
    alert ("This email address is not valid\nPlease enter it again")
  }
}


//------------------------------------------------------------------------------------
//------------------------- SEND SMS -------------------------------------------------


function sendTextMessage() {

	var pN = document.smsForm.phoneNumber
	var msg = document.smsForm.message
	var cr = document.smsForm.carrier

  var phoneNumber = pN.value
  var message = " " + msg.value
  var carrier = cr.value

  var emailAddress

switch (carrier)
{
case 'US-T':
	// T-Mobile
	emailAddress = String(phoneNumber) + "@tmomail.net"
  alert("Sending message over T-Mobile")
  break;
case 'US-Vi':
	// Virgin Mobile
	emailAddress = String(phoneNumber) + "@vmobl.com"
    alert("Sending message over Virgin Mobile")
  break;
 case 'US-C':
 	// Cingular
 	emailAddress = String(phoneNumber) + "@tcingularme.com"
    alert("Sending message over Cingular")
  break;
 case 'US-S':
 	// Sprint
 	emailAddress = String(phoneNumber) + "@messaging.sprintpcs.com"
    alert("Sending message over Sprint")
	 break;
  case 'US-Ve':
 	// Verizon
 	emailAddress = String(phoneNumber) + "@vtext.com"
    alert("Sending message over Verizone")
  break;
 case 'US-N':
 	// NexTel
 	emailAddress = String(phoneNumber) + "@messaging.nextel.com"
    alert("Sending message over NexTel")
  break;
   case 'DE-V':
  // Vodafone Germany
  emailAddress = phoneNumber.toString() + "@vodafone-sms.de"
    alert("Sending message over Vodafone Germany")
  break;
default:
  alert("No carrier has been selected")
  break;
}

  sendTestEmail (emailAddress, message)

}

//----------------------------------------------------------------------
//--------------- beautify DNS and MX records --------------------------


function beautifyRecords (stringResponse) {

  stringResponse1 = stringResponse.replace(/\"/g, "")
  stringResponse1a = stringResponse1.replace(/,/g, "")
  stringResponse1b = stringResponse1a.replace(/\\/g, "")
  stringResponse2 = stringResponse1b.replace(/\[/g, "")
  stringResponse3 = stringResponse2.replace(/\]/g, "")
  stringResponse4 = stringResponse3.replace(/\{/g, "<br>")
  stringResponse5 = stringResponse4.replace(/\}/g, "</br>")
  stringResponse6 = stringResponse5.replace(/host/g, "<span style ='text-decoration: underline'>host</span>")

  return stringResponse6 + "<br>"

}