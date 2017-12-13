function AssignElement (id , elementOffset , father , data){

    Element.call(this , id , "assign" , elementOffset , father);

    var nameInputElement = new InputElement('name',InputType.localId);
    var valueInputElement = new InputElement('',InputType.arithmeticExpression);
    
    if(data){
        var varName = data.varName;
        var varType = data.varType;
        var arithmeticExpression = data.arithmeticExpression;
        valueInputElement = parser.parseArithmeticExpressionData(arithmeticExpression,valueInputElement);

        if(varName && varType){
            nameInputElement.setText(varName);
            nameInputElement.setType(varType);
            IdController.add(nameInputElement.getText(),nameInputElement.type);
        }
        else{
            console.error('error in AssignElement');
        }
    }
    else{
        valueInputElement = parser.parseArithmeticExpressionData(null,valueInputElement);
    }

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

    leftOffset+=3;
    var relPos = {
        left: leftOffset*(CanvasData.horizontalElementsWidth/32),
        top: CanvasData.horizontalElementsHeight/2,
        width: CanvasData.InputBoxWidth,
        height: CanvasData.InputBoxHeight
    };

    var inputBoxVarName = new InputBox(relPos,nameInputElement);
    firstRect.addElement(inputBoxVarName);

    leftOffset+=12;
    var relPos = {
        left: leftOffset*(CanvasData.horizontalElementsWidth/32),
        top: CanvasData.horizontalElementsHeight/2
    };
    var equalLabel = new Label("=",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(equalLabel);

    leftOffset+=2;
    var relPos = {
        left: leftOffset*(CanvasData.horizontalElementsWidth/32),
        top: CanvasData.horizontalElementsHeight/2,
        width: CanvasData.InputBoxWidth,
        height: CanvasData.InputBoxHeight
    };

    var inputBoxVarValue = new InputBox(relPos,valueInputElement);
    firstRect.addElement(inputBoxVarValue);

}

AssignElement.prototype = Element.prototype;
