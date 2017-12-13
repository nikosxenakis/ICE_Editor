function RepeatElement (id , elementOffset , father , data){

    if(data){
        if(isNaN(data)){
            console.error('error in RepeatElement');
            data = 0;
        }
    }
    else{
        var data = 0;
    }

    Element.call(this , id , "repeat" , elementOffset , father);
    
    var firstRect = this.getRectangle(RectangleOffset.firstHorizontial).rectangle;

    var relPos = {
        left: CanvasData.horizontalElementsWidth/16,
        top: CanvasData.horizontalElementsHeight/2
    };
    var firstLabel = new Label("Repeat",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(firstLabel);

    var relPos = {
        left: 13*CanvasData.horizontalElementsWidth/32,
        top: CanvasData.horizontalElementsHeight/2,
        width: CanvasData.InputBoxNumberWidth,
        height: CanvasData.InputBoxNumberHeight
    };

    var timesInputElement = new InputElement(data.toString(),InputType.number)
    var times = new InputBox(relPos,timesInputElement);
    firstRect.addElement(times);

    var relPos = {
        left: 21*CanvasData.horizontalElementsWidth/32,
        top: CanvasData.horizontalElementsHeight/2
    };
    var secondLabel = new Label("time(s)",relPos,CanvasData.ElementLabelColor,CanvasData.ElementLabelSize);
    firstRect.addElement(secondLabel);
}

RepeatElement.prototype = Element.prototype;
