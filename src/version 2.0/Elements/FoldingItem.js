var FoldingItemState = {
    unfolded : 0,
    folded : 1
};

function FoldingItem (element) {
    this.element = element;
    this.foldingItemState = FoldingItemState.unfolded;

    if( this.element.getRectangle(RectangleOffset.secondHorizontial) ){
        this.foldingItemBoxInCanvas = this.initFoldingItemBoxInCanvas();
        this.foldingItemInsideBoxHorizontialLineInCanvas = this.initFoldingItemInsideBoxHorizontialLineInCanvas();
        this.foldingItemInsideBoxVerticalLineInCanvas = this.initFoldingItemInsideBoxVerticalLineInCanvas();

        this.foldingItemLineInCanvas = this.initFoldingItemLineInCanvas();
        this.foldingItemSecondaryLineInCanvas = this.initFoldingItemSecondaryLineInCanvas();
    }

}

FoldingItem.prototype.bringToFront = function (){
    if( this.element.getRectangle(RectangleOffset.secondHorizontial) ){
        this.foldingItemBoxInCanvas.bringToFront();
        this.foldingItemInsideBoxHorizontialLineInCanvas.bringToFront();
        this.foldingItemInsideBoxVerticalLineInCanvas.bringToFront();
        this.foldingItemLineInCanvas.bringToFront();
        this.foldingItemSecondaryLineInCanvas.bringToFront();
    }
};

FoldingItem.prototype.moveFoldingItem = function (dx, dy){

    if(this.foldingItemBoxInCanvas && this.foldingItemLineInCanvas && this.foldingItemSecondaryLineInCanvas
        && this.foldingItemInsideBoxHorizontialLineInCanvas && this.foldingItemInsideBoxVerticalLineInCanvas){

        this.foldingItemBoxInCanvas.setLeft( this.foldingItemBoxInCanvas.getLeft() + dx );
        this.foldingItemBoxInCanvas.setTop( this.foldingItemBoxInCanvas.getTop() + dy );

        this.foldingItemLineInCanvas.set(
            { 
                'x1': this.foldingItemLineInCanvas.x1 + dx,
                'x2': this.foldingItemLineInCanvas.x2 + dx,
                'y1': this.foldingItemLineInCanvas.y1 + dy,
                'y2': this.foldingItemLineInCanvas.y2 + dy
            }
        );

        this.foldingItemSecondaryLineInCanvas.set(
            { 
                'x1': this.foldingItemSecondaryLineInCanvas.x1 + dx,
                'x2': this.foldingItemSecondaryLineInCanvas.x2 + dx,
                'y1': this.foldingItemSecondaryLineInCanvas.y1 + dy,
                'y2': this.foldingItemSecondaryLineInCanvas.y2 + dy
            }
        );

        this.foldingItemInsideBoxHorizontialLineInCanvas.set(
            { 
                'x1': this.foldingItemInsideBoxHorizontialLineInCanvas.x1 + dx,
                'x2': this.foldingItemInsideBoxHorizontialLineInCanvas.x2 + dx,
                'y1': this.foldingItemInsideBoxHorizontialLineInCanvas.y1 + dy,
                'y2': this.foldingItemInsideBoxHorizontialLineInCanvas.y2 + dy
            }
        );

        this.foldingItemInsideBoxVerticalLineInCanvas.set(
            { 
                'x1': this.foldingItemInsideBoxVerticalLineInCanvas.x1 + dx,
                'x2': this.foldingItemInsideBoxVerticalLineInCanvas.x2 + dx,
                'y1': this.foldingItemInsideBoxVerticalLineInCanvas.y1 + dy,
                'y2': this.foldingItemInsideBoxVerticalLineInCanvas.y2 + dy
            }
        );
 
        this.foldingItemBoxInCanvas.setCoords();
    }

}

FoldingItem.prototype.changeSize = function (dy){
        
    if(this.foldingItemBoxInCanvas && this.foldingItemLineInCanvas && this.foldingItemSecondaryLineInCanvas){

        y2 = this.foldingItemLineInCanvas.y2;

        this.foldingItemLineInCanvas.set({ 'y2': y2+dy });

        this.foldingItemSecondaryLineInCanvas.set({ 'y1': y2+dy ,'y2': y2+dy });

        c.canvas.renderAll();
    }
}

