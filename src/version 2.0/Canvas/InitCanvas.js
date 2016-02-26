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
        height:height
        ,width:width
    });

    //events
    this.canvas.on('mouse:over', function(e) {
          guiobj = e.target;
        if (guiobj) {

            if (guiobj.mouseOver) { //this check if doesn't exist drag and drop is anable
                guiobj.mouseOver();
            }

            this.renderAll();
        }
        if (guiobj.id2 === "doNothing" || guiobj.id2 === "assign") {
            this.deleteButton.SetPosition(guiobj.firstElement);
            if (!this.object) {
                this.add(this.deleteButton);
            }
            this.object = guiobj.firstElement;
            this.deleteButton.element = this.object;
            this.renderAll();
        } else if (guiobj.id2 === "flowcontrol1") {
            this.deleteButton.SetPosition(guiobj.mainElement);
            if (!this.object) {
                this.add(this.deleteButton);

            }
            this.object = guiobj.mainElement;
            this.deleteButton.element = this.object;
            this.renderAll();
        } else if (guiobj.id2 === "deleteButtonElement") {
            if (!this.object) {
                this.add(this.deleteButton);
            }
            if (this.deleteButton.element.firstElement.id2 !== "flowcontrol1") {
                this.rightClickedElement = this.deleteButton.element.firstElement;
                FindAboveAndUnderElements(this, this.rightClickedElement, this.itemsOfDraggableElement, true);
            } else {
                this.rightClickedElement = this.deleteButton.element;
                this.horizontalItemsOfElement.length = 0;
                this.verticalItemsOfElement.length = 0;
                FindAboveAndUnderOfFlowControlElements(this, this.rightClickedElement, this.horizontalItemsOfElement, this.verticalItemsOfElement, true);

            }
            this.renderAll();
        }
    });

    this.canvas.on('mouse:out', function(e) {
        guiobj = e.target;
        if (guiobj.mouseOut) { //this check if doesn't exist drag and drop is anable
            guiobj.mouseOut();
        }

        this.renderAll();
        if ((guiobj.id2 === "doNothing" || guiobj.id2 === "assign" || guiobj.id2 === "flowcontrol1")) {
            this.remove(this.deleteButton);
            this.object = null;

            this.renderAll();
        } else if (guiobj.id2 === "deleteButtonElement") {
            if (this.deleteButton.element.firstElement.id2 !== "flowcontrol1") {
                ChangeElementOpacity(this.itemsOfDraggableElement);
            } else {
                ChangeElementOpacity(this.horizontalItemsOfElement);
                ChangeElementOpacity(this.verticalItemsOfElement);
            }
            this.remove(this.deleteButton);
            this.renderAll();
        }
    });

