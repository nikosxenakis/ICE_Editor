function LValue(basicDialogMenu){

	if(!basicDialogMenu)
		console.error('wrong args');
		
	this.basicDialogMenu = basicDialogMenu;
	
	this.lValueDiv = createHtmlElement({
		format: "div",
		father: basicDialogMenu.getContentDiv()
	});	
	
	this.chooseType();

	this.localVariable();
	this.globalVariable();
	this.arrayElement();
	this.objectElement();

	return this;
};

LValue.prototype.chooseType = function(){
	this.chooseTypeDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.lValueDiv
	});
	$(this.chooseTypeDiv).addClass('chooseDiv');

	this.chooseTypeLabel = createHtmlElement({
		format: "div",
		className: "dialogLabel",
		text: "Choose Type:",
		father: this.chooseTypeDiv
	});

	this.chooseTypeDropdown = createHtmlElement({
		format: "div",
		className: "dropdown dropdownMultiDepth dialogInput",
		father: this.chooseTypeDiv
	});
	$(this.chooseTypeDropdown).css('position','relative');

	this.chooseTypeDropdownA = createHtmlElement({
		format: "a",
		className: "btn btn-primary",
		text: "local variable",
		id: "dLabel",
		father: this.chooseTypeDropdown
	});
	$(this.chooseTypeDropdownA).attr('data-toggle','dropdown');
	$(this.chooseTypeDropdownA).addClass('chooseTypeDropdownA');
	$(this.chooseTypeDropdownA).css('color','#275F61');
	$(this.chooseTypeDropdownA).css('background-color','snow');

	this.chooseTypeDropdownSpan = createHtmlElement({
		format: "span",
		className: "caret",
		father: this.chooseTypeDropdownA
	});

	this.chooseTypeDropdownUl = createHtmlElement({
		format: "ul",
		className: "dropdown-menu",
		father: this.chooseTypeDropdown
	});
	$(this.chooseTypeDropdownUl).attr('aria-labelledby','dropdownMenu');
	$(this.chooseTypeDropdownUl).addClass('chooseTypeDropdownUl');

	this.chooseTypeDropdownList = createHtmlElement({
		format: "li",
		father: this.chooseTypeDropdownUl
	});
	$(this.chooseTypeDropdownList).addClass('chooseTypeDropdownList');

	this.buttonLocalVariable = createHtmlElement({
		format: "a",
		text: "local variable",
		father: this.chooseTypeDropdownList
	});

	$( this.buttonLocalVariable ).mousedown(function() {
		var active = DialogMenuController.getActive();
	    
	    $(active.lValue.chooseTypeDropdownA).html('local variable<span class="caret"></span>');	

	    $(active.lValue.localVariableDiv).show();	
    	$(active.lValue.globalVariableDiv).hide();		
    	$(active.lValue.arrayElementDiv).hide();		
    	$(active.lValue.objectElementDiv).hide();
	});

	this.buttonGlobalVariable = createHtmlElement({
		format: "a",
		text: "global variable",
		father: this.chooseTypeDropdownList
	});

	$( this.buttonGlobalVariable ).mousedown(function() {
		var active = DialogMenuController.getActive();

	    $(active.lValue.chooseTypeDropdownA).html('global variable<span class="caret"></span>');	

	    $(active.lValue.localVariableDiv).hide();	
    	$(active.lValue.globalVariableDiv).show();		
    	$(active.lValue.arrayElementDiv).hide();		
    	$(active.lValue.objectElementDiv).hide();
	});

	this.buttonArrayElement = createHtmlElement({
		format: "a",
		text: "array element",
		father: this.chooseTypeDropdownList
	});

	$( this.buttonArrayElement ).mousedown(function() {
		var active = DialogMenuController.getActive();
	    
	    $(active.lValue.chooseTypeDropdownA).html('array element<span class="caret"></span>');	

	    $(active.lValue.localVariableDiv).hide();	
    	$(active.lValue.globalVariableDiv).hide();		
    	$(active.lValue.arrayElementDiv).show();		
    	$(active.lValue.objectElementDiv).hide();
	});

	this.buttonObjectElement = createHtmlElement({
		format: "a",
		text: "object element",
		father: this.chooseTypeDropdownList
	});

	$( this.buttonObjectElement ).mousedown(function() {
		var active = DialogMenuController.getActive();
	    
	    $(active.lValue.chooseTypeDropdownA).html('object element<span class="caret"></span>');	

	    $(active.lValue.localVariableDiv).hide();	
    	$(active.lValue.globalVariableDiv).hide();		
    	$(active.lValue.arrayElementDiv).hide();		
    	$(active.lValue.objectElementDiv).show();
	});

};

LValue.prototype.localVariable = function(){
	this.localVariableDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.lValueDiv
	});
	$(this.localVariableDiv).addClass('chooseDiv');

	this.localVariableLabel = createHtmlElement({
		format: "div",
		className: "dialogLabel",
		text: "Variable Name:",
		father: this.localVariableDiv
	});

	this.localVariableInput = createAutocompleteInputHtmlElement(this.localVariableDiv,'local variable',InputType.localId);
};

