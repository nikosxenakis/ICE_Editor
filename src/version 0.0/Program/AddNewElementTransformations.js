/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function TranslateElements(length, canvas, element, condition) {

    _.each(canvas.verticalElements, function(elem) {
        if (elem.getTop() <= canvas.point[1] && canvas.point[1] <= (elem.getTop() + elem.getHeight())) {
            if ((element === elem.firstElement && condition) || (canvas.notLength && _.indexOf(canvas.notLengthenedElements, elem) >= 0) || _.indexOf(canvas.codeFoldingElementsNotTranslate, elem) >= 0) {
                ;
            } else {
                elem.setHeight(elem.getHeight() + length).setCoords();
                canvas.SetCanvasHeight(elem, length);
            }

        }

    });

    TranslateHorizontalElements(canvas.horizontalElements, length, canvas);
    TranslateHorizontalElements(canvas.verticalElements, length, canvas);

    canvas.codeFolding.translateHiddenElemements(canvas, length);
    canvas.renderAll();
    canvas.notTranslate = false;
    canvas.notLength = false;
    canvas.notTranslateCodeFoldingElements = false;
}

function TranslateHorizontalElements(elements, length, canvas) {

    if (canvas.notTranslate) {
        _.each(elements, function(elem) {

            if (elem.getTop() >= canvas.point[1]) {
                if (_.indexOf(canvas.itemsOfDraggableElement, elem) >= 0 || (_.indexOf(canvas.codeFoldingElementsNotTranslate, elem) >= 0 && canvas.notTranslateCodeFoldingElements)) {
                    ;
                }
                else {

                    elem.setTop(elem.getTop() + length).setCoords();
                    canvas.SetCanvasHeight(elem, length);
                }
            }
        });
    }

    else {
        _.each(elements, function(elem) {
            if (_.indexOf(canvas.codeFoldingElementsNotTranslate, elem) >= 0 && canvas.notTranslateCodeFoldingElements) {
                ;
            } else {
                if (elem.getTop() >= canvas.point[1]) {
                    elem.setTop(elem.getTop() + length).setCoords();
                    canvas.SetCanvasHeight(elem, length);
                }
            }
        });
    }

}

function DeleteElementFromArray(element, array) {
    if (_.indexOf(array, element) >= 0) {
        array.splice(_.indexOf(array, element), 1);

    }
}