function ConditionElement (id,pos){

    var c=Canvas.getInstance();
    this.id = id;
    this.pos = pos;

    this.conditionElementBox = new fabric.Rect({
        left: pos.left,
        top: pos.top,
        fill: 'blue',
        width: 20,
        height:  CanvasData.ConditionHeight,
        selectable: false,
        hasControls: false,
        hasRotatingPoint: false,
        stroke: 'grey',
        strokeWidth: 2,
        id: id,
        class: this
    });

    c.canvas.add(this.conditionElementBox);

    this.conditionElements = new Array();
    this.operators = new Array();

};

ConditionElement.prototype.getLeft = function (){
    return this.conditionElementBox.getLeft();
};

ConditionElement.prototype.setScaleX = function (scale){
    this.conditionElementBox.setScaleX(scale);

    for(var i=0; i<this.conditionElements.length; i++)
        this.conditionElements[i].setScaleX(scale);
    
    for(var i=0; i<this.operators.length; i++)
        this.operators[i].setScaleX(scale);  
};

ConditionElement.prototype.move = function (dx,dy){

    this.conditionElementBox.setLeft(this.conditionElementBox.getLeft() + dx);
    this.conditionElementBox.setTop(this.conditionElementBox.getTop() + dy);
    this.conditionElementBox.setCoords();
};

ConditionElement.prototype.remove = function (){

    for(var i=0; i<this.conditionElements.length; i++)
        this.conditionElements[i].remove();

    for(var i=0; i<this.operators.length; i++)
        this.operators[i].remove();

    var c=Canvas.getInstance();
    c.canvas.remove(this.conditionElementBox);
    this.conditionElementBox = null;
};

ConditionElement.prototype.setVisibillity = function (flag){
    for(var i=0; i<this.conditionElements.length; i++)
        this.conditionElements[i].setVisibillity(flag);
    
    for(var i=0; i<this.operators.length; i++)
        this.operators[i].setVisibillity(flag);

    this.conditionElementBox.visible = flag;
};

ConditionElement.prototype.bringToFront = function (){
    this.conditionElementBox.bringToFront();

    for(var i=0; i<this.conditionElements.length; i++)
        this.conditionElements[i].bringToFront();

    for(var i=0; i<this.operators.length; i++)
        this.operators[i].bringToFront();
};

ConditionElement.prototype.mouseOver = function (){
};

ConditionElement.prototype.mouseUp = function (){
};

ConditionElement.prototype.mouseDown = function (){
};

ConditionElement.prototype.mouseOut = function (){
};