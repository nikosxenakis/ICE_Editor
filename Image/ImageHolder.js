var ImageHolder = (function(){

    function ImageHolder() {
        //this.images = new Array();   
        addHtmlImages();
        initDraggableElements();
    }

    var instance;
    return {
        getInstance: function(){
            if (instance == null) {
                instance = new ImageHolder();
                instance.constructor = null;
            }
            return instance;
        }
    };

function addHtmlImages(){

    for (key in Elements){
        if(Elements[key].categoryImg && Elements[key].srcImg){

            var father;
            if(Elements[key].categoryImg == "loops")
                father = $('#sideBarImagesLoops');
            else if(Elements[key].categoryImg == "statements")
                father = $('#sideBarImagesStatements');
            else if(Elements[key].categoryImg == "flows")
                father = $('#sideBarImagesFlows');            

            var elementLi = createHtmlElement({
                format: "li",
                father: father
            });

            var img = createHtmlElement({
                format: "img",
                id: key,
                className: "draggable",
                father: elementLi
            });
            $(img).attr("src", Elements[key].srcImg);  
            $(img).width(160);
            $(img).height(80);

            if(Elements[key].categoryImg == "statements"){
                $(img).height(45);
            }
        }
    }
};

function initDraggableElements() {
    
  $('.draggable').draggable(
    {
        appendTo: 'html',   //so the image is visible
        helper:"clone",
        start: function (event, ui) {

            $('.overlay').css('background-color','rgba(0, 0, 0, 0)');

            c.intersection = false;
            c.elementsUnderDrag.length = 0;
            c.tmpElement = null;
        },
        drag: function (event, ui) {

            var canvasDiv=document.getElementById("canvas");

            var target=event.target;
            var imageRect={
                left:ui.offset.left-canvasDiv.getBoundingClientRect().left,
                top:ui.offset.top-canvasDiv.getBoundingClientRect().top,
                width:target.width,
                height:target.height
            }
            console.log(imageRect);
            Canvas.rectangleCollisionWithHorizontialElements(imageRect);
            
            Canvas.addElementToCanvas(target.id);

        },
        stop: function (event, ui) {

            $('.overlay').css('background-color','');

            if(c.tmpElement){
                c.tmpElement.setOpacity(1);
                c.canvas.renderAll();
            }
            c.intersection = false;
            c.elementsUnderDrag.length = 0;
            c.tmpElement = null;
        },
        
    }
  );
}

})();