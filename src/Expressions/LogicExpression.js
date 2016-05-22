function LogicExpression(id,fatherLogicExpression,inputElement){

	this.id = id;
	this.idFactoryNum = 0;
	this.logicExpressionList = new Array();
	this.logicOperatorList = new Array();

	if(inputElement)
		this.input = inputElement;
	else{
		this.input = new InputElement("" , InputType.logicExpression);
	}

	this.fatherLogicExpression = fatherLogicExpression;

	if(this.fatherLogicExpression instanceof LogicExpression){
		this.fatherLogicExpression.logicExpressionList.push(this);
	}


	this.logicExpressionDiv = createHtmlElement({
		format: "div",
		id: id,
		father: fatherLogicExpression.logicExpressionContentDiv
	});

	$(this.logicExpressionDiv).addClass('deactivatedExpression');	
	$(this.logicExpressionDiv).addClass('mainDiv');	

	$(this.logicExpressionDiv).mouseover(function(){
		var active = DialogMenuController.getActive();

		if(!active.logicExpression)
			return;

		var logicExpression = active.logicExpression.getLogicExpressionById(id);

		$(logicExpression.dropdown).css('left',$(logicExpression.logicExpressionDiv).position().left + $(logicExpression.logicExpressionDiv).width());

		var top = $(logicExpression.logicExpressionDiv).position().top + 20;
		var left = $(logicExpression.logicExpressionDiv).position().left + $(logicExpression.logicExpressionDiv).width() - 10;

		$(logicExpression.dropdownUl).css('left',left);
		$(logicExpression.dropdownUl).css('top',top);


		if(logicExpression.logicExpressionList.length == 2 && logicExpression.id == "topLogicExpression"){
			$(logicExpression.optionsDiv).hide();
		}
		else{
			$(logicExpression.optionsDiv).show();
		}
	});

	$(this.logicExpressionDiv).mouseout(function(){
		var active = DialogMenuController.getActive();

		if(!active.logicExpression)
			return;

		var logicExpression = active.logicExpression.getLogicExpressionById(id);

		$(logicExpression.optionsDiv).hide();
	});

	this.optionsDiv = createHtmlElement({
		format: "div",
		father: this.logicExpressionDiv
	});

	this.logicExpressionContentDiv = createHtmlElement({
		format: "div",
		id: id+"Content",
		father: this.logicExpressionDiv
	});
 	$(this.logicExpressionContentDiv).addClass('contentDiv');

	this.dataDiv = createHtmlElement({
		format: "div",
		text: this.input.getText(),
		father: this.logicExpressionContentDiv
	});

	this.dropdown = createHtmlElement({
		format: "div",
		className: "dropdown dropdownMultiDepth",
		father: this.optionsDiv
	});

	this.dropdownA = createHtmlElement({
		format: "span",
		className: "glyphicon glyphicon-menu-down",
		id: "dLabel",
		father: this.dropdown
	});
	$(this.dropdownA).attr('data-toggle','dropdown');

	this.dropdownUl = createHtmlElement({
		format: "ul",
		className: "dropdown-menu",
		id: "dLabel",
		father: this.dropdown
	});
	$(this.dropdownUl).attr('aria-labelledby','dropdownMenu');

	this.dropdownList = createHtmlElement({
		format: "li",
		father: this.dropdownUl
	});

	this.buttonAdd = createHtmlElement({
		format: "a",
		text: "add",
		father: this.dropdownList
	});

	$(this.buttonAdd).mousedown(function(){

		var active = DialogMenuController.getActive();
		var topLogicExpression =  active.logicExpression;
		
		var logicExpression = topLogicExpression.getLogicExpressionById(id);
		console.log(logicExpression);

		if(logicExpression.logicExpressionList.length == 0 ){

			//logicExpression has content
			var father = logicExpression.fatherLogicExpression;

	    	if(!(father instanceof LogicExpression))
	    		return;
		
			var inputElement = logicExpression.input;
			var newInputElement = new InputElement(inputElement.getText(),inputElement.type);

			$(logicExpression.dataDiv).hide();

			inputElement.setText('');
			inputElement.setType(InputType.logicExpression);
			inputElement.addInputElement(newInputElement);
			var newLogicExpression3 = logicExpression.addLogicExpression(newInputElement);			
		}
		else if(logicExpression.logicExpressionList.length == 1 ){
			var inputElement = new InputElement("and",InputType.logicOperator);
			logicExpression.input.addInputElement(inputElement);
			logicExpression.addLogicOperator(inputElement);

			var inputElement = new InputElement("true",InputType.bool);
			logicExpression.input.addInputElement(inputElement);
			logicExpression.addLogicExpression(inputElement);
		}
		else{
			console.error('no such case in buttonAdd');
		}
	});

	this.buttonEdit = createHtmlElement({
		format: "a",
		text: "edit",
		father: this.dropdownList
	});

	$(this.buttonEdit).mousedown(function(){
		var active = DialogMenuController.getActive();
		var topLogicExpression =  active.logicExpression;
		if(!topLogicExpression){
			if(active.expression){
				var topLogicExpression =  active.expression.logicExpression;
			}
			else if(active.logicExpression){
				var topLogicExpression =  active.logicExpression;
			}
		}
		
		var logicExpression = topLogicExpression.getLogicExpressionById(id);
		console.log(logicExpression);

		if(logicExpression.logicExpressionList.length >0)
			return;

		console.log("open Add Content Logic Expression Dialog Menu");

		DialogMenuController.open(logicExpression);
	});

	this.buttonClose = createHtmlElement({
		format: "a",
		text: "remove",
		father: this.dropdownList
	});

	$(this.buttonClose).mousedown(function(){
		var active = DialogMenuController.getActive();
		var topLogicExpression =  active.logicExpression;
		
		var logicExpression = topLogicExpression.getLogicExpressionById(id);

	    logicExpression.remove();

	});

	$(this.optionsDiv).hide();

	return this;
};

