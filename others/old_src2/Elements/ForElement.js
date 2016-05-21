function ForElement (id , elementOffset , father){

    Element.call(this , id , "for" , elementOffset , father);
    
    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;

    var relPos = {
        left: CanvasData.horizontalElementsWidth/16,
        top: CanvasData.horizontalElementsHeight/2
    };
    var forLabel = new Label("For",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(forLabel);

    var relPos = {
        left: 5*CanvasData.horizontalElementsWidth/32+4,
        top: CanvasData.horizontalElementsHeight/2,
        width: CanvasData.InputBoxIdWidth,
        height: CanvasData.InputBoxIdHeight
    };
    var idInputElement = new InputElement("id",InputType.id)
    var id = new InputBox("id",idInputElement);
    firstRect.addElement(id);

    var relPos = {
        left: 10*CanvasData.horizontalElementsWidth/32,
        top: CanvasData.horizontalElementsHeight/2
    };
    var fromLabel = new Label("from",relPos,CanvasData.ElementLabelColor,CanvasData.ElementForLabelSize);
    firstRect.addElement(fromLabel);

    var relPos = {
        left: 14*CanvasData.horizontalElementsWidth/32,
        top: CanvasData.horizontalElementsHeight/2,
        width: CanvasData.InputBoxNumberWidth,
        height: CanvasData.InputBoxNumberHeight
    };
    var fromInputElement = new InputElement("0",InputType.number)
    var fromNum = new InputBox(relPos,fromInputElement);
    firstRect.addElement(fromNum);

    var relPos = {
        left: 18*CanvasData.horizontalElementsWidth/32,
        top: CanvasData.horizontalElementsHeight/2
    };
    var toLabel = new Label("to",relPos,CanvasData.ElementLabelColor,CanvasData.ElementForLabelSize);
    firstRect.addElement(toLabel);

    var relPos = {
        left: 20*CanvasData.horizontalElementsWidth/32,
        top: CanvasData.horizontalElementsHeight/2,
        width: CanvasData.InputBoxNumberWidth,
        height: CanvasData.InputBoxNumberHeight
    };
    var toInputElement = new InputElement("0",InputType.number)
    var toNum = new InputBox(relPos,toInputElement);
    firstRect.addElement(toNum);

    var relPos = {
        left: 24*CanvasData.horizontalElementsWidth/32,
        top: CanvasData.horizontalElementsHeight/2
    };
    var stepLabel = new Label("step",relPos,CanvasData.ElementLabelColor,CanvasData.ElementForLabelSize);
    firstRect.addElement(stepLabel);

    var relPos = {
        left: 27*CanvasData.horizontalElementsWidth/32,
        top: CanvasData.horizontalElementsHeight/2,
        width: CanvasData.InputBoxNumberWidth,
        height: CanvasData.InputBoxNumberHeight
    };
    var stepInputElement = new InputElement("0",InputType.number)
    var stepNum = new InputBox(relPos,stepInputElement);
    firstRect.addElement(stepNum);
}

ForElement.prototype = Element.prototype;
