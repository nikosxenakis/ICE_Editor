//must have .open(object) && .close(updateFlag) in change the InputElement.input and close the window
//
//parse the InputElement
//
//make the object and the DialogMenu UI
//
//EDIT


function NAMEDialogMenu(id,title){

	DialogMenuController.createBasicDialogMenu(this,id,title);
	//add elements to this.dialogBody

	$(this.buttonOk).mousedown(function() {

        DialogMenuController.close(true);

	});

	return this;
};


NAMEDialogMenu.prototype.open = function(object){

	//object must have a object.input && object.update(input)
	this.object = object;
	this.element = object.element;

    $(this.dialogMenuDiv).css('display', "block");	
};

NAMEDialogMenu.prototype.close = function(){
    $(this.dialogMenuDiv).css('display', "none");

	this.object = null;
	this.element = null;
};


