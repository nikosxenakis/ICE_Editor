function ArithmeticExpression(id,fatherArithmeticExpression){

	this.id = id;
	this.idFactoryNum = 0;
	this.arithmeticExpressionList = new Array();
	this.arithmeticOperatorList = new Array();

	this.fatherArithmeticExpression = fatherArithmeticExpression;

	if(this.fatherArithmeticExpression instanceof ArithmeticExpression){
		this.fatherArithmeticExpression.arithmeticExpressionList.push(this);
	}
	
	this.arithmeticExpressionDiv = createHtmlElement({
		format: "button",
		className: "btn",
		id: id,
		father: fatherArithmeticExpression.arithmeticExpressionContentDiv
	});
	$(this.arithmeticExpressionDiv).css('background-color','white');	
	$(this.arithmeticExpressionDiv).css('padding','0px');	

	$(this.arithmeticExpressionDiv).addClass('deactivatedExpression');	
	$(this.arithmeticExpressionDiv).addClass('mainDiv');	
	
    $('.btn').hover(function(){
		$(this).css('color','black');
	});
	
	$( this.arithmeticExpressionDiv ).mouseover(function(event) {
		if($(this).hasClass('activatedExpression') || id == "topArithmeticExpression")
			return;
			
        $(this).addClass('enabledExpression');
		return false;
    });

	$( this.arithmeticExpressionDiv ).mouseout(function(event) {
        $(this).removeClass('enabledExpression');
		return false;
    });
	
	$(this.arithmeticExpressionDiv).mousedown(function(){
		var active = DialogMenuController.getActive();

		if(!active.arithmeticExpression)
			return;

		var arithmeticExpression = active.arithmeticExpression.getArithmeticExpressionById(id);

		var activatedarithmeticExpression = active.arithmeticExpression.getActivatedArithmeticExpression()
		if(activatedarithmeticExpression && activatedarithmeticExpression != arithmeticExpression){
			activatedarithmeticExpression.deactivate();
			active.arithmeticExpressionMenu.close();
			active.term.close();
		}
		
		if(arithmeticExpression.id == "topArithmeticExpression")
			return;
			
			
		if(arithmeticExpression.arithmeticExpressionDiv.hasClass('deactivatedExpression')){
			
			if(arithmeticExpression.arithmeticExpressionList.length == 0){
				active.arithmeticExpressionMenu.open(arithmeticExpression);
				active.term.open(arithmeticExpression);
			}
			else if(arithmeticExpression.arithmeticExpressionList.length == 1){
				active.arithmeticOperatorMenu.open(arithmeticExpression);
			}	
					
			$(arithmeticExpression.arithmeticExpressionDiv).removeClass('enabledExpression');	

			arithmeticExpression.activate();

		}
		else if(arithmeticExpression.arithmeticExpressionDiv.hasClass('activatedExpression')){

			if(arithmeticExpression.arithmeticExpressionList.length == 0){
				active.arithmeticExpressionMenu.close();
				active.term.close();
			}
			else if(arithmeticExpression.arithmeticExpressionList.length == 1){
				active.arithmeticOperatorMenu.close();
			}	
				
			$(arithmeticExpression.arithmeticExpressionDiv).addClass('enabledExpression');	

			arithmeticExpression.deactivate();
	
		}
		else{
			console.error('error');
		}

		return false;

	});

	this.arithmeticExpressionContentDiv = createHtmlElement({
		format: "div",
		id: id+"Content",
		father: this.arithmeticExpressionDiv
	});
 	$(this.arithmeticExpressionContentDiv).addClass('contentDiv');

	this.dataDiv = createHtmlElement({
		format: "div",
		father: this.arithmeticExpressionContentDiv
	});

	this.update();

	return this;
};

ArithmeticExpression.prototype.activate = function(){
	$(this.arithmeticExpressionDiv).removeClass('deactivatedExpression');	
	$(this.arithmeticExpressionDiv).addClass('activatedExpression');
	var active = DialogMenuController.getActive();
	$(active.optionsMenu).show();
};

