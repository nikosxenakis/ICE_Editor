/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function IFWhileElement(canvas, elementInfoObject, element) {

    var startElement = CreateFlowControlElementStart(canvas, elementInfoObject.startElementWords[0], elementInfoObject.startElementWords[1], elementInfoObject.color, elementInfoObject.startElementWidth, elementInfoObject.insideElementOffset, element, "flowcontrol1");

    startElement.firstElement = startElement;
    var EndElement1 = new CreateEndElement(canvas);
    EndElement1.BodyElement(startElement.left, startElement.top + startElement.height - 1, elementInfoObject.color, startElement, 58);
    EndElement1.bodyElement.mainElement = startElement;
    AddEndElement(canvas, startElement, elementInfoObject);
    canvas.SetCanvasWidth(startElement, 100);

    canvas.point[1] = startElement.top + startElement.height + 3;
    canvas.point[0] = EndElement1.bodyElement.left + EndElement1.bodyElement.width + 3;
    DoNothingElement(canvas);

    canvas.codeFolding.initCodeFoldingButton(startElement.top + startElement.height - 10, canvas, 54, startElement);

}

function WaitUntilElement(canvas, elementInfoObject, element) {
    var startElement = CreateFlowControlElementStart(canvas, elementInfoObject.startElementWords[0], elementInfoObject.startElementWords[1], elementInfoObject.color, elementInfoObject.startElementWidth, elementInfoObject.insideElementOffset, element, "assign");
    startElement.firstElement = startElement;
    startElement.type3 = "waituntil";
    startElement.type2 = "";
}

function FlowControlElementsCreator(canvas, elementInfoObject){
    
    var startElement = CreateElementStart(canvas, elementInfoObject, "flowcontrol1");
  //  CreateRepeatElementCondition(canvas, startElement);
  if(elementInfoObject.functionToCreateCondition)
     window[elementInfoObject.functionToCreateCondition](canvas, startElement, elementInfoObject);
    var EndElement1 = new CreateEndElement(canvas);
    EndElement1.BodyElement(startElement.left, startElement.top + startElement.height - 1, elementInfoObject.color, startElement, 58);
    EndElement1.bodyElement.mainElement = startElement;
    AddEndElement(canvas, startElement, elementInfoObject);
    canvas.SetCanvasWidth(startElement, 100);

    canvas.point[1] = startElement.top + startElement.height + 3;
    canvas.point[0] = EndElement1.bodyElement.left + EndElement1.bodyElement.width + 3;
    DoNothingElement(canvas);

    canvas.codeFolding.initCodeFoldingButton(startElement.top + startElement.height - 10, canvas, 54, startElement);
  
}

//function ForEverElement(canvas, elementInfoObject) {
//
//    var startElement = CreateElementStart(canvas, elementInfoObject, "flowcontrol1");
//
//    var EndElement1 = new CreateEndElement(canvas);
//    EndElement1.BodyElement(startElement.left, startElement.top + startElement.height - 1, elementInfoObject.color, startElement, 58);
//    EndElement1.bodyElement.mainElement = startElement;
//    AddEndElement(canvas, startElement, elementInfoObject);
//    canvas.SetCanvasWidth(startElement, 100);
//
//    canvas.point[1] = startElement.top + startElement.height + 3;
//    canvas.point[0] = EndElement1.bodyElement.left + EndElement1.bodyElement.width + 3;
//    DoNothingElement(canvas);
//
//    canvas.codeFolding.initCodeFoldingButton(startElement.top + startElement.height - 10, canvas, 54, startElement);
//
//}
//
//function RepeatElement(canvas, elementInfoObject){
//    
//    var startElement = CreateElementStart(canvas, elementInfoObject, "flowcontrol1");
//    CreateRepeatElementCondition(canvas, startElement);
//    var EndElement1 = new CreateEndElement(canvas);
//    EndElement1.BodyElement(startElement.left, startElement.top + startElement.height - 1, elementInfoObject.color, startElement, 58);
//    EndElement1.bodyElement.mainElement = startElement;
//    AddEndElement(canvas, startElement, elementInfoObject);
//    canvas.SetCanvasWidth(startElement, 100);
//
//    canvas.point[1] = startElement.top + startElement.height + 3;
//    canvas.point[0] = EndElement1.bodyElement.left + EndElement1.bodyElement.width + 3;
//    DoNothingElement(canvas);
//
//    canvas.codeFolding.initCodeFoldingButton(startElement.top + startElement.height - 10, canvas, 54, startElement);
//  
//}
//
//function ForElement(canvas, elementInfoObject){
//    var startElement = CreateElementStart(canvas, elementInfoObject, "flowcontrol1");
//    CreateForElementCondition(canvas, startElement, elementInfoObject);
//    var EndElement1 = new CreateEndElement(canvas);
//    EndElement1.BodyElement(startElement.left, startElement.top + startElement.height - 1, elementInfoObject.color, startElement, 58);
//    EndElement1.bodyElement.mainElement = startElement;
//    AddEndElement(canvas, startElement, elementInfoObject);
//    canvas.SetCanvasWidth(startElement, 100);
//
//    canvas.point[1] = startElement.top + startElement.height + 3;
//    canvas.point[0] = EndElement1.bodyElement.left + EndElement1.bodyElement.width + 3;
//    DoNothingElement(canvas);
//
//    canvas.codeFolding.initCodeFoldingButton(startElement.top + startElement.height - 10, canvas, 54, startElement);
//  
//    
//}

