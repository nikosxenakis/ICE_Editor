function IdDialogMenu(){
	var id = "idDialogMenu";
	var title = "Id";
	DialogMenuController.createBasicDialogMenu(this,id,title,DialogMenuData.lValueDialogMenuWidth);
	//add elements to this.dialogBody

	this.dialogTextInput = createHtmlElement({
		format: "input",
		type: "text",
		id: id+"textInput",
		placeholder: "value",
		father: this.dialogBody
	});
    $(this.dialogTextInput).css('max-width', '100%');
    $(this.dialogTextInput).width(100);
    $(this.dialogTextInput).css('margin-left', 140);

	$(this.dialogTextInput).on("input",function() {
		var active = DialogMenuController.getActive();
		var outputText = $(active.dialogTextInput).val();
		
		if(isNaN(outputText)){
	    	$(active.buttonNext).attr("disabled", false);
		}
		else{
	    	$(active.buttonNext).attr("disabled", true);
		}
	});


	$(this.buttonNext).mousedown(function(){

		var active = DialogMenuController.getActive();
		var input = active.object.input;
		var outputText = $(active.dialogTextInput).val();

		input.setText(outputText);

        DialogMenuController.close(true);
	});

	return this;
};

IdDialogMenu.prototype.initIdDialogMenu = function(){

	var inputType = this.object.input.type;
    	
    $(this.dialogTextInput).show();
    $(this.buttonBack).hide();

    var text = this.object.input.getText();
    $(this.dialogTextInput).val(text);
};

IdDialogMenu.prototype.open = function(object){

	this.object = object;

	this.initIdDialogMenu();

    $(this.dialogMenuDiv).css('display', "block");	
};

IdDialogMenu.prototype.close = function(){

    $(this.dialogMenuDiv).css('display', "none");

	this.object = null;
};


