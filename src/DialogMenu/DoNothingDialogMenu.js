function DoNothingDialogMenu(){

	var title = "Choose Element";

	this.basicDialogMenu = new BasicDialogMenu(title,DialogMenuData.doNothingDialogMenuWidth);
	
	this.radioForm = createHtmlElement({
		format: "form",
		father: this.basicDialogMenu.getContentDiv()
	});

	//$(this.radioForm).css('padding-left', '130px');

	for (var key in ElementType) {
		if(key!="grey" && key!="program" && key!="doNothing" && key!="function" && key!="variables")
			createRadioHtmlElement({
				id: key,
				text: key + "Element",
				name: 'type',
				father: this.radioForm
			});
	};

	$( this.basicDialogMenu.getNextButton() ).mousedown(function() {
      	for (var key in ElementType) {
      		var id = "#" + key;
	        if( $(DialogMenuController.getActive().basicDialogMenu.getContentDiv()).find(id).prop("checked") == true){
        		DialogMenuController.getActive().element.father.addElement(key,0);
        	}	
		}

        DialogMenuController.close(true);
	});

	return this;
};

DoNothingDialogMenu.prototype.init = function(){

	var fTime = true;

    for (var key in ElementType) {
    	if(key!="grey" && key!="program" && key!="doNothing" && key!="function" && key!="variables"){
      		var id = "#" + key;
    		if(fTime == true){
	   			$(DialogMenuController.getActive().basicDialogMenu.getContentDiv()).find(id).prop("checked", true);
    			fTime = false;
    		}
    		$(DialogMenuController.getActive().basicDialogMenu.getContentDiv()).find(id).attr("disabled", false);
        }	
    }
	this.basicDialogMenu.enableNextButton(true);
	this.basicDialogMenu.enableBackButton(false);

	this.basicDialogMenu.setNextButton('Submit');
};

DoNothingDialogMenu.prototype.open = function(object){

	this.object = object;
	this.element = object.element;

	this.basicDialogMenu.show();

	this.init();

};

DoNothingDialogMenu.prototype.close = function(){
	
	this.basicDialogMenu.hide();

	this.object = null;
	this.element = null;
};


