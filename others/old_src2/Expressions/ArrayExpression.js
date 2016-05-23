function ArrayExpression(basicDialogMenu){

	if(!basicDialogMenu)
		console.error('wrong args');
		
	this.basicDialogMenu = basicDialogMenu;

	this.idFactoryNum = 0;
	this.arrayElementList = new Array();

//	this.input = new InputElement("" , InputType.logicExpressionTerm);


	this.arrayExpressionDiv = createHtmlElement({
		format: "div",
		father: basicDialogMenu.getContentDiv(),
		border: "groove"
	});

	$(this.arrayExpressionDiv).css('display', 'inline-block');
	$(this.arrayExpressionDiv).css('width', '100%');

	this.arrayExpressionContentDiv = createHtmlElement({
		format: "div",
		father: this.arrayExpressionDiv
	});
	$(this.arrayExpressionContentDiv).css('margin', 5);
	$(this.arrayExpressionContentDiv).css('margin-top', 25);
	$(this.arrayExpressionContentDiv).css('text-align', 'center');
	$(this.arrayExpressionContentDiv).css('overflow', 'auto');
	$(this.arrayExpressionContentDiv).css('width', '95%');
	$(this.arrayExpressionContentDiv).css('height', '100%');
	$(this.arrayExpressionContentDiv).css('white-space', 'nowrap');


	this.buttonAdd = createHtmlElement({
		format: "span",
		className: "glyphicon btn-glyphicon glyphicon-plus img-circle text-success",
		father: this.arrayExpressionDiv,
		textAllign: 'right'
	});
	$(this.buttonAdd).css('float', 'right');
	$(this.buttonAdd).mousedown(function(){
		var active = DialogMenuController.getActive();
		var expression = active.expression;
		var arrayExpression = expression.arrayExpression;
		
		arrayExpression.addArrayElement();
	});
	
	return this;
};

ArrayExpression.prototype.addArrayElement = function(text,inputType){

	var id = this.idFactoryNum;
	this.idFactoryNum++;

	var newArrayElement = new ArrayElement(id,this,text,inputType);
	return newArrayElement;
};

ArrayExpression.prototype.getArrayElementById = function(id){

	for(var k=0; k<this.arrayElementList.length; k++){
		if(this.arrayElementList[k].id == id)
			return this.arrayElementList[k];
	}
};

ArrayExpression.prototype.parseArrayExpression = function(expr,inputElementsArray){
	if(inputElementsArray.length != expr.elements.length){
		console.log('Error in given types');
		return;
	}

	for (var k=0; k<expr.elements.length; k++) {
		this.addArrayElement(JsepParser.toString(expr.elements[k]),inputElementsArray[k].type);
	};
};

ArrayExpression.prototype.toString = function(){
	var str = "[";
	for(var k=0; k<this.arrayElementList.length; k++){
			str += this.arrayElementList[k].toString();
			if(k<this.arrayElementList.length-1)
				str+= ",";
	}
	str += "]";
	return str;
};

ArrayExpression.prototype.getInputElements = function(array){

	for(var k=0; k<this.arrayElementList.length; k++){
		array.push(this.arrayElementList[k].input);
	}
};

/*
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

ArrayExpression.prototype.getDiv = function(){
	return this.logicExpressionDiv;
};



ArrayExpression.prototype.parseExpression = function(expr){

	var text = "";

	var name = expr.name;
	var raw = expr.raw;

	if(name)
		return name;
	if(raw)
		return raw;

	var left = expr.left;
	if(left)
		text += this.parseExpression(left);

	var operator = expr.operator;
	if(operator)
		text += operator;

	var right = expr.right;
	if(right)
		text += this.parseExpression(right);

	return text;
};
*/

ArrayExpression.prototype.init = function(input){
};

ArrayExpression.prototype.show = function(){
	$(this.arrayExpressionDiv).show();
};

ArrayExpression.prototype.hide = function(){
	$(this.arrayExpressionDiv).hide();

};