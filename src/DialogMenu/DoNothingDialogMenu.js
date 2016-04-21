function DoNothingDialogMenu(){

	var id = "doNothingDialogMenu";
	var title = "Choose Element";

	DialogMenuController.createBasicDialogMenu(this,id,title,DialogMenuData.doNothingDialogMenuWidth);
	
	this.radioForm = createHtmlElement({
		format: "form",
		id: "radioForm",
		father: this.dialogBody
	});

	$(this.dialogBody).css('padding-left', '80px');

	for (var key in ElementType) {
		if(key!="grey" && key!="program" && key!="doNothing")
			createRadioHtmlElement({
				id: key,
				text: key + "Element",
				name: 'type',
				father: this.radioForm
			});
	};

	$(this.buttonOk).mousedown(function() {
      	for (var key in ElementType) {
      		var id = "#" + key;
	        if( $(DialogMenuController.getActive().dialogMenuDiv).find(id).prop("checked") == true){
        		DialogMenuController.getActive().element.father.addElement(key,0);
        	}	
		}

        DialogMenuController.close(true);
	});

	return this;
};

DoNothingDialogMenu.prototype.initRadioButtons = function(){

	var fTime = true;

    for (var key in ElementType) {
    	if(key!="grey" && key!="program" && key!="doNothing"){
      		var id = "#" + key;
    		if(fTime == true){
	   			$(DialogMenuController.getActive().dialogMenuDiv).find(id).prop("checked", true);
    			fTime = false;
    		}
    		$(DialogMenuController.getActive().dialogMenuDiv).find(id).attr("disabled", false);
        }	
    }
};

DoNothingDialogMenu.prototype.open = function(object){

	this.object = object;
	this.element = object.element;

	this.initRadioButtons();

    $(this.dialogMenuDiv).css('display', "block");	
};

DoNothingDialogMenu.prototype.close = function(){
    $(this.dialogMenuDiv).css('display', "none");

	this.object = null;
	this.element = null;
};


