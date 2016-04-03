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


                if(!element.father){
                    //if there is a current dummy

                    if(element.dummyElementCurrentPosition){

                        var offset = element.dummyElementCurrentPosition.getElemetOffset();
                        element.dummyElementCurrentPosition.father.addExistingElement(element,offset);
                        element.dummyElementCurrentPosition.removeElement();
                        element.dummyElementCurrentPosition = null;

                        if(element.dummyElementOriginalPosition){
                            element.dummyElementOriginalPosition.removeElement();
                            element.dummyElementOriginalPosition = null;
                        }

                    }
                    else{
                        if(element.dummyElementOriginalPosition){
                            var offset = element.dummyElementOriginalPosition.getElemetOffset();
                            element.dummyElementOriginalPosition.father.addExistingElement(element,offset);
                            element.dummyElementOriginalPosition.removeElement();
                            element.dummyElementOriginalPosition = null;
                        }
                    }
                    
                    c.intersection = false;
                    c.tmpElement = null;
                    c.elementsUnderDrag.length = 0;

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
                    var offset = element.getElemetOffset();
                    var opac = 1;
                    element.father.reverseTransformElement(element);
                    element.removeElementFromFather();
                    element.father = null;

                    //add the dummy gray element in this
                    
                    element.dummyElementOriginalPosition = father.addElement(type+"Image",offset,opac);
                    element.dummyElementOriginalPosition.addElement("greyImage",0,opac);
                    
                    //fold the real element    
                    element.foldElement(element);
                    
                }
                            
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
        rectangleCollisionWithHorizontialElements: rectangleCollisionWithHorizontialElements,
        addElementToCanvas: addElementToCanvas
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
        }
        
        //checkCollisionWithRecycleBin(elem);

        checkCollisionDragNDrop(elem); 
    }; 

    function checkCollisionDragNDrop(elem){
        //var c = this.getInstance();
        //console.log(c);
        var c =instance;

        if(!elem)
            return;

        //define drag elem dimensions
        var dragElementRect = {
            left: elem.getElementSize().left,
            top: elem.getElementSize().top,
            width: elem.getElementSize().width,
            height: elem.getRectangle(RectangleOffset.firstHorizontial).getHeight() + elem.getRectangle(RectangleOffset.secondHorizontial).getHeight()
        };

        //get the collisioned rects
        c.elementsUnderDrag.length = 0;

        _.each(
            instance.horizontalElements, 
            function(rect) {    
                if( !elem.containsRectangle(rect) && !elem.dummyElementOriginalPosition.containsRectangle(rect) && rectangesCollision( rect , dragElementRect ) ){
                    c.elementsUnderDrag.push(rect);
                }
            }
        )

        //elementsUnderDrag ready
        // c.intersection = false;
        // c.tmpElement = null;
        //c.elementsUnderDrag.length = 0;

        if(elem && elem.dummyElementOriginalPosition && elem.dummyElementOriginalPosition.father){
            addElementToCanvas(elem.type+"Image");
            elem.dummyElementCurrentPosition = c.tmpElement;
        }
        /*
        if(elem && elem.dummyElementCurrentPosition && elem.dummyElementCurrentPosition.father){
            elem.dummyElementCurrentPosition.removeElement();
            elem.dummyElementCurrentPosition = null;
            c.tmpElement = null;
        }
        */

        /*
            if(arr.length!=0){
                console.log(arr);
            }

            //if collision add dummyElementCurrentPosition with rect
            if(arr.length==2){
                if(elem && elem.dummyElementOriginalPosition && elem.dummyElementOriginalPosition.father){
                    var offset = 0;
                    var dummyElementCurrentPosition = elem.dummyElementOriginalPosition.father.addElement(elem.type+"Image",offset,0.6);
                    elem.dummyElementCurrentPosition = dummyElementCurrentPosition;
                }
            }
            //if not collision add dummyElementCurrentPosition with rect
            else{
                if(elem && elem.dummyElementCurrentPosition && elem.dummyElementCurrentPosition.father){
                    var offset = 0;
                    elem.dummyElementCurrentPosition.removeElement();
                    elem.dummyElementCurrentPosition = null;
                }  
            }

        */

    };

    function rectangleCollisionWithHorizontialElements(rect){
        var c = this.getInstance();
     
        _.each(
            instance.horizontalElements, 
            function(elem) {    
                if( rectangesCollision( elem , rect ) ){
                    c.elementsUnderDrag.push(elem);
                }
            }
        )
    };
        
    function checkCollisionWithRecycleBin(element){
        var recycleBinRect = {
            left: $('#recycleBin')[0].offsetLeft,
            top: $('#recycleBin')[0].offsetTop,
            width: $('#recycleBin').width(),
            height: $('#recycleBin').height()
        }
        
        if(element && rectangesCollision(element.getElementSize(),recycleBinRect)){
            //element.removeElement();
        }
    };

    function setCanvasElementsCoords(){
        for (k=0; k < instance.canvas._objects.length ; k++){
            instance.canvas._objects[k].setCoords();
        }
    };

    function changeSize(){
        var c = this.getInstance();

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
    };

    function addElementToCanvas(imageRectId){
        //var c = this.getInstance();
        var c =instance;

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
                        c.tmpElement = father.addElement(imageRectId,0,0.6);
                    }
                    else{
                        c.tmpElement = father.addElement(imageRectId,father.elements.length,0.6);
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
                    c.tmpElement = father.addElement(imageRectId,offset,0.6);

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
                
                if(c.tmpElement)
                    c.tmpElement.removeElement();
                
                c.intersection = false;
                c.tmpElement = null;
            }

            c.elementsUnderDrag.length = 0;
            
    };

})();
    
      