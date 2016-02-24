/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*in this function  i translate elements and delete statement elements only */
function DeleteTranslateElement(canvas, deleteCondition, left, top, length) {

//here we put the element that we will drag or delete.
    var itemsOfElement = new Array();
    var groupLogicExprErrorLeft = "";
    var groupLogicExprErrorTop = "";
    var underElement;
    var aboveElement;
    var deleteElse = false;

    if (canvas.rightClickedElement.id2 === "flowcontrol1" && deleteCondition)
        DeleteTranslateFlowControlElement(canvas);
    else
    {

        itemsOfElement = canvas.itemsOfDraggableElement;
        underElement = canvas.rightClickedElement.underElement;
        aboveElement = canvas.rightClickedElement.upElement;


        if (underElement.type2 === "end" && aboveElement.type2 === "else") {
            deleteElse = true;
            if (canvas.rightClickedElement.id2 !== "flowcontrol1")
                canvas.codeFolding.DeleteCodeFoldingButtons(aboveElement, canvas, deleteElse, false);
            else
                canvas.codeFolding.DeleteCodeFoldingButtons(aboveElement, canvas, deleteElse, true);
            canvas.codeFolding.setLineLength(canvas, "else");

        }
        if (canvas.rightClickedElement.id2 === "flowcontrol1" && !(underElement.type2 === "end" && aboveElement.type2 === "else"))
            canvas.codeFolding.DeleteCodeFoldingButtons(canvas.rightClickedElement, canvas, deleteElse, true);

        if ((canvas.rightClickedElement.underElement.type2 === "end" && canvas.rightClickedElement.upElement.type2 === "start")
                || (canvas.rightClickedElement.underElement.type2 === "else if" && canvas.rightClickedElement.upElement.type2 === "start" && canvas.rightClickedElement.upElement.firstElement === canvas.rightClickedElement.underElement.firstElement)
                || (canvas.rightClickedElement.underElement.type2 === "else if" && canvas.rightClickedElement.upElement.type2 === "else if" && canvas.rightClickedElement.upElement.firstElement === canvas.rightClickedElement.underElement.firstElement)
                || (canvas.rightClickedElement.underElement.type2 === "else" && canvas.rightClickedElement.upElement.type2 === "else if" && canvas.rightClickedElement.upElement.firstElement === canvas.rightClickedElement.underElement.firstElement)
                || (canvas.rightClickedElement.underElement.type2 === "end" && canvas.rightClickedElement.upElement.type2 === "else if" && canvas.rightClickedElement.upElement.firstElement === canvas.rightClickedElement.underElement.firstElement)
                || (canvas.rightClickedElement.underElement.type2 === "else" && canvas.rightClickedElement.upElement.type2 === "start" && canvas.rightClickedElement.upElement.firstElement === canvas.rightClickedElement.underElement.firstElement)) {// here after deletion / translation , we must add a doNothing Element

            if (canvas.rightClickedElement.id2 !== "doNothing") {

                if (deleteCondition) {

                    AddDoNothingElement(canvas.rightClickedElement.left, canvas.rightClickedElement.top, canvas, 50 - (length - 3), true);
                    RemoveElementsFromCanvas(itemsOfElement, canvas, canvas.horizontalElements, groupLogicExprErrorLeft, groupLogicExprErrorTop);
                }
                else {
                    if (canvas.rightClickedElement.top > top) { //if dragging in down to up
                        //  alert(1);
                        if (canvas.rightClickedElement.id2 === "assign") {

                            if (canvas.rightClickedElement.firstElement.hasLogicExprError) {
                                groupLogicExprErrorLeft = canvas.rightClickedElement.firstElement.groupLogicExprError.left;
                                groupLogicExprErrorTop = canvas.rightClickedElement.firstElement.groupLogicExprError.top - 1;
                                AddDoNothingElement(groupLogicExprErrorLeft, groupLogicExprErrorTop, canvas, -25, false); //first translate up the elements that are under errorMessage element

                            }
                        }
                        else if (canvas.rightClickedElement.firstElement.type3 === "dowhile") {

                            if (canvas.rightClickedElement.firstElement.endElement.hasLogicExprError) {

                                groupLogicExprErrorLeft = canvas.rightClickedElement.firstElement.endElement.groupLogicExprError.left;
                                groupLogicExprErrorTop = canvas.rightClickedElement.firstElement.endElement.groupLogicExprError.top - 1;
                                AddDoNothingElement(groupLogicExprErrorLeft, groupLogicExprErrorTop, canvas, -25, false); //first translate up the elements that are under errorMessage element

                            }
                        }

                        if (canvas.rightClickedElement.id2 === "flowcontrol1") {
                            canvas.notTranslate = true;//this is for not translate the elements of the element we drag
                            canvas.notTranslateCodeFoldingElements = true;
                            AddDoNothingElement(canvas.rightClickedElement.left, canvas.rightClickedElement.top, canvas, 50 - (length - 3), true);

                        }
                        else
                            AddDoNothingElement(canvas.rightClickedElement.left, canvas.rightClickedElement.top, canvas, 50 - (length - 3), true);
                        AddDoNothingElement(left, top, canvas, length, false); //will create a new position for the element
                        MoveElements(itemsOfElement, canvas, left, top, groupLogicExprErrorLeft, groupLogicExprErrorTop); //it will translate it in new position

                        if (canvas.rightClickedElement.id2 === "assign") {
                            if (canvas.rightClickedElement.firstElement.hasLogicExprError) {
                                AddDoNothingElement(canvas.rightClickedElement.firstElement.groupLogicExprError.left, canvas.rightClickedElement.firstElement.groupLogicExprError.top, canvas, 25, false);//create space for errorMessageElement new position
                                canvas.rightClickedElement.firstElement.groupLogicExprError.setTop(canvas.rightClickedElement.firstElement.top + canvas.rightClickedElement.firstElement.height + 1).setCoords();

                            }
                        }
                        else if (canvas.rightClickedElement.firstElement.type3 === "dowhile") {
                            if (canvas.rightClickedElement.firstElement.endElement.hasLogicExprError) {
                                AddDoNothingElement(canvas.rightClickedElement.firstElement.endElement.groupLogicExprError.left, canvas.rightClickedElement.firstElement.endElement.groupLogicExprError.top, canvas, 25, false);//create space for errorMessageElement new position
                                canvas.rightClickedElement.firstElement.endElement.groupLogicExprError.setTop(canvas.rightClickedElement.firstElement.endElement.top + canvas.rightClickedElement.firstElement.endElement.height + 1).setCoords();

                            }
                        }

                        RemovePreviousLine(deleteElse, underElement, aboveElement, canvas);
                        if (canvas.rightClickedElement.firstElement.type3 === "dowhile") {
                            if (canvas.rightClickedElement.firstElement.endElement.hasLogicExprError)
                                TranslateCodeFoldingElements(canvas, top - 25, left);
                            else
                                TranslateCodeFoldingElements(canvas, top, left);
                        }
                        else
                            TranslateCodeFoldingElements(canvas, top, left);
                    } else {
                        //  alert(2);
                        var previousElementLeft = canvas.rightClickedElement.left;
                        var previousElementTop = canvas.rightClickedElement.top;

                        AddDoNothingElement(left, top, canvas, length, false);

                        MoveElements(itemsOfElement, canvas, left, top, groupLogicExprErrorLeft, groupLogicExprErrorTop);

                        if (canvas.rightClickedElement.id2 === "flowcontrol1") {
                            AddDoNothingElement(previousElementLeft, previousElementTop, canvas, 50 - (length - 3), true);

                            TranslateHiddenCodeFoldingElements(canvas, 50 - (length - 3));
                        }
                        else
                            AddDoNothingElement(previousElementLeft, previousElementTop, canvas, 50 - (length - 3), true);

                        RemovePreviousLine(deleteElse, underElement, aboveElement, canvas);
                        if (canvas.rightClickedElement.firstElement.type3 === "dowhile") {
                            if (canvas.rightClickedElement.firstElement.endElement.hasLogicExprError)
                                TranslateCodeFoldingElements(canvas, top - 25, left);
                            else
                                TranslateCodeFoldingElements(canvas, top, left);
                        }
                        else
                            TranslateCodeFoldingElements(canvas, top, left);
                    }
                }
            } else {
                if (!deleteCondition) {

                    canvas.rightClickedElement.setLeft(canvas.rightClickedElement.left).setCoords();
                    canvas.rightClickedElement.setTop(canvas.rightClickedElement.top).setCoords();
                    AddDoNothingElement(left, top, canvas, 53, true);
                    canvas.rightClickedElement.opacity = 1;
                }
            }
        }
        else {

            if (deleteCondition) {//here we can delete Elements
                if (canvas.rightClickedElement.id2 === "assign") {
                    if (canvas.rightClickedElement.firstElement.hasLogicExprError) {
                        groupLogicExprErrorLeft = canvas.rightClickedElement.firstElement.groupLogicExprError.left;
                        groupLogicExprErrorTop = canvas.rightClickedElement.firstElement.groupLogicExprError.top - 1;
                        AddDoNothingElement(groupLogicExprErrorLeft, groupLogicExprErrorTop, canvas, -25, false); //first translate up the elements that are under errorMessage element

                    }
                }
                else if (canvas.rightClickedElement.firstElement.type3 === "dowhile") {
                    if (canvas.rightClickedElement.firstElement.endElement.hasLogicExprError) {
                        groupLogicExprErrorLeft = canvas.rightClickedElement.firstElement.endElement.groupLogicExprError.left;
                        groupLogicExprErrorTop = canvas.rightClickedElement.firstElement.endElement.groupLogicExprError.top - 1;
                        AddDoNothingElement(groupLogicExprErrorLeft, groupLogicExprErrorTop, canvas, -25, false); //first translate up the elements that are under errorMessage element

                    }
                }
                if (canvas.rightClickedElement.id2 === "doNothing")
                    AddDoNothingElement(canvas.rightClickedElement.left, canvas.rightClickedElement.top, canvas, -canvas.rightClickedElement.height - 2, false);
                else
                    AddDoNothingElement(canvas.rightClickedElement.left, canvas.rightClickedElement.top, canvas, - (length), false);
                RemoveElementsFromCanvas(itemsOfElement, canvas, canvas.horizontalElements, groupLogicExprErrorLeft, groupLogicExprErrorTop);

            }
            else {//here we can translate Elements

                if (canvas.rightClickedElement.top > top) { //if dragging in down to up
                    // alert(3);

                    if (canvas.rightClickedElement.id2 === "assign") {
                        if (canvas.rightClickedElement.firstElement.hasLogicExprError) {
                            groupLogicExprErrorLeft = canvas.rightClickedElement.firstElement.groupLogicExprError.left;
                            groupLogicExprErrorTop = canvas.rightClickedElement.firstElement.groupLogicExprError.top - 1;
                            AddDoNothingElement(groupLogicExprErrorLeft, groupLogicExprErrorTop, canvas, -25, false); //first translate up the elements that are under errorMessage element

                        }
                    }

                    else if (canvas.rightClickedElement.firstElement.type3 === "dowhile") {
                        if (canvas.rightClickedElement.firstElement.endElement.hasLogicExprError) {
                            groupLogicExprErrorLeft = canvas.rightClickedElement.firstElement.endElement.groupLogicExprError.left;
                            groupLogicExprErrorTop = canvas.rightClickedElement.firstElement.endElement.groupLogicExprError.top - 1;
                            AddDoNothingElement(groupLogicExprErrorLeft, groupLogicExprErrorTop, canvas, -25, false); //first translate up the elements that are under errorMessage element

                        }
                    }

                    AddDoNothingElement(canvas.rightClickedElement.left, canvas.rightClickedElement.top, canvas, -length, false);
                    MoveElements(itemsOfElement, canvas, left, top, groupLogicExprErrorLeft, groupLogicExprErrorTop); //it will translate it in new position

                    TranslateHiddenCodeFoldingElements(canvas, -length);
                    canvas.notTranslate = true;
                    canvas.notTranslateCodeFoldingElements = true;
                    AddDoNothingElement(left, top, canvas, length, false); //will create a new position for the element
                    if (canvas.rightClickedElement.id2 === "assign") {
                        if (canvas.rightClickedElement.firstElement.hasLogicExprError) {
                            AddDoNothingElement(canvas.rightClickedElement.firstElement.groupLogicExprError.left, canvas.rightClickedElement.firstElement.groupLogicExprError.top, canvas, 25, false);//create space for errorMessageElement new position
                            canvas.rightClickedElement.firstElement.groupLogicExprError.setTop(canvas.rightClickedElement.firstElement.top + canvas.rightClickedElement.firstElement.height + 1).setCoords();

                        }
                    }
                    else if (canvas.rightClickedElement.firstElement.type3 === "dowhile") {
                        if (canvas.rightClickedElement.firstElement.endElement.hasLogicExprError) {
                            canvas.notTranslateCodeFoldingElements = true;
                            AddDoNothingElement(canvas.rightClickedElement.firstElement.endElement.groupLogicExprError.left, canvas.rightClickedElement.firstElement.endElement.groupLogicExprError.top, canvas, 25, false);//create space for errorMessageElement new position
                            canvas.rightClickedElement.firstElement.endElement.groupLogicExprError.setTop(canvas.rightClickedElement.firstElement.endElement.top + canvas.rightClickedElement.firstElement.endElement.height + 1).setCoords();

                        }
                    }

                    canvas.renderAll();
                    RemovePreviousLine(deleteElse, underElement, aboveElement, canvas);

                    TranslateCodeFoldingElements(canvas, top, left);
                }
                else {
                    //   alert(4);
                    AddDoNothingElement(left, top, canvas, length, false); //will create a new position for the element
                    var previousElementLeft = canvas.rightClickedElement.left;
                    var previousElementTop = canvas.rightClickedElement.top;

                    RemovePreviousLine(deleteElse, underElement, aboveElement, canvas);
                    MoveElements(itemsOfElement, canvas, left, top, groupLogicExprErrorLeft, groupLogicExprErrorTop); //it will translate it in new position
                    if (canvas.rightClickedElement.firstElement.type3 === "dowhile") {
                        if (canvas.rightClickedElement.firstElement.endElement.hasLogicExprError)
                            TranslateCodeFoldingElements(canvas, top - 25, left);
                        else
                            TranslateCodeFoldingElements(canvas, top, left);
                    }
                    else
                        TranslateCodeFoldingElements(canvas, top, left);
                    AddDoNothingElement(previousElementLeft, previousElementTop, canvas, -length, false); //translate elements that are under the dragging element to up
                }
            }

        }

        if (underElement.type2 === "end" && aboveElement.type2 === "else") {

            DeleteElseElement(underElement, aboveElement, canvas);

        }
        //  alert(canvas.codeFolding.lines.length + "  lines");
        //  alert(canvas.codeFolding.codeFoldingButtons.length + "  buttons");
    }

}

