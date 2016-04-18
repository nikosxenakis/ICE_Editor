function DoNothingDialogMenu(){

	this.dialogMenuId = "doNothingDialogMenu";
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
		text:"Choose Element",
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
        doNothingDialogMenu.closeDialogMenu();
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

	this.radioForm = createHtmlElement({
		format: "form",
		id: "radioForm",
		father: this.dialogBody
	});

	this.whileElement = createRadioHtmlElement({
		id: "whileElement",
		text: "while Element",
		name: 'type',
		father: this.radioForm
	});

	this.ifElement = createRadioHtmlElement({
		id: "ifElement",
		text: "if Element",
		name: 'type',
		father: this.radioForm
	});

	this.forElement = createRadioHtmlElement({
		id: "forElement",
		text: "for Element",
		name: 'type',
		father: this.radioForm
	});

	this.arrayElement = createRadioHtmlElement({
		id: "arrayElement",
		text: "array Element",
		name: 'type',
		father: this.radioForm
	});

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

	$(this.buttonOk).mousedown(function() {
      
        if( $(doNothingDialogMenu.dialogMenuDiv).find('#whileElement').prop("checked") == true){
        	doNothingDialogMenu.element.father.addElement('while',0);
        }
        else if( $(doNothingDialogMenu.dialogMenuDiv).find('#ifElement').prop("checked") == true){
        	doNothingDialogMenu.element.father.addElement('if',0);
        }       
        else if( $(doNothingDialogMenu.dialogMenuDiv).find('#forElement').prop("checked") == true){
        	doNothingDialogMenu.element.father.addElement('for',0);
        }  
        else if( $(doNothingDialogMenu.dialogMenuDiv).find('#arrayElement').prop("checked") == true){
        	doNothingDialogMenu.element.father.addElement('array',0);
        }        

        doNothingDialogMenu.closeDialogMenu();

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

DoNothingDialogMenu.prototype.fixRadioButtons = function(){
	    $(doNothingDialogMenu.dialogMenuDiv).find('#whileElement').attr("disabled", false);
	    $(doNothingDialogMenu.dialogMenuDiv).find('#ifElement').attr('disabled',false);
	    $(doNothingDialogMenu.dialogMenuDiv).find('#forElement').attr("disabled", false);
	    $(doNothingDialogMenu.dialogMenuDiv).find('#arrayElement').attr('disabled',false);

	   	$(doNothingDialogMenu.dialogMenuDiv).find('#whileElement').prop("checked", true);
};

DoNothingDialogMenu.prototype.closeDialogMenu = function(){
    $(doNothingDialogMenu.dialogMenuDiv).css('display', "none");

	doNothingDialogMenu.element = null;
};

DoNothingDialogMenu.prototype.open = function(element){
	//object must have a object.input && object.update(input)
	this.element = element;

	this.fixRadioButtons();

    $(doNothingDialogMenu.dialogMenuDiv).css('display', "block");	


};
