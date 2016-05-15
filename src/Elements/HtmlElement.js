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

function radioIsChecked(radio){
	return $(radio).children('input[type=radio]').prop("checked");
}