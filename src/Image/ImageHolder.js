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

    var loopsHeader = createHtmlElement({
        format: "li",
        className: "dropdown-header",
        text: "Loops",
        father: $("#sideBarImages")
    });

    var loops = createHtmlElement({
        format: "li",
        father: $("#sideBarImages")
    });
    
    var flowsHeader = createHtmlElement({
        format: "li",
        className: "dropdown-header",
        text: "Flows",
        father: $("#sideBarImages")
    });

    var flows = createHtmlElement({
        format: "li",
        father: $("#sideBarImages")
    });

    var statementsHeader = createHtmlElement({
        format: "li",
        className: "dropdown-header",
        text: "Statements",
        father: $("#sideBarImages")
    });

    var statements = createHtmlElement({
        format: "li",
        father: $("#sideBarImages")
    });

    for (key in Elements){
        if(Elements[key].categoryImg && Elements[key].srcImg){

            var father;
            if(Elements[key].categoryImg == "loops")
                father = loops;
            else if(Elements[key].categoryImg == "statements")
                father = statements;
            else if(Elements[key].categoryImg == "flows")
                father = flows;            

            var img = createHtmlElement({
                format: "img",
                id: Elements[key].id,
                className: "draggable",
                father: father
            });
            $(img).attr("src", Elements[key].srcImg);  
            $(img).width(180);
            $(img).height(80);
        }
    }
};

function initDraggableElements() {

  $('.draggable').draggable(
    {
        appendTo: 'html',   //so the image is visible
        helper:"clone",
        start: function (event, ui) {
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
      
            Canvas.rectangleCollisionWithHorizontialElements(imageRect);
            
            Canvas.addElementToCanvas(target.id);

        },
        stop: function (event, ui) {
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