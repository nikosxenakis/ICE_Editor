class ForeverElement extends Element {
  constructor(id, elementOffset, father) {
    super(id, "forever", elementOffset, father);

    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;

    var relPos = {
      left: CanvasData.horizontalElementsWidth / 16,
      top: CanvasData.horizontalElementsHeight / 2
    };
    var firstLabel = new Label("Forever", relPos, CanvasData.ElementLabelColor, CanvasData.ElementLabelSize);
    firstRect.addElement(firstLabel);
  }
}