FoldingItem.prototype.setFoldingItemVisibillity = function (flag){
    if(this.foldingItemBoxInCanvas && this.foldingItemLineInCanvas && this.foldingItemSecondaryLineInCanvas
        && this.foldingItemInsideBoxHorizontialLineInCanvas && this.foldingItemInsideBoxVerticalLineInCanvas ){
        
        this.foldingItemBoxInCanvas.visible = flag;

        this.foldingItemInsideBoxHorizontialLineInCanvas.visible = flag;
        this.foldingItemInsideBoxVerticalLineInCanvas.visible = flag;
        if(this.foldingItemState == FoldingItemState.unfolded){
            this.foldingItemInsideBoxVerticalLineInCanvas.visible = false;
        }
        
        this.foldingItemLineInCanvas.visible = flag;
        this.foldingItemSecondaryLineInCanvas.visible = flag;
    }
}

FoldingItem.prototype.initFoldingItemBoxInCanvas = function (){

    var pos = this.element.getRectangle(RectangleOffset.firstHorizontial);

    var foldingItemBox = new fabric.Rect({
            left: pos.left + FoldingItemData.foldingItemWidth/3,
            top: pos.top + pos.height - 2*FoldingItemData.foldingItemHeight,
            fill: 'white',
            stroke: '#808080',
            strokeWidth: 1,
            width: FoldingItemData.foldingItemWidth,
            height: FoldingItemData.foldingItemHeight,
            hasControls: false,
            hasBorders:false,
            opacity: 0.6,
            element: this.element,
            foldingItem: this,
            visible: false,
            lockMovementX: true,
            lockMovementY: true,
            class:this
    });
    
    c.canvas.add(foldingItemBox);
    return foldingItemBox;
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
        stroke: 'white',
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


FoldingItem.prototype.initFoldingItemInsideBoxHorizontialLineInCanvas = function (){

    var foldingItemLine = this.makeLine([ 
        this.foldingItemBoxInCanvas.getLeft() + 2, 
        this.foldingItemBoxInCanvas.getTop() + this.foldingItemBoxInCanvas.height/2, 
        this.foldingItemBoxInCanvas.getLeft() + this.foldingItemBoxInCanvas.width - 2, 
        this.foldingItemBoxInCanvas.getTop() + this.foldingItemBoxInCanvas.height/2
    ]);

    c.canvas.add(foldingItemLine);
    return foldingItemLine;

}

FoldingItem.prototype.initFoldingItemInsideBoxVerticalLineInCanvas = function (){

    var foldingItemLine = this.makeLine([ 
        this.foldingItemBoxInCanvas.getLeft() + this.foldingItemBoxInCanvas.width/2, 
        this.foldingItemBoxInCanvas.getTop() + 2, 
        this.foldingItemBoxInCanvas.getLeft() + this.foldingItemBoxInCanvas.width/2, 
        this.foldingItemBoxInCanvas.getTop() + this.foldingItemBoxInCanvas.height - 2, 
    ]);

    c.canvas.add(foldingItemLine);
    return foldingItemLine;

}

FoldingItem.prototype.initFoldingItemLineInCanvas = function (){

    var foldingItemLine = this.makeLine([ 
        this.foldingItemBoxInCanvas.getLeft() + FoldingItemData.foldingItemWidth/2, 
        this.foldingItemBoxInCanvas.getTop() + FoldingItemData.foldingItemHeight, 
        this.foldingItemBoxInCanvas.getLeft() + FoldingItemData.foldingItemWidth/2, 
        this.element.getRectangle(RectangleOffset.secondHorizontial).getTop() + this.element.getRectangle(RectangleOffset.secondHorizontial).height/2
    ]);


    c.canvas.add(foldingItemLine);
    return foldingItemLine;

}

FoldingItem.prototype.initFoldingItemSecondaryLineInCanvas = function (){

    var foldingItemLine = this.makeLine([ 
        this.foldingItemLineInCanvas.x2, 
        this.foldingItemLineInCanvas.y2, 
        this.foldingItemLineInCanvas.x2+10, 
        this.foldingItemLineInCanvas.y2
    ]);


    c.canvas.add(foldingItemLine);
    return foldingItemLine;

}

FoldingItem.prototype.removeFoldingItem = function (){
    c=Canvas.getInstance();
        c.canvas.remove(this.foldingItemBoxInCanvas);
        c.canvas.remove(this.foldingItemLineInCanvas);
        c.canvas.remove(this.foldingItemSecondaryLineInCanvas);
        c.canvas.remove(this.foldingItemInsideBoxHorizontialLineInCanvas);
        c.canvas.remove(this.foldingItemInsideBoxVerticalLineInCanvas);
};
