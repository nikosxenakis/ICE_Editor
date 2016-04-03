function Label (id,pos){

    var c=Canvas.getInstance();

	this.label = new fabric.IText(id,{
        left: pos.left,
        top: pos.top,
        fill: "white",
        fontSize: 22,
        selectable: false,
        id: id,
        textAlign:"center",
        hasControls: false
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
