function LogicExpressionDialogMenu(id,title){

	var id = "logicExpressionDialogMenu";
	var title = "Condition";

	DialogMenuController.createBasicDialogMenu(this,id,title,800);
	//add elements to this.dialogBody
	
	//console.log($(this.dialogBody).width());
	id = "topLogicExpression";
	var arg = {
		logicExpressionContentDiv: this.dialogBody
	};

	this.logicExpression = new LogicExpression(id,arg);
	$(this.logicExpression.logicExpressionContentDiv).css('overflow', 'auto');
	$(this.logicExpression.logicExpressionContentDiv).css('width', '95%');
	$(this.logicExpression.logicExpressionContentDiv).css('height', '100%');
	$(this.logicExpression.logicExpressionContentDiv).css('white-space', 'nowrap');

 	$(this.buttonBack).hide();


	$(this.buttonNext).mousedown(function() {
        DialogMenuController.close(true);
	});

	return this;
};


LogicExpressionDialogMenu.prototype.open = function(object){

	//object must have a object.input && object.update(input)
	this.object = object;
	this.element = object.element;
	this.input = this.object.input;

	this.init();

	if(this.input.type == "logicExpressionDefault"){
		this.input.type = InputType.logicExpression;
	}
	else{
		this.parse();
	}

    $(this.dialogMenuDiv).css('display', "block");	
};

LogicExpressionDialogMenu.prototype.close = function(){
    $(this.dialogMenuDiv).css('display', "none");
    console.log(this.dialogMenuDiv);
	this.object = null;
	this.element = null;
};

LogicExpressionDialogMenu.prototype.getLogicExpressionById = function(id){
	return this.logicExpression.getLogicExpressionById(id);
}

LogicExpressionDialogMenu.prototype.init = function(){
	console.log('init LogicExpressionDialogMenu');

	$(this.logicExpression.logicExpressionContentDiv).empty();
};

LogicExpressionDialogMenu.prototype.parse = function(){
	console.log('parsing ',this.object);

	if(!this.input.type == "logicExpression" || this.input.input == "")
		return;

	var inputText = this.input.input.toString();

	var parse_tree = jsep(inputText);
	console.log(parse_tree);

	var expr = parse_tree;

	this.logicExpression.parseLogicExpression(expr);

};

LogicExpressionDialogMenu.prototype.submit = function(){
	console.log('init LogicExpressionDialogMenu');
	this.input = this.object.input;
	//produce this.input.input
	var str;



	this.input.input = str;
};