this.canvas.on('mouse:down', function(options) {


});
/*
    this.canvas.on('mouse:down',function(options) {
      guiobj = options.target;
                if (guiobj) {
                    $(".ui-dialog-content").dialog("close");
                    $(".menu").hide();
                    if (guiobj.downClicked) { //this check if doesn't exist drag and drop is anable
                        guiobj.downClicked(options.e.clientX, options.e.clientY);
                    }
                    if (guiobj.id2 === "doNothing" || guiobj.id2 === "assign" || guiobj.id2 === "flowcontrol1") {

                        SetItemsOfDraggableElement(guiobj, this);
                        this.selected = true;
                        this.clicked = true;

                    }
                    this.renderAll();
                }
                else {
                    $(".menu").hide();
                    $(".ui-dialog-content").dialog("close");
                }
            
    });
*/
    this.canvas.on('mouse:move',function(options) {
        /*
        if (options.target){
            guiobj = options.target;  
        }
                if (this.clicked) {
                    CreateDragElementClone(guiobj, this);
                    this._curX = this.groupArray[0].left;
                    this._curY = this.groupArray[0].top;
                    this.clicked = false;
                    $(".ui-dialog-content").dialog("close");
                    $(".menu").hide();
                }
                if (this.selected) {
                    var _curXm = (this._curX - options.e.layerX);
                    var _curYm = (this._curY - options.e.layerY);

                    if (this.groupArray.length > 0)
                        DragAndDropCloneElement(this.groupArray, _curXm, _curYm);
                    this.renderAll();
                }
                if (this.objectMoving !== null) {

                    if (this.groupArray[0].top < this.startElement.top || this.groupArray[0].top > this.endElement.top) {
                        this.moveCursor = 'not-allowed';
                    }
                    else
                        this.moveCursor = 'move';
                    this.elementsUnderDragElement.length = 0;

                    if (this.makeIntersection) {

                        AddDoNothingElement(this.objectIntersected.left, this.objectIntersected.top, this, -4, false);
                        this.makeIntersection = false;
                    }
                    for (var i = 0; i < this.horizontalElements.length; i++) {
                        if (((this.horizontalElements[i].top > this.groupArray[0].top &&
                                this.horizontalElements[i].top <= this.groupArray[0].top + this.groupArray[0].item(0).height) || (this.horizontalElements[i].top + this.horizontalElements[i].height > this.groupArray[0].top
                                && this.horizontalElements[i].top + this.horizontalElements[i].height < this.groupArray[0].top + this.groupArray[0].item(0).height) || (this.horizontalElements[i].top < this.groupArray[0].top &&
                                this.horizontalElements[i].top + this.horizontalElements[i].height >= this.groupArray[0].top)) &&
                                (this.horizontalElements[i].type0 === "element") && ((
                                this.horizontalElements[i].left < this.groupArray[0].left &&
                                this.horizontalElements[i].left + this.horizontalElements[i].width > this.groupArray[0].left) || (
                                this.horizontalElements[i].left > this.groupArray[0].left &&
                                this.horizontalElements[i].left < this.groupArray[0].left + this.groupArray[0].item(0).width))) {
                            if (this.itemsOfDraggableElement.indexOf(this.horizontalElements[i]) >= 0 && this.objectMoving.id2 === "flowcontrol1"
                                    && this.horizontalElements[i] !== this.objectMoving.firstElement.endElement && this.horizontalElements[i] !== this.objectMoving.firstElement) {
                                ;
                            }
                            else {
                                this.elementsUnderDragElement.push(this.horizontalElements[i]);

                            }
                        }
                    }

                    if (this.elementsUnderDragElement.length > 1) {

                        SortArray(this.elementsUnderDragElement);
                        if ((this.elementsUnderDragElement[1].top <= this.elementsUnderDragElement[0].top + this.elementsUnderDragElement[0].height + 4) && !(this.elementsUnderDragElement[0].isMinus === false)) {
                            if ((this.objectMoving.id2 === "flowcontrol1" && this.elementsUnderDragElement[1] === this.objectMoving.firstElement.endElement) || this.elementsUnderDragElement[1].id === "groupLogicExprError") {
                                ;
                            }
                            else {

                                AddDoNothingElement(this.elementsUnderDragElement[1].left, this.elementsUnderDragElement[1].top, this, 4, false);
                                this.makeIntersection = true;
                                this.objectIntersected = this.elementsUnderDragElement[1];
                                this.renderAll();
                            }
                        } else {
                            this.elementsUnderDragElement.length = 0;
                        }
                    }
                }
                if (this.groupArray[0]) {
                    this._curX = this.groupArray[0].left;
                    this._curY = this.groupArray[0].top;
                }
   */         
    });

    this.canvas.on('mouse:up',function() {
         if (this.selected) {

                    if (this.makeIntersection) {
                        AddDoNothingElement(this.objectIntersected.left, this.objectIntersected.top, this, -4, false);
                        this.makeIntersection = false;
                    }

                    this.selected = false;
                    this.clicked = false;
                    if (this.objectMoving !== null)
                        SetNewPositionOfDraggableElement(this.objectMoving, this);
                    this.elementsUnderDragElement.length = 0;
                    this.objectMoving = null;
                    this.renderAll();
                }
    });

    //elements
    this.canvas.verticalElements = new Array();
    this.canvas.horizontalElements = new Array();

    this.canvas.elementsUnderDragElement = new Array();
    this.canvas.makeIntersection = false;

    /*
    this.canvas.doNothingElement;
    this.canvas.horizontalItemsOfElement = new Array();
    this.canvas.verticalItemsOfElement = new Array();
    this.canvas.codeFoldingElementsNotTranslate = new Array();
    this.canvas.notTranslateCodeFoldingElements = false;
    this.canvas.object = null;
    this.canvas.underElement = null;
    this.canvas.objectMoving = null;
    this.canvas.selected = false;
    this.canvas.parenthesisClicked;
    this.canvas.isParenthesisClicked = false;
    this.canvas.clicked = false;
    this.canvas.objectIntersected = null;
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

