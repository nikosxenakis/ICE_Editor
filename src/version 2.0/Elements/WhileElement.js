function WhileElement (id , elementOffset , father , opac){

    Element.call(this , id , "whileImage" , elementOffset , father , opac);

    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;

    var pos = {
        left: firstRect.rectangleInCanvas.getLeft()+firstRect.rectangleInCanvas.width/8,
        top: firstRect.rectangleInCanvas.getTop()+firstRect.rectangleInCanvas.height/4
    };

    var firstLabel = new Label("While Start",pos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(firstLabel);


    var secondRect = this.getRectangle(RectangleOffset.secondHorizontial).rectangle;

    var pos = {
        left: secondRect.rectangleInCanvas.getLeft()+secondRect.rectangleInCanvas.width/8,
        top: secondRect.rectangleInCanvas.getTop()+secondRect.rectangleInCanvas.height/4
    };

    var secondLabel = new Label("While End",pos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    secondRect.addElement(secondLabel);


    var pos = {
        left: firstRect.rectangleInCanvas.getLeft()+firstRect.rectangleInCanvas.width/2,
        top: firstRect.rectangleInCanvas.getTop()+firstRect.rectangleInCanvas.height/4
    };

    var condition = new Condition("condition",pos);
    firstRect.addElement(condition);
}

WhileElement.prototype = Element.prototype;
