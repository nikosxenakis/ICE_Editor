function ComparisonOperator(comparisonExpression,input){

	this.comparisonExpression = comparisonExpression;
	this.input = input;

	this.comparisonOperatorDiv = createHtmlElement({
		format: "button",
		className: "btn",
		father: this.comparisonExpression.comparisonExpressionDiv
	});
	$(this.comparisonOperatorDiv).css('background-color','white');	
	$(this.comparisonOperatorDiv).css('padding','0px');	
	
	$(this.comparisonOperatorDiv).addClass('deactivatedExpression');	
	$(this.comparisonOperatorDiv).addClass('mainDiv');
	
	$( this.comparisonOperatorDiv ).mouseover(function(event) {
		if($(this).hasClass('activatedExpression'))
			return;
			
        $(this).addClass('enabledExpression');
    });

	$( this.comparisonOperatorDiv ).mouseout(function(event) {
        $(this).removeClass('enabledExpression');
    });
	
	$(this.comparisonOperatorDiv).mousedown(function(){

		var active = DialogMenuController.getActive();
		
		if(!active.logicExpression)
			return;

		var logicExpression = active.logicExpression.getEnabledLogicExpression();		
		if(!logicExpression){
			var logicExpression = active.logicExpression.getActivatedLogicExpression();		
		}
		if(!logicExpression){
			console.error('error in mousedown');
			return;
		}
		
		var activatedlogicExpression = active.logicExpression.getActivatedLogicExpression();
		
		if(activatedlogicExpression && activatedlogicExpression != logicExpression){
			activatedlogicExpression.deactivate();
			active.logicExpressionMenu.close();
			active.term.close();
		}
		
		var comparisonTerm = active.logicExpression.getActivatedComparisonTerm();
		if(comparisonTerm){
			console.error(comparisonTerm);
			comparisonTerm.deactivate();
			active.term.close();
		}
		
			
		console.log(logicExpression);
		if(logicExpression.id == "topLogicExpression")
			return;
		
		var comparisonExpression = logicExpression.comparisonExpression;
		if(!comparisonExpression){
			console.error('error in mousedown 2');
			return;
		}
		
		var comparisonOperator = comparisonExpression.comparisonOperator

		if(comparisonOperator.comparisonOperatorDiv.hasClass('deactivatedExpression')){
			active.comparisonOperatorMenu.open(comparisonOperator);

			$(comparisonOperator.comparisonOperatorDiv).removeClass('enabledExpression');	

			comparisonOperator.activate();

		}
		else if(comparisonOperator.comparisonOperatorDiv.hasClass('activatedExpression')){

			active.comparisonOperatorMenu.close();
				
			$(comparisonOperator.comparisonOperatorDiv).addClass('enabledExpression');	

			comparisonOperator.deactivate();
	
		}
		else{
			console.error('error');
		}
		
		return false;
		
	});


	this.comparisonOperatorContentDiv = createHtmlElement({
		format: "div",
		text: DialogMenuData.dummyString,
		father: this.comparisonOperatorDiv
	});
	$(this.comparisonOperatorContentDiv).css('margin','5px');

	this.update();
	
	return this;
};

ComparisonOperator.prototype.update = function(text,type){

	if(text != "" && text != DialogMenuData.dummyString && type){
		this.input.setText(text);
		this.input.setType(type);	
		$(this.comparisonOperatorContentDiv).text(this.input.getText());
		
		$(this.comparisonOperatorContentDiv).removeClass('dataDivWithoutContent');
		$(this.comparisonOperatorContentDiv).addClass('dataDivWithContent');
	}
	else{
		console.log(text,type);
		$(this.comparisonOperatorContentDiv).text(DialogMenuData.dummyString);
		
		$(this.comparisonOperatorContentDiv).removeClass('dataDivWithContent');
		$(this.comparisonOperatorContentDiv).addClass('dataDivWithoutContent');
	}
	
};

ComparisonOperator.prototype.activate = function(){
	console.log("ComparisonOperator active");

	$(this.comparisonOperatorDiv).removeClass('deactivatedExpression');	
	$(this.comparisonOperatorDiv).addClass('activatedExpression');
};

ComparisonOperator.prototype.deactivate = function(){
	console.log("ComparisonOperator deactivate");

	$(this.comparisonOperatorDiv).removeClass('activatedExpression');	
	$(this.comparisonOperatorDiv).addClass('deactivatedExpression');
};

ComparisonOperator.prototype.setInput = function(inputElement){
	this.input = inputElement;
	$(this.comparisonOperatorContentDiv).text(this.input.input);
};