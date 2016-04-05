function DoNothingElement (id , elementOffset , father , opac){

    Element.call(this , id , "doNothingImage" , elementOffset , father , opac);

    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;

    var pos = {
        left: firstRect.rectangleInCanvas.getLeft()+firstRect.rectangleInCanvas.width/8,
        top: firstRect.rectangleInCanvas.getTop()+firstRect.rectangleInCanvas.height/4,
    };

    var firstLabel = new Label("Do Nothing",pos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(firstLabel);

}

DoNothingElement.prototype = Element.prototype;
