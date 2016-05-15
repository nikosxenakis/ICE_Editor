function BasicDialogMenu( title , width){

	this.dialogMenuTop = 200;
	this.dialogMenuLeft = 50;
	//object.dialogMenuHeight = 300;

	this.dialogMenuDiv = createHtmlElement({
		format: "div",
		className: "modal",
		father: "body",
		top: this.dialogMenuTop,
		left: this.dialogMenuLeft,
		width: width
	});
	$(this.dialogMenuDiv).draggable();

	this.dialogContentDiv = createHtmlElement({
		format: "div",
		className: "modal-content container",
		father: this.dialogMenuDiv,
		width: $(this.dialogMenuDiv).width(),
		border: "2px solid #a1a1a1",
		boxShadow: "5px 5px 5px #888888",
		borderRadius: "10px"
	});

	this.dialogTitle = createHtmlElement({
		format: "h2",
		father: this.dialogContentDiv,
		text: title,
		textAllign:"center"
	});
	$(this.dialogTitle).css('margin-top', 10);
	$(this.dialogTitle).css('color', '#985b5b');

	$(this.dialogTitle).css('margin-bottom', 20);

	this.buttonClose = createHtmlElement({
		format: "span",
		className: "close",
		text: "x",
		father: this.dialogTitle
	});

	$(this.buttonClose).mousedown(function(){
		DialogMenuController.close(false);
	});

	this.dialogBody = createHtmlElement({
		format: "div",
		className: "row",
		width: $(this.dialogContentDiv).width(),
		father: this.dialogContentDiv
	});
		
	$(this.dialogBody).css('margin-bottom', 10);
	$(this.dialogBody).css('margin-left','0px');

	this.dialogEnd = createHtmlElement({
		format: "div",
		father: this.dialogContentDiv
	});

	this.buttonNext = createHtmlElement({
		format: "button",
		text: "Next",
		father: this.dialogEnd
		//top: '0px'
	});
	$(this.buttonNext).attr("disabled", false);
	$(this.buttonNext).css('position', "relative");
	$(this.buttonNext).css('width', 70);
	$(this.buttonNext).css('left', $(this.dialogMenuDiv).position().left + $(this.dialogMenuDiv).width() - 2*$(this.buttonNext).width() );
	$(this.buttonNext).css('margin-bottom', 10);

	this.buttonBack = createHtmlElement({
		format: "button",
		text: "Back",
		father: this.dialogEnd
		//top: '0px'
	});
	$(this.buttonBack).attr("disabled", false);
	$(this.buttonBack).css('position', "relative");
	$(this.buttonBack).css('width', 70);
	$(this.buttonBack).css('left', $(this.dialogMenuDiv).position().left + $(this.dialogMenuDiv).width() - 5*$(this.buttonBack).width() );
	$(this.buttonBack).css('margin-bottom', 10);
   
	
	return this;
};

BasicDialogMenu.prototype.getContentDiv = function(){
	return this.dialogBody;
};

BasicDialogMenu.prototype.show = function(){
	$(this.dialogMenuDiv).css('display', "block");	
};

BasicDialogMenu.prototype.hide = function(){
	$(this.dialogMenuDiv).css('display', "none");	
};

BasicDialogMenu.prototype.getNextButton = function(flag){
	return this.buttonNext;
};

BasicDialogMenu.prototype.getBackButton = function(flag){
	return this.buttonBack;
};

BasicDialogMenu.prototype.enableNextButton = function(flag){
	$(this.buttonNext).attr("disabled", !flag);
};

BasicDialogMenu.prototype.enableBackButton = function(flag){
	$(this.buttonBack).attr("disabled", !flag);
};

BasicDialogMenu.prototype.setNextButton = function(text){
	$(this.buttonNext).text(text);
};

BasicDialogMenu.prototype.setBackButton = function(text){
	$(this.buttonBack).text(text);
};