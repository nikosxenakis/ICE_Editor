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
            var offsetWindowXPos = parseInt( ui.offset.left );
            var offsetWindowYPos = parseInt( ui.offset.top );
            console.log( "Offset Window: (" + offsetWindowXPos + ", " + offsetWindowYPos + ")");

            //create the elements
            c=Canvas.getInstance();
            console.log(c.canvas._offset.left , c.canvas._offset.top);

            //mouse in canvas
            if( rectangleColision( c.canvas._offset.left , c.canvas._offset.top , c.canvas.width , c.canvas.height , event.clientX , event.clientY , 10 , 10 ) ){
                _.each(
                    c.horizontalElements, 
                        function(elem) {
                            image = ui.helper[0];
                            x1=image.offsetLeft;//x1=image.x;
                            y1=image.offsetTop//y1=image.y;
                            w1=image.width;
                            h1=image.height;
                            x2=elem.left;
                            y2=elem.top;
                            w2=elem.width;
                            h2=elem.height;

                            if( rectangleColision( x1 , y1 , w1 , h1 , x2 , y2 , w2 , h2 ) ){
                                //c.canvas.elementsUnderDragElement.push(elem);
                                if(elem.id!="groupProgram")
                                    console.log("collision");
                            }
                        }
                )
            }

        },
        stop: function (event, ui) {
            console.log("stop dragging");
        },
        
    }
  );
}

})();



