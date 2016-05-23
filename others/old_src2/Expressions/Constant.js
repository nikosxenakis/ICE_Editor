function Constant(basicDialogMenu){

	if(!basicDialogMenu)
		console.error('wrong args');
		
	this.basicDialogMenu = basicDialogMenu;
	
	this.constantDiv = createHtmlElement({
		format: "div",
		father: this.basicDialogMenu.getContentDiv()
	});
		
	this.constantBodyLeft = createHtmlElement({
		format: "div",
		className: "col-sm-6",
		father: this.constantDiv
	});

	this.constantRadioForm = createHtmlElement({
		format: "form",
		father: this.constantBodyLeft
	});

	this.constantRadioNumber = createRadioHtmlElement({
		text: "number",
		name: 'type',
		father: this.constantRadioForm
	});

	this.constantRadioText = createRadioHtmlElement({
		text: "text",
		name: 'type',
		father: this.constantRadioForm
	});

	this.constantBodyRight = createHtmlElement({
		format: "div",
		className: "col-sm-6",
		father: this.constantDiv
	});

	this.constantTextInput = createHtmlElement({
		format: "input",
		type: "text",
		placeholder: "value",
		father: this.constantBodyRight
	});
	$(this.constantTextInput).css('max-width', '100%');
	$(this.constantTextInput).css('margin-top', 10);

	$(this.constantTextInput).show();		
		
	$( this.basicDialogMenu.getNextButton() ).mousedown(function(e) {

		var active = DialogMenuController.getActive();

		if(active.lValue){
			var lValue = active.lValue;
		}
		else if(active.expression){
			var expression = active.expression;
			var term = expression.term;
			var constant = term.constant;
			var constantDiv = constant.constantDiv;
		}
		else if(active.term){
			var term = active.term;
			var constant = term.constant;
			var constantDiv = constant.constantDiv;
		}
		

		var input = active.object.input;
		var inputType = input.type;
		var outputText = $(constant.constantTextInput).val();

		if( $(constantDiv).is(":visible") == true ){
			console.log('submit');
			
			if( radioIsChecked(constant.constantRadioNumber) ){
				input.setText(outputText);
				input.setType(InputType.expressionTermConstNumber);
			}
			else if( radioIsChecked(constant.constantRadioText) ){
				input.setText("\""+outputText+"\"");
				input.setType(InputType.expressionTermConstString);
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
		
		if(active.expression){
			var expression = active.expression;
			var term = expression.term;
			var constant = term.constant;
			var constantDiv = constant.constantDiv;
		}
		else if(active.term){
			var term = active.term;
			var constant = term.constant;
			var constantDiv = constant.constantDiv;
		}
		
		
		if( $(constantDiv).is(":visible") == true ){
			active.basicDialogMenu.setNextButton('Next');
			active.basicDialogMenu.enableNextButton(true);
			constant.hide();				
			term.show();
			
			e.stopImmediatePropagation();
		}

	});	
	
	$(this.constantRadioNumber).mousedown(function(){
		var active = DialogMenuController.getActive();
		if(active.expression){
			var expression = active.expression;
			var term = expression.term;
			var constant = term.constant;
			var constantDiv = constant.constantDiv;
		}
		else if(active.term){
			var term = active.term;
			var constant = term.constant;
			var constantDiv = constant.constantDiv;
		}
				
		active.basicDialogMenu.enableNextButton(false);
    	$(constant.constantTextInput).val("");
    	$(constant.constantTextInput).attr("placeholder" , "constant number");
    });

    $(this.constantRadioText).mousedown(function(){
		var active = DialogMenuController.getActive();
		if(active.expression){
			var expression = active.expression;
			var term = expression.term;
			var constant = term.constant;
			var constantDiv = constant.constantDiv;
		}
		else if(active.term){
			var term = active.term;
			var constant = term.constant;
			var constantDiv = constant.constantDiv;
		}
				
		active.basicDialogMenu.enableNextButton(false);
    	$(constant.constantTextInput).val("");
    	$(constant.constantTextInput).attr("placeholder" , "constant text");
    });

	$(this.constantTextInput).on("input",function() {
		var active = DialogMenuController.getActive();
		if(active.expression){
			var expression = active.expression;
			var term = expression.term;
			var constant = term.constant;
			var constantDiv = constant.constantDiv;
		}
		else if(active.term){
			var term = active.term;
			var constant = term.constant;
			var constantDiv = constant.constantDiv;
		}
		
		var outputText = $(constant.constantTextInput).val();

		if( radioIsChecked(constant.constantRadioNumber) ){
			if(!isNaN(outputText)){
				active.basicDialogMenu.enableNextButton(true);
			}
			else{
				active.basicDialogMenu.enableNextButton(false);
			}
		}
		else if( radioIsChecked(constant.constantRadioText) ){
			if(outputText!= ""){
				active.basicDialogMenu.enableNextButton(true);
			}
			else{
				active.basicDialogMenu.enableNextButton(false);
			}
		}
	});

	return this;
};

Constant.prototype.init = function(input){

    var text = input.getText();
    $(this.dialogTextInput).val(text);
	console.log(text);

	this.basicDialogMenu.setNextButton('Submit');
	this.basicDialogMenu.enableNextButton(false);

	if( input.type == InputType.expressionTermConstNumber ){

    	$(this.constantRadioText).val(text);

   		$(this.constantRadioNumber).children('input[type=radio]').prop("checked", true);
	}
	else if( input.type == InputType.expressionTermConstString ){	
		
    	$(this.constantRadioText).val(text.substring(1,text.length-1));
		
   		$(this.constantRadioText).children('input[type=radio]').prop("checked", true);
	}
};

Constant.prototype.show = function(){
	$(this.constantDiv).show();
};

Constant.prototype.hide = function(){
	$(this.constantDiv).hide();
};