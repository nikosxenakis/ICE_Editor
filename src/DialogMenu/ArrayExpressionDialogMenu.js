function ArrayExpressionDialogMenu(){

	var title = "Array Expression";

	this.basicDialogMenu = new BasicDialogMenu(title,DialogMenuData.logicExpressionContentDialogMenuWidth);
	
	this.arrayExpression = new ArrayExpression(this.basicDialogMenu);
	
	$( this.basicDialogMenu.getNextButton() ).mousedown(function() {
		var active = DialogMenuController.getActive();

		active.submit();
	
        DialogMenuController.close(true);
	});

	return this;
};

ArrayExpressionDialogMenu.prototype.init = function(){
	this.arrayExpression.init(this.input);
};

ArrayExpressionDialogMenu.prototype.open = function(object){

	this.object = object;
	this.input = object.input;

	this.basicDialogMenu.show();

	this.init();	
};

ArrayExpressionDialogMenu.prototype.close = function(){
	this.basicDialogMenu.hide();

	this.object = null;
	this.input = null;
};

ArrayExpressionDialogMenu.prototype.submit = function(){
	console.log('submit ArrayExpressionDialogMenu');
	//produce this.input.input
	var str = this.arrayExpression.input.getText();
	console.log(this.arrayExpression);

	console.log('submit string: ',str);

	//produce this.input.inputElements
	//this.input.inputElements = new Array();
	//this.logicExpression.getInputElements(this.input.inputElements);
};