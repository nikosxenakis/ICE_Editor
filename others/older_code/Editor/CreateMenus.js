/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function InitMenus() {

    var menuList = ["#menu", "#arithOps", "#definedVars",
        '#addVarsEdit', '#compOps', '#logicOps', '#rightClickMenu', '#arrayNames'];

    menuList.forEach(function(menuListItem) { //check if variable name already exist in list

        $(menuListItem).menu();    //jQueryUI method that shows the <ul> as a menu.
        $(menuListItem).hide();
    });

    $("#viewport").scroll(function() {
        $(".menu").hide();

    });
}

function SetDropDownMenuPosition(menu, x, y) {

    var offsetTop = $("#viewport").scrollTop();
    var offsetLeft = $("#viewport").scrollLeft();
    $(menu).css({top: y - offsetTop, left: x - offsetLeft});
    $(menu).show();

}

function InitMenuElements(canvas) {
    var elements = [];

    _.each(canvas.VPL_elementsInfo, function(subCategory) {

        _.each(subCategory.tools, function(item) {

            _.each(item.images, function(item) {
                if (item.id !== "DoNothing")
                    elements.push(item.id);

            });
        });
    });
    elements.forEach(function(button) {
        $('<li>')
                .attr('id', "b")
                .text(button)
                .val(button)
                .click(function() {
                    AddNewElements(canvas, button);
                })
                .appendTo('#menu');

    });

}

function CreateOperatorsMenu(canvas) {

    this.opsList = [{ops: ["+", "-", "/", "*", "%"], function: "SetArithOp", name: "arithOps"},
        {ops: ["==", "!=", ">", ">=", "<", "<="], function: "SetCompOp", name: "compOps"},
        {ops: ["and", "or"], function: "SetLogicOp", name: "logicOps"}];

    this.opsList.forEach(function(opObject) {
        opObject["ops"].forEach(function(op) {
            $("<li>")
                    .appendTo('#' + opObject["name"])          //create list to open in left box of Assign element
                    .text(op)
                    .click(function() {
                        $('#' + opObject["name"]).hide();
                        window[opObject["function"]](op, canvas);
                    });
        });
    });

}

function CreateRightClickMenu(canvas) {

    $("<li id=\"parenthesis\" >")
            .appendTo('#rightClickMenu')          //create list to open in left box of Assign element
            .text("Delete Parenthesis")
            .click(function() {
                $("#rightClickMenu").hide();
                DeleteParenthesis(canvas);

            });
}

function CreateVarsMenu(canvas) {

    $("<li>")
            .appendTo('#definedVars')          //create list to open in left box of Assign element
            .text("Create New Variable")
            .click(function() {
                $("#definedVars").hide();
                SetDialogPosition(canvas.leftBox, "#newVariable");
                AddNewVariable(canvas);
            });
    $("<li id=\"leftParenthesis\" >")
            .appendTo('#addVarsEdit')
            .text("(")
            .click(function() {
                $("#addVarsEdit").hide();
                AddParenthesis(canvas, "(");
            });
    $("<li id=\"rightParenthesis\" >")
            .appendTo('#addVarsEdit')
            .text(")")
            .click(function() {
                $("#addVarsEdit").hide();
                AddParenthesis(canvas, ")");
            });
    $("<li id=\"edit\" >")
            .appendTo('#addVarsEdit')
            .text("Edit Value")
            .click(function() {
                $("#addVarsEdit").hide();//this is
                if (canvas.rightVar.type === "number") {
                    $("#previousNumberValue").val(canvas.rightVar.text);
                    SetDialogPosition(canvas.rightBox, "#dialogEditNumberValue");
                    AddNumberValue(canvas, "#buttonEditNumberValue", "#previousNumberValue", "#dialogEditNumberValue", "#buttonNotEditNumberValue", false, "AddRightVar");
                }
                else if (canvas.rightVar.type === "text") {
                    var res = canvas.rightVar.text.slice(1, canvas.rightVar.text.length - 1);
                    $("#previousTextValue").val(res);
                    SetDialogPosition(canvas.rightBox, "#dialogEditTextValue");
                    AddTextValue(canvas, "#buttonEditTextValue", "#previousTextValue", "#dialogEditTextValue", "#buttonNotEditTextValue", false);

                }
            });
    $("<li>")
            .appendTo('#addVarsEdit')
            .text("Text Value")
            .click(function() {
                $("#addVarsEdit").hide();
                SetDialogPosition(canvas.rightBox, "#dialogAddValue");
                AddTextValue(canvas, "#buttonAddValue", "#newValue", "#dialogAddValue", "#buttonNotAddValue", true);
            });
    $("<li>")
            .appendTo('#addVarsEdit')
            .text("Boolean Value")
            .click(function() {
                $("#addVarsEdit").hide();
                SetDialogPosition(canvas.rightBox, "#dialogAddBooleanValue");
                AddBooleanValue(canvas);
            });
    $("<li>")
            .appendTo('#addVarsEdit')
            .text("Number Value")
            .click(function() {
                $("#addVarsEdit").hide();
                SetDialogPosition(canvas.rightBox, "#dialogAddNumberValue");
                AddNumberValue(canvas, "#buttonAddNumberValue", "#numberValue", "#dialogAddNumberValue", "#buttonNotAddNumberValue", true, "AddRightVar");

            });

    $("<li>")
            .appendTo('#arrayNames')
            .text("Create New Array")
            .click(function() {
                 $("#arrayNames").hide();
                if (canvas.element.type3 === "foreach")
                {
                    canvas.element.AddArrayBoxValues();
                   
                }
                else {
                   
                    SetDialogPosition(canvas.leftBox, "#newVariable");
                    AddNewArray(canvas);
                }
            });

}

function CreateFileExplorer(canvas) {

}