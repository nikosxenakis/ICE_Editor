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
	$(this.chooseTypeDiv).css('border','solid 1px darkgray');
	$(this.chooseTypeDiv).css('border-radius','10px');
	$(this.chooseTypeDiv).css('box-shadow', '2px 2px 1px #888888');
	$(this.chooseTypeDiv).css('padding','10px');
	$(this.chooseTypeDiv).css('margin-bottom','10px');


	this.chooseTypeLabel = createHtmlElement({
		format: "div",
		text: "Choose Type:",
		father: this.chooseTypeDiv
	});
	$(this.chooseTypeLabel).css('font-size','larger');
	$(this.chooseTypeLabel).css('float','left');
	$(this.chooseTypeLabel).css('margin-left','20px');
	$(this.chooseTypeLabel).css('margin-top','0px');
	$(this.chooseTypeLabel).css('color', '#275F61');
	$(this.chooseTypeLabel).css('font-family','-webkit-pictograph');

	this.chooseTypeDropdown = createHtmlElement({
		format: "div",
		className: "dropdown dropdownMultiDepth",
		father: this.chooseTypeDiv
	});
	$(this.chooseTypeDropdown).css('float','right');
	$(this.chooseTypeDropdown).css('margin-right','45px');


	this.chooseTypeDropdownA = createHtmlElement({
		format: "a",
		className: "btn btn-primary",
		text: "local variable",
		id: "dLabel",
		father: this.chooseTypeDropdown
	});
	$(this.chooseTypeDropdownA).attr('data-toggle','dropdown');
	$(this.chooseTypeDropdownA).css('background-color','gray');
	$(this.chooseTypeDropdownA).css('border-radius','5px');
	$(this.chooseTypeDropdownA).css('color','#275F61');
	$(this.chooseTypeDropdownA).css('background-color','azure');

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
	//$(this.chooseTypeDropdownUl).css('min-width','60px');
	$(this.chooseTypeDropdownUl).attr('aria-labelledby','dropdownMenu');
	$(this.chooseTypeDropdownUl).css('text-align','center');
	$(this.chooseTypeDropdownUl).css('position','absolute');

	this.chooseTypeDropdownList = createHtmlElement({
		format: "li",
		father: this.chooseTypeDropdownUl
	});
	$(this.chooseTypeDropdownList).css('margin-left','5px');
	$(this.chooseTypeDropdownList).css('margin-right','5px');

	this.buttonLocalVariable = createHtmlElement({
		format: "a",
		text: "local variable",
		father: this.chooseTypeDropdownList
	});

	this.buttonGlobalVariable = createHtmlElement({
		format: "a",
		text: "global variable",
		father: this.chooseTypeDropdownList
	});

	this.buttonArrayElement = createHtmlElement({
		format: "a",
		text: "array element",
		father: this.chooseTypeDropdownList
	});

	this.buttonObjectElement = createHtmlElement({
		format: "a",
		text: "object element",
		father: this.chooseTypeDropdownList
	});
};

LValue.prototype.localVariable = function(){
	this.localVariableDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.lValueDiv
	});
	$(this.localVariableDiv).css('border','solid 1px darkgray');
	$(this.localVariableDiv).css('border-radius','10px');
	$(this.localVariableDiv).css('box-shadow', '2px 2px 1px #888888');
	$(this.localVariableDiv).css('padding','10px');

	this.localVariableLabel = createHtmlElement({
		format: "div",
		text: "Variable Name:",
		father: this.localVariableDiv
	});
	$(this.localVariableLabel).css('font-size','larger');
	$(this.localVariableLabel).css('float','left');
	$(this.localVariableLabel).css('margin-left','20px');
	$(this.localVariableLabel).css('margin-top','0px');
	$(this.localVariableLabel).css('color', '#275F61');
	$(this.localVariableLabel).css('font-family','-webkit-pictograph');

	this.localVariableInput = createHtmlElement({
		format: "input",
		father: this.localVariableDiv
	});
	$(this.localVariableInput).css('float','right');
	$(this.localVariableInput).css('margin-right','20px');
	$(this.localVariableInput).css('width','140px');
	$(this.localVariableInput).attr('placeholder','local variable');
};

