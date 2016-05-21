var DialogMenuController = (function(){
	function DialogMenuController() {

		//init all dialog menus
		this.activeDialogMenu = new Array();
		this.object = new Array();
		this.input = new Array();
		this.prevInput = new Array();
		this.element = new Array();
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
        addNewDialogMenu: addNewDialogMenu,
        getActive: getActive
    };

    function open(object){
  		//object must have a object.input && object.update(input) && object.activate() && object.deactivate() && object.element
  		
  		if(
  			object == null ||
  			object.input == null ||
  			object.update == null ||
  			object.activate == null ||
  			object.deactivate == null
  		){
  			console.error('the object does not implement the required interface');
  			return;
  		}
      
  		if(object.element)
  			instance.element.push(object.element);
  		else
  			instance.element.push(object);

  		instance.object.push(object);
  		instance.input.push(object.input);
      instance.prevInput.push( jQuery.extend(true, {}, object.input) );

  		addNewDialogMenu(object.input.type , getElement());

  		object.activate();
  		var active = getActive();

  		active.open(object);		
    };


    function addNewDialogMenu(type,element){

    	console.log(element);

    	var elem = null;

       	if(type == InputType.doNothing){
    		elem = new DoNothingDialogMenu();
    	}
      	else if(type == InputType.logicExpression){
    		elem = new LogicExpressionDialogMenu();
    	}  	
      	else if(type == InputType.logicOperator){
    		elem = new LogicOperatorDialogMenu();
    	}  	
    	/*
      	else if(type == InputType.arithmeticExpression){
    		elem = new ArithmeticExpressionDialogMenu();
    	} 
    	*/
    	else if(type == InputType.arrayExpression){
    		elem = new ArrayExpressionDialogMenu();
    	} 
      else if(
      		type == InputType.localId ||
      		type == InputType.globalId ||
      		type == InputType.arrayElement ||
      		type == InputType.objectElement
      	){
      		if(
      			element instanceof AssignElement ||
      			element instanceof ArrayElement ||
      			element instanceof LogicExpression	||
            element instanceof ArrayTerm  
      		){
    			elem = new LValueDialogMenu();
      		}
      		else{
    			console.error('type :',type,' is not implemented');
 	   			return;
       		}
    	}  	
    	else if(type == InputType.number){
    		if(
    			element instanceof RepeatElement ||
    			element instanceof ForElement
    		){
    			elem = new NumberDialogMenu();
    		}
      		else{
    			console.error('type :',type,' is not implemented');
 	   			return;
       		}
    	}
    	else if(type == InputType.number){
    		console.error('type :',type,' is not implemented');
    		return;
		}
    	else if(type == InputType.string){
    		console.error('type :',type,' is not implemented');
    		return;
		}
    	else if(type == InputType.bool){
    		console.error('type :',type,' is not implemented');
    		return;
		}
    	else if(type == InputType.date){
    		console.error('type :',type,' is not implemented');
    		return;
		}
    	else if(type == InputType.time){
    		console.error('type :',type,' is not implemented');
    		return;
		}
    	else{
    		console.error('type :',type,' is not implemented');
    		return;
    	}


    	instance.activeDialogMenu.push(elem);
    };
    
    function close(updateFlag){
  
  		var object = getObject();
  		var input = getInput();
  		var active = getActive();

  		if(!object || !input || !active){
  			console.error('error in close');
  			return;
  		}

    	object.deactivate();

		  active.close();

	    if(updateFlag == true){
			 object.update();
	    }
	    else if(updateFlag == false){
			 object.input = getPrevInput();
	    }

	    instance.activeDialogMenu.splice(instance.activeDialogMenu.length-1, 1);
	    instance.object.splice(instance.object.length-1, 1);
	    instance.input.splice(instance.input.length-1, 1);
	    instance.prevInput.splice(instance.prevInput.length-1, 1);
	    instance.element.splice(instance.element.length-1, 1);

		  console.log(instance);

    };

    function getPrevInput(){
    	return instance.prevInput[instance.prevInput.length-1];
    };

    function getActive(){
    	return instance.activeDialogMenu[instance.activeDialogMenu.length-1];
    };
   
    function getObject(){
    	return instance.object[instance.object.length-1];
    }; 

    function getInput(){
    	return instance.input[instance.input.length-1];
    }; 

    function getElement(){
    	return instance.element[instance.element.length-1];
    }; 
})();