function DoNothingElement (id , elementOffset , father){

    Element.call(this , id , "doNothing" , elementOffset , father);

    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;
    var left = firstRect.rectangleInCanvas.getLeft();
    var top = firstRect.rectangleInCanvas.getTop();

    var relPos = {
        left: CanvasData.horizontalElementsWidth/2 - CanvasData.InputBoxWidth/2,
        top: CanvasData.horizontalElementsHeight/2,
        width: CanvasData.InputBoxWidth,
        height: CanvasData.InputBoxHeight
    };

    var doNothingBox = new InputBox("Do Nothing",relPos,InputType.doNothing);
    firstRect.addElement(doNothingBox);

}

DoNothingElement.prototype = Element.prototype;
