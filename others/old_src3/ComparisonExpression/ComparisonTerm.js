function ComparisonTerm(id,father){

	this.id = id;

	this.father = father;

	this.comparisonTermDiv = createHtmlElement({
		format: "div",
		id: id,
		father: father,
		border: "groove"
	});

    $(this.comparisonTermDiv).css('display', "inline-block");	
	$(this.comparisonTermDiv).css('overflow', 'hidden');

	this.dataDiv = createHtmlElement({
		format: "div",
//		text: this.input.input,
		father: this.comparisonTermDiv
	});

	$(this.dataDiv).hide();

	this.optionsDiv = createHtmlElement({
		format: "div",
		father: this.comparisonTermDiv
	});
	$(this.optionsDiv).css('margin-top', 20);
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
		console.log("edit ComparisonTerm");

		/*
		var active = DialogMenuController.getActive();
		var logicExpression = active.getLogicExpressionById(id);

		if(logicExpression.logicExpressionList.length >0)
			return;


		DialogMenuController.open(logicExpression);
		*/
	});

	return this;
};