function MoveElements(itemsOfDraggableElement, canvas, left, top, groupLogicExprErrorLeft, groupLogicExprErrorTop) {

    var old_top = canvas.rightClickedElement.top;
    var old_left = canvas.rightClickedElement.left;
    canvas.rightClickedElement.old_top = old_top;
    canvas.rightClickedElement.old_left = old_left;
    if (itemsOfDraggableElement.length > 0) {
        if (itemsOfDraggableElement[0].id2 === "assign") {
            if (itemsOfDraggableElement[0].firstElement.hasLogicExprError && groupLogicExprErrorLeft === "" && groupLogicExprErrorTop === "") {
                groupLogicExprErrorLeft = itemsOfDraggableElement[0].firstElement.groupLogicExprError.left;
                groupLogicExprErrorTop = itemsOfDraggableElement[0].firstElement.groupLogicExprError.top - 1;
            }
        }
        else if (canvas.rightClickedElement.firstElement.type3 === "dowhile") {
            if (canvas.rightClickedElement.firstElement.endElement.hasLogicExprError && groupLogicExprErrorLeft === "" && groupLogicExprErrorTop === "") {
                groupLogicExprErrorLeft = canvas.rightClickedElement.firstElement.endElement.groupLogicExprError.left;
                groupLogicExprErrorTop = canvas.rightClickedElement.firstElement.endElement.groupLogicExprError.top - 1;
            }
        }

    }
    for (var index = 0; index < itemsOfDraggableElement.length; index++) {
        itemsOfDraggableElement[index].setTop(itemsOfDraggableElement[index].top - (old_top - top)).setCoords();
        itemsOfDraggableElement[index].setLeft(itemsOfDraggableElement[index].left - (old_left - left)).setCoords();
        itemsOfDraggableElement[index].opacity = 1;
    }
    canvas.renderAll();
    if (itemsOfDraggableElement.length > 0) {
        if (itemsOfDraggableElement[0].id2 === "assign" && itemsOfDraggableElement[0].firstElement.hasLogicExprError) {//if dragging is up to down
            if (itemsOfDraggableElement[0].firstElement.groupLogicExprError.top > groupLogicExprErrorTop) {

                AddDoNothingElement(groupLogicExprErrorLeft, groupLogicExprErrorTop, canvas, -25, false); //first translate up the elements that are under errorMessage element
                AddDoNothingElement(itemsOfDraggableElement[0].firstElement.groupLogicExprError.left, itemsOfDraggableElement[0].firstElement.groupLogicExprError.top, canvas, 25, false);//create space for errorMessageElement new position
                itemsOfDraggableElement[0].firstElement.groupLogicExprError.setTop(itemsOfDraggableElement[0].firstElement.top + itemsOfDraggableElement[0].firstElement.height + 1).setCoords();
            }
        }
        else if (canvas.rightClickedElement.firstElement.type3 === "dowhile") {//if dragging is up to down
            if (canvas.rightClickedElement.firstElement.endElement.hasLogicExprError) {
                if (canvas.rightClickedElement.firstElement.endElement.groupLogicExprError.top > groupLogicExprErrorTop) {

                    AddDoNothingElement(groupLogicExprErrorLeft, groupLogicExprErrorTop, canvas, -25, false); //first translate up the elements that are under errorMessage element
                    AddDoNothingElement(canvas.rightClickedElement.firstElement.endElement.groupLogicExprError.left, canvas.rightClickedElement.firstElement.endElement.groupLogicExprError.top, canvas, 25, false);//create space for errorMessageElement new position
                    canvas.rightClickedElement.firstElement.endElement.groupLogicExprError.setTop(canvas.rightClickedElement.firstElement.endElement.top + canvas.rightClickedElement.firstElement.endElement.height + 1).setCoords();
                }
            }
        }
    }
    canvas.renderAll();
}

