var ImageHolder = (function(){

    function ImageHolder() {
        this.images = new Array();        
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