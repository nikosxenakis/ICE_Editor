/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var CreateInsideElement = function() {
    this.insideElement;

    this.InsideElement = function(left, top, width, stroke, height) {
        this.insideElement = new fabric.Rect({
            left: left,
            top: top,
            fill: 'white',
            stroke: stroke,
            strokeWidth: 2,
            width: width,
            height: height,
            lockMovementX: true,
            lockMovementY: true,
            hasControls: false,
            hasBorders: false
        });

    };

};

var CreateBox = function() {
    this.box;

    this.InitBox = function(left, top) {
        this.box = new fabric.Rect({
            left: left,
            top: top,
            fill: 'white',
            stroke: '#333399',
            strokeWidth: 2,
            width: 70,
            height: 30,
            lockMovementX: true,
            lockMovementY: true,
            hasControls: false,
            hasBorders: false
        });

    };
    this.OnMouseOut = function() {

        this.box.strokeWidth = 2;

    };

    this.OnMouseOver = function() {

        this.box.strokeWidth = 4;

    };

};

var CreateText = function() {
    this.text;

    this.Text = function(left, top) {
        this.text = new fabric.Text("", {
            left: left,
            top: top,
            fill: '#000000',
            fontSize: '16',
            fontWeight: 'bold',
            fontFamily: ' Arial',
            lockMovementX: true,
            lockMovementY: true,
            hasControls: false,
            hasBorders: false
        });

    };
};

var CreateTextOperator = function() {
    this.text;

    this.Text = function(left, top, text) {
        this.text = new fabric.Text(text, {
            left: left,
            top: top,
            fill: '#C00000',
            fontSize: '25',
            fontWeight: 'bold',
            fontFamily: ' Arial',
            lockMovementX: true,
            lockMovementY: true,
            hasControls: false,
            hasBorders: false
        });

    };

    this.OnMouseOut = function() {

        this.text.fill = '#C00000';

    };

    this.OnMouseOver = function() {

        this.text.fill = '#FF0033';

    };

};

var CreateDeleteButton = function(canvas) {

    this.groupDeleteButton;

    this.DeleteButton = function(top, left) {
        var deleteButton = new fabric.Circle({
            radius: 7,
            left: left,
            top: top,
            fill: 'white',
            stroke: 'red',
            strokeWidth: 1

        });
        var line1Button = new fabric.Line([deleteButton.left + 7, deleteButton.top, deleteButton.left + 6, deleteButton.top + 14], {
            stroke: 'red',
            strokeWidth: 2
        });


        var line2Button = new fabric.Line([deleteButton.left, deleteButton.top + 6, deleteButton.left + 14, deleteButton.top + 7], {
            stroke: 'red',
            strokeWidth: 2
        });

        this.groupDeleteButton = new fabric.Group(
                [deleteButton, line1Button, line2Button],
                {
                    hasControls: false,
                    hasBorders: false,
                    lockMovementX: true,
                    lockMovementY: true,
                    angle: 45
                });
        this.groupDeleteButton.id5 = "groupDeleteButton4";

        this.groupDeleteButton.mouseOver = function() {
            this.item(0).strokeWidth = 2;
            this.item(0).radius = 8;
            canvas.renderAll();
        };

        this.groupDeleteButton.mouseOut = function() {

            this.item(0).strokeWidth = 1;
            this.item(0).radius = 7;
            canvas.renderAll();

        };

    };

};

function CreateAddBox() {

    this.groupAddBox;

    this.AddBox = function(left, top) {
        var addBox = new fabric.Rect({
            left: left,
            top: top,
            fill: 'white',
            stroke: '#989898',
            strokeWidth: 2,
            width: 20,
            height: 18
        });

        var line1Plus = new fabric.Line([addBox.left + 9.5, addBox.top + 2, addBox.left + 9.5, addBox.top + 19], {
            stroke: '#989898',
            strokeWidth: 3
        });

        var line2Plus = new fabric.Line([addBox.left + 2, addBox.top + 9, addBox.left + 20, addBox.top + 9], {
            stroke: '#989898',
            strokeWidth: 3
        });

        this.groupAddBox = new fabric.Group(
                [addBox, line2Plus, line1Plus],
                {
                    hasControls: false,
                    hasBorders: false,
                    stroke: '#989898',
                    lockMovementX: true,
                    lockMovementY: true
                });
    };

    this.OnMouseDown = function() {

        this.groupAddBox.item(1).stroke = '#989898';
        this.groupAddBox.item(2).stroke = '#989898';
        this.groupAddBox.item(0).stroke = '#989898';

    };
    this.OnMouseOut = function() {

        this.groupAddBox.item(1).stroke = 'blue';
        this.groupAddBox.item(2).stroke = 'blue';

    };

    this.OnMouseOver = function() {

        this.groupAddBox.item(1).stroke = '#3399FF';
        this.groupAddBox.item(2).stroke = '#3399FF';

    };
    this.SetColorEnabledButton = function() {

        this.groupAddBox.item(1).stroke = 'blue';
        this.groupAddBox.item(2).stroke = 'blue';
        this.groupAddBox.item(0).stroke = '#333399';
    };
}