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
    varLabel.move(0,-varLabel.label.height/2);
    firstRect.addElement(varLabel);

    leftOffset+=5;
    var relPos = {
        left: leftOffset*(CanvasData.horizontalElementsWidth/32),
        top: CanvasData.horizontalElementsHeight/2
    };
    var inputBoxVarName = new InputBox("name",relPos,InputType.variable);
    inputBoxVarName.move(0,-inputBoxVarName.box.height/2);
    firstRect.addElement(inputBoxVarName);

    leftOffset+=11;
    var relPos = {
        left: leftOffset*(CanvasData.horizontalElementsWidth/32),
        top: CanvasData.horizontalElementsHeight/2
    };
    var equalLabel = new Label("=",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    equalLabel.move(0,-equalLabel.label.height/2);
    firstRect.addElement(equalLabel);

    leftOffset+=3;
    var relPos = {
        left: leftOffset*(CanvasData.horizontalElementsWidth/32),
        top: CanvasData.horizontalElementsHeight/2
    };
    var inputBoxVarValue = new InputBox("value",relPos,InputType.valueVariable);
    inputBoxVarValue.move(0,-inputBoxVarValue.box.height/2);
    firstRect.addElement(inputBoxVarValue);

}

AssignElement.prototype = Element.prototype;
