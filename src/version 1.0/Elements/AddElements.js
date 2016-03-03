function AddNewElements(canvas, value) {

    var fi;
    _.each(canvas.VPL_elementsInfo, function(subCategory) {

        _.each(subCategory.tools, function(item) {

            _.each(item.images, function(item) {

                if (item.id === value)
                {
                    fi = item;
                    return;
                }

            });
        });
    });

    window[fi.functionCallNameFromDoNothing](canvas.doNothingElement, canvas, fi);
    $("#menu").hide();
}

function AddDoNothingElement(left, top, canvas, offset, addDonothingElement) {
    canvas.point[0] = left;
    canvas.point[1] = top;
    TranslateElements(offset, canvas);
    if (addDonothingElement)
        DoNothingElement(canvas);
    canvas.renderAll();
}

function AddIfElement(element, canvas, fi) {

    if (element.id2 === "flowcontrol1") {
        canvas.point[0] = element.mainElement.left;
        canvas.point[1] = element.mainElement.top;
        canvas.codeFolding.FindEndLine(canvas);
        TranslateElements(fi.translateLength, canvas, element.mainElement.firstElement, true);
        var startElement = CreateFlowControlElementStart(canvas, "else if", "then", element.mainElement.firstElement.fill, 393, 25, element, "flowcontrol1");
        var EndElement1 = new CreateEndElement(canvas);
        EndElement1.BodyElement(element.mainElement.left, startElement.height + startElement.top - 1, element.mainElement.firstElement.fill, startElement, 58);
        EndElement1.bodyElement.mainElement = startElement;
        element.mainElement.body = EndElement1.bodyElement;
        canvas.point[0] = element.mainElement.body.left + element.mainElement.body.width + 3;
        canvas.point[1] = startElement.top + startElement.height + 3;
        DoNothingElement(canvas);
       
        canvas.codeFolding.initCodeFoldingButton(startElement.top + startElement.height - 10, canvas, 54, startElement);

        canvas.renderAll();
    }
    else {
        AddElementFromSideBarRemoveDonothing(canvas, fi.translateLength, element);
        IFWhileElement(canvas, fi, element);
    }

}

function AddFlowControlElement(element, canvas, fi) {

    if (element.id2 === "flowcontrol1") {

        canvas.point[0] = element.firstElement.endElement.left;
        canvas.point[1] = element.firstElement.endElement.top + element.firstElement.endElement.height;
        TranslateElements(106, canvas);
        AddElseElement(element, canvas, 58);
        TranslateElements(fi.translateLength, canvas);
    }
    else {

        AddElementFromSideBarRemoveDonothing(canvas, fi.translateLength, element);
    }

    window[fi.functionToCreateElement](canvas, fi, element);

}

function AddAssignElement(element, canvas, fi) {

    if (element.id2 === "flowcontrol1") {

        canvas.point[0] = element.firstElement.endElement.left;
        canvas.point[1] = element.firstElement.endElement.top + element.firstElement.endElement.height;
        TranslateElements(89, canvas);
        AddElseElement(element, canvas, 41);
        TranslateElements(51, canvas);
    }
    else {

        AddElementFromSideBarRemoveDonothing(canvas, fi.translateLength, element);
    }
    
     window[fi.functionToCreateElement](canvas);
}