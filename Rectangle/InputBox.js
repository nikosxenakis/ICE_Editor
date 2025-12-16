class InputBox {
  constructor(pos, inputElement) {
    const c = Canvas.getInstance();

    this.pos = pos;

    if (inputElement)
      this.input = inputElement;

    else
      this.input = new InputElement("", InputType.localId);

    this.prevInput = new Array();
    this.prevInputPos = -1;

    this.box = new fabric.Rect({
      left: pos.left,
      top: pos.top,
      fill: 'white',
      width: pos.width,
      height: pos.height,
      selectable: false,
      hasBorders: false,
      hasControls: false,
      hasRotatingPoint: false,
      stroke: 'grey',
      strokeWidth: 2,
      id: this.input.getText(),
      class: this
    });

    this.text = new fabric.Text(this.input.getText(), {
      left: pos.left + 4, // + this.box.width/2,
      top: pos.top + 4, // + this.box.height/2,
      fill: CanvasData.InputBoxTextColor,
      fontSize: CanvasData.InputBoxTextSize,
      selectable: false,
      hasBorders: false,
      hasControls: false,
      hasRotatingPoint: false,
      id: this.input.getText(),
      textAlign: "center",
      class: this
    });

    this.fixText();

    c.canvas.add(this.box);
    c.canvas.add(this.text);
  }

  fixText() {

    var scale = this.text.scaleX;
    var scaleDiff = 0.1;

    while (scale * this.text.width + 20 > this.box.width) {
      scale = scale - scaleDiff;
      this.text.set('scaleX', scale);
    }


    scale = this.text.scaleX;
    while (scale * this.text.width + 20 < this.box.width) {
      if (scale > 1) break;
      scale = scale + scaleDiff;
      this.text.set('scaleX', scale);
    }

    scale = this.text.scaleX;
    this.text.set('left', this.box.left + this.box.width / 2 - scale * this.text.width / 2);
    this.text.set('top', this.box.top + this.box.height / 2 - this.text.height / 2);
    this.text.setCoords();

    Canvas.getInstance().canvas.renderAll();

  }
  getLeft() {
    return this.box.left;
  }
  getTop() {
    return this.box.top;
  }
  getWidth() {
    return this.box.width;
  }
  getHeight() {
    return this.box.height;
  }
  move(dx, dy) {

    this.pos.left = this.box.left + dx;
    this.pos.top = this.box.top + dy;

    this.box.set('left', this.pos.left);
    this.box.set('top', this.pos.top);
    this.box.setCoords();

    this.text.set('left', this.text.left + dx);
    this.text.set('top', this.text.top + dy);
    this.text.setCoords();
  }
  remove() {
    const c = Canvas.getInstance();
    c.canvas.remove(this.text);
    c.canvas.remove(this.box);
    this.text = null;
    this.box = null;
  }
  setVisibillity(flag) {
    this.text.visible = flag;
    this.box.visible = flag;
  }
  bringToFront() {
    this.box.bringToFront();
    this.text.bringToFront();
  }
  mouseOver() {

    if (this.element)
      this.rectangle.mouseOver();
  }
  mouseUp() {
  }
  activate() {
    if (this.box) {
      this.box.set('stroke', '#494A4A');
      this.box.set('shadow', "5px 5px 7px #494A4A");
    }

    Canvas.getInstance().canvas.renderAll();
  }
  deactivate() {
    if (this.box) {
      this.box.set('stroke', 'grey');
      this.box.set('shadow', "0px");
    }

    Canvas.getInstance().canvas.renderAll();
  }
  update() {

    //this.box.width
    if (!this.box)
      return;

    var maxChar = this.box.width / 10;
    if (this.input.getText().length > maxChar) {
      this.text.set('text', this.input.getText().substr(0, maxChar - 1) + "...");
    }
    else {
      this.text.set('text', this.input.getText());
    }
    this.fixText();
  }
  mouseDown() {

    DialogMenuController.open(this);

  }
  mouseOut() {

    if (this.element)
      this.rectangle.mouseOut();
  }
  sendToBack() {
    this.text.sendToBack();
    this.box.sendToBack();
  }
  addPrevInput(input) {
    this.prevInput.push(input);
    this.prevInputPos++;

    var inputBox = this;

    undoManager.add({
      undo: function () {
        console.log('undo');
        inputBox.undoPrevInput();
      },
      redo: function () {
        console.log('redo');
        inputBox.redoPrevInput();
      }
    });
  }
  undoPrevInput() {

    if (this.prevInputPos == -1)
      return;

    this.prevInput.push(this.input);

    this.input = this.prevInput[this.prevInputPos];

    this.update();
  }
  redoPrevInput() {

    if (this.prevInputPos >= this.prevInput.length - 1)
      return;

    this.input = this.prevInput[this.prevInputPos + 1];
    this.prevInputPos++;

    this.update();
  }
};
