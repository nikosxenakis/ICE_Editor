function LValueDialogMenu(){

	var title = "Add Value";
	
	this.basicDialogMenu = new BasicDialogMenu(title,DialogMenuData.logicExpressionContentDialogMenuWidth);

	this.lValue = new LValue(this.basicDialogMenu);

	return this;
};

LValueDialogMenu.prototype.open = function(object){

	var inputType = DialogMenuController.getInput().type;
	var inputText = DialogMenuController.getInput().input;
	
	this.input = new InputElement(inputText,inputType)

	this.lValue.init(this.input);
};

LValueDialogMenu.prototype.close = function(){
	console.log('close LValueDialogMenu');
};

LValueDialogMenu.prototype.submit = function(){

	if( $(this.lValue.variableDiv).is(":visible") == true ){
		this.input.setText($(this.lValue.variableInput).val());
		this.input.setType(InputType.localId);
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

