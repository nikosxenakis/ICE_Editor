function InputBox (id,pos,size){

    var c=Canvas.getInstance();

    this.pos = pos;

    this.box = new fabric.Rect({
        left: pos.left,
        top: pos.top,
        fill: 'white',
        width: CanvasData.InputBoxWidth,
        height:  CanvasData.InputBoxHeight,
        selectable: false,
        hasControls: false,
        hasRotatingPoint: false,
        stroke: 'grey',
        strokeWidth: 3,
        id: id,
        class: this
    });

	this.text = new fabric.Text(id,{
        left: pos.left,// + this.box.width/2,
        top: pos.top,// + this.box.height/2,
        fill: 'grey',
        fontSize: size,
        selectable: true,
        id: id,
        textAlign:"center",
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        class: this
    });
       
    //this.text.scaleToHeight(CanvasData.InputBoxHeight / this.text.height);
    this.text.scaleToWidth(CanvasData.InputBoxWidth / this.text.width);
    //this.text.scaleToHeight(CanvasData.InputBoxHeight);
    //this.text.setCoords();

    //this.text.setLeft(this.text.getLeft() - this.text.width/2);
    //this.text.setTop(this.text.getTop() - this.text.height/2);

    this.text.on('changed', function(e) {
        //var box = this.class.box;
        //this.setLeft( box.getLeft() + box.getWidth()/2 - this.width/2);
        //this.setCoords();
    });
    
    c.canvas.add(this.box);
    c.canvas.add(this.text);
    
};

InputBox.prototype.getLeft = function (){
    return this.box.getLeft();
};

InputBox.prototype.getTop = function (){
    return this.box.getTop();
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

    this.text.fill = "grey";

    if(this.element)
        this.rectangle.mouseOver();
};

InputBox.prototype.mouseUp = function (){
};

InputBox.prototype.mouseDown = function (){
    //show and initialize dialog
    //this.box.setStrokeWidth(2);
    this.box.setShadow("2px 2px 7px rgba(234, 237, 78,1)");
    dialogMenu.openDialogMenu(this.text);
};

InputBox.prototype.mouseOut = function (){
    this.text.fill = "black";
};