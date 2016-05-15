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

