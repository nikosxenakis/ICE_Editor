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

	$(this.logicOperatorDiv).addClass('mainDiv');
	$(this.logicOperatorDiv).addClass('deactivatedExpression');

	$(this.logicOperatorDiv).mouseover(function(){
		var active = DialogMenuController.getActive();

		if(!active.logicExpression)
			return;

		var logicOperator = active.logicExpression.getLogicOperatorById(id);
		console.log(logicOperator);

		$(logicOperator.dropdown).css('left',$(logicOperator.logicOperatorDiv).position().left + $(logicOperator.logicOperatorDiv).width());

		var top = $(logicOperator.logicOperatorDiv).position().top + 20;
		var left = $(logicOperator.logicOperatorDiv).position().left + $(logicOperator.logicOperatorDiv).width() - 10;

		$(logicOperator.dropdownUl).css('left',left);
		$(logicOperator.dropdownUl).css('top',top);

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
 	$(this.logicOperatorContentDiv).addClass('contentDiv');

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

	this.dropdownA = createHtmlElement({
		format: "span",
		className: "glyphicon glyphicon-menu-down",
		id: "dLabel",
		father: this.dropdown
	});
	$(this.dropdownA).attr('data-toggle','dropdown');

	this.dropdownUl = createHtmlElement({
		format: "ul",
		className: "dropdown-menu",
		id: "dLabel",
		father: this.dropdown
	});
	$(this.dropdownUl).attr('aria-labelledby','dropdownMenu');

	this.dropdownList = createHtmlElement({
		format: "li",
		father: this.dropdownUl
	});

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

	$(this.optionsDiv).hide();

	return this;
};

LogicOperator.prototype.activate = function(){
	console.log("LogicOperator active");
	$(this.logicOperatorDiv).removeClass('deactivatedExpression');	
	$(this.logicOperatorDiv).addClass('activatedExpression');
};

LogicOperator.prototype.deactivate = function(){
	console.log("LogicOperator deactivate");
	$(this.logicOperatorDiv).removeClass('activatedExpression');	
	$(this.logicOperatorDiv).addClass('deactivatedExpression');
};

LogicOperator.prototype.update = function(){
	console.log("LogicOperator update");
	console.log(this.input);
	$(this.dataDiv).text(this.input.input);
};
