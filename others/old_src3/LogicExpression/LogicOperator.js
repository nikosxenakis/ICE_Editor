var LogicOperatorType = {
	AND: "AND",
	OR: "OR"
};

function LogicOperator(id,fatherLogicExpression,data){

	this.id = id;
	this.fatherLogicExpression = fatherLogicExpression;
	
	if(!data)
		var data = LogicOperatorType.AND;

	this.input = new InputElement(data , InputType.logicOperator);

	if(this.fatherLogicExpression instanceof LogicExpression){
		this.fatherLogicExpression.logicOperatorList.push(this);	
	}
	

	this.logicOperatorDiv = createHtmlElement({
		format: "div",
		id: id,
		father: fatherLogicExpression.logicExpressionContentDiv,
		width: '50px',
		height: '95px',
		border: "groove"
	});

	$(this.logicOperatorDiv).css('display', 'inline-block');
	$(this.logicOperatorDiv).css('overflow', 'hidden');

	this.logicOperatorContentDiv = createHtmlElement({
		format: "div",
		id: id+"Content",
		father: this.logicOperatorDiv
	});
	//$(this.logicOperatorContentDiv).css('margin', 5);
	//$(this.logicOperatorContentDiv).css('margin-top', 25);

	this.dataDiv = createHtmlElement({
		format: "div",
		text: data,
		father: this.logicOperatorContentDiv
	});
	
	this.optionsDiv = createHtmlElement({
		format: "div",
		father: this.logicOperatorDiv
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
		console.log("open Logic Operator Dialog Menu");

		var active = DialogMenuController.getActive();
		console.log(active);
		console.log(id);
		var logicOperator = active.logicExpression.getLogicOperatorById(id);
		console.log(logicOperator);

		DialogMenuController.open(logicOperator);
	});

	return this;
};

LogicOperator.prototype.activate = function(){
	console.log("LogicOperator active");
};

LogicOperator.prototype.deactivate = function(){
	console.log("LogicOperator deactivate");
};

LogicOperator.prototype.update = function(){
	console.log("LogicOperator update");
	console.log(this.input);
	$(this.dataDiv).text(this.input.input);
};