function TranslateHiddenCodeFoldingElements(canvas, length) {
    canvas.codeFoldingElementsNotTranslate.forEach(function(item) {

        if (item.isHide)
            item.setTop(item.top + length).setCoords();

    });

}
function  TranslateCodeFoldingElements(canvas, top, left) {

    if (canvas.rightClickedElement.id2 === "flowcontrol1") {

        canvas.codeFolding.FindPreviousLine(canvas.rightClickedElement.firstElement.top + canvas.rightClickedElement.firstElement.height - 10, canvas.rightClickedElement);

        canvas.codeFoldingElementsNotTranslate.forEach(function(item) {

            item.setTop(item.top - (canvas.rightClickedElement.old_top - top)).setCoords();
            if (canvas.codeFolding.lines.indexOf(item) >= 0 || canvas.codeFolding.codeFoldingButtons.indexOf(item) >= 0 || item.id === "endLine")
                ;
            else
                item.setLeft(item.left - (canvas.rightClickedElement.old_left - left)).setCoords();


        });

        canvas.renderAll();
        canvas.codeFoldingElementsNotTranslate.length = 0;

        if (canvas.rightClickedElement.lastLine && canvas.rightClickedElement.lastLine.isHide !== true) {
            canvas.codeFolding.setLastLineLength(canvas.rightClickedElement.lastLine, canvas);

        }

        if (canvas.rightClickedElement.previousLine && canvas.rightClickedElement.previousLine.isHide !== true) {
            canvas.codeFolding.setLastLineLength(canvas.rightClickedElement.previousLine, canvas);

        }
        //  alert(canvas.codeFolding.lines.length + "  lines");
        //alert(canvas.codeFolding.codeFoldingButtons.length + "  buttons");
        canvas.rightClickedElement.lastLine = null;
        canvas.rightClickedElement.previousLine = null;
        canvas.renderAll();
    }
}

