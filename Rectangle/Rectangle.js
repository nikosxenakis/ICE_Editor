
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
    this.pos = pos;
    this.visibility = true;
	this.rectangleInCanvas = this.createRectangleInCanvas(pos);
    this.elements = new Array();

	return this;
}

Rectangle.prototype.addElement = function (elem){
    this.elements.push(elem);
    elem.rectangle = this;
    elem.element = this.element;

    elem.move(this.rectangleInCanvas.getLeft(),this.rectangleInCanvas.getTop()-elem.getHeight()/2);
    
    elem.relPos = {
        top: elem.getTop() - this.rectangleInCanvas.getTop(),
        left: elem.getLeft() - this.rectangleInCanvas.getLeft()
    };

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

Rectangle.prototype.setVisibility = function (flag){

    if(this.visibility == flag)
        return;

    this.visibility = flag;

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
/*
Rectangle.prototype.moveRectangleElements = function (dx,dy){
    for(var k=0; k<this.elements.length; k++){        
        this.elements[k].move(dx,dy);
    }
};
*/
Rectangle.prototype.moveRectangleElements = function (){
    var rectLeft = this.rectangleInCanvas.getLeft();
    var rectTop = this.rectangleInCanvas.getTop();
    //console.log("rect = ",rectLeft,rectTop);
    for(var k=0; k<this.elements.length; k++){    
        var dx = rectLeft + this.elements[k].relPos.left;
        var dy = rectTop + this.elements[k].relPos.top; 
        dx = dx - this.elements[k].getLeft();
        dy = dy - this.elements[k].getTop();

        //console.log("rel elem = ",this.elements[k],dx,dy);

        this.elements[k].move(dx,dy);
    }
};

Rectangle.prototype.moveRectangle = function (dx,dy){
    this.moveRectangleInCanvas(dx,dy);
    this.moveRectangleElements();
    //this.moveRectangleElements(dx,dy);
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

}

Rectangle.prototype.createRectangleInCanvas = function (pos){

    var c=Canvas.getInstance();

    var elem = new fabric.Rect({
        left: pos.left,
        top: pos.top,
        fill: this.element.color,
        width: pos.width,
        height: pos.height,
        hasBorders: false,
        hasControls: false,
        hasRotatingPoint: false,
        stroke: 'grey',
        strokeWidth: 0.4,
        rx: 1,
        ry:1,
        id: this.id,
        rectangle:this,
        element:this.element,
        class: this
    });

    if(this.element.type == ElementType.doNothing || this.element.type == ElementType.grey){
        elem.selectable = false;
    }

    if(this.type == RectangleType.horizontial){
        c.horizontalElements.push(elem);
    }
    else if(this.type == RectangleType.vertical){
        c.verticalElements.push(elem);
    }

    elem.setOpacity(this.element.opac);
    c.canvas.add(elem);

    return elem;
};

Rectangle.prototype.mouseOver = function (){
    this.element.setOpacity(CanvasData.lowOpacity);
};

Rectangle.prototype.mouseUp = function (){

    var c = Canvas.getInstance();
    
    this.element.setOpacity(CanvasData.highOpacity);

    if(!this.element.father && this.element.type!=ElementType.program){
        //if there is a current dummy
        if(this.element.dummyElementCurrentPosition){

            var offset = this.element.dummyElementCurrentPosition.getElemetOffset();
            this.element.dummyElementCurrentPosition.father.addExistingElement(this.element,offset);

            //register movement
            var c = Canvas.getInstance();
            c.movedElementsPos++;
            c.movedElements.push({
                element: this.element,
                from: this.element.dummyElementOriginalPosition.father,
                to: this.element.dummyElementCurrentPosition.father,
                fromOffset: this.element.dummyElementOriginalPosition.getElemetOffset(),
                toOffset: offset
            });

            undoManager.add({
                undo: function() {
                    if(c.movedElementsPos < 0)
                        return;

                    var l = c.movedElements[c.movedElementsPos];
                    if(l){
                        l.element.removeElement();
                        l.from.addExistingElement(l.element,l.fromOffset);
                        c.movedElementsPos--;
                    }
                },
                redo: function() {
                    var l = c.movedElements[c.movedElementsPos + 1];
                    if(l){
                        c.movedElementsPos++;
                        l.element.removeElement();
                        l.to.addExistingElement(l.element,l.toOffset);
                    }
                }
            });
            
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
        this.element.father.reverseTransformElement(this.element);
        this.element.removeElementFromFather();
        this.element.father = null;

        //add the dummy gray element in this 
        this.element.dummyElementOriginalPosition = father.addElement(type,offset);

        if(this.element.format != ElementFormat.I)
            this.element.dummyElementOriginalPosition.addElement("grey",0);
                    
        this.element.dummyElementOriginalPosition.setOpacity(CanvasData.lowOpacity);
        this.element.dummyElementOriginalPosition.setOpacity(CanvasData.highOpacity);
        //this.element.dummyElementOriginalPosition.sendToBack();

        //fold the real element    
        this.element.foldElement(this.element);
                                 
        this.element.setOpacity(CanvasData.lowOpacity);
        
        //bring to front
        this.element.bringToFront(); 

    }

};

Rectangle.prototype.mouseOut = function (){
    this.element.setOpacity(CanvasData.highOpacity);
};

Rectangle.prototype.bringToFront = function (){
    this.rectangleInCanvas.bringToFront();

    for(var i = 0; i < this.elements.length; i++) {
        this.elements[i].bringToFront();
    }
};

Rectangle.prototype.sendToBack = function (){

    for(var i = 0; i < this.elements.length; i++) {
        this.elements[i].sendToBack();
    }

    this.rectangleInCanvas.sendToBack();
};

function compareRectangles(a,b) {
    if (a.rectangleInCanvas.getTop() >= b.rectangleInCanvas.getTop())
        return 1;
    else 
        return -1;
};
