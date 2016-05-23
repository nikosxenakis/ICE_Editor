function ProgramElement(id){
    Element.call(this , id , "program" , 0 , null);

    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;
    var left = firstRect.rectangleInCanvas.getLeft();
    var top = firstRect.rectangleInCanvas.getTop();

    var relPos = {
        left: CanvasData.horizontalElementsWidth/16,
        top: CanvasData.horizontalElementsHeight/2
    };
    var programLabel = new Label("Program",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(programLabel);

    var relPos = {
        left: CanvasData.horizontalElementsWidth/2,
        top: CanvasData.horizontalElementsHeight/2
    };
    var programName = new TextInput(id,relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(programName);

}

ProgramElement.prototype = Element.prototype;
