/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Canvas(width, height) {

    this.canvas = new fabric.Canvas('canvas', {
        hoverCursor: 'pointer',
        selection: false
    });
    var c = this.canvas;
    var deleteButton1 = new CreateDeleteButton(this.canvas);
    deleteButton1.DeleteButton(50, 50);
    this.canvas.deleteButton = deleteButton1.groupDeleteButton;
    this.canvas.deleteButton.SetPosition = function(object) {
        this.left = object.oCoords.tr.x - 1;
        this.top = object.top + 1;
    };

    this.canvas.deleteButton.downClicked = function() {
        c.rightClickedElement = this.element;
        var length;
        if (c.rightClickedElement.firstElement.type3 === "waituntil")
            length = c.rightClickedElement.firstElement.height + 3;
        else if (c.rightClickedElement.firstElement.id2 === "assign")
            length = c.rightClickedElement.firstElement.height + 4;
        else if (c.rightClickedElement.firstElement.id2 === "flowcontrol1")
            length = (c.rightClickedElement.firstElement.endElement.height + c.rightClickedElement.firstElement.endElement.top - c.rightClickedElement.firstElement.top) + 3;
        else
            length = c.rightClickedElement.firstElement.height + 2;


        DeleteTranslateElement(c, true, "", "", length);
        c.renderAll();
    };
    this.canvas.deleteButton.id2 = "deleteButtonElement";
    this.canvas.setHeight(height);
    this.canvas.setWidth(width);

    /* $("canvas").contextmenu(function(env) {
     var x = env.offsetX; //get click coordinates
     var y = env.offsetY;
     var items = c._objects;
     for (var i = 0; i < items.length; i++) {
     var d = items[i].width;
     var h = items[i].height;
     if (x >= (items[i].left) && x <= (items[i].left + d) && y >= (items[i].top) &&
     y <= (items[i].top + h)) {
     if ((c.item(i).id2 === "assign" || c.item(i).id === "doNothing" || c.item(i).id2 === "flowcontrol1")) {
     $(".ui-dialog-content").dialog("close");
     $(".menu").hide();
     if (c.item(i).id === "groupLogicExprError")
     c.rightClickedElement = c.item(i).mainElement;
     else
     c.rightClickedElement = c.item(i);
     $('#parenthesis').hide();
     $('#deleteElement').show();
     SetDropDownMenuPosition("#rightClickMenu", x, y);
     return false;
     }
     }
     }
     return false; //stops the event propagation
     });*/
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

    this.canvas.on(
            'mouse:down',
            function(options) {

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
            }
    );

    this.canvas.on(
            'mouse:move',
            function(options) {
                if (options.target)
                    guiobj = options.target;
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
            }
    );

    this.canvas.on(
            'mouse:up',
            function() {

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

            }
    );

    this.canvas.SetCanvasHeight = function(element, length) {

        if (element.getTop() + element.getHeight() > this.getHeight() - length) {
            this.setHeight(this.getHeight() + 20);
        }
    };
    this.canvas.SetCanvasWidth = function(element, length) {

        if (element.getLeft() + element.getWidth() > this.getWidth() - length) {
            this.setWidth(this.getWidth() + length);
        }
    };
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
    this.canvas.verticalElements = new Array();
    this.canvas.horizontalElements = new Array();
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
}

function ProgramElement(canvas) {

    var startElement = new fabric.Rect({
        left: 50,
        top: 50,
        fill: '#0066FF',
        width: 260,
        height: 50,
        selectable: false
    });
    startElement.type0 = "element";
    startElement.type2 = "start";
    startElement.type3 = "startElement";
    canvas.horizontalElements.push(startElement);
    canvas.add(startElement);

    var bodyElement = new fabric.Rect({
        left: startElement.left - 24,
        top: startElement.top,
        fill: '#0066FF',
        width: 25,
        height: 156,
        selectable: false
    });
    canvas.verticalElements.push(bodyElement);
    canvas.add(bodyElement);

    var endElement = new fabric.Rect({
        left: startElement.left,
        top: bodyElement.top + bodyElement.height - 50,
        fill: '#0066FF',
        width: startElement.width - 60,
        height: startElement.height,
        selectable: false
    });
    endElement.type0 = "element";
    endElement.id = "element1";
    endElement.type2 = "end";
    canvas.horizontalElements.push(endElement);
    canvas.add(endElement);

    var textEnd = new fabric.Text("END", {
        left: endElement.left + 103,
        top: endElement.top + 14,
        fill: 'white',
        fontSize: '21',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        selectable: false
    });

    canvas.horizontalElements.push(textEnd);
    canvas.add(textEnd);

    var textStart = new fabric.Text("START", {
        left: startElement.left - 2,
        top: startElement.top + 15,
        fill: 'white',
        fontSize: '21',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        selectable: false
    });
    canvas.add(textStart);
    canvas.horizontalElements.push(textStart);

    var textProgramNameStart = new fabric.Text("Program", {
        left: textStart.oCoords.tr.x + 35,
        top: startElement.top + 15,
        fill: 'white',
        fontSize: '21',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });
    textProgramNameStart.id = "Program_Name";

    textProgramNameStart.downClicked = function(x) {
        $("#name").val(textProgramNameStart.getText());
        SetDialogPosition(textProgramNameStart, "#dialog");

        ChangeProgramName(textProgramNameStart, textProgramNameEnd, textEnd, canvas, startElement, endElement);
    };
    textProgramNameStart.mouseOver = function() {
        this.fill = '#CCCC33';
        canvas.renderAll();
    };

    textProgramNameStart.mouseOut = function() {
        this.fill = 'white';
        canvas.renderAll();

    };

    canvas.add(textProgramNameStart);
    canvas.horizontalElements.push(textProgramNameStart);

    var textProgramNameEnd = new fabric.Text("Program", {
        left: textStart.left,
        top: endElement.top + 14,
        fill: '#E0E0E0',
        fontSize: '21',
        fontFamily: ' Arial',
        selectable: false

    });
    canvas.add(textProgramNameEnd);
    canvas.horizontalElements.push(textProgramNameEnd);

    canvas.point[0] = 54;
    canvas.point[1] = 103;
    canvas.startElement = startElement;
    canvas.endElement = endElement;
    startElement.bodyElement = bodyElement;
    DoNothingElement(canvas);
    canvas.codeFolding = new CodeFolding();
    canvas.codeFolding.initCodeFoldingButton(startElement.top + startElement.height - 10, canvas, 54, startElement);
}

function SortArray(array) {

    array.sort(function(a, b) {
        if (a.top > b.top) {
            return 1;
        }
        if (a.top < b.top) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

}