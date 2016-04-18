function ArrayElement (id , elementOffset , father){

    Element.call(this , id , "array" , elementOffset , father);

    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;
    var top = firstRect.rectangleInCanvas.getTop() + CanvasData.horizontalElementsHeight/2;
    var left = firstRect.rectangleInCanvas.getLeft();
    var leftOffset = 1;

    var relPos = {
        left: leftOffset*(CanvasData.horizontalElementsWidth/32),
        top: CanvasData.horizontalElementsHeight/2
    };
    var arrayLabel = new Label("array",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    arrayLabel.move(0,-arrayLabel.label.height/2);
    firstRect.addElement(arrayLabel);

    leftOffset+=5;
    var relPos = {
        left: leftOffset*(CanvasData.horizontalElementsWidth/32),
        top: CanvasData.horizontalElementsHeight/2
    };
    var inputBoxArrayName = new InputBox("name",relPos,InputType.variable);
    inputBoxArrayName.move(0,-inputBoxArrayName.box.height/2);
    firstRect.addElement(inputBoxArrayName);

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
    //[ 1 , true , 3 , \"hello\"]"
    var inputBoxVarValue = new InputBox("[ 1 , true ...]",relPos,InputType.valueVariable);
    inputBoxVarValue.move(0,-inputBoxVarValue.box.height/2);
    firstRect.addElement(inputBoxVarValue);
    
}

ArrayElement.prototype = Element.prototype;
