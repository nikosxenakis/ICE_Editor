/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function MakeNewCompExprTransformations(canvas, offset) {

    canvas.element.setWidth(canvas.element.getWidth() + offset).setCoords();
    canvas.elementText.setLeft(canvas.elementText.getLeft() + offset).setCoords();
    canvas.insideElement.setWidth(canvas.insideElement.getWidth() + offset).setCoords();
    canvas.groupAddBox.setLeft(canvas.insideElement.oCoords.tr.x - 1).setCoords();

    canvas.SetCanvasWidth(canvas.element, offset);
     if (canvas.object) {
                    canvas.deleteButton.SetPosition(canvas.object);
                }
    canvas.renderAll();
    
}

function FlowControlElementItemsTranslations(canvas, offset) {

    canvas.elementText.setLeft(canvas.elementText.getLeft() + (offset)).setCoords();

    _.each(canvas.compOps, function(compOp) {
        if (compOp.getLeft() > canvas.rightBox.getLeft())
            compOp.setLeft(compOp.getLeft() + (offset)).setCoords();

    });

    _.each(canvas.logicOps, function(logicOp) {
        if (logicOp.getLeft() > canvas.boxCompExpr.getLeft())
            logicOp.setLeft(logicOp.getLeft() + (offset)).setCoords();

    });

    _.each(canvas.boxesCompExprs, function(boxCompExpr) {
        if (boxCompExpr.getLeft() > canvas.boxCompExpr.getLeft())
            boxCompExpr.setLeft(boxCompExpr.getLeft() + (offset)).setCoords();

    });
}

