function IdDialogMenu(){

	var title = "Id";
	
	this.basicDialogMenu = new BasicDialogMenu(title,DialogMenuData.logicExpressionContentDialogMenuWidth);

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
		
		if(isNaN(outputText) && outputText!=""){
	    	active.basicDialogMenu.enableNextButton(true);
		}
		else{
	    	active.basicDialogMenu.enableNextButton(false);
		}
	});

	return this;
};

IdDialogMenu.prototype.open = function(object){

	var inputType = DialogMenuController.getInput().type;
	var inputText = DialogMenuController.getInput().input;
	
	this.input = new InputElement(inputText,inputType)
	
	if(inputType!=InputType.number){
		console.error('wrong input');
		return;
	}
	
    $(this.dialogTextInput).show();

	if(inputText!="")
    	$(this.dialogTextInput).val(inputText);
	else
    	$(this.dialogTextInput).val('');

};


IdDialogMenu.prototype.close = function(){
	console.log('close IdDialogMenu');

	var val = $(this.dialogTextInput).val();
	console.log('submit string: ',val);

	this.input.setText(val);
};

