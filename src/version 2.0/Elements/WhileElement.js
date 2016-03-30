function WhileElement (id , elementOffset , father , opac){
    Element.call(this , id , "whileImage" , elementOffset , father , opac);

    this.text = null;
    this.createTextInCanvas();

}

WhileElement.prototype = Element.prototype;

WhileElement.prototype.createTextInCanvas = function (){

    var c=Canvas.getInstance();

    var rect1 = this.getRectangle(RectangleOffset.firstHorizontial);

	this.text = new fabric.IText("while start",{
        left: rect1.getLeft()+rect1.width/16,
        top: rect1.getTop()+rect1.height/4,
        fill: "white",
        fontSize: 22,
        //fontFamily: "Arial",
        selectable: false,
        id: this.id,
        textAlign:"center",
        hasControls: false,
        rectangle: this,
        element: this.element
    });

    c.canvas.add(this.text);

    var rect2 = this.getRectangle(RectangleOffset.secondHorizontial);

	this.text = new fabric.IText("while end",{
        left: rect1.getLeft()+rect1.width/16,
        top: rect1.getTop()+rect1.height/4,
        fill: "white",
        fontSize: 22,
        //fontFamily: "Arial",
        selectable: false,
        id: this.id,
        textAlign:"center",
        hasControls: false,
        rectangle: this,
        element: this.element
    });

    c.canvas.add(this.text);

}