function RemovePreviousLine(deleteElse, underElement, aboveElement, canvas) {
    if (underElement.type2 === "end" && aboveElement.type2 === "else") {

        if (aboveElement.lastLine)
        {
            DeleteElementFromArray(aboveElement.lastLine, canvas.verticalElements);
            DeleteElementFromArray(aboveElement.lastLine, canvas.codeFolding.lines);
            canvas.remove(aboveElement.lastLine);
            aboveElement.lastLine = null;
            canvas.rightClickedElement.lastLine = aboveElement.lastLine1;
        }
    }
    if (canvas.rightClickedElement.id2 === "flowcontrol1" && !(deleteElse)) {
        canvas.codeFolding.setLineLength(canvas, "start", true);

    }
}


function RemoveElementsFromCanvas(ItemsOfElement, canvas, array, groupLogicExprErrorLeft, groupLogicExprErrorTop) {
    if (ItemsOfElement.length > 0) {
        if (ItemsOfElement[0].id2 === "assign" && ItemsOfElement[0].firstElement.hasLogicExprError && groupLogicExprErrorLeft === "" && groupLogicExprErrorTop === "") {
            AddDoNothingElement(ItemsOfElement[0].firstElement.groupLogicExprError.left, ItemsOfElement[0].firstElement.groupLogicExprError.top - 1, canvas, -25, false);
        }
    }
    if (canvas.deleteButton) {
        canvas.remove(canvas.deleteButton);
        canvas.object = null;

    }
    for (var index = 0; index < ItemsOfElement.length; index++) {
        canvas.remove(ItemsOfElement[index]);
        DeleteElementFromArray(ItemsOfElement[index], array);
    }

}


