/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function LogicExprIsBalanced(firstElement, canvas) {
    var logicExpr;
    var left, top;
    var leftText, topText;
    if (firstElement.id2 === "assign" && firstElement.type3 !== "waituntil") {
        if(firstElement.leftParenthesis)
        logicExpr = firstElement.leftParenthesis.concat(firstElement.rightParenthesis, firstElement.rightBoxesList, firstElement.arithOps);
    else return;
        left = firstElement.left;
        top = firstElement.top + firstElement.height + 1;
        leftText = firstElement.left + 5;
        topText = firstElement.top + firstElement.height + 3;
    }
    else {
        if(firstElement.rightParenthesis && firstElement.leftParenthesis)
        logicExpr = firstElement.leftParenthesis.concat(firstElement.rightParenthesis, firstElement.boxesCompExprs, firstElement.logicOps);
    else return;
        left = firstElement.left;
        top = firstElement.top + firstElement.height + 1;
        leftText = left + 5;
        topText = top + 1;
    }
    if (logicExpr.length > 1) {    //here we sort parenthesis 

        logicExpr.sort(function(a, b) {
            if (a.left > b.left) {
                return 1;
            }
            if (a.left < b.left) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

    }
    var errorMessage = CheckLogicExpr(logicExpr, canvas);
    if (firstElement.id2 === "flowcontrol1" && firstElement.isMinus === false) {
        return;
    } else {

        if (errorMessage !== "" && !firstElement.hasLogicExprError) {

            var logicExprErrorElement = new fabric.Rect({
                left: left,
                top: top,
                fill: 'white',
                width: 213,
                height: 25
            });

            var logicExprErrorText = new fabric.Text(errorMessage, {
                left: leftText,
                top: topText,
                fill: 'red',
                fontSize: '20',
                fontFamily: ' Arial'
            });

            var groupLogicExprError = new fabric.Group(
                    [logicExprErrorElement, logicExprErrorText],
                    {
                        lockMovementX: true,
                        lockMovementY: true,
                        hasControls: false,
                        hasBorders: false
                    });

            groupLogicExprError.id = "groupLogicExprError";
            groupLogicExprError.type0 = "element";
            if (firstElement.id2 === "flowcontrol1") {

                groupLogicExprError.type2 = "start";
                groupLogicExprError.id2 = "flowcontrol1";
            }
            else if (firstElement.id2 === "assign") {
                groupLogicExprError.id2 = "assign";

            }
            groupLogicExprError.firstElement = firstElement.firstElement;
            groupLogicExprError.mainElement = firstElement;
            firstElement.groupLogicExprError = groupLogicExprError;
            firstElement.hasLogicExprError = true;
            canvas.horizontalElements.push(groupLogicExprError);
            canvas.add(groupLogicExprError);
            canvas.notTranslate = true;
            canvas.itemsOfDraggableElement.length = 0;
            canvas.itemsOfDraggableElement.push(groupLogicExprError);
            if (firstElement.id2 === "flowcontrol1" && firstElement.type3 !== "dowhile") {
                canvas.itemsOfDraggableElement.push(firstElement.body);
                canvas.itemsOfDraggableElement.push(firstElement.codeFoldingButton.firstLine);

            }
            AddDoNothingElement(left, top - 1, canvas, 25, false);
            if (firstElement.id2 === "flowcontrol1"&& firstElement.type3 !== "dowhile")
                firstElement.codeFoldingButton.firstLine.setHeight(firstElement.codeFoldingButton.firstLine.getHeight() + 25).setCoords();

        }
        else if (errorMessage !== "" && firstElement.hasLogicExprError) {

            if (errorMessage !== firstElement.groupLogicExprError.item(1).text) {
                firstElement.groupLogicExprError.item(1).text = errorMessage;
            }

        }
        else if (errorMessage === "" && firstElement.hasLogicExprError) {  // here we delete the element for error in parenthesis
            firstElement.hasLogicExprError = false;
            DeleteElementFromArray(firstElement.groupLogicExprError, canvas.horizontalElements);
            canvas.remove(firstElement.groupLogicExprError);   //delete parenthesis
            canvas.notTranslate = true;
            canvas.itemsOfDraggableElement.length = 0;
            if (firstElement.id2 === "flowcontrol1" && firstElement.type3 !== "dowhile") {
                canvas.itemsOfDraggableElement.push(firstElement.body);
                canvas.itemsOfDraggableElement.push(firstElement.codeFoldingButton.firstLine);
            }
            AddDoNothingElement(left, top - 1, canvas, -25, false);
            if (firstElement.id2 === "flowcontrol1"&& firstElement.type3 !== "dowhile")
                firstElement.codeFoldingButton.firstLine.setHeight(firstElement.codeFoldingButton.firstLine.getHeight() - 25).setCoords();

        }
    }
    canvas.renderAll();

}

function CheckLogicExpr(logicExpr, canvas) {

    var seeRightParenthesis = false;
    var depth = 0;
    var seeLeftParenthesis = false;
    var unclosedParenthesis = new Array();
    var unExpectedParenthesis = new Array();
    var leftParenthesisError = new Array();
    var rightParenthesisError = new Array();
    var rightParenthesisError1 = new Array();
    var errorMessage = "";
    var unclosedParenthesisMessage = "unclosed '('";
    var unExpectedParenthesisMessage = "unexpected ')'";
    var rightParenthesisErrorMessage;
    var leftParenthesisErrorMessage;
    var operatorId;
    var boxId;
    if (logicExpr.length > 1) {
        if (logicExpr[0].id2 === "assign" &&  logicExpr[0].firstElement.type3 !== "waituntil") {
            operatorId = "arithOp";
            boxId = "newRightBox";
            rightParenthesisErrorMessage = "')' expects arithmetic operator after it";
            leftParenthesisErrorMessage = "'(' expects Value after it";
        }
        else {
            operatorId = "logicOp";
            boxId = "boxCompExpr";
            rightParenthesisErrorMessage = "')' expects logic operator after it";
            leftParenthesisErrorMessage = "'(' expects Boolean after it";
        }
    }
    for (var i in logicExpr) {

        if (logicExpr[i].text === '(') {
            logicExpr[i].fill = "black";
            unclosedParenthesis.push(logicExpr[i]);
            if (!seeLeftParenthesis)
                leftParenthesisError.push(logicExpr[i]);
            else
                leftParenthesisError[leftParenthesisError.length - 1] = logicExpr[i];
            seeLeftParenthesis = true;
            if (seeRightParenthesis) {
                seeRightParenthesis = false;
                rightParenthesisError1.push(rightParenthesisError[rightParenthesisError.length - 1]);
            }

            depth++;
        }
        else if (logicExpr[i].text === ')') {
            logicExpr[i].fill = "black";
            if (!seeRightParenthesis)
                rightParenthesisError.push(logicExpr[i]);
            else
                rightParenthesisError[rightParenthesisError.length - 1] = logicExpr[i];
            seeRightParenthesis = true;
            if (unclosedParenthesis.length > 0)
                unclosedParenthesis.splice(unclosedParenthesis.length - 1, 1);
            depth--;
            if (depth < 0) {
                unExpectedParenthesis.push(logicExpr[i]);
                depth = 0;
            }

            if (seeLeftParenthesis) {
                seeLeftParenthesis = false;

            }
        }
        else if (logicExpr[i].id3 === boxId) {

            if (seeLeftParenthesis) {
                if (leftParenthesisError.length > 0)
                    leftParenthesisError.splice(leftParenthesisError.length - 1, 1);
                seeLeftParenthesis = false;

            }
            if (seeRightParenthesis) {
                seeRightParenthesis = false;
                rightParenthesisError1.push(rightParenthesisError[rightParenthesisError.length - 1]);
            }
        }
        else {

            if (seeLeftParenthesis) {
                seeLeftParenthesis = false;
            }
            if (logicExpr[i].id3 === operatorId) {
                if (seeRightParenthesis) {
                    if (rightParenthesisError.length > 0)
                        rightParenthesisError.splice(rightParenthesisError.length - 1, 1);
                    seeRightParenthesis = false;
                }
            }
            else {
                if (seeRightParenthesis) {
                    seeRightParenthesis = false;
                    rightParenthesisError1.push(rightParenthesisError[rightParenthesisError.length - 1]);
                }
            }
        }

    }
    var parenthesisError = unclosedParenthesis.concat(unExpectedParenthesis, rightParenthesisError1, leftParenthesisError);
    var lefter = parenthesisError[0];
    for (var i in parenthesisError) {
        parenthesisError[i].fill = 'red';
        if (parenthesisError[i].left < lefter.left)
            lefter = parenthesisError[i];

    }
    if (unExpectedParenthesis.indexOf(lefter) >= 0)
        errorMessage = unExpectedParenthesisMessage;
    else if (unclosedParenthesis.indexOf(lefter) >= 0)
        errorMessage = unclosedParenthesisMessage;
    else if (rightParenthesisError1.indexOf(lefter) >= 0)
        errorMessage = rightParenthesisErrorMessage;
    else if (leftParenthesisError.indexOf(lefter) >= 0)
        errorMessage = leftParenthesisErrorMessage;

    canvas.renderAll();

    return errorMessage;

}