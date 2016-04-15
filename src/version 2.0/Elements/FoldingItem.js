var FoldingItemState = {
    unfolded : 0,
    folded : 1
};

function FoldingItem (element) {

    this.element = element;
    this.foldingItemState = FoldingItemState.unfolded;

    if( !this.element.getRectangle(RectangleOffset.secondHorizontial) ){
        return;
    }

    var c = Canvas.getInstance();
    var pos = this.element.getRectangle(RectangleOffset.firstHorizontial);
    var left = pos.left + FoldingItemData.foldingItemWidth/3;
    var top = pos.top + pos.height - 2*FoldingItemData.foldingItemHeight;

    this.foldingItemBoxInCanvas = new fabric.Rect({
            left: left,
            top: top,
            fill: 'white',
            stroke: '#808080',
            strokeWidth: 1,
            width: FoldingItemData.foldingItemWidth,
            height: FoldingItemData.foldingItemHeight,
            hasControls: false,
            hasBorders:false,
            opacity: CanvasData.lowOpacity,
            element: this.element,
            foldingItem: this,
            visible: false,
            lockMovementX: true,
            lockMovementY: true,
            class:this
    });
    
    this.foldingItemInsideBoxHorizontialLineInCanvas = this.makeLine([ 
        this.foldingItemBoxInCanvas.getLeft() + 2, 
        this.foldingItemBoxInCanvas.getTop() + this.foldingItemBoxInCanvas.height/2, 
        this.foldingItemBoxInCanvas.getLeft() + this.foldingItemBoxInCanvas.width - 2, 
        this.foldingItemBoxInCanvas.getTop() + this.foldingItemBoxInCanvas.height/2
    ]);

    this.foldingItemInsideBoxVerticalLineInCanvas = this.makeLine([ 
        this.foldingItemBoxInCanvas.getLeft() + this.foldingItemBoxInCanvas.width/2, 
        this.foldingItemBoxInCanvas.getTop() + 2, 
        this.foldingItemBoxInCanvas.getLeft() + this.foldingItemBoxInCanvas.width/2, 
        this.foldingItemBoxInCanvas.getTop() + this.foldingItemBoxInCanvas.height - 2, 
    ]);

    this.foldingItem = new fabric.Group(
        [   this.foldingItemBoxInCanvas, 
            this.foldingItemInsideBoxHorizontialLineInCanvas, 
            this.foldingItemInsideBoxVerticalLineInCanvas
        ], { 
            left: left, 
            top: top,
            lockMovementX: true,
            lockMovementY: true,
            hasControls: false,
            hasBorders:false,
            class: this
    });

    this.foldingItemLineInCanvas = this.makeLine([ 
        this.foldingItem.getLeft() + FoldingItemData.foldingItemWidth/2, 
        this.foldingItem.getTop() + FoldingItemData.foldingItemHeight, 
        this.foldingItem.getLeft() + FoldingItemData.foldingItemWidth/2, 
        this.element.getRectangle(RectangleOffset.secondHorizontial).getTop() + this.element.getRectangle(RectangleOffset.secondHorizontial).height/2
    ]);

    this.foldingItemSecondaryLineInCanvas = this.makeLine([ 
        this.foldingItemLineInCanvas.x2, 
        this.foldingItemLineInCanvas.y2, 
        this.foldingItemLineInCanvas.x2+10, 
        this.foldingItemLineInCanvas.y2
    ]);


    c.canvas.add(this.foldingItem);
    c.canvas.add(this.foldingItemLineInCanvas);
    c.canvas.add(this.foldingItemSecondaryLineInCanvas);
}

FoldingItem.prototype.bringToFront = function (){

    if( ! this.element.getRectangle(RectangleOffset.secondHorizontial) )
        return;

    this.foldingItem.bringToFront();
    this.foldingItemLineInCanvas.bringToFront();
    this.foldingItemSecondaryLineInCanvas.bringToFront();
};

FoldingItem.prototype.sendToBack = function (){

    if( ! this.element.getRectangle(RectangleOffset.secondHorizontial) )
        return;

    this.foldingItem.sendToBack();
    this.foldingItemLineInCanvas.sendToBack();
    this.foldingItemSecondaryLineInCanvas.sendToBack();
};

