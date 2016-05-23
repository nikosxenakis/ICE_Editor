function ArrayElement (id , elementOffset , father , data){

    Element.call(this , id , "array" , elementOffset , father);

    console.log('data : ',data);

    var arrayNameInputElement = new InputElement('array name',InputType.localId);
    var arrayExpressionInputElement = new InputElement('array list',InputType.arrayExpression);

    parser.parseArrayExpressionData(data,arrayNameInputElement,arrayExpressionInputElement);

    console.log('arrayNameInputElement : ',arrayNameInputElement);
    console.log('arrayExpressionInputElement : ',arrayExpressionInputElement);


    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;
    var top = firstRect.rectangleInCanvas.getTop() + CanvasData.horizontalElementsHeight/2;
    var left = firstRect.rectangleInCanvas.getLeft();
    var leftOffset = 1;

    var relPos = {
        left: leftOffset*(CanvasData.horizontalElementsWidth/32),
        top: CanvasData.horizontalElementsHeight/2
    };
    var varLabel = new Label("array",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(varLabel);

    leftOffset+=5;
    var relPos = {
        left: leftOffset*(CanvasData.horizontalElementsWidth/32),
        top: CanvasData.horizontalElementsHeight/2,
        width: CanvasData.InputBoxWidth,
        height: CanvasData.InputBoxHeight
    };

    var inputBoxVarName = new InputBox(relPos,arrayNameInputElement);
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

    var inputBoxVarValue = new InputBox(relPos,arrayExpressionInputElement);
    firstRect.addElement(inputBoxVarValue);

}

ArrayElement.prototype = Element.prototype;
