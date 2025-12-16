class DoWhileElement extends Element {
  constructor(id, elementOffset, father, data) {
    super(id, "doWhile", elementOffset, father);

    var conditionInputElement = new InputElement('', InputType.logicExpression);

    conditionInputElement = parser.parseLogicExpressionData(data, conditionInputElement);

    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;
    var secondRect = this.getRectangle(RectangleOffset.secondHorizontial).rectangle;

    var relPos = {
      left: CanvasData.horizontalElementsWidth / 16,
      top: CanvasData.horizontalElementsHeight / 2
    };
    var firstLabel = new Label("Do", relPos, CanvasData.ElementLabelColor, CanvasData.ElementLabelSize);
    firstRect.addElement(firstLabel);

    var relPos = {
      left: 7 * CanvasData.horizontalElementsWidth / 32,
      top: CanvasData.horizontalElementsHeight / 2,
      width: CanvasData.InputBoxConditionWidth,
      height: CanvasData.InputBoxConditionHeight
    };


    var condition = new InputBox(relPos, conditionInputElement);
    secondRect.addElement(condition);

    var relPos = {
      left: CanvasData.horizontalElementsWidth / 16,
      top: CanvasData.horizontalElementsHeight / 2
    };
    var secondLabel = new Label("While", relPos, CanvasData.ElementLabelColor, CanvasData.ElementLabelSize);
    secondRect.addElement(secondLabel);

  }
  openEditMenu() {
    //console.error('openEditMenu DoWhileElement');
  }
}
