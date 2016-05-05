function LogicExpressionTermDialogMenu(){

	var id = "logicExpressionTermDialogMenu";
	var title = "Choose Logic Expression Content";

	DialogMenuController.createBasicDialogMenu(this,id,title,DialogMenuData.logicExpressionContentDialogMenuWidth);

	this.chooseMenu = createHtmlElement({
		format: "div",
		father: this.dialogBody
	});

	this.radioFormVar = createHtmlElement({
		format: "form",
		border: "groove",
		id: "radioForm",
		father: this.chooseMenu
	});

	$(this.radioFormVar).css('padding-left', '110px');
	$(this.radioFormVar).css('margin-bottom', '20px');

	this.radioButtonVariable = createRadioHtmlElement({
		id: "variable",
		text: "variable",
		name: 'type',
		father: this.radioFormVar
	});
	
	this.radioButtonConstant = createRadioHtmlElement({
		id: "constant value",
		text: "constant value",
		name: 'type',
		father: this.radioFormVar
	});

	this.radioFormComparison = createHtmlElement({
		format: "form",
		border: "groove",
		id: "radioForm",
		father: this.chooseMenu
	});

	$(this.radioFormComparison).css('padding-left', '110px');
	$(this.radioFormComparison).css('margin-bottom', '20px');

	this.radioButtonComparison = createRadioHtmlElement({
		id: "comparison",
		text: "comparison",
		name: 'type',
		father: this.radioFormComparison
	});

	this.radioFormCall = createHtmlElement({
		format: "form",
		border: "groove",
		id: "radioForm",
		father: this.chooseMenu
	});

	$(this.radioFormCall).css('padding-left', '110px');

	this.radioButtonFunctionCall = createRadioHtmlElement({
		id: "function call",
		text: "function call",
		name: 'type',
		father: this.radioFormCall
	});
	
	this.radioButtonObjectMethod = createRadioHtmlElement({
		id: "object method",
		text: "object method",
		name: 'type',
		father: this.radioFormCall
	});

	this.variableMenu = createHtmlElement({
		format: "div",
		father: this.dialogBody
	});

	DialogMenuController.createLvalueDiv(this,"variableMenu",this.variableMenu);

	this.constantMenu = createHtmlElement({
		format: "div",
		father: this.dialogBody
	});

	DialogMenuController.createConstantDiv(this,"constantMenu",this.constantMenu);

	this.functionCallMenu = createHtmlElement({
		format: "div",
		father: this.dialogBody
	});

	DialogMenuController.createFunctionCallDiv(this,"functionCallMenu",this.functionCallMenu);

	//hide all
	$(this.chooseMenu).hide();
	$(this.variableMenu).hide();
	$(this.constantMenu).hide();
	$(this.functionCallMenu).hide();

	$(this.buttonBack).attr("disabled", false);
	$(this.buttonNext).attr("disabled", false);
	$(this.buttonNext).text('Next');

	$(this.buttonNext).mousedown(function() {
		var active = DialogMenuController.getActive();
		var input = active.input;
		var inputType = input.type;

		if( $(active.chooseMenu).is(":visible") == true ){

			if( $(active.radioButtonVariable).children('input[type=radio]').prop("checked") == true ){
				$(active.variableMenu).show();
				$(active.radioVariable).children('input[type=radio]').prop("checked", true);
			}
			else if( $(active.radioButtonConstant).children('input[type=radio]').prop("checked") == true ){
				$(active.constantMenu).show();
				$(active.constantRadioNumber).children('input[type=radio]').prop("checked", true);
			}
			else if( $(active.radioButtonFunctionCall).children('input[type=radio]').prop("checked") == true ){
				$(active.functionCallMenu).show();
				$(active.constantRadioNumber).children('input[type=radio]').prop("checked", true);
			}
			else{
				console.log('menu in chooseMenu not implemented');
			}

			input.setType(InputType.logicExpressionTermLocalVariable);

			$(active.chooseMenu).hide();
			$(active.buttonBack).show();
			$(active.buttonNext).text('Submit');
		}
		else if( $(active.variableMenu).is(":visible") == true ){

			var outputText = $(active.dialogTextInput).val();
			var outputSubText = $(active.dialogSubTextInput).val();

			if(inputType == InputType.logicExpressionTermLocalVariable){
				input.setText(outputText);
			}
			else if(inputType == InputType.logicExpressionTermGlobalVariable){
				input.setText("global "+outputText);
		   	}	
			else if(inputType == InputType.logicExpressionTermArrayElement){
				input.setText(outputText+"["+outputSubText+"]");
			}	
			else if(inputType == InputType.logicExpressionTermObjectElement){
				input.setText(outputText+"."+outputSubText);
			}
			else{
				console.log('Wrong input type');
			}

	        DialogMenuController.close(true);
		}
		else if( $(active.constantMenu).is(":visible") == true ){

			if(	$(active.constantRadioNumber).children('input[type=radio]').prop("checked") == true ){
				active.input.setType(InputType.logicExpressionTermConstantNumber);
			}
			else if( $(active.constantRadioText).children('input[type=radio]').prop("checked") == true ){
				active.input.setType(InputType.logicExpressionTermConstantText);
			}    	

			var outputText = $(active.constantTextInput).val();

			if(inputType == InputType.logicExpressionTermConstantNumber){
				input.setText(outputText);
			}
			else if(inputType == InputType.logicExpressionTermConstantText){
				input.setText("\""+outputText+"\"");
		   	}	
			else{
				console.log('Wrong input type');
			}

	        DialogMenuController.close(true);
		}

	});

	$(this.buttonBack).mousedown(function() {
		var active = DialogMenuController.getActive();

		$(active.buttonBack).hide();

		$(active.chooseMenu).show();
		$(active.variableMenu).hide();
		$(active.constantMenu).hide();
		$(active.functionCallMenu).hide();
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

	return this;
};

LogicExpressionTermDialogMenu.prototype.initLogicExpressionTermDialogMenu = function(){

	var inputType = this.input.type;
	var text = this.input.getText();
    console.log(text);
    //$(this.dialogTextInput).val(text);
    
	if(inputType == InputType.logicExpressionTerm){
		$(this.chooseMenu).show();
		$(this.variableMenu).hide();
		$(this.constantMenu).hide();

		$(this.buttonBack).hide();

   		$(this.radioButtonVariable).children('input[type=radio]').prop("checked", true);
   		$(this.dialogTextInput).val("");
    	$(this.dialogTextInput).attr("placeholder" , "variable name");

    	$(this.constantRadioNumber).children('input[type=radio]').prop("checked", true);
   		$(this.constantTextInput).val("");
    	$(this.constantTextInput).attr("placeholder" , "constant number");
	}
	else if(inputType == InputType.logicExpressionTermLocalVariable){
		$(this.chooseMenu).hide();
		$(this.buttonBack).show();
		$(this.variableMenu).show();
		$(this.constantMenu).hide();

		$(this.radioVariable).children('input[type=radio]').prop("checked", true);
	}
	else if(inputType == InputType.logicExpressionTermGlobalVariable){
		$(this.chooseMenu).hide();
		$(this.buttonBack).show();
		$(this.variableMenu).show();
		$(this.constantMenu).hide();

    	$(this.radioGlobalVariable).children('input[type=radio]').prop("checked", true);

    	var global = text.substring(0, 5);
    	var varName = text.substring(6, text.length);
    	$(this.dialogTextInput).val(varName);
   	}	
	else if(inputType == InputType.logicExpressionTermArrayElement){
		$(this.chooseMenu).hide();
		$(this.buttonBack).show();
		$(this.variableMenu).show();
		$(this.constantMenu).hide();

    	$(this.radioArrayElement).children('input[type=radio]').prop("checked", true);
    	$(this.dialogSubTextInput).show();

    	var arrayNumStart = text.indexOf("[");
    	var arrayNumStop = text.indexOf("]");

    	var arrayName = text.substring(0, arrayNumStart);
    	var arrayNum = text.substring(arrayNumStart+1, arrayNumStop);

    	$(this.dialogTextInput).val(arrayName);
    	$(this.dialogSubTextInput).val(arrayNum);
	}	
	else if(inputType == InputType.logicExpressionTermObjectElement){
		$(this.chooseMenu).hide();
		$(this.buttonBack).show();
		$(this.variableMenu).show();
		$(this.constantMenu).hide();

    	$(this.radioObjectElement).children('input[type=radio]').prop("checked", true);
    	$(this.dialogSubTextInput).show();

    	var elementStart = text.indexOf(".");

    	var objectName = text.substring(0, elementStart);
    	var element = text.substring(elementStart-1, text.length);

    	$(this.dialogTextInput).val(objectName);
    	$(this.dialogSubTextInput).val(element);
	}
	else if(inputType == InputType.logicExpressionTermConstantNumber){
		$(this.chooseMenu).hide();
		$(this.buttonBack).show();
		$(this.variableMenu).hide();
		$(this.constantMenu).show();

    	$(this.constantRadioNumber).children('input[type=radio]').prop("checked", true);

    	$(this.dialogTextInput).val(text);
	}
	else if(inputType == InputType.logicExpressionTermConstantText){
		$(this.chooseMenu).hide();
		$(this.buttonBack).show();
		$(this.variableMenu).hide();
		$(this.constantMenu).show();

    	$(this.constantRadioText).children('input[type=radio]').prop("checked", true);

    	var txt = text.substring(1, text.length-1);

    	$(this.dialogTextInput).val(txt);
	}
	else{
		console.log('Wrong input type');
	}

};

LogicExpressionTermDialogMenu.prototype.open = function(object){

	this.object = object;
	this.input = object.input;

	this.initLogicExpressionTermDialogMenu();

    $(this.dialogMenuDiv).css('display', "block");	
};

LogicExpressionTermDialogMenu.prototype.close = function(){
    $(this.dialogMenuDiv).css('display', "none");

	this.object = null;
	this.input = null;
};

