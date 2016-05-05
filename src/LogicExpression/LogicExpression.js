function LogicExpression(id,fatherLogicExpression){

	this.id = id;
	this.idFactoryNum = 0;
	this.logicExpressionList = new Array();
	this.logicOperatorList = new Array();
	this.input = new InputElement("" , InputType.logicExpressionTerm);

	this.fatherLogicExpression = fatherLogicExpression;

	if(this.fatherLogicExpression instanceof LogicExpression){
		this.fatherLogicExpression.logicExpressionList.push(this);
		if(this.fatherLogicExpression.buttonContent)
			$(this.fatherLogicExpression.buttonContent).hide();		
	}


	this.logicExpressionDiv = createHtmlElement({
		format: "div",
		id: id,
		father: fatherLogicExpression.logicExpressionContentDiv,
		border: "groove"
	});

	if(!(this.fatherLogicExpression instanceof LogicExpression)){
		$(this.logicExpressionDiv).css('width', '100%');
	}
	
	$(this.logicExpressionDiv).css('display', 'inline-block');


	this.buttonClose = createHtmlElement({
		format: "span",
		id: id+"buttonClose",
		className: "close",
		text: "x",
		father: this.logicExpressionDiv,
		object: this.id
	});
	$(this.buttonClose).css('overflow', 'auto');
	$(this.buttonClose).mousedown(function(){
		var active = DialogMenuController.getActive();
		var logicExpression = active.getLogicExpressionById(id);

	    logicExpression.remove();
	});
	if(!(this.fatherLogicExpression instanceof LogicExpression)){
		$(this.buttonClose).hide();
	}

	this.logicExpressionContentDiv = createHtmlElement({
		format: "div",
		id: id+"Content",
		father: this.logicExpressionDiv
	});
	$(this.logicExpressionContentDiv).css('margin', 5);
	$(this.logicExpressionContentDiv).css('margin-top', 25);
	$(this.logicExpressionContentDiv).css('text-align', 'center');


	this.buttonContent = createHtmlElement({
		format: "button",
		text: "add content",
		father: this.logicExpressionContentDiv,
		width: '105px'
	});
	$(this.buttonContent).mousedown(function(){
		var active = DialogMenuController.getActive();
		var logicExpression = active.getLogicExpressionById(id);

		console.log("open Add Content Logic Expression Dialog Menu");

		DialogMenuController.open(logicExpression);

	});

	this.dataDiv = createHtmlElement({
		format: "div",
		text: this.input.input,
		father: this.logicExpressionContentDiv
	});
	$(this.dataDiv).mousedown(function(){
		var active = DialogMenuController.getActive();
		var logicExpression = active.getLogicExpressionById(id);

		console.log("open Edit Content Logic Expression Dialog Menu");

		DialogMenuController.open(logicExpression);

	});
	$(this.dataDiv).hide();

	this.buttonAdd = createHtmlElement({
		format: "span",
		id: id+"buttonAddSpan",
		className: "glyphicon btn-glyphicon glyphicon-plus img-circle text-success",
		father: this.logicExpressionDiv,
		textAllign: 'right'
	});
	$(this.buttonAdd).css('float', 'right');
	$(this.buttonAdd).mousedown(function(){

		var active = DialogMenuController.getActive();
		var logicExpression = active.getLogicExpressionById(id);
		console.log(logicExpression);

		if( $(logicExpression.dataDiv).is(":visible") == false ){
			if(logicExpression.logicExpressionList.length > 0 )
				logicExpression.addLogicOperator();
			logicExpression.addLogicExpression();
		}
		else{
			//logicExpression has content
			var father = logicExpression.fatherLogicExpression;
	    	if(!(father instanceof LogicExpression))
	    		return;
		
			var text = $(logicExpression.dataDiv).text(); 	
			$(logicExpression.dataDiv).hide();

			var newLogicExpression2 = logicExpression.addLogicExpression();
			logicExpression.addLogicOperator();
			var newLogicExpression3 = logicExpression.addLogicExpression();

			$(newLogicExpression2.dataDiv).show();
			$(newLogicExpression2.dataDiv).text(text);
			$(newLogicExpression2.buttonContent).hide();
		}
	});
	
	return this;
};

LogicExpression.prototype.activate = function(){
	console.log("LogicExpression active");
};

LogicExpression.prototype.deactivate = function(){
	console.log("LogicExpression deactivate");
};