ArithmeticExpression.prototype.deactivate = function(){
	$(this.arithmeticExpressionDiv).removeClass('activatedExpression');	
	$(this.arithmeticExpressionDiv).addClass('deactivatedExpression');
	var active = DialogMenuController.getActive();
	$(active.optionsMenu).hide();
};

ArithmeticExpression.prototype.update = function(text,type){

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

ArithmeticExpression.prototype.remove = function(){
	console.log('remove',this);

	var father = this.fatherArithmeticExpression;

	if(father.arithmeticExpressionList.length == 1){

		father.arithmeticExpressionList.splice(0,1);
		father.input.inputElements.splice(0,1);

		var inputElement = new InputElement('true',InputType.bool);

		if(father.id == "topArithmeticExpression"){
			var arithmeticExpression = father.addArithmeticExpression(inputElement);
			father.input.addInputElement(inputElement);
			arithmeticExpression.input = inputElement;
			arithmeticExpression.update(inputElement.input,inputElement.type);
		}
		else{
			father.input.input = 'true';
			father.input.type = InputType.bool;
			father.update(father.input.input,father.input.type);
		}

	}
	else if(father.arithmeticExpressionList.length == 2){
			
		var arithmeticOperator = father.arithmeticOperatorList[0];

		if(this == father.arithmeticExpressionList[0]){
			father.arithmeticOperatorList.splice(0,1);
			father.input.inputElements.splice(1,1);

			father.arithmeticExpressionList.splice(0,1);
			father.input.inputElements.splice(0,1);
		}
		else if(this == father.arithmeticExpressionList[1]){
			father.arithmeticExpressionList.splice(1,1);
			father.input.inputElements.splice(2,1);

			father.arithmeticOperatorList.splice(0,1);
			father.input.inputElements.splice(1,1);
		}
		else{
			console.error('error in remove');
			return;
		}

		$(arithmeticOperator.arithmeticOperatorDiv).remove();
	}
	else{
		console.error('error in remove');
		return;
	}

	$(this.arithmeticExpressionDiv).remove();

};

ArithmeticExpression.prototype.addArithmeticExpression = function(){

	var id = this.id+"_"+this.idFactoryNum;
	this.idFactoryNum++;

	
	$(this.dataDiv).hide();

	if(this.arithmeticExpressionList.length == 0){
		$(this.buttonEdit).hide();
	}
	else if(this.arithmeticExpressionList.length == 1){
		$(this.buttonAdd).hide();
		$(this.buttonEdit).hide();
	}
	else{
		console.error('error in addArithmeticExpression');
		return;
	}

	var newArithmeticExpression = new ArithmeticExpression(id,this);
	return newArithmeticExpression;
};

ArithmeticExpression.prototype.addArithmeticOperator = function(){

	var id = this.id+"_"+this.idFactoryNum;
	this.idFactoryNum++;

	var newArithmeticOperator = new ArithmeticOperator(id,this);
	return newArithmeticOperator;
};

ArithmeticExpression.prototype.addComparison = function(){

	var id = this.id+"_"+this.idFactoryNum;
	this.idFactoryNum++;
	
	if(this.arithmeticExpressionList.length == 0){
		var inputElement = new InputElement(this.input.input, this.input.type);
		console.log(inputElement);
	}
	this.input.type = InputType.arithmeticExpression;
	this.input.input = "";
	
	var comparisonExpression = new ComparisonExpression(id,this);
	this.comparisonExpression = comparisonExpression;
	
	comparisonExpression.leftComparisonTerm.update(inputElement.input , inputElement.type);
	comparisonExpression.comparisonOperator.update('<' , InputType.comparisonOperator);
	return comparisonExpression;
};


ArithmeticExpression.prototype.getArithmeticExpressionById = function(id){
	if(this.id == id)
		return this;

	for(var k=0; k<this.arithmeticExpressionList.length; k++){
		var res = this.arithmeticExpressionList[k].getArithmeticExpressionById(id);
		if(res){
			return res;
		}
	}
};

ArithmeticExpression.prototype.getArithmeticOperatorById = function(id){

	for(var k=0; k<this.arithmeticOperatorList.length; k++){
		if(this.arithmeticOperatorList[k].id == id){
			return this.arithmeticOperatorList[k];
		}
	}

	for(var k=0; k<this.arithmeticExpressionList.length; k++){
		var res = this.arithmeticExpressionList[k].getArithmeticOperatorById(id);
		if(res){
			return res;
		}
	}
};

ArithmeticExpression.prototype.getActivatedArithmeticExpression = function(){
		
	if( $(this.arithmeticExpressionDiv).hasClass('activatedExpression') )
		return this;
		
	for(var k=0; k<this.arithmeticExpressionList.length; k++){
		var res = this.arithmeticExpressionList[k].getActivatedArithmeticExpression();
		if(res){
			return res;
		}
	}
};

ArithmeticExpression.prototype.getEnabledArithmeticExpression = function(){

	if( $(this.arithmeticExpressionDiv).hasClass('enabledExpression') )
		return this;

	for(var k=0; k<this.arithmeticExpressionList.length; k++){
		var res = this.arithmeticExpressionList[k].getEnabledArithmeticExpression();
		if(res){
			return res;
		}
	}
};

ArithmeticExpression.prototype.getActivatedComparisonTerm = function(){

	if( this.comparisonExpression ){
		var ret = this.comparisonExpression.getActivatedComparisonTerm();
		if(ret)
			return ret;
	}

	for(var k=0; k<this.arithmeticExpressionList.length; k++){
		var res = this.arithmeticExpressionList[k].getActivatedComparisonTerm();
		if(res)
			return res;
	}
};

ArithmeticExpression.prototype.getActivatedComparisonOperator = function(){

	if( this.comparisonExpression ){
		var ret = this.comparisonExpression.getActivatedComparisonOperator();
		if(ret)
			return ret;
	}

	for(var k=0; k<this.arithmeticExpressionList.length; k++){
		var res = this.arithmeticExpressionList[k].getActivatedComparisonOperator();
		if(res)
			return res;
	}
};

ArithmeticExpression.prototype.setInput = function(inputElement){
	this.input = inputElement;
	$(this.dataDiv).text(this.input.input);
	if(inputElement.input != DialogMenuData.dummyString){
		$(this.dataDiv).css('font-size','1em');
	}
};

ArithmeticExpression.prototype.parseArithmeticExpression = function(inputElement){
		
	if(!inputElement)
		console.error('error in parseArithmeticExpression');
	
	var newInputElement = new InputElement(inputElement.input , inputElement.type);
		
	this.input = newInputElement;
	
	if(this.fatherArithmeticExpression instanceof ArithmeticExpression)
		this.fatherArithmeticExpression.input.addInputElement(newInputElement);
		
	if(inputElement.inputElements.length == 3){

		var newArithmeticExpression = this.addArithmeticExpression();
		newArithmeticExpression.parseArithmeticExpression(inputElement.inputElements[0]);

		var newArithmeticOperator = this.addArithmeticOperator();
		this.input.addInputElement(inputElement.inputElements[1]);
		newArithmeticOperator.setInput(inputElement.inputElements[1]);
		
		var newArithmeticExpression = this.addArithmeticExpression();
		newArithmeticExpression.parseArithmeticExpression(inputElement.inputElements[2]);
	}
	else if(inputElement.inputElements.length == 1){
		
		if(inputElement.type == InputType.arithmeticExpression){
			if(inputElement.inputElements.length == 1 && inputElement.inputElements[0].type == InputType.comparisonExpression){
				this.addComparison();
				this.comparisonExpression.parseComparisonExpression(inputElement.inputElements[0],this.comparisonExpression.input);
				return;
			}
		}
		
		var newArithmeticExpression = this.addArithmeticExpression();
		newArithmeticExpression.parseArithmeticExpression(inputElement.inputElements[0]);		
	}
	else if(inputElement.inputElements.length == 0){

		var newArithmeticExpression = this;

		newArithmeticExpression.update(this.input.getText(),this.input.type);
	}
	else{
		console.error(this,' error during parseArithmeticExpression');
	}
	
};

ArithmeticExpression.prototype.show = function(){
	$(this.arithmeticExpressionDiv).show();
};

ArithmeticExpression.prototype.hide = function(){
	$(this.arithmeticExpressionDiv).hide();
};

ArithmeticExpression.prototype.init = function(){
};
