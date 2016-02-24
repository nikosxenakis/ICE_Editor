/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function CreateDialogs() {

    new DomElement("text", "dialog", "name", "Program", true);
    new DomElement("button", "dialog", "submit", "Ok", true);
    new DomElement("button", "dialog", "cancel", "Cancel", true);
    new DomElement("text", "dialogEditNumberValue", "previousNumberValue", "", false);
    new DomElement("button", "dialogEditNumberValue", "buttonEditNumberValue", "Ok", true);
    new DomElement("button", "dialogEditNumberValue", "buttonNotEditNumberValue", "Cancel", true);
    new DomElement("text", "dialogEditTextValue", "previousTextValue", "", false);
    new DomElement("button", "dialogEditTextValue", "buttonEditTextValue", "Ok", true);
    new DomElement("button", "dialogEditTextValue", "buttonNotEditTextValue", "Cancel", true);
    new DomElement("text", "newVariable", "varName", "Variable Name", true);
    new DomElement("button", "newVariable", "ok", "Ok", true);
    new DomElement("button", "newVariable", "Cancel", "Cancel", true);
    new DomElement("text", "dialogAddValue", "newValue", "Text Value", true);
    new DomElement("button", "dialogAddValue", "buttonAddValue", "Ok", true);
    new DomElement("button", "dialogAddValue", "buttonNotAddValue", "Cancel", true);
    new DomElement("text", "dialogAddNumberValue", "numberValue", "Number Value", true);
    new DomElement("button", "dialogAddNumberValue", "buttonAddNumberValue", "Ok", true);
    new DomElement("button", "dialogAddNumberValue", "buttonNotAddNumberValue", "Cancel", true);
    new DomSpanElement("", "Select Value:", "dialogAddBooleanValue", 1, false, "booleanValues");
    new DomElement("button", "dialogAddBooleanValue", "buttonAddBooleanValue", "Ok", true);
    new DomElement("button", "dialogAddBooleanValue", "buttonNotAddBooleanValue", "Cancel", true);
    new DomSpanElement("errorMessage", "That name is already in use.", "dialogCannotAddVar", 1);
    new DomElement("button", "dialogCannotAddVar", "nameError", "Ok", true);
    new DomSpanElement("invalidNumberMessage", "That value is invalid number.", "dialogInvalidNumberValue", 2, true);
    new DomElement("button", "dialogInvalidNumberValue", "invalidNumberValueButton", "Ok", true);

}

function DomElement(type, parentId, id, value, addValue) {

    this.dom = document.createElement('input');
    this.dom.setAttribute('type', type);
    this.dom.setAttribute('id', id);
    if (type === "button" && addValue)
        this.dom.setAttribute('value', value);
    else if (type === "text" && addValue)
        this.dom.setAttribute('placeholder', value);
    document.getElementById(parentId).appendChild(this.dom);
}
function DomSpanElement(id, value, parentId, brNumber, append, refChild) {

    this.dom = document.createElement('span');
    this.dom.textContent = value;
    this.dom.setAttribute('id', id);
    this.br = function() {
        return (document.createElement("br"));
    };
    if (append)
        document.getElementById(parentId).appendChild(this.dom);
    else {
        document.getElementById(parentId).insertBefore(this.dom, document.getElementById(refChild));
        document.getElementById(parentId).appendChild(this.br());
    }
    for (var i = 0; i < brNumber; i++)
        this.dom.appendChild(this.br());


}

