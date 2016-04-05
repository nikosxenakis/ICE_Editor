
var RectangleType = {
    horizontial: 0,
    vertical: 1
};

var RectangleOffset = {
    firstHorizontial: 0,
    firstVertical: 1,
    secondHorizontial: 2,
    secondVertical: 3,
    thirdHorizontial: 4,
};

function Rectangle (id , pos , type , element, rectangleOffset) {
	this.id = id;
	this.element = element;
	this.type = type;
    this.rectangleOffset = rectangleOffset;

	this.rectangleInCanvas = this.createRectangleInCanvas(pos);
    this.elements = new Array();

	return this;
}

Rectangle.prototype.addElement = function (elem){
    this.elements.push(elem);
    elem.rectangle = this;
    elem.element = this.element;

};

Rectangle.prototype.removeElement = function (elem,k){

    var c=Canvas.getInstance();

    if(k){
        this.elements.splice(k, 1);
    }
    else{
        for(var i = 0; i < this.elements.length; i++) {
            if(this.elements[i] == elem) {
                this.elements.splice(i, 1);
            }
        }   
    }

    elem.remove();

};

Rectangle.prototype.setRectangleVisibillity = function (flag){
    this.rectangleInCanvas.visible = flag;

    for(var k=0; k<this.elements.length;k++){
        this.elements[k].setVisibillity(flag);
    }

}

Rectangle.prototype.removeRectangle = function (){

    while(this.elements.length>0){
        this.removeElement(this.elements[0],0);
    }

    c.canvas.remove( this.rectangleInCanvas );

}

Rectangle.prototype.moveRectangleElements = function (dx,dy){
    for(var k=0; k<this.elements.length; k++){        
        this.elements[k].move(dx,dy);
    }
};

Rectangle.prototype.moveRectangle = function (dx,dy){
    this.moveRectangleInCanvas(dx,dy);
    this.moveRectangleElements(dx,dy);
};

Rectangle.prototype.moveRectangleInCanvas = function (dx,dy){
    if(dx){
        this.rectangleInCanvas.setLeft(this.rectangleInCanvas.getLeft() + dx);
    }
    if(dy){
        this.rectangleInCanvas.setTop(this.rectangleInCanvas.getTop() + dy);
    }

    this.rectangleInCanvas.setCoords();
}

Rectangle.prototype.setOpacity = function (opac){

    if(this.rectangleInCanvas)
        this.rectangleInCanvas.setOpacity(opac);
    
    for(var k=0; k<this.elements.length;k++){
        //this.elements[k].setOpacity(opac);
    }
}

Rectangle.prototype.createRectangleInCanvas = function (pos){

    var c=Canvas.getInstance();

    var elem = new fabric.Rect({
        left: pos.left,
        top: pos.top,
        fill: this.element.color,
        width: pos.width,
        height: pos.height,
        selectable: true,
        hasControls: false,
        stroke: 'white',
        strokeWidth: 0,
        id: this.id,
        rectangle:this,
        element:this.element,
        class: this
    });

    if(this.element.type == ElementType.doNothing){
        elem.selectable = false;
    }

    elem.setOpacity(this.element.opac);
    c.canvas.add(elem);

    if(this.type == RectangleType.horizontial){
        c.horizontalElements.push(elem);
    }
    else if(this.type == RectangleType.vertical){
        c.verticalElements.push(elem);
    }

    return elem;
};

Rectangle.prototype.mouseOver = function (){
    if(this.element.deleteImage)
        this.element.deleteImage.setDeleteImageVisibility(true);

    if(this.element.foldingItem)
        this.element.foldingItem.setFoldingItemVisibillity(true);

    this.element.setOpacity(0.6);
};

Rectangle.prototype.mouseUp = function (){

    var c = Canvas.getInstance();
    
    this.element.setOpacity(1);

    if(!this.element.father && this.element.type!=ElementType.program){
        //if there is a current dummy
        if(this.element.dummyElementCurrentPosition){

            var offset = this.element.dummyElementCurrentPosition.getElemetOffset();
            this.element.dummyElementCurrentPosition.father.addExistingElement(this.element,offset);
            this.element.dummyElementCurrentPosition.removeElement();
            this.element.dummyElementCurrentPosition = null;

            if(this.element.dummyElementOriginalPosition){
                this.element.dummyElementOriginalPosition.removeElement();
                this.element.dummyElementOriginalPosition = null;
            }
        }
        else{
            if(this.element.dummyElementOriginalPosition){
                var offset = this.element.dummyElementOriginalPosition.getElemetOffset();
                this.element.dummyElementOriginalPosition.father.addExistingElement(this.element,offset);
                this.element.dummyElementOriginalPosition.removeElement();
                this.element.dummyElementOriginalPosition = null;
            }
        }                    

        c.intersection = false;
        c.tmpElement = null;
        c.elementsUnderDrag.length = 0;

        this.element.unfoldElement(this.element);
    }
};

Rectangle.prototype.mouseDown = function (){
    
    if(this.element.father && this.element.type != ElementType.doNothing){
        
        //removes element from father
        var father = this.element.father;
        var type = this.element.type;
        var offset = this.element.getElemetOffset();
        var opac = 1;
        this.element.father.reverseTransformElement(this.element);
        this.element.removeElementFromFather();
        this.element.father = null;

        //add the dummy gray element in this 
        this.element.dummyElementOriginalPosition = father.addElement(type+"Image",offset,opac);
        this.element.dummyElementOriginalPosition.addElement("greyImage",0,opac);
                    
        //fold the real element    
        this.element.foldElement(this.element);
                                 
        //bring to front
        this.element.bringToFront(); 

        this.element.setOpacity(0.6);

    }
};

Rectangle.prototype.mouseOut = function (){
    if(this.element.deleteImage)
        this.element.deleteImage.setDeleteImageVisibility(false);

    if(this.element.foldingItem)
        this.element.foldingItem.setFoldingItemVisibillity(false);

    this.element.setOpacity(1);
};

Rectangle.prototype.bringToFront = function (){
    this.rectangleInCanvas.bringToFront();

    for(var i = 0; i < this.elements.length; i++) {
        this.elements[i].bringToFront();
    }

};

function compareRectangles(a,b) {
    if (a.rectangleInCanvas.getTop() >= b.rectangleInCanvas.getTop())
        return 1;
    else 
        return -1;
};
