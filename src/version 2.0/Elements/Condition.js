function Condition (id,pos){

    var c=Canvas.getInstance();

    this.condition = null;

    this.condition = new fabric.Rect({
        left: pos.left,
        top: pos.top,
        fill: 'white',
        width: CanvasData.ConditionWidth,
        height:  CanvasData.ConditionHeight,
        selectable: false,
        hasControls: false,
        hasRotatingPoint: false,
        stroke: 'grey',
        strokeWidth: 3,
        id: id,
        class: this
    });

    c.canvas.add(this.condition);


    var labelPos = {
        left: pos.left+this.condition.width/4,
        top: pos.top+this.condition.height/3.5
    };

    this.label = new Label("Condition",labelPos,CanvasData.ConditionLabelColor,CanvasData.ConditionLabelSize);

};

Condition.prototype.move = function (dx,dy){
	this.condition.setLeft(this.condition.getLeft() + dx);
    this.condition.setTop(this.condition.getTop() + dy);
    this.condition.setCoords();

    this.label.move(dx,dy);
};

Condition.prototype.remove = function (){
    console.log("remove condition");

    this.label.remove();

	var c=Canvas.getInstance();
	c.canvas.remove(this.condition);
	this.condition = null;
};

Condition.prototype.setVisibillity = function (flag){

    this.label.setVisibillity(flag);

	this.condition.visible = flag;
};

Condition.prototype.bringToFront = function (){
    this.condition.bringToFront();
};

Condition.prototype.mouseOver = function (){
    this.condition.setWidth(2*this.condition.getWidth());
    this.condition.setHeight(2*this.condition.getHeight());
};

Condition.prototype.mouseUp = function (){
};

Condition.prototype.mouseDown = function (){
    console.log("mouseDown Condition");
};

Condition.prototype.mouseOut = function (){
    this.condition.setWidth(this.condition.getWidth()/2);
    this.condition.setHeight(this.condition.getHeight()/2);
};