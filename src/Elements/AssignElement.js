function AssignElement (id , elementOffset , father){

    Element.call(this , id , "assign" , elementOffset , father);

    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;
    var top = firstRect.rectangleInCanvas.getTop() + CanvasData.horizontalElementsHeight/2;
    var left = firstRect.rectangleInCanvas.getLeft();
    var leftOffset = 1;

    var relPos = {
        left: leftOffset*(CanvasData.horizontalElementsWidth/32),
        top: CanvasData.horizontalElementsHeight/2
    };
    var varLabel = new Label("var",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(varLabel);

    leftOffset+=5;
    var relPos = {
        left: leftOffset*(CanvasData.horizontalElementsWidth/32),
        top: CanvasData.horizontalElementsHeight/2,
        width: CanvasData.InputBoxWidth,
        height: CanvasData.InputBoxHeight
    };
    var inputBoxVarName = new InputBox("var name",relPos,InputType.lvalue);
    firstRect.addElement(inputBoxVarName);

    leftOffset+=11;
    var relPos = {
        left: leftOffset*(CanvasData.horizontalElementsWidth/32),
        top: CanvasData.horizontalElementsHeight/2
    };
    var equalLabel = new Label("=",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(equalLabel);

    leftOffset+=3;
    var relPos = {
        left: leftOffset*(CanvasData.horizontalElementsWidth/32),
        top: CanvasData.horizontalElementsHeight/2,
        width: CanvasData.InputBoxWidth,
        height: CanvasData.InputBoxHeight
    };
    var inputBoxVarValue = new InputBox("var value",relPos,InputType.expression);
    firstRect.addElement(inputBoxVarValue);

}

AssignElement.prototype = Element.prototype;
