const FoldingItemState = {
  unfolded: 0,
  folded: 1
};

class FoldingItem {
  constructor(element) {

    this.element = element;
    this.foldingItemState = FoldingItemState.unfolded;

    if (!this.element.getRectangle(RectangleOffset.secondHorizontial)) {
      return;
    }

    const c = Canvas.getInstance();
    const pos = this.element.getRectangle(RectangleOffset.firstHorizontial);
    const left = pos.left + FoldingItemData.foldingItemWidth / 3;
    const top = pos.top + pos.height - 2 * FoldingItemData.foldingItemHeight;

    this.foldingItemBoxInCanvas = new fabric.Rect({
      left: left,
      top: top,
      fill: 'white',
      stroke: '#808080',
      strokeWidth: 1,
      width: FoldingItemData.foldingItemWidth,
      height: FoldingItemData.foldingItemHeight,
      selectable: false,
      hasBorders: false,
      hasControls: false,
      hasRotatingPoint: false,
      opacity: CanvasData.lowOpacity,
      element: this.element,
      foldingItem: this,
      class: this
    });

    this.foldingItemInsideBoxHorizontialLineInCanvas = this.makeLine([
      this.foldingItemBoxInCanvas.left + 2,
      this.foldingItemBoxInCanvas.top + this.foldingItemBoxInCanvas.height / 2,
      this.foldingItemBoxInCanvas.left + this.foldingItemBoxInCanvas.width - 2,
      this.foldingItemBoxInCanvas.top + this.foldingItemBoxInCanvas.height / 2
    ]);

    this.foldingItemInsideBoxVerticalLineInCanvas = this.makeLine([
      this.foldingItemBoxInCanvas.left + this.foldingItemBoxInCanvas.width / 2,
      this.foldingItemBoxInCanvas.top + 2,
      this.foldingItemBoxInCanvas.left + this.foldingItemBoxInCanvas.width / 2,
      this.foldingItemBoxInCanvas.top + this.foldingItemBoxInCanvas.height - 2,
    ]);

    this.foldingItem = new fabric.Group(
      [this.foldingItemBoxInCanvas,
      this.foldingItemInsideBoxHorizontialLineInCanvas,
      this.foldingItemInsideBoxVerticalLineInCanvas
      ], {
      left: left,
      top: top,
      selectable: false,
      hasBorders: false,
      hasControls: false,
      hasRotatingPoint: false,
      class: this
    });

    this.foldingItemLineInCanvas = this.makeLine([
      this.foldingItem.left,
      this.foldingItem.top + FoldingItemData.foldingItemHeight,
      this.foldingItem.left,
      this.element.getRectangle(RectangleOffset.secondHorizontial).top + this.element.getRectangle(RectangleOffset.secondHorizontial).height / 2
    ]);

    this.foldingItemSecondaryLineInCanvas = this.makeLine([
      this.foldingItemLineInCanvas.x2,
      this.foldingItemLineInCanvas.y2,
      this.foldingItemLineInCanvas.x2 + 10,
      this.foldingItemLineInCanvas.y2
    ]);


    c.canvas.add(this.foldingItem);
    c.canvas.add(this.foldingItemLineInCanvas);
    c.canvas.add(this.foldingItemSecondaryLineInCanvas);

  }
  bringToFront() {

    if (!this.element.getRectangle(RectangleOffset.secondHorizontial))
      return;

    this.foldingItem.bringToFront();
    this.foldingItemLineInCanvas.bringToFront();
    this.foldingItemSecondaryLineInCanvas.bringToFront();
  }
  sendToBack() {

    if (!this.element.getRectangle(RectangleOffset.secondHorizontial))
      return;

    this.foldingItem.sendToBack();
    this.foldingItemLineInCanvas.sendToBack();
    this.foldingItemSecondaryLineInCanvas.sendToBack();
  }
  moveFoldingItem() {

    if (!this.element.getRectangle(RectangleOffset.secondHorizontial))
      return;

    var pos = this.element.getRectangle(RectangleOffset.firstHorizontial);
    var left = pos.left + FoldingItemData.foldingItemWidth / 3;
    var top = pos.top + pos.height - 2 * FoldingItemData.foldingItemHeight;

    this.foldingItem.set('left', left);
    this.foldingItem.set('top', top);

    this.foldingItem.setCoords();

    this.foldingItemLineInCanvas.set({
      'x1': left,
      'y1': top + FoldingItemData.foldingItemHeight,
      'x2': left,
      'y2': this.element.getRectangle(RectangleOffset.secondHorizontial).top + this.element.getRectangle(RectangleOffset.secondHorizontial).height / 2
    });

    this.foldingItemLineInCanvas.setCoords();

    this.foldingItemSecondaryLineInCanvas.set({
      'x1': this.foldingItemLineInCanvas.x2,
      'y1': this.foldingItemLineInCanvas.y2,
      'x2': this.foldingItemLineInCanvas.x2 + 10,
      'y2': this.foldingItemLineInCanvas.y2
    });

    this.foldingItemSecondaryLineInCanvas.setCoords();
  }
  changeSize(dy) {

    if (!this.element.getRectangle(RectangleOffset.secondHorizontial))
      return;

    var y2 = this.foldingItemLineInCanvas.y2;

    this.foldingItemLineInCanvas.set({ 'y2': y2 + dy });
    this.foldingItemSecondaryLineInCanvas.set({ 'y1': y2 + dy, 'y2': y2 + dy });

    this.foldingItemLineInCanvas.setCoords();
    this.foldingItemSecondaryLineInCanvas.setCoords();

    //c.canvas.renderAll();
  }
  setVisibility(flag) {

    if (this.visible && this.visible == flag)
      return;

    this.visible = flag;

    if (!this.element.getRectangle(RectangleOffset.secondHorizontial))
      return;

    this.foldingItemLineInCanvas.visible = flag;
    this.foldingItemSecondaryLineInCanvas.visible = flag;

    this.foldingItem.visible = flag;
    this.foldingItemBoxInCanvas.visible = flag;
    this.foldingItemInsideBoxHorizontialLineInCanvas.visible = flag;
    this.foldingItemInsideBoxVerticalLineInCanvas.visible = flag;

    if (this.foldingItemState == FoldingItemState.unfolded) {
      this.foldingItemInsideBoxVerticalLineInCanvas.visible = false;
    }
  }
  mouseOver(e) {
    this.element.getRectangle(RectangleOffset.firstHorizontial).rectangle.mouseOver(e);
  }
  mouseUp(e) {
    this.element.getRectangle(RectangleOffset.firstHorizontial).rectangle.mouseUp(e);
  }
  mouseDown(e) {
    if (this.foldingItemState == FoldingItemState.unfolded) {
      this.element.foldElement(this.element);
    }
    else {
      this.element.unfoldElement(this.element);
    }

    this.element.setOpacity(CanvasData.lowOpacity);

    return false;
  }
  mouseOut(e) {
    this.element.getRectangle(RectangleOffset.firstHorizontial).rectangle.mouseOut(e);
  }
  makeLine(coords) {
    return new fabric.Line(coords, {
      fill: 'white',
      stroke: 'grey',
      strokeWidth: 1,
      opacity: 1,
      element: this.element,
      foldingItem: this,
      selectable: false,
      hasBorders: false,
      hasControls: false,
      hasRotatingPoint: false,
      class: this
    });
  }
  removeFoldingItem() {
    if (!this.element.getRectangle(RectangleOffset.secondHorizontial))
      return;

    const c = Canvas.getInstance();
    c.canvas.remove(this.foldingItem);
    //c.canvas.remove(this.foldingItemBoxInCanvas);
    c.canvas.remove(this.foldingItemLineInCanvas);
    c.canvas.remove(this.foldingItemSecondaryLineInCanvas);
    //c.canvas.remove(this.foldingItemInsideBoxHorizontialLineInCanvas);
    //c.canvas.remove(this.foldingItemInsideBoxVerticalLineInCanvas);
  }
}
