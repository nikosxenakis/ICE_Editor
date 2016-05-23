function InputBox (id,pos,type){

    var c=Canvas.getInstance();

    this.pos = pos;
    this.type = type;

    this.box = new fabric.Rect({
        left: pos.left,
        top: pos.top,
        fill: 'white',
        width: pos.width,
        height: pos.height,
        selectable: false,
        hasControls: false,
        hasRotatingPoint: false,
        stroke: 'grey',
        strokeWidth: 2,
        id: id,
        class: this
    });

    this.text = new fabric.Text(id,{
        left: pos.left + 4,// + this.box.width/2,
        top: pos.top + 4,// + this.box.height/2,
        fill: CanvasData.InputBoxTextColor,
        fontSize: CanvasData.InputBoxTextSize,
        selectable: false,
        id: id,
        textAlign:"center",
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        class: this
    });

    this.input = new InputElement(id , type);

    this.fixText();

    c.canvas.add(this.box);
    c.canvas.add(this.text);


};

InputBox.prototype.fixText = function (){

    var scale = this.text.getScaleX();
    var scaleDiff = 0.1;

    while( scale*this.text.width + 20 > this.box.width ){
        scale = scale - scaleDiff;
        this.text.setScaleX(scale);
    }

    
    scale = this.text.getScaleX();
    while( scale*this.text.width + 20 < this.box.width ){
        scale = scale + scaleDiff;
        this.text.setScaleX(scale);
        if(scale > 1)   break;
    }
    
    scale = this.text.getScaleX();
    this.text.setLeft(this.box.getLeft() + this.box.width/2 - scale*this.text.width/2);
    this.text.setTop(this.box.getTop() + this.box.height/2 - this.text.height/2);
    this.text.setCoords();

    Canvas.getInstance().canvas.renderAll();

};

InputBox.prototype.getLeft = function (){
    return this.box.getLeft();
};

InputBox.prototype.getTop = function (){
    return this.box.getTop();
};

InputBox.prototype.getWidth = function (){
    return this.box.width;
};

InputBox.prototype.getHeight = function (){
    return this.box.height;
};

InputBox.prototype.move = function (dx,dy){

    this.pos.left = this.box.getLeft() + dx;
    this.pos.top = this.box.getTop() + dy;
    
    this.box.setLeft(this.pos.left);
    this.box.setTop(this.pos.top);
    this.box.setCoords();
    
    this.text.setLeft(this.text.getLeft() + dx);
    this.text.setTop(this.text.getTop() + dy);
    this.text.setCoords();
};

InputBox.prototype.remove = function (){
    var c=Canvas.getInstance();
    c.canvas.remove(this.text);
    c.canvas.remove(this.box);
    this.text = null;
    this.box = null;
};

InputBox.prototype.setVisibillity = function (flag){
    this.text.visible = flag;
    this.box.visible = flag;
};

InputBox.prototype.bringToFront = function (){
    this.box.bringToFront();
    this.text.bringToFront();
};

InputBox.prototype.mouseOver = function (){

    if(this.element)
        this.rectangle.mouseOver();
};

InputBox.prototype.mouseUp = function (){
};

InputBox.prototype.activate = function (){
    this.box.set('stroke','#494A4A');
    this.box.setShadow("5px 5px 7px #494A4A");
    Canvas.getInstance().canvas.renderAll();
};

InputBox.prototype.deactivate = function (){
    this.box.set('stroke','grey');
    this.box.setShadow("0px");
    Canvas.getInstance().canvas.renderAll();
};

InputBox.prototype.update = function (){
    //this.deactivate();

    //this.box.width
    var maxChar = this.box.width/10;
    if(this.input.getText().length > maxChar){
        this.text.setText(this.input.getText().substr(0,maxChar-1)+"...");
    }
    else{
        this.text.setText(this.input.getText());
    }
    this.fixText();
};

InputBox.prototype.mouseDown = function (){

    this.activate();
    dialogMenu.open(this);

};

InputBox.prototype.mouseOut = function (){

    if(this.element)
        this.rectangle.mouseOut();
};

InputBox.prototype.sendToBack = function (){
    this.text.sendToBack();
    this.box.sendToBack();
};
