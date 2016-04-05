var ElementFormat = {
    I: "I",
    C: "C",
    E: "E"
};

var ElementType = {
    if: "if",
    while: "while",
    for: "for",
    program: "program",
    doNothing: "doNothing",
    grey: "grey",
    assign: "assign"
};
    
var ElementTransformationType = {
    first: 0,
    intermediate: 1,
    last: 2
};

function Element (id , imageId , elementOffset , father , opac) {
    
    var elemInfo = imageIdToElement(imageId);

    if(father)
        var coords = father.elementOffsetToElementPos(elementOffset);
    else
        var coords = {
            left : CanvasData.left,
            top : CanvasData.top
        };


    this.id = id;
    this.format = elemInfo.format;
    this.type = elemInfo.type;
    this.color = elemInfo.color;
    this.pos = this.setPositions(coords);
    this.father = father;
    this.opac = opac;
    


    this.rectangles = this.createRectangles();
   
    this.getElementSize();
 
    if(this.type != ElementType.doNothing){
        this.deleteImage = new DeleteImage(this);
    }
    else{
        this.deleteImage = null;
    }

    this.foldingItem = new FoldingItem(this);

    this.elements = new Array();

    return this;
};

Element.prototype.createRectangles = function() {
    var rectangles = new Array();

    if(this.format == ElementFormat.I){
        if(this.type == ElementType.grey){
            this.pos.posStart.height = CanvasData.greyElementsHeight;
            rectangles.push(new Rectangle(this.id,this.pos.posStart,RectangleType.horizontial,this,RectangleOffset.firstHorizontial));
        }
        else{
            rectangles.push(new Rectangle(this.id,this.pos.posStart,RectangleType.horizontial,this,RectangleOffset.firstHorizontial));
        }
    }
    else if(this.format == ElementFormat.C){
        rectangles.push(new Rectangle(this.id+"RectangleEnd",this.pos.posEnd,RectangleType.horizontial,this,RectangleOffset.secondHorizontial));
        rectangles.push(new Rectangle(this.id+"RectangleBody",this.pos.posBody,RectangleType.vertical,this,RectangleOffset.firstVertical));
        rectangles.push(new Rectangle(this.id+"RectangleStart",this.pos.posStart,RectangleType.horizontial,this,RectangleOffset.firstHorizontial));
    }
    else if(this.format == ElementFormat.E){
        console.log("Under Construction");
    }
    else{
        console.log("There is no element with format = ",this.format);
    }

    return rectangles;
};

Element.prototype.setPositions = function(coords) {
    r = {
        posStart : {
            left : coords.left,
            top : coords.top,
            width : CanvasData.horizontalElementsWidth,
            height : CanvasData.horizontalElementsHeight
        },
        posBody : {
            left : coords.left, 
            top : coords.top+CanvasData.horizontalElementsHeight,
            width : CanvasData.verticalElementsWidth,
            height : CanvasData.verticalElementsHeight
        },
        posEnd : {
            left : coords.left, 
            top : coords.top+CanvasData.horizontalElementsHeight+CanvasData.verticalElementsHeight,
            width : CanvasData.horizontalElementsWidth,
            height : CanvasData.horizontalElementsHeight
        },
        posBody2 : {
            left : coords.left, 
            top : coords.top+CanvasData.horizontalElementsHeight+CanvasData.verticalElementsHeigth+CanvasData.horizontalElementsHeight,
            width : CanvasData.verticalElementsWidth,
            height : CanvasData.verticalElementsHeight
        },
        posEnd2 : {
            left : coords.left, 
            top : coords.top+CanvasData.horizontalElementsHeight+CanvasData.verticalElementsHeight+CanvasData.horizontalElementsHeight+CanvasData.horizontalElementsHeight,
            width : CanvasData.horizontalElementsWidth,
            height : CanvasData.horizontalElementsHeight
        }
    };

    return r;
};

Element.prototype.getElementSize = function() {
    var value = {
        top:10000,
        left:10000,
        height:0,
        width:0
    };       

    for (k=0; k < this.rectangles.length ; k++){

            if( this.rectangles[k].rectangleInCanvas.getTop() < value.top ){
                value.top = this.rectangles[k].rectangleInCanvas.getTop();
            }
        
            if( this.rectangles[k].rectangleInCanvas.getLeft() < value.left ){
                value.left = this.rectangles[k].rectangleInCanvas.getLeft();
            }
        
            if( this.rectangles[k].rectangleInCanvas.getWidth() > value.width ){
                value.width = this.rectangles[k].rectangleInCanvas.getWidth();
            }
        
            value.height += this.rectangles[k].rectangleInCanvas.getHeight();

    }
    //update
    this.size = value;
    return value;
};

