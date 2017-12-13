function ArithmeticOperator(id,fatherArithmeticExpression){

	this.id = id;
	this.fatherArithmeticExpression = fatherArithmeticExpression;

	if(this.fatherArithmeticExpression instanceof ArithmeticExpression){
		this.fatherArithmeticExpression.arithmeticOperatorList.push(this);	
	}

	this.arithmeticOperatorDiv = createHtmlElement({
		format: "button",
		className: "btn",
		id: id,
		father: fatherArithmeticExpression.arithmeticExpressionContentDiv
	});
	$(this.arithmeticOperatorDiv).css('background-color','white');	
	$(this.arithmeticOperatorDiv).css('padding','0px');	

	$(this.arithmeticOperatorDiv).addClass('mainDiv');
	$(this.arithmeticOperatorDiv).addClass('deactivatedExpression');

	this.arithmeticOperatorContentDiv = createHtmlElement({
		format: "div",
		id: id+"Content",
		father: this.arithmeticOperatorDiv
	});
 	$(this.arithmeticOperatorContentDiv).addClass('contentDiv');
	 
	this.dataDiv = createHtmlElement({
		format: "div",
		father: this.arithmeticOperatorContentDiv
	});
	
	$( this.arithmeticOperatorDiv ).mouseover(function(event) {
		if($(this).hasClass('activatedExpression'))
			return;
			
        $(this).addClass('enabledExpression');
		return false;
    });

	$( this.arithmeticOperatorDiv ).mouseout(function(event) {
        $(this).removeClass('enabledExpression');
		return false;
    });
	
	$(this.arithmeticOperatorDiv).mousedown(function(){
		var active = DialogMenuController.getActive();

		if(!active.arithmeticExpression)
			return;

		var arithmeticOperator = active.arithmeticExpression.getArithmeticOperatorById(id);			
			
		var comparisonTerm = active.arithmeticExpression.getActivatedComparisonTerm();
		if(comparisonTerm){
			console.error(comparisonTerm);
			comparisonTerm.deactivate();
			active.term.close();
		}
		
		var comparisonOperator = active.arithmeticExpression.getActivatedComparisonOperator();
		if(comparisonOperator){
			comparisonOperator.deactivate();
			active.comparisonOperatorMenu.close();
		}
		
		if(arithmeticOperator.arithmeticOperatorDiv.hasClass('deactivatedExpression')){
			active.arithmeticOperatorMenu.open(arithmeticOperator);

			$(arithmeticOperator.arithmeticOperatorDiv).removeClass('enabledExpression');	

			$(arithmeticOperator.arithmeticOperatorDiv).removeClass('deactivatedExpression');	
			$(arithmeticOperator.arithmeticOperatorDiv).addClass('activatedExpression');	
		}
		else if(arithmeticOperator.arithmeticOperatorDiv.hasClass('activatedExpression')){
			active.arithmeticOperatorMenu.close();

			$(arithmeticOperator.arithmeticOperatorDiv).addClass('enabledExpression');	

			$(arithmeticOperator.arithmeticOperatorDiv).removeClass('activatedExpression');	
			$(arithmeticOperator.arithmeticOperatorDiv).addClass('deactivatedExpression');	
		}
		else{
			console.error('error');
		}

		return false;

	});

	return this;
};

ArithmeticOperator.prototype.activate = function(){
	console.log("ArithmeticOperator active");
	$(this.arithmeticOperatorDiv).removeClass('deactivatedExpression');	
	$(this.arithmeticOperatorDiv).addClass('activatedExpression');
};

ArithmeticOperator.prototype.deactivate = function(){
	console.log("ArithmeticOperator deactivate");
	$(this.arithmeticOperatorDiv).removeClass('activatedExpression');	
	$(this.arithmeticOperatorDiv).addClass('deactivatedExpression');
};

ArithmeticOperator.prototype.update = function(){
	console.log("ArithmeticOperator update");
	console.log(this.input);
	$(this.dataDiv).text(this.input.input);
};

ArithmeticOperator.prototype.setInput = function(inputElement){
	this.input = inputElement;
	$(this.dataDiv).text(this.input.input);
};