
function Parser () {
	return this;
}

Parser.prototype.loadProgram = function (inputPrograms){
    
    if(!inputPrograms)
        return;
    
    this.source = inputPrograms;
    
    var opac = 1;
    var father = null;
    var offset = 0;

    console.log("Load Programs: ");
    for(var i=0; i<this.source.length; i++){
        console.log("\t",this.source[i].id);

        c.programElement = new ProgramElement(this.source[i].id,offset,father,opac);
        c.programElement.addElement("doNothingImage",offset,opac);

        this.loadElements(c.programElement , this.source[i].elements);
    }

};

Parser.prototype.loadElements = function (father , elements){

    if(!elements)
        return;

    var opac = 1;

    for(var i=0; i<elements.length; i++){
        var child = father.addElement(elements[i].type,i,opac);
        this.loadElements(child , elements[i].elements);
    }

}

Parser.prototype.saveProgram = function (programElement){

    outputPrograms.push({id: programElement.id});
    //then save to file
};