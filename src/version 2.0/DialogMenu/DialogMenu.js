

function createHtmlElement(attributes){
	var element = $("<"+attributes.format+">", {
		id: attributes.id, 
		class: attributes.className,
		html: attributes.text,
		value: attributes.value,
		type: attributes.type,
		name: attributes.name,
		color: attributes.color,
		style: attributes.style,
		placeholder: attributes.placeholder
	});
	
	$(attributes.father).append(element);

	element.css('top', attributes.top);
	element.css('left', attributes.left);
	element.css('width', attributes.width);
	element.css('height', attributes.height);
	element.css('border', attributes.border);
	element.css('text-align',attributes.textAllign);

	return element;
};

function createRadioHtmlElement(attributes){
	
	var radioDiv = createHtmlElement({
		format: "div",
		id: attributes.id+"Div",
		className: "row",
		father: attributes.father
	});	
	/*
		id: "radioBoolean",
		text: "boolean",
		father:radioForm


	*/
	var radio = createHtmlElement({
		format: "input",
		id: attributes.id,
		value: attributes.value,
		name: attributes.name,
		className: attributes.className+" col-sm-2",
		father: radioDiv,
		type: "radio"
	});

	if(attributes.checked)
		$(radio).prop("checked", attributes.checked);

	var radioText = createHtmlElement({
		format: "text",
		id: attributes.id+"Text",
		className: "col-sm-10",
		text: attributes.text,
		father: radioDiv
	});

    $(radioDiv).css('padding-left', 20);

	return radioDiv;
};

function DialogMenu(){

	this.object = null;

	var dialogMenuId = "dialogMenu";
	var dialogMenuTop = 200;
	var dialogMenuLeft = 200;
	var dialogMenuWidth = 350;
	var dialogMenuHeight = 200;

	var dialogContentId = "dialogContent";


	var dialogMenuDiv = createHtmlElement({
		format: "div",
		id: dialogMenuId,
		className: "modal",
		father: "body",
		top:dialogMenuTop,
		left:dialogMenuLeft,
		width:dialogMenuWidth,
		height:dialogMenuHeight,
	});

	$(dialogMenuDiv).draggable();


	var dialogContentDiv = createHtmlElement({
		format: "div",
		id: dialogContentId,
		className: "modal-content container",
		//border: "thin dashed #006600",
		father: dialogMenuDiv,
		width:dialogMenuWidth,
		height:dialogMenuHeight
	});

	var dialogTitle = createHtmlElement({
		format: "h2",
		id: "dialogTitle",
		className: "",
		father: dialogContentDiv,
		text:"Edit Value",
		textAllign:"center",
		//border: "thin dashed #006600",
		height:dialogMenuHeight/8
	});
	$(dialogTitle).css('margin-top', 10);
	$(dialogTitle).css('color', '#985b5b');

    $(dialogTitle).css('margin-bottom', 20);

	var buttonClose = createHtmlElement({
		format: "span",
		id: "buttonClose",
		className: "close",
		text: "x",
		father: dialogTitle
	});

	$(buttonClose).mousedown(function() {
    	$(dialogMenuDiv).css('display', "none");
	});


	var dialogBody = createHtmlElement({
		format: "div",
		id: "dialogBody",
		className: "row",
		father: dialogContentDiv,
		//border: "thin dashed #006600",
		height:4*dialogMenuHeight/8
	});
	    
	$(dialogBody).css('margin-bottom', 10);


	var dialogBodyLeft = createHtmlElement({
		format: "div",
		id: "dialogBodyLeft",
		className: "col-sm-4",
		father: dialogBody,
		//border: "thin dashed #006600",
		height:dialogBody.height()
	});


	var radioForm = createHtmlElement({
		format: "form",
		id: "radioForm",
		father: dialogBodyLeft
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
	var radioVariable = createRadioHtmlElement({
		id: "radioVariable",
		text: "variable",
		name: 'type',
		checked: true,
		father:radioForm
	});

	var radioNumber = createRadioHtmlElement({
		id: "radioNumber",
		text: "number",
		name: 'type',
		father:radioForm
	});

	var radioText = createRadioHtmlElement({
		id: "radioText",
		text: "text",
		name: 'type',
		father:radioForm
	});

	var radioBoolean = createRadioHtmlElement({
		id: "radioBoolean",
		text: "boolean",
		name: 'type',
		father:radioForm
	});

	var dialogBodyRight = createHtmlElement({
		format: "div",
		id: "dialogBodyRight",
		className: "col-sm-8",
		father: dialogBody,
		//border: "thin dashed #006600",
		height:dialogBody.height()
	});

	var dialogTextInput = createHtmlElement({
		format: "input",
		type: "text",
		id: "dialogTextInput",
		placeholder: "value",
		father: dialogBodyRight
	});

    $(dialogTextInput).css('max-width', '100%');
    $(dialogTextInput).css('margin-top', 30);
    $(dialogTextInput).css('margin-left', 10);

	var dialogEnd = createHtmlElement({
		format: "div",
		id: "dialogEnd",
		className: "",
		father: dialogContentDiv,
		//border: "thin dashed #006600",
		height:dialogMenuHeight/8
	});

	var buttonOk = createHtmlElement({
		format: "button",
		id: "buttonOk",
		text: "Ok",
		father: dialogEnd,
		left: 9*dialogMenuWidth/12
	});
    $(buttonOk).css('position', "relative");
    $(buttonOk).css('width', 65);

	$(buttonOk).mousedown(function() {
        $(dialogMenuDiv).css('display', "none");
        dialogMenu.object.setText( $('#dialogTextInput').val() );

    	//dialogMenu.object.scaleToWidth(CanvasData.InputBoxWidth / dialogMenu.object.width);
        //dialogMenu.object.scaleToWidth(CanvasData.InputBoxWidth);
    	//dialogMenu.object.scaleToHeight(CanvasData.InputBoxHeight);
    	dialogMenu.object.setCoords();

        Canvas.getInstance().canvas.renderAll();
	});



	window.onclick = function(event) {
	    if (event.target == dialogMenu) {
	        $(dialogMenuDiv).css('display', "none");
	    }
	}

	window.onload = function(event) {
	    $(dialogMenuDiv).css('display', "block");
	}

	return this;
};

DialogMenu.prototype.openDialogMenu = function(object) {
    $('#dialogMenu').css('display', "block");

    $(dialogTextInput).val("");

    $(dialogTextInput).attr("placeholder" , object.getText());

    this.object = object;
};