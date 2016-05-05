function LogicOperatorDialogMenu(){

	var id = "logicOperatorDialogMenu";
	var title = "Choose Logic Operator";

	DialogMenuController.createBasicDialogMenu(this,id,title,DialogMenuData.doNothingDialogMenuWidth);
	
	this.radioForm = createHtmlElement({
		format: "form",
		id: "radioForm",
		father: this.dialogBody
	});

	$(this.dialogBody).css('padding-left', '80px');

	for (var key in LogicOperatorType) {
		createRadioHtmlElement({
			id: key,
			text: key,
			name: 'type',
			father: this.radioForm
		});
	};

	$(this.buttonNext).mousedown(function() {
      	for (var key in LogicOperatorType) {
      		var id = "#" + key;
	        if( $(DialogMenuController.getActive().dialogMenuDiv).find(id).prop("checked") == true){
	        	DialogMenuController.getActive().object.input.setText(key);
        	}	
		}

        DialogMenuController.close(true);
	});

	return this;
};

LogicOperatorDialogMenu.prototype.initRadioButtons = function(){

	var fTime = true;

    for (var key in LogicOperatorType) {
  		var id = "#" + key;
		if(fTime == true){
   			$(DialogMenuController.getActive().dialogMenuDiv).find(id).prop("checked", true);
			fTime = false;
		}

		if(this.object.input.input == LogicOperatorType[key]){
    		$(DialogMenuController.getActive().dialogMenuDiv).find(id).prop("checked", true);
		}

		$(DialogMenuController.getActive().dialogMenuDiv).find(id).attr("disabled", false);
    }

    $(this.buttonBack).hide();
    $(this.buttonNext).attr("disabled", false);

};

LogicOperatorDialogMenu.prototype.open = function(object){

	this.object = object;

	this.initRadioButtons();

    $(this.dialogMenuDiv).css('display', "block");	
};

LogicOperatorDialogMenu.prototype.close = function(){
    $(this.dialogMenuDiv).css('display', "none");

	this.object = null;
};

