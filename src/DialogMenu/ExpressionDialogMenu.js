function ExpressionDialogMenu(){

	var title = "Expression";

	this.basicDialogMenu = new BasicDialogMenu(title,DialogMenuData.logicExpressionContentDialogMenuWidth);
	
	this.expression = new Expression(this.basicDialogMenu);
	
	return this;
};

ExpressionDialogMenu.prototype.init = function(){
	this.expression.init(this.input);
};

ExpressionDialogMenu.prototype.open = function(object){

	this.object = object;
	this.input = object.input;

	this.basicDialogMenu.show();

	this.init();	
};

ExpressionDialogMenu.prototype.close = function(){
	this.basicDialogMenu.hide();

	this.object = null;
	this.input = null;
};

