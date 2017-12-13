function ComparisonOperatorMenu(father){

	this.comparisonOperatorMenuDiv = createHtmlElement({
		format: "div",
		//className: "col-xs-12",
		father: father
	});
	$(this.comparisonOperatorMenuDiv).width('100%');

	$(this.comparisonOperatorMenuDiv).addClass('mainDiv');
	$(this.comparisonOperatorMenuDiv).addClass('container');

	$(this.comparisonOperatorMenuDiv).addClass('deactivatedExpression');
	$(this.comparisonOperatorMenuDiv).css('border-radius','0px');
	$(this.comparisonOperatorMenuDiv).css('margin','4px');
	$(this.comparisonOperatorMenuDiv).css('padding-bottom','15px');

	this.comparisonOperatorMenuDivLabel = createHtmlElement({
		format: "div",
		className: "dialogLabel",
		text: "Choose Operator",
		father: this.comparisonOperatorMenuDiv
	});
	$(this.comparisonOperatorMenuDivLabel).css('text-align','center');
	$(this.comparisonOperatorMenuDivLabel).css('float','none');

	this.comparisonOperatorMenuContent = createHtmlElement({
		format: "div",
		//className: "row",
		father: this.comparisonOperatorMenuDiv
	});
	$(this.comparisonOperatorMenuContent).css('margin-top','15px');
	
	//total 6
	this.createButton('Smaller','<','images/comparisonImages/comparisonSmallerImage.png');
	this.createButton('SmallerEqual','<=','images/comparisonImages/comparisonSmallerEqualImage.png');
	this.createButton('Equal','==','images/comparisonImages/comparisonEqualImage.png');
	this.createButton('Bigger','>','images/comparisonImages/comparisonGreaterImage.png');
	this.createButton('BiggerEqual','>=','images/comparisonImages/comparisonGreaterEqualImage.png');
	this.createButton('Different','!=','images/comparisonImages/comparisonDifferentImage.png');

	$(this.comparisonOperatorMenuDiv).hide();

	return this;
};

ComparisonOperatorMenu.prototype.open = function(comparisonOperator){
	if(	this.comparisonOperator != null ){
		this.comparisonOperator.deactivate();
		this.close();
	}

	var active = DialogMenuController.getActive();
	var comparisonOperatorMenu = active.comparisonOperatorMenu;
	var logicOperatorMenu = active.logicOperatorMenu;
	var logicExpressionMenu = active.logicExpressionMenu;
	var term = active.term;
	
	if(	logicExpressionMenu.logicExpression != null ){
		logicExpressionMenu.logicExpression.deactivate();
		logicExpressionMenu.close();
		term.close();
	}
	if(	logicOperatorMenu.logicOperator != null ){
		logicOperatorMenu.logicOperator.deactivate();
		logicOperatorMenu.close();
	}
	if(	comparisonOperatorMenu.comparisonOperator != null ){
		comparisonOperatorMenu.comparisonOperator.deactivate();
		comparisonOperatorMenu.close();
	}

	
	this.comparisonOperator = comparisonOperator;

	$(this.comparisonOperatorMenuDiv).show();
		
};

ComparisonOperatorMenu.prototype.close = function(){
	this.comparisonOperator = null;
	$(this.comparisonOperatorMenuDiv).hide();
};	

ComparisonOperatorMenu.prototype.createButton = function(name,text,src){
	//this.createButton('Smaller','<','images/logicExpressionAndImage.png');
	var logicOperatorMenu = 'logicOperatorMenu' + name;
	this.logicOperatorMenu = createHtmlElement({
		format: "div",
		className: "col-xs-4",
		father: this.comparisonOperatorMenuContent
	});
	$(this.logicOperatorMenu).css('text-align','center');
	$(this.logicOperatorMenu).css('margin-bottom','10px');
	/*
	var logicOperatorMenuContent = 'logicOperatorMenu' + name + 'Content';
	this.logicOperatorMenuContent = createHtmlElement({
		format: "button",
		father: this.logicOperatorMenu
	});
	$(this.logicOperatorMenuContent).css('padding','0px');
	$(this.logicOperatorMenuContent).attr('type','button');
	*/
	
	var logicOperatorMenuImage = 'logicOperatorMenu' + name + 'Image';
	this.logicOperatorMenuImage = createHtmlElement({
		format: "img",
		father: this.logicOperatorMenu
	});
	$(this.logicOperatorMenuImage).attr('src',src);
	$(this.logicOperatorMenuImage).width('108px');
	$(this.logicOperatorMenuImage).height('50px');

   $(this.logicOperatorMenuImage).hover(function() {
        $(this).css('cursor','pointer');
    });
	
	$(this.logicOperatorMenuImage).mousedown(function(){
		var active = DialogMenuController.getActive();
		var comparisonOperatorMenu = active.comparisonOperatorMenu;
		var comparisonOperator = comparisonOperatorMenu.comparisonOperator;

		if(!comparisonOperator){
			console.error('there is no comparisonOperator');
			return;
		}

		comparisonOperator.input.setText(text);
		comparisonOperator.setInput(comparisonOperator.input);
		comparisonOperator.update(text,InputType.comparisonOperator);

	});
};

