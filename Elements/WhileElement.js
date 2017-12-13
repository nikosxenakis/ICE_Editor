function WhileElement (id , elementOffset , father , data){

    Element.call(this , id , "while" , elementOffset , father);

    var conditionInputElement = new InputElement('',InputType.logicExpression);

    conditionInputElement = parser.parseLogicExpressionData(data,conditionInputElement);

    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;
    var secondRect = this.getRectangle(RectangleOffset.secondHorizontial).rectangle;
    var firstLeft = firstRect.rectangleInCanvas.getLeft();
    var firstTop = firstRect.rectangleInCanvas.getTop();
    var secondLeft = secondRect.rectangleInCanvas.getLeft();
    var secondTop = secondRect.rectangleInCanvas.getTop();

    var relPos = {
        left: CanvasData.horizontalElementsWidth/16,
        top: CanvasData.horizontalElementsHeight/2
    };
    var firstLabel = new Label("While",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(firstLabel);

    var relPos = {
        left: 7*CanvasData.horizontalElementsWidth/32,
        top: CanvasData.horizontalElementsHeight/2,
        width: CanvasData.InputBoxConditionWidth,
        height: CanvasData.InputBoxConditionHeight
    };


    var condition = new InputBox(relPos,conditionInputElement);
    firstRect.addElement(condition);

    var relPos = {
        left: CanvasData.horizontalElementsWidth/16,
        top: CanvasData.horizontalElementsHeight/2
    };
    var secondLabel = new Label("While End",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    secondRect.addElement(secondLabel);
    
}

WhileElement.prototype = Element.prototype;

WhileElement.prototype.openEditMenu = function(){
    //console.error('openEditMenu WhileElement');
};
