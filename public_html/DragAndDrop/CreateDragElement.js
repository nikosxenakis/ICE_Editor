/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function  CreateDragElementClone(guiobj, canvas) {

    var group = new fabric.Group();
    canvas.groupArray.length = 0;
    var elementsForCloneElement = new Array();
    if (guiobj.id2 === "flowcontrol1") {
        if (guiobj.firstElement.type3 === "dowhile") {
            elementsForCloneElement = guiobj.elementsForCloneElement2;
        }
        else {
            elementsForCloneElement = guiobj.elementsForCloneElement;
        }
    }
    else {
        elementsForCloneElement = canvas.itemsOfDraggableElement;
    }

    canvas.objectMoving = guiobj.firstElement;

    for (var index = 0; index < elementsForCloneElement.length; index++) {
        if (guiobj.id2 !== "flowcontrol1")
            elementsForCloneElement[index].opacity = 0.5;

        if (elementsForCloneElement[index].get('type') === "group") {
            var items = elementsForCloneElement[index]._objects;
            if (index === 0) {
                for (var i = 0; i < items.length; i++) {
                    group.addWithUpdate(items[i].clone());
                }
                group.left = elementsForCloneElement[index].left;
                group.top = elementsForCloneElement[index].top;
                canvas.groupArray.push(group);
                canvas.add(group);
            }
            else
            {
                var group1 = new fabric.Group();

                for (var i = 0; i < items.length; i++) {
                    group1.addWithUpdate(items[i].clone());
                }
                if (elementsForCloneElement[index].id === "groupDeleteButton" || elementsForCloneElement[index].id === "groupDeleteButton1") {

                    group1.left = elementsForCloneElement[index].left - 8;
                    group1.top = elementsForCloneElement[index].top + 3;
                    group1.setAngle(45).setCoords();

                }
                else {
                    group1.left = elementsForCloneElement[index].left;
                    group1.top = elementsForCloneElement[index].top;
                }

                canvas.add(group1);
                canvas.groupArray.push(group1);
            }
        }

        else {
            if (index === 0) {
                group.addWithUpdate(elementsForCloneElement[index].clone());
                group.left = elementsForCloneElement[index].left;
                group.top = elementsForCloneElement[index].top;
                canvas.groupArray.push(group);
                canvas.add(group);
            }
            else {
                var group1 = new fabric.Group();
                group1.addWithUpdate(elementsForCloneElement[index].clone());
                group1.left = elementsForCloneElement[index].left;
                group1.top = elementsForCloneElement[index].top;
                canvas.add(group1);
                canvas.groupArray.push(group1);
            }
        }
    }

    if (guiobj.id2 === "flowcontrol1") {
        var group1 = new fabric.Group();

        if (guiobj.firstElement.type3 === "dowhile") {
            for (var i = 0; i < guiobj.elementsForCloneElement.length; i++) {
                group1.addWithUpdate(guiobj.elementsForCloneElement[i].clone());

            }

            var body = new fabric.Rect({
                left: group1.item(0).left,
                top: group1.item(0).top + group1.item(0).height,
                fill: guiobj.firstElement.fill,
                width: 25,
                height: 33,
                lockMovementX: true,
                lockMovementY: true,
                hasControls: false,
                hasBorders: false

            });
            group1.add(body);
            var InsideElement = new fabric.Rect({
                left: body.left + body.width + 1,
                top: body.top + 1,
                fill: '#C8C8C8',
                width: 250,
                height: 30
            });
            group1.add(InsideElement);
            group1.left = canvas.groupArray[0].left;
            group1.top = canvas.groupArray[0].top - canvas.groupArray[0].height - 3;
            canvas.groupArray.push(group1);
            canvas.add(group1);
             for (var i = canvas.groupArray.length - 2; i >= 0; i--) {
                canvas.groupArray[i + 1] = canvas.groupArray[i];
            }

            canvas.groupArray[0] = group1;
        }
        else {
            for (var i = 0; i < guiobj.elementsForCloneElement2.length; i++) {
                group1.addWithUpdate(guiobj.elementsForCloneElement2[i].clone());

            }
            var body = new fabric.Rect({
                left: group1.item(0).left,
                top: group1.item(0).top - 33,
                fill: guiobj.firstElement.fill,
                width: 25,
                height: 33,
                lockMovementX: true,
                lockMovementY: true,
                hasControls: false,
                hasBorders: false

            });
            group1.add(body);
            var InsideElement = new fabric.Rect({
                left: body.left + body.width + 1,
                top: body.top + 1,
                fill: '#C8C8C8',
                width: 250,
                height: 30
            });
            group1.add(InsideElement);
            group1.left = canvas.groupArray[0].left ;
            group1.top = canvas.groupArray[0].top + canvas.groupArray[0].height + 32;
            canvas.groupArray.push(group1);
            canvas.add(group1);
            
        }

        for (var index = 0; index < canvas.itemsOfDraggableElement.length; index++) {

            canvas.itemsOfDraggableElement[index].opacity = 0.5;

        }
    }

    for (var index = 0; index < canvas.groupArray.length; index++) {

        for (var i = 0; i < canvas.groupArray[index]._objects.length; i++) {
            canvas.groupArray[index]._objects[i].hasControls = false;
            canvas.groupArray[index]._objects[i].hasBorders = false;

        }
        canvas.groupArray[index].opacity = 0.5;
        canvas.groupArray[index].hasControls = false;
        canvas.groupArray[index].hasBorders = false;

    }

}


function  SetItemsOfDraggableElement(guiobj, canvas) {

    canvas.itemsOfDraggableElement.length = 0;

    if (guiobj.id2 === "flowcontrol1")
        SetItemsOfDraggableFlowControlElement(guiobj, canvas);

    else

    {
        var guiobj1 = guiobj.firstElement;
        FindAboveAndUnderElements(canvas, guiobj1, canvas.itemsOfDraggableElement, false);

    }
}

//here we put  the elements of firstelement in array, to clone them and find the above and under elements of flow control element.
function SetItemsOfDraggableFlowControlElement(guiobj, canvas) {
    var elementsForCloneElement2 = new Array();
    var elementsForCloneElement = new Array();
   
    FindAboveAndUnderOfFlowControlElements(canvas, guiobj.firstElement, canvas.itemsOfDraggableElement, canvas.itemsOfDraggableElement, false, elementsForCloneElement);
    FindEndElementItems(canvas, guiobj.firstElement.endElement, elementsForCloneElement2);

    guiobj.elementsForCloneElement = elementsForCloneElement;
    guiobj.elementsForCloneElement2 = elementsForCloneElement2;
}

function  FindEndElementItems(canvas, guiobj1, elementsForCloneElement2) {

    for (var index = 0; index < canvas.horizontalElements.length; index++) {

        if ((canvas.horizontalElements[index].getTop() >= guiobj1.getTop() &&
                canvas.horizontalElements[index].getTop() < guiobj1.getTop()
                + guiobj1.getHeight())) {
            if (canvas.horizontalElements[index].id === "endLine")
                ;
            else
                elementsForCloneElement2.push(canvas.horizontalElements[index]);

        }

    }
    
     if (guiobj1.type3 === "dowhile" && guiobj1.hasLogicExprError) {
        elementsForCloneElement2.push(guiobj1.groupLogicExprError);
      
    }
}