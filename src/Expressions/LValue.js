function LValue(basicDialogMenu){

	if(!basicDialogMenu)
		console.error('wrong args');
		
	this.basicDialogMenu = basicDialogMenu;
	
	this.lValueDiv = createHtmlElement({
		format: "div",
		father: basicDialogMenu.getContentDiv()
	});	
	
	this.dialogBodyLeft = createHtmlElement({
		format: "div",
		className: "col-sm-6",
		father: this.lValueDiv
	});

	this.radioForm = createHtmlElement({
		format: "form",
		father: this.dialogBodyLeft
	});

	this.radioVariable = createRadioHtmlElement({
		text: "local variable",
		name: 'type',
		father: this.radioForm
	});

	this.radioGlobalVariable = createRadioHtmlElement({
		text: "global variable",
		name: 'type',
		father: this.radioForm
	});

	this.radioArrayElement = createRadioHtmlElement({
		text: "array element",
		name: 'type',
		father: this.radioForm
	});

	this.radioObjectElement = createRadioHtmlElement({
		text: "object element",
		name: 'type',
		father: this.radioForm
	});

	this.dialogBodyRight = createHtmlElement({
		format: "div",
		className: "col-sm-6",
		father: this.lValueDiv
	});

	this.dialogTextInput = createHtmlElement({
		format: "input",
		type: "text",
		placeholder: "value",
		father: this.dialogBodyRight
	});
	$(this.dialogTextInput).css('max-width', '100%');
	$(this.dialogTextInput).css('margin-top', 30);

	this.dialogSubTextInput = createHtmlElement({
		format: "input",
		type: "text",
		placeholder: "value",
		father: this.dialogBodyRight
	});
	$(this.dialogSubTextInput).css('max-width', '100%');
	$(this.dialogSubTextInput).css('margin-top', 20);

	$(this.dialogTextInput).show();
	$(this.dialogSubTextInput).hide();
	
	$( this.basicDialogMenu.getNextButton() ).mousedown(function(e) {
		var active = DialogMenuController.getActive();

		if(active.lValue){
			var lValue = active.lValue;
		}
		else if(active.expression){
			var expression = active.expression;
			var term = expression.term;
			var lValue = term.lValue;
		}
		else if(active.term){
			var term = active.term;
			var lValue = term.lValue;
		}	
		var lValueDiv = lValue.lValueDiv;
		
		var input = active.object.input;
		var inputType = input.type;
		var outputText = $(lValue.dialogTextInput).val();
		var outputSubText = $(lValue.dialogSubTextInput).val();
		
		if( $(lValueDiv).is(":visible") == true ){
			console.log('submit');
			
			if( radioIsChecked(lValue.radioVariable) ){
				input.setText(outputText);
				if(expression)
					input.setType(InputType.expressionTermLvalueID);
				else
					input.setType(InputType.lvalueID);
			}
			else if( radioIsChecked(lValue.radioGlobalVariable) ){
				input.setText("global "+outputText);
				if(expression)
					input.setType(InputType.expressionTermLvalueGlobalID);
				else
					input.setType(InputType.lvalueGlobalID);
			}	
			else if( radioIsChecked(lValue.radioArrayElement) ){
				input.setText(outputText+"["+outputSubText+"]");
				if(expression)
					input.setType(InputType.expressionTermLvalueArrayElement);
				else
					input.setType(InputType.lvalueArrayElement);
			}	
			else if( radioIsChecked(lValue.radioObjectElement) ){
				input.setText(outputText+"."+outputSubText);
				if(expression)
					input.setType(InputType.expressionTermLvalueObjectElement);
				else
					input.setType(InputType.lvalueObjectElement);
			}
			else{
				console.error('Wrong input type');
			}

       	 	DialogMenuController.close(true);
			
			e.stopImmediatePropagation();
		}
	});	
	
	$( this.basicDialogMenu.getBackButton() ).mousedown(function(e) {
		var active = DialogMenuController.getActive();

		if(active.lValue){
			var lValue = active.lValue;
		}
		else if(active.expression){
			var expression = active.expression;
			var term = expression.term;
			var lValue = term.lValue;
		}
		else if(active.term){
			var term = active.term;
			var lValue = term.lValue;
		}
		var lValueDiv = lValue.lValueDiv;

		if(active.lValue){
			console.error('there is no back button in lValue');
			return;
		}
		
		if( $(lValueDiv).is(":visible") == true ){
			active.basicDialogMenu.setNextButton('Next');
			active.basicDialogMenu.enableNextButton(true);
			lValue.hide();				
			term.show();
			
			e.stopImmediatePropagation();
		}

	});	
	
	$(this.radioVariable).mousedown(function(){
		var active = DialogMenuController.getActive();
		
		if(active.expression){
			var expression = active.expression;
			var term = expression.term;
			var lValue = term.lValue;
		}
		else if(active.lValue){
			var lValue = active.lValue;

		}
		else if(active.term){
			var term = active.term;
			var lValue = term.lValue;
		}
		
		active.basicDialogMenu.enableNextButton(false);
    	$(lValue.dialogSubTextInput).hide();
    	$(lValue.dialogTextInput).css('margin-top', 30);
    	$(lValue.dialogTextInput).val("");
    	$(lValue.dialogTextInput).attr("placeholder" , "variable name");
    });

    $(this.radioGlobalVariable).mousedown(function(){
		var active = DialogMenuController.getActive();
		
		if(active.expression){
			var expression = active.expression;
			var term = expression.term;
			var lValue = term.lValue;
		}
		else if(active.lValue){
			var lValue = active.lValue;

		}
		else if(active.term){
			var term = active.term;
			var lValue = term.lValue;
		}
		
		active.basicDialogMenu.enableNextButton(false);
    	$(lValue.dialogSubTextInput).hide();
    	$(lValue.dialogTextInput).css('margin-top', 30);
    	$(lValue.dialogTextInput).val("");
    	$(lValue.dialogTextInput).attr("placeholder" , "global variable name");
    });

	$(this.radioArrayElement).mousedown(function(){
		var active = DialogMenuController.getActive();
		
		if(active.expression){
			var expression = active.expression;
			var term = expression.term;
			var lValue = term.lValue;
		}
		else if(active.lValue){
			var lValue = active.lValue;

		}
		else if(active.term){
			var term = active.term;
			var lValue = term.lValue;
		}
		
		active.basicDialogMenu.enableNextButton(false);
    	$(lValue.dialogSubTextInput).show();
    	$(lValue.dialogTextInput).css('margin-top', 10);
    	$(lValue.dialogTextInput).val("");
    	$(lValue.dialogSubTextInput).val("");
    	$(lValue.dialogTextInput).attr("placeholder" , "array name");
    	$(lValue.dialogSubTextInput).attr("placeholder" , "element's position");
    });

    $(this.radioObjectElement).mousedown(function(){
		var active = DialogMenuController.getActive();
		
		if(active.expression){
			var expression = active.expression;
			var term = expression.term;
			var lValue = term.lValue;
		}
		else if(active.lValue){
			var lValue = active.lValue;

		}
		else if(active.term){
			var term = active.term;
			var lValue = term.lValue;
		}
		
		active.basicDialogMenu.enableNextButton(false);
    	$(lValue.dialogSubTextInput).show();
    	$(lValue.dialogTextInput).css('margin-top', 10);
    	$(lValue.dialogTextInput).val("");
    	$(lValue.dialogSubTextInput).val("");
    	$(lValue.dialogTextInput).attr("placeholder" , "object name");
    	$(lValue.dialogSubTextInput).attr("placeholder" , "element's name");
    });
	
	$(this.dialogTextInput).on("input",function() {
		var active = DialogMenuController.getActive();
		
		if(active.expression){
			var expression = active.expression;
			var term = expression.term;
			var lValue = term.lValue;
		}
		else if(active.lValue){
			var lValue = active.lValue;

		}
		else if(active.term){
			var term = active.term;
			var lValue = term.lValue;
		}

		var outputText = $(lValue.dialogTextInput).val();
		var outputSubText = $(lValue.dialogSubTextInput).val();

		if( $(lValue.dialogSubTextInput).is(":visible") ){
			if(outputSubText!="" && outputText!=""){
				if( radioIsChecked(lValue.radioArrayElement) ){
					if(!isNaN(outputSubText)){
						active.basicDialogMenu.enableNextButton(true);
					}
					else{
						active.basicDialogMenu.enableNextButton(false);
					}
				}else{
					active.basicDialogMenu.enableNextButton(true);
				}
			}
			else{
				active.basicDialogMenu.enableNextButton(false);
			}
		}
		else{
			if(outputText!=""){
				active.basicDialogMenu.enableNextButton(true);
			}
			else{
				active.basicDialogMenu.enableNextButton(false);
			}
		}
	});

	$(this.dialogSubTextInput).on("input",function() {
		var active = DialogMenuController.getActive();
		
		if(active.expression){
			var expression = active.expression;
			var term = expression.term;
			var lValue = term.lValue;
		}
		else if(active.lValue){
			var lValue = active.lValue;

		}
		else if(active.term){
			var term = active.term;
			var lValue = term.lValue;
		}
		
		var outputText = $(lValue.dialogTextInput).val();
		var outputSubText = $(lValue.dialogSubTextInput).val();

		if( $(lValue.dialogSubTextInput).is(":visible") ){
			if(outputSubText!="" && outputText!=""){
				if( radioIsChecked(lValue.radioArrayElement) ){
					if(!isNaN(outputSubText)){
	    				active.basicDialogMenu.enableNextButton(true);
					}
					else{
	    				active.basicDialogMenu.enableNextButton(false);
					}
				}else{
	    			active.basicDialogMenu.enableNextButton(true);
				}
			}
			else{
	    		active.basicDialogMenu.enableNextButton(false);
			}
		}
		else{
			if(outputText!=""){
	    		active.basicDialogMenu.enableNextButton(true);
			}
			else{
	    		active.basicDialogMenu.enableNextButton(false);
			}
		}
	});
	return this;
};

