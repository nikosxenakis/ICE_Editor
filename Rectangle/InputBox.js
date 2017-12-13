function InputBox (pos,inputElement){

    var c=Canvas.getInstance();

    this.pos = pos;

    if(inputElement)
        this.input = inputElement;
    else
        this.input = new InputElement("",InputType.localId);

    this.prevInput = new Array();
    this.prevInputPos = -1;
               
    this.box = new fabric.Rect({
        left: pos.left,
        top: pos.top,
        fill: 'white',
        width: pos.width,
        height: pos.height,
        selectable: false,
        hasBorders: false,
        hasControls: false,
        hasRotatingPoint: false,
        stroke: 'grey',
        strokeWidth: 2,
        id: this.input.getText(),
        class: this
    });

    this.text = new fabric.Text(this.input.getText(),{
        left: pos.left + 4,// + this.box.width/2,
        top: pos.top + 4,// + this.box.height/2,
        fill: CanvasData.InputBoxTextColor,
        fontSize: CanvasData.InputBoxTextSize,
        selectable: false,
        hasBorders: false,
        hasControls: false,
        hasRotatingPoint: false,
        id: this.input.getText(),
        textAlign:"center",
        class: this
    });

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
        if(scale > 1)   break;
        scale = scale + scaleDiff;
        this.text.setScaleX(scale);
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
    if(this.box){
        this.box.set('stroke','#494A4A');
        this.box.setShadow("5px 5px 7px #494A4A");    
    }

    Canvas.getInstance().canvas.renderAll();
};

InputBox.prototype.deactivate = function (){
    if(this.box){
        this.box.set('stroke','grey');
        this.box.setShadow("0px");
    }

    Canvas.getInstance().canvas.renderAll();
};

InputBox.prototype.update = function (){

    //this.box.width
    if(!this.box)
        return;
    
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

    DialogMenuController.open(this);

};

InputBox.prototype.mouseOut = function (){

    if(this.element)
        this.rectangle.mouseOut();
};

InputBox.prototype.sendToBack = function (){
    this.text.sendToBack();
    this.box.sendToBack();
};

InputBox.prototype.addPrevInput = function (input){
    this.prevInput.push(input);
    this.prevInputPos++;
   
    var inputBox = this;
    
    undoManager.add({
        undo: function () {
            console.log('undo');
            inputBox.undoPrevInput();
        },
        redo: function () {
            console.log('redo');
            inputBox.redoPrevInput();
        }
    });
};

InputBox.prototype.undoPrevInput = function (){
    
    if(this.prevInputPos == -1)
        return;
        
    this.prevInput.push(this.input);
        
    this.input = this.prevInput[this.prevInputPos];
  
    this.update();
};

InputBox.prototype.redoPrevInput = function (){
    
    if(this.prevInputPos >= this.prevInput.length - 1)
        return;
          
    this.input = this.prevInput[this.prevInputPos + 1];
    this.prevInputPos++;
  
     this.update();
};