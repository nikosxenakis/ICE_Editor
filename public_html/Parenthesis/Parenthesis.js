/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function AddParenthesis(canvas, parenthesisText) {

    var left;
    var top;
    if (parenthesisText === ")") {
        if (canvas.element.id2 === "assign" &&  canvas.element.firstElement.type3 !== "waituntil") {
            left = canvas.rightBox.left + canvas.rightBox.width + 4;
            top = canvas.rightBox.top + 3;
        }
        else {
            left = canvas.boxCompExpr.oCoords.tr.x + 4;
            top = canvas.rightVar.top - 4;
        }

    }
    else {
        if (canvas.element.id2 === "assign" &&  canvas.element.firstElement.type3 !== "waituntil") {
            left = canvas.rightBox.left - 2;
            top = canvas.rightBox.top + 3;
        }
        else {
            left = canvas.boxCompExpr.left - 3;
            top = canvas.rightVar.top - 4;
        }

    }

    var parenthesis = new fabric.Text(parenthesisText, {
        left: left,
        top: top,
        fill: 'black',
        fontSize: '23',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    parenthesis.id2 = canvas.element.id2;
  
    parenthesis.firstElement = canvas.element.firstElement;
    parenthesis.mainElement = canvas.element;
    canvas.horizontalElements.push(parenthesis);
    canvas.add(parenthesis);
    parenthesis.downClicked = function() {
        $('#parenthesis').show();
        SetDropDownMenuPosition("#rightClickMenu", this.left, this.top + this.height);
      
    };
 
    parenthesis.mouseOver = function() {
        canvas.parenthesisClicked = this;
        canvas.isParenthesisClicked = true;
        if (this.fill === 'red')
            this.fill = '#FFCC99';
        else
            this.fill = '#B0B0B0';
        canvas.renderAll();
    };

    parenthesis.mouseOut = function() {
        canvas.isParenthesisClicked = false;
        if (this.fill === '#FFCC99')
            this.fill = 'red';
        else
            this.fill = "black";
        canvas.renderAll();

    };


    AddParantesisTranslations(canvas, parenthesisText);
    if (parenthesisText === ")") {
        canvas.element.rightParenthesis.push(parenthesis);
    }
    else {
        canvas.element.leftParenthesis.push(parenthesis);
    }
    LogicExprIsBalanced(canvas.element, canvas);

}

function  AddParantesisTranslations(canvas, parenthesisText) {
    var offset = 10;
    if (canvas.element.id2 === "assign" &&  canvas.element.firstElement.type3 !== "waituntil") {

        if (parenthesisText === ")") {
            ExpressionElementsTranslations(canvas, offset, "right");
        }
        else if (parenthesisText === "(") {
            ExpressionElementsTranslations(canvas, offset, "left");
            canvas.rightBox.setLeft(canvas.rightBox.getLeft() + (offset)).setCoords();
            canvas.rightVar.setLeft(canvas.rightVar.getLeft() + (offset)).setCoords();

        }
        var index = 0;
        canvas.arithOps.forEach(function(arithOp) {
            if (arithOp.getLeft() > (canvas.rightBox.getLeft())) {
                arithOp.setLeft(arithOp.getLeft() + (offset)).setCoords();
                canvas.element.arithOpsCoordsLeft[index].forEach(function(arithOpsCoordsLeftElementItem) {
                    arithOpsCoordsLeftElementItem.left = arithOpsCoordsLeftElementItem.left + offset;
                });
            }
            index++;
        });

    }
    else {
        if (parenthesisText === ")") {
            FlowControlElementItemsTranslations(canvas, offset);
            ExpressionElementsTranslations(canvas, offset, "right");
        }
        else {
            FlowControlElementItemsTranslations(canvas, offset);
            canvas.boxCompExpr.setLeft(canvas.boxCompExpr.getLeft() + (offset)).setCoords();
            ExpressionElementsTranslations(canvas, offset, "left");
            canvas.rightBox.setLeft(canvas.rightBox.getLeft() + (offset)).setCoords();
            canvas.rightVar.setLeft(canvas.rightVar.getLeft() + (offset)).setCoords();

        }
    }

    canvas.element.setWidth(canvas.element.getWidth() + (offset)).setCoords();
    canvas.insideElement.setWidth(canvas.insideElement.getWidth() + (offset)).setCoords();
    canvas.groupAddBox.groupAddBox.setLeft(canvas.groupAddBox.groupAddBox.getLeft() + (offset)).setCoords();
    canvas.SetCanvasWidth(canvas.element, offset);

    if (canvas.element.id2 === "assign"&&  canvas.element.firstElement.type3 !== "waituntil") {
        var offset4 = ((canvas.element.oCoords.tr.x - canvas.element.oCoords.tl.x) - (canvas.elementText.oCoords.tr.x - canvas.elementText.oCoords.tl.x)) / 2;
        canvas.elementText.setLeft(offset4 + canvas.element.oCoords.tl.x).setCoords();
    }
    if (canvas.object) {
        canvas.deleteButton.SetPosition(canvas.object);
    }
    canvas.renderAll();
}

function DeleteParenthesis(canvas) {
    var offset = 10;

    for (var index = 0; index < canvas.horizontalElements.length; index++) {
        if (canvas.horizontalElements[index].left > canvas.parenthesisClicked.left &&
                canvas.horizontalElements[index].top > canvas.parenthesisClicked.mainElement.top &&
                canvas.horizontalElements[index].top < (canvas.parenthesisClicked.mainElement.top + canvas.parenthesisClicked.mainElement.height)) {
            if (canvas.parenthesisClicked.id2 !== "assign" || canvas.parenthesisClicked.firstElement.type3 === "waituntil")
                canvas.horizontalElements[index].setLeft(canvas.horizontalElements[index].getLeft() - (offset)).setCoords();
            else {
                if (canvas.horizontalElements[index] !== canvas.parenthesisClicked.mainElement.elementText)
                    canvas.horizontalElements[index].setLeft(canvas.horizontalElements[index].getLeft() - (offset)).setCoords();

            }
        }
    }
    canvas.parenthesisClicked.mainElement.setWidth(canvas.parenthesisClicked.mainElement.getWidth() - (offset)).setCoords();
    canvas.parenthesisClicked.mainElement.insideElement.setWidth(canvas.parenthesisClicked.mainElement.insideElement.getWidth() - (offset)).setCoords();
    if (canvas.parenthesisClicked.id2 === "assign" &&  canvas.parenthesisClicked.firstElement.type3 !== "waituntil") {
        var offset4 = ((canvas.parenthesisClicked.mainElement.oCoords.tr.x - canvas.parenthesisClicked.mainElement.oCoords.tl.x) - (canvas.parenthesisClicked.mainElement.elementText.oCoords.tr.x - canvas.parenthesisClicked.mainElement.elementText.oCoords.tl.x)) / 2;
        canvas.parenthesisClicked.mainElement.elementText.setLeft(offset4 + canvas.parenthesisClicked.mainElement.oCoords.tl.x).setCoords();
    }
    DeleteElementFromArray(canvas.parenthesisClicked, canvas.horizontalElements);
    if (canvas.parenthesisClicked.text === ')')
        DeleteElementFromArray(canvas.parenthesisClicked, canvas.parenthesisClicked.mainElement.rightParenthesis);
    else
        DeleteElementFromArray(canvas.parenthesisClicked, canvas.parenthesisClicked.mainElement.leftParenthesis);
    canvas.remove(canvas.parenthesisClicked);   //delete parenthesis
    canvas.renderAll();
    if (canvas.object) {
        canvas.deleteButton.SetPosition(canvas.object);
    }
    LogicExprIsBalanced(canvas.parenthesisClicked.mainElement, canvas);
}