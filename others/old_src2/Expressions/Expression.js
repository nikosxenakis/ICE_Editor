function Expression(basicDialogMenu){

	if(!basicDialogMenu)
		console.error('wrong args');
		
	this.basicDialogMenu = basicDialogMenu;
	
	this.expressionDiv = createHtmlElement({
		format: "div",
		father: this.basicDialogMenu.getContentDiv()
	});

	this.radioForm = createHtmlElement({
		format: "form",
		father: this.expressionDiv
	});

	$(this.radioForm).css('padding-left', '110px');
	$(this.radioForm).css('margin-bottom', '20px');

	this.radioButtonArithmeticExpression = createRadioHtmlElement({
		text: "arithmetic expression",
		name: 'type',
		father: this.radioForm
	});
	
	this.radioButtonLogicExpression = createRadioHtmlElement({
		text: "logic expression",
		name: 'type',
		father: this.radioForm
	});
	
	this.radioButtonTerm = createRadioHtmlElement({
		text: "term",
		name: 'type',
		father: this.radioForm
	});

	this.radioButtonArray = createRadioHtmlElement({
		text: "array",
		name: 'type',
		father: this.radioForm
	});

	this.arithmeticExpression = new ArithmeticExpression("arithmeticExpression",this.arithmeticMenu);

	this.arg = {
		logicExpressionContentDiv: this.basicDialogMenu.getContentDiv()
	};
	
	this.logicExpression = new LogicExpression("logicExpression",this.arg);

	this.term = new Term(this.basicDialogMenu);

	this.arrayExpression = new ArrayExpression(this.basicDialogMenu);
	
	
	$( this.basicDialogMenu.getNextButton() ).mousedown(function(e) {
		var active = DialogMenuController.getActive();
		var expression = active.expression;
		var input = active.input;
		var inputType = input.type;

		if( $(expression.expressionDiv).is(":visible") == true ){

			expression.hide();

			if( radioIsChecked(expression.radioButtonArithmeticExpression) ){
				expression.arithmeticExpression.show();
				expression.basicDialogMenu.setNextButton('Submit');
			}
			else if( radioIsChecked(expression.radioButtonLogicExpression) ){
				expression.logicExpression.show();
				expression.basicDialogMenu.setNextButton('Submit');
			}
			else if( radioIsChecked(expression.radioButtonTerm) ){
				expression.term.show();
			}
			else if( radioIsChecked(expression.radioButtonArray) ){
				expression.arrayExpression.show();
				expression.basicDialogMenu.setNextButton('Submit');
			}
			
			e.stopImmediatePropagation();
		}
	
	});

	$( this.basicDialogMenu.getBackButton() ).mousedown(function(e) {
		var active = DialogMenuController.getActive();
		var expression = active.expression;

		if( $(expression.expressionDiv).is(":visible") == true ){
			console.error('back is disabled');
			
			e.stopImmediatePropagation();
		}

	});
	
	return this;
};

Expression.prototype.init = function(input){
	
	this.hide();
		this.arithmeticExpression.hide();
		this.logicExpression.hide();
		this.term.hide();
			this.term.lValue.hide();
			this.term.constant.hide();
		this.arrayExpression.hide();
	
	$(this.radioButtonArithmeticExpression).children('input[type=radio]').prop("checked", true);
		$(this.term.radioButtonVariable).children('input[type=radio]').prop("checked", true);
			$(this.term.lValue.radioVariable).children('input[type=radio]').prop("checked", true);
			$(this.term.constant.constantRadioNumber).children('input[type=radio]').prop("checked", true);

	if(input.type == InputType.expression){
		this.show();
	}
	else if(input.type == InputType.expressionArithmentic){
		this.arithmeticExpression.show();
		this.basicDialogMenu.setNextButton('Submit');
		$(this.radioButtonArithmeticExpression).children('input[type=radio]').prop("checked", true);
		this.arithmeticExpression.init(input);
	}
	else if(input.type == InputType.expressionLogic){
		this.logicExpression.show();
		this.basicDialogMenu.setNextButton('Submit');
		$(this.radioButtonLogicExpression).children('input[type=radio]').prop("checked", true);
		this.logicExpression.init(input);
	}
	else if(
		input.type == InputType.expressionTermLvalueID ||
		input.type == InputType.expressionTermLvalueGlobalID ||
		input.type == InputType.expressionTermLvalueArrayElement ||
		input.type == InputType.expressionTermLvalueObjectElement ||
		input.type == InputType.expressionTermCallFunction ||
		input.type == InputType.expressionTermCallObjectMethod ||
		input.type == InputType.expressionTermConstNumber ||
		input.type == InputType.expressionTermConstString ||
		input.type == InputType.expressionTermConstBool ||
		input.type == InputType.expressionTermConstDate ||
		input.type == InputType.expressionTermConstTime

	){
		$(this.radioButtonTerm).children('input[type=radio]').prop("checked", true);
		this.term.init(input);
	}
	else if(input.type == InputType.expressionArray){
		this.arrayExpression.show();
		this.basicDialogMenu.setNextButton('Submit');
		$(this.radioButtonArray).children('input[type=radio]').prop("checked", true);
		this.arrayExpression.init(input);
	}
	else{
		console.log('not implemented expression initialization');
	}
	
};

Expression.prototype.show = function(){
	$(this.expressionDiv).show();
	this.basicDialogMenu.enableBackButton(false);
	this.basicDialogMenu.enableNextButton(true);
	this.basicDialogMenu.setNextButton('Next');

};

Expression.prototype.hide = function(){
	$(this.expressionDiv).hide();
	this.basicDialogMenu.enableBackButton(true);
};