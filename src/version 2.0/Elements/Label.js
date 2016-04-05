function Label (id,pos,color,size){

    var c=Canvas.getInstance();

	this.label = new fabric.IText(id,{
        left: pos.left,
        top: pos.top,
        fill: color,
        fontSize: size,
        selectable: false,
        id: id,
        textAlign:"center",
        hasControls: false,
        class: this
    });

    c.canvas.add(this.label);

};

Label.prototype.move = function (dx,dy){
	this.label.setLeft(this.label.getLeft() + dx);
    this.label.setTop(this.label.getTop() + dy);
    this.label.setCoords();
};

Label.prototype.remove = function (){
	var c=Canvas.getInstance();
	c.canvas.remove(this.label);
	this.label = null;
};

Label.prototype.setVisibillity = function (flag){
	this.label.visible = flag;
};

Label.prototype.bringToFront = function (){
    this.label.bringToFront();
};

Label.prototype.mouseOver = function (){
    if(this.element)
        this.rectangle.mouseOver();
};

Label.prototype.mouseUp = function (){
};

Label.prototype.mouseDown = function (){
};

Label.prototype.mouseOut = function (){
};