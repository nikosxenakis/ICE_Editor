var DialogMenuController = (function(){
	function DialogMenuController() {

		//init all dialog menus
		this.activeDialogMenu = new Array();
		this.object = new Array();
		this.input = new Array();
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
        getActive: getActive,
        getElement: getElement,
        getInput: getInput
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
      instance.input.push( object.input);

  		addNewDialogMenu(getInput().type , getElement());

  	  object.activate();
  		var active = getActive();

  		active.open();	

      console.log(instance);

    };

    function close(updateFlag){
  
      var object = getObject();
      var active = getActive();
      //old input
      var input = getInput();
      
      if(!object || !input || !active){
        console.error('error in close');
        return;
      }

      active.close();
      object.deactivate();
      
      if(!(active instanceof DoNothingDialogMenu)){
        
        if(updateFlag == true){
          if(!active.input){
            console.error('DialogMenu has not input');
          }

          object.input = active.input;
					object.addPrevInput(input);
          object.update();
        }
        else if(updateFlag == false){
          object.input = input;
        }
        
      }
      
      instance.activeDialogMenu.splice(instance.activeDialogMenu.length-1, 1);
      instance.object.splice(instance.object.length-1, 1);
      instance.input.splice(instance.input.length-1, 1);
      instance.element.splice(instance.element.length-1, 1);

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
      else if(type == InputType.arithmeticExpression){
    		elem = new ArithmeticExpressionDialogMenu();
    	} 
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
      			element instanceof ArrayTerm
      		){
    			  elem = new LValueDialogMenu();
      		}
      		else{

    			 console.error(element,'type :',type,' is not implemented');
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

      console.log('new DialogMenu: ',elem);
    	instance.activeDialogMenu.push(elem);
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