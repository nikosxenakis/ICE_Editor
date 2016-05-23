function AssignElement (id , elementOffset , father , data){

    Element.call(this , id , "assign" , elementOffset , father);

    var varNameInputType = InputType.lvalue;
    var varNameInputText = "var name";
    var varValueInputType = InputType.expression;
    var varValueInputText = "var value";  

    if(data){
        if(data.varNameInputType)
            varNameInputType = data.varNameInputType;
        if(data.varNameInputText)
            varNameInputText = data.varNameInputText;
        if(data.varValueInputType)
            varValueInputType = data.varValueInputType;
        if(data.varValueInputText)
            varValueInputText = data.varValueInputText;
    }

    var nameInputElement = new InputElement(varNameInputText,varNameInputType)
    var valueInputElement = new InputElement(varValueInputText,varValueInputType);


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