Element.prototype.getInsideElementSize = function() {
    var value = this.getElementSize();     

    value.height = 0;
    value.top += this.getRectangle(RectangleOffset.firstHorizontial).height;

    for (var i = 0; i < this.elements.length; i++) {
        value.height += this.elements[i].getElementSize().height;
    };

    return value;
};

Element.prototype.setElementVisibillity = function(flag) {

    if(this.deleteImage)
        this.deleteImage.setDeleteImageVisibility(flag);
    
    if(this.foldingItem)
        this.foldingItem.setFoldingItemVisibillity(flag);

    for (k=0; k < this.rectangles.length ; k++){
        this.rectangles[k].setRectangleVisibillity(flag);
    }
    
    for (k=0; k < this.elements.length ; k++){
        this.elements[k].setElementVisibillity(flag);
    }

};

Element.prototype.getRectangle = function(rectangleOffset) {

    for (k=0; k < this.rectangles.length ; k++){
        if(this.rectangles[k].rectangleOffset == rectangleOffset){
            return this.rectangles[k].rectangleInCanvas;
        }
    }

    return null;
};

//add element functions

Element.prototype.changeElementInsideSpace = function(offsetHeight,offsetTop){

    this.foldingItem.changeSize(offsetHeight);

    for (var k=0; k < this.rectangles.length ; k++){   
        if(this.rectangles[k].rectangleInCanvas.getTop() >= offsetTop){
            if(this.rectangles[k].type == RectangleType.vertical){
                this.rectangles[k].rectangleInCanvas.setHeight(this.rectangles[k].rectangleInCanvas.getHeight()+offsetHeight);
                this.rectangles[k].rectangleInCanvas.setCoords();
            }
            else{
                this.rectangles[k].moveRectangle(null,offsetHeight);
            } 
        }
    }

    if(this.father){
        //to avoid moving horizontial objects
        this.father.changeElementInsideSpace(offsetHeight,this.father.getElementSize().top+1);
    }
};

Element.prototype.changeLastElementInsideSpace = function(offsetHeight,offsetTop){

    this.foldingItem.changeSize(offsetHeight);

    for (var k=0; k < this.rectangles.length ; k++){      
        if(this.rectangles[k].type == RectangleType.vertical){
            this.rectangles[k].rectangleInCanvas.setHeight(this.rectangles[k].rectangleInCanvas.getHeight()+offsetHeight);
        }
        
        if(this.rectangles[k].rectangleInCanvas.getTop() >= offsetTop){            
            if(this.rectangles[k].type == RectangleType.horizontial){
                this.rectangles[k].moveRectangle(null,offsetHeight);
            } 
            
        }
        
    }

    if(this.father){
        //to avoid moving horizontial objects
        this.father.changeLastElementInsideSpace(offsetHeight,this.father.getElementSize().top+1);
    }
};

Element.prototype.changeElementsTop = function(exceptElem,height){

    for (var k=0; k < this.elements.length ; k++){
        if(this.elements[k] != exceptElem){
            if( this.elements[k].getElementSize().top >= exceptElem.getElementSize().top ){
                this.elements[k].moveElement(null,0,height); 
            }
        }
    } 

    if(this.father){
        this.father.changeElementsTop(this,height);
    }
};

Element.prototype.transformElement = function(elem,elementTransformationType) {

    if(!elem){
        console.log("No element to transform");
    }

    var size = elem.getElementSize();

    c=Canvas.getInstance();
   
    if(elementTransformationType == ElementTransformationType.first)
        this.changeElementInsideSpace(size.height,size.top);
    else
        this.changeLastElementInsideSpace(size.height,size.top);

    Canvas.setCanvasElementsCoords();
    c.canvas.renderAll(); 

    this.changeElementsTop(elem,size.height);
  
    Canvas.setCanvasElementsCoords();
    c.canvas.renderAll();    
};

Element.prototype.elementOffsetToElementTransformationType = function(elementOffset){
    if(elementOffset == 0)
        return ElementTransformationType.first;
    else if(elementOffset == this.elements.length)
        return ElementTransformationType.last;
    else
        return ElementTransformationType.intermediate;

};

