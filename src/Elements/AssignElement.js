function AssignElement (id , elementOffset , father , data){

    Element.call(this , id , "assign" , elementOffset , father);

    console.log('data : ',data);

    var nameInputElement = new InputElement('variable name',InputType.localId);
    var valueInputElement = new InputElement('variable value',InputType.arithmeticExpression);

    parser.parseAssignExpressionData(data,nameInputElement,valueInputElement);

    console.log('nameInputElement : ',nameInputElement);
    console.log('valueInputElement : ',valueInputElement);

    if(data && data.varValueInputElementList){
        for(var k=0; k<data.varValueInputElementList.length; k++){
            if(data.varValueInputElementList[k].text && data.varValueInputElementList[k].type)
                valueInputElement.addInputElement(new InputElement(data.varValueInputElementList[k].text , data.varValueInputElementList[k].type));
        }
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

    leftOffset+=5;
    var relPos = {
        left: leftOffset*(CanvasData.horizontalElementsWidth/32),
        top: CanvasData.horizontalElementsHeight/2,
        width: CanvasData.InputBoxWidth,
        height: CanvasData.InputBoxHeight
    };

    var inputBoxVarName = new InputBox(relPos,nameInputElement);
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

    var inputBoxVarValue = new InputBox(relPos,valueInputElement);
    firstRect.addElement(inputBoxVarValue);

}

AssignElement.prototype = Element.prototype;