LValue.prototype.init = function(input){

    var text = input.getText();
    $(this.dialogTextInput).val(text);
    $(this.dialogSubTextInput).hide();

	var active = DialogMenuController.getActive();
	var expression = active.expression;

	var lValue = active.lValue;
	if(!expression && lValue){
		this.basicDialogMenu.enableBackButton(false);
	}
	
	this.basicDialogMenu.setNextButton('Submit');

	if( input.type == InputType.expressionTermLvalueID || input.type == InputType.lvalueID){
		$(this.radioVariable).children('input[type=radio]').prop("checked", true);
    	$(this.dialogTextInput).attr("placeholder" , "variable name");
	}
	else if( input.type == InputType.expressionTermLvalueGlobalID || input.type == InputType.lvalueGlobalID ){	
		$(this.radioGlobalVariable).children('input[type=radio]').prop("checked", true);
		
    	var global = text.substring(0, 5);
    	var varName = text.substring(6, text.length);
    	$(this.dialogTextInput).val(varName);
	}
	else if( input.type == InputType.expressionTermLvalueArrayElement || input.type == InputType.lvalueArrayElement ){	
		$(this.radioArrayElement).children('input[type=radio]').prop("checked", true);
    	$(this.dialogSubTextInput).show();

    	var arrayNumStart = text.indexOf("[");
    	var arrayNumStop = text.indexOf("]");

    	var arrayName = text.substring(0, arrayNumStart);
    	var arrayNum = text.substring(arrayNumStart+1, arrayNumStop);

    	$(this.dialogTextInput).val(arrayName);
    	$(this.dialogSubTextInput).val(arrayNum);
	}
	else if( input.type == InputType.expressionTermLvalueObjectElement || input.type == InputType.lvalueObjectElement ){	
		$(this.radioObjectElement).children('input[type=radio]').prop("checked", true);
    	$(this.dialogSubTextInput).show();

    	var elementStart = text.indexOf(".");

    	var objectName = text.substring(0, elementStart);
    	var element = text.substring(elementStart+1, text.length);

    	$(this.dialogTextInput).val(objectName);
    	$(this.dialogSubTextInput).val(element);
	}
	else if( input.type == InputType.lvalue ){
		$(this.radioVariable).children('input[type=radio]').prop("checked", true);
   	 	$(this.dialogTextInput).val("");
    	$(this.dialogTextInput).attr("placeholder" , "variable name");
	}
		
};

LValue.prototype.show = function(){
	$(this.lValueDiv).show();
};

LValue.prototype.hide = function(){
	$(this.lValueDiv).hide();
};