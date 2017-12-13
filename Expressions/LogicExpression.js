function LogicExpression(id,fatherLogicExpression){

	this.id = id;
	this.idFactoryNum = 0;
	this.logicExpressionList = new Array();
	this.logicOperatorList = new Array();

	this.fatherLogicExpression = fatherLogicExpression;

	if(this.fatherLogicExpression instanceof LogicExpression){
		this.fatherLogicExpression.logicExpressionList.push(this);
	}
	
	this.logicExpressionDiv = createHtmlElement({
		format: "button",
		className: "btn",
		id: id,
		father: fatherLogicExpression.logicExpressionContentDiv
	});
	$(this.logicExpressionDiv).css('background-color','white');	
	$(this.logicExpressionDiv).css('padding','0px');	

	$(this.logicExpressionDiv).addClass('deactivatedExpression');	
	$(this.logicExpressionDiv).addClass('mainDiv');	
	
    $('.btn').hover(function(){
		$(this).css('color','black');
	});
	
	$( this.logicExpressionDiv ).mouseover(function(event) {
		if($(this).hasClass('activatedExpression') || id == "topLogicExpression")
			return;
			
        $(this).addClass('enabledExpression');
		return false;
    });

	$( this.logicExpressionDiv ).mouseout(function(event) {
        $(this).removeClass('enabledExpression');
		return false;
    });
	
	$(this.logicExpressionDiv).mousedown(function(){
		var active = DialogMenuController.getActive();

		if(!active.logicExpression)
			return;

		var logicExpression = active.logicExpression.getLogicExpressionById(id);

		var activatedlogicExpression = active.logicExpression.getActivatedLogicExpression()
		if(activatedlogicExpression && activatedlogicExpression != logicExpression){
			activatedlogicExpression.deactivate();
			active.logicExpressionMenu.close();
			active.term.close();
		}
		
		if(logicExpression.id == "topLogicExpression")
			return;
			
			
		if(logicExpression.logicExpressionDiv.hasClass('deactivatedExpression')){
			
			if(logicExpression.logicExpressionList.length == 0){
				active.logicExpressionMenu.open(logicExpression);
				active.term.open(logicExpression);
			}
			else if(logicExpression.logicExpressionList.length == 1){
				active.logicOperatorMenu.open(logicExpression);
			}	
					
			$(logicExpression.logicExpressionDiv).removeClass('enabledExpression');	

			logicExpression.activate();

		}
		else if(logicExpression.logicExpressionDiv.hasClass('activatedExpression')){

			if(logicExpression.logicExpressionList.length == 0){
				active.logicExpressionMenu.close();
				active.term.close();
			}
			else if(logicExpression.logicExpressionList.length == 1){
				active.logicOperatorMenu.close();
			}	
				
			$(logicExpression.logicExpressionDiv).addClass('enabledExpression');	

			logicExpression.deactivate();
	
		}
		else{
			console.error('error');
		}

		return false;

	});

	this.logicExpressionContentDiv = createHtmlElement({
		format: "div",
		id: id+"Content",
		father: this.logicExpressionDiv
	});
 	$(this.logicExpressionContentDiv).addClass('contentDiv');

	this.dataDiv = createHtmlElement({
		format: "div",
		father: this.logicExpressionContentDiv
	});

	this.update();

	return this;
};

LogicExpression.prototype.activate = function(){
	$(this.logicExpressionDiv).removeClass('deactivatedExpression');	
	$(this.logicExpressionDiv).addClass('activatedExpression');
	var active = DialogMenuController.getActive();
	$(active.optionsMenu).show();
};

LogicExpression.prototype.deactivate = function(){
	$(this.logicExpressionDiv).removeClass('activatedExpression');	
	$(this.logicExpressionDiv).addClass('deactivatedExpression');
	var active = DialogMenuController.getActive();
	$(active.optionsMenu).hide();
};

