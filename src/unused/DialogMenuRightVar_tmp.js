function lValueDialogMenu(id,title){

	DialogMenuController.createBasicDialogMenu(this,id,title,DialogMenuData.lValueDialogMenuWidth);
	//add elements to this.dialogBody

	this.dialogBodyLeft = createHtmlElement({
		format: "div",
		id: id+"bodyLeft",
		className: "col-sm-4",
		father: this.dialogBody
	});

	this.radioForm = createHtmlElement({
		format: "form",
		id: id+"radioForm",
		father: this.dialogBodyLeft
	});

	this.radioVariable = createRadioHtmlElement({
		id: id+"radioVariable",
		text: "variable",
		name: 'type',
		father: this.radioForm
	});

	this.radioNumber = createRadioHtmlElement({
		id: id+"radioNumber",
		text: "number",
		name: 'type',
		father: this.radioForm
	});

	this.radioText = createRadioHtmlElement({
		id: id+"radioText",
		text: "text",
		name: 'type',
		father: this.radioForm
	});

	this.radioBoolean = createRadioHtmlElement({
		id: id+"radioBoolean",
		text: "boolean",
		name: 'type',
		father: this.radioForm
	});

	this.dialogBodyRight = createHtmlElement({
		format: "div",
		id: id+"bodyRight",
		className: "col-sm-8",
		father: this.dialogBody
	});

	this.dialogTextInput = createHtmlElement({
		format: "input",
		type: "text",
		id: id+"textInput",
		placeholder: "value",
		father: this.dialogBodyRight
	});

	this.dialogBooleanRight = createHtmlElement({
		format: "div",
		id: id+"booleanRight",
		className: "col-sm-12",
		father: this.dialogBodyRight
	});

	this.radioTrue = createRadioHtmlElement({
		id: id+"radioTrue",
		text: "true",
		name: 'type',
		hide: true,
		father: this.dialogBooleanRight
	});

	this.radioFalse = createRadioHtmlElement({
		id: id+"radioFalse",
		text: "false",
		name: 'type',
		hide: true,
		father: this.dialogBooleanRight
	});

    $(this.dialogTextInput).css('max-width', '100%');
    $(this.dialogTextInput).css('margin-top', 30);
    
    $(this.dialogBooleanRight).css('margin-top', 20);
    $(this.dialogBooleanRight).css('margin-left', 20);

    $(this.dialogTextInput).css('margin-top', 30);

    $(this.radioVariable).mousedown(function() {
    	$(DialogMenuController.getActive().dialogTextInput).show();
    	$(DialogMenuController.getActive().radioTrue).hide();
    	$(DialogMenuController.getActive().radioFalse).hide();
    });

    $(this.radioNumber).mousedown(function() {
    	$(DialogMenuController.getActive().dialogTextInput).show();
    	$(DialogMenuController.getActive().radioTrue).hide();
    	$(DialogMenuController.getActive().radioFalse).hide();
    });

	$(this.radioText).mousedown(function() {
    	$(DialogMenuController.getActive().dialogTextInput).show();
    	$(DialogMenuController.getActive().radioTrue).hide();
    	$(DialogMenuController.getActive().radioFalse).hide();
    });

    $(this.radioBoolean).mousedown(function() {
    	$(DialogMenuController.getActive().dialogTextInput).hide();
    	$(DialogMenuController.getActive().radioTrue).show();
    	$(DialogMenuController.getActive().radioFalse).show();
	    $(this.radioTrue).children('input[type=radio]').prop("checked", true);
    });

	$(this.buttonOk).mousedown(function() {

		var outputText = $(DialogMenuController.getActive().dialogTextInput).val();
		var active = DialogMenuController.getActive();

		if( $(active.radioText).children('input[type=radio]').prop("checked") == true ){
        	active.object.input.setType(InputType.valueText);
        	active.object.input.setText(outputText);
        }

        DialogMenuController.close(true);

	});

	return this;
};

lValueDialogMenu.prototype.initRadioButtons = function(){

	$(this.radioTrue).hide();
    $(this.radioFalse).hide();
    $(this.dialogTextInput).show();

	$(this.dialogMenuDiv).find('#radioVariable').attr("disabled", false);
    $(this.dialogMenuDiv).find('#radioNumber').attr('disabled',true);
    $(this.dialogMenuDiv).find('#radioText').attr("disabled", true);
    $(this.dialogMenuDiv).find('#radioBoolean').attr('disabled',true);

	$(this.radioVariable).children('input[type=radio]').prop("checked", true);


};

lValueDialogMenu.prototype.open = function(object){

	//object must have a object.input && object.update(input)
	this.object = object;
	this.element = object.element;

	this.initRadioButtons();

    $(this.dialogTextInput).val("");
    $(this.dialogTextInput).attr("placeholder" , this.object.input.getText());

    $(this.dialogMenuDiv).css('display', "block");	
};

lValueDialogMenu.prototype.close = function(){

    $(this.dialogMenuDiv).css('display', "none");


	this.object = null;
};


