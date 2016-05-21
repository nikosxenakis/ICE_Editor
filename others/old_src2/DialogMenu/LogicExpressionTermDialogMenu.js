function LogicExpressionTermDialogMenu(){

	var title = "Choose Logic Expression Content";

	this.basicDialogMenu = new BasicDialogMenu(title,DialogMenuData.logicExpressionContentDialogMenuWidth);

	this.term = new Term(this.basicDialogMenu);
	
	this.radioButtonComparison = createRadioHtmlElement({
		id: "comparison",
		text: "comparison",
		name: 'type',
		father: this.term.radioForm
	});


	return this;
};

LogicExpressionTermDialogMenu.prototype.init = function(){
	this.term.show();
	this.term.lValue.hide();
	this.term.constant.hide();
	
	this.term.init(this.input);
		
};

LogicExpressionTermDialogMenu.prototype.open = function(object){

	this.object = object;
	this.input = object.input;

	this.basicDialogMenu.show();
	
	this.init();

};

LogicExpressionTermDialogMenu.prototype.close = function(){

	this.basicDialogMenu.hide();

	this.object = null;
	this.input = null;
};

