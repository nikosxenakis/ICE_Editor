/*
define Element{
		id,
		format( I C E ),
		type(if,while,do,for),
		a group element{
			5 Rectangle
		},
		father Element,
		2 lists of Elements
	}
 */
var ElementFormat = {
    I: 0,
    C: 1,
    E: 2
};

var ElementType = {
    if: 0,
    while: 1,
    for: 2,
    program:3
};
    
function Element (id , format , type , coords , father) {
    this.id = id;
    this.format = format;
    this.type = type;
    this.pos = this.setPositions(coords);
    this.father = father;

    this.rectangles = this.createRectangles(id,format,type,this.pos);
    this.elements = new Array();
    this.elements2 = new Array();

    console.log(this.getRectanglesInCanvas());

    return this;
}
 
Element.prototype.createRectangles = function() {
    var rectangles = new Array();

    if(this.format == ElementFormat.I){

    }
    else if(this.format == ElementFormat.C){
        if(this.type == ElementType.program){
            rectangles.push(new Rectangle(this.id+"RectangleStart",this.pos.posStart,RectangleType.horizontial,this,"blue"));
            rectangles.push(new Rectangle(this.id+"RectangleBody",this.pos.posBody,RectangleType.vertical,this,"blue"));
            rectangles.push(new Rectangle(this.id+"RectangleEnd",this.pos.posEnd,RectangleType.horizontial,this,"blue"));
        }
        else if(this.type == ElementType.while){
            rectangles.push(new Rectangle(this.id+"RectangleStart",this.pos.posStart,RectangleType.horizontial,this,"red"));
            rectangles.push(new Rectangle(this.id+"RectangleBody",this.pos.posBody,RectangleType.vertical,this,"red"));
            rectangles.push(new Rectangle(this.id+"RectangleEnd",this.pos.posEnd,RectangleType.horizontial,this,"red"));
        }        
    }
    else if(format == ElementFormat.E){
        
    }

    return rectangles;
};

Element.prototype.getRectanglesInCanvas = function() {

    rects = new Array();

    _.each(
        this.rectangles, 
        function(elem) {    
            rects.push(elem.rectangleInCanvas);
        }
    )

    return rects;
}

Element.prototype.setPositions = function(coords) {
    r = {
        posStart : {
            left : coords.left,
            top : coords.top,
            width : CanvasData[0].horizontalElementsWidth,
            height : CanvasData[0].horizontalElementsHeight
        },
        posBody : {
            left : coords.left, 
            top : coords.top+CanvasData[0].horizontalElementsHeight,
            width : CanvasData[0].verticalElementsWidth,
            height : CanvasData[0].verticalElementsHeight
        },
        posEnd : {
            left : coords.left, 
            top : coords.top+CanvasData[0].horizontalElementsHeight+CanvasData[0].verticalElementsHeight,
            width : CanvasData[0].horizontalElementsWidth,
            height : CanvasData[0].horizontalElementsHeight
        },
        posBody2 : {
            left : coords.left, 
            top : coords.top+CanvasData[0].horizontalElementsHeight+CanvasData[0].verticalElementsHeigth+CanvasData[0].horizontalElementsHeight,
            width : CanvasData[0].verticalElementsWidth,
            height : CanvasData[0].verticalElementsHeight
        },
        posEnd2 : {
            left : coords.left, 
            top : coords.top+CanvasData[0].horizontalElementsHeight+CanvasData[0].verticalElementsHeight+CanvasData[0].horizontalElementsHeight+CanvasData[0].horizontalElementsHeight,
            width : CanvasData[0].horizontalElementsWidth,
            height : CanvasData[0].horizontalElementsHeight
        }
    };

    return r;
}

Element.prototype.getRectangle = function(type , offset) {
    var r;
    var i=0;

    for (k=0; k < this.rectangles.length ; k++){

        r = this.rectangles[k];

        if(r.type == type){
                if(r.rectangleInCanvas){
                    if(i == offset)
                        return r.rectangleInCanvas;
                    i++;
                }
        }
    }
}

function imageIdToElement(imageId){
    elemInfo = {};
    if(imageId == "whileImage"){
        elemInfo.format = ElementFormat.C;
        elemInfo.type = ElementType.while;
    }
    else if(imageId == "forImage"){
        elemInfo.format = ElementFormat.C;
        elemInfo.type = ElementType.for;
    }
    return elemInfo;
}

Element.prototype.transformElement = function(rectAbove,elem) {
    var r;
    var i=0;
    //var offsetTop = elem.rectangleInCanvas.getTop();
    var flag = false;

    for (k=0; k < this.rectangles.length ; k++){
            r.rectangleInCanvas.top+=30;
/*
        r = this.rectangles[k];

        if(r == rectAbove){
            flag = true;
            continue;
        }

        if(flag){
            r.rectangleInCanvas.top+=30;
        }
     */ 
    }
}

Element.prototype.addElement = function(imageId,rectAbove) {
    console.log("ADD ELEMENT");

    elemInfo = imageIdToElement(imageId);
    //var programElement = new Element("programElement" , elemInfo.format , ElementType.program , {left:400,top:200} , null);
    pos = {
        left : this.getRectangle(RectangleType.vertical,0).getLeft()+this.getRectangle(RectangleType.vertical,0).width,
        top : this.getRectangle(RectangleType.vertical,0).getTop()
    };
    elem = new Element("new" , elemInfo.format , elemInfo.type , pos , this);
    //make transformations , def function for element size
    //this.transformElement(rectAbove,elem);
}

