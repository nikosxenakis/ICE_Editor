var LoadType = {
    program : "program",
    function : "function",
    object : "object",
    event : "event",
    variables : "variables",
};


function Parser () {
	return this;
};

Parser.prototype.load = function (inputPrograms){
    
    if(!inputPrograms)
        return;
    
    this.source = inputPrograms;

    for(var i=0; i<this.source.length; i++){

        if(this.source[i].type == LoadType.program){
            var element = new ProgramElement(this.source[i].id);
            var father = "#programList";
        }      
        else if(this.source[i].type == LoadType.variables){
            var element = new VariablesElement();
            var father = "#variablesList";
        }     
        else if(this.source[i].type == LoadType.function){
            var element = new FunctionElement(this.source[i].id,this.source[i].args);
            var father = "#functionList";
        } 

        this.addTopElement(element , this.source[i].elements , this.source[i].id , father);

    }
};

Parser.prototype.addTopElement = function (element , subElements , id , father){
        Canvas.addElement(element);
        Canvas.setActiveElement(element);   
        var activeElement = Canvas.getActiveElement();        

        activeElement.addElement("doNothing",0);
        this.loadElements(activeElement , subElements);

        var programHtml = createHtmlElement({
            format: "li",
            father: father
        });

        var programHtmlHeader = createHtmlElement({
            format: "a",
            text: id,
            father: programHtml
        });

        if(father == "#variablesList"){

            elemMouseDown = function(){
                
                var elem = $(this);
                var before = elem.prev();

                elem.remove();
                elem.insertAfter(before);

                elem.mousedown(elemMouseDown);

                var id = $(this).text(); 
                var element = Canvas.getElement(id);        
                Canvas.setActiveElement(element);
            };

            $(programHtml).mousedown(elemMouseDown);

            return;
        }

        var sideBarButtonRemove = createHtmlElement({
            format: "span",
            className: "glyphicon glyphicon-minus sideBarButtonRemove",
            father: programHtmlHeader
        });

        sideBarButtonRemoveMouseOver = function(){
            $(this).css('color','red');
        };

        sideBarButtonRemoveMouseOut = function(){
            $(this).css('color','mediumvioletred');
        };
        
        sideBarButtonRemoveMouseDown = function(){
            var id = $(this).parent().text();
            var element = Canvas.removeElement(id);

            $(this).parent().remove();
        };
        
        sideBarButtonRemove.mousedown(sideBarButtonRemoveMouseDown);
        sideBarButtonRemove.mouseover(sideBarButtonRemoveMouseOver);
        sideBarButtonRemove.mouseout(sideBarButtonRemoveMouseOut);  

        elemMouseDown = function(){

            var elem = $(this);
            var before = elem.prev();

            elem.remove();
            elem.insertAfter(before);

            elem.mousedown(elemMouseDown);

            var id = $(this).text(); 
            var element = Canvas.getElement(id);        
            Canvas.setActiveElement(element);
            

            var sideBarButtonRemove = elem.find('.sideBarButtonRemove');

            sideBarButtonRemove.mousedown(sideBarButtonRemoveMouseDown);
            sideBarButtonRemove.mouseover(sideBarButtonRemoveMouseOver);
            sideBarButtonRemove.mouseout(sideBarButtonRemoveMouseOut); 
        };

        $(programHtml).mousedown(elemMouseDown);

        $(programHtml).show();
};

Parser.prototype.loadElements = function (father , elements){

    if(!elements){
        return;
    }

    for(var i=0; i<elements.length; i++){
        var child = father.addElement(elements[i].type,i,elements[i].data);
        this.loadElements(child , elements[i].elements);
    }

}

Parser.prototype.saveProgram = function (programElement){
    console.log('Save program: ',programElement.id);
    
    var output = new Array();

    programElement.saveElement(output);

    console.log(output);
};

