function ArithmeticExpressionDialogMenu(){

	var title = "Calculation";
	
	this.basicDialogMenu = new BasicDialogMenu(title,DialogMenuData.logicExpressionContentDialogMenuWidth);

	return;

	this.dialogTextInput = createHtmlElement({
		format: "input",
		type: "text",
		placeholder: "value",
		father: this.basicDialogMenu.getContentDiv()
	});
    $(this.dialogTextInput).css('max-width', '100%');
    $(this.dialogTextInput).width(100);
    $(this.dialogTextInput).css('margin-left', 140);

	$(this.dialogTextInput).on("input",function() {
		var active = DialogMenuController.getActive();
		var outputText = $(active.dialogTextInput).val();
		
		if(isNaN(outputText)){
	    	active.basicDialogMenu.enableNextButton(true);
		}
		else{
	    	active.basicDialogMenu.enableNextButton(false);
		}
	});


	$( this.basicDialogMenu.getNextButton() ).mousedown(function(){

		var active = DialogMenuController.getActive();
		var input = active.object.input;
		var outputText = $(this.dialogTextInput).val();

		input.setText(outputText);

        DialogMenuController.close(true);
	});

	return this;
};

ArithmeticExpressionDialogMenu.prototype.init = function(){

	var inputType = this.object.input.type;
    	
    $(this.dialogTextInput).show();

	this.basicDialogMenu.enableBackButton(false);
	this.basicDialogMenu.enableNextButton(false);

    var text = this.object.input.getText();
    $(this.dialogTextInput).val(text);
};

ArithmeticExpressionDialogMenu.prototype.open = function(object){

	this.object = object;

	this.basicDialogMenu.show();

	this.init();

};

ArithmeticExpressionDialogMenu.prototype.close = function(){

	this.basicDialogMenu.hide();

	this.object = null;
};


