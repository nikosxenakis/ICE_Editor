function LValue(basicDialogMenu){

	if(!basicDialogMenu)
		console.error('wrong args');
		
	this.basicDialogMenu = basicDialogMenu;
	
	this.lValueDiv = createHtmlElement({
		format: "div",
		father: basicDialogMenu.getContentDiv()
	});	
	$(this.lValueDiv).width('100%');

	$(this.lValueDiv).addClass('mainDiv');

	$(this.lValueDiv).addClass('deactivatedExpression');
	$(this.lValueDiv).css('border-radius','0px');

	this.lValueContentDiv = createHtmlElement({
		format: "div",
		className: "row",
		father: this.lValueDiv
	});
	$(this.lValueContentDiv).css('margin','10px');
	
	this.chooseType();

	this.variable();
	this.arrayElement();
	this.objectElement();
		
	return this;
};

LValue.prototype.chooseType = function(){
	this.chooseTypeDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.lValueContentDiv
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
		text: "variable",
		father: this.chooseTypeDropdownList
	});

	$( this.buttonLocalVariable ).mousedown(function() {
		var active = DialogMenuController.getActive();
	    
	    $(active.lValue.chooseTypeDropdownA).html('variable<span class="caret"></span>');	

	    $(active.lValue.variableDiv).show();	
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
		active.lValue.basicDialogMenu.enableNextButton(false);

	    $(active.lValue.variableDiv).hide();	
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
		active.lValue.basicDialogMenu.enableNextButton(false);

	    $(active.lValue.variableDiv).hide();	
    	$(active.lValue.arrayElementDiv).hide();		
    	$(active.lValue.objectElementDiv).show();
	});

};

LValue.prototype.variable = function(){
	this.variableDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.lValueContentDiv
	});
	$(this.variableDiv).addClass('chooseDiv');

	this.variableLabel = createHtmlElement({
		format: "div",
		className: "dialogLabel",
		text: "Variable Name:",
		father: this.variableDiv
	});

	this.variableInput = createAutocompleteInputHtmlElement(this.variableDiv,'variable',InputType.localId);
};

LValue.prototype.arrayElement = function(){

	this.arrayElementDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.lValueContentDiv
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

	$(this.arrayElementNameInput).on("input change focusin focusout keydown keyup",function(e){
		if($(this).data("lastval")!= $(this).val()){
		    $(this).data("lastval",$(this).val());
			
			var active = DialogMenuController.getActive();
			var lValue = active.lValue;
						
			if($(this).val() == ""){
				$(lValue.arrayElementPositionInput).prop('disabled', true);
			}
			else{
				$(lValue.arrayElementPositionInput).prop('disabled', false);
			}

	};
	});
	
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
		className: "dialogInput",
		father: this.arrayElementPositionDiv
	});
	$(this.arrayElementPositionInput).css('font-size','17px');
	$(this.arrayElementPositionInput).attr('type','number');
	$(this.arrayElementPositionInput).attr('min','0');
	$(this.arrayElementPositionInput).attr('placeholder','element position');
	
	$(this.arrayElementPositionInput).prop('disabled', true);

	$(this.arrayElementPositionInput).on("input change focusin focusout keydown keyup",function(e){
		var active = DialogMenuController.getActive();
		var lValue = active.lValue;
			
		if( $(this).val() == "")
			lValue.basicDialogMenu.enableNextButton(false);
		else
			lValue.basicDialogMenu.enableNextButton(true);
	});

};

LValue.prototype.objectElement = function(){

	this.objectElementDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.lValueContentDiv
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

	$(this.objectNameInput).on("input change focusin focusout keydown keyup",function(e){
		if($(this).data("lastval")!= $(this).val()){
		    $(this).data("lastval",$(this).val());
			
			var active = DialogMenuController.getActive();
			var lValue = active.lValue;
						
			if($(this).val() == ""){
				lValue.basicDialogMenu.enableNextButton(false);
				$(lValue.objectElementNameInput).prop('disabled', true);
			}
			else
				$(lValue.objectElementNameInput).prop('disabled', false);
		};
	});
	
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
		className: "dialogInput",
		father: this.objectElementNameDiv
	});
	$(this.objectElementNameInput).attr('placeholder','element name');
	$(this.objectElementNameInput).css('font-size','17px');

	$(this.objectElementNameInput).prop('disabled', true);

	$(this.objectElementNameInput).on("input change focusin focusout keydown keyup",function(e){
		var active = DialogMenuController.getActive();
		var lValue = active.lValue;
			
		if( $(this).val() == "")
			lValue.basicDialogMenu.enableNextButton(false);
		else
			lValue.basicDialogMenu.enableNextButton(true);
	});
};

LValue.prototype.init = function(input){

    var text = input.getText();
    	
    $(this.variableDiv).hide();	
    $(this.arrayElementDiv).hide();		
    $(this.objectElementDiv).hide();		

	if(input.type == InputType.localId || input.type == InputType.globalId){
    	$(this.variableDiv).show();
    	$(this.variableInput).val(text);	
	    $(this.chooseTypeDropdownA).html('variable<span class="caret"></span>');	
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