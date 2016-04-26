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
    var id = new InputBox("id",relPos,InputType.id);
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
    var fromNum = new InputBox("0",relPos,InputType.number);
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
    var toNum = new InputBox("0",relPos,InputType.number);
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
    var stepNum = new InputBox("0",relPos,InputType.number);
    firstRect.addElement(stepNum);
}

ForElement.prototype = Element.prototype;