FoldingItem.prototype.moveFoldingItem = function (dx, dy){

    if( ! this.element.getRectangle(RectangleOffset.secondHorizontial) )
        return;

    this.foldingItem.setLeft(this.foldingItem.getLeft()+dx);
    this.foldingItem.setTop(this.foldingItem.getTop()+dy);

    this.foldingItemLineInCanvas.set({ 
        'x1': this.foldingItemLineInCanvas.x1 + dx,
        'x2': this.foldingItemLineInCanvas.x2 + dx,
        'y1': this.foldingItemLineInCanvas.y1 + dy,
        'y2': this.foldingItemLineInCanvas.y2 + dy
    });

    this.foldingItemSecondaryLineInCanvas.set({ 
        'x1': this.foldingItemSecondaryLineInCanvas.x1 + dx,
        'x2': this.foldingItemSecondaryLineInCanvas.x2 + dx,
        'y1': this.foldingItemSecondaryLineInCanvas.y1 + dy,
        'y2': this.foldingItemSecondaryLineInCanvas.y2 + dy
    });

    this.foldingItem.setCoords();
    this.foldingItemLineInCanvas.setCoords();
    this.foldingItemSecondaryLineInCanvas.setCoords();
}

FoldingItem.prototype.changeSize = function (dy){

    if( ! this.element.getRectangle(RectangleOffset.secondHorizontial) )
        return;

    var y2 = this.foldingItemLineInCanvas.y2;

    this.foldingItemLineInCanvas.set({ 'y2': y2+dy });
    this.foldingItemSecondaryLineInCanvas.set({ 'y1': y2+dy ,'y2': y2+dy });

    this.foldingItemLineInCanvas.setCoords();
    this.foldingItemSecondaryLineInCanvas.setCoords();

    //c.canvas.renderAll();
    
}

FoldingItem.prototype.setFoldingItemVisibillity = function (flag){

    if( ! this.element.getRectangle(RectangleOffset.secondHorizontial) )
        return;

    this.foldingItemBoxInCanvas.visible = flag;
    this.foldingItemInsideBoxHorizontialLineInCanvas.visible = flag;
    this.foldingItemInsideBoxVerticalLineInCanvas.visible = flag;

    if(this.foldingItemState == FoldingItemState.unfolded){
        this.foldingItemInsideBoxVerticalLineInCanvas.visible = false;
    }
        
    this.foldingItemLineInCanvas.visible = flag;
    this.foldingItemSecondaryLineInCanvas.visible = flag;
    
}

FoldingItem.prototype.mouseOver = function (){
    this.element.getRectangle(RectangleOffset.firstHorizontial).rectangle.mouseOver();
};

FoldingItem.prototype.mouseUp = function (){
    this.element.getRectangle(RectangleOffset.firstHorizontial).rectangle.mouseUp();
};

FoldingItem.prototype.mouseDown = function (){
        
    if( this.foldingItemState == FoldingItemState.unfolded ){
        this.element.foldElement(this.element);
    }
    else{
        this.element.unfoldElement(this.element);
    } 
        
    Canvas.getInstance().canvas.renderAll();
    this.element.getRectangle(RectangleOffset.firstHorizontial).rectangle.mouseOver();
};

FoldingItem.prototype.mouseOut = function (){
    this.element.getRectangle(RectangleOffset.firstHorizontial).rectangle.mouseOut();
};

FoldingItem.prototype.makeLine = function (coords){
    return new fabric.Line(coords, {
        fill: 'white',
        stroke: 'grey',
        strokeWidth: 1,
        selectable: false,
        opacity: 1,
        element: this.element,
        foldingItem: this,
        visible: false,
        lockMovementX: true,
        lockMovementY: true,
        class: this
    });
}

FoldingItem.prototype.removeFoldingItem = function (){
    if( ! this.element.getRectangle(RectangleOffset.secondHorizontial) )
        return;

    c=Canvas.getInstance();
    c.canvas.remove(this.foldingItem);
    //c.canvas.remove(this.foldingItemBoxInCanvas);
    c.canvas.remove(this.foldingItemLineInCanvas);
    c.canvas.remove(this.foldingItemSecondaryLineInCanvas);
    //c.canvas.remove(this.foldingItemInsideBoxHorizontialLineInCanvas);
    //c.canvas.remove(this.foldingItemInsideBoxVerticalLineInCanvas);
};
