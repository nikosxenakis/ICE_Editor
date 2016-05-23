function LogicExpressionDialogMenu(id,title){

	var id = "logicExpressionDialogMenu";
	var title = "Condition";

	DialogMenuController.createBasicDialogMenu(this,id,title,800);
	//add elements to this.dialogBody
	
	//console.log($(this.dialogBody).width());
	this.id = "topLogicExpression";
	this.arg = {
		logicExpressionContentDiv: this.dialogBody
	};

	$(this.buttonNext).mousedown(function() {
		var active = DialogMenuController.getActive();
		console.log("active = ",active);
		//if(active)
			active.submit();
	
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
    //console.log(this.dialogMenuDiv);
	this.object = null;
	this.element = null;
};

LogicExpressionDialogMenu.prototype.submit = function(){
	console.log('submit LogicExpressionDialogMenu');
	//produce this.input.input
	var str = this.logicExpression.toString();
	console.log(this.logicExpression);
	this.input.setText(str);
	console.log('submit string: ',str);

	//produce this.input.inputElements
	this.input.inputElements = new Array();
	this.logicExpression.getInputElements(this.input.inputElements);
};

LogicExpressionDialogMenu.prototype.getLogicExpressionById = function(id){
	return this.logicExpression.getLogicExpressionById(id);
}

LogicExpressionDialogMenu.prototype.init = function(){
	console.log('init LogicExpressionDialogMenu');

	if(this.logicExpression){
		$(this.logicExpression.logicExpressionDiv).remove();
	}

	this.logicExpression = new LogicExpression(this.id,this.arg);
	$(this.logicExpression.logicExpressionContentDiv).css('overflow', 'auto');
	$(this.logicExpression.logicExpressionContentDiv).css('width', '95%');
	$(this.logicExpression.logicExpressionContentDiv).css('height', '100%');
	$(this.logicExpression.logicExpressionContentDiv).css('white-space', 'nowrap');

 	$(this.buttonBack).hide();

	$(this.buttonNext).attr("disabled", false);

};

LogicExpressionDialogMenu.prototype.parse = function(){
	//console.log('parsing ',this.object);

	if(!this.input.type == "logicExpression" || this.input.input == "")
		return;

	var inputText = this.input.input.toString();
	console.log(inputText);
	var expr = jsep(inputText);
	console.log(expr);
	
	this.logicExpression.parseLogicExpression(expr);

	index = 0;
	this.logicExpression.addInputElements(this.input.inputElements);

};