LValue.prototype.globalVariable = function(){
	this.globalVariableDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.lValueDiv
	});
	$(this.globalVariableDiv).css('border','solid 1px darkgray');
	$(this.globalVariableDiv).css('border-radius','10px');
	$(this.globalVariableDiv).css('box-shadow', '2px 2px 1px #888888');
	$(this.globalVariableDiv).css('padding','10px');

	this.globalVariableLabel = createHtmlElement({
		format: "div",
		text: "Global Name:",
		father: this.globalVariableDiv
	});
	$(this.globalVariableLabel).css('font-size','larger');
	$(this.globalVariableLabel).css('float','left');
	$(this.globalVariableLabel).css('margin-left','20px');
	$(this.globalVariableLabel).css('margin-top','0px');
	$(this.globalVariableLabel).css('color', '#275F61');
	$(this.globalVariableLabel).css('font-family','-webkit-pictograph');

	this.globalVariableInput = createHtmlElement({
		format: "input",
		father: this.globalVariableDiv
	});
	$(this.globalVariableInput).css('float','right');
	$(this.globalVariableInput).css('margin-right','20px');
	$(this.globalVariableInput).css('width','140px');
	$(this.globalVariableInput).attr('placeholder','global variable');
};

LValue.prototype.arrayElement = function(){

	this.arrayElementDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.lValueDiv
	});
	$(this.arrayElementDiv).css('border','solid 1px darkgray');
	$(this.arrayElementDiv).css('border-radius','10px');
	$(this.arrayElementDiv).css('box-shadow', '2px 2px 1px #888888');
	$(this.arrayElementDiv).css('padding','10px');

	return;

	this.globalVariableLabel = createHtmlElement({
		format: "div",
		text: "Variable Name:",
		father: this.globalVariableDiv
	});
	$(this.globalVariableLabel).css('font-size','larger');
	$(this.globalVariableLabel).css('float','left');
	$(this.globalVariableLabel).css('margin-left','20px');
	$(this.globalVariableLabel).css('margin-top','0px');
	$(this.globalVariableLabel).css('color', '#275F61');
	$(this.globalVariableLabel).css('font-family','-webkit-pictograph');

	this.globalVariableInput = createHtmlElement({
		format: "input",
		father: this.globalVariableDiv
	});
	$(this.globalVariableInput).css('float','right');
	$(this.globalVariableInput).css('margin-right','20px');
	$(this.globalVariableInput).css('width','140px');
	$(this.globalVariableInput).attr('placeholder','local variable');
};

LValue.prototype.objectElement = function(){
	
	this.objectElementDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.lValueDiv
	});
	$(this.objectElementDiv).css('border','solid 1px darkgray');
	$(this.objectElementDiv).css('border-radius','10px');
	$(this.objectElementDiv).css('box-shadow', '2px 2px 1px #888888');
	$(this.objectElementDiv).css('padding','10px');

	return;

	this.globalVariableLabel = createHtmlElement({
		format: "div",
		text: "Variable Name:",
		father: this.globalVariableDiv
	});
	$(this.globalVariableLabel).css('font-size','larger');
	$(this.globalVariableLabel).css('float','left');
	$(this.globalVariableLabel).css('margin-left','20px');
	$(this.globalVariableLabel).css('margin-top','0px');
	$(this.globalVariableLabel).css('color', '#275F61');
	$(this.globalVariableLabel).css('font-family','-webkit-pictograph');

	this.globalVariableInput = createHtmlElement({
		format: "input",
		father: this.globalVariableDiv
	});
	$(this.globalVariableInput).css('float','right');
	$(this.globalVariableInput).css('margin-right','20px');
	$(this.globalVariableInput).css('width','140px');
	$(this.globalVariableInput).attr('placeholder','local variable');
};

LValue.prototype.init = function(input){

    var text = input.getText();

 	if(text.outputText1)
 		var outputText1 = text.outputText1;

  	if(text.outputText2)
 		var outputText2 = text.outputText2;

	console.log(text);

	if(input.type == InputType.localId){
    	$(this.localVariableInput).val(text);		
	}
	else if(input.type == InputType.globalId){
    	$(this.globalVariableInput).val(text);		
	}
	else if(input.type == InputType.arrayElement){
		
	}
	else if(input.type == InputType.objectElement){
		
	}
	else{
		console.error('error in LValue init');
	}		
};
/*
LValue.prototype.show = function(){
	$(this.lValueDiv).show();
};

LValue.prototype.hide = function(){
	$(this.lValueDiv).hide();
};
*/