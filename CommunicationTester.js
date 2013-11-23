//SYNTAX CHECK

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


//--------------------------------------------------------------------------------------
//----------------------- MX LLOKUP ---------------------------------------------------

function mx_lookup (domainName) {

  alert(domainName)

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


function dns_record (domainName) {

    dn = domainName.value
    alert("Looking up the DNS record for "+ dn)


   $.ajax({
        type: "POST",
        url: "dns_record_lookup.php",
        data: {domainString: dn}, 
        cache: false,

        success: function(response){
            $('#record').html(response);

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
            $('#record').html(response);

        }
    });
}





//------------------------------------------------------------------------------------
//--------------------------- SEND EMAIL ---------------------------------------------


function sendEmail(toAddress, message) {

    to = toAddress.value
        msg = message.value

    var link = "mailto:" + to
             + "&body=" + escape(msg);

    alert("Sending the following email: " + link)

    window.location.href = link;
    alert ("Email to " + to + " has been sent successfully")
    return true

}


//------------------------------------------------------------------------------------
//------------------------- SEND SMS -------------------------------------------------


function sendTextMessage() {

	var pN = document.smsForm.phoneNumber
		var msg = document.smsForm.message
			var cr = document.smsForm.carrier

      var phoneNumber = pN.value
      var message = msg.value
      var carrier = cr.value


alert(carrier)

switch (carrier)
{
case 'T':
	// T-Mobile
	var emailAddress = String(phoneNumber.value) + "@tmomail.net"
  alert("Sending message over T-Mobile")
  break;
case 2:
	// Virgin Mobile
	var emailAddress = String(phoneNumber.value) + "@vmobl.com"
    alert("Sending message over Virgin Mobile")
  break;
 case 3:
 	// Cingular
 	var emailAddress = String(phoneNumber.value) + "@tcingularme.com"
    alert("Sending message over Cingular")
  break;
 case 4:
 	// Sprint
 	var emailAddress = String(phoneNumber.value) + "@messaging.sprintpcs.com"
    alert("Sending message over Sprint")
	 break;
  case 5:
 	// Verizon
 	var emailAddress = String(phoneNumber.value) + "@vtext.com"
    alert("Sending message over Verizone")
  break;
 case 6:
 	// NexTel
 	var emailAddress = String(phoneNumber.value) + "@messaging.nextel.com"
    alert("Sending message over NexTel")
  break;
   case 'DE-V':
  // Vodafone Germany
  var emailAddress = String(phoneNumber.value) + "@vodafone-sms.de"
    alert("Sending message over Vodafone Germany")
  break;
default:
  alert("No carrier has been selected")
  break;

  if (sendEmail (emailAddress, message)) {

 alert ("I have successfully sent the message to " + emailAddress)

 } else {

 	alert("There has been a problem and I could not send the message.")
 }

}

}



 


