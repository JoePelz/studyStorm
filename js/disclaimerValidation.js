function disclaimerCheckboxValidation(checkboxId, hiddenElementId){

	if($("#" + checkboxId)[0].checked) { 
		$('#' + hiddenElementId).fadeIn('fast');

		// var element = document.getElementById(disclaimerReg);
		// element.setAttribute('display', 'inline');

	}
	else{
		$('#' + hiddenElementId).fadeOut('fast');
	}
}
