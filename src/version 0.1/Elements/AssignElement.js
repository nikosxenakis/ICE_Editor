/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function AssignElement(canvas) {
    var rightBoxesList = new Array();
    var rightVarsList = new Array();
    var arithOps = new Array();
    var deleteButtons = new Array();
    var rightParenthesis = new Array();
    var leftParenthesis = new Array();
    var arithOpsCoordsLeft = new Array();

    var assignElement = new fabric.Rect({
        left: canvas.point[0],
        top: canvas.point[1],
        fill: '#00CC00',
        stroke: '#009900',
        strokeWidth: 2,
        width: 264,
        height: 83,
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });
    assignElement.functionAddNewVariable = "AddLeftVar";
    assignElement.type0 = "element";
    assignElement.id3 = "assignElement";
    assignElement.id2 = "assign";
    assignElement.firstElement = assignElement;
    assignElement.arithOpsCoordsLeft = arithOpsCoordsLeft;
    assignElement.rightParenthesis = rightParenthesis;
    assignElement.leftParenthesis = leftParenthesis;
    assignElement.arithOps = arithOps;
    assignElement.hasLogicExprError = false;
    assignElement.rightBoxesList = rightBoxesList;
    canvas.horizontalElements.push(assignElement);
    canvas.add(assignElement);

    var newInsideElement = new CreateInsideElement();
    newInsideElement.InsideElement(assignElement.left + 14, assignElement.top + 28, 218, '#009900', 48);
    var insideElement = newInsideElement.insideElement;
    insideElement.id2 = "assign";
    insideElement.firstElement = assignElement;
    insideElement.id3 = "insideElement";
    assignElement.insideElement = insideElement;
    canvas.horizontalElements.push(insideElement);
    canvas.add(insideElement);

    var newLeftAssignmentBox = new CreateBox();
    newLeftAssignmentBox.InitBox(assignElement.left + 24, assignElement.top + 39);
    var leftAssignmentBox = newLeftAssignmentBox.box;
    leftAssignmentBox.id2 = "assign";
    leftAssignmentBox.id3 = "leftAssignmentBox";
    leftAssignmentBox.firstElement = assignElement;
    canvas.horizontalElements.push(leftAssignmentBox);
    canvas.add(leftAssignmentBox);

    leftAssignmentBox.downClicked = function() {

        canvas.element = assignElement;
        canvas.insideElement = insideElement;
        canvas.leftBox = this;
        canvas.leftVar = leftVar;
        canvas.groupAddBox = newGroupAddBox;
        canvas.arithOps = arithOps;
        canvas.rightBoxesList = rightBoxesList;
        canvas.rightVarsList = rightVarsList;
        canvas.elementText = textAssign;
        canvas.rightVar = rightVar;
        canvas.groupArrow = groupArrow;
        canvas.deleteButtons = deleteButtons;

        SetDropDownMenuPosition("#definedVars", this.left, this.top + this.height + 8);
    };
    var newLeftVar = new CreateText();
    newLeftVar.Text(leftAssignmentBox.left + 30, leftAssignmentBox.top + 7);
    var leftVar = newLeftVar.text;
    leftVar.id2 = "assign";
    leftVar.id3 = "leftVar";
    leftVar.firstElement = assignElement;
    canvas.horizontalElements.push(leftVar);
    canvas.add(leftVar);
    leftVar.downClicked = function() {
        leftAssignmentBox.downClicked();
    };

    canvas.on('mouse:over', function(e) {
        guiobj = e.target;

        if (guiobj === leftVar || guiobj === leftAssignmentBox) {

            newLeftAssignmentBox.OnMouseOver();
            canvas.renderAll();

        }
        else if (guiobj === rightVar || guiobj === rightAssigmentBox) {
            newRightAssigmentBox.OnMouseOver();
            canvas.renderAll();

        }
        else if (guiobj === groupAddBox && rightVarsList[rightVarsList.length - 1].text !== "" && leftVar.text !== "") {

            newGroupAddBox.OnMouseOver();
            canvas.renderAll();
        }

    });

    canvas.on('mouse:out', function(e) {
        guiobj = e.target;
        if (guiobj === leftVar || guiobj === leftAssignmentBox) {
            newLeftAssignmentBox.OnMouseOut();
            canvas.renderAll();
        }
        else if (guiobj === rightVar || guiobj === rightAssigmentBox) {
            newRightAssigmentBox.OnMouseOut();
            canvas.renderAll();
        }
        else if (guiobj === groupAddBox && rightVarsList[rightVarsList.length - 1].text !== "" && leftVar.text !== "") {

            newGroupAddBox.OnMouseOut();
            canvas.renderAll();
        }

    });
    var newRightAssigmentBox = new CreateBox();
    newRightAssigmentBox.InitBox(assignElement.left + 150, assignElement.top + 39);
    var rightAssigmentBox = newRightAssigmentBox.box;
    rightAssigmentBox.id2 = "assign";
    rightAssigmentBox.id3 = "newRightBox";
    rightAssigmentBox.firstElement = assignElement;
    rightAssigmentBox.downClicked = function() {
        ShowDefinedVarsList(rightVar, this);
    };
    canvas.horizontalElements.push(rightAssigmentBox);
    canvas.add(rightAssigmentBox);
    rightBoxesList.push(rightAssigmentBox);
    var rightVar1 = new CreateText();
    rightVar1.Text(rightAssigmentBox.left + 29, rightAssigmentBox.top + 7);
    var rightVar = rightVar1.text;

    rightVar.downClicked = function() {
        rightAssigmentBox.downClicked();
    };
    rightVar.id2 = "assign";
    rightVar.id3 = "rightVar";
    rightVar.firstElement = assignElement;
    rightVar.isEditable = false;
    rightVarsList.push(rightVar);

    var newGroupAddBox = new CreateAddBox();
    newGroupAddBox.AddBox(insideElement.left + insideElement.width + 1, insideElement.top + insideElement.height - 18.50);
    var groupAddBox = newGroupAddBox.groupAddBox;
    groupAddBox.id = "groupAddBox";
    //groupAddBox.id3 = "groupAddBox";
    groupAddBox.id2 = "assign";
    groupAddBox.firstElement = assignElement;
    canvas.horizontalElements.push(groupAddBox);
    canvas.add(groupAddBox);

    canvas.horizontalElements.push(rightVar);
    canvas.add(rightVar);
    groupAddBox.downClicked = function() {
        newGroupAddBox.OnMouseDown();

        if (rightVarsList[rightVarsList.length - 1].text !== "" && leftVar.text !== "") {
            var newArithOp = new CreateTextOperator();
            newArithOp.Text(groupAddBox.left, leftVar.top - 3, "+");
            var arithOp = newArithOp.text;
            arithOp.id2 = "assign";
            arithOp.id3 = "arithOp";
            arithOp.firstElement = assignElement;
            arithOp.downClicked = function() {
                canvas.arithOp = this;
                canvas.rightBox = newRightBox;

                SetDropDownMenuPosition("#arithOps", this.left - 7, this.top + 30);
            };
            canvas.on('mouse:over', function(e) {
                guiobj = e.target;

                if (guiobj === arithOp) {
                    newArithOp.OnMouseOver();
                    canvas.renderAll();

                }
                else if (guiobj === newRightVar || guiobj === newRightBox) {

                    newRightBox1.OnMouseOver();
                    canvas.renderAll();
                }
            

            });
            canvas.on('mouse:out', function(e) {
                guiobj = e.target;
                if (guiobj === arithOp) {

                    newArithOp.OnMouseOut();
                    canvas.renderAll();
                }
                else if (guiobj === newRightVar || guiobj === newRightBox) {

                    newRightBox1.OnMouseOut();
                    canvas.renderAll();
                }
             

            });

            var newRightVar1 = new CreateText();
            newRightVar1.Text(groupAddBox.left + 55, leftVar.top);
            var newRightVar = newRightVar1.text;
            newRightVar.id2 = "assign";
            newRightVar.id3 = "newRightVar";
            newRightVar.firstElement = assignElement;
            newRightVar.downClicked = function() {
                newRightBox.downClicked();
            };
            newRightVar.isEditable = false;
            var newRightBox1 = new CreateBox();
            newRightBox1.InitBox(groupAddBox.left + 26, leftAssignmentBox.top);
            var newRightBox = newRightBox1.box;
            newRightBox.id = "newRightBox";
            newRightBox.id2 = "assign";
            newRightBox.id3 = "newRightBox";
            newRightBox.firstElement = assignElement;
            newRightBox.downClicked = function() {
                ShowDefinedVarsList(newRightVar, this);
            };
            canvas.add(newRightBox);
            rightBoxesList.push(newRightBox);
            canvas.horizontalElements.push(newRightBox);
            canvas.add(newRightVar);
            canvas.horizontalElements.push(newRightVar);
            var groupDeleteButton2 = new CreateDeleteButton(canvas);
            groupDeleteButton2.DeleteButton(newRightBox.top, newRightBox.oCoords.tr.x - 11.00);
            var groupDeleteButton = groupDeleteButton2.groupDeleteButton;
            groupDeleteButton.downClicked = function() {
                DeleteRightBox(newRightBox, newRightVar, this);
            };
            groupDeleteButton.id = "groupDeleteButton";
            groupDeleteButton.id2 = "assign";
            groupDeleteButton.id3 = "groupDeleteButton";
            groupDeleteButton.firstElement = assignElement;
            if (deleteButtons.length === 0) {

                var groupDeleteButton3 = new CreateDeleteButton(canvas);
                groupDeleteButton3.DeleteButton(rightBoxesList[0].top, rightBoxesList[0].left + rightBoxesList[0].width - 9);
                var groupDeleteButton1 = groupDeleteButton3.groupDeleteButton;
                groupDeleteButton1.downClicked = function() {
                    DeleteRightBox(rightBoxesList[0], rightVarsList[0], this);
                };
                groupDeleteButton1.id2 = "assign";
                groupDeleteButton1.firstElement = assignElement;
                groupDeleteButton1.id = "groupDeleteButton1";
                groupDeleteButton1.id3 = "groupDeleteButton1";
                rightBoxesList[0].id = "newRightBox1";
                deleteButtons.push(groupDeleteButton1);
                canvas.horizontalElements.push(groupDeleteButton1);
                canvas.add(groupDeleteButton1);
            }

            deleteButtons.push(groupDeleteButton);
            arithOps.push(arithOp);
            //here we hold the right left coords of every op
            arithOpsCoordsLeft.push(new Array({arithOp: "+", left: arithOp.left},
            {arithOp: "-", left: arithOp.left + 3}, {arithOp: "/", left: arithOp.left + 3.5},
            {arithOp: "*", left: arithOp.left + 3}, {arithOp: "%", left: arithOp.left - 3}));

            rightVarsList.push(newRightVar);

            canvas.horizontalElements.push(arithOp);
            canvas.horizontalElements.push(groupDeleteButton);


            MakeNewRightBoxTransformations(canvas, assignElement, insideElement, textAssign, groupAddBox);
            canvas.add(arithOp);
            canvas.add(groupDeleteButton);

            ShowDefinedVarsList(newRightVar, newRightBox);
        }
        LogicExprIsBalanced(assignElement, canvas);
    };

    var textAssign = new fabric.Text("Assign", {
        left: assignElement.left + 99,
        top: assignElement.top + 5,
        fill: '#000066',
        fontSize: '19',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    textAssign.id2 = "assign";
    textAssign.id3 = "textAssign";
    textAssign.firstElement = assignElement;
    assignElement.elementText = textAssign;

    canvas.horizontalElements.push(textAssign);
    canvas.add(textAssign);

    var arrowTriangle = new fabric.Triangle({
        width: 18,
        height: 15,
        fill: 'blue',
        left: leftAssignmentBox.left + 86,
        top: leftAssignmentBox.top + 26,
        angle: -90
    });

    var arrow = new fabric.Rect({
        left: leftAssignmentBox.oCoords.tr.x + 28,
        top: leftAssignmentBox.top + 12,
        fill: 'blue',
        width: 16,
        height: 8
    });


    var groupArrow = new fabric.Group(
            [arrowTriangle, arrow],
            {
                hasControls: false,
                lockMovementX: true,
                lockMovementY: true,
                hasBorders: false
            });

    groupArrow.id2 = "assign";
    groupArrow.firstElement = assignElement;
    groupArrow.id1 = "groupArrow";
    groupArrow.id3 = "groupArrow";

    canvas.horizontalElements.push(groupArrow);
    canvas.add(groupArrow);

    canvas.SetCanvasWidth(assignElement, 50, canvas);

    function ShowDefinedVarsList(rightVar, rightBox) {
        canvas.element = assignElement;
        canvas.insideElement = insideElement;
        canvas.groupAddBox = newGroupAddBox;
        canvas.rightBox = rightBox;
        canvas.rightVar = rightVar;
        canvas.arithOps = arithOps;
        canvas.rightBoxesList = rightBoxesList;
        canvas.deleteButtons = deleteButtons;
        canvas.rightVarsList = rightVarsList;
        canvas.elementText = textAssign;
        canvas.leftVar = leftVar;
        canvas.vplStmt = "assign";
        if (canvas.rightVar.isEditable === true) {
            $('#edit').show();

        } else {
            $('#edit').hide();
        }
        $('#rightParenthesis').show();
        $('#leftParenthesis').show();
        SetDropDownMenuPosition("#addVarsEdit", rightBox.left, rightBox.top + rightBox.height + 8);
    }
    function DeleteRightBox(rightBox, rightVar, deleteButton) {
        canvas.element = assignElement;
        canvas.insideElement = insideElement;
        canvas.groupAddBox = newGroupAddBox;
        canvas.rightBox = rightBox;
        canvas.rightVar = rightVar;
        canvas.arithOps = arithOps;
        canvas.rightBoxesList = rightBoxesList;
        canvas.deleteButtons = deleteButtons;
        canvas.rightVarsList = rightVarsList;
        canvas.elementText = textAssign;
        canvas.deleteButtonClicked = deleteButton;
        DeleteRightBoxTransformations(canvas);
        if (rightVarsList[rightVarsList.length - 1].text !== "") {
            newGroupAddBox.SetColorEnabledButton();

        }
    }

}

function SetArithOp(arithOp, canvas) {
    var index = canvas.arithOp.firstElement.arithOps.indexOf(canvas.arithOp);

    if (arithOp === "+") {
        canvas.arithOp.setLeft(canvas.arithOp.firstElement.arithOpsCoordsLeft[index][0].left);
        canvas.arithOp.setTop(canvas.rightBox.top + 4);
    }
    else if (arithOp === "-") {
        canvas.arithOp.setLeft(canvas.arithOp.firstElement.arithOpsCoordsLeft[index][1].left);
        canvas.arithOp.setTop(canvas.rightBox.top + 2);
    }
    else if (arithOp === "/") {
        canvas.arithOp.setLeft(canvas.arithOp.firstElement.arithOpsCoordsLeft[index][2].left);
        canvas.arithOp.setTop(canvas.rightBox.top + 2);
    }
    else if (arithOp === "*") {
        canvas.arithOp.setLeft(canvas.arithOp.firstElement.arithOpsCoordsLeft[index][3].left);
        canvas.arithOp.setTop(canvas.rightBox.top + 9);
    }
    else if (arithOp === "%") {
        canvas.arithOp.setLeft(canvas.arithOp.firstElement.arithOpsCoordsLeft[index][4].left);
        canvas.arithOp.setTop(canvas.rightBox.top + 2);
    }
    canvas.arithOp.setText(arithOp);
    canvas.renderAll();
}