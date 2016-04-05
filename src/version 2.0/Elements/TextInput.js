function TextInput (id,pos,color,size){

    var c=Canvas.getInstance();

	this.text = new fabric.IText(id,{
        left: pos.left,
        top: pos.top,
        fill: color,
        fontSize: size,
        selectable: false,
        id: id,
        textAlign:"center",
        hasControls: true,
        class: this
    });

    c.canvas.add(this.text);

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
    if(this.element)
        this.rectangle.mouseOver();
};

TextInput.prototype.mouseUp = function (){
};

TextInput.prototype.mouseDown = function (){
};

TextInput.prototype.mouseOut = function (){
};