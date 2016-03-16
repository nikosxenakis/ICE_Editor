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
    program: 3,
    doNothing: 4
};
    
function Element (id , format , type , coords , father , opac) {
    this.id = id;
    this.format = format;
    this.type = type;
    this.pos = this.setPositions(coords);
    this.father = father;

    this.rectangles = this.createRectangles(opac);
    this.getElementSize();

    this.elements = new Array();
    //this.elements2 = new Array();

    this.nextElementOffset = 0;

    return this;
}
 
Element.prototype.createRectangles = function(opac) {
    var rectangles = new Array();

    if(this.format == ElementFormat.I){
        if(this.type == ElementType.doNothing){
            rectangles.push(new Rectangle(this.id,this.pos.posStart,RectangleType.horizontial,this,"green",opac));
        }
        else{
            console.log("There is no element with type = ",this.type); 
        }   
    }
    else if(this.format == ElementFormat.C){
        if(this.type == ElementType.program){
            rectangles.push(new Rectangle(this.id+"_RectangleStart",this.pos.posStart,RectangleType.horizontial,this,"blue",opac));
            rectangles.push(new Rectangle(this.id+"_RectangleBody",this.pos.posBody,RectangleType.vertical,this,"blue",opac));
            rectangles.push(new Rectangle(this.id+"_RectangleEnd",this.pos.posEnd,RectangleType.horizontial,this,"blue",opac));
        }
        else if(this.type == ElementType.while){
            rectangles.push(new Rectangle(this.id+"_RectangleStart",this.pos.posStart,RectangleType.horizontial,this,"red",opac));
            rectangles.push(new Rectangle(this.id+"_RectangleBody",this.pos.posBody,RectangleType.vertical,this,"red",opac));
            rectangles.push(new Rectangle(this.id+"_RectangleEnd",this.pos.posEnd,RectangleType.horizontial,this,"red",opac));
        }
        else{
            console.log("There is no element with type = ",this.type); 
        }        
    }
    else if(this.format == ElementFormat.E){
        console.log("Under Construction");
    }
    else{
        console.log("There is no element with format = ",this.format);
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
/*
Element.prototype.updatePositions = function() {
    for(k=0; k<this.rectangles.length; k++){
        //update position of each rectangle
    }
}
*/
function compare(a,b) {
  if (a.rectangleInCanvas.getTop() <= b.rectangleInCanvas.getTop())
    return 1;
  else 
    return -1;
}

Element.prototype.getRectangle = function(type , offset) {
    var r;
    var i=0;

    this.rectangles.sort(compare);

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

Element.prototype.getNextRect = function() {
    for (k=0; k < this.element.rectangles.length ; k++){
        if(this.element.rectangles[k]==this){
            return this.element.rectangles[k+1];
        }
    }
}

function imageIdToElement(imageId){
    elemInfo = {};
    if(imageId == "whileImage"){
        elemInfo.id = "while";
        elemInfo.format = ElementFormat.C;
        elemInfo.type = ElementType.while;
    }
    else if(imageId == "forImage"){
        elemInfo.id = "for";
        elemInfo.format = ElementFormat.C;
        elemInfo.type = ElementType.for;
    }
    else if(imageId == "doNothingImage"){
        elemInfo.id = "doNothing";
        elemInfo.format = ElementFormat.I;
        elemInfo.type = ElementType.doNothing;
    }
    else{
        console.log("No image with id = ",imageId);
    }
    return elemInfo;
}

function changeElementInsideSpace(elem,offsetHeight,offsetTop){
    for (k=0; k < elem.rectangles.length ; k++){   
        if(elem.rectangles[k].rectangleInCanvas.getTop() >= offsetTop)
  
        if(elem.rectangles[k].type == RectangleType.vertical){
            elem.rectangles[k].rectangleInCanvas.setHeight(elem.rectangles[k].rectangleInCanvas.getHeight()+offsetHeight);
        }
        else{
            elem.rectangles[k].rectangleInCanvas.setTop(elem.rectangles[k].rectangleInCanvas.getTop()+offsetHeight);
            if(elem.rectangles[k].text)
                elem.rectangles[k].text.setTop(elem.rectangles[k].text.getTop()+offsetHeight);
        } 
    }

    if(elem.father){
        //to avoid moving horizontial objects
        changeElementInsideSpace(elem.father,offsetHeight,elem.father.getElementSize().top+1);
    }
}
/*
function changeElementTop(elem,offsetTop){
    for (l=0; l < elem.rectangles.length ; l++){
        elem.rectangles[l].rectangleInCanvas.setTop(elem.rectangles[l].rectangleInCanvas.getTop()+offsetTop);

        if(elem.rectangles[l].text)
            elem.rectangles[l].text.setTop(elem.rectangles[l].text.getTop()+offsetTop);
    }
       
    for (l=0; l < elem.elements.length ; l++){
        changeElementTop(elem.elements[l],offsetTop);
    } 
}
*/
Element.prototype.changeElementTop = function(offsetTop){
    for (l=0; l < this.rectangles.length ; l++){
        this.rectangles[l].rectangleInCanvas.setTop(this.rectangles[l].rectangleInCanvas.getTop()+offsetTop);

        if(this.rectangles[l].text)
            this.rectangles[l].text.setTop(this.rectangles[l].text.getTop()+offsetTop);
    }
       
    for (l=0; l < this.elements.length ; l++){
        this.elements[l].changeElementTop(offsetTop);
    } 
}

Element.prototype.changeElementsTop = function(exceptElem,height){
    for (k=0; k < this.elements.length ; k++){
        //console.log("k = ", k);
        if(this.elements[k] == exceptElem){
            console.log(" the new elem is = ",exceptElem);
        }
        else{
            console.log("sub_elem for increase = ",this.elements[k].id," by height = ",height );
            //changeElementTop(this.elements[k],height);
            this.elements[k].changeElementTop(height);
        } 
    } 

    if(this.father){
        this.father.changeElementsTop(this,height);
    }
}

Element.prototype.transformElement = function(elem) {

    if(!elem){
        console.log("No element to transform");
    }

    size = elem.getElementSize();

    c=Canvas.getInstance();
   
    changeElementInsideSpace(this,size.height,size.top);

    Canvas.setCanvasElementsCoords();
    c.canvas.renderAll(); 

    //changeElementsTop(this,elem,size.height);
    this.changeElementsTop(elem,size.height);
  
    Canvas.setCanvasElementsCoords();
    c.canvas.renderAll();    

}

Element.prototype.reverseTransformElement = function(elem) {
    //no reverseTransformElement do as above

    var size = elem.getElementSize();
    
    c=Canvas.getInstance();
    //console.log(size);
    for (k=0; k < this.rectangles.length ; k++){

        if(this.rectangles[k].rectangleInCanvas.getTop() >= size.top){

            if(this.rectangles[k].type == RectangleType.vertical){
                this.rectangles[k].rectangleInCanvas.setHeight(this.rectangles[k].rectangleInCanvas.getHeight()-size.height);
            }
            else{
                this.rectangles[k].rectangleInCanvas.setTop(this.rectangles[k].rectangleInCanvas.getTop()-size.height);
                if(this.rectangles[k].text)
                    this.rectangles[k].text.setTop(this.rectangles[k].text.getTop()-size.height);
            }                       
        }
    }

    c.canvas.renderAll();
}

Element.prototype.getElementSize = function() {
    var value = {
        top:10000,
        left:10000,
        height:0,
        width:0
    };       

    for (k=0; k < this.rectangles.length ; k++){

            if( this.rectangles[k].rectangleInCanvas.getTop() < value.top ){
                value.top = this.rectangles[k].rectangleInCanvas.getTop();
            }
        

       
            if( this.rectangles[k].rectangleInCanvas.getLeft() < value.left ){
                value.left = this.rectangles[k].rectangleInCanvas.getLeft();
            }
        

            if( this.rectangles[k].rectangleInCanvas.getWidth() > value.width ){
                value.width = this.rectangles[k].rectangleInCanvas.getWidth();
            }
        
            value.height += this.rectangles[k].rectangleInCanvas.getHeight();

    }
    //update
    this.size = value;
    return value;
}

Element.prototype.addElement = function(imageId,pos,opac) {

    elemInfo = imageIdToElement(imageId);
    /*
    pos = {
        left : this.getRectangle(RectangleType.vertical,0).getLeft()+this.getRectangle(RectangleType.vertical,0).width,
        top : this.getRectangle(RectangleType.vertical,0).getTop()
    };
    */

    elem = new Element(this.id+"_"+elemInfo.id+"_"+this.nextElementOffset , elemInfo.format , elemInfo.type , pos , this , opac);
    this.nextElementOffset++;
    
    
    //if(times() >= 1){
        console.log("\n------------------------\nStart Transformation");
        this.transformElement(elem);
        console.log("End Transformation\n------------------------");

    //}

    this.elements.push(elem);

    if(elem.type != ElementType.doNothing){
                                
        posDoNothing = {
            left : elem.getRectangle(RectangleType.vertical,0).getLeft()+elem.getRectangle(RectangleType.vertical,0).width,
            top : elem.getRectangle(RectangleType.vertical,0).getTop()
        };

        e = elem.addElement("doNothingImage",posDoNothing,1);
    }

    Canvas.setCanvasElementsCoords();
    Canvas.getInstance().canvas.renderAll();  

    return elem;
}

function times() {
    times.count = ++times.count || 1; // f.count is undefined at first 
    return times.count;
}


Element.prototype.removeElement = function() {
    //this.id
    //exists in this.father.elements or this.father.elements2
    //and in horizontial or vertical elements

    if(!this.father){
        console.log("There is no father for ",this.id);
        return false;
    }

    //revert transformation
    this.father.reverseTransformElement(this);
    
    //remove each subelement
    for (k=0; k < this.elements.length ; k++){
        this.elements[k].removeElement();
    }
    /*
    for (k=0; k < this.elements2.length ; k++){
        this.elements[k].removeElement();
    }
    */
    //search in this.father.elements
    for (k=0; k < this.father.elements.length ; k++){
        
        if( this.father.elements[k] == this ){
            this.father.elements.splice(k, 1);
            break;
        }
        
    }
    
    //search in this.father.elements2
    /*
    for (k=0; k < this.father.elements2.length ; k++){
        
        if( this.father.elements2[k] == this ){
            this.father.elements.splice(k, 1);
            break;
        }
        
    }
    */
    c=Canvas.getInstance();

    //search in horizontial and vertical elements
    for (k=0; k < this.rectangles.length ; k++){
        c.canvas.remove(this.rectangles[k].text);

        for (l=0; l < c.horizontalElements.length ; l++){
            if( this.rectangles[k].rectangleInCanvas == c.horizontalElements[l] ){
                c.canvas.remove( c.horizontalElements[l] );

                c.horizontalElements.splice(l, 1);
                //c.horizontalElements[l] = null;   
            }
        } 
        for (m=0; m < c.verticalElements.length ; m++){
            if( this.rectangles[k].rectangleInCanvas == c.verticalElements[m] ){
                c.canvas.remove( c.verticalElements[m] );

                c.horizontalElements.splice(l, 1);
                //c.verticalElements[l] = null;   
            }
        }     
    }    

    c.canvas.renderAll();

    return true;
}

Element.prototype.setOpacity = function(opac) {

    for (k=0; k < this.rectangles.length ; k++){
        if(this.rectangles[k])
            if(this.rectangles[k].rectangleInCanvas)
            this.rectangles[k].rectangleInCanvas.setOpacity(opac);
    }

    for (k=0; k < this.elements.length ; k++){
        if(this.elements[k])
            this.elements[k].setOpacity(opac);
    }

    /* problem with mouse over

    for (k=0; k < this.elements2.length ; k++){
        if(this.elements2[k])
            this.elements2[k].setOpacity(opac);
    }
    */
}
/*
function moveElement(elem, movedRectangle, dx, dy) {
    
    for (k=0; k < elem.rectangles.length ; k++){
        if(elem.rectangles[k]){
            elem.rectangles[k].rectangleInCanvas.setTop(elem.rectangles[k].rectangleInCanvas.getTop()+dy);
            elem.rectangles[k].rectangleInCanvas.setLeft(elem.rectangles[k].rectangleInCanvas.getLeft()+dx);
        }
    } 
    
    for (k=0; k < elem.elements.length ; k++){
        if(elem.elements[k]){
            moveElement(elem.elements[k],null,dx,dy);
        }
    }
  
}
*/
Element.prototype.moveElement = function(movedRectangle, dx, dy) {
    
    for (k=0; k < this.rectangles.length ; k++){
        if(this.rectangles[k]){
            this.rectangles[k].rectangleInCanvas.setTop(this.rectangles[k].rectangleInCanvas.getTop()+dy);
            this.rectangles[k].rectangleInCanvas.setLeft(this.rectangles[k].rectangleInCanvas.getLeft()+dx);
        }
    } 
    
    for (k=0; k < this.elements.length ; k++){
        if(this.elements[k]){
            this.elements[k].moveElement(null,dx,dy);
        }
    }
  
}


