function ArithmeticOperatorMenu(father){

	this.arithmeticOperatorMenuDiv = createHtmlElement({
		format: "div",
		father: father
	});
	$(this.arithmeticOperatorMenuDiv).width('100%');

	$(this.arithmeticOperatorMenuDiv).addClass('mainDiv');
	$(this.arithmeticOperatorMenuDiv).addClass('container');

	$(this.arithmeticOperatorMenuDiv).addClass('deactivatedExpression');
	$(this.arithmeticOperatorMenuDiv).css('border-radius','0px');
	$(this.arithmeticOperatorMenuDiv).css('margin','4px');
	$(this.arithmeticOperatorMenuDiv).css('padding-bottom','15px');

	this.arithmeticOperatorMenuDivLabel = createHtmlElement({
		format: "div",
		className: "dialogLabel",
		text: "Choose Operator",
		father: this.arithmeticOperatorMenuDiv
	});
	$(this.arithmeticOperatorMenuDivLabel).css('text-align','center');
	$(this.arithmeticOperatorMenuDivLabel).css('float','none');

	this.arithmeticOperatorMenuContent = createHtmlElement({
		format: "div",
		father: this.arithmeticOperatorMenuDiv
	});
	$(this.arithmeticOperatorMenuContent).css('margin-top','15px');


    this.createOperator("+",'images/arithmeticImages/arithmeticExpressionPlusImage.png',this.arithmeticOperatorMenuContent);
    this.createOperator("-",'images/arithmeticImages/arithmeticExpressionMinusImage.png',this.arithmeticOperatorMenuContent);
    this.createOperator("*",'images/arithmeticImages/arithmeticExpressionMultiImage.png',this.arithmeticOperatorMenuContent);
    this.createOperator("/",'images/arithmeticImages/arithmeticExpressionDivImage.png',this.arithmeticOperatorMenuContent);
    this.createOperator("%",'images/arithmeticImages/arithmeticExpressionModuleImage.png',this.arithmeticOperatorMenuContent);
    this.createOperator("^",'images/arithmeticImages/arithmeticExpressionPowerImage.png',this.arithmeticOperatorMenuContent);

	$(this.arithmeticOperatorMenuDiv).hide();

	return this;
};

ArithmeticOperatorMenu.prototype.createOperator = function(operatorText,src,father){

	var arithmeticOperatorMenu = createHtmlElement({
		format: "div",
		className: "col-xs-6",
		father: father
	});
	$(arithmeticOperatorMenu).css('text-align','center');
	
	var arithmeticOperatorMenuImage = createHtmlElement({
		format: "img",
		father: arithmeticOperatorMenu
	});
	$(arithmeticOperatorMenuImage).attr('src',src);
	$(arithmeticOperatorMenuImage).height('60px');
		
   $(arithmeticOperatorMenuImage).hover(function() {
        $(this).css('cursor','pointer');
    });
		
	$(arithmeticOperatorMenuImage).mousedown(function(){
		arithmeticOperatorMenuAddFunc(operatorText);
	});
	
};

var arithmeticOperatorMenuAddFunc = function(text){
	var active = DialogMenuController.getActive();
	if(!active)
		return;
	var arithmeticOperatorMenu = active.arithmeticOperatorMenu;
	var arithmeticOperator = arithmeticOperatorMenu.arithmeticOperator;

	if(!arithmeticOperator){
		console.error('there is no arithmeticOperator');
		return;
	}

	if( (arithmeticOperator instanceof ArithmeticExpression) && arithmeticOperator.arithmeticExpressionList.length == 1){
		var arithmeticExpression = arithmeticOperator;
		
		var inputElement = new InputElement(text,InputType.arithmeticOperator);
		arithmeticExpression.input.addInputElement(inputElement);
		var newArithmeticOperator =  arithmeticExpression.addArithmeticOperator();
		newArithmeticOperator.setInput(inputElement);
		newArithmeticOperator.update(text,InputType.arithmeticOperator);

		var inputElement = new InputElement(DialogMenuData.dummyString,InputType.localId);
		arithmeticExpression.input.addInputElement(inputElement);
		var newArithmeticExpression =  arithmeticExpression.addArithmeticExpression();
		newArithmeticExpression.setInput(inputElement);
	
		arithmeticExpression.deactivate();
		arithmeticOperatorMenu.close();
		return;
	}

	arithmeticOperator.input.setText(text);
	arithmeticOperator.setInput(arithmeticOperator.input);
};
		
ArithmeticOperatorMenu.prototype.open = function(arithmeticOperator){
	if(	this.arithmeticOperator != null ){
		this.arithmeticOperator.deactivate();
		this.close();
	}

	var active = DialogMenuController.getActive();
	var arithmeticExpressionMenu = active.arithmeticExpressionMenu;
	var term = active.term;

	if(	arithmeticExpressionMenu.expression != null ){
		arithmeticExpressionMenu.expression.deactivate();
		arithmeticExpressionMenu.close();
		term.close();
	}
	
	this.arithmeticOperator = arithmeticOperator;

	$(this.arithmeticOperatorMenuDiv).show();
		
};

ArithmeticOperatorMenu.prototype.close = function(){
	this.arithmeticOperator = null;
	$(this.arithmeticOperatorMenuDiv).hide();
};