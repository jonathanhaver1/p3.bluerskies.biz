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


function sendEmail(toAddress, textMail) {

    var link = "mailto:" + toAddress
             + "&body=" + escape(textMail);

    window.location.href = link;
    alert ("Email to " + toAddress + " has been sent successfully")

}


//------------------------------------------------------------------------------------
//------------------------- SEND SMS -------------------------------------------------


function sendTextMessage() {

	var phoneNumber = document.smsForm.phoneNumber
		var message = document.smsForm.message
			var carrier = document.smsForm.carrier

	alert(phoneNumber.value)
	alert(message.value)
	alert(carrier.value)

var carrierSelection = int ((carrier).value)

switch (carrierSelection)
{
case 1:
	// T-Mobile
	var emailAddress = String(phoneNumber.value) + "@tmomail.net"
  break;
case 2:
	// Virgin Mobile
	var emailAddress = String(phoneNumber.value) + "@vmobl.com" 
  break;
 case 3:
 	// Cingular
 	var emailAddress = String(phoneNumber.value) + "@tcingularme.com"
  break;
 case 4:
 	// Sprint
 	var emailAddress = String(phoneNumber.value) + "@messaging.sprintpcs.com"
	 break;
  case 5:
 	// Verizon
 	var emailAddress = String(phoneNumber.value) + "@vtext.com"
  break;
 case 6:
 	// NexTel
 	var emailAddress = String(phoneNumber.value) + "@messaging.nextel.com"
  break;
default:
  alert("No carrier has been selected")
  break;

  if (sendMail (emailAddress, message.value)) {

 alert ("I have successfully sent the message to " + emailAddress)

 } else {

 	alert("There has been a problem and I could not send the message.")
 }

}

}



 


