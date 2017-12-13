function ArithmeticExpressionMenu(father){

	this.arithmeticExpressionMenuDiv = createHtmlElement({
		format: "div",
		//className: "col-xs-12",
		father: father
	});
	$(this.arithmeticExpressionMenuDiv).width('100%');

	$(this.arithmeticExpressionMenuDiv).addClass('mainDiv');
	$(this.arithmeticExpressionMenuDiv).addClass('container');

	$(this.arithmeticExpressionMenuDiv).addClass('deactivatedExpression');
	$(this.arithmeticExpressionMenuDiv).css('border-radius','0px');
	$(this.arithmeticExpressionMenuDiv).css('margin','4px');
	$(this.arithmeticExpressionMenuDiv).css('padding-bottom','15px');

	this.arithmeticExpressionMenuLabel = createHtmlElement({
		format: "div",
		className: "dialogLabel",
		text: "Choose Element",
		father: this.arithmeticExpressionMenuDiv
	});
	$(this.arithmeticExpressionMenuLabel).css('text-align','center');
	$(this.arithmeticExpressionMenuLabel).css('float','none');

	this.arithmeticExpressionMenuContent = createHtmlElement({
		format: "div",
		father: this.arithmeticExpressionMenuDiv
	});
	$(this.arithmeticExpressionMenuContent).css('margin-top','15px');



    this.createArithmeticOperator("+",'images/arithmeticImages/arithmeticExpressionPlusImage.png',this.arithmeticExpressionMenuContent);
    this.createArithmeticOperator("-",'images/arithmeticImages/arithmeticExpressionMinusImage.png',this.arithmeticExpressionMenuContent);
    this.createArithmeticOperator("*",'images/arithmeticImages/arithmeticExpressionMultiImage.png',this.arithmeticExpressionMenuContent);
    this.createArithmeticOperator("/",'images/arithmeticImages/arithmeticExpressionDivImage.png',this.arithmeticExpressionMenuContent);
    this.createArithmeticOperator("%",'images/arithmeticImages/arithmeticExpressionModuleImage.png',this.arithmeticExpressionMenuContent);
    this.createArithmeticOperator("^",'images/arithmeticImages/arithmeticExpressionPowerImage.png',this.arithmeticExpressionMenuContent);

	$(this.arithmeticExpressionMenuDiv).hide();

	return this;
};

ArithmeticExpressionMenu.prototype.createArithmeticOperator = function(operatorText, src, father){
	var arithmeticExpressionMenu = createHtmlElement({
		format: "div",
		className: "col-xs-4",
		father: father
	});
	$(arithmeticExpressionMenu).css('text-align','center');
	$(arithmeticExpressionMenu).css('margin-bottom','0px');
	
	var arithmeticExpressionMenuImage = createHtmlElement({
		format: "img",
		father: arithmeticExpressionMenu
	});
	$(arithmeticExpressionMenuImage).attr('src',src);
	$(arithmeticExpressionMenuImage).height('50px');	
	$(arithmeticExpressionMenuImage).width('108px');	

	$(arithmeticExpressionMenu).mousedown(function(){
		var active = DialogMenuController.getActive();
		var arithmeticExpressionMenu = active.arithmeticExpressionMenu;
		var expression = arithmeticExpressionMenu.expression;

		if(!expression){
			console.error('there is no arithmeticExpression');
			return;
		}
		
		var text = expression.input.getText();
		var type = expression.input.type;
		var inputElements = expression.input.inputElements;
	
		if(expression.input.type == InputType.arithmeticExpression && expression.comparisonExpression){
			var comparisonExpressionDiv = $(expression.comparisonExpression.comparisonExpressionDiv);
			comparisonExpressionDiv.detach();
		}
		
		var inputElement = new InputElement(text,type);
		inputElement.inputElements = inputElements;	


		expression.input.inputElements = new Array();
		//expression.update("",InputType.arithmeticExpression);
		expression.input.input = "";
		expression.input.type = InputType.arithmeticExpression;

		expression.input.addInputElement(inputElement);
		var newArithmeticExpression =  expression.addArithmeticExpression();		
		newArithmeticExpression.setInput(inputElement);
		newArithmeticExpression.update(text,type);
		
		//take the div from expression to newArithmeticExpression
		if(comparisonExpressionDiv){
			$(newArithmeticExpression.arithmeticExpressionDiv).empty(); 
			comparisonExpressionDiv.appendTo( $(newArithmeticExpression.arithmeticExpressionDiv) );
		}

		var inputElement = new InputElement(operatorText,InputType.arithmeticOperator);
		expression.input.addInputElement(inputElement);
		var newArithmeticOperator =  expression.addArithmeticOperator();
		newArithmeticOperator.setInput(inputElement);
		newArithmeticOperator.update(operatorText,InputType.arithmeticOperator);

		var inputElement = new InputElement(DialogMenuData.dummyString,InputType.localId);
		expression.input.addInputElement(inputElement);
		var newArithmeticExpression =  expression.addArithmeticExpression();
		newArithmeticExpression.setInput(inputElement);
		
		expression.deactivate();
		arithmeticExpressionMenu.close();
		active.term.close();

		console.log(expression);
		console.log(DialogMenuController.getInstance());

	});

	$(arithmeticExpressionMenuImage).mouseover(function(){
        $(this).css('cursor','pointer');
    });
};

ArithmeticExpressionMenu.prototype.open = function(expression){
	if(	this.expression != null ){
		this.expression.deactivate();
		this.close();
	}

	var active = DialogMenuController.getActive();
	var arithmeticOperatorMenu = active.arithmeticOperatorMenu;

	if(	arithmeticOperatorMenu.arithmeticOperator != null ){
		arithmeticOperatorMenu.arithmeticOperator.deactivate();
		arithmeticOperatorMenu.close();
	}
	
	this.expression = expression;

	$(this.arithmeticExpressionMenuDiv).show();
	//
};

ArithmeticExpressionMenu.prototype.close = function(){
	this.expression = null;
	$(this.arithmeticExpressionMenuDiv).hide();
	//
};