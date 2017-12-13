function DeleteImage (element) {
    this.element = element;
    this.deleteImageInCanvas = null;

    this.deleteImageInCanvas = this.initDeleteImage();

}

DeleteImage.prototype.bringToFront = function (){
    this.deleteImageInCanvas.bringToFront();
};

DeleteImage.prototype.sendToBack = function (){
    this.deleteImageInCanvas.sendToBack();
};

DeleteImage.prototype.mouseOver = function (){
    this.element.getRectangle(RectangleOffset.firstHorizontial).rectangle.mouseOver();
};

DeleteImage.prototype.mouseUp = function (){
    this.element.getRectangle(RectangleOffset.firstHorizontial).rectangle.mouseUp();
};

DeleteImage.prototype.mouseDown = function (){

    var elem = this.element;

    c.removedElements.push(elem);
    c.removedElementsPos++;
        
    undoManager.add({
        undo: function() {
            if(c.removedElementsPos < 0)
                return;

            var elem = c.removedElements[c.removedElementsPos];
            if(elem){
                var father = elem.father;
                var offset = elem.elementOffset;
                father.addExistingElement(elem,offset);
                c.removedElementsPos--;
            }
        },
        redo: function() {
            var elem = c.removedElements[c.removedElementsPos + 1];
            if(elem){
                c.removedElementsPos++;
                elem.removeElement();
            }
        }
    });

    elem.removeElement();
};

DeleteImage.prototype.mouseOut = function (){
    this.element.getRectangle(RectangleOffset.firstHorizontial).rectangle.mouseOut();
};

DeleteImage.prototype.initDeleteImage = function(){

    var c=Canvas.getInstance();
    var id = DeleteImageData.id+"_"+this.element.id;
    var pos = this.element.getElementSize();

    var imgElement = document.getElementById("deleteImage");

    var imgInstance = new fabric.Image(imgElement, {
        left: pos.left + CanvasData.horizontalElementsWidth - DeleteImageData.deleteImageWidth - 2,
        top: pos.top + 2,
        width: DeleteImageData.deleteImageWidth,
        height: DeleteImageData.deleteImageHeight,
        id: id,
        visible: false,
        hasControls: false,
        hasBorders: false,
        element: this.element,
        class: this
    });
            
    c.canvas.add(imgInstance);
//    c.canvas.renderAll();

    return imgInstance;
};

DeleteImage.prototype.setVisibility = function (flag){
    if(this.visible == flag)
        return;

    this.visible = flag;
    
    if(this.deleteImageInCanvas){
        this.deleteImageInCanvas.visible = flag;
    }
};

DeleteImage.prototype.moveDeleteImage = function (){
    if(!this.deleteImageInCanvas){
        console.log("error in move delete image");
        return;
    }

    var left = this.element.getRectangle(RectangleOffset.firstHorizontial).getLeft();
    var top = this.element.getRectangle(RectangleOffset.firstHorizontial).getTop();

    this.deleteImageInCanvas.setLeft(left + CanvasData.horizontalElementsWidth - DeleteImageData.deleteImageWidth - 2);
    this.deleteImageInCanvas.setTop(top + 2);    

    this.deleteImageInCanvas.setCoords();
};

DeleteImage.prototype.removeDeleteImage = function (){
    c=Canvas.getInstance();
    c.canvas.remove(this.deleteImageInCanvas);
};