LValue.prototype.globalVariable = function(){
	this.globalVariableDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.lValueDiv
	});
	$(this.globalVariableDiv).addClass('chooseDiv');

	this.globalVariableLabel = createHtmlElement({
		format: "div",
		className: "dialogLabel",
		text: "Global Name:",
		father: this.globalVariableDiv
	});

	this.globalVariableInput = createAutocompleteInputHtmlElement(this.globalVariableDiv,'global variable',InputType.globalId);
};

LValue.prototype.arrayElement = function(){

	this.arrayElementDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.lValueDiv
	});
	$(this.arrayElementDiv).addClass('chooseDiv');

	this.arrayElementDiv2 = createHtmlElement({
		format: "div",
		className: "row",
		father: this.arrayElementDiv
	});

	this.arrayElementNameDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.arrayElementDiv2
	});
	$(this.arrayElementNameDiv).css('padding','10px');

	this.arrayElementNameLabel = createHtmlElement({
		format: "div",
		className: "dialogLabel",
		text: "Array Name:",
		father: this.arrayElementNameDiv
	});

	this.arrayElementNameInput = createAutocompleteInputHtmlElement(this.arrayElementNameDiv,'array name',InputType.localId);
	$(this.arrayElementNameInput).parent().css('left','-5px');

	this.arrayElementPositionDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.arrayElementDiv2
	});
	$(this.arrayElementPositionDiv).css('padding','10px');

	this.arrayElementPositionLabel = createHtmlElement({
		format: "div",
		className: "dialogLabel",
		text: "Element Position:",
		father: this.arrayElementPositionDiv
	});

	this.arrayElementPositionInput = createHtmlElement({
		format: "input",
		className: "LValueInput",
		father: this.arrayElementPositionDiv
	});
	$(this.arrayElementPositionInput).attr('type','number');
	$(this.arrayElementPositionInput).attr('min','0');
	$(this.arrayElementPositionInput).css('margin-right','25px');
	$(this.arrayElementPositionInput).attr('placeholder','element position');
};

LValue.prototype.objectElement = function(){

	this.objectElementDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.lValueDiv
	});
	$(this.objectElementDiv).addClass('chooseDiv');
	
	this.objectElementDiv2 = createHtmlElement({
		format: "div",
		className: "row",
		father: this.objectElementDiv
	});

	this.objectNameDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.objectElementDiv2
	});
	$(this.objectNameDiv).css('padding','10px');

	this.objectNameLabel = createHtmlElement({
		format: "div",
		text: "Object Name:",
		className: "dialogLabel",
		father: this.objectNameDiv
	});

	this.objectNameInput = createAutocompleteInputHtmlElement(this.objectNameDiv,'object name',InputType.localId);
	$(this.objectNameInput).parent().css('left','-5px');

	this.objectElementNameDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.objectElementDiv2
	});
	$(this.objectElementNameDiv).css('padding','10px');

	this.objectElementNameLabel = createHtmlElement({
		format: "div",
		text: "Element Name:",
		className: "dialogLabel",
		father: this.objectElementNameDiv
	});

	this.objectElementNameInput = createHtmlElement({
		format: "input",
		className: "LValueInput",
		father: this.objectElementNameDiv
	});
	$(this.objectElementNameInput).attr('placeholder','element name');
	$(this.objectElementNameInput).css('margin-right','25px');

};

LValue.prototype.init = function(input){

    var text = input.getText();
    	
    $(this.localVariableDiv).hide();	
    $(this.globalVariableDiv).hide();		
    $(this.arrayElementDiv).hide();		
    $(this.objectElementDiv).hide();		

	if(input.type == InputType.localId){
    	$(this.localVariableDiv).show();
    	$(this.localVariableInput).val(text);	
	    $(this.chooseTypeDropdownA).html('local variable<span class="caret"></span>');	

	}
	else if(input.type == InputType.globalId){
       	$(this.globalVariableDiv).show();	
    	$(this.globalVariableInput).val(text);	
	    $(this.chooseTypeDropdownA).html('global variable<span class="caret"></span>');	
	}
	else if(input.type == InputType.arrayElement){
       	$(this.arrayElementDiv).show();		

       	var arrayNumStart = text.indexOf("[");
        var arrayNumStop = text.indexOf("]");

        var outputText1 = text.substring(0, arrayNumStart);
        var outputText2 = text.substring(arrayNumStart+1, arrayNumStop);

    	$(this.arrayElementNameInput).val(outputText1);	
    	$(this.arrayElementPositionInput).val(outputText2);	

	    $(this.chooseTypeDropdownA).html('array element<span class="caret"></span>');	
	}
	else if(input.type == InputType.objectElement){
       	$(this.objectElementDiv).show();

        var elementStart = text.indexOf(".");

        var outputText1 = text.substring(0, elementStart);
        var outputText2 = text.substring(elementStart+1, text.length);

    	$(this.objectNameInput).val(outputText1);	
    	$(this.objectElementNameInput).val(outputText2);	

	    $(this.chooseTypeDropdownA).html('object element<span class="caret"></span>');	
	}
	else{
		console.error('error in LValue init');
	}		
};