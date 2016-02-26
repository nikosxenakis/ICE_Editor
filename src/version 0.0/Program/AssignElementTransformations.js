/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function  AddLeftVarTransformations(canvas, previousLeftVarTrX) {
    var leftVarTrX = canvas.leftVar.oCoords.tr.x;
    var offset1 = previousLeftVarTrX - leftVarTrX;
    var offset2 = leftVarTrX - previousLeftVarTrX;

    if (leftVarTrX > previousLeftVarTrX) {

        AssignElementItemsTranslations(canvas, offset2);
        canvas.SetCanvasWidth(canvas.element, offset2);

    } else if (leftVarTrX < previousLeftVarTrX) {

        AssignElementItemsTranslations(canvas, -offset1);

    }

}

function AssignElementItemsTranslations(canvas, offset) {

    canvas.element.setWidth(canvas.element.getWidth() + (offset)).setCoords();
    canvas.insideElement.setWidth(canvas.insideElement.getWidth() + (offset)).setCoords();
    canvas.leftBox.setWidth(canvas.leftBox.getWidth() + (offset)).setCoords();
    canvas.groupArrow.setLeft(canvas.groupArrow.getLeft() + (offset)).setCoords();

    canvas.groupAddBox.groupAddBox.setLeft(canvas.groupAddBox.groupAddBox.getLeft() + (offset)).setCoords();

    var offset4 = ((canvas.element.oCoords.tr.x - canvas.element.oCoords.tl.x) - (canvas.elementText.oCoords.tr.x - canvas.elementText.oCoords.tl.x)) / 2;
    canvas.elementText.setLeft(offset4 + canvas.element.oCoords.tl.x).setCoords();

    var index = 0;
    canvas.arithOps.forEach(function(arithOp) {

        arithOp.setLeft(arithOp.getLeft() + (offset)).setCoords();

        canvas.element.arithOpsCoordsLeft[index].forEach(function(arithOpsCoordsLeftElementItem) {
            arithOpsCoordsLeftElementItem.left = arithOpsCoordsLeftElementItem.left + offset;
        });
        index++;

    });


    canvas.rightBoxesList.forEach(function(rightBox) {
        rightBox.setLeft(rightBox.getLeft() + (offset)).setCoords();

    });
    canvas.rightVarsList.forEach(function(rightVar) {
        rightVar.setLeft(rightVar.getLeft() + (offset)).setCoords();

    });
    if (canvas.element.id3 !== "array") {
        canvas.element.rightParenthesis.forEach(function(rightParenthesis) {
            rightParenthesis.setLeft(rightParenthesis.getLeft() + (offset)).setCoords();

        });
        canvas.element.leftParenthesis.forEach(function(leftParenthesis) {
            leftParenthesis.setLeft(leftParenthesis.getLeft() + (offset)).setCoords();

        });
    }
    canvas.deleteButtons.forEach(function(deleteButton) {
        deleteButton.setLeft(deleteButton.getLeft() + (offset)).setCoords();

    });
    if (canvas.object) {
        canvas.deleteButton.SetPosition(canvas.object);
    }
}

function AddAssignVal(canvas, offset) {
   
    if (canvas.element.type3 !== "foreach") {
        var offset4 = ((canvas.element.oCoords.tr.x - canvas.element.oCoords.tl.x) - (canvas.elementText.oCoords.tr.x - canvas.elementText.oCoords.tl.x)) / 2;
        canvas.elementText.setLeft(offset4 + canvas.element.oCoords.tl.x).setCoords();
    }
    else {
        canvas.elementText.setLeft(offset + canvas.elementText.left).setCoords();
    }
    var index = 0;
    canvas.arithOps.forEach(function(arithOp) {
        if (arithOp.getLeft() > canvas.rightBox.getLeft()) {
            arithOp.setLeft(arithOp.getLeft() + (offset)).setCoords();
            if(canvas.element.arithOpsCoordsLeft){
            canvas.element.arithOpsCoordsLeft[index].forEach(function(arithOpsCoordsLeftElementItem) {
                arithOpsCoordsLeftElementItem.left = arithOpsCoordsLeftElementItem.left + offset;
            });
        }
        }
        index++;
    });


}

