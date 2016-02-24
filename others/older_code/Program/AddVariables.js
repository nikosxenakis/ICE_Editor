/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function AddBooleanValue(canvas) {

    $("#buttonAddBooleanValue").unbind().click(function() {
        AddRightVar(($('input[name=booleanValue]:checked', '#booleanValues').val()), canvas, false);
        $("#dialogAddBooleanValue").dialog("close");

    });

    $("#buttonNotAddBooleanValue").unbind().click(function() {
        $("#dialogAddBooleanValue").dialog("close");
    });
}

function AddNumberValue(canvas, buttonOk, text, dialog, buttonCancel, clear, functionName) {

    $(buttonOk).unbind().click(function() {

        var varName = $(text).val();
        if ($.trim(varName) === '') {
            $(dialog).dialog("close");
        }
        else if (isNaN(varName)) {
            var o = $(dialog).dialog("open").closest('.ui-dialog').offset();
            $(dialog).dialog("close");
            $("#dialogInvalidNumberValue").dialog('option', 'position', [o.left, o.top]);
            $("#dialogInvalidNumberValue").dialog("open");
        }
        else
        {
            window[functionName](varName, canvas, true, "number");
            $(dialog).dialog("close");
        }
    });

    $(buttonCancel).unbind().click(function() {
        $(dialog).dialog("close");
    });
    $("#invalidNumberValueButton").unbind().click(function() {
        $("#dialogInvalidNumberValue").dialog("close");
    });
    if (clear)
        $(text).val("");    //clear text input 

}

function AddTextValue(canvas, buttonOk, text, dialog, buttonCancel, clear) {

    $(buttonOk).unbind().click(function() {

        var varName = $(text).val();

        if ($.trim(varName) === '') {
            $(dialog).dialog("close");
        }
        else
        {
            varName = '"' + varName + '"';
            AddRightVar(varName, canvas, true, "text");
            $(dialog).dialog("close");
        }
    });

    $(buttonCancel).unbind().click(function() {
        $(dialog).dialog("close");
    });
    if (clear)
        $(text).val("");    //clear text input 

}



function  AddNewVariable(canvas) {

    $("#ok").unbind().click(function() {

        var nameAlreadyExist = false;
        var varName = $("#varName").val();

        if ($.trim(varName) === '') {
            $("#newVariable").dialog("close");
        }
        else
        {
            var names = canvas.programArrays.concat(canvas.programVariables);
            _.each(names, function(variable) { //check if variable name already exist in list

                if (varName === variable.name) {
                    nameAlreadyExist = true;
                    var o = $("#newVariable").dialog("open").closest('.ui-dialog').offset();
                    $("#newVariable").dialog("close");
                    $("#dialogCannotAddVar").dialog('option', 'position', [o.left, o.top]);
                    $("#dialogCannotAddVar").dialog("open");
                }
            });

            if (nameAlreadyExist === false) {
                AppendNewVariable(canvas, varName);

            }
        }

    });

    $("#Cancel").unbind().click(function() {
        $("#newVariable").dialog("close");
    });

    $("#nameError").unbind().click(function() {
        $("#dialogCannotAddVar").dialog("close");
    });
    $("#varName").val("");    //clear text input 
}


function AddLeftVar(varName, canvas) {

    var previousLeftVar = canvas.leftVar.getText();
    var previousLeftVarTrX = canvas.leftVar.oCoords.tr.x;
    if (previousLeftVar === "") {
        canvas.leftVar.setText("a");
        previousLeftVarTrX = canvas.leftVar.oCoords.tr.x;
        canvas.leftVar.setText("");
        if (canvas.rightVarsList[canvas.rightVarsList.length - 1].text !== "")
        {

            canvas.groupAddBox.SetColorEnabledButton();
        }
    }
    canvas.leftVar.setText(varName);

    if (previousLeftVar !== canvas.leftVar.getText())
        AddLeftVarTransformations(canvas, previousLeftVarTrX);
    canvas.renderAll();

}

