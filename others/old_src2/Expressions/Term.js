function Term(basicDialogMenu){

	if(!basicDialogMenu)
		console.error('wrong args');
		
	this.basicDialogMenu = basicDialogMenu;
	
	this.radioForm = createHtmlElement({
		format: "form",
		father: basicDialogMenu.getContentDiv()
	});

	$(this.radioForm).css('padding-left', '110px');
	$(this.radioForm).css('margin-bottom', '20px');

	this.radioButtonVariable = createRadioHtmlElement({
		text: "variable",
		name: 'type',
		father: this.radioForm
	});
	
	this.radioButtonConstant = createRadioHtmlElement({
		text: "constant",
		name: 'type',
		father: this.radioForm
	});

	this.radioButtonFunctionCall = createRadioHtmlElement({
		text: "function call",
		name: 'type',
		father: this.radioForm
	});
			
	this.radioButtonObjectMethod = createRadioHtmlElement({
		text: "object method",
		name: 'type',
		father: this.radioForm
	});

	this.lValue = new LValue(this.basicDialogMenu);

	this.constant = new Constant(this.basicDialogMenu);

	
	$( this.basicDialogMenu.getNextButton() ).mousedown(function(e) {
		var active = DialogMenuController.getActive();
		
		if(active.expression){
			var expression = active.expression;
			var term = expression.term;
			var radioForm = term.radioForm;
		}
		else if(active.term){
			var term = active.term;
			var radioForm = term.radioForm;
		}
		
		if( $(radioForm).is(":visible") == true ){
			if( radioIsChecked(term.radioButtonVariable) ){
				term.lValue.show();
			}
			else if( radioIsChecked(term.radioButtonConstant) ){
				term.constant.show();
			}

			active.basicDialogMenu.setNextButton('Submit');
			active.basicDialogMenu.enableNextButton(false);

			term.hide();
			
			e.stopImmediatePropagation();
		}
	});	
	
	$( this.basicDialogMenu.getBackButton() ).mousedown(function(e) {
		var active = DialogMenuController.getActive();
		
		if(active.expression){
			var expression = active.expression;
			var term = expression.term;
			var radioForm = term.radioForm;
		}
		else if(active.term){
			var term = active.term;
			var radioForm = term.radioForm;
		}

		if( $(radioForm).is(":visible") == true ){
			term.hide();
			expression.show();
			
			e.stopImmediatePropagation();
		}

	});	
		
	return this;
};

Term.prototype.init = function(input){


	if( 
		input.type == InputType.expressionTermLvalueID ||
		input.type == InputType.expressionTermLvalueGlobalID ||
		input.type == InputType.expressionTermLvalueArrayElement ||
		input.type == InputType.expressionTermLvalueObjectElement
	){
		this.lValue.show();
		$(this.radioButtonVariable).children('input[type=radio]').prop("checked", true);
		this.lValue.init(input);
	}
	else if( input.type == InputType.expressionTermCallFunction ){	
		$(this.radioButtonFunctionCall).children('input[type=radio]').prop("checked", true);
	}
	else if( input.type == InputType.expressionTermCallObjectMethod ){	
		$(this.radioButtonObjectMethod).children('input[type=radio]').prop("checked", true);
	}
	else if(
		input.type == InputType.expressionTermConstNumber ||
		input.type == InputType.expressionTermConstString ||
		input.type == InputType.expressionTermConstBool ||
		input.type == InputType.expressionTermConstDate ||
		input.type == InputType.expressionTermConstTime
	){	
		this.constant.show();
		$(this.radioButtonConstant).children('input[type=radio]').prop("checked", true);
		this.constant.init(input);
	}

		
};

Term.prototype.show = function(){
	$(this.radioForm).show();
};

Term.prototype.hide = function(){
	$(this.radioForm).hide();
};