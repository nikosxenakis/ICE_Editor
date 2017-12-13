function Term(father,basicDialogMenu){
	
	this.basicDialogMenu = basicDialogMenu;
	
	if(!father)
		console.error('wrong args');
		
	this.termDiv = createHtmlElement({
		format: "div",
		father: father
	});
	$(this.termDiv).width('100%');

	$(this.termDiv).addClass('mainDiv');

	$(this.termDiv).addClass('deactivatedExpression');
	$(this.termDiv).css('border-radius','0px');

	this.termDivLabel = createHtmlElement({
		format: "div",
		className: "dialogLabel",
		text: "Change Content",
		father: this.termDiv
	});
	$(this.termDivLabel).css('text-align','center');
	$(this.termDivLabel).css('float','none');
	
	this.termContentDiv = createHtmlElement({
		format: "div",
		className: "row",
		father: this.termDiv
	});
	$(this.termContentDiv).css('margin','10px');

	this.chooseType();
	this.variable();
	this.constantText();
	this.constantNumber();
	this.constantBool();
	this.arrayElement();
	this.objectElement();
	
	$(this.termDiv).hide();
	$(this.chooseTypeDiv).hide();
	this.hideAll();
	
	return this;
};

Term.prototype.open = function(expression){
	
	var active = DialogMenuController.getActive();

	if(	this.expression != null ){
		this.expression.deactivate();
		this.close();
	}
	
	if(	active.comparisonOperatorMenu && active.comparisonOperatorMenu.comparisonOperator != null ){
		active.comparisonOperatorMenu.comparisonOperator.deactivate();
		active.comparisonOperatorMenu.close();
	}
	
	this.expression = expression;
	
	this.init(expression.input);
	
	$(this.termDiv).show();
};

Term.prototype.close = function(){
	this.expression = null;
	$(this.termDiv).hide();
};

Term.prototype.chooseType = function(){
	this.chooseTypeDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.termContentDiv
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
		id: "dLabel",
		father: this.chooseTypeDropdown
	});
	$(this.chooseTypeDropdownA).attr('data-toggle','dropdown');
	$(this.chooseTypeDropdownA).addClass('chooseTypeDropdownA');
	$(this.chooseTypeDropdownA).html('variable<span class="caret"></span>');

	this.chooseTypeDropdownUl = createHtmlElement({
		format: "ul",
		className: "dropdown-menu",
		father: this.chooseTypeDropdown
	});
	$(this.chooseTypeDropdownUl).attr('aria-labelledby','dropdownMenu');
	$(this.chooseTypeDropdownUl).addClass('chooseTypeDropdownUl');

	this.variableLi = createHtmlElement({
		format: "li",
		father: this.chooseTypeDropdownUl
	});
	$(this.variableLi).addClass('chooseTypeDropdownList');
	$(this.variableLi).html('<a>variable</a>');


	this.constantLi = createHtmlElement({
		format: "li",
		className: "dropdown-submenu",
		father: this.chooseTypeDropdownUl
	});
	$(this.constantLi).html('<a tabindex=-1>constant</a>');

	this.constantUl = createHtmlElement({
		format: "ul",
		className: "dropdown-menu",
		father: this.constantLi
	});
	
	this.constantTextLi = createHtmlElement({
		format: "li",
		father: this.constantUl
	});
	$(this.constantTextLi).html('<a href="#">Text</a>');

	this.constantNumberLi = createHtmlElement({
		format: "li",
		father: this.constantUl
	});
	$(this.constantNumberLi).html('<a href="#">Number</a>');

	this.constantBoolLi = createHtmlElement({
		format: "li",
		father: this.constantUl
	});
	$(this.constantBoolLi).html('<a href="#">Boolean</a>');
	
	this.arrayElementLi = createHtmlElement({
		format: "li",
		father: this.chooseTypeDropdownUl
	});
	$(this.arrayElementLi).addClass('chooseTypeDropdownList');
	$(this.arrayElementLi).html('<a>array element</a>');

	this.objectElementLi = createHtmlElement({
		format: "li",
		text: "object element",
		father: this.chooseTypeDropdownUl
	});
	$(this.objectElementLi).addClass('chooseTypeDropdownList');
	$(this.objectElementLi).html('<a>object element</a>');

	$( this.variableLi ).mousedown(function() {
		var active = DialogMenuController.getActive();
		active.term.hideAll();

	    $(active.term.chooseTypeDropdownA).html('variable<span class="caret"></span>');	

	    $(active.term.variableDiv).show();	
	});
	
	$( this.constantTextLi ).mousedown(function() {
		var active = DialogMenuController.getActive();
		active.term.hideAll();

	    $(active.term.chooseTypeDropdownA).html('text<span class="caret"></span>');	

	    $(active.term.constantTextDiv).show();	
	});
	
	$( this.constantNumberLi ).mousedown(function() {
		var active = DialogMenuController.getActive();
		active.term.hideAll();

	    $(active.term.chooseTypeDropdownA).html('number<span class="caret"></span>');	

	    $(active.term.constantNumberDiv).show();	
	});
	
	$( this.constantBoolLi ).mousedown(function() {
		var active = DialogMenuController.getActive();
		active.term.hideAll();

	    $(active.term.chooseTypeDropdownA).html('boolean<span class="caret"></span>');	

	    $(active.term.constantBoolDiv).show();	
	});
	
	$( this.arrayElementLi ).mousedown(function() {
		var active = DialogMenuController.getActive();
		active.term.hideAll();

	    $(active.term.chooseTypeDropdownA).html('array element<span class="caret"></span>');	

	    $(active.term.arrayElementDiv).show();	
	});

	$( this.objectElementLi ).mousedown(function() {
		var active = DialogMenuController.getActive();
		active.term.hideAll();

	    $(active.term.chooseTypeDropdownA).html('object element<span class="caret"></span>');	

	    $(active.term.objectElementDiv).show();	
	});
	
};

