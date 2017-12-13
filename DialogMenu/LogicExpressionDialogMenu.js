function LogicExpressionDialogMenu(){

	var title = "Condition";

	this.basicDialogMenu = new BasicDialogMenu(title,DialogMenuData.logicExpressionContentDialogMenuWidth);

	this.id = "topLogicExpression";
	this.arg = {
		logicExpressionContentDiv: this.basicDialogMenu.getContentDiv()
	};

	this.logicExpression = new LogicExpression(this.id,this.arg);

	$(this.logicExpression.logicExpressionDiv).css('width', '100%');	
	$(this.logicExpression.logicExpressionDiv).css('border-radius','0px');
	
	$(this.logicExpression.logicExpressionContentDiv).css('overflow', 'auto');
	$(this.logicExpression.logicExpressionContentDiv).css('white-space', 'nowrap');
	$(this.logicExpression.logicExpressionContentDiv).css('margin-left', 0);
	$(this.logicExpression.logicExpressionContentDiv).css('margin-right', 0);

	$(this.logicExpression.buttonClose).remove();
	
	this.optionsMenu = this.createOptionsMenu(this.basicDialogMenu.getContentDiv());
	$(this.optionsMenu).hide();

	this.logicExpressionMenu = new LogicExpressionMenu(this.basicDialogMenu.getContentDiv());
	this.logicOperatorMenu = new LogicOperatorMenu(this.basicDialogMenu.getContentDiv());
	this.comparisonOperatorMenu = new ComparisonOperatorMenu(this.basicDialogMenu.getContentDiv());

	this.term = new Term(this.basicDialogMenu.getContentDiv(),this.basicDialogMenu);
	
	return this;
};

LogicExpressionDialogMenu.prototype.getLogicExpressionById = function(id){
	return this.logicExpression.getLogicExpressionById(id);
}

LogicExpressionDialogMenu.prototype.getInput = function(){
	return this.logicExpression.input;
};

LogicExpressionDialogMenu.prototype.open = function(){
	
	this.logicExpression.parseLogicExpression(DialogMenuController.getInput());
};

LogicExpressionDialogMenu.prototype.close = function(){
	//update dialog menu
	this.input = this.logicExpression.input;
};

LogicExpressionDialogMenu.prototype.createOptionsMenu = function(father){

	var optionsDiv = createHtmlElement({
		format: "div",
		//className: "mainDiv",
		father: father
	});
	$(optionsDiv).css({
		"border-radius": "0px",
		"position": "inherit",
		"width": "100%",
		"height": "30px",
		"margin": "4px",
		"border-style": "outset",
		"border-width": "2px",
		"text-align": "center"
	});

	var swapButton = createHtmlElement({
		format: "span",
		className: "glyphicon glyphicon-refresh",
		father: optionsDiv
	});
	$(swapButton).css('font-size','15px');
	$(swapButton).css('margin','5px');
	$(swapButton).css('color','green');		

	$(swapButton).hover(function() {
		$(this).css('cursor','pointer');
	});

	var undoButton = createHtmlElement({
		format: "i",
		className: "fa fa-undo btnUndo",
		father: optionsDiv
	});
	$(undoButton).css('font-size','15px');
	$(undoButton).css('margin','5px');
	$(undoButton).css('position','relative');		
	$(undoButton).css('color','chocolate');		

	$(undoButton).hover(function() {
		$(this).css('cursor','pointer');
	});

	var redoButton = createHtmlElement({
		format: "i",
		className: "fa fa-repeat btnRedo",
		father: optionsDiv
	});
	$(redoButton).css('font-size','15px');
	$(redoButton).css('margin','5px');
	$(redoButton).css('position','relative');		
	$(redoButton).css('color','cadetblue');		

	$(redoButton).hover(function() {
		$(this).css('cursor','pointer');
	});

	var removeButton = createHtmlElement({
		format: "span",
		className: "glyphicon glyphicon-trash",// remove
		father: optionsDiv
	});
	$(removeButton).css('font-size','15px');
	$(removeButton).css('margin','5px');
	$(removeButton).css('color','brown');

	$(removeButton).hover(function() {
		$(this).css('cursor','pointer');
	});
	
	$( removeButton ).mousedown(function(event) {
		var active = DialogMenuController.getActive();
		if(active.logicExpression)
			var expression = active.logicExpression.getActivatedLogicExpression();
		if(active.arrayExpression)
			var expression = active.arrayExpression.getActivatedArrayElement();

		expression.remove();
	});

	return optionsDiv;	
}