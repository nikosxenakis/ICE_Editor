/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function DoNothingElement(canvas) {
    var doNothingElement = new fabric.Rect({
        left: canvas.point[0],
        top: canvas.point[1],
        fill: '#00CC00',
        width: 210,
        height: 50
    });

    var textDoNothing = new fabric.Text("do nothing", {
        left: canvas.point[0] + 45,
        top: canvas.point[1] + 15,
        fill: 'grey',
        fontSize: '21',
        fontWeight: 'bold',
        fontFamily: ' Arial'
    });

    var groupDoNothing = new fabric.Group(
            [doNothingElement, textDoNothing],
            {
                lockMovementX: true,
                lockMovementY: true,
                hasControls: false,
                hasBorders: false
            });
    groupDoNothing.id2 = "doNothing";
    groupDoNothing.type0 = "element";
    groupDoNothing.firstElement = groupDoNothing;

    groupDoNothing.downClicked = function() {

        var offsetTop = $("#viewport").scrollTop();
        var offsetLeft = $("#viewport").scrollLeft();
        var x2 = groupDoNothing.left;
        var y2 = groupDoNothing.top + 50;
        $("#menu").css({top: y2 - offsetTop, left: x2 - offsetLeft});
        $("#menu").show();
        canvas.doNothingElement = this;
        //AddNewElements(groupDoNothing, canvas);
    };
    canvas.horizontalElements.push(groupDoNothing);
    canvas.add(groupDoNothing);

}