function LValueDialogMenu(){
	var id = "lValueDialogMenu";
	var title = "Left Value";
	DialogMenuController.createBasicDialogMenu(this,id,title,DialogMenuData.lValueDialogMenuWidth);
	//add elements to this.dialogBody

	DialogMenuController.createLvalueDiv(this,id,this.dialogBody);

	$(this.buttonNext).mousedown(function(){

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

	$(this.radioVariable).mousedown(function(){
		var active = DialogMenuController.getActive();
		$(active.buttonNext).attr("disabled", true);
    	$(active.dialogSubTextInput).hide();
		active.object.input.setType(InputType.lvalueID);
    	$(active.dialogTextInput).css('margin-top', 30);
    	$(active.dialogTextInput).val("");
    	$(active.dialogTextInput).attr("placeholder" , "variable name");
    });

    $(this.radioGlobalVariable).mousedown(function(){
		var active = DialogMenuController.getActive();
		$(active.buttonNext).attr("disabled", true);
    	$(active.dialogSubTextInput).hide();
		active.object.input.setType(InputType.lvalueGlobalID);
    	$(active.dialogTextInput).css('margin-top', 30);
    	$(active.dialogTextInput).val("");
    	$(active.dialogTextInput).attr("placeholder" , "global variable name");
    });

	$(this.radioArrayElement).mousedown(function(){
    	var active = DialogMenuController.getActive();
		$(active.buttonNext).attr("disabled", true);
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
		$(active.buttonNext).attr("disabled", true);
    	$(active.dialogSubTextInput).show();
		active.object.input.setType(InputType.lvalueObjectElement);
    	$(active.dialogTextInput).css('margin-top', 10);
		$(active.dialogTextInput).val("");
    	$(active.dialogSubTextInput).val("");
       	$(active.dialogTextInput).attr("placeholder" , "object name");
    	$(active.dialogSubTextInput).attr("placeholder" , "element's name");
    });

	$(this.dialogTextInput).on("input",function() {
		var active = DialogMenuController.getActive();
		var outputText = $(active.dialogTextInput).val();
		var outputSubText = $(active.dialogSubTextInput).val();
		var inputType = active.object.input.type;

		
		if( $(active.dialogSubTextInput).is(":visible") ){
			if(outputSubText!="" && outputText!=""){
				if(inputType == InputType.lvalueArrayElement){
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
		var inputType = active.object.input.type;

		if( $(active.dialogSubTextInput).is(":visible") ){
			if(outputSubText!="" && outputText!=""){
				if(inputType == InputType.lvalueArrayElement){
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

	return this;
};

LValueDialogMenu.prototype.initLValueDialogMenu = function(){

	var inputType = this.object.input.type;

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


