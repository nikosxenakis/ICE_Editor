function LValueDialogMenu(){
	var id = "lValueDialogMenu";
	var title = "Left Value";
	DialogMenuController.createBasicDialogMenu(this,id,title,DialogMenuData.lValueDialogMenuWidth);
	//add elements to this.dialogBody

	//var father = this.dialogBody;
	//DialogMenuController.createLvalueDiv(this,father);


	this.dialogBodyLeft = createHtmlElement({
		format: "div",
		id: id+"bodyLeft",
		className: "col-sm-6",
		father: this.dialogBody
	});

	this.radioForm = createHtmlElement({
		format: "form",
		id: id+"radioForm",
		father: this.dialogBodyLeft
	});

	this.radioVariable = createRadioHtmlElement({
		id: id+"radioVariable",
		text: "local variable",
		name: 'type',
		father: this.radioForm
	});

	this.radioGlobalVariable = createRadioHtmlElement({
		id: id+"radioNumber",
		text: "global variable",
		name: 'type',
		father: this.radioForm
	});

	this.radioArrayElement = createRadioHtmlElement({
		id: id+"radioText",
		text: "array element",
		name: 'type',
		father: this.radioForm
	});

	this.radioObjectElement = createRadioHtmlElement({
		id: id+"radioBoolean",
		text: "object element",
		name: 'type',
		father: this.radioForm
	});

	this.dialogBodyRight = createHtmlElement({
		format: "div",
		id: id+"bodyRight",
		className: "col-sm-6",
		father: this.dialogBody
	});

	this.dialogTextInput = createHtmlElement({
		format: "input",
		type: "text",
		id: id+"textInput",
		placeholder: "value",
		father: this.dialogBodyRight
	});
    $(this.dialogTextInput).css('max-width', '100%');
    $(this.dialogTextInput).css('margin-top', 30);

	this.dialogSubTextInput = createHtmlElement({
		format: "input",
		type: "text",
		id: id+"subTextInput",
		placeholder: "value",
		father: this.dialogBodyRight
	});
    $(this.dialogSubTextInput).css('max-width', '100%');
    $(this.dialogSubTextInput).css('margin-top', 20);


	$(this.dialogTextInput).on("input",function() {
		var active = DialogMenuController.getActive();
		var outputText = $(active.dialogTextInput).val();
		var outputSubText = $(active.dialogSubTextInput).val();
		var inputType = active.object.input.type;

		
		if( $(active.dialogSubTextInput).is(":visible") ){
			if(outputSubText!="" && outputText!=""){
				if(inputType == InputType.lvalueArrayElement){
					if(!isNaN(outputSubText)){
	    				$(active.buttonOk).attr("disabled", false);
					}
					else{
	    				$(active.buttonOk).attr("disabled", true);
					}
				}else{
	    			$(active.buttonOk).attr("disabled", false);
				}
			}
			else{
	    		$(active.buttonOk).attr("disabled", true);
			}
		}
		else{
			if(outputText!=""){
	    		$(active.buttonOk).attr("disabled", false);
			}
			else{
	    		$(active.buttonOk).attr("disabled", true);
			}
		}
	});



	$(this.dialogSubTextInput).on("input",function() {
		var active = DialogMenuController.getActive();
		var outputText = $(active.dialogTextInput).val();
		var outputSubText = $(active.dialogSubTextInput).val();
		var inputType = active.object.input.type;

		if( $(active.dialogSubTextInput).is(":visible") ){
			if(outputSubText!="" && outputText!=""){
				if(inputType == InputType.lvalueArrayElement){
					if(!isNaN(outputSubText)){
	    				$(active.buttonOk).attr("disabled", false);
					}
					else{
	    				$(active.buttonOk).attr("disabled", true);
					}
				}else{
	    			$(active.buttonOk).attr("disabled", false);
				}
			}
			else{
	    		$(active.buttonOk).attr("disabled", true);
			}
		}
		else{
			if(outputText!=""){
	    		$(active.buttonOk).attr("disabled", false);
			}
			else{
	    		$(active.buttonOk).attr("disabled", true);
			}
		}
	});



    $(this.radioVariable).mousedown(function(){
		var active = DialogMenuController.getActive();
		$(active.buttonOk).attr("disabled", true);
    	$(active.dialogSubTextInput).hide();
		active.object.input.setType(InputType.lvalueID);
    	$(active.dialogTextInput).css('margin-top', 30);
    	$(active.dialogTextInput).val("");
    	$(active.dialogTextInput).attr("placeholder" , "variable name");
    });

    $(this.radioGlobalVariable).mousedown(function(){
		var active = DialogMenuController.getActive();
		$(active.buttonOk).attr("disabled", true);
    	$(active.dialogSubTextInput).hide();
		active.object.input.setType(InputType.lvalueGlobalID);
    	$(active.dialogTextInput).css('margin-top', 30);
    	$(active.dialogTextInput).val("");
    	$(active.dialogTextInput).attr("placeholder" , "global variable name");
    });

	$(this.radioArrayElement).mousedown(function(){
    	var active = DialogMenuController.getActive();
		$(active.buttonOk).attr("disabled", true);
    	$(active.dialogSubTextInput).show();
		active.object.input.setType(InputType.lvalueArrayElement);
		$(active.dialogTextInput).css('margin-top', 10);
		$(active.dialogTextInput).val("");
    	$(active.dialogSubTextInput).val("");
    	$(active.dialogTextInput).attr("placeholder" , "array name");
    	$(active.dialogSubTextInput).attr("placeholder" , "element's position");
    });

    $(this.radioObjectElement).mousedown(function(){
    	var active = DialogMenuController.getActive();
		$(active.buttonOk).attr("disabled", true);
    	$(active.dialogSubTextInput).show();
		active.object.input.setType(InputType.lvalueObjectElement);
    	$(active.dialogTextInput).css('margin-top', 10);
		$(active.dialogTextInput).val("");
    	$(active.dialogSubTextInput).val("");
       	$(active.dialogTextInput).attr("placeholder" , "object name");
    	$(active.dialogSubTextInput).attr("placeholder" , "element's name");
    });

	$(this.buttonOk).mousedown(function(){

		var active = DialogMenuController.getActive();
		var input = active.object.input;
		var inputType = input.type;
		var outputText = $(active.dialogTextInput).val();
		var outputSubText = $(active.dialogSubTextInput).val();

		if(inputType == InputType.lvalueID){
			input.setText(outputText);
		}
		else if(inputType == InputType.lvalueGlobalID){
			input.setText("global "+outputText);
	   	}	
		else if(inputType == InputType.lvalueArrayElement){
			input.setText(outputText+"["+outputSubText+"]");
		}	
		else if(inputType == InputType.lvalueObjectElement){
			input.setText(outputText+"."+outputSubText);
		}
		else{
			console.log('Wrong input type');
		}

        DialogMenuController.close(true);

	});

	return this;
};