Term.prototype.variable = function(){
	this.variableDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.termContentDiv
	});
	$(this.variableDiv).addClass('chooseDiv');

	this.variableLabel = createHtmlElement({
		format: "div",
		className: "dialogLabel",
		text: "Variable Name:",
		father: this.variableDiv
	});

	this.variableInput = createAutocompleteInputHtmlElement(this.variableDiv,'variable',InputType.localId);

	$(this.variableInput).on("input change focusin focusout keydown keyup",function(e){
		if($(this).data("lastval")!= $(this).val()){
		    $(this).data("lastval",$(this).val());
			
			var active = DialogMenuController.getActive();
			var expression = active.term.expression;
			
			expression.update($(this).val(),InputType.localId);
		};
	});

};

Term.prototype.constantText = function(){
	
	this.constantTextDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.termContentDiv
	});
	$(this.constantTextDiv).addClass('chooseDiv');

	this.constantTextLabel = createHtmlElement({
		format: "div",
		className: "dialogLabel",
		text: "Add Text:",
		father: this.constantTextDiv
	});

	this.constantTextInput = createAutocompleteInputHtmlElement(this.constantTextDiv,'text',InputType.string);

	$(this.constantTextInput).on("input change focusin focusout keydown keyup",function(e){
		if($(this).data("lastval")!= $(this).val()){
		    $(this).data("lastval",$(this).val());
			
			var active = DialogMenuController.getActive();
			var expression = active.term.expression;
			
			expression.update("\""+$(this).val()+"\"",InputType.string);
		};
	});

};