function DeleteTranslateFlowControlElement(canvas) {

    var horizontalItemsOfElement = new Array();
    var verticalItemsOfElement = new Array();
    var underElement;
    var aboveElement;
    var type2 = canvas.rightClickedElement.type2;
    if (canvas.rightClickedElement.type3 === "dowhile")
        type2 = "dowhile";
    horizontalItemsOfElement = canvas.horizontalItemsOfElement;
    verticalItemsOfElement = canvas.verticalItemsOfElement;

    underElement = canvas.rightClickedElement.underElement;
    aboveElement = canvas.rightClickedElement.upElement;
    if (underElement.type2 === "end" && aboveElement.type2 === "else") {
        type2 = "else";
        canvas.codeFolding.DeleteCodeFoldingButtons(aboveElement, canvas);
    } else
        canvas.codeFolding.DeleteCodeFoldingButtons(canvas.rightClickedElement, canvas);

    if ((canvas.rightClickedElement.underElement.type2 === "end" && canvas.rightClickedElement.upElement.type2 === "start")
            || (canvas.rightClickedElement.underElement.type2 === "else if" && canvas.rightClickedElement.upElement.type2 === "start" && canvas.rightClickedElement.upElement.firstElement === canvas.rightClickedElement.underElement.firstElement)
            || (canvas.rightClickedElement.underElement.type2 === "else if" && canvas.rightClickedElement.upElement.type2 === "else if" && canvas.rightClickedElement.upElement.firstElement === canvas.rightClickedElement.underElement.firstElement)
            || (canvas.rightClickedElement.underElement.type2 === "else" && canvas.rightClickedElement.upElement.type2 === "else if" && canvas.rightClickedElement.upElement.firstElement === canvas.rightClickedElement.underElement.firstElement)
            || (canvas.rightClickedElement.underElement.type2 === "end" && canvas.rightClickedElement.upElement.type2 === "else if" && canvas.rightClickedElement.upElement.firstElement === canvas.rightClickedElement.underElement.firstElement)
            || (canvas.rightClickedElement.underElement.type2 === "else" && canvas.rightClickedElement.upElement.type2 === "start" && canvas.rightClickedElement.upElement.firstElement === canvas.rightClickedElement.underElement.firstElement)) // here after deletion / translation , we must add a doNothing Element
    {

        if (canvas.rightClickedElement.type2 === "else if") {

            AddDoNothingElement(canvas.rightClickedElement.left,
                    canvas.rightClickedElement.top + 2, canvas,
                    -(underElement.top - aboveElement.top), false);

        }
        else {
            if (canvas.rightClickedElement.type3 === "dowhile" && canvas.rightClickedElement.endElement.hasLogicExprError) {

                AddDoNothingElement(canvas.rightClickedElement.firstElement.left,
                        canvas.rightClickedElement.firstElement.top, canvas,
                        50 - (canvas.rightClickedElement.firstElement.endElement.height + canvas.rightClickedElement.endElement.groupLogicExprError.height - 3.2 +
                                canvas.rightClickedElement.firstElement.endElement.top - canvas.rightClickedElement.firstElement.top), true);

            } else
                AddDoNothingElement(canvas.rightClickedElement.firstElement.left,
                        canvas.rightClickedElement.firstElement.top, canvas,
                        50 - (canvas.rightClickedElement.firstElement.endElement.height +
                                canvas.rightClickedElement.firstElement.endElement.top - canvas.rightClickedElement.firstElement.top), true);
        }
    }
    else {

        if (canvas.rightClickedElement.type2 === "else")
            AddDoNothingElement(canvas.rightClickedElement.left, canvas.rightClickedElement.top + canvas.rightClickedElement.height, canvas, -(canvas.rightClickedElement.firstElement.endElement.top - (canvas.rightClickedElement.top + canvas.rightClickedElement.height) - 3), false);
        else {
            if (canvas.rightClickedElement.type3 === "dowhile" && canvas.rightClickedElement.endElement.hasLogicExprError) {

                AddDoNothingElement(canvas.rightClickedElement.firstElement.left, canvas.rightClickedElement.firstElement.top, canvas, -(canvas.rightClickedElement.firstElement.endElement.height + canvas.rightClickedElement.endElement.groupLogicExprError.height - 3.2 +
                        canvas.rightClickedElement.firstElement.endElement.top - canvas.rightClickedElement.firstElement.top) - 3, false);
            }
            else
                AddDoNothingElement(canvas.rightClickedElement.firstElement.left, canvas.rightClickedElement.firstElement.top, canvas, -(canvas.rightClickedElement.firstElement.endElement.height +
                        canvas.rightClickedElement.firstElement.endElement.top - canvas.rightClickedElement.firstElement.top) - 3, false);
        }
    }
    RemoveElementsFromCanvas(horizontalItemsOfElement, canvas, canvas.horizontalElements);
    RemoveElementsFromCanvas(verticalItemsOfElement, canvas, canvas.verticalElements);

    if (underElement.type2 === "end" && aboveElement.type2 === "else") {

        DeleteElseElement(underElement, aboveElement, canvas);

    }
    if (type2 === "else" || type2 === "start" || type2 === "end")
        canvas.codeFolding.setLineLength(canvas, type2, true);
    else if (type2 === "dowhile")
        canvas.codeFolding.setLineLength(canvas, "start", true);
}


