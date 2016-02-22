/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function  CreateRepeatElementCondition(canvas, startElement) {

    var number = new fabric.Text("5", {
        left: startElement.text.oCoords.tr.x + 22,
        top: startElement.top + 18,
        fill: 'black',
        fontSize: '20',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    number.id2 = startElement.id2;
    number.firstElement = startElement;
    number.mainElement = startElement;
    startElement.number = number;
    canvas.add(number);
    canvas.horizontalElements.push(number);

    number.downClicked = function() {
        canvas.element = startElement;
        $("#previousNumberValue").val(this.text);
        SetDialogPosition(this, "#dialogEditNumberValue");
        AddNumberValue(canvas, "#buttonEditNumberValue", "#previousNumberValue", "#dialogEditNumberValue", "#buttonNotEditNumberValue", false, "EditRepeatElementNumber");

    };
    number.mouseOut = function() {

        this.fill = 'black';

    };

    number.mouseOver = function() {

        this.fill = '#A0A0A0';

    };

}

function CreateForEachElementCondition(canvas, startElement, elementInfoObject) {

    var rightBoxesList = new Array();
    var rightVarsList = new Array();
    var arithOps = new Array();
    var deleteButtons = new Array();
    var startElementItems = new Array();

    startElement.firstElement = startElement;
    startElement.arithOps = arithOps;
    startElement.hasLogicExprError = false;
    startElement.rightBoxesList = rightBoxesList;
    startElement.rightVarsList = rightVarsList;
    startElement.deleteButtons = deleteButtons;
    startElement.startElementItems = startElementItems;
    startElement.functionAddNewVariable = "AddId";
    startElement.type3 = "foreach";
    var ID = new fabric.Text("", {
        left: startElement.text.oCoords.tr.x + 22,
        top: startElement.top + 18,
        fill: 'black',
        fontSize: '20',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    ID.id2 = startElement.id2;
    ID.firstElement = startElement;
    ID.mainElement = startElement;
    startElementItems.push(ID);
    canvas.add(ID);
    canvas.horizontalElements.push(ID);

    if (canvas.programVariables.length === 0) {
        canvas.element = startElement;
        canvas.leftVar = ID;
        if (canvas.programArrays.length === 0)
            AppendNewVariable(canvas, "i");
        else {
            var i = 1;
            var names = new Array();

            _.each(canvas.programArrays, function(item) {

                names.push(item.name);

            });
            while (1) {
                if (_.indexOf(names, "i" + i) >= 0)
                    i++;
                else
                    break;
            }
            AppendNewVariable(canvas, "i" + i);
        }
    }
    else {
        canvas.element = startElement;
        canvas.leftVar = ID;
        AddId(canvas.programVariables[0].name, canvas);

    }

    var op3 = new fabric.Text(":", {
        left: ID.oCoords.tr.x + 4,
        top: startElement.top + 18,
        fill: 'black',
        fontSize: '20',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    op3.id2 = startElement.id2;
    op3.firstElement = startElement;
    op3.mainElement = startElement;
    startElementItems.push(op3);
    canvas.add(op3);
    canvas.horizontalElements.push(op3);

    var array = new fabric.Text("add Array", {
        left: op3.oCoords.tr.x + 4,
        top: startElement.top + 19,
        fill: 'blue',
        fontSize: '18',
        fontWeight: 'normal',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    startElement.array = array;
    array.id2 = startElement.id2;
    array.firstElement = startElement;
    array.mainElement = startElement;
    startElementItems.push(array);
    canvas.add(array);
    canvas.horizontalElements.push(array);

    var text2 = new fabric.Text(elementInfoObject.startElementWords[1], {
        left: array.oCoords.tr.x + 12,
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

    startElementItems.push(text2);
    text2.id2 = startElement.id2;
    text2.firstElement = startElement;
    text2.mainElement = startElement;
    canvas.add(text2);
    canvas.horizontalElements.push(text2);

    ID.downClicked = function() {
        canvas.element = startElement;
        canvas.leftVar = this;
        canvas.leftBox = this;
        $("#previousNumberValue").val(this.text);
        SetDropDownMenuPosition("#definedVars", this.left, this.top + this.height + 8);
    };

    array.downClicked = function() {
        canvas.element = startElement;
        canvas.leftVar = this;
        canvas.leftBox = this;
        SetDropDownMenuPosition("#arrayNames", this.left, this.top + this.height + 8);

    };

    array.mouseOut = function() {

        this.fill = 'blue';

    };

    array.mouseOver = function() {

        this.fill = '#000099';

    };

    ID.mouseOut = function() {

        this.fill = 'black';

    };

    ID.mouseOver = function() {

        this.fill = '#E0E0E0';

    };

    var AddArrayBoxValues = function() {

        var left = array.left;
        canvas.remove(array);
        DeleteElementFromArray(array, startElementItems);
        DeleteElementFromArray(array, canvas.horizontalElements);

        var newGroupAddBox = new CreateAddBox();
        newGroupAddBox.AddBox(array.left + 72, text2.top + 10);
        var groupAddBox = newGroupAddBox.groupAddBox;
        groupAddBox.id = "groupAddBox";
        groupAddBox.id2 = startElement.id2;
        groupAddBox.firstElement = startElement;
        groupAddBox.mainElement = startElement;
        canvas.horizontalElements.push(groupAddBox);
        canvas.add(groupAddBox);
        startElementItems.push(groupAddBox);
        var previousTextLeft = text2.getLeft();
        text2.setLeft(groupAddBox.oCoords.tr.x + 9).setCoords();
        startElement.setWidth(startElement.getWidth() + (text2.getLeft() - previousTextLeft)).setCoords();
        groupAddBox.downClicked = function() {

            if (rightVarsList[rightVarsList.length - 1].text !== "") {
                newGroupAddBox.OnMouseDown();
                var newArithOp = new CreateTextOperator();
                newArithOp.Text(groupAddBox.left + 3, rightVarsList[rightVarsList.length - 1].top - 3, ",");
                var arithOp = newArithOp.text;
                arithOp.id2 = startElement.id2;
                arithOp.id3 = "arithOp";
                arithOp.firstElement = startElement;
                arithOp.mainElement = startElement;
                arithOps.push(arithOp);
                canvas.horizontalElements.push(arithOp);
                canvas.add(arithOp);
                startElementItems.push(arithOp);
                startElement.setWidth(startElement.getWidth() + 92).setCoords();
                text2.setLeft(text2.getLeft() + 92).setCoords();
                AddNewBox(newGroupAddBox, groupAddBox.left + 20, startElement.top + 13);
                groupAddBox.setLeft(rightBoxesList[rightBoxesList.length - 1].getLeft() + 72).setCoords();
                canvas.SetCanvasWidth(startElement, 72, canvas);
            }

        };


        AddNewBox(newGroupAddBox, left, startElement.top + 13);
        canvas.renderAll();
    };

    function AddNewBox(newGroupAddBox, left, top) {

        var newRightAssigmentBox = new CreateBox();
        newRightAssigmentBox.InitBox(left, top);

        var rightAssigmentBox = newRightAssigmentBox.box;
        rightAssigmentBox.id2 = startElement.id2;
        rightAssigmentBox.id3 = "newRightBox";
        rightAssigmentBox.firstElement = startElement;
        rightAssigmentBox.mainElement = startElement;
        rightAssigmentBox.downClicked = function() {
            ShowDefinedVarsList(rightVar, this, newGroupAddBox);
        };
        startElementItems.push(rightAssigmentBox);
        canvas.horizontalElements.push(rightAssigmentBox);
        canvas.add(rightAssigmentBox);
        rightBoxesList.push(rightAssigmentBox);
        var rightVar1 = new CreateText();
        rightVar1.Text(rightAssigmentBox.left + 29, rightAssigmentBox.top + 7);
        var rightVar = rightVar1.text;

        rightVar.downClicked = function() {
            rightAssigmentBox.downClicked();
        };
        rightVar.id2 = startElement.id2;
        rightVar.id3 = "rightVar";
        rightVar.firstElement = startElement;
        rightVar.mainElement = startElement;
        rightVar.isEditable = false;
        rightVarsList.push(rightVar);
        canvas.horizontalElements.push(rightVar);
        canvas.add(rightVar);
        startElementItems.push(rightVar);

        canvas.on('mouse:over', function(e) {
            guiobj = e.target;
            if (guiobj === rightVar || guiobj === rightAssigmentBox) {

                newRightAssigmentBox.OnMouseOver();
                canvas.renderAll();
            }
            else if (guiobj === newGroupAddBox.groupAddBox && rightVarsList[rightVarsList.length - 1].text !== "") {

                newGroupAddBox.OnMouseOver();
                canvas.renderAll();
            }

        });

        canvas.on('mouse:out', function(e) {
            guiobj = e.target;
            if (guiobj === rightVar || guiobj === rightAssigmentBox) {

                newRightAssigmentBox.OnMouseOut();
                canvas.renderAll();
            }
            else if (guiobj === newGroupAddBox.groupAddBox && rightVarsList[rightVarsList.length - 1].text !== "") {
                newGroupAddBox.OnMouseOut();
                canvas.renderAll();
            }
        });

        var groupDeleteButton2 = new CreateDeleteButton(canvas);
        groupDeleteButton2.DeleteButton(rightAssigmentBox.top, rightAssigmentBox.oCoords.tr.x - 11.00);
        var groupDeleteButton = groupDeleteButton2.groupDeleteButton;
        groupDeleteButton.downClicked = function() {
            DeleteRightBox(rightAssigmentBox, rightVar, this);
        };
        groupDeleteButton.id = "groupDeleteButton";
        groupDeleteButton.id2 = startElement.id2;
        groupDeleteButton.id3 = "groupDeleteButton";
        groupDeleteButton.firstElement = startElement;
        groupDeleteButton.mainElement = startElement;
        deleteButtons.push(groupDeleteButton);
        canvas.horizontalElements.push(groupDeleteButton);
        canvas.add(groupDeleteButton);
        startElementItems.push(groupDeleteButton);
        ShowDefinedVarsList(rightVar, rightAssigmentBox, newGroupAddBox);
        canvas.deleteButton.SetPosition(startElement);
        canvas.renderAll();

        function DeleteRightBox(rightBox, rightVar, deleteButton) {
            canvas.element = startElement;
            canvas.groupAddBox = newGroupAddBox;
            canvas.rightBox = rightBox;
            canvas.rightVar = rightVar;
            canvas.arithOps = arithOps;
            canvas.deleteButtonClicked = deleteButton;
            DeleteForEachArrayElementTransformations(canvas);
            if (rightBoxesList.length === 0) {

                canvas.remove(newGroupAddBox.groupAddBox);
                DeleteElementFromArray(newGroupAddBox.groupAddBox, canvas.horizontalElements);
                array.setTop(startElement.top + 19).setCoords();
                array.setLeft(op3.oCoords.tr.x + 4).setCoords();
                array.setText("add Array");
                text2.setLeft(array.oCoords.tr.x + 12).setCoords();
                startElementItems.push(array);
                canvas.horizontalElements.push(array);
                canvas.add(array);
                startElement.setWidth((text2.oCoords.tr.x - startElement.left) + 20).setCoords();
                canvas.renderAll();

            }
            else if (rightVarsList[rightVarsList.length - 1].text !== "") {
                newGroupAddBox.SetColorEnabledButton();

            }
            
            canvas.renderAll();
            canvas.deleteButton.SetPosition(startElement);
        }
    }

    function ShowDefinedVarsList(rightVar, rightBox, newGroupAddBox) {
        canvas.element = startElement;
        canvas.insideElement = null;
        canvas.groupAddBox = newGroupAddBox;
        canvas.rightBox = rightBox;
        canvas.rightVar = rightVar;
        canvas.arithOps = arithOps;
        canvas.leftVar = ID;
        canvas.rightBoxesList = rightBoxesList;
        canvas.deleteButtons = deleteButtons;
        canvas.rightVarsList = rightVarsList;
        canvas.elementText = text2;
        canvas.vplStmt = "assign";
        if (canvas.rightVar.isEditable === true) {
            $('#edit').show();

        } else {
            $('#edit').hide();
        }
        $('#rightParenthesis').hide();
        $('#leftParenthesis').hide();
        SetDropDownMenuPosition("#addVarsEdit", rightBox.left, rightBox.top + rightBox.height + 8);
    }
    startElement.AddArrayBoxValues = AddArrayBoxValues;

}

function CreateForElementCondition(canvas, startElement, elementInfoObject) {

    var startElementItems = new Array();
    startElement.startElementItems = startElementItems;
    startElement.functionAddNewVariable = "AddId";
    var number = new fabric.Text("0", {
        left: startElement.text.oCoords.tr.x + 22,
        top: startElement.top + 18,
        fill: 'black',
        fontSize: '20',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    number.id2 = startElement.id2;
    number.firstElement = startElement;
    number.mainElement = startElement;
    startElementItems.push(number);
    canvas.add(number);
    canvas.horizontalElements.push(number);

    var op1 = new fabric.Text("<", {
        left: number.oCoords.tr.x + 4,
        top: number.top,
        fill: 'black',
        fontSize: '20',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    op1.id2 = startElement.id2;
    op1.firstElement = startElement;
    op1.mainElement = startElement;
    startElementItems.push(op1);
    canvas.add(op1);
    canvas.horizontalElements.push(op1);

    var ID = new fabric.Text("", {
        left: op1.oCoords.tr.x + 4,
        top: startElement.top + 18,
        fill: 'black',
        fontSize: '20',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    ID.id2 = startElement.id2;
    ID.firstElement = startElement;
    ID.mainElement = startElement;
    startElementItems.push(ID);
    canvas.add(ID);
    canvas.horizontalElements.push(ID);

    if (canvas.programVariables.length === 0) {
        canvas.element = startElement;
        canvas.leftVar = ID;
        if (canvas.programArrays.length === 0)
            AppendNewVariable(canvas, "i");
        else {
            var i = 1;
            var names = new Array();

            _.each(canvas.programArrays, function(item) {

                names.push(item.name);

            });
            while (1) {
                if (_.indexOf(names, "i" + i) >= 0)
                    i++;
                else
                    break;
            }
            AppendNewVariable(canvas, "i" + i);
        }
    }
    else {
        canvas.element = startElement;
        canvas.leftVar = ID;
        AddId(canvas.programVariables[0].name, canvas);

    }


    var op2 = new fabric.Text("<", {
        left: ID.oCoords.tr.x + 4,
        top: number.top,
        fill: 'black',
        fontSize: '20',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    op2.id2 = startElement.id2;
    op2.firstElement = startElement;
    op2.mainElement = startElement;
    startElementItems.push(op2);
    canvas.add(op2);
    canvas.horizontalElements.push(op2);

    var number1 = new fabric.Text("5", {
        left: op2.oCoords.tr.x + 4,
        top: startElement.top + 18,
        fill: 'black',
        fontSize: '20',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    number1.id2 = startElement.id2;
    number1.firstElement = startElement;
    number1.mainElement = startElement;
    startElementItems.push(number1);
    canvas.add(number1);
    canvas.horizontalElements.push(number1);

    var op3 = new fabric.Text(":", {
        left: number1.oCoords.tr.x + 4,
        top: startElement.top + 18,
        fill: 'black',
        fontSize: '20',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    op3.id2 = startElement.id2;
    op3.firstElement = startElement;
    op3.mainElement = startElement;
    startElementItems.push(op3);
    canvas.add(op3);
    canvas.horizontalElements.push(op3);


    var forStep = new fabric.Text("1", {
        left: op3.oCoords.tr.x + 4,
        top: startElement.top + 18,
        fill: 'black',
        fontSize: '20',
        fontWeight: 'bold',
        fontFamily: ' Arial',
        lockMovementX: true,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false
    });

    forStep.id2 = startElement.id2;
    forStep.firstElement = startElement;
    forStep.mainElement = startElement;
    startElementItems.push(forStep);
    canvas.add(forStep);
    canvas.horizontalElements.push(forStep);

    var text2 = new fabric.Text(elementInfoObject.startElementWords[1], {
        left: forStep.oCoords.tr.x + 20,
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

    startElementItems.push(text2);
    text2.id2 = startElement.id2;
    text2.firstElement = startElement;
    text2.mainElement = startElement;
    canvas.add(text2);
    canvas.horizontalElements.push(text2);

    ID.downClicked = function() {
        canvas.element = startElement;
        canvas.leftVar = this;
        canvas.leftBox = this;
        $("#previousNumberValue").val(this.text);
        SetDropDownMenuPosition("#definedVars", this.left, this.top + this.height + 8);
    };

    forStep.downClicked = function() {
        canvas.element = startElement;
        canvas.rightVar = this;
        $("#previousNumberValue").val(this.text);
        SetDialogPosition(this, "#dialogEditNumberValue");
        AddNumberValue(canvas, "#buttonEditNumberValue", "#previousNumberValue", "#dialogEditNumberValue", "#buttonNotEditNumberValue", false, "EditForElementCondition");

    };

    number1.downClicked = function() {
        canvas.element = startElement;
        canvas.rightVar = this;
        $("#previousNumberValue").val(this.text);
        SetDialogPosition(this, "#dialogEditNumberValue");
        AddNumberValue(canvas, "#buttonEditNumberValue", "#previousNumberValue", "#dialogEditNumberValue", "#buttonNotEditNumberValue", false, "EditForElementCondition");

    };

    number.downClicked = function() {
        canvas.element = startElement;
        canvas.rightVar = this;
        $("#previousNumberValue").val(this.text);
        SetDialogPosition(this, "#dialogEditNumberValue");
        AddNumberValue(canvas, "#buttonEditNumberValue", "#previousNumberValue", "#dialogEditNumberValue", "#buttonNotEditNumberValue", false, "EditForElementCondition");

    };
    forStep.mouseOut = function() {

        this.fill = 'black';

    };

    forStep.mouseOver = function() {

        this.fill = '#E0E0E0';

    };

    number1.mouseOut = function() {

        this.fill = 'black';

    };

    number1.mouseOver = function() {

        this.fill = '#E0E0E0';

    };

    ID.mouseOut = function() {

        this.fill = 'black';

    };

    ID.mouseOver = function() {

        this.fill = '#E0E0E0';

    };

    number.mouseOut = function() {

        this.fill = 'black';

    };

    number.mouseOver = function() {

        this.fill = '#E0E0E0';

    };

}

function AddId(varName, canvas) {

    var previousVarTrX = canvas.leftVar.oCoords.tr.x;
    var VarTrX;
    canvas.leftVar.setText(varName);
    VarTrX = canvas.leftVar.oCoords.tr.x;

    _.each(canvas.element.startElementItems, function(item) {

        if (item.left > canvas.leftVar.left)
        {
            item.setLeft(item.getLeft() + (VarTrX - previousVarTrX)).setCoords();
        }

    });

    canvas.element.setWidth(canvas.element.getWidth() + (VarTrX - previousVarTrX)).setCoords();
    canvas.SetCanvasWidth(canvas.element, VarTrX - previousVarTrX, canvas);
    canvas.deleteButton.SetPosition(canvas.element);
    canvas.renderAll();
}

function EditRepeatElementNumber(varName, canvas) {

    var previousVarTrX = canvas.element.number.oCoords.tr.x;
    var rightVarTrX;

    canvas.element.number.setText(varName);
    rightVarTrX = canvas.element.number.oCoords.tr.x;

    canvas.element.setWidth(canvas.element.getWidth() + (rightVarTrX - previousVarTrX)).setCoords();
    canvas.SetCanvasWidth(canvas.element, rightVarTrX - previousVarTrX, canvas);
    canvas.renderAll();
}

function EditForElementCondition(varName, canvas) {

    var previousVarTrX = canvas.rightVar.oCoords.tr.x;
    var rightVarTrX;

    canvas.rightVar.setText(varName);
    rightVarTrX = canvas.rightVar.oCoords.tr.x;
    _.each(canvas.element.startElementItems, function(item) {

        if (item.left > canvas.rightVar.left)
        {
            item.setLeft(item.getLeft() + (rightVarTrX - previousVarTrX)).setCoords();
        }

    });

    canvas.element.setWidth(canvas.element.getWidth() + (rightVarTrX - previousVarTrX)).setCoords();
    canvas.SetCanvasWidth(canvas.element, rightVarTrX - previousVarTrX, canvas);
    canvas.renderAll();
}

function DeleteForEachArrayElementTransformations(canvas) {
    var index = _.indexOf(canvas.element.rightBoxesList, canvas.rightBox);
    var offset = canvas.rightBox.width + 22;
    if (index === canvas.element.rightBoxesList.length - 1) {

        canvas.remove(canvas.arithOps[canvas.arithOps.length - 1]);
        DeleteElementFromArray(canvas.arithOps[canvas.arithOps.length - 1], canvas.element.startElementItems);
        DeleteElementFromArray(canvas.arithOps[canvas.arithOps.length - 1], canvas.horizontalElements);
        DeleteElementFromArray(canvas.arithOps[canvas.arithOps.length - 1], canvas.arithOps);

    } else {
        canvas.remove(canvas.arithOps[index]);
        DeleteElementFromArray(canvas.arithOps[index], canvas.element.startElementItems);
        DeleteElementFromArray(canvas.arithOps[index], canvas.horizontalElements);
        DeleteElementFromArray(canvas.arithOps[index], canvas.arithOps);
    }

    //canvas.groupAddBox = newGroupAddBox;

    _.each(canvas.element.startElementItems, function(item) {

        if (item.left > canvas.rightBox.left)
        {
            item.setLeft(item.getLeft() - (offset)).setCoords();
        }

    });
    canvas.remove(canvas.rightBox);
    DeleteElementFromArray(canvas.rightBox, canvas.element.startElementItems);
    DeleteElementFromArray(canvas.rightBox, canvas.horizontalElements);
    DeleteElementFromArray(canvas.rightBox, canvas.element.rightBoxesList);


    canvas.remove(canvas.rightVar);
    DeleteElementFromArray(canvas.rightVar, canvas.element.startElementItems);
    DeleteElementFromArray(canvas.rightVar, canvas.horizontalElements);
    DeleteElementFromArray(canvas.rightVar, canvas.element.rightVarsList);

    canvas.remove(canvas.deleteButtonClicked);
    DeleteElementFromArray(canvas.deleteButtonClicked, canvas.element.startElementItems);
    DeleteElementFromArray(canvas.deleteButtonClicked, canvas.horizontalElements);
    DeleteElementFromArray(canvas.deleteButtonClicked, canvas.element.deleteButtons);

    canvas.element.setWidth(canvas.element.getWidth() - (offset)).setCoords();

}