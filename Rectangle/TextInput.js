class TextInput {
  constructor(id, relPos, color, size) {
    const c = Canvas.getInstance();

    this.relPos = relPos;

    this.text = new fabric.IText(id, {
      left: relPos.left,
      top: relPos.top,
      fill: color,
      fontSize: size,
      id: id,
      strokeWidth: 3,
      fontFamily: "Helvetica",
      transparentCorners: true,
      textAlign: "center",
      cornersize: 0,
      hasBorders: false,
      hasControls: false,
      hasRotatingPoint: false,
      class: this
    });

    this.prevText = id;

    c.canvas.add(this.text);

  }
  updateSideBar() {

    changeSideBarElementName(this.prevText, this.text.text);

    if (this.element && this.element instanceof ProgramElement) {
      this.element.id = this.text.text;
    }

    this.prevText = this.text.text;
  }
  getLeft() {
    return this.text.left;
  }
  getTop() {
    return this.text.top;
  }
  getWidth() {
    return this.text.width;
  }
  getHeight() {
    return this.text.height;
  }
  move(dx, dy) {
    this.text.set('left', this.text.left + dx);
    this.text.set('top', this.text.top + dy);
    this.text.setCoords();
  }
  remove() {
    const c = Canvas.getInstance();
    c.canvas.remove(this.text);
    this.text = null;
  }
  setVisibillity(flag) {
    this.text.visible = flag;
  }
  bringToFront() {
    this.text.bringToFront();
  }
  mouseOver() {

    this.text.fill = "green";

    if (this.element)
      this.rectangle.mouseOver();
  }
  mouseUp() {
  }
  mouseDown() {
  }
  mouseOut() {
    this.text.fill = "white";
    if (this.element)
      this.rectangle.mouseOut();
  }
};

var changeSideBarElementName = function (prevText, text) {
  console.log(prevText, text);

  $("#programList a").each(function () {
    console.log($(this).text());
    if ($(this).text() === prevText) {

      var replaced = $(this).text().replace(prevText, text);
      $(this).text(replaced);

      var programHtmlHeaderSpan = createHtmlElement({
        format: "span",
        className: "glyphicon glyphicon-minus sideBarButtonRemove",
        father: this
      });

      $(programHtmlHeaderSpan).mouseover(function () {
        $(this).css('color', 'red');
      });

      $(programHtmlHeaderSpan).mouseout(function () {
        $(this).css('color', 'mediumvioletred');
      });

      $(programHtmlHeaderSpan).mousedown(function () {

        var id = $(this).parent().text();
        var element = Canvas.removeElement(id);

        $(this).parent().parent().remove();
        return false;

      });
    }
    console.log($(this).text());
  });

};
