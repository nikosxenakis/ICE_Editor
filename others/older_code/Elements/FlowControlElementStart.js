/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function CreateFlowControlElementStart(canvas, text1, text2, color, startElementWidth, insideElementOffset, element, id2, firstElement) {

    var boxesList = new Array();
    var varsList = new Array();
    var logicOps = new Array();
    var compOps = new Array();
    var boxesCompExprs = new Array();
    var deleteButtons = new Array();
    var rightParenthesis = new Array();
    var leftParenthesis = new Array();
    var startElement1;

    var startElement = new fabric.Rect({
        left: canvas.point[0],
        top: canvas.point[1],
        fill: color,
        width: startElementWidth,
        height: 79,
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    if (element && element.id2 === id2 && text1 === "else if") {
        startElement.firstElement = element.firstElement;
        startElement1 = startElement.firstElement;
        startElement.type2 = "else if";
        startElement.id = "element1";
    } else {
        if (firstElement) {

            startElement.firstElement = firstElement;
        } else {
            startElement.firstElement = startElement;
        }
        startElement1 = startElement.firstElement;
        startElement.type2 = "start";
    }

    startElement.type0 = "element"; //we want that for drag and drop of doNothing element

    startElement.id2 = id2;
    //  startElement.firstElement = startElement1;
    startElement.mainElement = startElement;
    startElement.rightParenthesis = rightParenthesis;
    startElement.leftParenthesis = leftParenthesis;
    startElement.logicOps = logicOps;
    startElement.boxesCompExprs = boxesCompExprs;
    startElement.hasLogicExprError = false;
    canvas.add(startElement);
    canvas.horizontalElements.push(startElement);

    var text4 = new fabric.Text(text1, {
        left: canvas.point[0] + 18,
        top: startElement.top + 31,
        fill: 'black',
        fontSize: '23',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    text4.id2 = id2;
    text4.firstElement = startElement1;
    text4.mainElement = startElement;
    canvas.add(text4);
    canvas.horizontalElements.push(text4);

    var newInsideElement = new CreateInsideElement();
    newInsideElement.InsideElement(text4.oCoords.tr.x + insideElementOffset, canvas.point[1] + 10, 185, '#989898', 60);
    var insideElement = newInsideElement.insideElement;
    insideElement.id2 = id2;
    insideElement.id3 = "insideElement";
    insideElement.firstElement = startElement1;
    insideElement.mainElement = startElement;
    startElement.insideElement = insideElement;
    canvas.add(insideElement);
    canvas.horizontalElements.push(insideElement);

    var text5 = new fabric.Text(text2, {
        left: insideElement.oCoords.tr.x + insideElementOffset,
        top: text4.top,
        fill: 'black',
        fontSize: '23',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    text5.id2 = id2;
    text5.firstElement = startElement1;
    text5.mainElement = startElement;
    canvas.add(text5);
    canvas.horizontalElements.push(text5);

    var textTrue = new fabric.Text("true", {
        left: insideElement.left + 70,
        top: text4.top - 2,
        fill: 'black',
        fontSize: '21',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    textTrue.id2 = id2;
    textTrue.firstElement = startElement1;
    textTrue.mainElement = startElement;
    canvas.add(textTrue);
    canvas.horizontalElements.push(textTrue);

    var text8 = new fabric.Text("to change condition, click ", {
        left: insideElement.left + 5,
        top: insideElement.oCoords.bl.y - 17,
        fill: '#383838 ',
        fontSize: '13',
        fontWeight: 'normal',
        fontFamily: 'Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    text8.id2 = id2;
    text8.firstElement = startElement1;
    text8.mainElement = startElement;
    canvas.add(text8);
    canvas.horizontalElements.push(text8);


    var textHere = new fabric.Text("here", {
        left: text8.oCoords.tr.x,
        top: text8.top,
        fill: 'blue',
        fontSize: '13',
        fontWeight: 'normal',
        fontFamily: 'Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    textHere.id2 = id2;
    textHere.firstElement = startElement1;
    textHere.mainElement = startElement;
    canvas.add(textHere);
    canvas.horizontalElements.push(textHere);


    textHere.downClicked = function() {
        //first we must delete the text that appear in it
        DeleteElementFromArray(textTrue, canvas.horizontalElements);
        canvas.remove(textTrue);

        DeleteElementFromArray(text8, canvas.horizontalElements);
        canvas.remove(text8);

        DeleteElementFromArray(this, canvas.horizontalElements);
        canvas.remove(this);

        var newGroupAddBox = new CreateAddBox(); //and to add button groupAddBox
        newGroupAddBox.AddBox(insideElement.left + insideElement.width + 8, insideElement.top + insideElement.height - 18);
        var groupAddBox = newGroupAddBox.groupAddBox;
        groupAddBox.downClicked = function() {
            newGroupAddBox.OnMouseDown();
            if (varsList[varsList.length - 1].text !== "" && varsList[varsList.length - 2].text !== "") {

                var logicOp = new fabric.Text("and", {
                    left: insideElement.oCoords.tr.x - 4,
                    top: insideElement.top + 22,
                    fill: '#C00000',
                    fontSize: '20',
                    fontWeight: 'bold',
                    fontFamily: ' Arial',
                    lockMovementX: true,
                    lockMovementY: true,
                    hasControls: false,
                    hasBorders: false
                });
                logicOp.downClicked = function() {   //add comp op
                    canvas.logicOp = this;
                    SetDropDownMenuPosition("#logicOps", logicOp.left - 13, this.top + 35);

                };

                logicOp.id2 = id2;
                logicOp.id3 = "logicOp";
                logicOp.firstElement = startElement1;
                logicOp.mainElement = startElement;
                canvas.horizontalElements.push(logicOp);
                canvas.add(logicOp);
                logicOps.push(logicOp);
                AddNewcompExpr(newGroupAddBox, logicOp.oCoords.tr.x + 7, insideElement.top + 7, 269);

                canvas.on('mouse:over', function(e) {
                    guiobj = e.target;
                    if (guiobj === logicOp) {
                        logicOp.fill = '#FF0033';
                        canvas.renderAll();
                    }
                });

                canvas.on('mouse:out', function(e) {
                    guiobj = e.target;
                    if (guiobj === logicOp) {
                        logicOp.fill = '#C00000';
                        canvas.renderAll();
                    }
                });
            }
        };
        groupAddBox.id2 = id2;
        groupAddBox.id = "groupAddBox";
        groupAddBox.firstElement = startElement1;
        groupAddBox.mainElement = startElement;
        canvas.horizontalElements.push(groupAddBox);
        canvas.add(groupAddBox);
        AddNewcompExpr(newGroupAddBox, insideElement.left + 9, insideElement.top + 7, 52); //add new comp expression

    };

    function AddNewcompExpr(newGroupAddBox, left, top, offset) {

        var boxCompExpr = new fabric.Rect({
            left: left,
            top: top,
            fill: 'white',
            stroke: '#D8D8D8',
            strokeWidth: 2,
            width: 215,
            height: insideElement.height - 14,
            lockMovementX: true,
            lockMovementY: true,
            hasControls: false,
            hasBorders: false
        });
        boxCompExpr.id2 = id2;
        boxCompExpr.id3 = "boxCompExpr";
        boxCompExpr.firstElement = startElement1;
        boxCompExpr.mainElement = startElement;
        canvas.horizontalElements.push(boxCompExpr);
        canvas.add(boxCompExpr);
        boxesCompExprs.push(boxCompExpr);

        var newLeftBox = new CreateBox();  //add left box
        newLeftBox.InitBox(boxCompExpr.left + 7, boxCompExpr.top + 9);
        var leftBox = newLeftBox.box;
        leftBox.id2 = id2;
        leftBox.firstElement = startElement1;
        leftBox.mainElement = startElement;
        canvas.horizontalElements.push(leftBox);
        canvas.add(leftBox);
        boxesList.push(leftBox);

        leftBox.downClicked = function() {
            ShowDefinedVarsList(leftVar, this, "left", newGroupAddBox, boxCompExpr);
        };

        var newLeftVar = new CreateText(); //add text for left box
        newLeftVar.Text(leftBox.left + 30, leftBox.top + 7);
        var leftVar = newLeftVar.text;
        leftVar.id2 = id2;
        leftVar.firstElement = startElement1;
        leftVar.mainElement = startElement;
        canvas.horizontalElements.push(leftVar);
        canvas.add(leftVar);
        varsList.push(leftVar);
        leftVar.downClicked = function() {
            ShowDefinedVarsList(this, leftBox, "left", newGroupAddBox, boxCompExpr);
        };
        leftVar.isEditable = false;

        var newCompOp = new CreateTextOperator(); //add comp op
        newCompOp.Text(leftBox.oCoords.tr.x + 14, leftVar.top - 2, "==");
        var compOp = newCompOp.text;
        compOp.downClicked = function() {
            canvas.leftBox = leftBox;
            canvas.compOp = this;
            SetDropDownMenuPosition("#compOps", this.left - 2, this.top + 30);

        };
        compOp.id2 = id2;
        compOp.firstElement = startElement1;
        compOp.mainElement = startElement;
        canvas.horizontalElements.push(compOp);
        canvas.add(compOp);
        compOps.push(compOp);

        var newRightBox = new CreateBox();  //add right box
        newRightBox.InitBox(compOp.oCoords.tr.x + 12, boxCompExpr.top + 9);
        var rightBox = newRightBox.box;
        rightBox.downClicked = function() {
            ShowDefinedVarsList(rightVar, this, "right", newGroupAddBox, boxCompExpr);
        };
        rightBox.id2 = id2;
        rightBox.firstElement = startElement1;
        rightBox.mainElement = startElement;
        canvas.horizontalElements.push(rightBox);
        canvas.add(rightBox);
        boxesList.push(rightBox);


        var newRightVar = new CreateText(); //add text for right box
        newRightVar.Text(rightBox.left + 30, leftVar.top);
        var rightVar = newRightVar.text;
        rightVar.downClicked = function() {
            ShowDefinedVarsList(this, rightBox, "right", newGroupAddBox, boxCompExpr);
        };
        rightVar.isEditable = false;
        rightVar.id2 = id2;
        rightVar.firstElement = startElement1;
        rightVar.mainElement = startElement;
        canvas.horizontalElements.push(rightVar);
        canvas.add(rightVar);
        varsList.push(rightVar);

        var groupDeleteButton2 = new CreateDeleteButton(canvas);
        groupDeleteButton2.DeleteButton(boxCompExpr.top - 5, boxCompExpr.oCoords.tr.x + 1);
        var groupDeleteButton = groupDeleteButton2.groupDeleteButton;
        groupDeleteButton.id = "groupDeleteButton";
        groupDeleteButton.downClicked = function() {
            canvas.element = startElement;
            canvas.insideElement = insideElement;
            canvas.groupAddBox = newGroupAddBox;
            canvas.compOps = compOps;
            canvas.logicOps = logicOps;
            canvas.rightBox = rightBox;
            canvas.rightVar = rightVar;
            canvas.leftBox = leftBox;
            canvas.leftVar = leftVar;
            canvas.deleteButtonClicked = this;
            canvas.boxesCompExprs = boxesCompExprs;
            canvas.rightBoxesList = boxesList;
            canvas.deleteButtons = deleteButtons;
            canvas.rightVarsList = varsList;
            canvas.elementText = text5;
            canvas.boxCompExpr = boxCompExpr;
            DeleteCompExpr(canvas);
            if (boxesCompExprs.length === 0) {
                canvas.remove(newGroupAddBox.groupAddBox);
                DeleteElementFromArray(newGroupAddBox.groupAddBox, canvas.horizontalElements);
                textTrue.setTop(text4.top - 2);   //add default condition 
                textTrue.setLeft(insideElement.left + 70);
                canvas.add(textTrue);
                canvas.horizontalElements.push(textTrue);
                text8.setTop(insideElement.oCoords.bl.y - 17);
                text8.setLeft(insideElement.left + 5);
                canvas.horizontalElements.push(text8);
                canvas.add(text8);
                textHere.setTop(insideElement.oCoords.bl.y - 17);
                textHere.setLeft(text8.oCoords.tr.x);
                canvas.horizontalElements.push(textHere);
                canvas.add(textHere);
                startElement.setWidth(startElementWidth).setCoords();
                insideElement.setWidth(185).setCoords();
                text5.setLeft(insideElement.oCoords.tr.x + insideElementOffset).setCoords();
                if (canvas.object) {
                    canvas.deleteButton.SetPosition(canvas.object);
                }
            }
            else if (varsList[varsList.length - 1].text !== "") {
                newGroupAddBox.SetColorEnabledButton();

            }
        };
        groupDeleteButton.id2 = id2;
        groupDeleteButton.firstElement = startElement1;
        groupDeleteButton.mainElement = startElement;
        canvas.horizontalElements.push(groupDeleteButton);
        canvas.add(groupDeleteButton);
        deleteButtons.push(groupDeleteButton);

        canvas.element = startElement;
        canvas.insideElement = insideElement;
        canvas.elementText = text5;
        canvas.rightBox = rightBox;
        canvas.groupAddBox = newGroupAddBox.groupAddBox;

        MakeNewCompExprTransformations(canvas, offset);

        canvas.on('mouse:over', function(e) {
            guiobj = e.target;

            if (guiobj === leftVar || guiobj === leftBox) {
                newLeftBox.OnMouseOver();
                canvas.renderAll();
            }

            else if (guiobj === rightVar || guiobj === rightBox) {
                newRightBox.OnMouseOver();
                canvas.renderAll();

            }
            else if (guiobj === newGroupAddBox.groupAddBox && varsList[varsList.length - 1].text !== "" && varsList[varsList.length - 2].text !== "") {

                newGroupAddBox.OnMouseOver();
                canvas.renderAll();
            }

            else if (guiobj === compOp) {
                newCompOp.OnMouseOver();
                canvas.renderAll();

            }
            else if (guiobj === groupDeleteButton) {
                boxCompExpr.strokeWidth = 4;
                canvas.renderAll();
            }
        });

        canvas.on('mouse:out', function(e) {
            guiobj = e.target;

            if (guiobj === leftVar || guiobj === leftBox) {
                newLeftBox.OnMouseOut();
                canvas.renderAll();
            }
            else if (guiobj === rightVar || guiobj === rightBox) {
                newRightBox.OnMouseOut();
                canvas.renderAll();
            }
            else if (guiobj === newGroupAddBox.groupAddBox && varsList[varsList.length - 1].text !== "" && varsList[varsList.length - 2].text !== "") {
                newGroupAddBox.OnMouseOut();
                canvas.renderAll();
            }

            else if (guiobj === compOp) {
                newCompOp.OnMouseOut();
                canvas.renderAll();
            }
            else if (guiobj === groupDeleteButton) {
                boxCompExpr.strokeWidth = 2;
                canvas.renderAll();
            }
        });
        LogicExprIsBalanced(startElement, canvas);
    }
    canvas.on('mouse:over', function(e) {
        guiobj = e.target;
        if (guiobj === textHere) {
            textHere.fill = '#3399FF';
            canvas.renderAll();
        }
    });

    canvas.on('mouse:out', function(e) {
        guiobj = e.target;
        if (guiobj === textHere) {
            textHere.fill = 'blue';
            canvas.renderAll();
        }
    });
    function ShowDefinedVarsList(text, Box, side, newGroupAddBox, boxCompExpr) {
        canvas.element = startElement;
        canvas.insideElement = insideElement;
        canvas.groupAddBox = newGroupAddBox;
        canvas.rightBox = Box;
        canvas.rightVar = text;
        canvas.compOps = compOps;
        canvas.logicOps = logicOps;
        canvas.boxesCompExprs = boxesCompExprs;
        canvas.rightBoxesList = boxesList;
        canvas.deleteButtons = deleteButtons;
        canvas.rightVarsList = varsList;
        canvas.elementText = text5;
        canvas.boxCompExpr = boxCompExpr;
        canvas.vplStmt = "flowControl";
        canvas.compExprSide = side;

        if (canvas.rightVar.isEditable === true) {
            $('#edit').show();

        } else {
            $('#edit').hide();
        }

        if (side === "right") {
            $('#rightParenthesis').show();
            $('#leftParenthesis').hide();

        } else {
            $('#rightParenthesis').hide();
            $('#leftParenthesis').show();
        }
        SetDropDownMenuPosition("#addVarsEdit", Box.left, Box.top + Box.height + 8);

    }
    return startElement;

}

function SetCompOp(compOp, canvas) {

    canvas.compOp.setText(compOp);
    if (compOp === "==" || compOp === "<=" || compOp === ">=") {
        canvas.compOp.setLeft(canvas.leftBox.oCoords.tr.x + 13);
    }
    else if (compOp === "!=") {
        canvas.compOp.setLeft(canvas.leftBox.oCoords.tr.x + 16);
    }
    else if (compOp === "<") {
        canvas.compOp.setLeft(canvas.leftBox.oCoords.tr.x + 18);
    }

    else if (compOp === ">") {
        canvas.compOp.setLeft(canvas.leftBox.oCoords.tr.x + 21);

    }
    canvas.renderAll();
}

function SetLogicOp(logicOp, canvas) {
    var prevLogicOp = canvas.logicOp.getText();
    canvas.logicOp.setText(logicOp);

    if (logicOp === "and") {
        if (prevLogicOp === "or")
            canvas.logicOp.setLeft(canvas.logicOp.left - 6);
    }
    else if (logicOp === "or") {
        if (prevLogicOp === "and")
            canvas.logicOp.setLeft(canvas.logicOp.left + 6);
    }

    canvas.renderAll();
}