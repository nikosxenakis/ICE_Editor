function LogicOperatorDialogMenu(){

	var title = "Choose Logic Operator";

	this.basicDialogMenu = new BasicDialogMenu(title,DialogMenuData.logicExpressionContentDialogMenuWidth);
	
	this.radioForm = createHtmlElement({
		format: "form",
		id: "radioForm",
		father: this.basicDialogMenu.getContentDiv()
	});

	$(this.basicDialogMenu.getContentDiv()).css('padding-left', '80px');

	for (var key in LogicOperatorType) {
		createRadioHtmlElement({
			id: key,
			text: key,
			name: 'type',
			father: this.radioForm
		});
	};

	$( this.basicDialogMenu.getNextButton() ).mousedown(function() {
      	for (var key in LogicOperatorType) {
      		var id = "#" + key;
	        if( $(DialogMenuController.getActive().radioForm).find(id).prop("checked") == true){
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
   			$(DialogMenuController.getActive().radioForm).find(id).prop("checked", true);
			fTime = false;
		}

		if(this.object.input.input == LogicOperatorType[key]){
    		$(DialogMenuController.getActive().radioForm).find(id).prop("checked", true);
		}

		$(DialogMenuController.getActive().radioForm).find(id).attr("disabled", false);
    }

    $(this.buttonBack).hide();
    $(this.buttonNext).attr("disabled", false);

};

LogicOperatorDialogMenu.prototype.open = function(object){

	this.object = object;

	this.basicDialogMenu.show();
	
	this.initRadioButtons();

};

LogicOperatorDialogMenu.prototype.close = function(){

	this.basicDialogMenu.hide();

	this.object = null;
};