function DoWhileElement(canvas, elementInfoObject, element) {

    var endElement = AddFlowControlEndElement(canvas.point[1], canvas.point[0], elementInfoObject, canvas);
    var EndElement1 = new CreateEndElement(canvas);
    EndElement1.BodyElement(endElement.left, endElement.top + endElement.height - 1, elementInfoObject.color, endElement, 58);
    EndElement1.bodyElement.mainElement = endElement;

    canvas.point[1] = endElement.top + endElement.height + 3;
    canvas.point[0] = EndElement1.bodyElement.left + EndElement1.bodyElement.width + 3;
    DoNothingElement(canvas);
    canvas.point[1] = EndElement1.bodyElement.top + EndElement1.bodyElement.height - 1;
    canvas.point[0] = endElement.left;
    var startElement = CreateFlowControlElementStart(canvas, elementInfoObject.startElementWords[0], elementInfoObject.startElementWords[1], elementInfoObject.color, elementInfoObject.startElementWidth, elementInfoObject.insideElementOffset, element, "flowcontrol1", endElement);
    startElement.body = endElement.body;
    endElement.endElement = startElement;
    endElement.type3 = "dowhile";
    startElement.endElement = startElement;

    startElement.type3 = "dowhile";
    startElement.type2 = "end";
    startElement.id = "element1";
    canvas.codeFolding.initCodeFoldingButton(endElement.top + endElement.height - 10, canvas, 54, endElement);

}

function AddFlowControlEndElement(top, left, fi, canvas) {

    var endElement = new fabric.Rect({
        left: left,
        top: top,
        fill: fi.color,
        width: fi.endElementWidth,
        height: 50,
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });
    endElement.type0 = "element";
    endElement.type2 = "start";
    endElement.id2 = "flowcontrol1";

    canvas.add(endElement);
    canvas.horizontalElements.push(endElement);
    var text1 = new fabric.Text(fi.endElementWords[0], {
        left: endElement.left + 18,
        top: endElement.top + 13,
        fill: 'black',
        fontSize: '23',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });
    text1.id2 = "flowcontrol1";

    endElement.text = text1;
    endElement.mainElement = endElement;
    text1.firstElement = endElement;
    endElement.firstElement = endElement;
    canvas.horizontalElements.push(text1);
    canvas.add(text1);
    text1.mainElement = endElement;
    return endElement;
}

function AddElseElement(element, canvas, height) {
    var elseElement = element.firstElement.endElement;
    elseElement.setWidth(210).setCoords();
    DeleteElementFromArray(elseElement.text1, canvas.horizontalElements); //delete else text
    canvas.remove(elseElement.text1);
    DeleteElementFromArray(elseElement.text2, canvas.horizontalElements); //delete text do nothing
    canvas.remove(elseElement.text2);
    canvas.point[1] = elseElement.top + elseElement.height + 3;
    elseElement.type2 = "else";
    var EndElement1 = new CreateEndElement(canvas);
    var body = elseElement.body;
    EndElement1.BodyElement(element.mainElement.left, elseElement.height + elseElement.top - 1, element.mainElement.fill, elseElement, height);
    EndElement1.bodyElement.mainElement = element;
    elseElement.body = body;
    EndElement1.EndElement(element.firstElement.left, EndElement1.bodyElement.top + EndElement1.bodyElement.height - 1, element.firstElement, 280, element.firstElement.fill);
    var endElement = EndElement1.endElement;
    endElement.mainElement = endElement;
    EndElement1.EndIfText(endElement.left + 22, endElement.top + 12, element.firstElement, endElement);

    EndElement1.endIfText.mainElement = endElement;
    endElement.body = EndElement1.bodyElement;
    endElement.text = EndElement1.endIfText;
    canvas.point[0] = EndElement1.endIfText.left + 6;
    canvas.codeFolding.initCodeFoldingButton(elseElement.top + elseElement.height - 10, canvas, height - 4, elseElement);

    canvas.renderAll();

}

function DeleteElseElement(underElement, aboveElement, canvas) {
    DeleteElementFromArray(underElement.body, canvas.verticalElements);
    canvas.remove(underElement.body);
    var EndElement1 = new CreateEndElement(canvas);
    EndElement1.DoNothingText(aboveElement.text.oCoords.tr.x + 5, aboveElement.text.top, aboveElement.firstElement, aboveElement);
    aboveElement.text2 = underElement.text; //text do nothing
    aboveElement.text2.setLeft(aboveElement.text1.oCoords.tr.x + 5).setCoords();
    aboveElement.text2.setTop(aboveElement.text.top).setCoords();
    aboveElement.setWidth(280).setCoords();
    aboveElement.firstElement.endElement = aboveElement;
    aboveElement.id = "element1";
    aboveElement.type2 = "end";
    aboveElement.isMinus = true;
    aboveElement.text2.mainElement = aboveElement;
    DeleteElementFromArray(underElement, canvas.horizontalElements);
    canvas.remove(underElement);
    AddDoNothingElement(aboveElement.left, aboveElement.top + aboveElement.height, canvas, -aboveElement.height - 3, false);
    canvas.renderAll();

}