Element.prototype.elementOffsetToElementPos = function(elementOffset){

    var pos;

    if(elementOffset == 0){
        pos = {
            left : this.getRectangle(RectangleOffset.firstVertical).getLeft()+this.getRectangle(RectangleOffset.firstVertical).width,
            top : this.getRectangle(RectangleOffset.firstVertical).getTop()
        };
    }
    else if(elementOffset == this.elements.length){
        pos = {
            left : this.getRectangle(RectangleOffset.firstVertical).getLeft()+this.getRectangle(RectangleOffset.firstVertical).width,
            top : this.getRectangle(RectangleOffset.secondHorizontial).getTop()
        };
    }
    else{

        pos = {
            left : this.getRectangle(RectangleOffset.firstVertical).getLeft()+this.getRectangle(RectangleOffset.firstVertical).width,
            top : this.elements[elementOffset].getRectangle(RectangleOffset.firstHorizontial).getTop()        
        };
    }

    return pos;
};

Element.prototype.elementFactory = function(imageId , elementOffset , opac) {

    //choose constructor class
    var elemInfo = imageIdToElement(imageId);
    if(!elemInfo)
        console.log("error in elementFactory");

    if( elemInfo.type == ElementType.program ){
        return new ProgramElement(this.id+"_"+elemInfo.id,elementOffset,this,opac);
    }
    else if( elemInfo.type == ElementType.while ){
        return new WhileElement(this.id+"_"+elemInfo.id,elementOffset,this,opac);
    }
    else if( elemInfo.type == ElementType.gray ){
        return new GreyElement(this.id+"_"+elemInfo.id,elementOffset,this,opac);
    }
    else if( elemInfo.type == ElementType.assign ){
        return new AssignElement(this.id+"_"+elemInfo.id,elementOffset,this,opac);
    }
    else if( elemInfo.type == ElementType.doNothing ){
        return new DoNothingElement(this.id+"_"+elemInfo.id,elementOffset,this,opac);
    }
    else{
        return new Element(this.id+"_"+elemInfo.id,imageId,elementOffset,this,opac);
    }

};

Element.prototype.addElement = function(imageId,elementOffset,opac) {

    //from offset produce pos and elementTransformationType
    var pos = this.elementOffsetToElementPos(elementOffset);
    var elementTransformationType = this.elementOffsetToElementTransformationType(elementOffset);

    //remove doNothing element
    if(this.elements.length == 1 && this.elements[0].type == ElementType.doNothing){
        if(elementTransformationType != ElementTransformationType.first){
            pos.top = this.elements[0].getElementSize().top;
        }
        this.elements[0].removeElement();
        elementOffset = 0;
    }
    
    var elem = this.elementFactory(imageId,elementOffset,opac);

    this.transformElement(elem,elementTransformationType);

    this.elements.splice(elementOffset, 0, elem);

    if(elem.format != ElementFormat.I){
        var e = elem.addElement("doNothingImage",0,1);
    }

    Canvas.setCanvasElementsCoords();
    Canvas.getInstance().canvas.renderAll();  

    return elem;
};

Element.prototype.addExistingElement = function(element,elementOffset) {
    console.log("add existing element");

     //from offset produce pos and elementTransformationType
    var pos = this.elementOffsetToElementPos(elementOffset);
    var elementTransformationType = this.elementOffsetToElementTransformationType(elementOffset);

    //remove doNothing element
    if(this.elements.length == 1 && this.elements[0].type == ElementType.doNothing){
        if(elementTransformationType != ElementTransformationType.first){
            pos.top = pos.top - this.elements[0].getElementSize().height;
        }
        this.elements[0].removeElement();
    }

    //set the father
    element.father = this;

    //move the new element
    var coords = this.elementOffsetToElementPos(elementOffset);
    var dx = coords.left - element.getElementSize().left;
    var dy = coords.top - element.getElementSize().top;
    element.moveElement(null,dx,dy);
   
    this.transformElement(element,elementTransformationType);

    this.elements.splice(elementOffset, 0, element);

    Canvas.setCanvasElementsCoords();
    Canvas.getInstance().canvas.renderAll();  

    return element;
}

