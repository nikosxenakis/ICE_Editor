function ExpressionDialogMenu(){

	var id = "expressionDialogMenu";
	var title = "Expression";

	DialogMenuController.createBasicDialogMenu(this,id,title,DialogMenuData.logicExpressionContentDialogMenuWidth);

	this.chooseMenu = createHtmlElement({
		format: "div",
		father: this.dialogBody
	});

	this.radioForm = createHtmlElement({
		format: "form",
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

	this.arrayExpression = new ArrayExpression("expressionArray",this.arrayMenu);

	this.termMenu = createHtmlElement({
		format: "div",
		father: this.dialogBody
	});

	DialogMenuController.createTermDiv(this,"TermDiv",this.termMenu);

	this.variableMenu = createHtmlElement({
		format: "div",
		father: this.dialogBody
	});

	DialogMenuController.createLvalueDiv(this,"TermVariableDiv",this.variableMenu);

	this.constantMenu = createHtmlElement({
		format: "div",
		father: this.dialogBody
	});

	DialogMenuController.createConstantDiv(this,"ConstantDiv",this.constantMenu);

	//hide all
	$(this.chooseMenu).hide();
	$(this.arrayMenu).hide();
	$(this.termMenu).hide();
	$(this.variableMenu).hide();
	$(this.constantMenu).hide();

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
				$(active.termMenu).show();
				//$(active.dialogTitle).text("Term");
			}
			else if( $(active.radioButtonArray).children('input[type=radio]').prop("checked") == true ){
				$(active.arrayMenu).show();
				//$(active.dialogTitle).text("Initialize Array");
				input.setType(InputType.expressionArray);
				$(active.buttonNext).text('Submit');
			}

			else{
				console.log('menu in chooseMenu not implemented');
			}


			$(active.chooseMenu).hide();
			$(active.buttonBack).show();
		}
		else if( $(active.arrayMenu).is(":visible") == true ){
			
			active.input.setType(InputType.expressionArray);
			active.input.setText(active.arrayExpression.toString());
			
			active.input.inputElements = new Array();
			active.arrayExpression.getInputElements(active.input.inputElements);

	        DialogMenuController.close(true);
		
		}
		else if( $(active.termMenu).is(":visible") == true ){
			var active = DialogMenuController.getActive();
			var input = active.input;
			var inputType = input.type;
			$(active.buttonNext).text('Submit');

			if( $(active.termRadioButtonVariable).children('input[type=radio]').prop("checked") == true ){
				$(active.variableMenu).show();
			}
			else if( $(active.termRadioButtonConstant).children('input[type=radio]').prop("checked") == true ){
				$(active.constantMenu).show();
			}
			else{
				console.log('not implemented');
			}

			$(active.buttonBack).show();
			$(active.chooseMenu).hide();
			$(active.arrayMenu).hide();
			$(active.termMenu).hide();
		}
		else if( $(active.variableMenu).is(":visible") == true ){
			var outputText = $(active.dialogTextInput).val();
			var outputSubText = $(active.dialogSubTextInput).val();
			
			if( $(active.radioVariable).children('input[type=radio]').prop("checked") == true ){
				active.input.setType(InputType.expressionTermLvalueID);
				active.input.setText(outputText);
			}
			else if( $(active.radioGlobalVariable).children('input[type=radio]').prop("checked") == true ){
				active.input.setType(InputType.expressionTermLvalueGlobalID);
				active.input.setText("global "+outputText);
			}
			else if( $(active.radioArrayElement).children('input[type=radio]').prop("checked") == true ){
				active.input.setType(InputType.expressionTermLvalueArrayElement);
				active.input.setText(outputText+"["+outputSubText+"]");
			}
			else if( $(active.radioObjectElement).children('input[type=radio]').prop("checked") == true ){
				active.input.setType(InputType.expressionTermLvalueObjectElement);
				active.input.setText(outputText+"."+outputSubText);
			}
			else{
				console.log('Wrong input type');
			}

	        DialogMenuController.close(true);
		}
		else if( $(active.constantMenu).is(":visible") == true ){
			var outputText = $(active.constantTextInput).val();
			
			if( $(active.constantRadioNumber).children('input[type=radio]').prop("checked") == true ){
				active.input.setType(InputType.expressionTermConstNumber);
				active.input.setText(outputText);
			}
			else if( $(active.constantRadioText).children('input[type=radio]').prop("checked") == true ){
				active.input.setType(InputType.expressionTermConstString);
				active.input.setText("\""+outputText+"\"");
			}
			else{
				console.log('Wrong input type');
			}

	        DialogMenuController.close(true);
		}
	});

	$(this.buttonBack).mousedown(function() {
		var active = DialogMenuController.getActive();
		
		if( $(active.arrayMenu).is(":visible") == true ){
			//$(active.dialogTitle).text("Choose Expression Content");
			$(active.buttonNext).text('Next');
			$(active.buttonBack).hide();
			$(active.chooseMenu).show();
			$(active.arrayMenu).hide();
			$(active.termMenu).hide();
			$(active.variableMenu).hide();
			$(active.constantMenu).hide();
		}
		else if( $(active.termMenu).is(":visible") == true ){
			//$(active.dialogTitle).text("Choose Expression Content");
			$(active.buttonNext).text('Next');
			$(active.buttonBack).hide();
			$(active.chooseMenu).show();
			$(active.arrayMenu).hide();
			$(active.termMenu).hide();
			$(active.variableMenu).hide();
			$(active.constantMenu).hide();
		}
		else if( $(active.variableMenu).is(":visible") == true ){
			//$(active.dialogTitle).text("Term");
			$(active.buttonNext).text('Next');
			$(active.buttonBack).show();
			$(active.chooseMenu).hide();
			$(active.arrayMenu).hide();
			$(active.termMenu).show();
			$(active.variableMenu).hide();
			$(active.constantMenu).hide();
   			$(this.termRadioButtonVariable).children('input[type=radio]').prop("checked", true);
		}
		else if( $(active.constantMenu).is(":visible") == true ){
			//$(active.dialogTitle).text("Term");
			$(active.buttonNext).text('Next');
			$(active.buttonBack).show();
			$(active.chooseMenu).hide();
			$(active.arrayMenu).hide();
			$(active.termMenu).show();
			$(active.variableMenu).hide();
			$(active.constantMenu).hide();
   			$(this.termRadioButtonConstant).children('input[type=radio]').prop("checked", true);
		}


	});

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

		if( $(active.constantRadioNumber).children('input[type=radio]').prop("checked") == true ){
			if(!isNaN(outputText)){
	    		$(active.buttonNext).attr("disabled", false);
			}
			else{
	    		$(active.buttonNext).attr("disabled", true);
			}
		}
		else if( $(active.constantRadioText).children('input[type=radio]').prop("checked") == true ){
			if(outputText!= ""){
				$(active.buttonNext).attr("disabled", false);
			}
			else{
	    		$(active.buttonNext).attr("disabled", true);
			}
		}
	});
	
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
		$(this.buttonBack).hide();
		$(this.termMenu).hide();
		$(this.variableMenu).hide();
		$(this.constantMenu).hide();
		$(this.buttonNext).text('Next');

   		$(this.radioButtonArithmeticExpression).children('input[type=radio]').prop("checked", true);
   		$(this.termRadioButtonVariable).children('input[type=radio]').prop("checked", true);
   		$(this.radioVariable).children('input[type=radio]').prop("checked", true);
   		$(this.constantRadioNumber).children('input[type=radio]').prop("checked", true);

	}
	else if(inputType == InputType.expressionArray){
		$(this.chooseMenu).hide();
		$(this.arrayMenu).show();
		$(this.buttonBack).show();
		$(this.termMenu).hide();
		$(this.variableMenu).hide();
		$(this.constantMenu).hide();
		$(this.buttonNext).text('Submit');

		var expr = jsep(text);
		if(expr.type != "ArrayExpression"){
			console.log('wrong input');
			return;
		}

		console.log(expr);
		this.arrayExpression.parseArrayExpression(expr,this.input.inputElements);

	}
	else if(inputType == InputType.expressionTermLvalueID){
		$(this.chooseMenu).hide();
		$(this.arrayMenu).hide();
		$(this.buttonBack).show();
		$(this.termMenu).hide();
		$(this.variableMenu).show();
		$(this.constantMenu).hide();
		$(this.buttonNext).text('Submit');

    	$(this.dialogTextInput).val(text);

		$(this.radioButtonTerm).children('input[type=radio]').prop("checked", true);
   		$(this.termRadioButtonVariable).children('input[type=radio]').prop("checked", true);
   		$(this.radioVariable).children('input[type=radio]').prop("checked", true);
	}
	else if(inputType == InputType.expressionTermLvalueGlobalID){
		$(this.chooseMenu).hide();
		$(this.arrayMenu).hide();
		$(this.buttonBack).show();
		$(this.termMenu).hide();
		$(this.variableMenu).show();
		$(this.constantMenu).hide();
		$(this.buttonNext).text('Submit');

    	var global = text.substring(0, 5);
    	var varName = text.substring(6, text.length);
    	$(this.dialogTextInput).val(varName);

		$(this.radioButtonTerm).children('input[type=radio]').prop("checked", true);
   		$(this.termRadioButtonVariable).children('input[type=radio]').prop("checked", true);
   		$(this.radioGlobalVariable).children('input[type=radio]').prop("checked", true);
	}
	else if(inputType == InputType.expressionTermLvalueArrayElement){
		$(this.chooseMenu).hide();
		$(this.arrayMenu).hide();
		$(this.buttonBack).show();
		$(this.termMenu).hide();
		$(this.variableMenu).show();
		$(this.constantMenu).hide();
		$(this.buttonNext).text('Submit');

    	var arrayNumStart = text.indexOf("[");
    	var arrayNumStop = text.indexOf("]");

    	var arrayName = text.substring(0, arrayNumStart);
    	var arrayNum = text.substring(arrayNumStart+1, arrayNumStop);

    	$(this.dialogTextInput).val(arrayName);
    	$(this.dialogSubTextInput).val(arrayNum);

		$(this.radioButtonTerm).children('input[type=radio]').prop("checked", true);
   		$(this.termRadioButtonVariable).children('input[type=radio]').prop("checked", true);
   		$(this.radioArrayElement).children('input[type=radio]').prop("checked", true);
	}
	else if(inputType == InputType.expressionTermLvalueObjectElement){
		$(this.chooseMenu).hide();
		$(this.arrayMenu).hide();
		$(this.buttonBack).show();
		$(this.termMenu).hide();
		$(this.variableMenu).show();
		$(this.constantMenu).hide();
		$(this.buttonNext).text('Submit');

    	var elementStart = text.indexOf(".");

    	var objectName = text.substring(0, elementStart);
    	var element = text.substring(elementStart+1, text.length);

    	$(this.dialogTextInput).val(objectName);
    	$(this.dialogSubTextInput).val(element);
	
		$(this.radioButtonTerm).children('input[type=radio]').prop("checked", true);
   		$(this.termRadioButtonVariable).children('input[type=radio]').prop("checked", true);
   		$(this.radioObjectElement).children('input[type=radio]').prop("checked", true);
	}
	else if(inputType == InputType.expressionTermConstNumber){
		$(this.chooseMenu).hide();
		$(this.arrayMenu).hide();
		$(this.buttonBack).show();
		$(this.termMenu).hide();
		$(this.variableMenu).hide();
		$(this.constantMenu).show();
		$(this.buttonNext).text('Submit');

    	$(this.constantRadioText).val(text);
	
		$(this.radioButtonTerm).children('input[type=radio]').prop("checked", true);
   		$(this.termRadioButtonConstant).children('input[type=radio]').prop("checked", true);
   		$(this.radioVariable).children('input[type=radio]').prop("checked", true);
	}
	else if(inputType == InputType.expressionTermConstString){
		$(this.chooseMenu).hide();
		$(this.arrayMenu).hide();
		$(this.buttonBack).show();
		$(this.termMenu).hide();
		$(this.variableMenu).hide();
		$(this.constantMenu).show();
		$(this.buttonNext).text('Submit');

    	$(this.constantRadioText).val(text.substring(1,text.length-1));
	
		$(this.radioButtonTerm).children('input[type=radio]').prop("checked", true);
   		$(this.termRadioButtonConstant).children('input[type=radio]').prop("checked", true);
   		$(this.radioVariable).children('input[type=radio]').prop("checked", true);
	}
	else{
		console.log('Wrong input type');
	}

};

ExpressionDialogMenu.prototype.init = function(){

	if(this.arrayExpression){
		$(this.arrayExpression.arrayExpressionDiv).remove();
	}

	this.arrayExpression = new ArrayExpression("expressionArray",this.arrayMenu);

};

ExpressionDialogMenu.prototype.open = function(object){

	this.object = object;
	this.input = object.input;

	this.init();

	this.initExpressionDialogMenu();

    $(this.dialogMenuDiv).css('display', "block");	
};

ExpressionDialogMenu.prototype.close = function(){
    $(this.dialogMenuDiv).css('display', "none");

	this.object = null;
	this.input = null;
};

