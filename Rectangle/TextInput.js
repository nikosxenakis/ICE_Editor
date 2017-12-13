function TextInput (id,relPos,color,size){

    var c=Canvas.getInstance();

    this.relPos = relPos;

	this.text = new fabric.IText(id,{
        left: relPos.left,
        top: relPos.top,
        fill: color,
        fontSize: size,
        id: id,
        strokeWidth:3,
        fontFamily: "Helvetica",
        transparentCorners: true,
        textAlign:"center",
        cornersize:0,
        hasBorders: false,
        hasControls: false,
        hasRotatingPoint: false,
        class: this
    });

    this.prevText = id;

    c.canvas.add(this.text);

};

var changeSideBarElementName = function(prevText,text) {
    console.log(prevText,text);
    
    $( "#programList a" ).each(function(){
        console.log($(this).text());
        if($(this).text() === prevText){
            
            var replaced = $(this).text().replace(prevText, text);
            $(this).text(replaced);

            var programHtmlHeaderSpan = createHtmlElement({
                format: "span",
                className: "glyphicon glyphicon-minus sideBarButtonRemove",
                father: this
            });
            
            $(programHtmlHeaderSpan).mouseover(function(){
                $(this).css('color','red');
            });

            $(programHtmlHeaderSpan).mouseout(function(){
                $(this).css('color','mediumvioletred');
            });     
            
            $(programHtmlHeaderSpan).mousedown(function(){

                var id = $(this).parent().text();
                var element = Canvas.removeElement(id);

                $(this).parent().parent().remove();
                return false;

            });
        }
        console.log($(this).text());
    });

};

TextInput.prototype.updateSideBar = function(){

    changeSideBarElementName(this.prevText,this.text.getText());

    if(this.element && this.element instanceof ProgramElement){
        this.element.id = this.text.getText();
    }

    this.prevText = this.text.getText();
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