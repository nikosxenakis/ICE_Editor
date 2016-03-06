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
            console.log("start dragging");            

        },
        drag: function (event, ui) {
            console.log("is dragging");

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
                        console.log(imageRect,elem);
                        c.elementsUnderDrag.push(elem);
                    }
                }
            )

            //call the transformations
            if( c.elementsUnderDrag.length >= 2){
                elem1 = c.elementsUnderDrag[0].element;
                elem2 = c.elementsUnderDrag[1].element;
                console.log(elem1,elem2);

                //the first in a block
                if(elem1 == elem2){
                    //elem1 is above elem2
                    if(c.elementsUnderDrag[0].getTop() <= c.elementsUnderDrag[1].getTop()){
                        rectAbove = c.elementsUnderDrag[0]
                        elem1.addElement(target.id,rectAbove);
                    }
                    //elem2 is above elem1
                    else{

                    }
                }

                //elem1 is inside elem2
                else if(elem1.father == elem2){

                }

                //elem2 is inside elem1
                else if(elem1 == elem2.father){

                }

                //among elem1 and elem2
                else if(elem1.father == elem2.father){

                }

            }

            c.elementsUnderDrag.length = 0;
            
        },
        stop: function (event, ui) {
            console.log("stop dragging");
        },
        
    }
  );
}

})();