LogicExpression.prototype.update = function(text,type){

	if(text != "" && text != DialogMenuData.dummyString && type){
		this.input.setText(text);
		this.input.setType(type);	
		$(this.dataDiv).text(this.input.getText());
		
		$(this.dataDiv).removeClass('dataDivWithoutContent');
		$(this.dataDiv).addClass('dataDivWithContent');
	}
	else{
		console.log(text,type);
		$(this.dataDiv).text(DialogMenuData.dummyString);
		
		$(this.dataDiv).removeClass('dataDivWithContent');
		$(this.dataDiv).addClass('dataDivWithoutContent');
	}

	$(this.dataDiv).show();
	
};

LogicExpression.prototype.remove = function(){
	console.log('remove',this);

	var father = this.fatherLogicExpression;

	if(father.logicExpressionList.length == 1){

		father.logicExpressionList.splice(0,1);
		father.input.inputElements.splice(0,1);

		var inputElement = new InputElement('true',InputType.bool);

		if(father.id == "topLogicExpression"){
			var logicExpression = father.addLogicExpression(inputElement);
			father.input.addInputElement(inputElement);
			logicExpression.input = inputElement;
			logicExpression.update(inputElement.input,inputElement.type);
		}
		else{
			father.input.input = 'true';
			father.input.type = InputType.bool;
			father.update(father.input.input,father.input.type);
		}

	}
	else if(father.logicExpressionList.length == 2){
			
		var logicOperator = father.logicOperatorList[0];

		if(this == father.logicExpressionList[0]){
			father.logicOperatorList.splice(0,1);
			father.input.inputElements.splice(1,1);

			father.logicExpressionList.splice(0,1);
			father.input.inputElements.splice(0,1);
		}
		else if(this == father.logicExpressionList[1]){
			father.logicExpressionList.splice(1,1);
			father.input.inputElements.splice(2,1);

			father.logicOperatorList.splice(0,1);
			father.input.inputElements.splice(1,1);
		}
		else{
			console.error('error in remove');
			return;
		}

		$(logicOperator.logicOperatorDiv).remove();
	}
	else{
		console.error('error in remove');
		return;
	}

	$(this.logicExpressionDiv).remove();

};

LogicExpression.prototype.addLogicExpression = function(){

	var id = this.id+"_"+this.idFactoryNum;
	this.idFactoryNum++;

	
	$(this.dataDiv).hide();

	if(this.logicExpressionList.length == 0){
		$(this.buttonEdit).hide();
	}
	else if(this.logicExpressionList.length == 1){
		$(this.buttonAdd).hide();
		$(this.buttonEdit).hide();
	}
	else{
		console.error('error in addLogicExpression');
		return;
	}

	var newLogicExpression = new LogicExpression(id,this);
	return newLogicExpression;
};

LogicExpression.prototype.addLogicOperator = function(){

	var id = this.id+"_"+this.idFactoryNum;
	this.idFactoryNum++;

	var newLogicOperator = new LogicOperator(id,this);
	return newLogicOperator;
};

LogicExpression.prototype.addComparison = function(){

	var id = this.id+"_"+this.idFactoryNum;
	this.idFactoryNum++;
	
	if(this.logicExpressionList.length == 0){
		var inputElement = new InputElement(this.input.input, this.input.type);
		console.log(inputElement);
	}
	this.input.type = InputType.logicExpression;
	this.input.input = "";
	
	var comparisonExpression = new ComparisonExpression(id,this);
	this.comparisonExpression = comparisonExpression;
	
	comparisonExpression.leftComparisonTerm.update(inputElement.input , inputElement.type);
	comparisonExpression.comparisonOperator.update('<' , InputType.comparisonOperator);
	return comparisonExpression;
};


LogicExpression.prototype.getLogicExpressionById = function(id){
	if(this.id == id)
		return this;

	for(var k=0; k<this.logicExpressionList.length; k++){
		var res = this.logicExpressionList[k].getLogicExpressionById(id);
		if(res){
			return res;
		}
	}
};

