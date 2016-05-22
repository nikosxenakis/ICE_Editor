function ArrayExpression(basicDialogMenu){

	if(!basicDialogMenu)
		console.error('wrong args');
		
	this.basicDialogMenu = basicDialogMenu;

	this.idFactoryNum = 0;
	this.arrayTermList = new Array();

	this.arrayExpressionDiv = createHtmlElement({
		format: "div",
		father: basicDialogMenu.getContentDiv()
	});
	
	$(this.arrayExpressionDiv).addClass('deactivatedExpression');
	$(this.arrayExpressionDiv).addClass('mainDiv');	
	$(this.arrayExpressionDiv).css('width', '100%');

	this.optionsDiv = createHtmlElement({
		format: "div",
		father: this.arrayExpressionDiv
	});

	this.arrayExpressionContentDiv = createHtmlElement({
		format: "div",
		father: this.arrayExpressionDiv
	});

	$(this.arrayExpressionContentDiv).css('overflow', 'auto');
	$(this.arrayExpressionContentDiv).css('white-space', 'nowrap');
	$(this.arrayExpressionContentDiv).css('margin', 20);
	$(this.arrayExpressionContentDiv).css('padding-bottom', 20);
	$(this.arrayExpressionContentDiv).css('margin-bottom', 0);

	this.buttonAdd = createHtmlElement({
		format: "span",
		className: "glyphicon glyphicon-plus",
		id: "dLabel",
		father: this.optionsDiv
	});
	$(this.buttonAdd).css('float','right');
	$(this.buttonAdd).css('position','relative');
	$(this.buttonAdd).css('font-size','14px');
	$(this.buttonAdd).css('left','-2px');
	$(this.buttonAdd).css('top','2px');
	$(this.buttonAdd).css('color','mediumseagreen');

	$(this.buttonAdd).mousedown(function(){
		var active = DialogMenuController.getActive();
		var arrayExpression = active.arrayExpression;
	
		arrayExpression.addArrayElement();
	});
	
	return this;
};

ArrayExpression.prototype.addArrayElement = function(inputElement){

	var id = this.idFactoryNum;
	this.idFactoryNum++;

	if(!inputElement){
		var inputElement = new InputElement('true',InputType.bool);
		this.input.inputElements.push(inputElement);
	}

	var newArrayElement = new ArrayTerm(id,this,inputElement);
	return newArrayElement;
};

ArrayExpression.prototype.getArrayElementById = function(id){

	for(var k=0; k<this.arrayTermList.length; k++){
		if(this.arrayTermList[k].id == id)
			return this.arrayTermList[k];
	}
};

ArrayExpression.prototype.parseArrayExpression = function(input){

	this.input = input;

	for (var k=0; k<input.inputElements.length; k++){
		this.addArrayElement(input.inputElements[k]);
	}
};
