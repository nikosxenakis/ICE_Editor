function ArrayElement(id,fatherArrayExpression,text,inputType){

	this.id = id;
	this.fatherArrayExpression = fatherArrayExpression;

	this.input = new InputElement("" , InputType.expressionTerm);

	if(text)
		this.input.setText(text);

	if(inputType)
		this.input.setType(inputType);
	
	fatherArrayExpression.arrayElementList.push(this);

	this.arrayElementDiv = createHtmlElement({
		format: "div",
		id: id,
		father: fatherArrayExpression.arrayExpressionContentDiv,
		border: "groove"
	});

	$(this.arrayElementDiv).css('display', 'inline-block');

	$(this.arrayElementDiv).mouseover(function(){
		var active = DialogMenuController.getActive();
		var arrayElement = active.arrayExpression.getArrayElementById(id);
		if(arrayElement){
			$(arrayElement.buttonClose).show();
			$(arrayElement.buttonEdit).show();
		}

	});

	$(this.arrayElementDiv).mouseout(function(){
		var active = DialogMenuController.getActive();
		if(active.arrayExpression)
			var arrayElement = active.arrayExpression.getArrayElementById(id);
		if(arrayElement){
			$(arrayElement.buttonClose).hide();
			$(arrayElement.buttonEdit).hide();
		}
	});

	this.buttonClose = createHtmlElement({
		format: "span",
		id: id+"buttonClose",
		className: "close",
		text: "x",
		father: this.arrayElementDiv,
		object: this.id
	});
	$(this.buttonClose).css('overflow', 'auto');
	$(this.buttonClose).hide();
	$(this.buttonClose).mousedown(function(){

		var active = DialogMenuController.getActive();
		var arrayElement = active.arrayExpression.getArrayElementById(id);
		arrayElement.remove();
	});


	this.buttonEdit = createHtmlElement({
		format: "span",
		id: id+"buttonEdit",
		className: "glyphicon glyphicon-pencil",
		father: this.arrayElementDiv,
		object: this.id
	});
	$(this.buttonEdit).css('overflow', 'auto');
	$(this.buttonEdit).css('color', 'grey');
	$(this.buttonEdit).css('float', 'right');
	$(this.buttonEdit).hide();
	$(this.buttonEdit).mousedown(function(){
		console.log('edit array element');
		var active = DialogMenuController.getActive();
		var arrayElement = active.arrayExpression.getArrayElementById(id);
		DialogMenuController.open(arrayElement);

	});

	this.arrayElementContentDiv = createHtmlElement({
		format: "div",
		id: id+"Content",
		father: this.arrayElementDiv
	});
	$(this.arrayElementContentDiv).css('margin-top', 20);
	$(this.arrayElementContentDiv).css('text-align', 'center');
	$(this.arrayElementContentDiv).css('height', '100%');

	$(this.arrayElementContentDiv).text(this.input.getText());

	return this;
};

ArrayElement.prototype.remove = function(){
	console.log('remove ',this.id);

	var array = this.fatherArrayExpression.arrayElementList;

	var i = array.indexOf(this);
	if(i != -1) {
		array.splice(i, 1);
	}

	$(this.arrayElementDiv).remove();

};

ArrayElement.prototype.toString = function(){
	return $(this.arrayElementContentDiv).text();
};

ArrayElement.prototype.activate = function(){
	console.log("ArrayElement active");
};

ArrayElement.prototype.deactivate = function(){
	console.log("ArrayElement deactivate");
};

ArrayElement.prototype.update = function(){
	console.log("ArrayElement update");
	console.log(this.input);

	$(this.arrayElementContentDiv).text(this.input.getText());
};