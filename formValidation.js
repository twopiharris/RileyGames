//Form validate function for quizzes

function validate(formID) {
	var form = document.getElementById(formID);
	var children = Array();
	var fieldset;
	
	var n = -1;
	for (var i = 0; i < form.childNodes.length; i++) {
		if (form.childNodes.item(i).tagName == "FIELDSET") {
			fieldset = form.childNodes.item(i);
		}
	}
	
	for (i = 0; i < fieldset.childNodes.length; i++) {
		//search through all of the form elements
		var child = fieldset.childNodes.item(i);
		if (child.tagName == "INPUT" && child.type == "radio") {
			//find the radio buttons and group them
			if (child.value == "A") {
				n++;
				var q = Array();
				children.push(q);
			} //end if
			children[n].push(child);
		} //end if
	} //end for
	
	var valid = true;
	var groupUsed = false;
	for(i = 0; i < children.length; i++) {
		//run through all of the radio button groups
		groupUsed = false;
		for(n = 0; n < children[i].length; n++) {
			//check to see if the group is used
			if (children[i][n].checked) {
				groupUsed = true;
			} //end if
		} //end for
		if (groupUsed == false) {
			valid = false;
		} //end if
	} //end for
	
	if (valid) {
		form.submit();
		console.log("Valid");
	} //end if
	else {
		window.alert("You must answer all of the questions to continue.")
		console.log("INVALID");
	} //end else
} //end validate