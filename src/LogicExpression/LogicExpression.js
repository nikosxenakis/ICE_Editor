function LogicExpression(id,father,fatherLogicExpression){
	
	this.id = id;
	this.logicExpressionList = new Array();
	this.fatherLogicExpression = fatherLogicExpression;

	this.logicExpressionDiv = createHtmlElement({
		format: "div",
		id: id,
		father: father,
		border: "groove"
	});
	$(this.logicExpressionDiv).css('margin', 10);

	this.buttonClose = createHtmlElement({
		format: "span",
		id: id+"buttonClose",
		className: "close",
		text: "x",
		father: this.logicExpressionDiv,
		object: this.id
	});
	$(this.buttonClose).mousedown(function(){
		var active = DialogMenuController.getActive();
		var logicExpression = active.getLogicExpressionById(id);

		if(logicExpression.fatherLogicExpression != null){
			var array = logicExpression.fatherLogicExpression.logicExpressionList;
			var i = array.indexOf(id);
			if(i != -1) {
				array.splice(i, 1);
			}

	        logicExpression.remove();
    	}
	});

	this.logicExpressionContentDiv = createHtmlElement({
		format: "div",
		id: id+"contetnt",
		father: this.logicExpressionDiv
	});
	$(this.logicExpressionContentDiv).css('height', 20);
	$(this.logicExpressionContentDiv).css('margin-top', 30);
	$(this.logicExpressionContentDiv).css('margin-bottom', 30);

	this.buttonAdd = createHtmlElement({
		format: "span",
		id: id+"buttonAddSpan",
		className: "glyphicon btn-glyphicon glyphicon-plus img-circle text-success",
		father: this.logicExpressionDiv,
		width: '100%',
		textAllign: 'right'
	});
	$(this.buttonAdd).mousedown(function(){
		var active = DialogMenuController.getActive();
		var logicExpression = active.getLogicExpressionById(id);
		logicExpression.add();
	});



	return this;
};


LogicExpression.prototype.getDiv = function(){
	return this.logicExpressionDiv;
};

LogicExpression.prototype.remove = function(){
	console.log('remove',this.id);
	this.logicExpressionDiv.remove();
};

LogicExpression.prototype.add = function(){
	console.log('add in ',this.id);
	//dialog menu to choose
	//new LogicExpression
	var id = this.id+"_"+this.logicExpressionList.length;
	
	var newLogicExpression = new LogicExpression(id,this.logicExpressionContentDiv,this);
	
	var newHeight = $(newLogicExpression.logicExpressionDiv).height();
	this.increaseHeightBy(newHeight);
	this.logicExpressionList.push(newLogicExpression);

};

LogicExpression.prototype.increaseHeightBy = function(height){
	var thisHeight = $(this.logicExpressionContentDiv).height();
	$(this.logicExpressionContentDiv).height(thisHeight + height);

	if(this.fatherLogicExpression)
		this.fatherLogicExpression.increaseHeightBy(height);
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
}

