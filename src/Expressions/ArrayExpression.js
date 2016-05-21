function ArrayExpression(basicDialogMenu){

	if(!basicDialogMenu)
		console.error('wrong args');
		
	this.basicDialogMenu = basicDialogMenu;

	this.idFactoryNum = 0;
	this.arrayTermList = new Array();

	this.arrayExpressionDiv = createHtmlElement({
		format: "div",
		father: basicDialogMenu.getContentDiv(),
		border: "groove #A790D4"
	});

	$(this.arrayExpressionDiv).css('border-width', '1px');
	$(this.arrayExpressionDiv).css('display', 'inline-block');
	$(this.arrayExpressionDiv).css('width', '100%');

	this.arrayExpressionContentDiv = createHtmlElement({
		format: "div",
		father: this.arrayExpressionDiv
	});

	$(this.arrayExpressionContentDiv).css('margin', 5);
	$(this.arrayExpressionContentDiv).css('margin-top', 16);
	$(this.arrayExpressionContentDiv).css('text-align', 'center');
	$(this.arrayExpressionContentDiv).css('overflow', 'auto');
	$(this.arrayExpressionContentDiv).css('white-space', 'nowrap');

	this.optionsDiv = createHtmlElement({
		format: "div",
		father: this.arrayExpressionDiv
	});
	$(this.optionsDiv).css('text-align', 'right');

	this.buttonAdd = createHtmlElement({
		format: "span",
		className: "glyphicon btn-glyphicon glyphicon-plus img-circle text-success",
		father: this.optionsDiv
	});

	$(this.buttonAdd).mousedown(function(){
		var active = DialogMenuController.getActive();
		var arrayExpression = active.arrayExpression;
	
		var inputElement = new InputElement('true',InputType.bool);
		arrayExpression.input.inputElements.push(inputElement);

		arrayExpression.addArrayElement( inputElement );
	});
	
	return this;
};

ArrayExpression.prototype.addArrayElement = function(inputElement){

	var id = this.idFactoryNum;
	this.idFactoryNum++;

	var newArrayElement = new ArrayTerm(id,this,inputElement);
	return newArrayElement;
};

ArrayExpression.prototype.getArrayElementById = function(id){

	for(var k=0; k<this.arrayTermList.length; k++){
		if(this.arrayTermList[k].id == id)
			return this.arrayTermList[k];
	}
};
/*
ArrayExpression.prototype.parseArrayExpression = function(expr,inputElementsArray){
	if(inputElementsArray.length != expr.elements.length){
		console.log('Error in given types');
		return;
	}

	for (var k=0; k<expr.elements.length; k++) {
		this.addArrayElement(JsepParser.toString(expr.elements[k]),inputElementsArray[k].type);
	};
};
*/


ArrayExpression.prototype.getInputElements = function(array){

	for(var k=0; k<this.arrayTermList.length; k++){
		array.push(this.arrayTermList[k].input);
	}
};


ArrayExpression.prototype.activate = function(){
	console.log("LogicExpression active");
};

ArrayExpression.prototype.deactivate = function(){
	console.log("LogicExpression deactivate");
};

ArrayExpression.prototype.update = function(){
	console.log("LogicOperator update");
	console.log(this.input);

	$(this.buttonContent).hide();
	$(this.dataDiv).show();
	$(this.dataDiv).text(this.input.getText());
};

ArrayExpression.prototype.init = function(input){

	this.input = input;

	for (var k=0; k<input.inputElements.length; k++){
		this.addArrayElement(input.inputElements[k]);
	}

	
};

ArrayExpression.prototype.show = function(){
	$(this.arrayExpressionDiv).show();
};

ArrayExpression.prototype.hide = function(){
	$(this.arrayExpressionDiv).hide();

};