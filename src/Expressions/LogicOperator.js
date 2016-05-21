function LogicOperator(id,fatherLogicExpression,inputElement){

	this.id = id;
	this.fatherLogicExpression = fatherLogicExpression;
	
	if(!inputElement){
		console.error('LogicOperator error no given type');
	}

	this.input = inputElement;

	if(this.fatherLogicExpression instanceof LogicExpression){
		this.fatherLogicExpression.logicOperatorList.push(this);	
	}
	

	this.logicOperatorDiv = createHtmlElement({
		format: "div",
		id: id,
		border: "groove #7D4C3C",
		father: fatherLogicExpression.logicExpressionContentDiv
	});

	$(this.logicOperatorDiv).css('border-width', '2px');
	$(this.logicOperatorDiv).css('display', 'inline-block');
	//$(this.logicOperatorDiv).css('overflow', 'hidden');
	$(this.logicOperatorDiv).css('vertical-align', 'middle');
	$(this.logicOperatorDiv).css('border-radius', '10px');
	$(this.logicOperatorDiv).css('box-shadow', '2px 2px 1px #888888');

	$(this.logicOperatorDiv).mouseover(function(){
		var active = DialogMenuController.getActive();

		if(!active.logicExpression)
			return;

		var logicOperator = active.logicExpression.getLogicOperatorById(id);

		$(logicOperator.optionsDiv).show();

	});

	$(this.logicOperatorDiv).mouseout(function(){
		var active = DialogMenuController.getActive();

		if(!active.logicExpression)
			return;

		var logicOperator = active.logicExpression.getLogicOperatorById(id);

		$(logicOperator.optionsDiv).hide();

	});

	this.optionsDiv = createHtmlElement({
		format: "div",
		father: this.logicOperatorDiv
	});

	this.logicOperatorContentDiv = createHtmlElement({
		format: "div",
		id: id+"Content",
		father: this.logicOperatorDiv
	});
	$(this.logicOperatorContentDiv).css('margin', 12);

	this.dataDiv = createHtmlElement({
		format: "div",
		text: this.input.getText(),
		father: this.logicOperatorContentDiv
	});
	
	this.dropdown = createHtmlElement({
		format: "div",
		className: "dropdown dropdownMultiDepth",
		father: this.optionsDiv
	});
	$(this.dropdown).css('float','right');

	this.dropdownA = createHtmlElement({
		format: "span",
		className: "glyphicon glyphicon-menu-down",
		id: "dLabel",
		father: this.dropdown
	});
	$(this.dropdownA).attr('data-toggle','dropdown');
	$(this.dropdownA).css('font-size','14px');
	$(this.dropdownA).css('left','-3px');
	$(this.dropdownA).css('color','sienna');

	this.dropdownUl = createHtmlElement({
		format: "ul",
		className: "dropdown-menu",
		id: "dLabel",
		father: this.dropdown
	});
	$(this.dropdownUl).css('min-width','60px');
	$(this.dropdownUl).attr('aria-labelledby','dropdownMenu');
	$(this.dropdownUl).css('text-align','center');

	this.dropdownList = createHtmlElement({
		format: "li",
		father: this.dropdownUl
	});
	$(this.dropdownList).css('margin-left','5px');
	$(this.dropdownList).css('margin-right','5px');

	this.buttonAnd = createHtmlElement({
		format: "a",
		text: "and",
		father: this.dropdownList
	});
	this.buttonOr = createHtmlElement({
		format: "a",
		text: "or",
		father: this.dropdownList
	});

	$(this.buttonAnd).mousedown(function(){
		var active = DialogMenuController.getActive();
		var logicOperator = active.logicExpression.getLogicOperatorById(id);
		logicOperator.input.setText('and');
		$(logicOperator.dataDiv).text(logicOperator.input.getText());
	});

	$(this.buttonOr).mousedown(function(){
		var active = DialogMenuController.getActive();
		var logicOperator = active.logicExpression.getLogicOperatorById(id);
		logicOperator.input.setText('or');
		$(logicOperator.dataDiv).text(logicOperator.input.getText());
	});
	/*
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

		if(active.logicExpression){
			var logicOperator = active.logicExpression.getLogicOperatorById(id);
		}
		else if(active.expression){
			var logicOperator = active.expression.logicExpression.getLogicOperatorById(id);
		}
		
		console.log(logicOperator);

		DialogMenuController.open(logicOperator);
	});
	*/
	$(this.optionsDiv).hide();

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
