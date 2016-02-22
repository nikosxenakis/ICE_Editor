/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function  AddElementFromSideBar(canvas, imageType) {
//    var functionTable = [{value: "If", functionName: "AddFromSideBarIfWhileElement"}, {value: "Assign", functionName: "AddFromSideBarAssignElement"}, {value: "While", functionName: "AddFromSideBarIfWhileElement"}, {value: "DoNothing", functionName: "AddFromSideBarDoNothingElement"}];
//    var fi = _.find(functionTable, function(d) {
//        return d.value === imageType;
//    });
  var elementInfoObject;
    _.each(canvas.VPL_elementsInfo, function(subCategory) {

        _.each(subCategory.tools, function(item) {

            _.each(item.images, function(item) {

                if (item.id === imageType)
                {
                    elementInfoObject = item;
                    return;
                }

            });
        });
    });
    window[elementInfoObject.functionCallNameFromSideBar](canvas, elementInfoObject);

}

function AddFromSideBarDoNothingElement(canvas, elementInfoObject) {
    if (canvas.elementsUnderDragElement[1].id2 === "doNothing" || canvas.elementsUnderDragElement[0].id2 === "doNothing")
        return;
    else {
        canvas.point[1] = canvas.elementsUnderDragElement[1].top;

        if (canvas.elementsUnderDragElement[1].id === "element1") {
            canvas.point[0] = canvas.elementsUnderDragElement[0].left;
        }
        TranslateElements(elementInfoObject.translateLengthFromSideBar, canvas);
        DoNothingElement(canvas);
    }
}

function AddFromSideBarElement(canvas, elementInfoObject) {

    if (canvas.elementsUnderDragElement[0].id2 === "doNothing")
    {
        AddElementFromSideBarRemoveDonothing(canvas, elementInfoObject.translateLength, canvas.elementsUnderDragElement[0]);
    }
    else if (canvas.elementsUnderDragElement[1].id2 === "doNothing")
    {
        AddElementFromSideBarRemoveDonothing(canvas, elementInfoObject.translateLength, canvas.elementsUnderDragElement[1]);
    }

    else {
        canvas.point[1] = canvas.elementsUnderDragElement[1].top;

        if (canvas.elementsUnderDragElement[1].id === "element1") {
            canvas.point[0] = canvas.elementsUnderDragElement[0].left;
        }
        TranslateElements(elementInfoObject.translateLengthFromSideBar, canvas);

    }
         window[elementInfoObject.functionToCreateElement](canvas, elementInfoObject);
}

function AddElementFromSideBarRemoveDonothing(canvas, translateLength, element) {
   
        canvas.point[1] = element.top;
        canvas.point[0] = element.left;
        canvas.remove(element);
        DeleteElementFromArray(element, canvas.horizontalElements);
        TranslateElements(translateLength, canvas);

}