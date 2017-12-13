function BasicDialogMenu( title , width){

	this.dialogMenuDiv = createHtmlElement({
		format: "div",
		father: "body",
	});
	$(this.dialogMenuDiv).attr('title',title);

	$( this.dialogMenuDiv ).dialog({
   		modal: true,
    	draggable: true,
    	resizable: false,
    	position: ['center', 50],
    	width: width,
    	dialogClass: 'dialogStyle ui-dialog-osx',
    	buttons: [ 
    		{ 
    			text: "Cancel", 
    			click: function() { 

    				var active = DialogMenuController.getActive();

   					DialogMenuController.close(false);

   					$(this).dialog( "close" ); 

					$(this).dialog('destroy').remove();
					$('.ui-effects-wrapper').remove();
    			},
    			id: "buttonCancel"
    		},
    		{ 
    			text: "Submit", 
    			click: function() { 

    				var active = DialogMenuController.getActive();
					
					if(active.submit)
						active.submit();
						
   					DialogMenuController.close(true);

   					$(this).dialog( "close" ); 

					$(this).dialog('destroy').remove();  
					$('.ui-effects-wrapper').remove();
				},
    			id: "buttonSubmit"
    		}
    	] 
	   
	});
	$( this.dialogMenuDiv ).css('overflow','visible');

	$( '.ui-dialog-titlebar-close' ).css('visibility','hidden');

	$('.ui-dialog-buttonpane').css('padding','0px');
	$('.ui-dialog-buttonpane button').css('font-size','16px');
	return this;

};

BasicDialogMenu.prototype.getContentDiv = function(){
	return this.dialogMenuDiv;
};

BasicDialogMenu.prototype.enableNextButton = function(flag){
	$('#buttonSubmit').attr("disabled", !flag);

	if(flag == true)
		$('#buttonSubmit').css('color', '#275F61');
	else
		$('#buttonSubmit').css('color', '#C1CCC0');
};