LogicExpression.prototype.update = function(){
	console.log("LogicOperator update");
	console.log(this.input);

	$(this.buttonContent).hide();
	$(this.dataDiv).show();
	$(this.dataDiv).text(this.input.getText());
};

LogicExpression.prototype.getDiv = function(){
	return this.logicExpressionDiv;
};

LogicExpression.prototype.remove = function(){
	console.log('remove',this);

	if(this.fatherLogicExpression instanceof LogicExpression){
		var array = this.fatherLogicExpression.logicExpressionList;

		var i = array.indexOf(this);
		if(i != -1) {
			array.splice(i, 1);
		}

		if(array.length > 0){
			var array2 = this.fatherLogicExpression.logicOperatorList;
			console.log(array2);
			if(i<array2.length){
				var elem = array2[i];
				array2.splice(i, 1);
			}
			else{
				var elem = array2[i-1];
				array2.splice(i-1, 1);
			}
			$(elem.logicOperatorDiv).remove();
		}
	}

	$(this.logicExpressionDiv).remove();

	if(this.fatherLogicExpression.logicExpressionList.length == 0)
		$(this.fatherLogicExpression.buttonContent).show();

};

LogicExpression.prototype.addLogicExpression = function(){
	console.log('add in ',this.id);

	var id = this.id+"_"+this.idFactoryNum;
	this.idFactoryNum++;

	var newLogicExpression = new LogicExpression(id,this);
	return newLogicExpression;
};

LogicExpression.prototype.addLogicOperator = function(data){
	console.log('add in ',this.id);

	var id = this.id+"_"+this.idFactoryNum;
	this.idFactoryNum++;

	var newLogicOperator = new LogicOperator(id,this,data);
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

LogicExpression.prototype.parseLogicExpression = function(expr){

	var data = null;	
	var operator = expr.operator;
	if(operator == "AND")
		data = LogicOperatorType.AND;
	else if(operator == "OR")
		data = LogicOperatorType.OR;


	if(data==null){

		var text = this.parseExpression(expr);


		var newLogicExpression = this;

		if(!(this.fatherLogicExpression instanceof LogicExpression)){
			newLogicExpression = this.addLogicExpression();
		}
			
		$(newLogicExpression.buttonContent).hide();

		$(newLogicExpression.dataDiv).show();
		$(newLogicExpression.dataDiv).text(text);

	}
	else{

		var left = expr.left;
		var newLogicExpression = this.addLogicExpression();
		newLogicExpression.parseLogicExpression(left);

		this.addLogicOperator(data);
		
		var right = expr.right;
		var newLogicExpression = this.addLogicExpression();
		newLogicExpression.parseLogicExpression(right);


	}

};

LogicExpression.prototype.parseExpression = function(expr){

	var text = "";

	var name = expr.name;
	var raw = expr.raw;

	if(name)
		return name;
	if(raw)
		return raw;

	var left = expr.left;
	if(left)
		text += this.parseExpression(left);

	var operator = expr.operator;
	if(operator)
		text += operator;

	var right = expr.right;
	if(right)
		text += this.parseExpression(right);

	return text;
};

/*
LogicExpression.prototype.calculateWidth = function(){
	var numExpr = this.logicExpressionList.length;
	var numOpr = this.logicOperatorList.length;
	var num = numExpr + numOpr;
	
	if(num>0)
		var perc = 100/num-6;
	else
		var perc = 100;
	console.log('perc = ',perc);
	for(var k=0; k<numExpr; k++){
		$(this.logicExpressionList[k].logicExpressionDiv).width(perc.toString()+'%');
	}
	for(var k=0; k<numOpr; k++){
		$(this.logicOperatorList[k].logicOperatorDiv).width(perc.toString()+'%');
	}
};

LogicExpression.prototype.calculateWidth = function(){
	var numExpr = this.logicExpressionList.length;
	var numOpr = this.logicOperatorList.length;
	var num = numExpr + numOpr;
	
	var maxWidth = $(this.fatherLogicExpression.logicExpressionContentDiv).width();
	console.log(maxWidth);
	var oprPerc = 50/maxWidth;
	var totalOprPerc = numOpr*oprPerc*100;
	console.log(totalOprPerc);
	if(num>0)
		var perc = (100-totalOprPerc)/numExpr-7;
	else
		var perc = 100;

	console.log('perc = ',perc);
	for(var k=0; k<numExpr; k++){
		$(this.logicExpressionList[k].logicExpressionDiv).width(perc.toString()+'%');
	}

};
*/
