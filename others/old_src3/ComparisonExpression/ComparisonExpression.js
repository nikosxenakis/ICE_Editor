function ComparisonExpression(id,father){

	this.id = id;
	//this.idFactoryNum = 0;
	//this.arrayElementList = new Array();

//	this.input = new InputElement("" , InputType.logicExpressionTerm);

	this.father = father;

	this.comparisonExpressionDiv = createHtmlElement({
		format: "div",
		id: id,
		father: father,
		border: "groove"
	});

	$(this.comparisonExpressionDiv).css('display', 'inline-block');
	$(this.comparisonExpressionDiv).css('width', '100%');

	this.comparisonExpressionContentDiv = createHtmlElement({
		format: "div",
		id: id+"Content",
		father: this.comparisonExpressionDiv
	});

	$(this.comparisonExpressionContentDiv).css('margin', 5);
	$(this.comparisonExpressionContentDiv).css('margin-top', 25);
	$(this.comparisonExpressionContentDiv).css('text-align', 'center');
	$(this.comparisonExpressionContentDiv).css('overflow', 'auto');
	$(this.comparisonExpressionContentDiv).css('width', '95%');
	$(this.comparisonExpressionContentDiv).css('height', '100%');
	$(this.comparisonExpressionContentDiv).css('white-space', 'nowrap');

	//it will contain 3 elements
	//	2 terms
	//	1 ComparisonOperator
	this.leftComparisonTerm = new ComparisonTerm("leftComparisonTerm",this.comparisonExpressionContentDiv);
	
	this.comparisonOperator = new ComparisonOperator("comparisonOperator",this.comparisonExpressionContentDiv);
	
	this.rightComparisonTerm = new ComparisonTerm("rightComparisonTerm",this.comparisonExpressionContentDiv);


	return this;
};

/*
ComparisonExpression.prototype.getArrayElementById = function(id){

	for(var k=0; k<this.arrayElementList.length; k++){
		if(this.arrayElementList[k].id == id)
			return this.arrayElementList[k];
	}
};

ComparisonExpression.prototype.parseArrayExpression = function(expr,inputElementsArray){
	if(inputElementsArray.length != expr.elements.length){
		console.log('Error in given types');
		return;
	}

	for (var k=0; k<expr.elements.length; k++) {

		if(expr.elements[k].type == "Literal")
			this.addArrayElement(expr.elements[k].raw,inputElementsArray[k].type);
		else if(expr.elements[k].type == "Identifier")
			this.addArrayElement(expr.elements[k].name,inputElementsArray[k].type);

	};
};

ComparisonExpression.prototype.toString = function(){
	var str = "[";
	for(var k=0; k<this.arrayElementList.length; k++){
			str += this.arrayElementList[k].toString();
			if(k<this.arrayElementList.length-1)
				str+= ",";
	}
	str += "]";
	return str;
};

ComparisonExpression.prototype.getInputElements = function(array){

	for(var k=0; k<this.arrayElementList.length; k++){
		array.push(this.arrayElementList[k].input);
	}
};
*/