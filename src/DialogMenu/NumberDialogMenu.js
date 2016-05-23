function NumberDialogMenu(){

	var title = "Number";

	this.basicDialogMenu = new BasicDialogMenu(title,DialogMenuData.logicExpressionContentDialogMenuWidth);

	this.dialogTextInput = createHtmlElement({
		format: "input",
		type: "text",
		placeholder: "value",
		father: this.basicDialogMenu.getContentDiv()
	});
    $(this.dialogTextInput).css('max-width', '100%');
    $(this.dialogTextInput).width(100);
    $(this.dialogTextInput).css('margin-left', 175);
	
	$(this.dialogTextInput).on("input",function() {
		var active = DialogMenuController.getActive();
		var outputText = $(active.dialogTextInput).val();
		
		if(!isNaN(outputText)){
	    	active.basicDialogMenu.enableNextButton(true);
		}
		else{
	    	active.basicDialogMenu.enableNextButton(false);
		}
	});
	
	$( this.basicDialogMenu.getNextButton() ).mousedown(function(){

		var active = DialogMenuController.getActive();
		var input = active.object.input;
		var outputText = $(active.dialogTextInput).val();
		console.log(outputText);
		input.setText(outputText);

        DialogMenuController.close(true);
	});

	return this;
};

NumberDialogMenu.prototype.init = function(){

	var inputType = this.object.input.type;
    	
    $(this.dialogTextInput).show();

	this.basicDialogMenu.enableBackButton(false);
	this.basicDialogMenu.enableNextButton(true);

    var text = this.object.input.getText();
	
	if(text!="")
    	$(this.dialogTextInput).val(text);
	else
    	$(this.dialogTextInput).val('0');

};

NumberDialogMenu.prototype.open = function(object){

	this.object = object;

	this.basicDialogMenu.show();

	this.init();

};

NumberDialogMenu.prototype.close = function(){

	this.basicDialogMenu.hide();

	this.object = null;
};


