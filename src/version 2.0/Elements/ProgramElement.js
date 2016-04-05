function ProgramElement(id , elementOffset , father , opac){
    Element.call(this , id , "programImage" , elementOffset , father , opac);

    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;

    var pos = {
        left: firstRect.rectangleInCanvas.getLeft()+firstRect.rectangleInCanvas.width/8,
        top: firstRect.rectangleInCanvas.getTop()+firstRect.rectangleInCanvas.height/4
    };

    var firstLabel = new Label("Program",pos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(firstLabel);

    var pos = {
        left: firstRect.rectangleInCanvas.getLeft()+firstRect.rectangleInCanvas.width/2,
        top: firstRect.rectangleInCanvas.getTop()+firstRect.rectangleInCanvas.height/4
    };

    var programName = new TextInput("ProgramName",pos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(programName);

}

ProgramElement.prototype = Element.prototype;
