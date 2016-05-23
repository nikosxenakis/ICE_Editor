function LValueDialogMenu(){

	var title = "Left Value";
	
	this.basicDialogMenu = new BasicDialogMenu(title,DialogMenuData.logicExpressionContentDialogMenuWidth);

	this.lValue = new LValue(this.basicDialogMenu);

	return this;
};

LValueDialogMenu.prototype.init = function(){
	this.lValue.init(this.object.input);
};

LValueDialogMenu.prototype.open = function(object){

	this.object = object;

	this.basicDialogMenu.show();
	
	this.init();

};

LValueDialogMenu.prototype.close = function(){

	this.basicDialogMenu.hide();

	this.object = null;
};


