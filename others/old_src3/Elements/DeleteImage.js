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
    this.element.removeElement();
};

DeleteImage.prototype.mouseOut = function (){
    this.element.getRectangle(RectangleOffset.firstHorizontial).rectangle.mouseOut();
};

DeleteImage.prototype.initDeleteImage = function(){

    var c=Canvas.getInstance();
    var id = DeleteImageData.id+"_"+this.element.id;
    var pos = this.element.getElementSize();

    var imageHtmlElement = $('<img/>', {  
        'id': id, 
        'class':'deleteIcon',
        'src': DeleteImageData.deleteImagePath 
    }); 
    $("body").append(imageHtmlElement);
        
    var imgElement = document.getElementById(id);

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
    c.canvas.renderAll();

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