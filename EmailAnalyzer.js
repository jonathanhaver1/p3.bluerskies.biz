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

	alert (emailString)

	// extract domain
	var domain = emailString.replace(/.*@/, "")
	$( "#domain" ).append( $( domain ) );

 }


//--------------------------------------------------------------------------------------
//----------------------- MX LLOKUP ---------------------------------------------------

function mx_lookup () {

  var domainName = document.mxForm.domainName

  alert (domainName.value)
	
    $.ajax({
        type: 'post',
        url: 'lookup_dns.php',
        success: function(response) { 

            alert(response);
        },
        data: {
            domain: domainName.value,
        },
    });
};


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



 