var createDialog = function() {

};
createDialog.prototype.dialog = function(dialog, className, title) {
    $(dialog).dialog({
        resizable: false,
        dialogClass: className,
        title: title,
        autoOpen: false
    });
};
var inheritsFrom = function(child, parent) {

    child.prototype = Object.create(parent.prototype);
};
var CreateAddBooleanValueDialog = function() {
    this.CreateRadioButtons = function() {
        var radioBtn = $('<input type="radio"  name="booleanValue" checked="checked"  value="true"/>true<br>');
        radioBtn.appendTo('#booleanValues');
        radioBtn = $('<input type="radio"  name="booleanValue"  value="false" />false<br>');
        radioBtn.appendTo('#booleanValues');
    };
};
function  InitDialogs() {

    var dialogCannotAddVar = new createDialog();
    dialogCannotAddVar.dialog("#dialogCannotAddVar", 'dialogCannotAddVar_style', "Cannot Add Variable");
    var dialogInvalidNumberValue = new createDialog();
    dialogInvalidNumberValue.dialog("#dialogInvalidNumberValue", 'dialogCannotAddVar_style', "Cannot Add Number");
    inheritsFrom(CreateAddBooleanValueDialog, createDialog);
    var dialogAddBooleanValue = new CreateAddBooleanValueDialog();
    dialogAddBooleanValue.CreateRadioButtons();
    dialogAddBooleanValue.dialog("#dialogAddBooleanValue", 'dialogAddBooleanValue_style', "Add Boolean Value");
    var dialogAddNumberValue = new createAddValuesDialog();
    dialogAddNumberValue.dialog(true, '#buttonAddNumberValue', "#dialogAddNumberValue", 'dialogAddNumberValue_style', "Add Number Value", '#numberValue', false);
    var dialogAddTextValue = new createAddValuesDialog();
    dialogAddTextValue.dialog(true, '#buttonAddValue', "#dialogAddValue", 'dialogAddTextValue_style', "Add Text Value", '#newValue', false);
    var dialogAddNewVar = new createAddValuesDialog();
    dialogAddNewVar.dialog(true, '#ok', "#newVariable", 'addNewVarDialog_style', "New Variable", '#varName', false);
    var programNameDialog = new createAddValuesDialog();
    programNameDialog.dialog(false, '#submit', "#dialog", 'programNameDialog_style', "Program Name", '#name', true);
    var programNameDialog = new createAddValuesDialog();
    programNameDialog.dialog(false, '#buttonEditNumberValue', "#dialogEditNumberValue", 'dialogEditNumberValue_style', "Edit Number Value", '#previousNumberValue', true);
    var programNameDialog = new createAddValuesDialog();
    programNameDialog.dialog(false, '#buttonEditTextValue', "#dialogEditTextValue", 'dialogAddTextValue_style', "Edit Text Value", '#previousTextValue', true);
}

var createAddValuesDialog = function() {

    this.dialog = function(condition, button, dialog, className, title, input, condition1) {
        $(button).attr('disabled', condition);
        $(dialog).dialog({
            resizable: false,
            dialogClass: className,
            title: title,
            open:
                    function() {
// TODO: check
//                        $(input).autocomplete(function() {
//                            if ($.trim($(this).val()) !== '')
//                                $(button).attr('disabled', false);
//                        });
                        $(input).keyup(function() {
                            if ($.trim($(this).val()) !== '') {
                                $(button).attr('disabled', false);
                            }
                            else
                            {
                                $(button).attr('disabled', true);
                            }
                        });
                        if (condition) {
                            if ($.trim($(this).val()) !== '') {
                                $(button).attr('disabled', false);
                            }
                            else
                            {
                                $(button).attr('disabled', true);
                            }
                        }
                        else {
                            $(button).attr('disabled', false);
                        }
                        setTimeout(function() {
                            $(input).focus();
                            if (condition1)
                                $(input).select();
                        }, 1);
                    },
            autoOpen: false
        });
    };
};
function  SetDialogPosition(box, dialog) {
    var offsetTop = $("#viewport").scrollTop();
    var offsetLeft = $("#viewport").scrollLeft();
    var x2 = box.left;
    var y2 = box.top + box.height + 8;
    $(dialog).dialog('option', 'position', [x2 - offsetLeft, y2 - offsetTop]);
    $(dialog).dialog("open");
}