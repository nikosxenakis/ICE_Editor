function FunctionElement(id){
    Element.call(this , id , "function" , 0 , null);

    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;
    var left = firstRect.rectangleInCanvas.getLeft();
    var top = firstRect.rectangleInCanvas.getTop();

    var relPos = {
        left: CanvasData.horizontalElementsWidth/16,
        top: CanvasData.horizontalElementsHeight/2
    };
    var programLabel = new Label("Function",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(programLabel);

    var relPos = {
        left: 11*CanvasData.horizontalElementsWidth/32,
        top: CanvasData.horizontalElementsHeight/2
    };
    var programName = new TextInput(id,relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(programName);

   var relPos = {
        left: 19*CanvasData.horizontalElementsWidth/32,
        top: CanvasData.horizontalElementsHeight/2,
        width: CanvasData.InputBoxWidth,
        height: CanvasData.InputBoxHeight
    };
    var conditionInputElement = new InputElement("arguments",InputType.logicExpressionDefault)
    var condition = new InputBox(relPos,conditionInputElement);
    firstRect.addElement(condition);

}

FunctionElement.prototype = Element.prototype;
