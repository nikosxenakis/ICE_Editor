function TextInput (id,relPos,color,size){

    var c=Canvas.getInstance();

    this.relPos = relPos;

	this.text = new fabric.IText(id,{
        left: relPos.left,
        top: relPos.top,
        fill: color,
        fontSize: size,
        selectable: true,
        id: id,
        strokeWidth:3,
        transparentCorners: true,
        textAlign:"center",
        hasControls: false,
        cornersize:0,
        lockMovementX: true,
        lockMovementY: true,
        class: this
    });

    c.canvas.add(this.text);

};

TextInput.prototype.getLeft = function (){
    return this.text.getLeft();
};

TextInput.prototype.getTop = function (){
    return this.text.getTop();
};

TextInput.prototype.getWidth = function (){
    return this.text.width;
};

TextInput.prototype.getHeight = function (){
    return this.text.height;
};

TextInput.prototype.move = function (dx,dy){
    
	this.text.setLeft(this.text.getLeft() + dx);
    this.text.setTop(this.text.getTop() + dy);
    this.text.setCoords();
};

TextInput.prototype.remove = function (){
	var c=Canvas.getInstance();
	c.canvas.remove(this.text);
	this.text = null;
};

TextInput.prototype.setVisibillity = function (flag){
	this.text.visible = flag;
};

TextInput.prototype.bringToFront = function (){
    this.text.bringToFront();
};

TextInput.prototype.mouseOver = function (){

    this.text.fill = "green";

    if(this.element)
        this.rectangle.mouseOver();
};

TextInput.prototype.mouseUp = function (){
};

TextInput.prototype.mouseDown = function (){
};

TextInput.prototype.mouseOut = function (){
    this.text.fill = "white";
    if(this.element)
        this.rectangle.mouseOut();
};