LogicExpression.prototype.activate = function(){
	console.log("LogicExpression active");
	$(this.optionsDiv).hide();
	$(this.logicExpressionDiv).removeClass('deactivatedExpression');	
	$(this.logicExpressionDiv).addClass('activatedExpression');
};

LogicExpression.prototype.deactivate = function(){
	console.log("LogicExpression deactivate");
	$(this.optionsDiv).show();
	$(this.logicExpressionDiv).removeClass('activatedExpression');	
	$(this.logicExpressionDiv).addClass('deactivatedExpression');
};

LogicExpression.prototype.update = function(){
	console.log("LogicOperator update");
	console.log(this.input);

	$(this.dataDiv).show();
	$(this.dataDiv).text(this.input.getText());
};

LogicExpression.prototype.remove = function(){
	console.log('remove',this);

	var father = this.fatherLogicExpression;

	if(father.logicExpressionList.length == 1){
		if(father.id == "topLogicExpression")
			return;

		father.logicExpressionList.splice(0,1);
		father.input.inputElements.splice(0,1);

		var inputElement = new InputElement('true',InputType.bool);
		father.input = inputElement;
		father.fatherLogicExpression.input.addInputElement(inputElement);
		$(father.dataDiv).text(father.input.getText());
		$(father.dataDiv).show();
		
	
		$(father.buttonAdd).show();
		$(father.buttonEdit).show();
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
			
		$(father.buttonAdd).show();
		$(father.optionsDiv).show();

		$(logicOperator.logicOperatorDiv).remove();
	}
	else{
		console.error('error in remove');
		return;
	}

	$(this.logicExpressionDiv).remove();

};

LogicExpression.prototype.addLogicExpression = function(inputElement){

	if(!inputElement)
		console.error('addLogicExpression no inputElement');

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

	var newLogicExpression = new LogicExpression(id,this,inputElement);
	return newLogicExpression;
};

LogicExpression.prototype.addLogicOperator = function(inputElement){

	if(!inputElement)
		console.error('addLogicOperator no inputElement');

	var id = this.id+"_"+this.idFactoryNum;
	this.idFactoryNum++;

	var newLogicOperator = new LogicOperator(id,this,inputElement);
	return newLogicOperator;
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

LogicExpression.prototype.parseLogicExpression = function(inputElement){

	console.log(inputElement);
	
	if(inputElement.inputElements.length == 3){

		var newLogicExpression = this.addLogicExpression(inputElement.inputElements[0]);
		newLogicExpression.parseLogicExpression(inputElement.inputElements[0]);

		this.addLogicOperator(inputElement.inputElements[1]);
		
		var newLogicExpression = this.addLogicExpression(inputElement.inputElements[2]);
		newLogicExpression.parseLogicExpression(inputElement.inputElements[2]);
	}
	else if(inputElement.inputElements.length == 1){

		var newLogicExpression = this.addLogicExpression(inputElement.inputElements[0]);
		newLogicExpression.parseLogicExpression(inputElement.inputElements[0]);

	}
	else if(inputElement.inputElements.length == 0){

		var newLogicExpression = this;
		//newLogicExpression.input = inputElement;

		//if(!(this.fatherLogicExpression instanceof LogicExpression)){
		//	newLogicExpression = this.addLogicExpression(inputElement);
		//}

		$(newLogicExpression.dataDiv).show();
		$(newLogicExpression.dataDiv).text(inputElement.getText());

	}
	else{
		console.error('error during parseLogicExpression');
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
