var DialogMenuController = (function(){
	function DialogMenuController() {

		//init all dialog menus
		this.dialogMenus = new Array();

		this.dialogMenus[InputType.doNothing] = new DoNothingDialogMenu("doNothingDialogMenu","Choose Element");

		var lValue = new lValueDialogMenu("lValueDialogMenu","Add Value");
		this.dialogMenus[InputType.lvalueID] = lValue;
		this.dialogMenus[InputType.lvalueGlobalID] = lValue;
		this.dialogMenus[InputType.lvalueArrayElement] = lValue;
		this.dialogMenus[InputType.lvalueObjectElement] = lValue;

	};

    var instance;

    return {
        getInstance: function(){
            if (instance == null) {
                instance = new DialogMenuController();
                // Hide the constructor so the returned objected can't be new'd...
                instance.constructor = null;
            }
            return instance;
        },

        open: open,
        close: close,
        getActive: getActive,
        createBasicDialogMenu: createBasicDialogMenu

    };

    function open(object){
		//object must have a object.input && object.update(input)
		if(!object instanceof InputBox)
			console.log("wrong object as argument");

		instance.object = object;
		instance.input = object.input;

		object.activate();

		instance.activeDialogMenu = instance.dialogMenus[instance.input.type];
		if(!instance.activeDialogMenu){
			console.log("There is no dialogMenu for : ",instance.input.type);
			return;
		}

		instance.activeDialogMenu.open(object);		
    };

    function close(updateFlag){
    	instance.object.deactivate();

		instance.activeDialogMenu.close();

	    if(updateFlag == true)
			instance.object.update();

		instance.activeDialogMenu = null;
		instance.object = null;
		instance.input = null;
    };

    function getActive(){
    	return instance.activeDialogMenu;
    };
    
    function createBasicDialogMenu(object , id , title , width){

		object.dialogMenuTop = 200;
		object.dialogMenuLeft = 200;

		object.dialogMenuDiv = createHtmlElement({
			format: "div",
			id: id,
			className: "modal",
			father: "body",
			top: object.dialogMenuTop,
			left: object.dialogMenuLeft,
			width: width
		});
		$(object.dialogMenuDiv).draggable();

		object.dialogContentDiv = createHtmlElement({
			format: "div",
			id: id+"dialogContent",
			className: "modal-content container",
			father: object.dialogMenuDiv,
			width: $(object.dialogMenuDiv).width(),
			border: "2px solid #a1a1a1",
			boxShadow: "5px 5px 5px #888888",
			borderRadius: "10px"
		});

		object.dialogTitle = createHtmlElement({
			format: "h2",
			id: id+"dialogTitle",
			father: object.dialogContentDiv,
			text: title,
			textAllign:"center"
		});
		$(object.dialogTitle).css('margin-top', 10);
		$(object.dialogTitle).css('color', '#985b5b');

	    $(object.dialogTitle).css('margin-bottom', 20);

		object.buttonClose = createHtmlElement({
			format: "span",
			id: "buttonClose",
			className: "close",
			text: "x",
			father: object.dialogTitle
		});

		$(object.buttonClose).mousedown(function(){
	        close(false);
		});

		object.dialogBody = createHtmlElement({
			format: "div",
			id: id+"dialogBody",
			className: "row",
			father: object.dialogContentDiv
		});
		    
		$(object.dialogBody).css('margin-bottom', 10);

		object.dialogEnd = createHtmlElement({
			format: "div",
			id: id+"dialogEnd",
			father: object.dialogContentDiv
		});

		object.buttonOk = createHtmlElement({
			format: "button",
			id: id+"buttonOk",
			text: "Ok",
			father: object.dialogEnd
			//top: '0px'
		});
	    $(object.buttonOk).css('position', "relative");
	    $(object.buttonOk).css('width', 65);
	    $(object.buttonOk).css('left', $(object.dialogMenuDiv).position().left + $(object.dialogMenuDiv).width() - 2*$(object.buttonOk).width() );
		$(object.buttonOk).css('margin-bottom', 10);

    };
    
})();