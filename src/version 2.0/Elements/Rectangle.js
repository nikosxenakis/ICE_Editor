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

function Rectangle (id , pos , type , element , color , opac) {
	this.id = id;
	this.Element = element;
	this.type = type;
	this.rectangleInCanvas = this.createRectangleInCanvas(pos , type , color , opac);
	return this;
}

Rectangle.prototype.createRectangleInCanvas = function (pos , type , color , opac){

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

            elem.setOpacity(opac);
            c.canvas.add(elem);

            if(type == RectangleType.horizontial){
            	c.horizontalElements.push(elem);

                var text = new fabric.IText(this.id,{
                left: pos.left+10,
                top: pos.top+10,
                width:40,
                height:5,
                fill: "black",
                fontSize: 12,
                fontWeight: 12,
                //fontFamily: entry.fontFamily,
                selectable: false,
                id: this.id,
                textAlign:"center",
                hasControls: true,
                hasBorders: true
            });

            this.text = text;
            c.canvas.add(text);
            
            }
            else if(type == RectangleType.vertical){
            	c.verticalElements.push(elem);
            }

            
            

            return elem;

};

Rectangle.prototype.moveElement = function() {
    
    console.log("moving rectangle = ",this.id);
    return;
    if(this.father){
        //remove from father
    }

    this.Element.rectangles.sort(compare);

    //move the element based on this rect
    return;

    coords = {
        top: this.rectangles[0].rectangleInCanvas.getTop(),
        left: this.rectangles[0].rectangleInCanvas.getLeft()
    };
    
    this.pos = this.setPositions(coords);
    this.updatePositions();

    
};
