var DialogMenuController = (function(){
	function DialogMenuController() {

		//init all dialog menus
		this.dialogMenus = new Array();

		//doNothing
		this.dialogMenus[InputType.doNothing] = new DoNothingDialogMenu();

		//lvalue
		var lValue = new LValueDialogMenu();
		this.dialogMenus[InputType.lvalue] = lValue;
		this.dialogMenus[InputType.lvalueID] = lValue;
		this.dialogMenus[InputType.lvalueGlobalID] = lValue;
		this.dialogMenus[InputType.lvalueArrayElement] = lValue;
		this.dialogMenus[InputType.lvalueObjectElement] = lValue;

		//expression
		/*
		var expression = new ExpressionDialogMenu();
		this.dialogMenus[InputType.expression] = expression;
		...
		*/
	
		//logicExpression
		var logicExpression = new LogicExpressionDialogMenu();
		this.dialogMenus[InputType.logicExpressionDefault] = logicExpression;
		this.dialogMenus[InputType.logicExpression] = logicExpression;

		//simple number input
		var number = new NumberDialogMenu();
		this.dialogMenus[InputType.number] = number;

		var id = new IdDialogMenu();
		this.dialogMenus[InputType.id] = id;

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
        createBasicDialogMenu: createBasicDialogMenu,
        createLvalueDiv: createLvalueDiv
    };

    function open(object){
		//object must have a object.input && object.update(input)
		if(!object instanceof InputBox)
			console.log("wrong object as argument");

		instance.object = object;
		instance.input = object.input;
		instance.prevType = instance.input.type;

		object.activate();

		instance.activeDialogMenu = instance.dialogMenus[instance.input.type];
		if(!instance.activeDialogMenu){
			console.log("There is no dialogMenu for : ",instance.input.type);
			return;
		}

		instance.activeDialogMenu.open(object);		
    };

    function close(updateFlag){
    	if(instance.object.box)
    		instance.object.deactivate();

		instance.activeDialogMenu.close();

	    if(updateFlag == true && instance.object.box){
			instance.object.update();
	    }
	    else if(updateFlag == false){
			instance.input.type = instance.prevType;
	    }

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

		object.buttonNext = createHtmlElement({
			format: "button",
			id: id+"buttonNext",
			text: "Submit",
			father: object.dialogEnd
			//top: '0px'
		});
		$(object.buttonNext).attr("disabled", true);
	    $(object.buttonNext).css('position', "relative");
	    $(object.buttonNext).css('width', 70);
	    $(object.buttonNext).css('left', $(object.dialogMenuDiv).position().left + $(object.dialogMenuDiv).width() - 2*$(object.buttonNext).width() );
		$(object.buttonNext).css('margin-bottom', 10);

		object.buttonBack = createHtmlElement({
			format: "button",
			id: id+"buttonBack",
			text: "Back",
			father: object.dialogEnd
			//top: '0px'
		});
		$(object.buttonBack).attr("disabled", true);
	    $(object.buttonBack).css('position', "relative");
	    $(object.buttonBack).css('width', 70);
	    $(object.buttonBack).css('left', $(object.dialogMenuDiv).position().left + $(object.dialogMenuDiv).width() - 5*$(object.buttonBack).width() );
		$(object.buttonBack).css('margin-bottom', 10);
    };
    
    function createLvalueDiv(object,id,father){

		object.dialogBodyLeft = createHtmlElement({
			format: "div",
			id: id+"bodyLeft",
			className: "col-sm-6",
			father: father
		});

		object.radioForm = createHtmlElement({
			format: "form",
			id: id+"radioForm",
			father: object.dialogBodyLeft
		});

		object.radioVariable = createRadioHtmlElement({
			id: id+"radioVariable",
			text: "local variable",
			name: 'type',
			father: object.radioForm
		});

		object.radioGlobalVariable = createRadioHtmlElement({
			id: id+"radioNumber",
			text: "global variable",
			name: 'type',
			father: object.radioForm
		});

		object.radioArrayElement = createRadioHtmlElement({
			id: id+"radioText",
			text: "array element",
			name: 'type',
			father: object.radioForm
		});

		object.radioObjectElement = createRadioHtmlElement({
			id: id+"radioBoolean",
			text: "object element",
			name: 'type',
			father: object.radioForm
		});

		object.dialogBodyRight = createHtmlElement({
			format: "div",
			id: id+"bodyRight",
			className: "col-sm-6",
			father: father
		});

		object.dialogTextInput = createHtmlElement({
			format: "input",
			type: "text",
			id: id+"textInput",
			placeholder: "value",
			father: object.dialogBodyRight
		});
	    $(object.dialogTextInput).css('max-width', '100%');
	    $(object.dialogTextInput).css('margin-top', 30);

		object.dialogSubTextInput = createHtmlElement({
			format: "input",
			type: "text",
			id: id+"subTextInput",
			placeholder: "value",
			father: object.dialogBodyRight
		});
	    $(object.dialogSubTextInput).css('max-width', '100%');
	    $(object.dialogSubTextInput).css('margin-top', 20);
    };
})();