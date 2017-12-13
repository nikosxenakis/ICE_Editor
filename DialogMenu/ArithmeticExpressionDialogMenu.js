function ArithmeticExpressionDialogMenu(){

	var title = "Calculation";

	this.basicDialogMenu = new BasicDialogMenu(title,DialogMenuData.logicExpressionContentDialogMenuWidth);

	this.id = "topLogicExpression";
	this.arg = {
		arithmeticExpressionContentDiv: this.basicDialogMenu.getContentDiv()
	};

	this.arithmeticExpression = new ArithmeticExpression(this.id,this.arg);

	$(this.arithmeticExpression.arithmeticExpressionDiv).css('width', '100%');	
	$(this.arithmeticExpression.arithmeticExpressionDiv).css('border-radius','0px');
	
	$(this.arithmeticExpression.arithmeticExpressionContentDiv).css('overflow', 'auto');
	$(this.arithmeticExpression.arithmeticExpressionContentDiv).css('white-space', 'nowrap');
	$(this.arithmeticExpression.arithmeticExpressionContentDiv).css('margin-left', 0);
	$(this.arithmeticExpression.arithmeticExpressionContentDiv).css('margin-right', 0);

	$(this.arithmeticExpression.buttonClose).remove();
	
	this.optionsMenu = this.createOptionsMenu(this.basicDialogMenu.getContentDiv());
	$(this.optionsMenu).hide();

	this.arithmeticExpressionMenu = new ArithmeticExpressionMenu(this.basicDialogMenu.getContentDiv());
	this.arithmeticOperatorMenu = new ArithmeticOperatorMenu(this.basicDialogMenu.getContentDiv());

	this.term = new Term(this.basicDialogMenu.getContentDiv(),this.basicDialogMenu);
	
	return this;
};

ArithmeticExpressionDialogMenu.prototype.getArithmeticExpressionById = function(id){
	return this.arithmeticExpression.getArithmeticExpressionById(id);
}

ArithmeticExpressionDialogMenu.prototype.getInput = function(){
	return this.arithmeticExpression.input;
};

ArithmeticExpressionDialogMenu.prototype.open = function(){
	
	this.arithmeticExpression.parseArithmeticExpression(DialogMenuController.getInput());
};

ArithmeticExpressionDialogMenu.prototype.close = function(){
	//update dialog menu
	this.input = this.arithmeticExpression.input;
};

ArithmeticExpressionDialogMenu.prototype.createOptionsMenu = function(father){

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
		if(active.arithmeticExpression)
			var expression = active.arithmeticExpression.getActivatedArithmeticExpression();
		if(active.arrayExpression)
			var expression = active.arrayExpression.getActivatedArrayElement();

		expression.remove();
	});

	return optionsDiv;	
}