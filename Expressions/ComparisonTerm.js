function ComparisonTerm(comparisonExpression,input){

	this.comparisonExpression = comparisonExpression;
	this.input = input;

	this.comparisonTermDiv = createHtmlElement({
		format: "button",
		className: "btn",
		father: this.comparisonExpression.comparisonExpressionDiv
	});
	$(this.comparisonTermDiv).css('background-color','white');	
	$(this.comparisonTermDiv).css('padding','0px');	
	
	$(this.comparisonTermDiv).addClass('deactivatedExpression');	
	$(this.comparisonTermDiv).addClass('mainDiv');
	
	$( this.comparisonTermDiv ).mouseover(function(event) {
		if($(this).hasClass('activatedExpression'))
			return;
			
        $(this).addClass('enabledExpression');
    });

	$( this.comparisonTermDiv ).mouseout(function(event) {
        $(this).removeClass('enabledExpression');
    });
	
	$(this.comparisonTermDiv).mousedown(function(){
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
		
		console.log(logicExpression);
		if(logicExpression.id == "topLogicExpression")
			return;
		
		var comparisonExpression = logicExpression.comparisonExpression;
		if(!comparisonExpression){
			console.error('error in mousedown 2');
			return;
		}
		
		var comparisonTerm = comparisonExpression.getEnabledComparisonTerm();
		if(!comparisonTerm)
			var comparisonTerm = comparisonExpression.getActivatedComparisonTerm();

		if(comparisonTerm.comparisonTermDiv.hasClass('deactivatedExpression')){
			
			active.term.open(comparisonTerm);

			$(comparisonTerm.comparisonTermDiv).removeClass('enabledExpression');	

			comparisonTerm.activate();

		}
		else if(comparisonTerm.comparisonTermDiv.hasClass('activatedExpression')){

			active.term.close();
				
			$(comparisonTerm.comparisonTermDiv).addClass('enabledExpression');	

			comparisonTerm.deactivate();
	
		}
		else{
			console.error('error');
		}
		
		return false;
		
	});


	this.comparisonTermContentDiv = createHtmlElement({
		format: "div",
		text: DialogMenuData.dummyString,
		father: this.comparisonTermDiv
	});
	$(this.comparisonTermContentDiv).css('margin','5px');

	this.update();
	
	return this;
};

ComparisonTerm.prototype.update = function(text,type){

	if(text != "" && text != DialogMenuData.dummyString && type){
		this.input.setText(text);
		this.input.setType(type);	
		$(this.comparisonTermContentDiv).text(this.input.getText());
		
		$(this.comparisonTermContentDiv).removeClass('dataDivWithoutContent');
		$(this.comparisonTermContentDiv).addClass('dataDivWithContent');
	}
	else{
		console.log(text,type);
		$(this.comparisonTermContentDiv).text(DialogMenuData.dummyString);
		
		$(this.comparisonTermContentDiv).removeClass('dataDivWithContent');
		$(this.comparisonTermContentDiv).addClass('dataDivWithoutContent');
	}
	
};

ComparisonTerm.prototype.activate = function(){
	console.log("ComparisonTerm active");

	$(this.comparisonTermDiv).removeClass('deactivatedExpression');	
	$(this.comparisonTermDiv).addClass('activatedExpression');
};

ComparisonTerm.prototype.deactivate = function(){
	console.log("ComparisonTerm deactivate");

	$(this.comparisonTermDiv).removeClass('activatedExpression');	
	$(this.comparisonTermDiv).addClass('deactivatedExpression');
};