Term.prototype.constantNumber = function(){
	
	this.constantNumberDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.termContentDiv
	});
	$(this.constantNumberDiv).addClass('chooseDiv');

	this.constantNumberLabel = createHtmlElement({
		format: "div",
		className: "dialogLabel",
		text: "Add Value:",
		father: this.constantNumberDiv
	});

	this.constantNumberInput = createHtmlElement({
		format: "input",
		className: "dialogInput",
		father: this.constantNumberDiv
	});
	$(this.constantNumberInput).css('font-size','17px');
	$(this.constantNumberInput).attr('type','number');
	$(this.constantNumberInput).attr('placeholder','element position');
	

	$(this.constantNumberInput).on("input change focusin focusout keydown keyup",function(e){
		if($(this).data("lastval")!= $(this).val()){
		    $(this).data("lastval",$(this).val());
			
			var active = DialogMenuController.getActive();
			var expression = active.term.expression;
			
			expression.update($(this).val(),InputType.number);
		};
	});
};

Term.prototype.constantBool = function(){
	
	this.constantBoolDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.termContentDiv
	});
	$(this.constantBoolDiv).addClass('chooseDiv');

	this.constantBoolLabel = createHtmlElement({
		format: "div",
		className: "dialogLabel",
		text: "Choose Value:",
		father: this.constantBoolDiv
	});
	$(this.constantBoolLabel).css('margin-top','10px');
	
	this.constantBoolForm = createHtmlElement({
		format: "form",
		className: "dialogInput",
		father: this.constantBoolDiv
	});
	$(this.constantBoolForm).css('padding-left','35px');
	
	this.constantBoolInputTrue = createHtmlElement({
		format: "input",
		type: "radio",
		value: "true",
		name: "bool",
		className: "custom col-xs-2 col-xs-offset-4",
		father: this.constantBoolForm
	});
	$(this.constantBoolInputTrue).css('margin-top','8px');

	 
	this.constantBoolInputTrueLabel = createHtmlElement({
		format: "label",
		text: "True",
		className: "col-xs-10",
		father: this.constantBoolForm
	});
	$(this.constantBoolInputTrueLabel).attr('for','true');

	this.constantBoolInputFalse = createHtmlElement({
		format: "input",
		type: "radio",
		value: "false",
		name: "bool",
		className: "custom col-xs-2 col-xs-offset-4",
		father: this.constantBoolForm
	});
	$(this.constantBoolInputFalse).css('margin-top','8px');

	this.constantBoolInputFalseLabel = createHtmlElement({
		format: "label",
		text: "False",
		className: "col-xs-10",
		father: this.constantBoolForm
	});
	$(this.constantBoolInputTrueLabel).attr('for','false');
	
	var boolUpdate = function(){
		var active = DialogMenuController.getActive();
		var expression = active.term.expression;
		
		expression.update($(this).val(),InputType.bool);
	};
	
	$(this.constantBoolInputTrue).mousedown(boolUpdate);
	
	$(this.constantBoolInputFalse).mousedown(boolUpdate);
};


Term.prototype.arrayElement = function(){

	this.arrayElementDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.termContentDiv
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
		className: "dialogInput",
		father: this.arrayElementPositionDiv
	});
	$(this.arrayElementPositionInput).css('font-size','17px');
	$(this.arrayElementPositionInput).attr('type','number');
	$(this.arrayElementPositionInput).attr('min','0');
	$(this.arrayElementPositionInput).attr('placeholder','element position');
	
	$(this.arrayElementPositionInput).prop('disabled', true);

	var arrayElementUpdate = function(){
		var active = DialogMenuController.getActive();
		var expression = active.term.expression;
		var arrayName = active.term.arrayElementNameInput.val();
		var arrayPos = active.term.arrayElementPositionInput.val();
		
		if(arrayName!="" && arrayPos!=""){
			var str = arrayName + "[" + arrayPos + "]";
			expression.update(str,InputType.arrayElement);			
		}
	};
	
	$(this.arrayElementNameInput).on("input change focusin focusout keydown keyup",function(e){
		if($(this).data("lastval")!= $(this).val()){
		    $(this).data("lastval",$(this).val());
			
			var active = DialogMenuController.getActive();
			var term = active.term;
						
			if($(this).val() == ""){
				$(term.arrayElementPositionInput).prop('disabled', true);
			}
			else{
				$(term.arrayElementPositionInput).prop('disabled', false);
				arrayElementUpdate();
			}
		};
	});
	
	$(this.arrayElementPositionInput).on("input change focusin focusout keydown keyup",function(e){
		var active = DialogMenuController.getActive();
		var term = active.term;
			
		if( $(this).val() == "")
			term.basicDialogMenu.enableNextButton(false);
		else
			term.basicDialogMenu.enableNextButton(true);
			arrayElementUpdate();
	});

};