LogicExpression.prototype.getLogicOperatorById = function(id){

	for(var k=0; k<this.logicOperatorList.length; k++){
		if(this.logicOperatorList[k].id == id){
			return this.logicOperatorList[k];
		}
	}

	for(var k=0; k<this.logicExpressionList.length; k++){
		var res = this.logicExpressionList[k].getLogicOperatorById(id);
		if(res){
			return res;
		}
	}
};

LogicExpression.prototype.getActivatedLogicExpression = function(){
		
	if( $(this.logicExpressionDiv).hasClass('activatedExpression') )
		return this;
		
	for(var k=0; k<this.logicExpressionList.length; k++){
		var res = this.logicExpressionList[k].getActivatedLogicExpression();
		if(res){
			return res;
		}
	}
};

LogicExpression.prototype.getEnabledLogicExpression = function(){

	if( $(this.logicExpressionDiv).hasClass('enabledExpression') )
		return this;

	for(var k=0; k<this.logicExpressionList.length; k++){
		var res = this.logicExpressionList[k].getEnabledLogicExpression();
		if(res){
			return res;
		}
	}
};

LogicExpression.prototype.getActivatedComparisonTerm = function(){

	if( this.comparisonExpression ){
		var ret = this.comparisonExpression.getActivatedComparisonTerm();
		if(ret)
			return ret;
	}

	for(var k=0; k<this.logicExpressionList.length; k++){
		var res = this.logicExpressionList[k].getActivatedComparisonTerm();
		if(res)
			return res;
	}
};

LogicExpression.prototype.getActivatedComparisonOperator = function(){

	if( this.comparisonExpression ){
		var ret = this.comparisonExpression.getActivatedComparisonOperator();
		if(ret)
			return ret;
	}

	for(var k=0; k<this.logicExpressionList.length; k++){
		var res = this.logicExpressionList[k].getActivatedComparisonOperator();
		if(res)
			return res;
	}
};

LogicExpression.prototype.setInput = function(inputElement){
	this.input = inputElement;
	$(this.dataDiv).text(this.input.input);
	if(inputElement.input != DialogMenuData.dummyString){
		$(this.dataDiv).css('font-size','1em');
	}
};

LogicExpression.prototype.parseLogicExpression = function(inputElement){
		
	if(!inputElement)
		console.error('error in parseLogicExpression');
	
	var newInputElement = new InputElement(inputElement.input , inputElement.type);
		
	this.input = newInputElement;
	
	if(this.fatherLogicExpression instanceof LogicExpression)
		this.fatherLogicExpression.input.addInputElement(newInputElement);
		
	if(inputElement.inputElements.length == 3){

		var newLogicExpression = this.addLogicExpression();
		newLogicExpression.parseLogicExpression(inputElement.inputElements[0]);

		var newLogicOperator = this.addLogicOperator();
		this.input.addInputElement(inputElement.inputElements[1]);
		newLogicOperator.setInput(inputElement.inputElements[1]);
		
		var newLogicExpression = this.addLogicExpression();
		newLogicExpression.parseLogicExpression(inputElement.inputElements[2]);
	}
	else if(inputElement.inputElements.length == 1){
		
		if(inputElement.type == InputType.logicExpression){
			if(inputElement.inputElements.length == 1 && inputElement.inputElements[0].type == InputType.comparisonExpression){
				this.addComparison();
				this.comparisonExpression.parseComparisonExpression(inputElement.inputElements[0],this.comparisonExpression.input);
				return;
			}
		}
		
		var newLogicExpression = this.addLogicExpression();
		newLogicExpression.parseLogicExpression(inputElement.inputElements[0]);		
	}
	else if(inputElement.inputElements.length == 0){

		var newLogicExpression = this;

		newLogicExpression.update(this.input.getText(),this.input.type);
	}
	else{
		console.error(this,' error during parseLogicExpression');
	}
	
};

LogicExpression.prototype.show = function(){
	$(this.logicExpressionDiv).show();
};

LogicExpression.prototype.hide = function(){
	$(this.logicExpressionDiv).hide();
};

LogicExpression.prototype.init = function(){
};