function FindAboveAndUnderOfFlowControlElements(canvas, guiobj1, array1, array2, deleteCondition, elementsForCloneElement) {

    var upElement = null;
    var underElement = null;

    var opacity = 0.3;
    if (guiobj1.type2 === "else" && deleteCondition) {

        upElement = guiobj1;
        underElement = guiobj1.firstElement.endElement;
        for (var i = 0; i < canvas.horizontalElements.length; i++) {

            if (canvas.horizontalElements[i].getLeft() >= upElement.getLeft() &&
                    canvas.horizontalElements[i].getTop() >= upElement.getTop() + upElement.height &&
                    canvas.horizontalElements[i].getTop() < underElement.getTop())
            {

                array1.push(canvas.horizontalElements[i]);
                canvas.horizontalElements[i].opacity = opacity;
            }
        }
        for (var i = 0; i < canvas.verticalElements.length; i++) {

            if (canvas.verticalElements[i].getLeft() >= upElement.getLeft() &&
                    canvas.verticalElements[i].getTop() >= upElement.getTop() + upElement.height &&
                    canvas.verticalElements[i].getTop() < underElement.getTop())
            {

                array2.push(canvas.verticalElements[i]);
                canvas.verticalElements[i].opacity = opacity;
            }
        }

    } else if (guiobj1.type2 === "else if" && deleteCondition) {

        upElement = guiobj1;

        for (var i = 0; i < canvas.horizontalElements.length; i++) {

            if (canvas.horizontalElements[i].getLeft() >= upElement.getLeft() &&
                    canvas.horizontalElements[i].getTop() >= upElement.getTop() &&
                    canvas.horizontalElements[i].getTop() < upElement.body.getTop() + upElement.body.height)
            {

                if ((canvas.horizontalElements[i].firstElement === upElement.firstElement) && canvas.horizontalElements[i].type0 === "element" && canvas.horizontalElements[i] !== upElement)
                {
                    if (canvas.horizontalElements[i].id !== "groupLogicExprError") {
                        if (!underElement)
                            underElement = canvas.horizontalElements[i];
                        else if (underElement.top > canvas.horizontalElements[i].top)
                            underElement = canvas.horizontalElements[i];
                    } else {
                        if (guiobj1.isMinus !== true && canvas.horizontalElements[i].getTop() >= upElement.getTop() + upElement.height)
                            continue;
                        array1.push(canvas.horizontalElements[i]);
                        canvas.horizontalElements[i].opacity = opacity;
                    }
                }
                else {
                    if (guiobj1.isMinus !== true && canvas.horizontalElements[i].getTop() >= upElement.getTop() + upElement.height)
                        continue;
                    array1.push(canvas.horizontalElements[i]);
                    canvas.horizontalElements[i].opacity = opacity;
                }
            }
        }
        for (var i = 0; i < canvas.verticalElements.length; i++) {

            if (canvas.verticalElements[i].getLeft() >= upElement.getLeft() &&
                    canvas.verticalElements[i].getTop() >= upElement.getTop() &&
                    canvas.verticalElements[i].getTop() < upElement.body.getTop() + upElement.body.height)
            {
                if (guiobj1.isMinus !== true && canvas.verticalElements[i].getTop() >= upElement.getTop() + upElement.height)
                    continue;
                array2.push(canvas.verticalElements[i]);
                canvas.verticalElements[i].opacity = opacity;
            }
        }
    }
    else {

        for (var index = 0; index < canvas.horizontalElements.length; index++) {
            if (canvas.horizontalElements[index].getLeft() >= guiobj1.firstElement.body.getLeft() &&
                    canvas.horizontalElements[index].getTop() >= guiobj1.firstElement.getTop() &&
                    canvas.horizontalElements[index].getTop() < (guiobj1.firstElement.endElement.getTop() +
                    guiobj1.firstElement.endElement.height))
            {
                array1.push(canvas.horizontalElements[index]);
                if (deleteCondition)
                    canvas.horizontalElements[index].opacity = opacity;
                if (!deleteCondition) {
                    if ((canvas.horizontalElements[index].getTop() >= guiobj1.firstElement.getTop() &&
                            canvas.horizontalElements[index].getTop() < guiobj1.firstElement.getTop()
                            + guiobj1.firstElement.getHeight())) {

                        elementsForCloneElement.push(canvas.horizontalElements[index]);

                    }
                }
            }

            if (canvas.horizontalElements[index].getTop() < guiobj1.firstElement.top && canvas.horizontalElements[index].type0 === "element" && canvas.horizontalElements[index].id !== "groupLogicExprError") {
                if (upElement === null)
                    upElement = canvas.horizontalElements[index];
                else {
                    if (upElement.top < canvas.horizontalElements[index].top)
                        upElement = canvas.horizontalElements[index];
                }
            }
            else if (canvas.horizontalElements[index].top > (guiobj1.firstElement.endElement.height + guiobj1.firstElement.endElement.top) && canvas.horizontalElements[index].type0 === "element" && canvas.horizontalElements[index].id !== "groupLogicExprError") {
                if (underElement === null)
                    underElement = canvas.horizontalElements[index];
                else {
                    if (underElement.top > canvas.horizontalElements[index].top)
                        underElement = canvas.horizontalElements[index];
                }
            }

        }

        for (var index = 0; index < canvas.verticalElements.length; index++) {
            if (canvas.verticalElements[index].getLeft() >= guiobj1.firstElement.body.getLeft() &&
                    canvas.verticalElements[index].getTop() >= guiobj1.firstElement.getTop() &&
                    canvas.verticalElements[index].getTop() < (guiobj1.firstElement.endElement.getTop() +
                    guiobj1.firstElement.endElement.height)) {
                array2.push(canvas.verticalElements[index]);
                if (deleteCondition)
                    canvas.verticalElements[index].opacity = opacity;

            }
        }
    }
    if (guiobj1.type3 === "dowhile" && guiobj1.endElement.hasLogicExprError) {

        array1.push(guiobj1.endElement.groupLogicExprError);
        if (deleteCondition)
            guiobj1.endElement.groupLogicExprError.opacity = opacity;
    }
    guiobj1.upElement = upElement;
    guiobj1.underElement = underElement;

}