//move element functions
Element.prototype.moveElementRectangles = function(movedRectangle,dx,dy) {

    var nextToMovedRectangle = null;
    var prevToMovedRectangle = null;

    this.rectangles.sort(compareRectangles);

    for (k=0; k < this.rectangles.length ; k++){
        if(this.rectangles[k]){
            
            if(this.rectangles[k] != movedRectangle){
                this.rectangles[k].moveRectangle(dx,dy);
            }
            else{
                this.rectangles[k].moveRectangleElements(dx,dy);

                if(movedRectangle.rectangleOffset == RectangleOffset.firstHorizontial){
                    nextToMovedRectangle = this.rectangles[k+1];
                }
                else{
                    prevToMovedRectangle = this.rectangles[k-1];
                }
            }

        }
    }

    if(movedRectangle){
        var dx;
        var dy;

        if(nextToMovedRectangle){
            movedRectangle.rectangleInCanvas.setTop(nextToMovedRectangle.rectangleInCanvas.getTop()-movedRectangle.rectangleInCanvas.height);
            movedRectangle.rectangleInCanvas.setLeft(nextToMovedRectangle.rectangleInCanvas.getLeft());
        }
        else if(prevToMovedRectangle){
            movedRectangle.rectangleInCanvas.setTop(prevToMovedRectangle.rectangleInCanvas.getTop()+prevToMovedRectangle.rectangleInCanvas.height);
            movedRectangle.rectangleInCanvas.setLeft(prevToMovedRectangle.rectangleInCanvas.getLeft());
        }
        else{
            console.log("Error In moveElementRectangles");
        }
    }
};

Element.prototype.moveSubElements = function(dx,dy) {
    for (var k=0; k < this.elements.length ; k++){
        if(this.elements[k]){
            this.elements[k].moveElement(null,dx,dy);
        }
    }
};

Element.prototype.moveElement = function(movedRectangle, dx, dy) {

    this.moveElementRectangles(movedRectangle,dx,dy);
    
    if(this.type != ElementType.doNothing){
        this.deleteImage.moveDeleteImage(dx,dy);
        this.foldingItem.moveFoldingItem(dx,dy);
    }

    this.moveSubElements(dx,dy);

};

//remove element functions
Element.prototype.removeElement = function() {

    if(!this.father){
        console.log("There is no father for ",this.id);
        return false;
    }

    //replace the deleting element with doNothing
    if(this.father.elements.length == 1 && this.father.elements[0] == this && this.type != ElementType.doNothing){
        var e = this.father.addElement("doNothingImage",0,1);
    }

    //revert transformation
    this.father.reverseTransformElement(this);
    
    //search in this.father.elements
    this.removeElementFromFather();

    this.removeRectangles();
    this.removeDeleteImage();
    this.removeFoldingItem();

    return true;
};
    
Element.prototype.removeElementFromFather = function() {
    for (var k=0; k < this.father.elements.length ; k++){
        
        if( this.father.elements[k] == this ){
            this.father.elements.splice(k, 1);
            break;
        }    
    }
}
Element.prototype.removeRectangles = function(){

    c=Canvas.getInstance();


    //search in horizontial and vertical elements
    for (var k=0; k < this.rectangles.length ; k++){

        this.rectangles[k].removeRectangle();

        for (var l=0; l < c.horizontalElements.length ; l++){
            if( this.rectangles[k].rectangleInCanvas == c.horizontalElements[l] ){
                c.horizontalElements.splice(l, 1);
            }
        } 
        for (var m=0; m < c.verticalElements.length ; m++){
            if( this.rectangles[k].rectangleInCanvas == c.verticalElements[m] ){
                c.horizontalElements.splice(l, 1);
            }
        }     
    }    

        //remove each subelement
    for (k=0; k < this.elements.length ; k++){
        this.elements[k].removeRectangles();
    }

    c.canvas.renderAll();   
}

Element.prototype.removeDeleteImage = function(){
    if(this.deleteImage){
        this.deleteImage.removeDeleteImage();
        this.deleteImage = null;
    }
}

Element.prototype.removeFoldingItem = function(){
    if(this.foldingItem){
        this.foldingItem.removeFoldingItem();
        this.foldingItem = null;
    }
}

Element.prototype.reverseElementInsideSpace = function(offsetHeight,offsetTop){

    this.foldingItem.changeSize(-offsetHeight);

    for (var k=0; k < this.rectangles.length ; k++){   
        if(this.rectangles[k].type == RectangleType.vertical){
            this.rectangles[k].rectangleInCanvas.setHeight(this.rectangles[k].rectangleInCanvas.getHeight()-offsetHeight);
            this.rectangles[k].rectangleInCanvas.setCoords();
        }
        else{
            if(this.rectangles[k].rectangleInCanvas.getTop() >= offsetTop){
                this.rectangles[k].moveRectangle(null,-offsetHeight);
            } 
        }
    }

    if(this.father){
        //to avoid moving horizontial objects
        this.father.reverseElementInsideSpace(offsetHeight,this.father.getElementSize().top+1);
    }
};

