function ComparisonExpression(id,fatherLogicExpression){

	this.id = id;
	this.idFactoryNum = 0;

	this.fatherLogicExpression = fatherLogicExpression;
	this.input = new InputElement('',InputType.comparisonExpression);
	this.fatherLogicExpression.input.addInputElement(this.input);
	fatherLogicExpression.comparisonExpression = this;
	
	var inputElement = new InputElement(DialogMenuData.dummyString,InputType.localId);
	this.input.addInputElement(inputElement);
	
	var inputElement = new InputElement("<",InputType.comparisonOperator);
	this.input.addInputElement(inputElement);
	
	var inputElement = new InputElement(DialogMenuData.dummyString,InputType.localId);
	this.input.addInputElement(inputElement);
	
	
	$(this.fatherLogicExpression.dataDiv).hide();
	this.input.type = InputType.comparisonExpression;
	this.input.setText('');
	
	this.comparisonExpressionDiv = createHtmlElement({
		format: "button",
		className: "btn",
		id: id,
		father: fatherLogicExpression.logicExpressionContentDiv
	});
	$(this.comparisonExpressionDiv).addClass('deactivatedExpression');	
	$(this.comparisonExpressionDiv).addClass('mainDiv');	
	$(this.comparisonExpressionDiv).addClass('comparisonExpression');	

	this.leftComparisonTerm = new ComparisonTerm(this,this.input.inputElements[0]);
	this.comparisonOperator = new ComparisonOperator(this,this.input.inputElements[1]);
	this.rightComparisonTerm = new ComparisonTerm(this,this.input.inputElements[2]);

	return this;
};

ComparisonExpression.prototype.activate = function(){
	console.log("comparisonExpressionDiv active");

	$(this.comparisonExpressionDiv).removeClass('deactivatedExpression');	
	$(this.comparisonExpressionDiv).addClass('activatedExpression');
};

ComparisonExpression.prototype.deactivate = function(){
	console.log("comparisonExpressionDiv deactivate");

	$(this.comparisonExpressionDiv).removeClass('activatedExpression');	
	$(this.comparisonExpressionDiv).addClass('deactivatedExpression');
};

ComparisonExpression.prototype.getEnabledComparisonTerm = function(){

	if( $(this.leftComparisonTerm.comparisonTermDiv).hasClass('enabledExpression') ){
		return this.leftComparisonTerm;
	}
	else if( $(this.rightComparisonTerm.comparisonTermDiv).hasClass('enabledExpression') ){
		return this.rightComparisonTerm;
	}	
};

ComparisonExpression.prototype.getActivatedComparisonTerm = function(){

	if( $(this.leftComparisonTerm.comparisonTermDiv).hasClass('activatedExpression') ){
		return this.leftComparisonTerm;
	}
	else if( $(this.rightComparisonTerm.comparisonTermDiv).hasClass('activatedExpression') ){
		return this.rightComparisonTerm;
	}	
};

ComparisonExpression.prototype.getActivatedComparisonOperator = function(){
	if( $(this.comparisonOperator.comparisonOperatorDiv).hasClass('activatedExpression') ){
		return this.comparisonOperator;
	}
};

ComparisonExpression.prototype.parseComparisonExpression = function(inputElement,newInputElement){

	this.input = newInputElement;

	this.leftComparisonTerm.update(inputElement.inputElements[0].input,inputElement.inputElements[0].type);
	this.comparisonOperator.update(inputElement.inputElements[1].input,inputElement.inputElements[1].type);
	this.rightComparisonTerm.update(inputElement.inputElements[2].input,inputElement.inputElements[2].type);

};