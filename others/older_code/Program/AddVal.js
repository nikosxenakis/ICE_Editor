/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function AddVal(canvas, previousRightVarTrX) {

    var rightVarTrX = canvas.rightVar.oCoords.tr.x;
    var offset1 = previousRightVarTrX - rightVarTrX;
    var offset2 = rightVarTrX - previousRightVarTrX;

    if (rightVarTrX > previousRightVarTrX) {
        canvas.element.setWidth(canvas.element.getWidth() + (offset2)).setCoords();
        if(canvas.insideElement)
        canvas.insideElement.setWidth(canvas.insideElement.getWidth() + (offset2)).setCoords();
        canvas.rightBox.setWidth(canvas.rightBox.getWidth() + (offset2)).setCoords();

        canvas.groupAddBox.groupAddBox.setLeft(canvas.groupAddBox.groupAddBox.getLeft() + (offset2)).setCoords();


        if (canvas.vplStmt === "assign") {

            AddAssignVal(canvas, offset2);
        }
        else if (canvas.vplStmt === "flowControl") {
            canvas.boxCompExpr.setWidth(canvas.boxCompExpr.getWidth() + (offset2)).setCoords();
            FlowControlElementItemsTranslations(canvas, offset2);

        }

        ExpressionElementsTranslations(canvas, offset2, "left");
        canvas.SetCanvasWidth(canvas.element, offset2);

    } else if (rightVarTrX < previousRightVarTrX) {

        canvas.element.setWidth(canvas.element.getWidth() - (offset1)).setCoords();
        if(canvas.insideElement)
        canvas.insideElement.setWidth(canvas.insideElement.getWidth() - (offset1)).setCoords();
        canvas.rightBox.setWidth(canvas.rightBox.getWidth() - (offset1)).setCoords();

        canvas.groupAddBox.groupAddBox.setLeft(canvas.groupAddBox.groupAddBox.getLeft() - (offset1)).setCoords();


        if (canvas.vplStmt === "assign") {
            AddAssignVal(canvas, -offset1);
        }
        else if (canvas.vplStmt === "flowControl") {
            canvas.boxCompExpr.setWidth(canvas.boxCompExpr.getWidth() - (offset1)).setCoords();
            FlowControlElementItemsTranslations(canvas, -offset1);

        }
        ExpressionElementsTranslations(canvas, -offset1, "left");

    }
    if (canvas.object) {
        canvas.deleteButton.SetPosition(canvas.object);
    }
    canvas.renderAll();
}

function ExpressionElementsTranslations(canvas, offset, side) {

    var box;
    if (canvas.element.id2 === "assign")
        box = canvas.rightBox;
    else
        box = canvas.boxCompExpr;

    _.each(canvas.rightBoxesList, function(rightBox) {
        if (rightBox.getLeft() > canvas.rightBox.getLeft())
            rightBox.setLeft(rightBox.getLeft() + (offset)).setCoords();

    });
    _.each(canvas.rightVarsList, function(rightVar) {
        if (rightVar.getLeft() > canvas.rightVar.getLeft())
            rightVar.setLeft(rightVar.getLeft() + (offset)).setCoords();

    });

    if (side === "left") {
        _.each(canvas.deleteButtons, function(deleteButton) {
            if (deleteButton.getLeft() > canvas.rightVar.getLeft())
                deleteButton.setLeft(deleteButton.getLeft() + (offset)).setCoords();

        });
    }
    else {
        _.each(canvas.deleteButtons, function(deleteButton) {
            if (deleteButton.getLeft() > (box.oCoords.tr.x + 1))
                deleteButton.setLeft(deleteButton.getLeft() + (offset)).setCoords();

        });
    }

    _.each(canvas.element.rightParenthesis, function(rightParenthesis) {
        if (rightParenthesis.getLeft() > box.getLeft())
            rightParenthesis.setLeft(rightParenthesis.getLeft() + (offset)).setCoords();

    });
     _.each(canvas.element.leftParenthesis, function(leftParenthesis) {
        if (leftParenthesis.getLeft() > box.getLeft())
            leftParenthesis.setLeft(leftParenthesis.getLeft() + (offset)).setCoords();

    });

    canvas.renderAll();
}