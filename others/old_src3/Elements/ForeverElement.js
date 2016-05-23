function ForeverElement (id , elementOffset , father){

    Element.call(this , id , "forever" , elementOffset , father);

    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;
    var left = firstRect.rectangleInCanvas.getLeft();
    var top = firstRect.rectangleInCanvas.getTop();

    var relPos = {
        left: CanvasData.horizontalElementsWidth/16,
        top: CanvasData.horizontalElementsHeight/2
    };
    var firstLabel = new Label("Forever",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(firstLabel);

}

ForeverElement.prototype = Element.prototype;
