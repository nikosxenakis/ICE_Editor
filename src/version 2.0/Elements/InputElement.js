var InputType = {
    variable: 0,
    valueVariable: 1,
    valueNumber: 2,
    valueText: 3,
    valueBoolean: 4
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

