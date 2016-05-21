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
        getActive: getActive
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

})();