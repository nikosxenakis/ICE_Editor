function ArrayTerm(id,fatherArrayExpression,inputElement){

	this.id = id;
	this.fatherArrayExpression = fatherArrayExpression;

	this.input = inputElement;
	
	fatherArrayExpression.arrayTermList.push(this);

	if( fatherArrayExpression.arrayTermList.length > 1 ){

		this.arrayElementCommaDiv = createHtmlElement({
			format: "div",
			text: ",",
			father: fatherArrayExpression.arrayExpressionContentDiv
		});
		$(this.arrayElementCommaDiv).css('display', 'inline-block');
		$(this.arrayElementCommaDiv).css('margin', '6px');
		$(this.arrayElementCommaDiv).css('display', 'inline-block');
		$(this.arrayElementCommaDiv).css('vertical-align', 'bottom');

	}

	this.arrayElementDiv = createHtmlElement({
		format: "div",
		id: id,
		father: fatherArrayExpression.arrayExpressionContentDiv
	});
	$(this.arrayElementDiv).addClass('deactivatedExpression');
	$(this.arrayElementDiv).addClass('mainDiv');	

	$(this.arrayElementDiv).mouseover(function(){
		var active = DialogMenuController.getActive();

		if(!active.arrayExpression)
			return;

		var arrayTerm = active.arrayExpression.getArrayElementById(id);

		$(arrayTerm.dropdown).css('left',$(arrayTerm.arrayElementDiv).position().left + $(arrayTerm.arrayElementDiv).width());

		var top = $(arrayTerm.arrayElementDiv).position().top + 20;
		var left = $(arrayTerm.arrayElementDiv).position().left + $(arrayTerm.arrayElementDiv).width() - 10;

		$(arrayTerm.dropdownUl).css('left',left);
		$(arrayTerm.dropdownUl).css('top',top);

		$(arrayTerm.optionsDiv).show();
	});

	$(this.arrayElementDiv).mouseout(function(){
		var active = DialogMenuController.getActive();

		if(!active.arrayExpression)
			return;

		var arrayTerm = active.arrayExpression.getArrayElementById(id);

		$(arrayTerm.optionsDiv).hide();
	});

	this.optionsDiv = createHtmlElement({
		format: "div",
		father: this.arrayElementDiv
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

	this.buttonEdit = createHtmlElement({
		format: "a",
		text: "edit",
		father: this.dropdownList
	});

	$(this.buttonEdit).mousedown(function(){
		console.log('edit array element');
		var active = DialogMenuController.getActive();
		var arrayExpression = active.arrayExpression;
		var arrayElement = arrayExpression.getArrayElementById(id);
		DialogMenuController.open(arrayElement);

	});

	this.buttonClose = createHtmlElement({
		format: "a",
		text: "remove",
		father: this.dropdownList
	});

	$(this.buttonClose).mousedown(function(){

		var active = DialogMenuController.getActive();
		var arrayExpression = active.arrayExpression;
		var arrayElement = arrayExpression.getArrayElementById(id);
		arrayElement.remove();
	});

	this.arrayElementContentDiv = createHtmlElement({
		format: "div",
		id: id+"Content",
		text: this.input.getText(),
		father: this.arrayElementDiv
	});
	$(this.arrayElementContentDiv).addClass('contentDiv');


	$(this.optionsDiv).hide();

	return this;
};

ArrayTerm.prototype.remove = function(){
	console.log('remove ',this.id);

	var array = this.fatherArrayExpression.arrayTermList;

	var i = array.indexOf(this);
	if(i != -1) {
		array.splice(i, 1);
	}

	var array = this.fatherArrayExpression.input.inputElements;

	var i = array.indexOf(this.input);
	if(i != -1) {
		array.splice(i, 1);
	}
	$(this.arrayElementCommaDiv).remove();
	$(this.arrayElementDiv).remove();

};

ArrayTerm.prototype.activate = function(){
	console.log("ArrayElement active");
	$(this.arrayElementDiv).removeClass('deactivatedExpression');	
	$(this.arrayElementDiv).addClass('activatedExpression');
};

ArrayTerm.prototype.deactivate = function(){
	console.log("ArrayElement deactivate");
	$(this.arrayElementDiv).removeClass('activatedExpression');	
	$(this.arrayElementDiv).addClass('deactivatedExpression');
};

ArrayTerm.prototype.update = function(){
	console.log("ArrayElement update");
	console.log(this.input);

	$(this.arrayElementContentDiv).text(this.input.getText());
};
