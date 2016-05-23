var DialogMenuController = (function(){
	function DialogMenuController() {

		//init all dialog menus
		this.dialogMenus = new Array();
		this.activeDialogMenu = new Array();
		this.object = new Array();
		this.prevType = new Array();

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
		var expression = new ExpressionDialogMenu();
		this.dialogMenus[InputType.expression] = expression;
		this.dialogMenus[InputType.expressionArithmentic] = expression;
		this.dialogMenus[InputType.expressionLogic] = expression;
		this.dialogMenus[InputType.expressionTermLvalueID] = expression;
		this.dialogMenus[InputType.expressionTermLvalueGlobalID] = expression;
		this.dialogMenus[InputType.expressionTermLvalueArrayElement] = expression;
		this.dialogMenus[InputType.expressionTermLvalueObjectElement] = expression;
		this.dialogMenus[InputType.expressionTermCallFunction] = expression;
		this.dialogMenus[InputType.expressionTermCallObjectMethod] = expression;
		this.dialogMenus[InputType.expressionTermConstNumber] = expression;
		this.dialogMenus[InputType.expressionTermConstString] = expression;

		this.dialogMenus[InputType.expressionTermConstBool] = expression;
		this.dialogMenus[InputType.expressionTermConstDate] = expression;
		this.dialogMenus[InputType.expressionTermConstTime] = expression;

		this.dialogMenus[InputType.expressionArray] = expression;
	
		//logicExpression
		var logicExpression = new LogicExpressionDialogMenu();
		this.dialogMenus[InputType.logicExpressionDefault] = logicExpression;
		this.dialogMenus[InputType.logicExpression] = logicExpression;

		//simple number input
		var number = new NumberDialogMenu();
		this.dialogMenus[InputType.number] = number;

		//simple id input
		var id = new IdDialogMenu();
		this.dialogMenus[InputType.id] = id;

		//Logic Operator input
		var logicOperator = new LogicOperatorDialogMenu();
		this.dialogMenus[InputType.logicOperator] = logicOperator;

		//Logic Expression Term
		var logicExpressionTerm = new LogicExpressionTermDialogMenu();
		this.dialogMenus[InputType.logicExpressionTerm] = logicExpressionTerm;
		this.dialogMenus[InputType.logicExpressionTermLocalVariable] = logicExpressionTerm;
		this.dialogMenus[InputType.logicExpressionTermGlobalVariable] = logicExpressionTerm;
		this.dialogMenus[InputType.logicExpressionTermArrayElement] = logicExpressionTerm;
		this.dialogMenus[InputType.logicExpressionTermObjectElement] = logicExpressionTerm;
		this.dialogMenus[InputType.logicExpressionTermConstantNumber] = logicExpressionTerm;
		this.dialogMenus[InputType.logicExpressionTermConstantText] = logicExpressionTerm;
		this.dialogMenus[InputType.logicExpressionTermFunctionCall] = logicExpressionTerm;

		//Expression Term
		var expressionTerm = new ExpressionTermDialogMenu();
		this.dialogMenus[InputType.expressionTerm] = expressionTerm;
		this.dialogMenus[InputType.expressionTermLocalVariable] = expressionTerm;
		this.dialogMenus[InputType.expressionTermGlobalVariable] = expressionTerm;
		this.dialogMenus[InputType.expressionTermArrayElement] = expressionTerm;
		this.dialogMenus[InputType.expressionTermObjectElement] = expressionTerm;
		this.dialogMenus[InputType.expressionTermConstantNumber] = expressionTerm;
		this.dialogMenus[InputType.expressionTermConstantText] = expressionTerm;
		this.dialogMenus[InputType.expressionTermConstantBool] = expressionTerm;
		this.dialogMenus[InputType.expressionTermConstantDate] = expressionTerm;
		this.dialogMenus[InputType.expressionTermConstantTime] = expressionTerm;
		this.dialogMenus[InputType.expressionTermFunctionCall] = expressionTerm;
		this.dialogMenus[InputType.expressionTermMethodCall] = expressionTerm;

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
        addNewDialogMenu: addNewDialogMenu,
        close: close,
        getActive: getActive,
        createBasicDialogMenu: createBasicDialogMenu,
        createLvalueDiv: createLvalueDiv,
        createConstantDiv: createConstantDiv,
        createTermDiv: createTermDiv,
        createFunctionCallDiv: createFunctionCallDiv
    };

    function open(object){
		//object must have a object.input && object.update(input) && object.activate() && object.deactivate()
		
		if(
			object == null ||
			object.input == null ||
			object.update == null ||
			object.activate == null ||
			object.deactivate == null
		){
			console.log('the object does not implement the required interface');
			return;
		}

		instance.object.push(object);
		instance.input = object.input;
		instance.prevType.push(object.input.type);

		addNewDialogMenu(instance.input.type);

		object.activate();
		var active = getActive();
		//console.log('TYPE = ',object.input.type);


		if(!instance.dialogMenus[instance.input.type]){
			console.log("There is no dialogMenu for : ",instance.input.type);
			return;
		}

		console.log(instance);
		active.open(getObject());		
    };


    function addNewDialogMenu(type){
    	var constructorName = instance.dialogMenus[type].constructor.name;
    	var constructor = instance.dialogMenus[type].constructor;

    	for(var k=0; k<instance.activeDialogMenu.length; k++){
    		if(instance.activeDialogMenu[k].constructor.name == constructorName){
    			instance.activeDialogMenu.push(new constructor());
    			return;
    		}
    	}

    	instance.activeDialogMenu.push(instance.dialogMenus[type]);
    };

    function close(updateFlag){
  
  		var object = getObject();
  		var input = getInput();
  		var active = getActive();

  		if(!object || !input || !active){
  			console.log('error in close');
  			return;
  		}

    	//if(instance.object.box)
    	object.deactivate();

		active.close();

	    if(updateFlag == true/* && instance.object.box*/){
			object.update();
	    }
	    else if(updateFlag == false){
			input.type = getPrevType();
	    }

	    instance.activeDialogMenu.splice(instance.activeDialogMenu.length-1, 1);
	    instance.object.splice(instance.object.length-1, 1);
	    instance.prevType.splice(instance.prevType.length-1, 1);

		console.log(instance);

		instance.input = null;
    };

    function getPrevType(){
    	return instance.prevType[instance.prevType.length-1];
    };

    function getActive(){
    	return instance.activeDialogMenu[instance.activeDialogMenu.length-1];
    };
   
    function getObject(){
    	return instance.object[instance.object.length-1];
    }; 

    function getInput(){
    	return instance.object[instance.object.length-1].input;
    }; 

    function createBasicDialogMenu(object , id , title , width){

		object.dialogMenuTop = 200;
		object.dialogMenuLeft = 50;
		//object.dialogMenuHeight = 300;

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
			width: $(object.dialogContentDiv).width(),
			father: object.dialogContentDiv
		});
		    
		$(object.dialogBody).css('margin-bottom', 10);
		$(object.dialogBody).css('margin-left','0px');

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

		$(object.dialogTextInput).show();
    	$(object.dialogSubTextInput).hide();
    	$(object.buttonBack).hide();
    };

    function createConstantDiv(object,id,father){

		object.constantBodyLeft = createHtmlElement({
			format: "div",
			id: id+"constantBodyLeft",
			className: "col-sm-6",
			father: father
		});

		object.constantRadioForm = createHtmlElement({
			format: "form",
			id: id+"radioForm",
			father: object.constantBodyLeft
		});

		object.constantRadioNumber = createRadioHtmlElement({
			id: id+"radioNumber",
			text: "number",
			name: 'type',
			father: object.constantRadioForm
		});

		object.constantRadioText = createRadioHtmlElement({
			id: id+"radioText",
			text: "text",
			name: 'type',
			father: object.constantRadioForm
		});

		object.constantBodyRight = createHtmlElement({
			format: "div",
			id: id+"constantBodyRight",
			className: "col-sm-6",
			father: father
		});

		object.constantTextInput = createHtmlElement({
			format: "input",
			type: "text",
			id: id+"constantTextInput",
			placeholder: "value",
			father: object.constantBodyRight
		});
	    $(object.constantTextInput).css('max-width', '100%');
	    $(object.constantTextInput).css('margin-top', 10);

		$(object.constantTextInput).show();
    	$(object.buttonBack).hide();
    };

    function createTermDiv(object,id,father){
	    
	    object.termRadioForm = createHtmlElement({
			format: "form",
			id: id+"radioForm",
			father: father
		});

		$(object.termRadioForm).css('padding-left', '110px');
		$(object.termRadioForm).css('margin-bottom', '20px');

		object.termRadioButtonVariable = createRadioHtmlElement({
			id: id+"termRadioButtonVariable",
			text: "variable",
			name: 'type',
			father: object.termRadioForm
		});
		
		object.termRadioButtonConstant = createRadioHtmlElement({
			id: id+"termRadioButtonConstant",
			text: "constant",
			name: 'type',
			father: object.termRadioForm
		});

		object.termRadioButtonFunctionCall = createRadioHtmlElement({
			id: id+"termRadioButtonFunctionCall",
			text: "function call",
			name: 'type',
			father: object.termRadioForm
		});
				
		object.termRadioButtonObjectMethod = createRadioHtmlElement({
			id: id+"termRadioButtonObjectMethod",
			text: "object method",
			name: 'type',
			father: object.termRadioForm
		});
    };  

    function createFunctionCallDiv(object,id,father){
    	console.log("under construction");
    	//div for id
    	//div for list of args
    };   
    
})();