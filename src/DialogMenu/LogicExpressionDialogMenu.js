function LogicExpressionDialogMenu(){

	var title = "Condition";

	this.basicDialogMenu = new BasicDialogMenu(title,DialogMenuData.logicExpressionContentDialogMenuWidth);

	this.id = "topLogicExpression";
	this.arg = {
		logicExpressionContentDiv: this.basicDialogMenu.getContentDiv()
	};

	this.logicExpression = new LogicExpression(this.id,this.arg);

	$(this.logicExpression.logicExpressionDiv).css('width', '100%');

	//$(this.logicExpression.logicExpressionContentDiv).css('width', '95%');
	//$(this.logicExpression.logicExpressionContentDiv).css('height', '100%');
	$(this.logicExpression.logicExpressionContentDiv).css('overflow', 'auto');
	$(this.logicExpression.logicExpressionContentDiv).css('white-space', 'nowrap');
	$(this.logicExpression.logicExpressionContentDiv).css('padding', 0);
	$(this.logicExpression.logicExpressionContentDiv).css('margin', 0);
	$(this.logicExpression.logicExpressionContentDiv).css('padding-bottom', 12);
	$(this.logicExpression.logicExpressionContentDiv).css('margin-bottom', 0);
	$(this.logicExpression.logicExpressionContentDiv).css('padding-left', 0);
	$(this.logicExpression.logicExpressionContentDiv).css('margin-left', 15);
	$(this.logicExpression.logicExpressionContentDiv).css('padding-right', 0);
	$(this.logicExpression.logicExpressionContentDiv).css('margin-right', 15);

	$(this.logicExpression.buttonClose).remove();
	

	this.basicDialogMenu.enableBackButton(false);
	this.basicDialogMenu.enableNextButton(true);

	$( this.basicDialogMenu.getNextButton() ).mousedown(function() {
		var active = DialogMenuController.getActive();

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

	console.log(this.input);

	this.logicExpression.input = this.input;
	this.parse();

    this.basicDialogMenu.show();	

};

LogicExpressionDialogMenu.prototype.close = function(){

    this.basicDialogMenu.hide();	

	this.object = null;
	this.element = null;
};

LogicExpressionDialogMenu.prototype.submit = function(){
	console.log('submit LogicExpressionDialogMenu');
	//produce this.input.input
	var str = this.logicExpression.input.getText();
	console.log('submit string: ',str);

	console.log(this.logicExpression);
	this.input.setText(str);

};

LogicExpressionDialogMenu.prototype.getLogicExpressionById = function(id){
	return this.logicExpression.getLogicExpressionById(id);
}

LogicExpressionDialogMenu.prototype.parse = function(){

	if(!this.input.type == "logicExpression"){
		console.error('The input is not logicExpression');
		return;
	}
	
	this.logicExpression.parseLogicExpression(this.input);

};
