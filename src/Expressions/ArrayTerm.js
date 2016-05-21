function ArrayTerm(id,fatherArrayExpression,inputElement){

	this.id = id;
	this.fatherArrayExpression = fatherArrayExpression;

	this.input = inputElement;
	
	fatherArrayExpression.arrayTermList.push(this);

	this.arrayElementDiv = createHtmlElement({
		format: "div",
		id: id,
		father: fatherArrayExpression.arrayExpressionContentDiv,
		border: "groove"
	});

	$(this.arrayElementDiv).css('display', 'inline-block');
	$(this.arrayElementDiv).css('margin-right', '10px');

	$(this.arrayElementDiv).mouseover(function(){
		var active = DialogMenuController.getActive();
		var arrayExpression = active.arrayExpression;
		var arrayElement = arrayExpression.getArrayElementById(id);
		if(arrayElement){
			$(arrayElement.buttonClose).show();
			$(arrayElement.buttonEdit).show();
		}

	});

	$(this.arrayElementDiv).mouseout(function(){
		var active = DialogMenuController.getActive();
		var arrayExpression = active.arrayExpression;
		if(arrayExpression)
			var arrayElement = arrayExpression.getArrayElementById(id);
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
		var arrayExpression = active.arrayExpression;
		var arrayElement = arrayExpression.getArrayElementById(id);
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
		var arrayExpression = active.arrayExpression;
		var arrayElement = arrayExpression.getArrayElementById(id);
		DialogMenuController.open(arrayElement);

	});

	this.arrayElementContentDiv = createHtmlElement({
		format: "div",
		id: id+"Content",
		father: this.arrayElementDiv
	});
	//$(this.arrayElementContentDiv).css('margin-top', 20);
	$(this.arrayElementContentDiv).css('margin', 14);
	$(this.arrayElementContentDiv).css('text-align', 'center');
	$(this.arrayElementContentDiv).css('height', '100%');

	$(this.arrayElementContentDiv).text(this.input.getText());

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

	$(this.arrayElementDiv).remove();

};

ArrayTerm.prototype.toString = function(){
	return $(this.arrayElementContentDiv).text();
};

ArrayTerm.prototype.activate = function(){
	console.log("ArrayElement active");
};

ArrayTerm.prototype.deactivate = function(){
	console.log("ArrayElement deactivate");
};

ArrayTerm.prototype.update = function(){
	console.log("ArrayElement update");
	console.log(this.input);

	$(this.arrayElementContentDiv).text(this.input.getText());
};