Element.prototype.reverseElementsTop = function(exceptElem,height){

    for (var k=0; k < this.elements.length ; k++){
        if(this.elements[k] != exceptElem){
            if( this.elements[k].getElementSize().top >= exceptElem.getElementSize().top ){
                this.elements[k].moveElement(null,0,-height); 
            }
        }
    } 

    if(this.father){
        this.father.reverseElementsTop(this,height);
    }
};

Element.prototype.reverseTransformElement = function(elem) {
    //no reverseTransformElement do as above

    if(!elem){
        console.log("No element to reverse transform");
    }

    var size = elem.getElementSize();

    c=Canvas.getInstance();

    this.reverseElementsTop(elem,size.height);

    Canvas.setCanvasElementsCoords();
    c.canvas.renderAll(); 

    this.reverseElementInsideSpace(size.height,size.top);
  
    Canvas.setCanvasElementsCoords();
    c.canvas.renderAll(); 

};

//opacity
Element.prototype.setOpacity = function(opac) {

    this.opac = opac;

    for (var k=0; k < this.rectangles.length ; k++){
        if(this.rectangles[k])
            this.rectangles[k].setOpacity(opac);
    }

    for (var k=0; k < this.elements.length ; k++){
        if(this.elements[k])
            this.elements[k].setOpacity(opac);
    }
};

Element.prototype.cloneElement = function() {
    //none
};

//folding
Element.prototype.unfoldAllSubElements = function() {

    if(this.foldingItem.foldingItemState == FoldingItemState.folded){
        this.unfoldElement(this);
    }

    for (var k=0; k < this.elements.length ; k++){
        this.elements[k].unfoldAllSubElements();
    }

};

Element.prototype.foldElement = function(foldedElement) {
    console.log("Fold Element : ",this);

    if(this != foldedElement){
        this.setElementVisibillity(false);
    }

    if(this == foldedElement){
        this.unfoldAllSubElements();

        this.reverseElementInsideSpace(this.getInsideElementSize().height,this.getInsideElementSize().top);

        if(this.father){
            this.father.reverseElementsTop(this,this.getInsideElementSize().height);
        }
        
    }

    for (var k=0; k < this.elements.length ; k++){   
        this.elements[k].foldElement(foldedElement);
    }
    
    this.foldingItem.foldingItemState = FoldingItemState.folded;

};

Element.prototype.unfoldElement = function(unfoldedElement) {
    console.log("Unfold Element : ",this);

    if( this != unfoldedElement){
        if(this.foldingItem.foldingItemState == FoldingItemState.unfolded){
            this.foldElement(this);
        }

        this.setElementVisibillity(true);
    }

    if(this == unfoldedElement){
        if(this.foldingItem.foldingItemState == FoldingItemState.unfolded){
            return;
        }

        this.changeElementInsideSpace(this.getInsideElementSize().height,this.getInsideElementSize().top);
        
        if(this.father){
            this.father.changeElementsTop(this,this.getInsideElementSize().height);
        }
        
    }
   
    for (var k=0; k < this.elements.length ; k++){   
        this.elements[k].unfoldElement(unfoldedElement);
    }

    this.foldingItem.foldingItemState = FoldingItemState.unfolded;

    if(this.deleteImage)
        this.deleteImage.setDeleteImageVisibility(false);

    if(this.foldingItem)
        this.foldingItem.setFoldingItemVisibillity(false);

};

Element.prototype.containsRectangle = function(rectangle){

    for (var k=0; k < this.rectangles.length ; k++){
        if(this.rectangles[k])
            if(this.rectangles[k].rectangleInCanvas)
                if( this.rectangles[k].rectangleInCanvas == rectangle)
                    return true;
    }

    for (var k=0; k < this.elements.length ; k++){   
        if( this.elements[k].containsRectangle(rectangle) )
            return true;
    }

    return false;
}

Element.prototype.getElemetOffset = function(){
    if(!this.father)
        return;

    for (var k=0; k < this.father.elements.length ; k++){   
        if( this.father.elements[k] == this )
            return k;
    }
}

Element.prototype.bringToFront = function(){

    for(var k=0; k< this.rectangles.length; k++){
        this.rectangles[k].bringToFront();
    }  

    this.deleteImage.bringToFront();
    this.foldingItem.bringToFront();
};
