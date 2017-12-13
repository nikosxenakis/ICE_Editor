function ArrayTerm(id,fatherArrayExpression){

	this.id = id;
	this.fatherArrayExpression = fatherArrayExpression;
	
	this.input = new InputElement(DialogMenuData.dummyString,InputType.localId);
	
	fatherArrayExpression.arrayTermList.push(this);
	
	if( fatherArrayExpression.arrayTermList.length > 1 ){

		this.arrayElementCommaDiv = createHtmlElement({
			format: "div",
			text: ",",
			father: fatherArrayExpression.arrayExpressionContentDiv
		});
		$(this.arrayElementCommaDiv).css('display', 'inline-block');
		$(this.arrayElementCommaDiv).css('margin', '6px');
		$(this.arrayElementCommaDiv).css('display', 'inline-block');
		$(this.arrayElementCommaDiv).css('vertical-align', 'bottom');

	}

	this.arrayElementDiv = createHtmlElement({
		format: "div",
		id: id,
		father: fatherArrayExpression.arrayExpressionContentDiv
	});
	$(this.arrayElementDiv).addClass('deactivatedExpression');
	$(this.arrayElementDiv).addClass('mainDiv');	

	$(this.arrayElementDiv).mouseover(function(){	
		if($(this).hasClass('activatedExpression'))
			return;
			
        $(this).addClass('enabledExpression');
		return false;
	});

	$( this.arrayElementDiv ).mouseout(function(event) {
        $(this).removeClass('enabledExpression');
		return false;
    });

	$(this.arrayElementDiv).mousedown(function(){
		var active = DialogMenuController.getActive();

		if(!active.arrayExpression)
			return;

		var arrayTerm = active.arrayExpression.getArrayElementById(id);

		var activatedArrayTerm = active.arrayExpression.getActivatedArrayElement();
		if(activatedArrayTerm && activatedArrayTerm != arrayTerm){
			activatedArrayTerm.deactivate();
			active.term.close();
		}

		if(arrayTerm.arrayElementDiv.hasClass('deactivatedExpression')){
			
			active.term.open(arrayTerm);

			$(arrayTerm.arrayElementDiv).removeClass('enabledExpression');	

			arrayTerm.activate();

		}
		else if(arrayTerm.arrayElementDiv.hasClass('activatedExpression')){

			active.term.close();

				
			$(arrayTerm.arrayElementDiv).addClass('enabledExpression');	

			arrayTerm.deactivate();
	
		}
		else{
			console.error('error');
		}

		return false;

	});
	
	this.dataDiv = createHtmlElement({
		format: "div",
		id: id+"Content",
		father: this.arrayElementDiv
	});
	$(this.dataDiv).addClass('contentDiv');

	this.update();
	
	return this;
};

ArrayTerm.prototype.update = function(text,type){

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
	
};

ArrayTerm.prototype.remove = function(){
	console.log('remove ',this.id);

	var array = this.fatherArrayExpression.arrayTermList;

	var i = array.indexOf(this);
	if(i != -1) {
		array.splice(i, 1);
	}

	var array = this.fatherArrayExpression.input.inputElements;

	var i = array.indexOf(this.input);
	if(i != -1) {
		array.splice(i, 1);
	}
	$(this.arrayElementCommaDiv).remove();
	$(this.arrayElementDiv).remove();

};

ArrayTerm.prototype.activate = function(){
	console.log("ArrayElement active");
	$(this.arrayElementDiv).removeClass('deactivatedExpression');	
	$(this.arrayElementDiv).addClass('activatedExpression');

	var active = DialogMenuController.getActive();
	$(active.optionsMenu).show();
};

ArrayTerm.prototype.deactivate = function(){
	console.log("ArrayElement deactivate");
	$(this.arrayElementDiv).removeClass('activatedExpression');	
	$(this.arrayElementDiv).addClass('deactivatedExpression');

	var active = DialogMenuController.getActive();
	$(active.optionsMenu).hide();
};

ArrayTerm.prototype.update = function(text,type){

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