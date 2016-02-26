/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function CreateElementStart(canvas, elementInfoObject, id2) {

    var startElement = new fabric.Rect({
        left: canvas.point[0],
        top: canvas.point[1],
        fill: elementInfoObject.color,
        width: elementInfoObject.startElementWidth,
        height: 50,
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    startElement.type2 = "start";
    startElement.type0 = "element"; //we want that for drag and drop of doNothing element
    startElement.id2 = id2;
    startElement.mainElement = startElement;
    startElement.firstElement = startElement;
    startElement.hasLogicExprError = false;
    canvas.add(startElement);
    canvas.horizontalElements.push(startElement);

    var text = new fabric.Text(elementInfoObject.startElementWords[0], {
        left: canvas.point[0] + 18,
        top: startElement.top + 15,
        fill: 'black',
        fontSize: '23',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });
    startElement.text = text;
    text.id2 = id2;
    text.firstElement = startElement;
    text.mainElement = startElement;
    canvas.add(text);
    canvas.horizontalElements.push(text);
    return startElement;
}