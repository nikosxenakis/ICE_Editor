function DialogMenu(){

	this.dialogMenuId = "dialogMenu";
	this.dialogMenuTop = 200;
	this.dialogMenuLeft = 200;
	this.dialogMenuWidth = 350;
	this.dialogMenuHeight = 200;

	this.dialogContentId = "dialogContent";	

	this.dialogMenuDiv = createHtmlElement({
		format: "div",
		id: this.dialogMenuId,
		className: "modal",
		father: "body",
		top: this.dialogMenuTop,
		left: this.dialogMenuLeft,
		width: this.dialogMenuWidth,
		height: this.dialogMenuHeight,
		border: "2px solid #a1a1a1",
		boxShadow: "5px 5px 5px #888888",
		borderRadius: "10px"
	});

	$(this.dialogMenuDiv).draggable();


	this.dialogContentDiv = createHtmlElement({
		format: "div",
		id: this.dialogContentId,
		className: "modal-content container",
		//border: "thin dashed #006600",
		father: this.dialogMenuDiv,
		width: this.dialogMenuWidth,
		height: this.dialogMenuHeight
	});

	this.dialogTitle = createHtmlElement({
		format: "h2",
		id: "dialogTitle",
		className: "",
		father: this.dialogContentDiv,
		text:"Edit Value",
		textAllign:"center",
		//border: "thin dashed #006600",
		height: this.dialogMenuHeight/8
	});
	$(this.dialogTitle).css('margin-top', 10);
	$(this.dialogTitle).css('color', '#985b5b');

    $(this.dialogTitle).css('margin-bottom', 20);

	this.buttonClose = createHtmlElement({
		format: "span",
		id: "buttonClose",
		className: "close",
		text: "x",
		father: this.dialogTitle
	});

	$(this.buttonClose).mousedown(function() {
        dialogMenu.closeDialogMenu();
	});


	this.dialogBody = createHtmlElement({
		format: "div",
		id: "dialogBody",
		className: "row",
		father: this.dialogContentDiv,
		//border: "thin dashed #006600",
		height:4*this.dialogMenuHeight/8
	});
	    
	$(this.dialogBody).css('margin-bottom', 10);


	this.dialogBodyLeft = createHtmlElement({
		format: "div",
		id: "dialogBodyLeft",
		className: "col-sm-4",
		father: this.dialogBody,
		//border: "thin dashed #006600",
		height: this.dialogBody.height()
	});


	this.radioForm = createHtmlElement({
		format: "form",
		id: "radioForm",
		father: this.dialogBodyLeft
	});
/*
	var radioBoolean = createRadioHtmlElement({
		format: "input",
		type: "radio",
		id: "radioBoolean",
		value: "boolean",
		text: "boolean",
		father:radioForm
	});
*/
	this.radioVariable = createRadioHtmlElement({
		id: "radioVariable",
		text: "variable",
		name: 'type',
		father: this.radioForm
	});

	this.radioNumber = createRadioHtmlElement({
		id: "radioNumber",
		text: "number",
		name: 'type',
		father: this.radioForm
	});

	this.radioText = createRadioHtmlElement({
		id: "radioText",
		text: "text",
		name: 'type',
		father: this.radioForm
	});

	this.radioBoolean = createRadioHtmlElement({
		id: "radioBoolean",
		text: "boolean",
		name: 'type',
		father: this.radioForm
	});

	this.dialogBodyRight = createHtmlElement({
		format: "div",
		id: "dialogBodyRight",
		className: "col-sm-8",
		father: this.dialogBody,
		//border: "thin dashed #006600",
		height: this.dialogBody.height()
	});

	this.dialogTextInput = createHtmlElement({
		format: "input",
		type: "text",
		id: "dialogTextInput",
		placeholder: "value",
		father: this.dialogBodyRight
	});

	this.dialogBooleanRight = createHtmlElement({
		format: "div",
		id: "dialogBooleanRight",
		className: "col-sm-12",
		father: this.dialogBodyRight,
		//height:dialogBodyRight.height()
	});

	this.radioTrue = createRadioHtmlElement({
		id: "radioTrue",
		text: "true",
		name: 'type',
		hide: true,
		father: this.dialogBooleanRight
	});

	this.radioFalse = createRadioHtmlElement({
		id: "radioFalse",
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

	this.dialogEnd = createHtmlElement({
		format: "div",
		id: "dialogEnd",
		className: "",
		father: this.dialogContentDiv,
		//border: "thin dashed #006600",
		height: this.dialogMenuHeight/8
	});

	this.buttonOk = createHtmlElement({
		format: "button",
		id: "buttonOk",
		text: "Ok",
		father: this.dialogEnd,
		top: '-10px',
		left: '237px'
	});
    $(this.buttonOk).css('position', "relative");
    $(this.buttonOk).css('width', 65);

    $(this.radioVariable).mousedown(function() {
    	$(dialogMenu.dialogTextInput).show();
    	$(dialogMenu.radioTrue).hide();
    	$(dialogMenu.radioFalse).hide();
    });

    $(this.radioNumber).mousedown(function() {
    	$(dialogMenu.dialogTextInput).show();
    	$(dialogMenu.radioTrue).hide();
    	$(dialogMenu.radioFalse).hide();
    });

	$(this.radioText).mousedown(function() {
    	$(dialogMenu.dialogTextInput).show();
    	$(dialogMenu.radioTrue).hide();
    	$(dialogMenu.radioFalse).hide();
    });

    $(this.radioBoolean).mousedown(function() {
    	$(dialogMenu.dialogTextInput).hide();
    	$(dialogMenu.radioTrue).show();
    	$(dialogMenu.radioFalse).show();
	    $(this.radioTrue).children('input[type=radio]').prop("checked", true);
    });

	$(this.buttonOk).mousedown(function() {

        var outputText = $('#dialogTextInput').val();

        if( $(dialogMenu.dialogMenuDiv).find('#radioVariable').prop("checked") == true && isNaN(outputText)){
        	dialogMenu.object.input.setType(InputType.valueVariable);
        	dialogMenu.object.input.setText(outputText);
        }
        else if( $(dialogMenu.dialogMenuDiv).find('#radioNumber').prop("checked") == true && !isNaN(outputText) ){
        	dialogMenu.object.input.setType(InputType.valueNumber);
        	dialogMenu.object.input.setText(outputText);
        }
        else if( $(dialogMenu.dialogMenuDiv).find('#radioText').prop("checked") == true ){
        	dialogMenu.object.input.setType(InputType.valueText);
        	dialogMenu.object.input.setText(outputText);
        }
        else if( $(dialogMenu.dialogMenuDiv).find('#radioBoolean').prop("checked") == true ){
        	dialogMenu.object.input.setType(InputType.valueBoolean);
        	if( $(dialogMenu.dialogMenuDiv).find('#radioTrue').prop("checked") == true )
        		dialogMenu.object.input.setText('true');
        	else if( $(dialogMenu.dialogMenuDiv).find('#radioFalse').prop("checked") == true )
        		dialogMenu.object.input.setText('false');
        }
        
        dialogMenu.closeDialogMenu();

	});



	window.onclick = function(event) {
	    if (event.target == dialogMenu) {
	        $(this.dialogMenuDiv).css('display', "none");
	    }
	}

	window.onload = function(event) {
	    $(this.dialogMenuDiv).css('display', "block");
	}

	return this;
};

DialogMenu.prototype.fixRadioButtons = function(){

	$(this.radioTrue).hide();
    $(this.radioFalse).hide();
    $(this.dialogTextInput).show();

	if(this.object.input.type == InputType.variable){
	    $(dialogMenu.dialogMenuDiv).find('#radioVariable').attr("disabled", false);
	    $(dialogMenu.dialogMenuDiv).find('#radioNumber').attr('disabled',true);
	    $(dialogMenu.dialogMenuDiv).find('#radioText').attr("disabled", true);
	    $(dialogMenu.dialogMenuDiv).find('#radioBoolean').attr('disabled',true);

	   	$(dialogMenu.dialogMenuDiv).find('#radioVariable').prop("checked", true);
	    $(this.radioTrue).children('input[type=radio]').prop("checked", false);
	}
	else if(this.object.input.type == InputType.valueVariable){
	    $(dialogMenu.dialogMenuDiv).find('#radioVariable').attr("disabled", false);
	    $(dialogMenu.dialogMenuDiv).find('#radioNumber').attr('disabled',false);
	    $(dialogMenu.dialogMenuDiv).find('#radioText').attr("disabled", false);
	    $(dialogMenu.dialogMenuDiv).find('#radioBoolean').attr('disabled',false);

	   	$(dialogMenu.dialogMenuDiv).find('#radioVariable').prop("checked", true);
	    $(this.radioTrue).children('input[type=radio]').prop("checked", true);
	}
	else if(this.object.input.type == InputType.valueNumber){
	    $(dialogMenu.dialogMenuDiv).find('#radioVariable').attr("disabled", false);
	    $(dialogMenu.dialogMenuDiv).find('#radioNumber').attr('disabled',false);
	    $(dialogMenu.dialogMenuDiv).find('#radioText').attr("disabled", false);
	    $(dialogMenu.dialogMenuDiv).find('#radioBoolean').attr('disabled',false);

	   	$(dialogMenu.dialogMenuDiv).find('#radioNumber').prop("checked", true);
	    $(this.radioTrue).children('input[type=radio]').prop("checked", true);
	}
	else if(this.object.input.type == InputType.valueText){
	    $(dialogMenu.dialogMenuDiv).find('#radioVariable').attr("disabled", false);
	    $(dialogMenu.dialogMenuDiv).find('#radioNumber').attr('disabled',false);
	    $(dialogMenu.dialogMenuDiv).find('#radioText').attr("disabled", false);
	    $(dialogMenu.dialogMenuDiv).find('#radioBoolean').attr('disabled',false);

	   	$(dialogMenu.dialogMenuDiv).find('#radioText').prop("checked", true);
	    $(this.radioTrue).children('input[type=radio]').prop("checked", true);
	}
	else if(this.object.input.type == InputType.valueBoolean){
		$(this.radioTrue).show();
    	$(this.radioFalse).show();
    	$(this.dialogTextInput).hide();

	    $(dialogMenu.dialogMenuDiv).find('#radioVariable').attr("disabled", false);
	    $(dialogMenu.dialogMenuDiv).find('#radioNumber').attr('disabled',false);
	    $(dialogMenu.dialogMenuDiv).find('#radioText').attr("disabled", false);
	    $(dialogMenu.dialogMenuDiv).find('#radioBoolean').attr('disabled',false);

	   	$(dialogMenu.dialogMenuDiv).find('#radioBoolean').prop("checked", true);

	    if(this.object.input.getText() == 'true')
	    	$(this.radioTrue).children('input[type=radio]').prop("checked", true);
		else if(this.object.input.getText() == 'false')
	    	$(this.radioFalse).children('input[type=radio]').prop("checked", true);	
	}
};

DialogMenu.prototype.closeDialogMenu = function(){
    $(dialogMenu.dialogMenuDiv).css('display', "none");

	dialogMenu.object.update();
	dialogMenu.object = null;
};

DialogMenu.prototype.open = function(object){
	//object must have a object.input && object.update(input)
	this.object = object;

	this.fixRadioButtons();

    $(dialogMenu.dialogMenuDiv).css('display', "block");	

    $(this.dialogTextInput).val("");
    $(this.dialogTextInput).attr("placeholder" , this.object.input.getText());
	//$(this.dialogTextInput).focus();

};
