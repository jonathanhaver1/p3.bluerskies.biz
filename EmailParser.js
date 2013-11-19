function syntaxCheck(emailAddress) {

    characterTest = /^[\w!#$%&\'*+\-\/=?^`{|}~]+(\.[\w!#$%&\'*+\-\/=?^`{|}~]+)*@[a-z\d]([a-z\d-]*[a-z\d])?(\.[a-z\d]([a-z\d-]*[a-z\d])?)*\.[a-z]{2,6}$/i
    lengthTest = /^(.{1,64})@(.{4,255})$/
    if (characterTest.test(emailAddress) && lengthTest.test(emailAddress)) {
    	return true
    } else {
    	return false
    }
}

function AddressForm(){
	var email=document.emailForm.emailAddress

	if (email.value==null){
		alert ("Please enter an email address")
	}
	if (syntaxCheck(email.value)==false){
    	alert ("This email address is not valid")
	} else {
		alert ("This email address is valid")
	}
 }