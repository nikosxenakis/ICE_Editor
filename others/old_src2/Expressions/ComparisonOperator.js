var ComparisonOperatorType = {
	greater: ">",
	smaller: "<",
	greaterEqual: ">=",
	smallerEqual: "<=",
	equal: "==",
	different: "!="
};

function ComparisonOperator(id,father,data){

	this.id = id;
	this.father = father;
	
	if(!data)
		var data = ComparisonOperatorType.greater;

	//this.input = new InputElement(data , InputType.logicOperator);

	

	this.comparisonOperatorDiv = createHtmlElement({
		format: "div",
		id: id,
		father: father,
		width: '50px',
		height: '95px',
		border: "groove"
	});

	$(this.comparisonOperatorDiv).css('display', 'inline-block');
	$(this.comparisonOperatorDiv).css('overflow', 'hidden');

	this.comparisonOperatorContentDiv = createHtmlElement({
		format: "div",
		id: id+"Content",
		father: this.comparisonOperatorDiv
	});

	this.dataDiv = createHtmlElement({
		format: "div",
		text: data,
		father: this.comparisonOperatorContentDiv
	});
	
	this.optionsDiv = createHtmlElement({
		format: "div",
		father: this.comparisonOperatorDiv
	});
	$(this.optionsDiv).css('margin-top', 45);
	$(this.optionsDiv).css('text-align', 'right');

	this.buttonEdit = createHtmlElement({
		format: "span",
		id: "buttonEdit",
		className: "glyphicon glyphicon-pencil",
		father: this.optionsDiv
	});
	//$(this.buttonEdit).css('overflow', 'auto');
	$(this.buttonEdit).css('color', 'grey');
	//$(this.buttonEdit).css('float', 'right');
	$(this.buttonEdit).mousedown(function(){
		console.log("edit ComparisonOperator");
		/*
		var active = DialogMenuController.getActive();
		console.log(active);
		console.log(id);
		var logicOperator = active.logicExpression.getLogicOperatorById(id);
		console.log(logicOperator);

		DialogMenuController.open(logicOperator);
		*/
	});

	return this;
};

LogicOperator.prototype.activate = function(){
	console.log("ComparisonOperator active");
};

LogicOperator.prototype.deactivate = function(){
	console.log("ComparisonOperator deactivate");
};

LogicOperator.prototype.update = function(){
	console.log("ComparisonOperator update");
	console.log(this.input);
	$(this.dataDiv).text(this.input.input);
};
