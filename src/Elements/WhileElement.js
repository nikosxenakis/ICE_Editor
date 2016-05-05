function WhileElement (id , elementOffset , father){

    Element.call(this , id , "while" , elementOffset , father);
    
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
    var firstLabel = new Label("While Start",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(firstLabel);

    var relPos = {
        left: 13*CanvasData.horizontalElementsWidth/32,
        top: CanvasData.horizontalElementsHeight/2,
        width: CanvasData.InputBoxConditionWidth,
        height: CanvasData.InputBoxConditionHeight
    };
    //(x<5 OR y==3) AND z>=2
    var condition = new InputBox("x>2 AND y==1",relPos,InputType.logicExpression);
    //var condition = new InputBox("",relPos,InputType.logicExpressionDefault);
    firstRect.addElement(condition);


    var relPos = {
        left: CanvasData.horizontalElementsWidth/16,
        top: CanvasData.horizontalElementsHeight/2
    };
    var secondLabel = new Label("While End",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    secondRect.addElement(secondLabel);

}

WhileElement.prototype = Element.prototype;
