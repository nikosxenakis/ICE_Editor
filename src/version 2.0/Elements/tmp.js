function times() {
    times.count = ++times.count || 1; // f.count is undefined at first 
    return times.count;
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

/*never used
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

Element.prototype.getNextRect = function() {
    for (k=0; k < this.element.rectangles.length ; k++){
        if(this.element.rectangles[k]==this){
            return this.element.rectangles[k+1];
        }
    }
}

function compareElements(a,b) {
    aTop = a.getElementSize().top;
    bTop = b.getElementSize().top;

  if (aTop <= bTop)
    return 1;
  else 
    return -1;
}
*/


