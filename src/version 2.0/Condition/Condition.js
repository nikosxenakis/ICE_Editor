/*
    Condition CONTAINS a ConditionElement

    ConditionElement CONTAINS List Of  ConditionElement or ConditionStatement AND List Of Operators always operators are less by one 
    also it may HAS a pair of parenthesis around

    ConditionStatement CONTAINS what a Text


 */
var ConditionState = {
    open: 0,
    close: 1
};

function Condition (id,pos){

    var c=Canvas.getInstance();

    this.id = id;
    this.pos = pos;
    this.state = ConditionState.close;

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
        strokeWidth: 2,
        id: id,
        class: this
    });

    c.canvas.add(this.condition);

    var condId = id+"_cond1";
    var condOffset = 0;
    this.conditionElements = new Array();
    this.addConditionElement(condId,condOffset);

    /*
    var labelPos = {
        left: pos.left+this.condition.width/4,
        top: pos.top+this.condition.height/3.5
    };

    this.label = new Label("Condition",labelPos,CanvasData.ConditionLabelColor,CanvasData.ConditionLabelSize);
    */
    //if(this.state == ConditionState.close){}
};

Condition.prototype.getLeft = function (){
    return this.condition.getLeft();
};

Condition.prototype.getTop = function (){
    return this.condition.getTop();
};

Condition.prototype.offsetToPos = function (offset){

    var space = 10;

    var pos = {
        top: this.condition.getTop(),
        left: this.condition.getLeft()
    }
    if(offset == 0){
        pos.left = this.condition.getLeft() + space;
    }
    else if(offset >= this.conditionElements.length){
        pos.left = this.conditionElements[ this.conditionElements.length - 1 ].getLeft() + this.conditionElements[ this.conditionElements.length - 1 ].width + space;
    }
    else{
        //its in the middle
    }

    return pos;
};

Condition.prototype.addConditionElement = function (id,offset){
    
    //add to this offset to pos
    var pos = this.offsetToPos(offset);

    this.conditionElements.push(new ConditionElement(id,pos));

    //add a default missing operator
    
};

Condition.prototype.setState = function (state){
    if(this.state == state)
        return;

    this.state = state;

    if(state == ConditionState.open){
        this.condition.setScaleX(3);

        for(var i=0; i<this.conditionElements.length; i++)
            this.conditionElements[i].setScaleX(3);
        //this.condition.setScaleY(6);

        //this.label.label.scale(6);

        /*
        this.condition.setWidth(4*this.condition.getWidth());
        this.condition.setHeight(2*this.condition.getHeight());
        this.condition.setCoords();

        var newCenter = {
            left: this.condition.getLeft() + this.condition.getWidth()/2,
            top: this.condition.getTop() + this.condition.getHeight()/2
        };

        var diffCenter = {
            left: this.center.left - newCenter.left,
            top: this.center.top - newCenter.top
        };

        this.condition.setTop(this.condition.getTop()+diffCenter.top);
        this.condition.setLeft(this.condition.getLeft()+diffCenter.left);

        this.label.setFontSize(CanvasData.BigElementLabelSize);
        */
    }
    else if(state == ConditionState.close){
        this.condition.setScaleX(1);

        for(var i=0; i<this.conditionElements.length; i++)
            this.conditionElements[i].setScaleX(1);
        //this.condition.setScaleY(1);

        //this.label.label.scale(1);

        /*
        this.condition.setWidth(this.condition.getWidth()/4);
        this.condition.setHeight(this.condition.getHeight()/2);
        this.condition.setCoords();

        this.condition.setTop(this.center.top - this.condition.getHeight()/2);
        this.condition.setLeft(this.center.left - this.condition.getWidth()/2);

        this.label.setFontSize(CanvasData.ElementLabelSize);
        */
    }

    this.bringToFront();
};

Condition.prototype.move = function (dx,dy){
    return;
    this.pos.left = this.condition.getLeft();
    this.pos.top = this.condition.getTop();

	this.condition.setLeft(this.pos.left);
    this.condition.setTop(this.pos.top);
    this.condition.setCoords();

    for(var i=0; i<this.conditionElements.length; i++)
        this.conditionElements[i].move(dx,dy);
    //this.label.move(dx,dy);
};

Condition.prototype.remove = function (){
    console.log("remove condition");

    //this.label.remove();
    for(var i=0; i<this.conditionElements.length; i++)
        this.conditionElements[i].remove();

	var c=Canvas.getInstance();
	c.canvas.remove(this.condition);
	this.condition = null;
};

Condition.prototype.setVisibillity = function (flag){

    //this.label.setVisibillity(flag);
    for(var i=0; i<this.conditionElements.length; i++)
        this.conditionElements[i].setVisibillity(flag);

	this.condition.visible = flag;
};

Condition.prototype.bringToFront = function (){

    this.condition.bringToFront();

    for(var i=0; i<this.conditionElements.length; i++)
        this.conditionElements[i].bringToFront();
    //this.label.bringToFront();
};

Condition.prototype.mouseOver = function (){

};

Condition.prototype.mouseUp = function (){
};

Condition.prototype.mouseDown = function (){
    console.log("mouseDown Condition");

    this.addConditionElement("condId",1);

    this.setState(ConditionState.open);
};

Condition.prototype.mouseOut = function (){
    this.setState(ConditionState.close);
};