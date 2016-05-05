function ExpressionDialogMenu(){

	var id = "expressionDialogMenu";
	var title = "Choose Expression Content";

	DialogMenuController.createBasicDialogMenu(this,id,title,DialogMenuData.logicExpressionContentDialogMenuWidth);

	this.chooseMenu = createHtmlElement({
		format: "div",
		father: this.dialogBody
	});

	this.radioForm = createHtmlElement({
		format: "form",
		border: "groove",
		id: "radioForm",
		father: this.chooseMenu
	});

	$(this.radioForm).css('padding-left', '110px');
	$(this.radioForm).css('margin-bottom', '20px');

	this.radioButtonArithmeticExpression = createRadioHtmlElement({
		id: "radioButtonArithmeticExpression",
		text: "arithmetic expression",
		name: 'type',
		father: this.radioForm
	});
	
	this.radioButtonLogicExpression = createRadioHtmlElement({
		id: "radioButtonLogicExpression",
		text: "logic expression",
		name: 'type',
		father: this.radioForm
	});
	
	this.radioButtonTerm = createRadioHtmlElement({
		id: "radioButtonTerm",
		text: "term",
		name: 'type',
		father: this.radioForm
	});

	this.radioButtonArray = createRadioHtmlElement({
		id: "radioButtonArray",
		text: "array",
		name: 'type',
		father: this.radioForm
	});


	this.arrayMenu = createHtmlElement({
		format: "div",
		father: this.dialogBody
	});

	DialogMenuController.createArrayDiv(this,"arrayMenu",this.arrayMenu);

	//hide all
	$(this.chooseMenu).hide();
	$(this.arrayMenu).hide();

	$(this.buttonBack).attr("disabled", false);
	$(this.buttonNext).attr("disabled", false);
	$(this.buttonNext).text('Next');

	$(this.buttonNext).mousedown(function() {
		var active = DialogMenuController.getActive();
		var input = active.input;
		var inputType = input.type;

		if( $(active.chooseMenu).is(":visible") == true ){

			if( $(active.radioButtonArithmeticExpression).children('input[type=radio]').prop("checked") == true ){
			}
			else if( $(active.radioButtonLogicExpression).children('input[type=radio]').prop("checked") == true ){
			}
			else if( $(active.radioButtonTerm).children('input[type=radio]').prop("checked") == true ){
			}
			else if( $(active.radioButtonArray).children('input[type=radio]').prop("checked") == true ){
				$(active.arrayMenu).show();
				$(active.dialogTitle).text("Initialize Array");
				input.setType(InputType.expressionArray);
			}

			else{
				console.log('menu in chooseMenu not implemented');
			}


			$(active.chooseMenu).hide();
			$(active.buttonBack).show();
			$(active.buttonNext).text('Submit');
		}
		else if( $(active.arrayMenu).is(":visible") == true ){

	        DialogMenuController.close(true);
		
		}
	});

	$(this.buttonBack).mousedown(function() {
		var active = DialogMenuController.getActive();
		$(active.dialogTitle).text("Choose Expression Content");

		$(active.buttonBack).hide();

		$(active.chooseMenu).show();
		$(active.arrayMenu).hide();
	});


	/*

	$(this.radioVariable).mousedown(function(){
		var active = DialogMenuController.getActive();
		$(active.buttonNext).attr("disabled", true);
    	$(active.dialogSubTextInput).hide();
		active.input.setType(InputType.logicExpressionTermLocalVariable);
    	$(active.dialogTextInput).css('margin-top', 30);
    	$(active.dialogTextInput).val("");
    	$(active.dialogTextInput).attr("placeholder" , "variable name");
    });

    $(this.radioGlobalVariable).mousedown(function(){
		var active = DialogMenuController.getActive();
		$(active.buttonNext).attr("disabled", true);
    	$(active.dialogSubTextInput).hide();
		active.input.setType(InputType.logicExpressionTermGlobalVariable);
    	$(active.dialogTextInput).css('margin-top', 30);
    	$(active.dialogTextInput).val("");
    	$(active.dialogTextInput).attr("placeholder" , "global variable name");
    });

	$(this.radioArrayElement).mousedown(function(){
    	var active = DialogMenuController.getActive();
		$(active.buttonNext).attr("disabled", true);
    	$(active.dialogSubTextInput).show();
		active.input.setType(InputType.logicExpressionTermArrayElement);
		$(active.dialogTextInput).css('margin-top', 10);
		$(active.dialogTextInput).val("");
    	$(active.dialogSubTextInput).val("");
    	$(active.dialogTextInput).attr("placeholder" , "array name");
    	$(active.dialogSubTextInput).attr("placeholder" , "element's position");
    });

    $(this.radioObjectElement).mousedown(function(){
    	var active = DialogMenuController.getActive();
		$(active.buttonNext).attr("disabled", true);
    	$(active.dialogSubTextInput).show();
		active.input.setType(InputType.logicExpressionTermObjectElement);
    	$(active.dialogTextInput).css('margin-top', 10);
		$(active.dialogTextInput).val("");
    	$(active.dialogSubTextInput).val("");
       	$(active.dialogTextInput).attr("placeholder" , "object name");
    	$(active.dialogSubTextInput).attr("placeholder" , "element's name");
    });

    $(this.constantRadioNumber).mousedown(function(){
    	var active = DialogMenuController.getActive();
		$(active.buttonNext).attr("disabled", true);
		active.input.setType(InputType.logicExpressionTermConstantNumber);
		$(active.constantTextInput).val("");
       	$(active.constantTextInput).attr("placeholder" , "constant number");
    });

    $(this.constantRadioText).mousedown(function(){
    	var active = DialogMenuController.getActive();
		$(active.buttonNext).attr("disabled", true);
		active.input.setType(InputType.logicExpressionTermConstantText);
		$(active.constantTextInput).val("");
       	$(active.constantTextInput).attr("placeholder" , "constant text");
    });

	$(this.dialogTextInput).on("input",function() {
		var active = DialogMenuController.getActive();
		var outputText = $(active.dialogTextInput).val();
		var outputSubText = $(active.dialogSubTextInput).val();
		var inputType = active.input.type;

		
		if( $(active.dialogSubTextInput).is(":visible") ){
			if(outputSubText!="" && outputText!=""){
				if(inputType == InputType.logicExpressionTermArrayElement){
					if(!isNaN(outputSubText)){
	    				$(active.buttonNext).attr("disabled", false);
					}
					else{
	    				$(active.buttonNext).attr("disabled", true);
					}
				}else{
	    			$(active.buttonNext).attr("disabled", false);
				}
			}
			else{
	    		$(active.buttonNext).attr("disabled", true);
			}
		}
		else{
			if(outputText!=""){
	    		$(active.buttonNext).attr("disabled", false);
			}
			else{
	    		$(active.buttonNext).attr("disabled", true);
			}
		}
	});

	$(this.dialogSubTextInput).on("input",function() {
		var active = DialogMenuController.getActive();
		var outputText = $(active.dialogTextInput).val();
		var outputSubText = $(active.dialogSubTextInput).val();
		var inputType = active.input.type;

		if( $(active.dialogSubTextInput).is(":visible") ){
			if(outputSubText!="" && outputText!=""){
				if(inputType == InputType.logicExpressionTermArrayElement){
					if(!isNaN(outputSubText)){
	    				$(active.buttonNext).attr("disabled", false);
					}
					else{
	    				$(active.buttonNext).attr("disabled", true);
					}
				}else{
	    			$(active.buttonNext).attr("disabled", false);
				}
			}
			else{
	    		$(active.buttonNext).attr("disabled", true);
			}
		}
		else{
			if(outputText!=""){
	    		$(active.buttonNext).attr("disabled", false);
			}
			else{
	    		$(active.buttonNext).attr("disabled", true);
			}
		}
	});

	$(this.constantTextInput).on("input",function() {
		var active = DialogMenuController.getActive();
		var outputText = $(active.constantTextInput).val();
		var inputType = active.input.type;

		if(inputType == InputType.logicExpressionTermConstantNumber){
			if(!isNaN(outputText)){
	    		$(active.buttonNext).attr("disabled", false);
			}
			else{
	    		$(active.buttonNext).attr("disabled", true);
			}
		}
		else if(inputType == InputType.logicExpressionTermConstantText){
			if(outputText!= ""){
				$(active.buttonNext).attr("disabled", false);
			}
			else{
	    		$(active.buttonNext).attr("disabled", true);
			}

		}
	});
	*/
	return this;
};

ExpressionDialogMenu.prototype.initExpressionDialogMenu = function(){

	var inputType = this.input.type;
	var text = this.input.getText();
    console.log(text);
    //$(this.dialogTextInput).val(text);
    
	if(inputType == InputType.expression){
		$(this.chooseMenu).show();
		$(this.arrayMenu).hide();

   		$(this.radioButtonArithmeticExpression).children('input[type=radio]').prop("checked", true);
	}
	else if(inputType == InputType.expressionArray){
		$(this.chooseMenu).hide();
		$(this.arrayMenu).show();

	}
	else{
		console.log('Wrong input type');
	}

};

ExpressionDialogMenu.prototype.open = function(object){

	this.object = object;
	this.input = object.input;

	this.initExpressionDialogMenu();

    $(this.dialogMenuDiv).css('display', "block");	
};

ExpressionDialogMenu.prototype.close = function(){
    $(this.dialogMenuDiv).css('display', "none");

	this.object = null;
	this.input = null;
};

