/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*Singleton Design Pattern*/

function CodeFolding() {

    this.lines = new Array();
    this.linesToCreateLength = 0; //the length of line, to create under the new endline
    this.codeFoldingButtons = new Array();
    this.endLineTop = null; //we want this  end line to add a new vertical line in its top, when we add an else if element
    this.previousLine = null;
    this.nextButton = null;
    this.nextEndLine = null;
    this.initCodeFoldingButton = function(top, canvas, lineHeight, startElement) {
        var button = this.addbutton(top, canvas, startElement); //add button
        var line = this.makeLine([button.left + 6.5, button.top + button.height, button.left + 6.5, button.top + button.height + lineHeight]);
        canvas.add(line);
        canvas.verticalElements.push(line);
        button.firstLine = line; //we want the line for add the boxlogicExprError in if/else if elements and not translate it
        this.lines.push(line); //add new line for button
        var endLine = this.makeLine([line.left, line.top + line.height, line.left + 7, line.top + line.height]);
        endLine.id = "endLine";
        button.endLine = endLine;
        canvas.add(endLine);
        canvas.horizontalElements.push(endLine);
        this.codeFoldingButtons.push(button);
        if (this.linesToCreateLength !== 0) {

            var line1 = this.makeLine([button.left + 6.5, endLine.top + 1, button.left + 6.5, endLine.top + (this.linesToCreateLength - (endLine.top - button.top))]);
            canvas.add(line1);
            canvas.verticalElements.push(line1);
            this.lines.push(line1); //add new line for button
            this.linesToCreateLength = 0;
        }

        if (this.endLineTop !== null && startElement.type2 === "else if") {
            var line = this.makeLine([button.left + 6.5, this.endLineTop + 1, button.left + 6.5, button.top]);
            canvas.add(line);
            canvas.verticalElements.push(line);
            this.lines.push(line); //add new line for button
            this.endLineTop = null;
        }
        canvas.renderAll();
    };

    this.translateHiddenElemements = function(canvas, length) {

        this.codeFoldingButtons.forEach(function(button) {
            if (button.getTop() > canvas.point[1]) {
                var button1 = button;
                if (button.isDeleted) {

                    while (button1.isDeleted) {
                        button1 = button1.button;

                    }
                }
                if (button1.getTop() > canvas.point[1]) {
                    button.hiddenElements.forEach(function(item) {
                        if (canvas.codeFoldingElementsNotTranslate.indexOf(item) >= 0 && canvas.notTranslateCodeFoldingElements)
                            /*alert("not translate") */ ;
                        else
                            item.setTop(item.getTop() + length).setCoords();

                    });
                }
            }
        });
    };

    this.addbutton = function(top, canvas, startElement) {

        this.SetPreviousLineHeight(top);
        var addBox = new fabric.Rect({
            left: canvas.startElement.bodyElement.left - 22,
            top: top,
            fill: 'white',
            stroke: '#808080',
            strokeWidth: 1,
            width: 13,
            height: 11
        });
        var line2 = this.makeLine([addBox.left + 3, addBox.top + 6, addBox.left + 11, addBox.top + 6]);
        var line1 = this.makeLine([addBox.left + 6.5, addBox.top + 3, addBox.left + 6.5, addBox.top + 10]);
        line1.stroke = "#FFFFFF";
        var codeFoldingButton = new fabric.Group(
                [addBox, line1, line2],
                {
                    hasControls: false,
                    hasBorders: false,
                    lockMovementX: true,
                    lockMovementY: true
                });
        codeFoldingButton.id = "codeFoldingButton";
        codeFoldingButton.lines = this.lines;
        codeFoldingButton.isDeleted = false;
        codeFoldingButton.hiddenElements = new Array();
        codeFoldingButton.startElement = startElement;
        startElement.codeFoldingButton = codeFoldingButton;
        codeFoldingButton.startElement.isMinus = true;
        canvas.add(codeFoldingButton);
        canvas.horizontalElements.push(codeFoldingButton);

        codeFoldingButton.mouseOver = function() {
            if (this.startElement.isMinus) {

                for (var i = 0; i < this.lines.length; i++) {

                    if (this.lines[i].top < this.endLine.top && this.lines[i].top > this.top && this.lines[i].isHide !== true) {
                        this.lines[i].stroke = "#000000";

                    }
                }
                this.endLine.stroke = "#000000";
                canvas.renderAll();
            }
        };

        codeFoldingButton.mouseOut = function() {

            for (var i = 0; i < this.lines.length; i++) {

                if (this.lines[i].top < this.endLine.top && this.lines[i].top > this.top && this.lines[i].isHide !== true) {
                    this.lines[i].stroke = "#808080";

                }
            }
            this.endLine.stroke = "#808080";
            canvas.renderAll();

        };

        codeFoldingButton.downClicked = function() {

            if (this.startElement.isMinus) {
                var numberOfVerticalElements = 0;
                var numberOfHorizontalElements = 0;

                this.item(1).stroke = "#808080";
                this.hiddenElements.length = 0;
                var items = canvas.verticalElements.concat(canvas.horizontalElements);
                for (var i = 0; i < items.length; i++) {
                    if ((items[i].top > this.top) && (items[i].top < this.endLine.top)) {
                        items[i].isHide = true;
                        this.hiddenElements.push(items[i]);
                        if (canvas.verticalElements.indexOf(items[i]) >= 0) {
                            numberOfVerticalElements++;
                            DeleteElementFromArray(items[i], canvas.verticalElements);
                            // if(items[i] ===  this.startElement.body ) alert(1);
                        }
                        else {
                            numberOfHorizontalElements++;
                            if (items[i].id === "codeFoldingButton") {
                                items[i].isDeleted = true;
                                items[i].button = this;
                            }
                            DeleteElementFromArray(items[i], canvas.horizontalElements);
                        }
                        canvas.remove(items[i]);

                    }
                }

                this.hiddenElements.push(this.endLine);
                this.endLine.isHide = true;
                numberOfHorizontalElements++;
                DeleteElementFromArray(this.endLine, canvas.horizontalElements);
                canvas.remove(this.endLine);
                this.numberVerticalElements = numberOfVerticalElements;
                this.numberHorizontalElements = numberOfHorizontalElements;
                this.length = this.endLine.top - this.top - 10;

                this.startElement.isMinus = false;
                AddDoNothingElement(this.startElement.left, this.startElement.top + this.startElement.height, canvas, -(this.endLine.top - this.top - 10), false);

            }
            else {
                this.item(1).stroke = "#FFFFFF";
                this.startElement.isMinus = true;

                AddDoNothingElement(this.startElement.left, this.startElement.top + this.startElement.height, canvas, this.length, false);
                for (var i = 0; i < this.hiddenElements.length; i++) {
                    this.hiddenElements[i].isHide = false;
                    canvas.add(this.hiddenElements[i]);
                    if (i < this.numberVerticalElements)
                        canvas.verticalElements.push(this.hiddenElements[i]);
                    else {
                        if (this.hiddenElements[i].id === "codeFoldingButton") {
                            this.hiddenElements[i].isDeleted = false;
                        }
                        canvas.horizontalElements.push(this.hiddenElements[i]);

                    }
                }

                this.hiddenElements.length = 0;
                if (this.startElement.id2 === "flowcontrol1" && (this.startElement.type2 === "start" || this.startElement.type2 === "else if") && this.startElement.type3 !== "dowhile")
                    LogicExprIsBalanced(this.startElement, canvas);

            }
        };

        return  codeFoldingButton;
    };
    this.makeLine = function(coords) {
        return new fabric.Line(coords, {
            stroke: "#808080",
            strokeWidth: 1,
            hasControls: false,
            hasBorders: false,
            lockMovementX: true,
            lockMovementY: true
        });
    };
    this.SetPreviousLineHeight = function(top) {
        for (var i = 0; i < this.lines.length; i++) {

            if (this.lines[i].top < top && (this.lines[i].top + this.lines[i].height) > top && this.lines[i].isHide !== true) {
                this.linesToCreateLength = (this.lines[i].top + this.lines[i].height) - top; //it will be once at time
                this.lines[i].setHeight(top - this.lines[i].top).setCoords();

            }
        }
    };

    this.FindPreviousLine = function(top, element) {

        for (var i = 0; i < this.lines.length; i++) {

            if (this.lines[i].top < top && (this.lines[i].top + this.lines[i].height) > top && this.lines[i].isHide !== true) {
                element.previousLine = this.lines[i];
                break;
            }
        }
    };

    this.FindEndLine = function(canvas) {
        var previousButton;
        SortArray(this.lines);
        SortArray(this.codeFoldingButtons);
        canvas.itemsOfDraggableElement.length = 0;
        this.codeFoldingButtons.forEach(function(button) {
            if (button.getTop() < canvas.point[1] && button.isHide !== true) {

                if (button.endLine.getTop() === canvas.point[1] && button.endLine.isHide !== true) {
                    canvas.notTranslate = true;
                    if (canvas.itemsOfDraggableElement.length === 0)
                        canvas.itemsOfDraggableElement.push(button.endLine);
                    return;
                }
                previousButton = button;
                //  
                // else {
                //    if (canvas.itemsOfDraggableElement[0].top > button.endLine.top)
                //       canvas.itemsOfDraggableElement[0] = button.endLine;
                // }
            }
        });

        if (canvas.itemsOfDraggableElement.length === 1) {

            this.endLineTop = canvas.itemsOfDraggableElement[0].top;
            canvas.notLengthenedElements.length = 0;

            this.lines.forEach(function(line) {

                if (line.top < canvas.itemsOfDraggableElement[0].top && line.isHide !== true) {
                    canvas.notLength = true;
                    canvas.notLengthenedElements.push(line);

                }
            });
        } else {
            this.endLineTop = previousButton.top + 10;
        }
    };

    this.DeleteCodeFoldingButtons = function(element, canvas, deleteElse, translateButtons) {
        var buttons = new Array();
        var lines = new Array();
        var buttons1 = this.codeFoldingButtons;
        var lines1 = this.lines;
        var endLine1 = null;
        var currentLine = null;

        this.previousLine = null;
        this.nextButton = null;
        this.nextEndLine = null;
        SortArray(this.lines);
        SortArray(this.codeFoldingButtons);
        if (element.type2 === "end")
            element = element.firstElement;
        if (element.type2 === "start") {
            var button;
            for (var i = 0; i < this.codeFoldingButtons.length; i++) {

                if (this.codeFoldingButtons[i].endLine.getTop() === element.endElement.top && this.codeFoldingButtons[i].isHide !== true) {

                    endLine1 = this.codeFoldingButtons[i].endLine;
                    break;
                } else {

                    if (this.codeFoldingButtons[i].top > element.top && this.codeFoldingButtons[i].top < element.endElement.top && this.codeFoldingButtons[i].isHide !== true)
                        button = this.codeFoldingButtons[i];
                }
            }
            if (endLine1 === null) {

                for (var i = 0; i < this.lines.length; i++) {
                    if (this.lines[i].top > button.top && this.lines[i].isHide !== true) {
                        endLine1 = this.lines[i];
                        break;
                    }
                }
            }
        }
        else if (element.codeFoldingButton.endLine.isHide !== true)
            endLine1 = element.codeFoldingButton.endLine;
        else {

            for (var i = 0; i < this.lines.length; i++) {
                if (this.lines[i].top > element.codeFoldingButton.top && this.lines[i].isHide !== true) {
                    endLine1 = this.lines[i];
                    break;
                }
            }
        }

        for (var i = 0; i < this.codeFoldingButtons.length; i++) { //here we find the buttons to delete

            if (this.codeFoldingButtons[i].top >= element.codeFoldingButton.top && this.codeFoldingButtons[i].top < endLine1.top && this.codeFoldingButtons[i].isHide !== true) {
                buttons.push(this.codeFoldingButtons[i]);

            } else if (this.codeFoldingButtons[i].top > endLine1.top && this.codeFoldingButtons[i].isHide !== true) {

                if (this.nextButton === null)
                    this.nextButton = this.codeFoldingButtons[i];

            }
            if (this.codeFoldingButtons[i].endLine.top > endLine1.top && this.codeFoldingButtons[i].endLine.isHide !== true) {

                if (this.nextEndLine === null)
                    this.nextEndLine = this.codeFoldingButtons[i].endLine;
                else if (this.nextEndLine.top > this.codeFoldingButtons[i].endLine.top) {
                    this.nextEndLine = this.codeFoldingButtons[i].endLine;
                }
            }
        }

        for (var i = 0; i < this.lines.length; i++) {  //here we find the lines to delete

            if (this.lines[i].top >= element.codeFoldingButton.top && this.lines[i].top <= endLine1.top) { //because hidden lines change position

                if ((element.type2 === "else if") && this.lines[i].top === endLine1.top)
                    ;
                else if (this.lines[i].isHide !== true)
                    lines.push(this.lines[i]);
                if ((element.type2 === "else if" && lines.length === 1 && element.codeFoldingButton.startElement.isMinus === true) || (element.type2 === "else if" && lines.length === 0 && element.codeFoldingButton.startElement.isMinus === false))
                    lines.push(currentLine);
                else if (((element.type2 === "else" || element.type2 === "start") && lines.length === 1 && this.previousLine === null)) {
                    this.previousLine = currentLine;
                }
            }
            else if (this.lines[i].top > endLine1.top && element.type2 !== "else if") {
                lines.push(this.lines[i]); //this is last line, we delete it in delete, and traslate it in traslate

                if (element.type2 === "else") {

                    element.lastLine = this.lines[i];
//                    if (i > 0 && this.lines[i - 1].isHide !== true){
//                        element.lastLine1 = this.lines[i - 1];
//                        alert("a");
//                    }
//                    else if (i > 1 && this.lines[i - 2].isHide !== true){
//                        element.lastLine1 = this.lines[i - 2];
//                         alert("w");
//                    }
//                      else if (i > 1 && this.lines[i - 4].isHide !== true){
//                        element.lastLine1 = this.lines[i - 4];
//                         alert("w");
//                    }
                    for (var index = i - 1; index >= 0; index--) {
                        if (this.lines[index].isHide !== true) {
                            element.lastLine1 = this.lines[index];
                            break;
                        }
                    }
                } else if (element.type2 !== "else") {

                    //  if (this.lines[i].isHide !== true)
                    //  element.lastLine = this.lines[i];

//                    else if (i > 0 && this.lines[i - 1].isHide !== true)
//                        element.lastLine = this.lines[i - 1];
//                    else if (i > 1 && this.lines[i - 2].isHide !== true)
//                        element.lastLine = this.lines[i - 2];

                    for (var index = i; index >= 0; index--) {
                        if (this.lines[index].isHide !== true) {
                            element.lastLine = this.lines[index];

                            break;
                        }
                    }
                }
                break;
            }
            if (this.lines[i].isHide !== true)
                currentLine = this.lines[i];
        }

        if (deleteElse && lines1.length > 0 && buttons.length > 0) {

            DeleteElementFromArray(lines[0], canvas.verticalElements); //if we have to translate an element and delte else, we delete the first line and button of else
            DeleteElementFromArray(lines[0], lines1);
            canvas.remove(lines[0]);
            lines.splice(0, 1);
            DeleteElementFromArray(buttons[0].endLine, canvas.horizontalElements);
            canvas.remove(buttons[0].endLine);
            DeleteElementFromArray(buttons[0], canvas.horizontalElements);
            DeleteElementFromArray(buttons[0], buttons1);
            canvas.remove(buttons[0]);
            buttons.splice(0, 1);
        }

        var hiddenElementsToDelete = new Array();
        this.codeFoldingButtons.forEach(function(button) {

            var button1 = button;
            if (button.isDeleted) {

                while (button1.isDeleted) {
                    button1 = button1.button;

                }
            }
            if (buttons.indexOf(button1) >= 0) {
                button.hiddenElements.forEach(function(item) {
                    //  if (lines1.indexOf(item) >= 0) {

                    hiddenElementsToDelete.push(item);

                    //  }

                });
                if (buttons.indexOf(button) < 0)
                    hiddenElementsToDelete.push(button);
            }

        });
        if (translateButtons !== true) {

            buttons.forEach(function(button) { //here we delete the buttons from array codeFoldingButtons, horizontalElements
                button.hiddenElements.forEach(function(item) {

                    if (item.id === "codeFoldingButton") {

                        DeleteElementFromArray(item, buttons1);

                    } else if (lines1.indexOf(item) >= 0) {

                        DeleteElementFromArray(item, lines1);

                    }

                });

                DeleteElementFromArray(button.endLine, canvas.horizontalElements);
                canvas.remove(button.endLine);
                DeleteElementFromArray(button, canvas.horizontalElements);
                DeleteElementFromArray(button, buttons1);
                canvas.remove(button);

            });

            hiddenElementsToDelete.forEach(function(item) {

                if (item.id === "codeFoldingButton") {

                    DeleteElementFromArray(item, buttons1);
                    //   DeleteElementFromArray(item.endLine, canvas.horizontalElements);
                    //  if (canvas.horizontalElements.indexOf(item.endLine) >= 0) alert(1);
                } else if (lines1.indexOf(item) >= 0) {

                    DeleteElementFromArray(item, lines1);

                }

            });

            lines.forEach(function(line) { //here we delete the buttons from array codeFoldingButtons, horizontalElements
                DeleteElementFromArray(line, canvas.verticalElements);
                DeleteElementFromArray(line, lines1);
                canvas.remove(line);

            });
        }
        else {
            hiddenElementsToDelete.forEach(function(item) {
                if (canvas.codeFoldingElementsNotTranslate.indexOf(item) < 0)
                    canvas.codeFoldingElementsNotTranslate.push(item);

            });

            lines.forEach(function(line) { //here we delete the buttons from array codeFoldingButtons, horizontalElements
                if (canvas.codeFoldingElementsNotTranslate.indexOf(line) < 0)
                    canvas.codeFoldingElementsNotTranslate.push(line);

            });
            buttons.forEach(function(button) { //here we delete the buttons from array codeFoldingButtons, horizontalElements
                button.hiddenElements.forEach(function(item) {
                    if (canvas.codeFoldingElementsNotTranslate.indexOf(item) < 0)
                        canvas.codeFoldingElementsNotTranslate.push(item);

                });
                if (canvas.codeFoldingElementsNotTranslate.indexOf(button) < 0)
                    canvas.codeFoldingElementsNotTranslate.push(button);
                if (canvas.codeFoldingElementsNotTranslate.indexOf(button.endLine) < 0)
                    canvas.codeFoldingElementsNotTranslate.push(button.endLine);

            });

//              canvas.codeFoldingElementsNotTranslate.forEach(function(item) { //here we delete the buttons from array codeFoldingButtons, horizontalElements
//              if(item === canvas.rightClickedElement.lastLine) 
//                  alert(item.top + " first  ");
//             });

        }
        if (element.type2 === "start") {
            canvas.notLength = true;
            canvas.notLengthenedElements.length = 0;
            canvas.notLengthenedElements.push(this.previousLine);
        }
        //alert(lines1.length + " lines");
        //alert(this.codeFoldingButtons.length + " buttons");
    };

    this.setLineLength = function(canvas, type, deleteCondition) {

        if (this.previousLine !== null && type === "else" && (this.nextButton === null)) {

            this.previousLine.setHeight(this.nextEndLine.top - this.previousLine.top).setCoords();
            canvas.renderAll();
            
        }
        else if (this.previousLine !== null && (type === "start" || type === "end" || type === "else")) {//when we delete if element

            if (this.nextButton === null || (this.nextButton !== null && this.nextEndLine.top < this.nextButton.top)) {
                this.previousLine.setHeight(this.nextEndLine.top - this.previousLine.top).setCoords();
              
            } else if ((type === "else" || ((type === "start" || type === "end") && deleteCondition)) && this.previousLine !== null && this.nextEndLine !== null) {
                this.previousLine.setHeight(this.nextButton.top - this.previousLine.top).setCoords();
               
            }
        }
        else {
           
            this.previousLine.setHeight(this.nextButton.top - this.previousLine.top).setCoords();

        }
        canvas.renderAll();
        this.previousLine = null;
        this.nextButton = null;
        this.nextEndLine = null;

    };

    this.setLastLineLength = function(lastLine, canvas) {

        var button = null;
        var line = null;
        var endLine = null;
        SortArray(this.lines);
        SortArray(this.codeFoldingButtons);

        for (var i = 0; i < this.codeFoldingButtons.length; i++) {

            if (this.codeFoldingButtons[i].endLine.getTop() > lastLine.top && this.codeFoldingButtons[i].endLine.isHide !== true) {

                if (endLine === null)
                    endLine = this.codeFoldingButtons[i].endLine;
                else if (endLine.top > this.codeFoldingButtons[i].endLine.top) {
                    endLine = this.codeFoldingButtons[i].endLine;
                }

            }
            if (this.codeFoldingButtons[i].top > lastLine.top && this.codeFoldingButtons[i].isHide !== true && button === null)
                button = this.codeFoldingButtons[i];

        }

        for (var i = 0; i < this.lines.length; i++) {
            if (this.lines[i].top > lastLine.top && this.lines[i].isHide !== true) {
                line = this.lines[i];
                break;
            }
        }
        if (button !== null && line !== null && endLine !== null) {
            if (line.top < endLine.top && line.top < button.top) {
                //  alert("line next 1");
                lastLine.setHeight(line.oCoords.bl.y - lastLine.top).setCoords();
                DeleteElementFromArray(line, canvas.verticalElements);
                DeleteElementFromArray(line, this.lines);
                canvas.remove(line);
            }
            else if (button.top < endLine.top && button.top < line.top) {
                //   alert("button next 2");

                lastLine.setHeight(button.getTop() - lastLine.getTop()).setCoords();

            }
            else if (endLine.top < line.top && endLine.top < button.top) {
                //   alert("endLine next 3");
                lastLine.setHeight(endLine.top - lastLine.top).setCoords();
            }
        }

        else if (button !== null && line !== null) {
            if (line.top < button.top) {
                //   alert("line next 4");
                lastLine.setHeight(line.oCoords.bl.y - lastLine.top).setCoords();
                DeleteElementFromArray(line, canvas.verticalElements);
                DeleteElementFromArray(line, this.lines);
                canvas.remove(line);
            }
            else if (button.top < line.top) {
                // alert("button next 5");
                lastLine.setHeight(button.top - lastLine.top).setCoords();
            }
        }
        else if (line !== null && endLine !== null) {
            if (line.top < endLine.top) {
                //  alert("line next 6");
                lastLine.setHeight(line.oCoords.bl.y - lastLine.top).setCoords();
                DeleteElementFromArray(line, canvas.verticalElements);
                DeleteElementFromArray(line, this.lines);
                canvas.remove(line);
            }
            else if (endLine.top < line.top) {
                // alert("endLine next 7");
                lastLine.setHeight(endLine.top - lastLine.top).setCoords();

            }
        }
        else if (button !== null && endLine !== null) {
            if (button.top < endLine.top) {
                //     alert("button next 8");
                lastLine.setHeight(button.top - lastLine.top).setCoords();
            }
            else if (endLine.top < button.top) {
                //    alert("endLine next 9");
                lastLine.setHeight(endLine.top - lastLine.top).setCoords();
            }
        }

        else if (button !== null) {
            // alert("button next 10");
            lastLine.setHeight(button.top - lastLine.top).setCoords();
        }

        else if (line !== null) {
            //  alert("line next 11");
            lastLine.setHeight(line.oCoords.bl.y - lastLine.top).setCoords();
            DeleteElementFromArray(line, canvas.verticalElements);
            DeleteElementFromArray(line, this.lines);
            canvas.remove(line);
        }
        else if (endLine !== null) {
            // alert("endLine next 12");
            lastLine.setHeight(endLine.top - lastLine.top).setCoords();
        }

    };

}