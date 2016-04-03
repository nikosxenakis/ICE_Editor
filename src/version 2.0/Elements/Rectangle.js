
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

Rectangle.prototype.removeElement = function (elem){
    console.log("remove",elem);
    var c=Canvas.getInstance();

    for(var i = 0; i < this.elements.length; i++) {
        if(this.elements[i] == elem) {
            this.elements.splice(i, 1);
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
    
    for(var k=0; k<this.elements.length;k++){
        this.removeElement(this.elements[k]);
    }

    c.canvas.remove( this.rectangleInCanvas );

}

Rectangle.prototype.moveRectangle = function (dx,dy){
    this.moveRectangleInCanvas(dx,dy);

    for(var k=0; k<this.elements.length;k++){
        this.elements[k].move(dx,dy);
    }
}

Rectangle.prototype.moveRectangleInCanvas = function (dx,dy){
    if(dx){
        this.rectangleInCanvas.setLeft(this.rectangleInCanvas.getLeft() + dx);
    }
    if(dy){
        this.rectangleInCanvas.setTop(this.rectangleInCanvas.getTop() + dy);
    }

    this.rectangleInCanvas.setCoords();
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
        hasRotatingPoint: false,
        stroke: 'white',
        strokeWidth: 1,
        id: this.id,
        rectangle:this,
        element:this.element
    });

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

function compareRectangles(a,b) {
    if (a.rectangleInCanvas.getTop() >= b.rectangleInCanvas.getTop())
        return 1;
    else 
        return -1;
};
