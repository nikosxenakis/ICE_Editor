function LogicOperatorMenu(father){

	this.logicOperatorMenuDiv = createHtmlElement({
		format: "div",
		//className: "col-xs-12",
		father: father
	});
	$(this.logicOperatorMenuDiv).width('100%');

	$(this.logicOperatorMenuDiv).addClass('mainDiv');
	$(this.logicOperatorMenuDiv).addClass('container');

	$(this.logicOperatorMenuDiv).addClass('deactivatedExpression');
	$(this.logicOperatorMenuDiv).css('border-radius','0px');
	$(this.logicOperatorMenuDiv).css('margin','4px');
	$(this.logicOperatorMenuDiv).css('padding-bottom','15px');

	this.logicOperatorMenuDivLabel = createHtmlElement({
		format: "div",
		className: "dialogLabel",
		text: "Choose Operator",
		father: this.logicOperatorMenuDiv
	});
	$(this.logicOperatorMenuDivLabel).css('text-align','center');
	$(this.logicOperatorMenuDivLabel).css('float','none');

	this.logicOperatorMenuContent = createHtmlElement({
		format: "div",
		//className: "row",
		father: this.logicOperatorMenuDiv
	});
	$(this.logicOperatorMenuContent).css('margin-top','15px');

	this.logicOperatorMenuAnd = createHtmlElement({
		format: "div",
		className: "col-xs-6",
		father: this.logicOperatorMenuContent
	});
	$(this.logicOperatorMenuAnd).css('text-align','center');
	
	this.logicOperatorMenuAndImage = createHtmlElement({
		format: "img",
		father: this.logicOperatorMenuAnd
	});
	$(this.logicOperatorMenuAndImage).attr('src','images/logicExpressionAndImage.png');
	$(this.logicOperatorMenuAndImage).height('60px');
		
	this.logicOperatorMenuOr = createHtmlElement({
		format: "div",
		className: "col-xs-6",
		father: this.logicOperatorMenuContent
	});
	$(this.logicOperatorMenuOr).css('text-align','center');
	
	this.logicOperatorMenuOrImage = createHtmlElement({
		format: "img",
		father: this.logicOperatorMenuOr
	});
	$(this.logicOperatorMenuOrImage).attr('src','images/logicExpressionOrImage.png');
	$(this.logicOperatorMenuOrImage).height('60px');	
		
   $(this.logicOperatorMenuAndImage).hover(function() {
        $(this).css('cursor','pointer');
    });
		
	$(this.logicOperatorMenuAndImage).mousedown(function(){
		logicOperatorMenuAddFunc('and')
	});
	
   $(this.logicOperatorMenuOrImage).hover(function() {
        $(this).css('cursor','pointer');
    });
	
	$(this.logicOperatorMenuOrImage).mousedown(function(){
		logicOperatorMenuAddFunc('or')
	});
	
	$(this.logicOperatorMenuDiv).hide();

	return this;
};

var logicOperatorMenuAddFunc = function(text){
	var active = DialogMenuController.getActive();
	if(!active)
		return;
	var logicOperatorMenu = active.logicOperatorMenu;
	var logicOperator = logicOperatorMenu.logicOperator;

	if(!logicOperator){
		console.error('there is no logicOperator');
		return;
	}

	if( (logicOperator instanceof LogicExpression) && logicOperator.logicExpressionList.length == 1){
		var logicExpression = logicOperator;
		
		var inputElement = new InputElement(text,InputType.logicOperator);
		logicExpression.input.addInputElement(inputElement);
		var newLogicOperator =  logicExpression.addLogicOperator();
		newLogicOperator.setInput(inputElement);
		newLogicOperator.update(text,InputType.logicOperator);

		var inputElement = new InputElement(DialogMenuData.dummyString,InputType.localId);
		logicExpression.input.addInputElement(inputElement);
		var newLogicExpression =  logicExpression.addLogicExpression();
		newLogicExpression.setInput(inputElement);
	
		logicExpression.deactivate();
		logicOperatorMenu.close();
		return;
	}

	logicOperator.input.setText(text);
	logicOperator.setInput(logicOperator.input);
};
		
LogicOperatorMenu.prototype.open = function(logicOperator){
	if(	this.logicOperator != null ){
		this.logicOperator.deactivate();
		this.close();
	}

	var active = DialogMenuController.getActive();
	var logicExpressionMenu = active.logicExpressionMenu;
	var term = active.term;

	if(	logicExpressionMenu.expression != null ){
		logicExpressionMenu.expression.deactivate();
		logicExpressionMenu.close();
		term.close();
	}
	
	this.logicOperator = logicOperator;

	$(this.logicOperatorMenuDiv).show();
		
};

LogicOperatorMenu.prototype.close = function(){
	this.logicOperator = null;
	$(this.logicOperatorMenuDiv).hide();
};