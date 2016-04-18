function DoNothingElement (id , elementOffset , father){

    Element.call(this , id , "doNothing" , elementOffset , father);

    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;
    var left = firstRect.rectangleInCanvas.getLeft();
    var top = firstRect.rectangleInCanvas.getTop();

    var relPos = {
        left: CanvasData.horizontalElementsWidth/2,
        top: CanvasData.horizontalElementsHeight/2
    };

    var firstLabel = new Label("Do Nothing",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstLabel.move(-firstLabel.label.getWidth()/2,-firstLabel.label.getHeight()/2);
    firstRect.addElement(firstLabel);

}

DoNothingElement.prototype = Element.prototype;
