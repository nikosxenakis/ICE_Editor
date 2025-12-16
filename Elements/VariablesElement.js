class VariablesElement extends Element {
  constructor() {
    super("variables", "program", 0, null);

    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;

    var relPos = {
      left: 24 * CanvasData.horizontalElementsWidth / 64,
      top: CanvasData.horizontalElementsHeight / 2
    };
    var programLabel = new Label("Variables", relPos, CanvasData.ElementLabelColor, CanvasData.ElementLabelSize);
    firstRect.addElement(programLabel);
  }
}
