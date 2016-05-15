function ExpressionTermDialogMenu(){
	var id = "expressionTermDialogMenu";
	var title = "Choose Expression Term Content";
	return;
	//DialogMenuController.createBasicDialogMenu(this,id,title,DialogMenuData.logicExpressionContentDialogMenuWidth);

	this.chooseMenu = createHtmlElement({
		format: "div",
		father: this.dialogBody
	});

	DialogMenuController.createTermDiv(this,id+"TermDiv",this.chooseMenu);

	return this;
};

ExpressionTermDialogMenu.prototype.initExpressionTermDialogMenu = function(){

	var inputType = this.input.type;
	var text = this.input.getText();
    console.log(text);
    //$(this.dialogTextInput).val(text);
	$(this.buttonNext).text('Next');
	$(this.buttonNext).attr("disabled", false);

	if(inputType == InputType.expressionTerm){
		$(this.chooseMenu).show();
		$(this.termRadioButtonVariable).children('input[type=radio]').prop("checked", true);

	}
	else if(inputType == InputType.expressionTermLocalVariable){
		$(this.chooseMenu).hide();
		$(this.termRadioButtonVariable).children('input[type=radio]').prop("checked", true);

	}
	else if(inputType == InputType.expressionTermGlobalVariable){
		$(this.chooseMenu).hide();
		$(this.termRadioButtonVariable).children('input[type=radio]').prop("checked", true);

	}
	else if(inputType == InputType.expressionTermArrayElement){
		$(this.chooseMenu).hide();
		$(this.termRadioButtonVariable).children('input[type=radio]').prop("checked", true);

	}
	else if(inputType == InputType.expressionTermObjectElement){
		$(this.chooseMenu).hide();
		$(this.termRadioButtonVariable).children('input[type=radio]').prop("checked", true);

	}
	else if(inputType == InputType.expressionTermConstantNumber){
		$(this.chooseMenu).hide();
		$(this.termRadioButtonConstant).children('input[type=radio]').prop("checked", true);

	}
	else if(inputType == InputType.expressionTermConstantText){
		$(this.chooseMenu).hide();
		$(this.termRadioButtonConstant).children('input[type=radio]').prop("checked", true);

	}
	else if(inputType == InputType.expressionTermConstantBool){
		$(this.chooseMenu).hide();
		$(this.termRadioButtonConstant).children('input[type=radio]').prop("checked", true);

	}
	else if(inputType == InputType.expressionTermConstantDate){
		$(this.chooseMenu).hide();
		$(this.termRadioButtonConstant).children('input[type=radio]').prop("checked", true);

	}
	else if(inputType == InputType.expressionTermConstantTime){
		$(this.chooseMenu).hide();
		$(this.termRadioButtonConstant).children('input[type=radio]').prop("checked", true);

	}
	else if(inputType == InputType.expressionTermFunctionCall){
		$(this.chooseMenu).hide();
		$(this.termRadioButtonFunctionCall).children('input[type=radio]').prop("checked", true);

	}
	else if(inputType == InputType.expressionTermMethodCall){
		$(this.chooseMenu).hide();
		$(this.termRadioButtonObjectMethod).children('input[type=radio]').prop("checked", true);

	}
	else{
		console.log('Wrong input type');
	}
   
};

ExpressionTermDialogMenu.prototype.open = function(object){

	this.object = object;
	this.input = object.input;

	this.initExpressionTermDialogMenu();

    $(this.dialogMenuDiv).css('display', "block");	
};

ExpressionTermDialogMenu.prototype.close = function(){
    $(this.dialogMenuDiv).css('display', "none");

	this.object = null;
	this.input = null;
};

