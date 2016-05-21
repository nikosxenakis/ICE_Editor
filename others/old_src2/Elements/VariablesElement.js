function VariablesElement(){
    Element.call(this , "variables" , "program" , 0 , null);

    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;
    var left = firstRect.rectangleInCanvas.getLeft();
    var top = firstRect.rectangleInCanvas.getTop();

    var relPos = {
        left: 24*CanvasData.horizontalElementsWidth/64,
        top: CanvasData.horizontalElementsHeight/2
    };
    var programLabel = new Label("Variables",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(programLabel);

}

VariablesElement.prototype = Element.prototype;
