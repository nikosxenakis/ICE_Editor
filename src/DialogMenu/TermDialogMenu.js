function TermDialogMenu(){

	var title = "Term";
	
	this.basicDialogMenu = new BasicDialogMenu(title,DialogMenuData.lValueDialogMenuWidth);

	this.term = new Term(this.basicDialogMenu);

	$( this.basicDialogMenu.getNextButton() ).mousedown(function() {
		var active = DialogMenuController.getActive();

		active.submit();
	
        DialogMenuController.close(true);
	});

	return this;
};

TermDialogMenu.prototype.init = function(){
	this.input = this.object.input;
	this.term.init(this.object.input);
};

TermDialogMenu.prototype.open = function(object){

	this.object = object;

	this.basicDialogMenu.show();
	
	this.init();

};

TermDialogMenu.prototype.close = function(){

	this.basicDialogMenu.hide();

	this.object = null;
};

TermDialogMenu.prototype.submit = function(){

	/*
	if( $(this.lValue.localVariableDiv).is(":visible") == true ){
		this.input.setText($(this.lValue.localVariableInput).val());
		this.input.setType(InputType.localId);
	}
	else if( $(this.lValue.globalVariableDiv).is(":visible") == true ){
		this.input.setText($(this.lValue.globalVariableInput).val());
		this.input.setType(InputType.globalId);
	}
	else if( $(this.lValue.arrayElementDiv).is(":visible") == true ){
		this.input.setText($(this.lValue.arrayElementNameInput).val()+'['+$(this.lValue.arrayElementPositionInput).val()+']');
		this.input.setType(InputType.arrayElement);
	}
	else if( $(this.lValue.objectElementDiv).is(":visible") == true ){
		this.input.setText($(this.lValue.objectNameInput).val()+'.'+$(this.lValue.objectElementNameInput).val());
		this.input.setType(InputType.objectElement);
	}
	else{
		console.error('error in LValueDialogMenu submit');
	}
	console.log(this.input);
	*/
};