function CreateEndElement(canvas) {
    this.endElement;
    this.endIfText;
    this.doNothingText;
    this.bodyElement;
    this.BodyElement = function(left, top, color, startElement, height) {

        this.bodyElement = new fabric.Rect({
            left: left,
            top: top,
            fill: color,
            width: 25,
            height: height,
            lockMovementX: true,
            lockMovementY: true,
            hasControls: false,
            hasBorders: false

        });
        this.bodyElement.id2 = "flowcontrol1";
        startElement.body = this.bodyElement;
        this.bodyElement.firstElement = startElement.firstElement;
        canvas.verticalElements.push(this.bodyElement);
        canvas.add(this.bodyElement);
    };
    this.EndElement = function(left, top, startElement, width, color) {

        this.endElement = new fabric.Rect({
            left: left,
            top: top,
            fill: color,
            width: width,
            height: 50,
            lockMovementX: true,
            lockMovementY: true,
            hasControls: false,
            hasBorders: false
        });
        this.endElement.type0 = "element";
        this.endElement.id = "element1";
        this.endElement.type2 = "end";
        this.endElement.id2 = "flowcontrol1";
        this.endElement.firstElement = startElement;
        this.endElement.body = startElement.body;
        startElement.endElement = this.endElement;
        canvas.add(this.endElement);
        canvas.horizontalElements.push(this.endElement);
    };
    this.EndIfText = function(left, top, startElement, endElement) {

        this.endIfText = new fabric.Text("end if", {
            left: left,
            top: top,
            fill: 'black',
            fontSize: '23',
            fontWeight: 'bold',
            fontFamily: ' Arial',
            lockMovementX: true,
            lockMovementY: true,
            hasControls: false,
            hasBorders: false
        });
        this.endIfText.id2 = "flowcontrol1";
        this.endIfText.firstElement = startElement;
        endElement.text2 = this.endIfText;
        canvas.horizontalElements.push(this.endIfText);
        canvas.add(this.endIfText);
    };
    this.DoNothingText = function(left, top, startElement, endElement) {

        this.doNothingText = new fabric.Text("do nothing ", {
            left: left,
            top: top,
            fill: 'grey',
            fontSize: '23',
            fontFamily: ' Arial',
            lockMovementX: true,
            lockMovementY: true,
            hasControls: false,
            hasBorders: false
        });
        this.doNothingText.id2 = "flowcontrol1";
        this.doNothingText.firstElement = startElement;
        this.doNothingText.mainElement = endElement;
        this.doNothingText.id = "do nothing";
        endElement.text1 = this.doNothingText;
        this.doNothingText.downClicked = function() {

            var offsetTop = $("#viewport").scrollTop();
            var offsetLeft = $("#viewport").scrollLeft();
            var x2 = this.left;
            var y2 = this.top + 30;
            $("#menu").css({top: y2 - offsetTop, left: x2 - offsetLeft});
            $("#menu").show();
            canvas.doNothingElement = this;

        };

        this.doNothingText.mouseOver = function() {
            this.fill = '#A8A8A8';
            canvas.renderAll();
        };

        this.doNothingText.mouseOut = function() {
            this.fill = 'grey';
            canvas.renderAll();

        };
        canvas.horizontalElements.push(this.doNothingText);
        canvas.add(this.doNothingText);
    };
}

function AddEndElement(canvas, startElement, elementInfoObject) {
    var EndElement1 = new CreateEndElement(canvas);
    EndElement1.EndElement(startElement.left, startElement.body.top + startElement.body.height - 1, startElement, elementInfoObject.endElementWidth, startElement.fill);
    var endElement = EndElement1.endElement;
    endElement.mainElement = endElement;
    var text1 = new fabric.Text(elementInfoObject.endElementWords[0], {
        left: startElement.left + 18,
        top: endElement.top + 13,
        fill: 'black',
        fontSize: '23',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });
    text1.id2 = "flowcontrol1";
    text1.firstElement = startElement;
    endElement.text = text1;
    canvas.horizontalElements.push(text1);
    canvas.add(text1);
    text1.mainElement = endElement;
    if (elementInfoObject.endElementWords.length > 1) {
        EndElement1.DoNothingText(text1.oCoords.tr.x + 5, text1.top, startElement, endElement);
        //EndElement1.mainElement = endElement;
        EndElement1.EndIfText(EndElement1.doNothingText.oCoords.tr.x + 5, text1.top, startElement, endElement);
        EndElement1.endIfText.mainElement = endElement;
        EndElement1.doNothingText.mainElement = endElement;
    }
}