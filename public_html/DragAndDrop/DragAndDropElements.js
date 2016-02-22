/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function  SetNewPositionOfDraggableElement(guiobj, canvas) {

    var firstElement;
    var secondElement;
    var countObjects = 0;
    var length;

    if (canvas.elementsUnderDragElement.length > 1) {

        firstElement = canvas.elementsUnderDragElement[0];
        secondElement = canvas.elementsUnderDragElement[1];
        countObjects = 2;

    }
    
    if (guiobj.firstElement.type3 === "waituntil")
        length = guiobj.firstElement.height + 3;
    else if (guiobj.id2 === "assign")
        length = guiobj.height + 4;
    else if (guiobj.id2 === "flowcontrol1")
        length = (guiobj.endElement.height + guiobj.endElement.top - guiobj.top) + 3;

    else
        length = guiobj.height + 2;


    canvas.renderAll();
    if (countObjects === 2) {
        if (((guiobj.id2 !== "flowcontrol1" && secondElement !== guiobj && firstElement !== guiobj) || (guiobj.id2 === "flowcontrol1" && secondElement !== guiobj.endElement && firstElement !== guiobj && secondElement !== guiobj && firstElement !== guiobj.endElement)) && secondElement.id !== "groupLogicExprError") {
            var deleteDonothing = false;

            if (secondElement.id2 === "doNothing" || firstElement.id2 === "doNothing") { //if one of two elements where we will put draggable element is doNothing

                if (secondElement.id2 === "doNothing")
                {
                    canvas.doNothingToDelete = secondElement;

                }
                else {
                    canvas.doNothingToDelete = firstElement;

                }
                deleteDonothing = true;

            }
            canvas.rightClickedElement = guiobj;

            if (secondElement.id === "element1") {
                DeleteGroups(canvas);
                DeleteTranslateElement(canvas, false, firstElement.left, secondElement.top, length);
                if (deleteDonothing) {//if one of the elements that we will put dragging element is doNothing, we delete it.

                    canvas.rightClickedElement = canvas.doNothingToDelete;
                    FindAboveAndUnderElements(canvas, canvas.rightClickedElement, canvas.itemsOfDraggableElement, false);

                    DeleteTranslateElement(canvas, true);
                }

            }
            else {

                DeleteGroups(canvas);
                DeleteTranslateElement(canvas, false, secondElement.left, secondElement.top, length);

                if (deleteDonothing) {

                    canvas.rightClickedElement = canvas.doNothingToDelete;
                    FindAboveAndUnderElements(canvas, canvas.rightClickedElement, canvas.itemsOfDraggableElement, false);

                    DeleteTranslateElement(canvas, true);

                }

            }
            if (canvas.object) {
                canvas.deleteButton.SetPosition(canvas.object);
            }
        } else {

            DeleteGroups(canvas);
            SetOriginalOpacity(canvas);

        }
    }
    else {

        DeleteGroups(canvas);
        SetOriginalOpacity(canvas);

    }

    canvas.renderAll();
}

function DragAndDropCloneElement(groupArray, x, y) {

    for (var index = 0; index < groupArray.length; index++) {

        groupArray[index].set({'left': groupArray[index].left - x, 'top':
                    groupArray[index].top - y});
        groupArray[index].setCoords();

    }

}
//here we delete clone of drag element
function DeleteGroups(canvas) {
    for (var index = 0; index < canvas.groupArray.length; index++) {
        canvas.remove(canvas.groupArray[index]);
    }

    canvas.groupArray.length = 0;
    canvas.renderAll();
}

function  SetOriginalOpacity(canvas) {

    for (var index = 0; index < canvas.itemsOfDraggableElement.length; index++) {

        {
            canvas.itemsOfDraggableElement[index].opacity = 1;
        }
    }
    canvas.itemsOfDraggableElement.length = 0;
}