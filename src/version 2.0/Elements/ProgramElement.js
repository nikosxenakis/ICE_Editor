function ProgramElement(id , elementOffset , father){
    Element.call(this , id , "program" , elementOffset , father);

    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;
    var left = firstRect.rectangleInCanvas.getLeft();
    var top = firstRect.rectangleInCanvas.getTop();

    var relPos = {
        left: CanvasData.horizontalElementsWidth/16,
        top: CanvasData.horizontalElementsHeight/2
    };
    var programLabel = new Label("Program",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    programLabel.move(0,-programLabel.label.getHeight()/2);
    firstRect.addElement(programLabel);

    var relPos = {
        left: CanvasData.horizontalElementsWidth/2,
        top: CanvasData.horizontalElementsHeight/2
    };
    var programName = new TextInput(id,relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    programName.move(0,-programName.text.getHeight()/2);
    firstRect.addElement(programName);

}

ProgramElement.prototype = Element.prototype;
