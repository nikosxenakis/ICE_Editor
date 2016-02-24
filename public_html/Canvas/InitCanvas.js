/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Canvas(width, height) {

    //construction
    this.canvas = new fabric.Canvas('canvas', {
        hoverCursor: 'pointer',
        selection: false,
        height:height,
        width:width
    });
   
    //events
    this.canvas.on('mouse:over', function(e) {
    });

    this.canvas.on('mouse:out', function(e) {
    });

    this.canvas.on('mouse:down',function(options) {
    });

    this.canvas.on('mouse:move',function(options) {
    });

    this.canvas.on('mouse:up',function() {
    });

    //elements
    this.canvas.verticalElements = new Array();
    this.canvas.horizontalElements = new Array();
    /*
    this.canvas.doNothingElement;
    this.canvas.horizontalItemsOfElement = new Array();
    this.canvas.verticalItemsOfElement = new Array();
    this.canvas.codeFoldingElementsNotTranslate = new Array();
    this.canvas.notTranslateCodeFoldingElements = false;
    this.canvas.object = null;
    this.canvas.underElement = null;
    this.canvas.objectMoving = null;
    this.canvas.elementsUnderDragElement = new Array;
    this.canvas.selected = false;
    this.canvas.parenthesisClicked;
    this.canvas.isParenthesisClicked = false;
    this.canvas.clicked = false;
    this.canvas.objectIntersected = null;
    this.canvas.makeIntersection = false;
    this.canvas.notLengthenedElements = new Array();
    this.canvas.notLength = false;
    this.canvas.notTranslate = false;  //this is needed for not translate some elements when call function TranslateElements
    this.canvas.itemsOfDraggableElement = new Array();  //this array contains elements that TranslateElements function will not translate
    this.canvas.groupArray = new Array();
    this.canvas.rightClickedElement; //to know which element was right clicked
    this.canvas.vplStmt;
    this.canvas.point = new Array(); // the point (x, y) of canvas  that elements will be added
    this.canvas.arithOp; //
    this.canvas.programVariables = new Array();
    this.canvas.programArrays = new Array();
    this.canvas.logicOps;
    this.canvas.compOps;
    this.canvas.compOp;
    this.canvas.logicOp;
    this.canvas.boxesCompExprs;
    this.canvas.boxCompExpr;
    this.canvas.compExprSide;
    this.canvas.element;
    this.canvas.insideElement;
    this.canvas.leftBox;
    this.canvas.leftVar;
    this.canvas.groupAddBox;
    this.canvas.rightBox;
    this.canvas.rightVar;
    this.canvas.arithOps;
    this.canvas.rightBoxesList; //this for all boxes in if element and for right boxes in assign element
    this.canvas.rightVarsList;
    this.canvas.elementText;
    this.canvas.groupArrow;
    this.canvas.deleteButtons;
    this.canvas.deleteButtonClicked;
    this.canvas.ulDefinedVars;
    this.canvas.ulAddVarsEdit;
    this.canvas.arrayNames;
    this.canvas.startElement;
    this.canvas.endElement;
    this.canvas.codeFolding;
    */
   

    return this.canvas;
}

function addCanvasElements(canvas) {

    //create program group
    var groupProgram = new fabric.Group([], {
        left: Group[0].left,
        top: Group[0].top,
        angle: Group[0].angle,
        selectable:Group[0].selectable,
            hasControls: Group[0].hasControls,
            hasBorders: Group[0].hasBorders
    });
        
    //and initial elements to group program        
    HorizontialElements.forEach(function(entry) {
        var elem = new fabric.Rect({
            left: entry.left,
            top: entry.top,
            fill: entry.fill,
            width: entry.width,
            height: entry.height,
            selectable: entry.selectable,
            id: entry.id,
            hasControls: entry.hasControls,
            hasBorders: entry.hasBorders
        });
        canvas.horizontalElements.push(elem);
        groupProgram.addWithUpdate(elem);
    });

    VerticalElements.forEach(function(entry) {
        var elem = new fabric.Rect({
            left: entry.left,
            top: entry.top,
            fill: entry.fill,
            width: entry.width,
            height: entry.height,
            selectable: entry.selectable,
            id: entry.id,
            hasControls: entry.hasControls,
            hasBorders: entry.hasBorders
        });
        canvas.verticalElements.push(elem);
        groupProgram.addWithUpdate(elem);
    });



    TextElements.forEach(function(entry) {
        var elem = new fabric.IText(entry.id,{
            left: entry.left,
            top: entry.top,
            fill: entry.fill,
            fontSize: entry.fontSize,
            fontWeight: entry.fontWeight,
            fontFamily: entry.fontFamily,
            selectable: entry.selectable,
            id: entry.id,
            textAlign:"center",
            hasControls: entry.hasControls,
            hasBorders: entry.hasBorders
        });
        
        r = _.find(canvas.horizontalElements, function(obj) { return obj.id == 'EndProgramElement' })

        //console.log(canvas.horizontalElements);

        
        elem.set({
            originX: 'center',
            originY: 'center'
        });

        
        groupProgram.addWithUpdate(elem);
    });

    canvas.add(groupProgram);

}

