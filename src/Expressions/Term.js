function Term(basicDialogMenu){

	if(!basicDialogMenu)
		console.error('wrong args');
		
	this.basicDialogMenu = basicDialogMenu;
	
	this.termDiv = createHtmlElement({
		format: "div",
		father: basicDialogMenu.getContentDiv()
	});	
	
	this.chooseType();

	return this;
};

Term.prototype.chooseType = function(){
	this.chooseTypeDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.termDiv
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


	this.liSub = createHtmlElement({
		format: "li",
		className: "dropdown-submenu",
		father: this.chooseTypeDropdownUl
	});

	this.liSUbA = createHtmlElement({
		format: "a",
		text: "hover me",
		father: this.liSub
	});
	$(this.liSUbA).attr('tabindex','-1');

	this.liSUbUl = createHtmlElement({
		format: "ul",

		className: "dropdown-menu",
		father: this.liSub
	});
	$(this.liSUbUl).html('<li><a href="#">Second level</a></li>');

                 
	/*

	$( this.buttonLocalVariable ).mousedown(function() {
		var active = DialogMenuController.getActive();
	    
	    $(active.lValue.chooseTypeDropdownA).html('local variable<span class="caret"></span>');	

	    $(active.lValue.localVariableDiv).show();	
    	$(active.lValue.globalVariableDiv).hide();		
    	$(active.lValue.arrayElementDiv).hide();		
    	$(active.lValue.objectElementDiv).hide();
	});
	*/

};


Term.prototype.init = function(input){
	/*
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
	*/
};