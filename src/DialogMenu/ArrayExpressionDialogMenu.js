function ArrayExpressionDialogMenu(){

	var title = "Array Expression";

	this.basicDialogMenu = new BasicDialogMenu(title,DialogMenuData.logicExpressionContentDialogMenuWidth);
	
	this.arrayExpression = new ArrayExpression(this.basicDialogMenu);
	
	this.basicDialogMenu.enableBackButton(false);

	$( this.basicDialogMenu.getNextButton() ).mousedown(function() {
		var active = DialogMenuController.getActive();

		active.submit();
	
        DialogMenuController.close(true);
	});

	return this;
};

ArrayExpressionDialogMenu.prototype.open = function(object){

	this.object = object;
	this.element = object.element;
	this.input = object.input;

	this.arrayExpression.input = this.input;
	this.parse();

	this.basicDialogMenu.show();
};

ArrayExpressionDialogMenu.prototype.close = function(){

	this.basicDialogMenu.hide();

	this.object = null;
	this.input = null;
};

ArrayExpressionDialogMenu.prototype.submit = function(){
	console.log('submit ArrayExpressionDialogMenu');

	var str = this.arrayExpression.input.getText();
	console.log('submit string: ',str);

	console.log(this.arrayExpression);
	this.input.setText(str);
};

ArrayExpressionDialogMenu.prototype.parse = function(){

	if(!this.input.type == "arrayExpression"){
		console.error('The input is not arrayExpression');
		return;
	}
	
	this.arrayExpression.parseArrayExpression(this.input);

};