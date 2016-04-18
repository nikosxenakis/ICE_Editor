
function Parser () {
	return this;
}

Parser.prototype.loadProgram = function (inputPrograms){
    
    if(!inputPrograms)
        return;
    
    this.source = inputPrograms;
    
    var father = null;
    var offset = 0;

    console.log("Load Programs: ");
    for(var i=0; i<this.source.length; i++){
        console.log("\t",this.source[i].id);

        var programElement = new ProgramElement(this.source[i].id,offset,father);
        Canvas.addElement(programElement);
        Canvas.setActiveElement(programElement);
        var activeElement = Canvas.getActiveElement();        

        activeElement.addElement("doNothing",0);

        this.loadElements(activeElement , this.source[i].elements);
    }

};

Parser.prototype.loadElements = function (father , elements){

    if(!elements){
        return;
    }

    for(var i=0; i<elements.length; i++){
        var child = father.addElement(elements[i].type,i);
        this.loadElements(child , elements[i].elements);
    }

}

Parser.prototype.saveProgram = function (programElement){

    outputPrograms.push({id: programElement.id});
    //then save to file
};