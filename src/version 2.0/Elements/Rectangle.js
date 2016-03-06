/*
define Rectangle{
		id,
		1 rect,
		type(vertical,horizontial),
		define 3 Area
}
 */

var RectangleType = {
    horizontial: 0,
    vertical: 1
};

function Rectangle (id , pos , type , element , color) {
	this.id = id;
	this.Element = element;
	this.type = type;
	this.rectangleInCanvas = this.createRectangleInCanvas(pos , type , color);
	return this;
}

Rectangle.prototype.createRectangleInCanvas = function (pos , type , color){

    c=Canvas.getInstance();

            var elem = new fabric.Rect({
                left: pos.left,
                top: pos.top,
                fill: color,
                width: pos.width,
                height: pos.height,
                selectable: true,
                id: this.id,
                rectangle:this,
                element:this.Element
            });

            if(type == RectangleType.horizontial){
            	c.horizontalElements.push(elem);
            }
            else if(type == RectangleType.vertical){
            	c.verticalElements.push(elem);
            }

            c.canvas.add(elem);
            
            return elem;

};


