function createHtmlElement(attributes){
	var element = $("<"+attributes.format+">", {
		id: attributes.id, 
		class: attributes.className,
		html: attributes.text,
		value: attributes.value,
		type: attributes.type,
		name: attributes.name,
		color: attributes.color,
		style: attributes.style,
		placeholder: attributes.placeholder,
		object: attributes.object
	});
	
	$(attributes.father).append(element);

	if(attributes.hide == true)
		$(element).hide();

	element.css('top', attributes.top);
	element.css('left', attributes.left);
	element.css('width', attributes.width);
	element.css('height', attributes.height);
	element.css('box-shadow', attributes.boxShadow);
	element.css('border', attributes.border);
	element.css('border-radius', attributes.borderRadius);
	element.css('text-align',attributes.textAllign);

	return element;
};

function createRadioHtmlElement(attributes){
	
	var radioDiv = createHtmlElement({
		format: "div",
		id: attributes.id+"Div",
		className: "row",
		father: attributes.father
	});	

	var radio = createHtmlElement({
		format: "input",
		id: attributes.id,
		value: attributes.value,
		name: attributes.name,
		className: attributes.className+" col-sm-2",
		father: radioDiv,
		type: "radio"
	});

	var radioText = createHtmlElement({
		format: "text",
		id: attributes.id+"Text",
		className: "col-sm-10",
		text: attributes.text,
		father: radioDiv
	});

    $(radioDiv).css('padding-left', 20);

    if(attributes.hide == true){
    	$(radioDiv).hide();
    }
    else if(attributes.hide == false){
    	$(radioDiv).show();
    }
    
	return radioDiv;
};
/*
function createAutocompleteInputHtmlElement(father,placeholder,inputType){
	var input = createHtmlElement({
		format: "input",
		father: father
	});

	$(input).easyAutocomplete(IdController.options(inputType));
	$(input).attr('placeholder',placeholder);
	$(input).parent().addClass('dialogInput');
	$(input).parent().css('width','160px');
	$(input).css('width','160px');

	return input;
};
*/

function createAutocompleteInputHtmlElement(father,placeholder,inputType){
	
	var div = createHtmlElement({
		format: "div",
		//className: "ui-widget",
		father: father
	});
	//$(div).css('height','25px');
	
	var input = createHtmlElement({
		format: "input",
		className: "autocompleteInput",
		father: div
	});
	
    $(input).autocomplete({
      source: IdController.getId(inputType),
      minLength: 0,
      autoFocus: true
    });
    
	$(input).on("input change focusin focusout keydown keyup",function(e){
		var active = DialogMenuController.getActive();
		var lValue = active.lValue;
		
		if(lValue){
			if( $(this).val() == "")
				lValue.basicDialogMenu.enableNextButton(false);		
			else
				lValue.basicDialogMenu.enableNextButton(true);		
		}
	});

	$(input).on("focusout",function(e){
		IdController.add($(this).val(),inputType);
	});

    $('.dropdown').mousedown(function () {
    	$('.autocompleteInput').autocomplete('close');
	}); 
	
	var s = createHtmlElement({
		format: "span",
		className: "caret",
		father: div
	});

	$(s).css('position','relative');
	$(s).css('left','135px');
	$(s).css('top','-20px');

    $(s).mousedown(function () {
    	$(input).autocomplete("search");
	});
	
	$(input).attr('placeholder',placeholder);
	$(input).parent().addClass('dialogInput');
	$(input).parent().css('width','160px');
	$(input).parent().css('height',$(input).height());
	$(input).css('width','160px');
	
	return input;
};

function radioIsChecked(radio){
	return $(radio).children('input[type=radio]').prop("checked");
}