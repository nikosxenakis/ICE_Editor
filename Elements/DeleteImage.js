class DeleteImage {
  constructor(element) {
    this.element = element;
    this.deleteImageInCanvas = null;

    this.deleteImageInCanvas = this.initDeleteImage();

  }
  bringToFront() {
    this.deleteImageInCanvas.bringToFront();
  }
  sendToBack() {
    this.deleteImageInCanvas.sendToBack();
  }
  mouseOver() {
    this.element.getRectangle(RectangleOffset.firstHorizontial).rectangle.mouseOver();
  }
  mouseUp() {
    this.element.getRectangle(RectangleOffset.firstHorizontial).rectangle.mouseUp();
  }
  mouseDown() {
    var elem = this.element;
    const c = Canvas.getInstance();

    c.removedElements.push(elem);
    c.removedElementsPos++;

    undoManager.add({
      undo: function () {
        if (c.removedElementsPos < 0)
          return;

        var elem = c.removedElements[c.removedElementsPos];
        if (elem) {
          var father = elem.father;
          var offset = elem.elementOffset;
          father.addExistingElement(elem, offset);
          c.removedElementsPos--;
        }
      },
      redo: function () {
        var elem = c.removedElements[c.removedElementsPos + 1];
        if (elem) {
          c.removedElementsPos++;
          elem.removeElement();
        }
      }
    });

    elem.removeElement();
  }
  mouseOut() {
    this.element.getRectangle(RectangleOffset.firstHorizontial).rectangle.mouseOut();
  }
  initDeleteImage() {

    const c = Canvas.getInstance();
    var id = DeleteImageData.id + "_" + this.element.id;
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
  }
  setVisibility(flag) {
    if (this.visible == flag)
      return;

    this.visible = flag;

    if (this.deleteImageInCanvas) {
      this.deleteImageInCanvas.visible = flag;
    }
  }
  moveDeleteImage() {
    if (!this.deleteImageInCanvas) {
      console.log("error in move delete image");
      return;
    }

    var left = this.element.getRectangle(RectangleOffset.firstHorizontial).left;
    var top = this.element.getRectangle(RectangleOffset.firstHorizontial).top;

    this.deleteImageInCanvas.set('left', left + CanvasData.horizontalElementsWidth - DeleteImageData.deleteImageWidth - 2);
    this.deleteImageInCanvas.set('top', top + 2);

    this.deleteImageInCanvas.setCoords();
  }
  removeDeleteImage() {
    const c = Canvas.getInstance();
    c.canvas.remove(this.deleteImageInCanvas);
  }
}
