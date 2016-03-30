
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

    this.text = null;
    //this.createTextInCanvas(pos);

	return this;
}

Rectangle.prototype.setRectangleVisibillity = function (flag){
    this.rectangleInCanvas.visible = flag;

    if(this.text)
        this.text.visible = flag;
}

Rectangle.prototype.removeRectangle = function (){
    var c=Canvas.getInstance();
    
    c.canvas.remove(this.text);
    c.canvas.remove( this.rectangleInCanvas );

}

Rectangle.prototype.moveRectangle = function (dx,dy){
    this.moveRectangleInCanvas(dx,dy);
    this.moveRectangleText(dx,dy);

    if(this.element.deleteImage && this.rectangleOffset == RectangleOffset.firstHorizontial)
        this.element.deleteImage.moveDeleteImage(dx,dy);
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

Rectangle.prototype.moveRectangleText = function (dx,dy){
    if(dx){
        if(this.text)
            this.text.setLeft(this.text.getLeft() + dx);
    }
    if(dy){
        if(this.text)
            this.text.setTop(this.text.getTop() + dy);    
    }

    if(this.text)
        this.text.setCoords();

}

Rectangle.prototype.createTextInCanvas = function (pos){

    var c=Canvas.getInstance();

    if(this.type == RectangleType.horizontial){
        this.text = new fabric.IText(this.id,{
            left: pos.left+1,
            top: pos.top+1,
            width:40,
            height:5,
            fill: "black",
            fontSize: 8,
            fontWeight: 12,
            fontFamily: "Arial",
            selectable: false,
            id: this.id,
            textAlign:"center",
            hasControls: false,
            hasBorders: false,
            rectangle: this,
            element: this.element
        });

        c.canvas.add(this.text);
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
