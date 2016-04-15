function ProgramElement(id , elementOffset , father){
    Element.call(this , id , "programImage" , elementOffset , father);

    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;
    var left = firstRect.rectangleInCanvas.getLeft();
    var top = firstRect.rectangleInCanvas.getTop();

    var relPos = {
        left: CanvasData.horizontalElementsWidth/8,
        top: CanvasData.horizontalElementsHeight/2
    };
    var programLabel = new Label("Program",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    programLabel.move(0,-programLabel.label.getHeight()/2);
    firstRect.addElement(programLabel);

    var relPos = {
        left: CanvasData.horizontalElementsWidth/2,
        top: CanvasData.horizontalElementsHeight/2
    };
    var programName = new TextInput("ProgramName",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    programName.move(0,-programName.text.getHeight()/2);
    firstRect.addElement(programName);

}

ProgramElement.prototype = Element.prototype;