function MakeNewRightBoxTransformations(canvas, assignElement, insideElement, textAssign, groupAddBox) {
    assignElement.setWidth(assignElement.getWidth() + 110).setCoords();
    insideElement.setWidth(insideElement.getWidth() + 110).setCoords();
    groupAddBox.setLeft(groupAddBox.getLeft() + 110).setCoords();

    if (textAssign.getText() === "Assign")
        textAssign.setText("Calculate and Assign");
    else

    {
        var offset4 = ((assignElement.oCoords.tr.x - assignElement.oCoords.tl.x) - (textAssign.oCoords.tr.x - textAssign.oCoords.tl.x)) / 2;

        textAssign.setLeft(offset4 + assignElement.oCoords.tl.x).setCoords();
    }
    canvas.SetCanvasWidth(assignElement, 110);
    canvas.renderAll();
    if (canvas.object) {
        canvas.deleteButton.SetPosition(canvas.object);
    }
}

function DeleteRightBoxTransformations(canvas) {
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
                canvas.element.arithOpsCoordsLeft.splice(canvas.element.arithOpsCoordsLeft.length - 1, 1);
            }
            else {
                arithOpLeft = canvas.arithOps[index].left;
                canvas.remove(canvas.arithOps[index]);
                DeleteElementFromArray(canvas.arithOps[index], canvas.horizontalElements);
                for (var index1 = index + 1; index1 < canvas.arithOps.length; index1++) {
                    canvas.arithOps[index1].setLeft(canvas.arithOps[index1].getLeft() - (canvas.rightBoxesList[index].getWidth() + 40)).setCoords();
                    canvas.element.arithOpsCoordsLeft[index1].forEach(function(arithOpsCoordsLeftElementItem) {
                        arithOpsCoordsLeftElementItem.left = arithOpsCoordsLeftElementItem.left - (canvas.rightBoxesList[index].getWidth() + 40);
                    });
                }
                canvas.arithOps.splice(index, 1);
                canvas.element.arithOpsCoordsLeft.splice(index, 1);
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
                canvas.elementText.setText("Assign");

            }
            break;
        }
    }

    for (var index = 0; index < canvas.element.rightParenthesis.length; index++) {
        if (canvas.element.rightParenthesis[index].left > canvas.rightBox.left && canvas.element.rightParenthesis[index].left < arithOpLeft)
            canvas.element.rightParenthesis[index].setLeft(canvas.element.rightParenthesis[index].getLeft() - canvas.rightBox.width - 8).setCoords();
        else if (canvas.element.rightParenthesis[index].left > canvas.rightBox.left && canvas.element.rightParenthesis[index].left > arithOpLeft)
            canvas.element.rightParenthesis[index].setLeft(canvas.element.rightParenthesis[index].getLeft() - offset).setCoords();
        else if (canvas.element.rightParenthesis[index].left < canvas.rightBox.left && canvas.element.rightParenthesis[index].left > arithOpLeft)
            canvas.element.rightParenthesis[index].setLeft(canvas.element.rightParenthesis[index].getLeft() - 33).setCoords();

    }

    for (var index = 0; index < canvas.element.leftParenthesis.length; index++) {

        if (canvas.element.leftParenthesis[index].left < canvas.rightBox.left && canvas.element.leftParenthesis[index].left > arithOpLeft) {
            canvas.element.leftParenthesis[index].setLeft(canvas.element.leftParenthesis[index].getLeft() - 33).setCoords(); //for last right box 
        }
        else if (canvas.element.leftParenthesis[index].left > canvas.rightBox.left && canvas.element.leftParenthesis[index].left < arithOpLeft) {
            canvas.element.leftParenthesis[index].setLeft(canvas.element.leftParenthesis[index].getLeft() - canvas.rightBox.width - 6).setCoords();

        }
        else if (canvas.element.leftParenthesis[index].left > canvas.rightBox.left && canvas.element.leftParenthesis[index].left > arithOpLeft) {
            canvas.element.leftParenthesis[index].setLeft(canvas.element.leftParenthesis[index].getLeft() - offset).setCoords();

        }
    }

    canvas.element.setWidth(canvas.element.getWidth() - offset).setCoords();
    canvas.insideElement.setWidth(canvas.insideElement.getWidth() - offset).setCoords();
    canvas.groupAddBox.groupAddBox.setLeft(canvas.groupAddBox.groupAddBox.getLeft() - offset).setCoords();
    var offset1 = ((canvas.element.oCoords.tr.x - canvas.element.oCoords.tl.x) - (canvas.elementText.oCoords.tr.x - canvas.elementText.oCoords.tl.x)) / 2;
    canvas.elementText.setLeft((canvas.element.oCoords.tl.x + offset1)).setCoords();
    LogicExprIsBalanced(canvas.element, canvas);
    if (canvas.object) {
        canvas.deleteButton.SetPosition(canvas.object);
    }
}