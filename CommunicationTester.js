//-------------------------------------------------------------------------------------
//----------------------- EMAIL SYNTAX AND CHARACTER CHECK ----------------------------

function checkCharacters (emailAddress) {

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
	if (checkCharacters(email.value)==false){
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
//----------------------- MX LLOKUP ---------------------------------------------------

function mx_lookup (domainName) {

  alert(domainName)

   $.ajax({
        type: "POST",
        url: "lookup_dns.php",
        data: {domainString: domainName.toString()}, 
        cache: false,

        success: function(response){
            $('#mxRecordExists').append(print_r(response));

        }
    });
}


//-------------------------------------------------------------------------------------
//----------------------- RECORDS ---------------------------------------------------


function dns_record (domainName) {

    dn = domainName.value
    alert("Looking up the DNS record for "+ dn)


   $.ajax({
        type: "POST",
        url: "dns_record_lookup.php",
        data: {domainString: dn}, 
        cache: false,

        success: function(response){
          for (i=0;i<response.length;i++)
          {
            document.write(response[i] + "<br >");
          }
        }
    });
}

function mx_record (domainName) {

    dn = domainName.value
    alert("Looking up the MX Record for " + dn)

   $.ajax({
        type: "POST",
        url: "mx_record_lookup.php",
        data: {domainString: dn}, 
        cache: false,

        success: function(response){
          for (i=0;i<response.length;i++)
          {
            document.write(response[i] + "<br >");
          }
        }
    });
}

//------------------------------------------------------------------------------------
//--------------------------- SEND EMAIL ---------------------------------------------


function sendTestEmail(toAddress, message) {

    emailAddress = toAddress.value
    msg = message.value

    sendEmail (emailAddress, msg)

}

function sendEmail (emailAddress, emailMessage) {

    var alertText = "Sending the email to :" + emailAddress.toString() + ", message: " + emailMessage.toString()
    alert(alertText)

        $.ajax({
            type: "POST",
            url: "sendEmail.php",
            data: {emailAddress: emailAddress.toString(), message: message.toString()},
            cache: false,
            success: function(result){
                alert ("Email to " + result + " has been sent successfully")
            }
        });

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

$('#emailAddressSMS').html(emailAddress);
$('#textSMS').html(message);

  sendEmail (emailAddress, message)

}