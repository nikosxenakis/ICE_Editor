function WhileElement (id , elementOffset , father){

    Element.call(this , id , "while" , elementOffset , father);
    
    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;
    var secondRect = this.getRectangle(RectangleOffset.secondHorizontial).rectangle;
    var firstLeft = firstRect.rectangleInCanvas.getLeft();
    var firstTop = firstRect.rectangleInCanvas.getTop();
    var secondLeft = secondRect.rectangleInCanvas.getLeft();
    var secondTop = secondRect.rectangleInCanvas.getTop();

    var relPos = {
        left: CanvasData.horizontalElementsWidth/16,
        top: CanvasData.horizontalElementsHeight/2
    };
    var firstLabel = new Label("While Start",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstLabel.move(0,-firstLabel.label.getHeight()/2);
    firstRect.addElement(firstLabel);

    var relPos = {
        left: CanvasData.horizontalElementsWidth/2,
        top: CanvasData.horizontalElementsHeight/2
    };
    /*
    var condition = new Condition("condition",relPos);
    condition.move(0,-condition.condition.getHeight()/2);
    firstRect.addElement(condition);
    */
    var condition = new InputBox("x<5 AND y==3",relPos,InputType.valueVariable);
    condition.move(0,-condition.box.height/2);
    firstRect.addElement(condition);


    var relPos = {
        left: CanvasData.horizontalElementsWidth/16,
        top: CanvasData.horizontalElementsHeight/2
    };
    var secondLabel = new Label("While End",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    secondLabel.move(0,-secondLabel.label.getHeight()/2);
    secondRect.addElement(secondLabel);

}

WhileElement.prototype = Element.prototype;
