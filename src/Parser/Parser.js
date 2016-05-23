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
        console.log("Load: ",this.source[i].id);

        if(this.source[i].type == LoadType.program){
            var element = new ProgramElement(this.source[i].id);
            var father = "#programList";
        }      
        else if(this.source[i].type == LoadType.variables){
            var element = new VariablesElement();
            var father = "#variablesList";
        }     
        else if(this.source[i].type == LoadType.function){
            var element = new FunctionElement(this.source[i].id);
            var father = "#functionList";
        } 

        Canvas.addElement(element);
        Canvas.setActiveElement(element);   
        var activeElement = Canvas.getActiveElement();        

        activeElement.addElement("doNothing",0);
        this.loadElements(activeElement , this.source[i].elements);

        var programHtml = createHtmlElement({
            format: "li",
            father: father
        });

        var programHtmlHeader = createHtmlElement({
            format: "h5",
            text: this.source[i].id,
            father: programHtml
        });
        $(programHtmlHeader).css('color', '#ffffff');

        $(programHtml).mousedown(function() {
            var id = $(this).html();
            var id2 = $(this).val(); 
            var id3 = $(this).text(); 
            var element = Canvas.getElement(id3);        
            Canvas.setActiveElement(element);
        });
    }  
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

    /*
    output.push({
        id: programElement.id,
        type: programElement.type,
        format: programElement.format
    });
    */
//localStorage.setItem('gameStorage', JSON.stringify(output));

console.log(output);

return;

    var stringOutput = JSON.stringify(output);

    var blob = new Blob([stringOutput], {type: "application/json"});
    var url  = URL.createObjectURL(blob);
 var a = document.createElement('a');
    a.download    = "json/outputProgram.json";
    a.href        = url;
    a.textContent = "Download backup.json";
    /*save json


   
    */
   var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

   saveData(output , 'json/outputProgram.json');
};

Parser.prototype.parseLogicExpressionData = function (data,inputElement){
    
    if(!data){
        return;
    }

    if(!inputElement)
        var newInputElement = new InputElement('',InputType.logicExpression);
    else{
        var newInputElement = new InputElement('',InputType.logicExpression);
        inputElement.addInputElement(newInputElement);
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

Parser.prototype.parseAssignExpressionData = function (data,nameInputElement,valueInputElement){

    if(!data){
        return;
    }

    if(!data.varName || !data.varType || ! data.arithmeticExpression){
        console.error('error in parseArrayExpressionData');
    }

    nameInputElement.setText(data.varName);
    nameInputElement.setType(data.varType);

    valueInputElement.setType(InputType.arithmeticExpression);
    
    this.parseArithmeticExpressionData(data.arithmeticExpression , valueInputElement)
};

Parser.prototype.parseArithmeticExpressionData = function (data,inputElement){
    
    if(!data){
        return;
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


