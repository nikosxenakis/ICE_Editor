var ImageHolder = (function(){

    function ImageHolder() {
        this.images = new Array();
        //read images.json
        
        initDraggableElements();
    }

    var instance;
    return {
        getInstance: function(){
            if (instance == null) {
                instance = new ImageHolder();
                // Hide the constructor so the returned objected can't be new'd...
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
            //console.log("start dragging");            

        },
        drag: function (event, ui) {
            //console.log("is dragging");

            var canvasDiv=document.getElementById("canvas");

            var target=event.target;
            var imageRect={
                left:ui.offset.left-canvasDiv.getBoundingClientRect().left,
                top:ui.offset.top-canvasDiv.getBoundingClientRect().top,
                width:target.width,
                height:target.height
            }
      
            c=Canvas.getInstance();

            _.each(
                c.horizontalElements, 
                function(elem) {    
                        if( rectangesCollision( elem , imageRect ) ){
                            //console.log(imageRect,elem);
                            c.elementsUnderDrag.push(elem);
                        }
                }
            )

            //call the transformations
            if( c.elementsUnderDrag.length >= 2 && c.intersection==false){

                //console.log("ready for drag, under drag = ",c.elementsUnderDrag);

                c.intersection = true;

                var elem1 = c.elementsUnderDrag[0].element;
                var elem2 = c.elementsUnderDrag[1].element;
                //console.log(elem1,elem2);

                //the first in a block
                if(elem1 == elem2){
                    console.log("Error: it can't be the first in the block"); 
                    c.intersection = false;
                    c.elementsUnderDrag.length = 0;
                    c.tmpElement = null;
                }
                //elem1 is inside elem2 or opposite
                else if(elem1.father == elem2 || elem1 == elem2.father){
                    var father;
                    var fatherRect;
                    var child;
                    var childRect;

                    if(elem1.father == elem2){
                        father = elem2;
                        fatherRect = c.elementsUnderDrag[1];
                        child = elem1;
                        childRect = c.elementsUnderDrag[0];
                    }
                    else if(elem1 == elem2.father){
                        father = elem1;
                        fatherRect = c.elementsUnderDrag[0];
                        child = elem2;
                        childRect = c.elementsUnderDrag[1];
                    }

                    if(fatherRect.getTop() <= childRect.getTop() ){
                        c.tmpElement = father.addElement(target.id,0,0.6);
                    }
                    else{
                        c.tmpElement = father.addElement(target.id,father.elements.length,0.6);
                    } 
                }
                else if( elem1.father == elem2.father ){
                    var firstElem;
                    var secondElem;
                    var father;

                    if(elem1.getElementSize().top <= elem2.getElementSize().top){
                        firstElem = elem1;
                        secondElem = elem2;
                    }
                    else{
                        firstElem = elem2;
                        secondElem = elem1;
                    }

                    father = secondElem.father;
                    
                   var offset;
                   for ( offset = 0; offset < father.elements.length; offset++) {
                       if(father.elements[offset]==secondElem){
                            break;
                       }
                   };
                    c.tmpElement = father.addElement(target.id,offset,0.6);

                }
                else{
                    console.log("Error no such case");
                    c.intersection = false;
                    c.elementsUnderDrag.length = 0;
                    c.tmpElement = null;
                }
            }
            //no intersection
            else if(c.elementsUnderDrag.length <= 1 && c.intersection==true){

                c.intersection = false;
                if(!c.tmpElement){
                    console.log("There is no tmp element created for delete");
                }
                else{
                    c.tmpElement.removeElement();
                }
                c.tmpElement = null;
            }
            else{
            }

            c.elementsUnderDrag.length = 0;
            
        },
        stop: function (event, ui) {
            if(c.tmpElement){
                c.tmpElement.setOpacity(1);
                c.canvas.renderAll();
            }
            c.intersection = false;
            c.elementsUnderDrag.length = 0;
            c.tmpElement = null;

            //console.log("stop dragging");
        },
        
    }
  );
}

})();

function imageIdToElement(imageId){

    if(images[imageId])
        return images[imageId];
    else
        console.log("this image is not registered in var images of json files");
};