Parser.prototype.parseLogicExpressionData = function (data,inputElement){

    if(!data){
        var newInputElement = new InputElement('',InputType.logicExpression);
        inputElement.addInputElement(newInputElement);
        return inputElement;
    }

    if(!inputElement)
        var newInputElement = new InputElement('',InputType.logicExpression);
    else{
        if(data.type == InputType.comparisonExpression){
            var newInputElement2 = new InputElement('',InputType.logicExpression);
            inputElement.addInputElement(newInputElement2);
            
            var newInputElement = new InputElement('',InputType.comparisonExpression);
            newInputElement2.addInputElement(newInputElement);
        }
        else{
            var newInputElement = new InputElement('',InputType.logicExpression);
            inputElement.addInputElement(newInputElement);
        }
    }

    if(data.left && data.right && data.operator){
        
        parser.parseLogicExpressionData(data.left,newInputElement);
        parser.parseLogicExpressionData(data.operator,newInputElement);
        parser.parseLogicExpressionData(data.right,newInputElement);
    }
    else if(data.type && data.text){
        newInputElement.setType(data.type);
        newInputElement.setText(data.text);
    }
    else{
        console.error('Error during parseLogicExpressionData');
    }

    return newInputElement;
};
/*
Parser.prototype.parseArithmeticExpressionData = function (data,inputElement){

    if(!data){
        var newInputElement = new InputElement('',InputType.arithmeticExpression);
        inputElement.addInputElement(newInputElement);
        return inputElement;
    }

    if(!inputElement)
        var newInputElement = new InputElement('',InputType.arithmeticExpression);
    else{
        if(data.type == InputType.comparisonExpression){
            //inputElement.type = InputType.arithmeticExpression;
            var newInputElement2 = new InputElement('',InputType.arithmeticExpression);
            inputElement.addInputElement(newInputElement2);
            
            var newInputElement = new InputElement('',InputType.comparisonExpression);
            newInputElement2.addInputElement(newInputElement);

            //var newInputElement = newInputElement.addInputElement(new InputElement('',InputType.comparisonExpression));
        }
        else{
            var newInputElement = new InputElement('',InputType.arithmeticExpression);
            inputElement.addInputElement(newInputElement);
        }
    }

    if(data.left && data.right && data.operator){
        
        parser.parseArithmeticExpressionData(data.left,newInputElement);
        parser.parseArithmeticExpressionData(data.operator,newInputElement);
        parser.parseArithmeticExpressionData(data.right,newInputElement);
    }
    else if(data.type && data.text){
        newInputElement.setType(data.type);
        newInputElement.setText(data.text);
    }
    else{
        console.error('Error during parseArithmeticExpressionData');
    }

    return newInputElement;
};
*/
Parser.prototype.parseArithmeticExpressionData = function (data,inputElement){

    if(!data){
        var newInputElement = new InputElement('',InputType.logicExpression);
        inputElement.addInputElement(newInputElement);
        return inputElement;
    }

    if(!inputElement)
        var newInputElement = new InputElement('',InputType.arithmeticExpression);
    else{
        var newInputElement = new InputElement('',InputType.arithmeticExpression);
        inputElement.addInputElement(newInputElement);
    }

    if(data.left && data.right && data.operator){

        parser.parseArithmeticExpressionData(data.left,newInputElement);
        parser.parseArithmeticExpressionData(data.operator,newInputElement);
        parser.parseArithmeticExpressionData(data.right,newInputElement);
    }
    else if(data.type && data.text){
        newInputElement.setType(data.type);
        newInputElement.setText(data.text);
    }
    else{
        console.error('Error during parseArithmeticExpressionData');
    }

    return newInputElement;
};

Parser.prototype.parseArrayExpressionData = function (data,arrayNameInputElement,arrayExpressionInputElement){
    
    if(!data){
        return;
    }

    if(!data.arrayName || !data.arrayType || ! data.arrayList){
        console.error('error in parseArrayExpressionData');
    }

    arrayNameInputElement.setText(data.arrayName);
    arrayNameInputElement.setType(data.arrayType);

    arrayExpressionInputElement.setType(InputType.arrayExpression);
    
    for (var k=0; k<data.arrayList.length; k++) {
        arrayExpressionInputElement.addInputElement(new InputElement(data.arrayList[k].text,data.arrayList[k].type));
    };

};

Parser.prototype.parseFunctionArguments = function(args,argumentsInputElement){
    if(!args || !argumentsInputElement)
        return;

    for (var k=0; k<args.length; k++) {
        argumentsInputElement.addInputElement(new InputElement(args[k].text,args[k].type));
    };
};