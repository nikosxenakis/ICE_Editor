function LValueDialogMenu(){

	var title = "Left Value";
	
	this.basicDialogMenu = new BasicDialogMenu(title,DialogMenuData.lValueDialogMenuWidth);

	this.lValue = new LValue(this.basicDialogMenu);

	$( this.basicDialogMenu.getNextButton() ).mousedown(function() {
		var active = DialogMenuController.getActive();

		active.submit();
	
        DialogMenuController.close(true);
	});

	return this;
};

LValueDialogMenu.prototype.init = function(){
	this.input = this.object.input;
	this.lValue.init(this.object.input);
};

LValueDialogMenu.prototype.open = function(object){

	this.object = object;

	this.basicDialogMenu.show();
	
	this.init();

};

LValueDialogMenu.prototype.close = function(){

	this.basicDialogMenu.hide();

	this.object = null;
};

LValueDialogMenu.prototype.submit = function(){

	if( $(this.lValue.chooseTypeDropdownA).text() == "local variable"){
		this.input.setText($(this.lValue.localVariableInput).val());
		this.input.setType(InputType.localId);
	}
	else if( $(this.lValue.chooseTypeDropdownA).text() == "global variable"){

	}
	else if( $(this.lValue.chooseTypeDropdownA).text() == "array element"){

	}
	else if( $(this.lValue.chooseTypeDropdownA).text() == "object element"){

	}
	else{
		console.error('error in LValueDialogMenu submit');
	}
	console.log(this.input);
};

