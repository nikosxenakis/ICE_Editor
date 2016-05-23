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
};

