function LogicExpressionDialogMenu(id,title){

	var id = "logicExpressionDialogMenu";
	var title = "Condition";

	DialogMenuController.createBasicDialogMenu(this,id,title);
	//add elements to this.dialogBody
	
	id = "topLogicExpression";
	this.logicExpression = new LogicExpression(id,this.dialogBody,null);

	$(this.buttonNext).mousedown(function() {

        DialogMenuController.close(true);

	});

	return this;
};


LogicExpressionDialogMenu.prototype.open = function(object){

	//object must have a object.input && object.update(input)
	this.object = object;
	this.element = object.element;

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

