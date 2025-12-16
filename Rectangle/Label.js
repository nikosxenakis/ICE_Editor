class Label {
  constructor(id, relPos, color, size) {

    const c = Canvas.getInstance();

    this.relPos = relPos;

    this.label = new fabric.IText(id, {
      left: relPos.left,
      top: relPos.top,
      fill: color,
      fontSize: size,
      shadow: color + ' 0px 0px 1px',
      fontFamily: "Helvetica",
      fontWeight: 100,
      id: id,
      textAlign: "center",
      hasBorders: false,
      hasControls: false,
      hasRotatingPoint: false,
      class: this
    });

    c.canvas.add(this.label);
  }

  getLeft() {
    return this.label.left;
  }
  getTop() {
    return this.label.top;
  }
  getWidth() {
    return this.label.width;
  }
  getHeight() {
    return this.label.height;
  }
  setFontSize(size) {
    this.label.set('fontSize', size);
  }
  getFontSize(flag) {
    return this.label.fontSize;
  }

  move(dx, dy) {
    this.label.set('left', this.label.left + dx);
    this.label.set('top', this.label.top + dy);

    this.label.setCoords();
  }

  remove() {
    const c = Canvas.getInstance();
    c.canvas.remove(this.label);
    this.label = null;
  }
  setVisibillity(flag) {
    this.label.visible = flag;
  }
  bringToFront() {
    this.label.bringToFront();
  }
  mouseOver() {
    if (this.rectangle)
      this.rectangle.mouseOver();
  }
  mouseUp() {
    if (this.rectangle)
      this.rectangle.mouseUp();
  }
  mouseDown() {
    if (this.rectangle)
      this.rectangle.mouseDown();
  }
  mouseOut() {
    if (this.element)
      this.rectangle.mouseOut();
  }
  sendToBack() {
    this.label.sendToBack();
  }
};