LValueDialogMenu.prototype.initLValueDialogMenu = function(){

	var inputType = this.object.input.type;
    	
    $(this.dialogTextInput).show();
    $(this.dialogSubTextInput).hide();

    var text = this.object.input.getText();
    $(this.dialogTextInput).val(text);

	if(inputType == InputType.lvalue){
		this.object.input.setType(InputType.lvalueID);
		$(this.radioVariable).children('input[type=radio]').prop("checked", true);
    	$(this.dialogTextInput).val("");
    	$(this.dialogTextInput).attr("placeholder" , "variable name");
	}
	else if(inputType == InputType.lvalueID){
		$(this.radioVariable).children('input[type=radio]').prop("checked", true);
	}
	else if(inputType == InputType.lvalueGlobalID){
    	$(this.radioGlobalVariable).children('input[type=radio]').prop("checked", true);

    	var global = text.substring(0, 5);
    	var varName = text.substring(6, text.length);
    	$(this.dialogTextInput).val(varName);
   	}	
	else if(inputType == InputType.lvalueArrayElement){
    	$(this.radioArrayElement).children('input[type=radio]').prop("checked", true);
    	$(this.dialogSubTextInput).show();

    	var arrayNumStart = text.indexOf("[");
    	var arrayNumStop = text.indexOf("]");

    	var arrayName = text.substring(0, arrayNumStart);
    	var arrayNum = text.substring(arrayNumStart+1, arrayNumStop);

    	$(this.dialogTextInput).val(arrayName);
    	$(this.dialogSubTextInput).val(arrayNum);
	}	
	else if(inputType == InputType.lvalueObjectElement){
    	$(this.radioObjectElement).children('input[type=radio]').prop("checked", true);
    	$(this.dialogSubTextInput).show();

    	var elementStart = text.indexOf(".");

    	var objectName = text.substring(0, elementStart);
    	var element = text.substring(elementStart-1, text.length);

    	$(this.dialogTextInput).val(objectName);
    	$(this.dialogSubTextInput).val(element);
	}
	else{
		console.log('Wrong input type');
	}




};

LValueDialogMenu.prototype.open = function(object){

	this.object = object;

	this.initLValueDialogMenu();

    $(this.dialogMenuDiv).css('display', "block");	
};

LValueDialogMenu.prototype.close = function(){

    $(this.dialogMenuDiv).css('display', "none");

	this.object = null;
};


