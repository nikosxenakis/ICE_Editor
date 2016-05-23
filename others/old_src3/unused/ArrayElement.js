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
    firstRect.addElement(arrayLabel);

    leftOffset+=5;
    var relPos = {
        left: leftOffset*(CanvasData.horizontalElementsWidth/32),
        top: CanvasData.horizontalElementsHeight/2,
        width: CanvasData.InputBoxWidth,
        height: CanvasData.InputBoxHeight
    };
    var inputBoxArrayName = new InputBox("lvalue",relPos,InputType.lvalueID);
    firstRect.addElement(inputBoxArrayName);

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
    //[ 1 , true , 3 , \"hello\"]"
    var inputBoxVarValue = new InputBox("[ 1 , true ...]",relPos,InputType.array);
    firstRect.addElement(inputBoxVarValue);
    
}

ArrayElement.prototype = Element.prototype;