Term.prototype.objectElement = function(){

	this.objectElementDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.termContentDiv
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
		className: "dialogInput",
		father: this.objectElementNameDiv
	});
	$(this.objectElementNameInput).attr('placeholder','element name');
	$(this.objectElementNameInput).css('font-size','17px');

	$(this.objectElementNameInput).prop('disabled', true);

	var objectElementUpdate = function(){
		var active = DialogMenuController.getActive();
		var expression = active.term.expression;
		var objectName = active.term.objectNameInput.val();
		var objectElementName = active.term.objectElementNameInput.val();
		
		if(objectName!="" && objectElementName!=""){
			var str = objectName + "." + objectElementName;
			expression.update(str,InputType.objectElement);			
		}
	};

	$(this.objectNameInput).on("input change focusin focusout keydown keyup",function(e){
		if($(this).data("lastval")!= $(this).val()){
		    $(this).data("lastval",$(this).val());
			
			var active = DialogMenuController.getActive();
			var term = active.term;
						
			if($(this).val() == ""){
				term.basicDialogMenu.enableNextButton(false);
				$(term.objectElementNameInput).prop('disabled', true);
			}
			else{
				$(term.objectElementNameInput).prop('disabled', false);
				objectElementUpdate();
			}
		};
	});
	
	$(this.objectElementNameInput).on("input change focusin focusout keydown keyup",function(e){
		var active = DialogMenuController.getActive();
		var term = active.term;
			
		if( $(this).val() == "")
			term.basicDialogMenu.enableNextButton(false);
		else{
			term.basicDialogMenu.enableNextButton(true);
			objectElementUpdate();
		}
	});
};



Term.prototype.init = function(input){
	
    var text = input.getText();
	if(text == DialogMenuData.dummyString){
		text = "";
		input.type = InputType.localId;
	}
	$(this.chooseTypeDiv).show();
	this.hideAll();
	
	if(input.type == InputType.localId || input.type == InputType.globalId){
    	$(this.variableDiv).show();
    	$(this.variableInput).val(text);	
	    $(this.chooseTypeDropdownA).html('variable<span class="caret"></span>');	
	}
	else if(input.type == InputType.string){
    	$(this.constantTextDiv).show();
    	$(this.constantTextInput).val(text.substring(1, text.length-1));	
	    $(this.chooseTypeDropdownA).html('text<span class="caret"></span>');	
	}
	else if(input.type == InputType.number){
    	$(this.constantNumberDiv).show();
    	$(this.constantNumberInput).val(text);	
	    $(this.chooseTypeDropdownA).html('number<span class="caret"></span>');	
	}
	else if(input.type == InputType.bool){
    	$(this.constantBoolDiv).show();
		
		if(text == 'true')
			$(this.constantBoolInputTrue).attr('checked','checked');
		else if(text == 'false')
			$(this.constantBoolInputFalse).attr('checked','checked');
		else
			console.error('error in init bool');

		    $(this.chooseTypeDropdownA).html('bool<span class="caret"></span>');	
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
		console.error('error in Term init');
	}		
};

Term.prototype.hideAll = function(){

	$(this.variableDiv).hide();
	$(this.constantTextDiv).hide();
	$(this.constantNumberDiv).hide();
	$(this.constantBoolDiv).hide();
	$(this.arrayElementDiv).hide();
	$(this.objectElementDiv).hide();

	$(this.constantBoolInputTrue).removeAttr('checked');
	$(this.constantBoolInputFalse).removeAttr('checked');

};