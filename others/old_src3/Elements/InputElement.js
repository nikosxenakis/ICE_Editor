var InputType = {
    //doNothing
        doNothing: "doNothing",
    
    //lvalue
        lvalue: "lvalue",   //default
        lvalueID: "lvalueID",
        lvalueGlobalID: "lvalueGlobalID",
        lvalueArrayElement: "lvalueArrayElement",
        lvalueObjectElement: "lvalueObjectElement",

    //expression
        expression: "expression", //default
            //arithmetic
                expressionArithmentic: "expressionArithmentic",
            //logic
                expressionLogic: "expressionLogic",
            //term
                //lvalue
                expressionTermLvalueID: "expressionTermLvalueID",
                expressionTermLvalueGlobalID: "expressionTermLvalueGlobalID",
                expressionTermLvalueArrayElement: "expressionTermLvalueArrayElement",
                expressionTermLvalueObjectElement: "expressionTermLvalueObjectElement",
                //call
                expressionTermCallFunction: "expressionTermCallFunction",
                expressionTermCallObjectMethod: "expressionTermCallObjectMethod",
                //const
                expressionTermConstNumber: "expressionTermConstNumber",
                expressionTermConstString: "expressionTermConstString",
                expressionTermConstBool: "expressionTermConstBool",
                expressionTermConstDate: "expressionTermConstDate",
                expressionTermConstTime: "expressionTermConstTime",
            //array
                expressionArray: "expressionArray",

    //logicExpression
        logicExpressionDefault: "logicExpressionDefault",   //default
        logicExpression: "logicExpression",

    //number
        number: "number",   //default

    //id
        id: "id",   //default

    //LogicOperator
        logicOperator: "logicOperator", //default

    //logicExpressionTerm
        logicExpressionTerm: "logicExpressionTerm", //default

        //logicExpressionTermVariable
            logicExpressionTermLocalVariable: "logicExpressionTermLocalVariable",
            logicExpressionTermGlobalVariable: "logicExpressionTermGlobalVariable",
            logicExpressionTermArrayElement: "logicExpressionTermArrayElement",
            logicExpressionTermObjectElement: "logicExpressionTermObjectElement",

        //logicExpressionTermConstant
            logicExpressionTermConstantNumber: "logicExpressionTermConstantNumber",
            logicExpressionTermConstantText: "logicExpressionTermConstantText",
            logicExpressionTermConstantBool: "logicExpressionTermConstantBool",
            logicExpressionTermConstantDate: "logicExpressionTermConstantDate",
            logicExpressionTermConstantTime: "logicExpressionTermConstantTime",

        //logicExpressionTermFunctionCall
            logicExpressionTermFunctionCall: "logicExpressionTermFunctionCall",
  
        
};

function InputElement (input , type){
    this.input = input;
    this.type = type;
    this.inputElements = new Array();
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

InputElement.prototype.addInputElement = function(elem) {
    this.inputElements.push(elem);
};