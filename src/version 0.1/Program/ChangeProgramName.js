/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function  ChangeProgramName(textProgramNameStart, textProgramNameEnd, textEnd, canvas, pointsStartElement, pointsEndElement) {

    $("#submit").unbind().click(function() {
        var name = $("#name").val();
        if ($.trim(name) === '') {
            $("#dialog").dialog("close");
        } else {
            var previousProgramName = textProgramNameStart.oCoords.tr.x;
            textProgramNameStart.setText(name);
            textProgramNameEnd.setText(name);
            ProgramElementTransformations(previousProgramName, textProgramNameStart, textEnd, canvas, pointsStartElement, pointsEndElement);
            $("#dialog").dialog("close");
            canvas.renderAll();

        }
    });
    $("#cancel").unbind().click(function() {
        $("#dialog").dialog("close");

    });

}

function  ProgramElementTransformations(previousProgramName, textProgramNameStart, textEnd, canvas, pointsStartElement, pointsEndElement) {


    if (textProgramNameStart.oCoords.tr.x > previousProgramName) {
        pointsStartElement.setWidth(pointsStartElement.getWidth() + (textProgramNameStart.oCoords.tr.x - previousProgramName)).setCoords();
        pointsEndElement.setWidth(pointsEndElement.getWidth() + (textProgramNameStart.oCoords.tr.x - previousProgramName)).setCoords();
        textEnd.setLeft(textEnd.getLeft() + (textProgramNameStart.oCoords.tr.x - previousProgramName)).setCoords();
        canvas.SetCanvasWidth(pointsStartElement, textProgramNameStart.oCoords.tr.x - previousProgramName);

    } else if (textProgramNameStart.oCoords.tr.x < previousProgramName) {
        pointsStartElement.setWidth(pointsStartElement.getWidth() - (previousProgramName - textProgramNameStart.oCoords.tr.x)).setCoords();
        pointsEndElement.setWidth(pointsEndElement.getWidth() - (previousProgramName - textProgramNameStart.oCoords.tr.x)).setCoords();
        textEnd.setLeft(textEnd.getLeft() - (previousProgramName - textProgramNameStart.oCoords.tr.x)).setCoords();

    }
}
