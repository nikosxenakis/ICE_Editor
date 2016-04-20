var InputType = {
    //done
    doNothing: "doNothing",

    //under construction
    
    //lvalue
    lvalueID: "lvalueID",
    lvalueGlobalID: "lvalueGlobalID",
    lvalueArrayElement: "lvalueArrayElement",
    lvalueObjectElement: "lvalueObjectElement",

    //not done
    valueVariable: "valueVariable",
    valueNumber: "valueNumber",
    valueText: "valueText",
    valueBoolean: "valueBoolean",
    condition: "condition",
    array: "array"
};

function InputElement (input , type){
    this.input = input;
    this.type = type;
};

InputElement.prototype.setType = function(type) {
    this.type = type;
};

InputElement.prototype.getText = function() {
    if(this.type == InputType.valueText){
        return "\"" + this.input + "\"";
    } 
    return this.input;
};

InputElement.prototype.setText = function(text) {
    this.input = text;
};

