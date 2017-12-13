function LogicOperator(id,fatherLogicExpression){

	this.id = id;
	this.fatherLogicExpression = fatherLogicExpression;

	if(this.fatherLogicExpression instanceof LogicExpression){
		this.fatherLogicExpression.logicOperatorList.push(this);	
	}

	this.logicOperatorDiv = createHtmlElement({
		format: "button",
		className: "btn",
		id: id,
		father: fatherLogicExpression.logicExpressionContentDiv
	});
	$(this.logicOperatorDiv).css('background-color','white');	
	$(this.logicOperatorDiv).css('padding','0px');	

	$(this.logicOperatorDiv).addClass('mainDiv');
	$(this.logicOperatorDiv).addClass('deactivatedExpression');

	this.logicOperatorContentDiv = createHtmlElement({
		format: "div",
		id: id+"Content",
		father: this.logicOperatorDiv
	});
 	$(this.logicOperatorContentDiv).addClass('contentDiv');
	 
	this.dataDiv = createHtmlElement({
		format: "div",
		father: this.logicOperatorContentDiv
	});
	
	$( this.logicOperatorDiv ).mouseover(function(event) {
		if($(this).hasClass('activatedExpression'))
			return;
			
        $(this).addClass('enabledExpression');
		return false;
    });

	$( this.logicOperatorDiv ).mouseout(function(event) {
        $(this).removeClass('enabledExpression');
		return false;
    });
	
	$(this.logicOperatorDiv).mousedown(function(){
		var active = DialogMenuController.getActive();

		if(!active.logicExpression)
			return;

		var logicOperator = active.logicExpression.getLogicOperatorById(id);			
			
		var comparisonTerm = active.logicExpression.getActivatedComparisonTerm();
		if(comparisonTerm){
			console.error(comparisonTerm);
			comparisonTerm.deactivate();
			active.term.close();
		}
		
		var comparisonOperator = active.logicExpression.getActivatedComparisonOperator();
		if(comparisonOperator){
			comparisonOperator.deactivate();
			active.comparisonOperatorMenu.close();
		}
		
		if(logicOperator.logicOperatorDiv.hasClass('deactivatedExpression')){
			active.logicOperatorMenu.open(logicOperator);

			$(logicOperator.logicOperatorDiv).removeClass('enabledExpression');	

			$(logicOperator.logicOperatorDiv).removeClass('deactivatedExpression');	
			$(logicOperator.logicOperatorDiv).addClass('activatedExpression');	
		}
		else if(logicOperator.logicOperatorDiv.hasClass('activatedExpression')){
			active.logicOperatorMenu.close();

			$(logicOperator.logicOperatorDiv).addClass('enabledExpression');	

			$(logicOperator.logicOperatorDiv).removeClass('activatedExpression');	
			$(logicOperator.logicOperatorDiv).addClass('deactivatedExpression');	
		}
		else{
			console.error('error');
		}

		return false;

	});

	return this;
};

LogicOperator.prototype.activate = function(){
	console.log("LogicOperator active");
	$(this.logicOperatorDiv).removeClass('deactivatedExpression');	
	$(this.logicOperatorDiv).addClass('activatedExpression');
};

LogicOperator.prototype.deactivate = function(){
	console.log("LogicOperator deactivate");
	$(this.logicOperatorDiv).removeClass('activatedExpression');	
	$(this.logicOperatorDiv).addClass('deactivatedExpression');
};

LogicOperator.prototype.update = function(){
	console.log("LogicOperator update");
	console.log(this.input);
	$(this.dataDiv).text(this.input.input);
};

LogicOperator.prototype.setInput = function(inputElement){
	this.input = inputElement;
	$(this.dataDiv).text(this.input.input);
};