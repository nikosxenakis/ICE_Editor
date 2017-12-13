var InputType = {

    //doNothing
        doNothing: "doNothing",

    //id
        localId: "localId",
        globalId: "globalId",
        arrayElement: "arrayElement",
        objectElement: "objectElement",

    //const
        number: "number",
        string: "string",
        bool: "bool",
        date: "date",
        time: "time",

    //arithmeticExpression
        arithmeticExpression: "arithmeticExpression",

        //arithmeticOperator
            arithmeticOperator: "arithmeticOperator",

    //logicExpression
        logicExpression: "logicExpression",

        //logicOperator
            logicOperator: "logicOperator",
            
    //comparisonExpression
        comparisonExpression: "comparisonExpression",
        //comparisonOperator
            comparisonOperator: "comparisonOperator",

    //arrayExpression
        arrayExpression: "arrayExpression"
        
};

function InputElement (input , type , father){

    this.input = input;
    this.type = type;
    this.father = father;
    this.inputElements = new Array();
};

InputElement.prototype.setType = function(type) {
    this.type = type;
};

InputElement.prototype.getText = function() {
    if(this.type == InputType.logicExpression || this.type == InputType.arithmeticExpression){
        if(this.inputElements[0] && this.inputElements[1] && this.inputElements[2]){
            return '('+this.inputElements[0].getText()+' '+this.inputElements[1].getText()+' '+this.inputElements[2].getText()+')';
        }
        else if(this.inputElements[0]){
            return this.inputElements[0].getText();
        }
        else if(this.inputElements.length == 0){
            if(this.input == ""){
                return DialogMenuData.dummyString;
            }
            else{
                return this.input;
            }
        }
        else{
            console.error('wrong format in input element');
        }
    } 
    else if(this.type == InputType.comparisonExpression){
        return '('+this.inputElements[0].getText()+' '+this.inputElements[1].getText()+' '+this.inputElements[2].getText()+')';
    }
    else if(this.type == InputType.comparisonOperator){
        return this.input;
    }
    else if(this.type == InputType.arrayExpression){
        if(this.inputElements){
            var str = "[";
            for(var k=0; k<this.inputElements.length; k++){
                    str += this.inputElements[k].getText();
                    if(k<this.inputElements.length-1)
                        str+= ",";
            }
            str += "]";
            return str;
        }
        else{
            console.error('wrong format in input element');
        }
    } 
    else if(this.type == InputType.logicOperator){
        return this.input;
    }   
    else if(
        this.type == InputType.localId ||
        this.type == InputType.globalId ||
        this.type == InputType.arrayElement ||
        this.type == InputType.objectElement
    ){
        return this.input;
    }   
    else if(this.type == InputType.localId){
        return this.input;
    }
    else if(this.type == InputType.globalId){
        return this.input;
    }
    else if(this.type == InputType.arrayElement || this.type == InputType.objectElement){
        return this.input;
    }
    else{
        return this.input;
    }
};

InputElement.prototype.setText = function(text) {
    this.input = text;
};

InputElement.prototype.addInputElement = function(elem) {
    this.inputElements.push(elem);
    elem.father = this;
    return elem;
};

InputElement.prototype.removeInputElement = function(){
    if(!this.father){
        console.error('InputElement has no father');
        return;
    }

    var i = this.father.inputElements.indexOf(this);
    if(i != -1) {
        this.father.inputElements.splice(i, 1);
    }
};