function FindAboveAndUnderElements(canvas, guiobj1, array, changeOpacity) {

    var upElement = null;
    var underElement = null;
    array.length = 0;
    var opacity = 0.3;
    for (var index = 0; index < canvas.horizontalElements.length; index++) {

        if (canvas.horizontalElements[index].getLeft() >= guiobj1.getLeft() &&
                canvas.horizontalElements[index].getTop() >= guiobj1.getTop() &&
                canvas.horizontalElements[index].getTop() < guiobj1.getTop()
                + guiobj1.getHeight())
        {

            array.push(canvas.horizontalElements[index]);
            if (changeOpacity)
                canvas.horizontalElements[index].opacity = opacity;
        }

        if (canvas.horizontalElements[index].getTop() < guiobj1.top && canvas.horizontalElements[index].type0 === "element") {
            if (canvas.horizontalElements[index].id !== "groupLogicExprError") {
                if (upElement === null)
                    upElement = canvas.horizontalElements[index];
                else {

                    if (upElement.top < canvas.horizontalElements[index].top)
                        upElement = canvas.horizontalElements[index];

                }

            }
        }

        else if (canvas.horizontalElements[index].top > guiobj1.top && canvas.horizontalElements[index].type0 === "element") {

            if (canvas.horizontalElements[index].id !== "groupLogicExprError") {
                if (underElement === null)
                    underElement = canvas.horizontalElements[index];
                else {
                    if (underElement.top > canvas.horizontalElements[index].top)
                        underElement = canvas.horizontalElements[index];
                }

            }
        }

    }
    if (guiobj1.id2 === "assign" && guiobj1.hasLogicExprError) {
        array.push(guiobj1.groupLogicExprError);
        if (changeOpacity)
            guiobj1.groupLogicExprError.opacity = opacity;
    }

    guiobj1.upElement = upElement;
    guiobj1.underElement = underElement;


}