function AddRightVar(varName, canvas, isEditable, type) {
    var previousRightVar = canvas.rightVar.getText();
    var previousRightVarTrX = canvas.rightVar.oCoords.tr.x;
    if (previousRightVar === "") {
        canvas.rightVar.setText("a");
        previousRightVarTrX = canvas.rightVar.oCoords.tr.x;
        canvas.rightVar.setText("");
        if (canvas.vplStmt === "flowControl") {
            if (canvas.compExprSide === "right") {
                if (canvas.rightVarsList[canvas.rightVarsList.length - 2].text !== "")
                {

                    canvas.groupAddBox.SetColorEnabledButton();
                }
            } else {
                if (canvas.rightVarsList[canvas.rightVarsList.length - 1].text !== "")
                {

                    canvas.groupAddBox.SetColorEnabledButton();
                }
            }
        }
        else if (canvas.vplStmt === "assign") {
            if (canvas.leftVar.text !== "")
            {
               
                canvas.groupAddBox.SetColorEnabledButton();
            }
        }
    }
    canvas.rightVar.setText(varName);
    canvas.rightVar.isEditable = isEditable;
    if (isEditable)
        canvas.rightVar.type = type;
    if (previousRightVar !== canvas.rightVar.getText()) {
        AddVal(canvas, previousRightVarTrX);
    }
    canvas.renderAll();

}


function  AddNewArray(canvas) {

    $("#ok").unbind().click(function() {

        var nameAlreadyExist = false;
        var varName = $("#varName").val();

        if ($.trim(varName) === '') {
            $("#newVariable").dialog("close");
        }
        else
        {
            var names = canvas.programArrays.concat(canvas.programVariables);
            _.each(names, function(variable) { //check if variable name already exist in list

                if (varName === variable.name) {
                    nameAlreadyExist = true;
                    var o = $("#newVariable").dialog("open").closest('.ui-dialog').offset();
                    $("#newVariable").dialog("close");
                    $("#dialogCannotAddVar").dialog('option', 'position', [o.left, o.top]);
                    $("#dialogCannotAddVar").dialog("open");
                }
            });

            if (nameAlreadyExist === false) {
                AppendNewArrayName(canvas, varName);

            }
        }

    });

    $("#Cancel").unbind().click(function() {
        $("#newVariable").dialog("close");
    });

    $("#nameError").unbind().click(function() {
        $("#dialogCannotAddVar").dialog("close");
    });
    $("#varName").val("");    //clear text input 
}

function  AppendNewArrayName(canvas, varName) {

    if (canvas.programArrays.length === 0) {
        $('<li class="dropdown">')
                .text("Arrays")
                .appendTo('#arrayNames');
        canvas.arrayNames = $("<ul class='submenu'/>").appendTo("#arrayNames");

    }
    $("<li>")
            .prependTo(canvas.arrayNames)
            .text(varName)
            .click(function() {
                $("#arrayNames").hide();

                window[canvas.element.functionAddNewVariable](varName, canvas);
            });

    canvas.programArrays.push({name: varName});
    $("#newVariable").dialog("close");

    window[canvas.element.functionAddNewVariable](varName, canvas);

}

function  AppendNewVariable(canvas, varName) {

    if (canvas.programVariables.length === 0) {
        $('<li class="dropdown">')
                .text("Variables")
                .appendTo('#definedVars');
        canvas.ulDefinedVars = $("<ul class='submenu'/>").appendTo("#definedVars");

        $('<li class="dropdown">')
                .text("Variables")
                .appendTo('#addVarsEdit');
        canvas.ulAddVarsEdit = $("<ul class='submenu'/>").appendTo('#addVarsEdit');

    }
    $("<li>")
            .prependTo(canvas.ulDefinedVars)
            .text(varName)
            .click(function() {
                $("#definedVars").hide();

                window[canvas.element.functionAddNewVariable](varName, canvas);
            });

    $("<li>")
            .prependTo(canvas.ulAddVarsEdit)
            .text(varName)
            .click(function() {
                $('#addVarsEdit').hide();
                AddRightVar(varName, canvas, false);
            });
    canvas.programVariables.push({name: varName});
    $("#newVariable").dialog("close");

    window[canvas.element.functionAddNewVariable](varName, canvas);

}