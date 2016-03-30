function DeleteImage (element) {
    this.element = element;
    this.deleteImageInCanvas = null;

    this.deleteImageInCanvas = this.initDeleteImage();

    //add events
    this.deleteImageInCanvas.on('mousedown', function(e) {
        this.element.removeElement();
    });

}

DeleteImage.prototype.initDeleteImage = function(){
    var c=Canvas.getInstance();
    var id = DeleteImageData.id+"_"+this.element.id;
    var pos = this.element.getElementSize();

    var imageHtmlElement = $('<img/>', {  'id': id, 'class':'deleteIcon','src': DeleteImageData.deleteImagePath }); 
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
        element: this.element
    });
            
    c.canvas.add(imgInstance);
    c.canvas.renderAll();

    return imgInstance;
}

DeleteImage.prototype.setDeleteImageVisibility = function (flag){
    if(this.deleteImageInCanvas){
        this.deleteImageInCanvas.visible = flag;
    }
}

DeleteImage.prototype.moveDeleteImage = function (dx,dy){
    if(!this.deleteImageInCanvas){
        console.log("error in move delete image");
        return;
    }

    if(dx){
        this.deleteImageInCanvas.setLeft(this.deleteImageInCanvas.getLeft() + dx);
    }
    if(dy){
        this.deleteImageInCanvas.setTop(this.deleteImageInCanvas.getTop() + dy);    
    }

    this.deleteImageInCanvas.setCoords();

}
