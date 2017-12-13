function DoNothingDialogMenu(){

	var title = "Choose Element";

	this.basicDialogMenu = new BasicDialogMenu(title,DialogMenuData.doNothingDialogMenuWidth);

	this.doNothingDiv = createHtmlElement({
		format: "div",
		father: this.basicDialogMenu.getContentDiv()
	});
	$(this.doNothingDiv).width('100%');


	$(this.doNothingDiv).css('border-radius','0px');

	this.doNothingContentDiv = createHtmlElement({
		format: "div",
		className: "row",
		father: this.doNothingDiv
	});
	$(this.doNothingContentDiv).css('margin','10px');
	
	this.chooseTypeDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.doNothingContentDiv
	});
	$(this.chooseTypeDiv).addClass('chooseDiv');

	this.chooseTypeLabel = createHtmlElement({
		format: "div",
		className: "dialogLabel",
		text: "Choose Type:",
		father: this.chooseTypeDiv
	});

	this.chooseTypeDropdown = createHtmlElement({
		format: "div",
		className: "dropdown dropdownMultiDepth dialogInput",
		father: this.chooseTypeDiv
	});
	$(this.chooseTypeDropdown).css('position','relative');

	this.chooseTypeDropdownA = createHtmlElement({
		format: "a",
		className: "btn btn-primary",
		id: "dLabel",
		father: this.chooseTypeDropdown
	});
	$(this.chooseTypeDropdownA).attr('data-toggle','dropdown');
	$(this.chooseTypeDropdownA).addClass('chooseTypeDropdownA');

	this.chooseTypeDropdownUl = createHtmlElement({
		format: "ul",
		className: "dropdown-menu",
		father: this.chooseTypeDropdown
	});
	$(this.chooseTypeDropdownUl).attr('aria-labelledby','dropdownMenu');
	$(this.chooseTypeDropdownUl).addClass('chooseTypeDropdownUl');

	this.imageDiv = createHtmlElement({
		format: "div",
		className: "col-xs-12",
		father: this.doNothingContentDiv
	});
	$(this.imageDiv).addClass('chooseDiv');
	$(this.imageDiv).css('text-align','center');

    this.image = createHtmlElement({
		format: "img",
		father: this.imageDiv
	});
	$( this.image ).width(300);
	$( this.image ).height(90);

	for (var key in ElementType) {
		var fTime = true;

		if(key!="grey" && key!="program" && key!="doNothing" && key!="function" && key!="variables"){

			var elem = createHtmlElement({
				format: "li",
				father: this.chooseTypeDropdownUl
			});
			$(elem).addClass('chooseTypeDropdownList');
			$(elem).html('<a>'+key+'</a>');
	
			if(fTime == true){
	    		$(this.chooseTypeDropdownA).html(key+'<span class="caret"></span>');	
	    		$(this.image).attr("src", "images/elements/"+key+".png");
				fTime = false;
			}

			$(elem).mousedown(function(){
				var active = DialogMenuController.getActive();
	    
	    		$(active.chooseTypeDropdownA).html($(this).html()+'<span class="caret"></span>');	
	    		$(active.image).attr("src", "images/elements/"+$(this).html().substring(3,$(this).html().length-4)+".png");
			});		
		}
	};

	return this;
};

DoNothingDialogMenu.prototype.submit = function(){
	 DialogMenuController.getElement().father.addElement($(this.chooseTypeDropdownA).text(),0);
};

DoNothingDialogMenu.prototype.open = function(){
};

DoNothingDialogMenu.prototype.close = function(){
	console.log('close DoNothingDialogMenu');
};