function  DeleteCompExpr(canvas) {

    var offset = canvas.boxCompExpr.getWidth() + 54;
    var logicOpLeft;
    for (var index = 0; index < canvas.rightBoxesList.length; index++) {
        if (canvas.rightBoxesList[index] === canvas.leftBox) {
            canvas.remove(canvas.rightBoxesList[index]);    //delete left box
            DeleteElementFromArray(canvas.rightBoxesList[index], canvas.horizontalElements);
            canvas.remove(canvas.rightBoxesList[index + 1]);    //and delete right box
            DeleteElementFromArray(canvas.rightBoxesList[index + 1], canvas.horizontalElements);

            canvas.remove(canvas.rightVarsList[index]);            //delete leftVar
            DeleteElementFromArray(canvas.rightVarsList[index], canvas.horizontalElements);
            canvas.remove(canvas.rightVarsList[index + 1]);   //and delete rightVar
            DeleteElementFromArray(canvas.rightVarsList[index + 1], canvas.horizontalElements);

            for (var index1 = index + 2; index1 < canvas.rightBoxesList.length; index1++) {
                canvas.rightBoxesList[index1].setLeft(canvas.rightBoxesList[index1].getLeft() - (offset)).setCoords();
                canvas.rightVarsList[index1].setLeft(canvas.rightVarsList[index1].getLeft() - offset).setCoords();

            }
            canvas.rightBoxesList.splice(index, 2);
            canvas.rightVarsList.splice(index, 2);

            break;
        }
    }

    for (var index = 0; index < canvas.deleteButtons.length; index++) {

        if (canvas.deleteButtons[index] === canvas.deleteButtonClicked) {
            canvas.remove(canvas.deleteButtons[index]);   //delete deletebutton
            DeleteElementFromArray(canvas.deleteButtons[index], canvas.horizontalElements);

            canvas.remove(canvas.compOps[index]);   //delete  compOp
            DeleteElementFromArray(canvas.compOps[index], canvas.horizontalElements);

            if (index === canvas.compOps.length - 1)
            {                                             //delete logicOp
                if (canvas.logicOps.length > 0)
                    logicOpLeft = canvas.logicOps[canvas.logicOps.length - 1].left;
                canvas.remove(canvas.logicOps[canvas.logicOps.length - 1]);
                DeleteElementFromArray(canvas.logicOps[canvas.logicOps.length - 1], canvas.horizontalElements);
                canvas.logicOps.splice(canvas.logicOps.length - 1, 1);

            }
            else {

                logicOpLeft = canvas.logicOps[index].left;
                canvas.remove(canvas.logicOps[index]);
                DeleteElementFromArray(canvas.logicOps[index], canvas.horizontalElements);
 
                for (var index1 = index + 1; index1 < canvas.logicOps.length; index1++) {
                    canvas.logicOps[index1].setLeft(canvas.logicOps[index1].getLeft() - (offset)).setCoords();

                }
                canvas.logicOps.splice(index, 1);
            }

            for (var index1 = index + 1; index1 < canvas.deleteButtons.length; index1++) {
                canvas.deleteButtons[index1].setLeft(canvas.deleteButtons[index1].getLeft() - offset).setCoords();
                canvas.compOps[index1].setLeft(canvas.compOps[index1].getLeft() - offset).setCoords();

            }
            canvas.deleteButtons.splice(index, 1);
            canvas.compOps.splice(index, 1);

            break;
        }
    }
    if (canvas.boxesCompExprs.length === 1) {
        for (var index = 0; index < canvas.element.rightParenthesis.length; index++) {

            canvas.remove(canvas.element.rightParenthesis[index]);    //delete rightParenthesis
            DeleteElementFromArray(canvas.element.rightParenthesis[index], canvas.horizontalElements);

        }
        for (var index = 0; index < canvas.element.leftParenthesis.length; index++) {

            canvas.remove(canvas.element.leftParenthesis[index]);    //delete leftParenthesis
            DeleteElementFromArray(canvas.element.leftParenthesis[index], canvas.horizontalElements);

        }
        canvas.element.rightParenthesis.length = 0;
        canvas.element.leftParenthesis.length = 0;
        
    }

    for (var index = 0; index < canvas.element.rightParenthesis.length; index++) {
        if (canvas.element.rightParenthesis[index].left > canvas.boxCompExpr.left && canvas.element.rightParenthesis[index].left < logicOpLeft)
            canvas.element.rightParenthesis[index].setLeft(canvas.element.rightParenthesis[index].getLeft() - canvas.boxCompExpr.width - 8).setCoords();
        else if (canvas.element.rightParenthesis[index].left > canvas.boxCompExpr.left && canvas.element.rightParenthesis[index].left > logicOpLeft)
            canvas.element.rightParenthesis[index].setLeft(canvas.element.rightParenthesis[index].getLeft() - offset).setCoords();
        else if (canvas.element.rightParenthesis[index].left < canvas.boxCompExpr.left && canvas.element.rightParenthesis[index].left > logicOpLeft)
            canvas.element.rightParenthesis[index].setLeft(canvas.element.rightParenthesis[index].getLeft() - 49).setCoords();

    }

    for (var index = 0; index < canvas.element.leftParenthesis.length; index++) {

        if (canvas.element.leftParenthesis[index].left < canvas.boxCompExpr.left && canvas.element.leftParenthesis[index].left > logicOpLeft) {
            canvas.element.leftParenthesis[index].setLeft(canvas.element.leftParenthesis[index].getLeft() - 47).setCoords();
           
        }
        else if (canvas.element.leftParenthesis[index].left > canvas.boxCompExpr.left && canvas.element.leftParenthesis[index].left < logicOpLeft) {
            canvas.element.leftParenthesis[index].setLeft(canvas.element.leftParenthesis[index].getLeft() - canvas.boxCompExpr.width - 3).setCoords();

        }
        else if (canvas.element.leftParenthesis[index].left > canvas.boxCompExpr.left && canvas.element.leftParenthesis[index].left > logicOpLeft) {
            canvas.element.leftParenthesis[index].setLeft(canvas.element.leftParenthesis[index].getLeft() - offset).setCoords();
   
        }
    }

    for (var index = 0; index < canvas.boxesCompExprs.length; index++) {

        if (canvas.boxesCompExprs[index] === canvas.boxCompExpr) {
            canvas.remove(canvas.boxesCompExprs[index]);    //delete boxCompExpr
            DeleteElementFromArray(canvas.boxesCompExprs[index], canvas.horizontalElements);

            for (var index1 = index + 1; index1 < canvas.boxesCompExprs.length; index1++) {
                canvas.boxesCompExprs[index1].setLeft(canvas.boxesCompExprs[index1].getLeft() - (offset)).setCoords();

            }
            canvas.boxesCompExprs.splice(index, 1);

            break;
        }
    }
    if (canvas.boxesCompExprs.length !== 0) {
        canvas.element.setWidth(canvas.element.getWidth() - offset).setCoords();
        canvas.insideElement.setWidth(canvas.insideElement.getWidth() - offset).setCoords();
        canvas.groupAddBox.groupAddBox.setLeft(canvas.groupAddBox.groupAddBox.getLeft() - offset).setCoords();
        canvas.elementText.setLeft(canvas.elementText.getLeft() - offset).setCoords();
       
    }
     LogicExprIsBalanced(canvas.element, canvas);
       if (canvas.object) {
                    canvas.deleteButton.SetPosition(canvas.object);
                }
}