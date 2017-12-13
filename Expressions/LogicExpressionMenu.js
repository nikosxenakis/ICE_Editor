function LogicExpressionMenu(father){

	this.logicExpressionMenuDiv = createHtmlElement({
		format: "div",
		//className: "col-xs-12",
		father: father
	});
	$(this.logicExpressionMenuDiv).width('100%');

	$(this.logicExpressionMenuDiv).addClass('mainDiv');
	$(this.logicExpressionMenuDiv).addClass('container');

	$(this.logicExpressionMenuDiv).addClass('deactivatedExpression');
	$(this.logicExpressionMenuDiv).css('border-radius','0px');
	$(this.logicExpressionMenuDiv).css('margin','4px');
	$(this.logicExpressionMenuDiv).css('padding-bottom','15px');

	this.logicExpressionMenuLabel = createHtmlElement({
		format: "div",
		className: "dialogLabel",
		text: "Choose Element",
		father: this.logicExpressionMenuDiv
	});
	$(this.logicExpressionMenuLabel).css('text-align','center');
	$(this.logicExpressionMenuLabel).css('float','none');

	this.logicExpressionMenuContent = createHtmlElement({
		format: "div",
		//className: "row",
		father: this.logicExpressionMenuDiv
	});
	$(this.logicExpressionMenuContent).css('margin-top','15px');

	this.logicExpressionMenuComplex = createHtmlElement({
		format: "div",
		className: "col-xs-6",
		father: this.logicExpressionMenuContent
	});
	$(this.logicExpressionMenuComplex).css('text-align','center');

	this.logicExpressionMenuComplexContent = createHtmlElement({
		format: "button",
		father: this.logicExpressionMenuComplex
	});
	$(this.logicExpressionMenuComplexContent).css('padding','0px');
	$(this.logicExpressionMenuComplexContent).attr('type','button');

	
	this.logicExpressionMenuComplexAndImage = createHtmlElement({
		format: "img",
		father: this.logicExpressionMenuComplexContent
	});
	$(this.logicExpressionMenuComplexAndImage).attr('src','images/logicExpressionAndImage.png');
	$(this.logicExpressionMenuComplexAndImage).height('60px');	
	
	$(this.logicExpressionMenuComplex).mousedown(function(){
		var active = DialogMenuController.getActive();
		var logicExpressionMenu = active.logicExpressionMenu;
		var expression = logicExpressionMenu.expression;

		if(!expression){
			console.error('there is no logicExpression');
			return;
		}
		
		var text = expression.input.getText();
		var type = expression.input.type;
		var inputElements = expression.input.inputElements;
	
		if(expression.input.type == InputType.logicExpression && expression.comparisonExpression){
			var comparisonExpressionDiv = $(expression.comparisonExpression.comparisonExpressionDiv);
			comparisonExpressionDiv.detach();
		}
		
		var inputElement = new InputElement(text,type);
		inputElement.inputElements = inputElements;	


		expression.input.inputElements = new Array();
		//expression.update("",InputType.logicExpression);
		expression.input.input = "";
		expression.input.type = InputType.logicExpression;

		expression.input.addInputElement(inputElement);
		var newLogicExpression =  expression.addLogicExpression();		
		newLogicExpression.setInput(inputElement);
		newLogicExpression.update(text,type);
		
		//take the div from expression to newLogicExpression
		if(comparisonExpressionDiv){
			$(newLogicExpression.logicExpressionDiv).empty(); 
			comparisonExpressionDiv.appendTo( $(newLogicExpression.logicExpressionDiv) );
		}

		var inputElement = new InputElement("and",InputType.logicOperator);
		expression.input.addInputElement(inputElement);
		var newLogicOperator =  expression.addLogicOperator();
		newLogicOperator.setInput(inputElement);
		newLogicOperator.update("and",InputType.logicOperator);

		var inputElement = new InputElement(DialogMenuData.dummyString,InputType.localId);
		expression.input.addInputElement(inputElement);
		var newLogicExpression =  expression.addLogicExpression();
		newLogicExpression.setInput(inputElement);
		
		expression.deactivate();
		logicExpressionMenu.close();
		active.term.close();

		console.log(expression);
		console.log(DialogMenuController.getInstance());

	});

	this.logicExpressionMenuComparison = createHtmlElement({
		format: "div",
		className: "col-xs-6",
		father: this.logicExpressionMenuContent
	});
	$(this.logicExpressionMenuComparison).css('text-align','center');

	this.logicExpressionMenuComparisonContent = createHtmlElement({
		format: "button",
		father: this.logicExpressionMenuComparison
	});
	$(this.logicExpressionMenuComparisonContent).css('padding','0px');
	$(this.logicExpressionMenuComparisonContent).attr('type','button');

	
	this.logicExpressionMenuComparisonContentSmallerImage = createHtmlElement({
		format: "img",
		father: this.logicExpressionMenuComparisonContent
	});
	$(this.logicExpressionMenuComparisonContentSmallerImage).attr('src','images/comparisonImages/comparisonSmallerImage.png');
	$(this.logicExpressionMenuComparisonContentSmallerImage).height('60px');
	
	$(this.logicExpressionMenuComparison).mousedown(function(){
		var active = DialogMenuController.getActive();
		var logicExpressionMenu = active.logicExpressionMenu;
		var expression = logicExpressionMenu.expression;
		var term = active.term;
		if(!expression){
			console.error('there is no logicExpression');
			return;
		}
		
		if(!(expression instanceof LogicExpression)){
			return;
		}
		var logicExpression = expression;
		
		if(logicExpression.logicExpressionList.length != 0 || logicExpression.input.inputElements.length != 0){
			console.log('must disable it');
			logicExpression.deactivate();
			logicExpressionMenu.close();
			return;
		}

		console.log(logicExpression);
		logicExpression.addComparison();
		logicExpression.deactivate();
		logicExpressionMenu.close();
		term.close();
	});
		
	$(this.logicExpressionMenuDiv).hide();

	return this;
};

LogicExpressionMenu.prototype.open = function(expression){
	if(	this.expression != null ){
		this.expression.deactivate();
		this.close();
	}

	var active = DialogMenuController.getActive();
	var logicOperatorMenu = active.logicOperatorMenu;

	if(	logicOperatorMenu.logicOperator != null ){
		logicOperatorMenu.logicOperator.deactivate();
		logicOperatorMenu.close();
	}
	
	this.expression = expression;

	$(this.logicExpressionMenuDiv).show();
	//
};

LogicExpressionMenu.prototype.close = function(){
	this.expression = null;
	$(this.logicExpressionMenuDiv).hide();
	//
};