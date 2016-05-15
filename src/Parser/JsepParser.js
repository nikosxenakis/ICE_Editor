var JsepParser = (function(){

    function JsepParser() {
    }

    var instance;
    return {
        getInstance: function(){
            if (instance == null) {
                instance = new JsepParser();
                instance.constructor = null;
            }
            return instance;
        },
        toString: toString
    };

function toString(expr){
/*
    var COMPOUND = 'Compound',
        IDENTIFIER = 'Identifier',
        MEMBER_EXP = 'MemberExpression',
        LITERAL = 'Literal',
        THIS_EXP = 'ThisExpression',
        CALL_EXP = 'CallExpression',
        UNARY_EXP = 'UnaryExpression',
        BINARY_EXP = 'BinaryExpression',
        LOGICAL_EXP = 'LogicalExpression',
        CONDITIONAL_EXP = 'ConditionalExpression',
        ARRAY_EXP = 'ArrayExpression',
*/
    if(expr.type == 'Compound'){
        console.log('Compound ',expr);
        console.log('Not implemented');
        return;
    }
    else if(expr.type == 'Identifier'){
        console.log('Identifier ',expr);
        return expr.name;
    }
    else if(expr.type == 'MemberExpression'){
        console.log('MemberExpression ',expr);
        //object property
        //it can be array element or object element
        if(expr.computed == false)
            return toString(expr.object)+"."+toString(expr.property);
        else if(expr.computed == true)
            return toString(expr.object)+"["+toString(expr.property)+"]";
    }
    else if(expr.type == 'Literal'){
        console.log('Literal ',expr);
        return expr.raw;
    }
    else if(expr.type == 'ThisExpression'){
        console.log('ThisExpression ',expr);
        return;
    }
    else if(expr.type == 'CallExpression'){
        console.log('CallExpression ',expr);
        var str = expr.callee+"(";
        for(var k=0; k<expr.arguments.length; k++){
            if(k==expr.arguments.length-1)
                str=str + toString(expr.arguments[k]);
            else
                str=str + toString(expr.arguments[k]) + ",";
        }
        return str+")";
    }
    else if(expr.type == 'UnaryExpression'){
        console.log('UnaryExpression ',expr);
        console.log('Not implemented');
        return;
    }
    else if(expr.type == 'BinaryExpression'){
        console.log('BinaryExpression ',expr);
        return toString(expr.left) + expr.operator + toString(expr.right);
    }
    else if(expr.type == 'LogicalExpression'){
        console.log('LogicalExpression ',expr);
        console.log('Not implemented');
        return;
    }
    else if(expr.type == 'ConditionalExpression'){
        console.log('ConditionalExpression ',expr);
        return;
    }
    else if(expr.type == 'ArrayExpression'){
        console.log('ArrayExpression ',expr);
        var str = expr.callee+"[";
        for(var k=0; k<expr.elements.length; k++){
            if(k==expr.elements.length-1)
                str=str + toString(expr.elements[k]);
            else
                str=str + toString(expr.elements[k]) + ",";
        }
        return str+"]";
    }
/*
    var text = "";

    var name = expr.name;
    var raw = expr.raw;

    if(name)
        return name;
    if(raw)
        return raw;
*/

    var left = expr.left;
    if(left)
        text += toString(left);

    var operator = expr.operator;
    if(operator)
        text += operator;

    var right = expr.right;
    if(right)
        text += toString(right);

    return text;
 
};

})();
