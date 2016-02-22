/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function InitArray(canvas) {
    
    var rightBoxesList = new Array();
    var rightVarsList = new Array();
    var arithOps = new Array();
    var deleteButtons = new Array();

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
    assignElement.id3 = "array";
    assignElement.id2 = "assign";
    assignElement.firstElement = assignElement;
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
        canvas.arithOps = arithOps;
        canvas.groupAddBox = newGroupAddBox;
        canvas.rightBoxesList = rightBoxesList;
        canvas.rightVarsList = rightVarsList;
        canvas.elementText = textAssign;
        canvas.rightVar = rightVar;
        canvas.groupArrow = groupArrow;
        canvas.deleteButtons = deleteButtons;

        SetDropDownMenuPosition("#arrayNames", this.left, this.top + this.height + 8);
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
            newArithOp.Text(groupAddBox.left, leftVar.top - 3, ",");
            var arithOp = newArithOp.text;
            arithOp.id2 = "assign";
            arithOp.id3 = "arithOp";
            arithOp.firstElement = assignElement;
         
            canvas.on('mouse:over', function(e) {
                guiobj = e.target;
              if (guiobj === newRightVar || guiobj === newRightBox) {

                    newRightBox1.OnMouseOver();
                    canvas.renderAll();
                }
            

            });
            canvas.on('mouse:out', function(e) {
                guiobj = e.target;
             if (guiobj === newRightVar || guiobj === newRightBox) {

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
        
            rightVarsList.push(newRightVar);

            canvas.horizontalElements.push(arithOp);
            canvas.horizontalElements.push(groupDeleteButton);


            MakeNewRightBoxTransformations(canvas, assignElement, insideElement, textAssign, groupAddBox);
            canvas.add(arithOp);
            canvas.add(groupDeleteButton);

            ShowDefinedVarsList(newRightVar, newRightBox);
        }
    };

    var textAssign = new fabric.Text("Create Array", {
        left: assignElement.left + 78,
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
         $('#rightParenthesis').hide();
            $('#leftParenthesis').hide();
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
        DeleteArrayElementTransformations(canvas);
        if (rightVarsList[rightVarsList.length - 1].text !== "") {
            newGroupAddBox.SetColorEnabledButton();

        }
    }

}

function DeleteArrayElementTransformations(canvas){
   
    var offset = canvas.rightBox.getWidth() + 40;
    var arithOpLeft;

    for (var index = 0; index < canvas.rightBoxesList.length; index++) {
        if (canvas.rightBoxesList[index] === canvas.rightBox) {
            canvas.remove(canvas.rightBoxesList[index]);
            DeleteElementFromArray(canvas.rightBoxesList[index], canvas.horizontalElements);
            if (index === canvas.rightBoxesList.length - 1)//if is the last element in Array 
            {
                if (canvas.arithOps.length > 0)
                    arithOpLeft = canvas.arithOps[canvas.arithOps.length - 1].left;

                canvas.remove(canvas.arithOps[canvas.arithOps.length - 1]);
                DeleteElementFromArray(canvas.arithOps[canvas.arithOps.length - 1], canvas.horizontalElements);
                canvas.arithOps.splice(canvas.arithOps.length - 1, 1);
            }
            else {
                arithOpLeft = canvas.arithOps[index].left;
                canvas.remove(canvas.arithOps[index]);
                DeleteElementFromArray(canvas.arithOps[index], canvas.horizontalElements);
                for (var index1 = index + 1; index1 < canvas.arithOps.length; index1++) {
                    canvas.arithOps[index1].setLeft(canvas.arithOps[index1].getLeft() - (canvas.rightBoxesList[index].getWidth() + 40)).setCoords();
                }
                canvas.arithOps.splice(index, 1);
            }
            for (var index1 = index + 1; index1 < canvas.rightBoxesList.length; index1++) {
                canvas.rightBoxesList[index1].setLeft(canvas.rightBoxesList[index1].getLeft() - (canvas.rightBoxesList[index].getWidth() + 40)).setCoords();
            }
            canvas.rightBoxesList.splice(index, 1);
            break;
        }
    }

    for (var index = 0; index < canvas.rightVarsList.length; index++) {
        if (canvas.rightVarsList[index] === canvas.rightVar) {
            canvas.remove(canvas.rightVarsList[index]);
            DeleteElementFromArray(canvas.rightVarsList[index], canvas.horizontalElements);
            for (var index1 = index + 1; index1 < canvas.rightVarsList.length; index1++) {
                canvas.rightVarsList[index1].setLeft(canvas.rightVarsList[index1].getLeft() - offset).setCoords();
            }
            canvas.rightVarsList.splice(index, 1);
            break;
        }
    }


    for (var index = 0; index < canvas.deleteButtons.length; index++) {
        if (canvas.deleteButtons[index] === canvas.deleteButtonClicked) {
            canvas.remove(canvas.deleteButtons[index]);
            DeleteElementFromArray(canvas.deleteButtons[index], canvas.horizontalElements);
            for (var index1 = index + 1; index1 < canvas.deleteButtons.length; index1++) {
                canvas.deleteButtons[index1].setLeft(canvas.deleteButtons[index1].getLeft() - offset).setCoords();
            }
            canvas.deleteButtons.splice(index, 1);
            if (canvas.deleteButtons.length === 1) {
                canvas.remove(canvas.deleteButtons[0]);
                DeleteElementFromArray(canvas.deleteButtons[0], canvas.horizontalElements);
                canvas.deleteButtons.splice(0, 1);

            }
            break;
        }
    }


    canvas.element.setWidth(canvas.element.getWidth() - offset).setCoords();
    if(canvas.insideElement)
    canvas.insideElement.setWidth(canvas.insideElement.getWidth() - offset).setCoords();
    canvas.groupAddBox.groupAddBox.setLeft(canvas.groupAddBox.groupAddBox.getLeft() - offset).setCoords();
    var offset1 = ((canvas.element.oCoords.tr.x - canvas.element.oCoords.tl.x) - (canvas.elementText.oCoords.tr.x - canvas.elementText.oCoords.tl.x)) / 2;
    canvas.elementText.setLeft((canvas.element.oCoords.tl.x + offset1)).setCoords();
     LogicExprIsBalanced(canvas.element, canvas);
      if (canvas.object) {
                    canvas.deleteButton.SetPosition(canvas.object);
                }
}