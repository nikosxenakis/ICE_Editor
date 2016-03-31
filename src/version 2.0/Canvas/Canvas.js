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

            if(e.target && e.target.element){
                console.log("mouse over "+e.target.element.id);

                if(e.target.element.deleteImage)
                    e.target.element.deleteImage.setDeleteImageVisibility(true);

                if(e.target.element.foldingItem)
                    e.target.element.foldingItem.setFoldingItemVisibillity(true);


                e.target.element.setOpacity(0.6);
            }

            this.renderAll();
        });
        
        this.canvas.on('mouse:out', function(e) {
  
            if(e.target && e.target.element){
                console.log("mouse out "+e.target.element.id);

                if(e.target.element.deleteImage)
                    e.target.element.deleteImage.setDeleteImageVisibility(false);

                if(e.target.element.foldingItem)
                    e.target.element.foldingItem.setFoldingItemVisibillity(false);

                e.target.element.setOpacity(1);

            }

            this.renderAll();
        });

        this.canvas.on('mouse:up', function(e) {

            if(e.target && e.target.element){
                console.log("mouse up "+e.target.element.id);
                var element = e.target.element;

                element.setOpacity(1);

                //if it is mouse up to the void then recover the element
                if(!element.father && element.dummyElementOriginalPosition){
                    var offset = 1;
                    element.dummyElementOriginalPosition.father.addExistingElement(element,offset);
                    element.dummyElementOriginalPosition.removeElement();
                    element.dummyElementOriginalPosition = null;

                }

            }

            
            
            this.renderAll();
        });

        this.canvas.on('mouse:down', function(e) {
            
            console.log("mouse down");

            if(e.target && e.target.rectangle && e.target.element && e.target.rectangle.deleteIcon != e.target){
                var element = e.target.element;

                if(element.father){

                    //removes element from father
                    var father = element.father;
                    var type = element.type;

                    element.father.reverseTransformElement(element);
                    element.removeElementFromFather();
                    element.father = null;

                    //add gray in this
                    var offset = 1;
                    var dummyElementOriginalPosition = father.addElement(type+"Image",offset,0.6);

                    //fold the real element    
                    element.foldElement(element);

                    //add the dummy element
                    element.dummyElementOriginalPosition = dummyElementOriginalPosition;
                    
                }
                            
                this.renderAll();

            }

            
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
        
        var dx = e.e.movementX;
        var dy = e.e.movementY;

        var rect = e.target;
        var rectangle = rect.rectangle
        var elem = rect.element;

        if( rectangle && elem ){
            elem.setOpacity(0.6);
            elem.moveElement(rectangle,dx,dy);

            setCanvasElementsCoords();
            //instance.canvas.renderAll();  
        }
        
        //checkCollisionWithRecycleBin(elem);

//HERE
        //if collision add dummyElementCurrentPosition with rect
        if(elem && elem.dummyElementOriginalPosition.father){
            var offset = 0;
            var dummyElementCurrentPosition = elem.dummyElementOriginalPosition.father.addElement(elem.type+"Image",offset,0.6);
            elem.dummyElementCurrentPosition = dummyElementCurrentPosition;
        }
        //if not collision add dummyElementCurrentPosition with rect
        if(elem && elem.dummyElementCurrentPosition.father){
            var offset = 0;
            elem.dummyElementCurrentPosition.removeElement();
            elem.dummyElementCurrentPosition = null;
        }   
       
    } 
    function checkCollisionWithRecycleBin(element){
         recycleBinRect = {
            left: $('#recycleBin')[0].offsetLeft,
            top: $('#recycleBin')[0].offsetTop,
            width: $('#recycleBin').width(),
            height: $('#recycleBin').height()
        };
        
        if(element && rectangesCollision(element.getElementSize(),recycleBinRect)){
            //element.removeElement();
            //and remove the clone
        }
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
    
      