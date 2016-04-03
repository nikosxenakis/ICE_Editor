function times() {
    times.count = ++times.count || 1; // f.count is undefined at first 
    return times.count;
}


Element.prototype.changeElementsWidth = function(width){

     for (var l=0; l < this.rectangles.length ; l++){
        if(this.rectangles[l].type == RectangleType.horizontial){

            this.rectangles[l].rectangleInCanvas.setWidth( this.rectangles[l].rectangleInCanvas.getWidth()+width);
            this.rectangles[l].rectangleInCanvas.setCoords();

            //if(this.rectangles[l].text)
            //    this.rectangles[l].text.setTop(this.rectangles[l].text.getTop()+offsetTop);
        }
    } 
    /*
    for (var k=0; k < this.elements.length ; k++){
        this.elements[k].changeElementsWidth(width);
    }
    */
    if(this.father){
        this.father.changeElementsWidth(width);
    }
}

Element.prototype.setOpacity = function(opac) {

    for (k=0; k < this.rectangles.length ; k++){
        if(this.rectangles[k])
            if(this.rectangles[k].rectangleInCanvas)
            this.rectangles[k].rectangleInCanvas.setOpacity(opac);
    }

    for (k=0; k < this.elements.length ; k++){
        if(this.elements[k])
            this.elements[k].setOpacity(opac);
    }

    /* problem with mouse over

    for (k=0; k < this.elements2.length ; k++){
        if(this.elements2[k])
            this.elements2[k].setOpacity(opac);
    }
    */
}



/*never used
Element.prototype.getRectanglesInCanvas = function() {

    rects = new Array();

    _.each(
        this.rectangles, 
        function(elem) {    
            rects.push(elem.rectangleInCanvas);
        }
    )

    return rects;
}

Element.prototype.getNextRect = function() {
    for (k=0; k < this.element.rectangles.length ; k++){
        if(this.element.rectangles[k]==this){
            return this.element.rectangles[k+1];
        }
    }
}

function compareElements(a,b) {
    aTop = a.getElementSize().top;
    bTop = b.getElementSize().top;

  if (aTop <= bTop)
    return 1;
  else 
    return -1;
}
*/

/*
Element.prototype.addElement = function(imageId,pos,opac,elementTransformationType) {

    //remove doNothing element
    if(this.elements.length == 1 && this.elements[0].type == ElementType.doNothing){
        if(elementTransformationType != ElementTransformationType.first){
            pos.top = pos.top - this.elements[0].getElementSize().height;
        }
        this.elements[0].removeElement();
    }

    var elemInfo = imageIdToElement(imageId);

    //elemInfo.type is: if while doNothing...
    
    var elem = null;

    if( elemInfo.type == ElementType.program ){
        elem = new ProgramElement(this.id+"_"+elemInfo.id+"_"+this.nextElementOffset , elemInfo.format , elemInfo.type , pos , this , opac);
    }
    else if( elemInfo.type == ElementType.while ){
        elem = new WhileElement(this.id+"_"+elemInfo.id+"_"+this.nextElementOffset , elemInfo.format , elemInfo.type , pos , this , opac);
    }
    else{
        elem = new Element(this.id+"_"+elemInfo.id+"_"+this.nextElementOffset , elemInfo.format , elemInfo.type , pos , this , opac);
    }

    this.nextElementOffset++;

    this.transformElement(elem,elementTransformationType);

    this.elements.push(elem);

    if(elem.type != ElementType.doNothing){

        var posDoNothing = {
            left : elem.getRectangle(RectangleOffset.firstVertical).getLeft()+elem.getRectangle(RectangleOffset.firstVertical).width,
            top : elem.getRectangle(RectangleOffset.firstVertical).getTop()
        };

        var e = elem.addElement("doNothingImage",posDoNothing,opac,elementTransformationType);
    }

    Canvas.setCanvasElementsCoords();
    Canvas.getInstance().canvas.renderAll();  

    return elem;
};
*/

/*
Element.prototype.moveElementRectangles = function(movedRectangle,dx,dy) {
    console.log("moving = ",this);

    this.rectangles.sort(compareRectangles);

    for (k=0; k < this.rectangles.length ; k++){
        if(this.rectangles[k]){
            
            if(this.rectangles[k] != movedRectangle){
                this.rectangles[k].moveRectangleInCanvas(dx,dy);
            }

            this.rectangles[k].moveRectangleText(dx,dy);
        }
    }

    if(this.rectangles.length > 1){
        for (k=0; k < this.rectangles.length ; k++){
                
            if(this.rectangles[k] == movedRectangle){

            
                //if its the dragging element set it based on the other rectangles
                if( this.rectangles[k].rectangleInCanvas.getTop() == this.size.top ){
                    //take the next rectangle from the stack
                    this.rectangles[k].rectangleInCanvas.setTop(this.rectangles[k-1].rectangleInCanvas.getTop()-this.rectangles[k].rectangleInCanvas.height);
                    this.rectangles[k].rectangleInCanvas.setLeft(this.rectangles[k-1].rectangleInCanvas.getLeft());
                }                
                else{
                    //take the next rectangle from the stack
                    this.rectangles[k].rectangleInCanvas.setTop(this.rectangles[k+1].rectangleInCanvas.getTop()+this.rectangles[k].rectangleInCanvas.height);
                    this.rectangles[k].rectangleInCanvas.setLeft(this.rectangles[k+1].rectangleInCanvas.getLeft());
                }


            }
        }
    }

};

Element.prototype.changeElementTop = function(offsetTop){

    this.foldingItem.moveFoldingItem(0, offsetTop);

    for (var l=0; l < this.rectangles.length ; l++){
        this.rectangles[l].moveRectangle(null,offsetTop);
    }
       
    if(this.elements.length > 0){
        
        for (var i=0; i < this.elements.length ; i++) { 
            if(this.elements[i]){
                this.elements[i].changeElementTop(offsetTop);
            }
        }    
        
    }
};

Element.prototype.reverseElementTop = function(offsetTop){

    this.foldingItem.moveFoldingItem(0, -offsetTop);

    for (var l=0; l < this.rectangles.length ; l++){
        this.rectangles[l].moveRectangle(null,-offsetTop);
    }
       
    if(this.elements.length > 0){
        
        for (var i=0; i < this.elements.length ; i++) { 
            if(this.elements[i]){
                this.elements[i].reverseElementTop(offsetTop);
            }
        }    
        
    }
};
*/
