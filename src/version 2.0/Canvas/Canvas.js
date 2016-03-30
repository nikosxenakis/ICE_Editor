var Canvas = (function(){

    function Canvas(width, height) {

        //construction

        this.canvas = new fabric.Canvas('canvas', {
            height:height,
            width:width,
            backgroundColor:"white"
        });

        fabric.util.addListener(document.getElementById('canvasContainer'), 'scroll', function () {
            //console.log('scroll');
            //this.canvas.calcOffset();
        });

        //elements to check collision with dragged element
        this.verticalElements = new Array();
        this.horizontalElements = new Array();

        //bool if there is intersection with dragged element
        this.intersection = false;

        //elements in canvas under dragged element
        this.elementsUnderDrag = new Array();

        //tmp element in the canvas
        this.tmpElement = null;

        //main program element
        this.programElement = null;

        $("#canvas").droppable({
            accept: ".draggable",
            drag: function (event, ui) {
                //$(this).append($(ui.draggable).clone());
            },
            over: function( event, ui ) {
                //console.log(" over started canvas");
            },
            drop: function (event, ui) {
                //console.log("dropped on canvas");
            },
            //hoverClass:'drop-hover'
        });

        this.canvas.on('mouse:over', function(e) {
            console.log("mouse over");
            if(e.target && e.target.element){
                console.log("over "+e.target.element.id);

                if(e.target.element.deleteImage)
                    e.target.element.deleteImage.setDeleteImageVisibility(true);

                if(e.target.element.foldingItem)
                    e.target.element.foldingItem.setFoldingItemVisibillity(true);


                e.target.element.setOpacity(0.6);
            }

            this.renderAll();
        });
        
        this.canvas.on('mouse:out', function(e) {
            console.log("mouse out");

  
            if(e.target && e.target.element){
                console.log("out "+e.target.element.id);

                if(e.target.element.deleteImage)
                    e.target.element.deleteImage.setDeleteImageVisibility(false);

                if(e.target.element.foldingItem)
                    e.target.element.foldingItem.setFoldingItemVisibillity(false);

                e.target.element.setOpacity(1);

            }

            this.renderAll();
        });

        this.canvas.on('mouse:up', function(e) {

            console.log("mouse up");
            if(e.target && e.target.element){
                console.log("up "+e.target.element.id);

                e.target.element.setOpacity(1);
            }

            //check if it is near the clone
            //else remove the clone
            
            this.renderAll();
        });

        this.canvas.on('mouse:down', function(e) {
            
            console.log("mouse down");
            console.log(e.target);

            if(e.target && e.target.rectangle && e.target.rectangle.Element && e.target.rectangle.deleteIcon != e.target){
                if(e.target.element.father){
                    //remove element from father
                    
                    //add a grey element
                    //
                    //e.target.element.cloneElement();
                }
            }
            else{
                console.log("undefined mouse down");
            }

            this.renderAll();
            
        });

        this.canvas.on ({ 
            'object:moving': updateCoordinates
        }); 
    
    }

    var instance;
    
    return {
        getInstance: function(width, height){
            if (instance == null) {
                instance = new Canvas(width, height);
                // Hide the constructor so the returned objected can't be new'd...
                instance.constructor = null;
            }
            return instance;
        },

        changeSize: changeSize,
        setCanvasElementsCoords: setCanvasElementsCoords,

    };

    function updateCoordinates(e){
        
        dx = e.e.movementX;
        dy = e.e.movementY;

        rect = e.target;
        rectangle = rect.rectangle
        elem = rect.element;

        if( rectangle && elem ){
            elem.setOpacity(0.6);
            elem.moveElement(rectangle,dx,dy);

            setCanvasElementsCoords();
            //instance.canvas.renderAll();  
        }

        /*
        recycleBinRect = {
            left: $('#recycleBin')[0].offsetLeft,
            top: $('#recycleBin')[0].offsetTop,
            width: $('#recycleBin').width(),
            height: $('#recycleBin').height()
        };
        
        if(elem && rectangesCollision(elem.getElementSize(),recycleBinRect)){
            //elem.removeElement();
            //and remove the clone
        }
        else{
            //move all rectangles and subelements
            elem.setOpacity(0.6);
            elem.moveElement(rectangle,dx,dy);

            setCanvasElementsCoords();
            instance.canvas.renderAll();      
        }
        */
       
    } 

    function setCanvasElementsCoords(){

        for (k=0; k < instance.canvas._objects.length ; k++){
            instance.canvas._objects[k].setCoords();
        }
    }

    function changeSize(){
        c = this.getInstance();

        if(!changeSize.flag){
                   changeSize.flag=0;
        }

        if(changeSize.flag==0){
 
            c.canvas.setWidth( $( window ).width() - 222 );

            changeSize.flag = 1;
        }
        else{
            c.canvas.setWidth( $( window ).width() - 2 );

            changeSize.flag = 0;
        }

        c.canvas.renderAll();
    }

})();
    
      