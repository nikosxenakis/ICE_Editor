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
        this.activeElement = null;
        this.elements = new Array();

        this.canvas.on('mouse:over', function(e) {

            if(e.target && e.target.class)
                e.target.class.mouseOver();

            this.renderAll();
        });

        this.canvas.on('mouse:out', function(e) {
            
            if(e.target && e.target.class)
                e.target.class.mouseOut();

            this.renderAll();
        });

        this.canvas.on('mouse:up', function(e) {

            if(e.target && e.target.class)
                e.target.class.mouseUp();

            this.renderAll();

        });

        this.canvas.on('mouse:down', function(e) {

            if(e.target && e.target.class)
                e.target.class.mouseDown();

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
        getActiveElement: getActiveElement,
        setActiveElement: setActiveElement,
        getElement: getElement,
        addElement: addElement,
        setCanvasElementsCoords: setCanvasElementsCoords,
        rectangleCollisionWithHorizontialElements: rectangleCollisionWithHorizontialElements,
        addElementToCanvas: addElementToCanvas
    };

    function getElement(id){
        for(var k=0; k<instance.elements.length; k++){
            if(instance.elements[k].id == id)
                return instance.elements[k];
        }
    };

    function getActiveElement(){
        return instance.activeElement;
    };

    function setActiveElement(element){

        for(var k=0; k<instance.elements.length; k++){
            if(instance.elements[k] == element){
                if(instance.activeElement)
                    instance.activeElement.setElementVisibillity(false);
                instance.activeElement = element;
                element.setElementVisibillity(true);
                instance.canvas.renderAll();
                return;
            }
        }

        console.log("There is no such element in canvas");
        
    };

    function addElement(element){
        instance.elements.push(element);
        element.setElementVisibillity(false);
    };

    function updateCoordinates(e){

        var dx = e.e.movementX;
        var dy = e.e.movementY;

        var rect = e.target;
        var rectangle = rect.rectangle
        var elem = rect.element;

        if(! (rectangle instanceof Rectangle) ){
            rectangle = rect.class.rectangle;
            elem = rect.class.element;
        }

        if( rectangle && elem && elem.type != ElementType.doNothing){
            elem.moveElement(rectangle,dx,dy); 
            //checkCollisionWithRecycleBin(elem);
            checkCollisionDragNDrop(elem); 
        }
    }; 

    function checkCollisionDragNDrop(elem){

        var c =instance;

        //if(!elem || elem.type == ElementType.program)
        if(!elem || !elem.dummyElementOriginalPosition)
            return;

        //define drag elem dimensions
        if(elem.format == ElementFormat.I){
            var dragElementRectHeight = CanvasData.horizontalElementsHeight;
        }
        else{
            var dragElementRectHeight = 2*CanvasData.horizontalElementsHeight;
        }

        var size = elem.getElementSize();

        var dragElementRect = {
            left: size.left,
            top: size.top,
            width: size.width,
            height: dragElementRectHeight
        };

        //get the collisioned rects
        c.elementsUnderDrag.length = 0;

        _.each(
            instance.horizontalElements, 
            function(rect) { 

                if( rectangesCollision( rect , dragElementRect ) ){   
                    if( !elem.containsRectangle(rect) && !elem.dummyElementOriginalPosition.containsRectangle(rect) ){
                        if( elem.dummyElementCurrentPosition && elem.dummyElementCurrentPosition.containsRectangle(rect) ){
                            return;
                        }

                        c.elementsUnderDrag.push(rect);
                    }
                }
            }
        )

        //elementsUnderDrag ready
        // c.intersection = false;
        // c.tmpElement = null;
        //c.elementsUnderDrag.length = 0;

        if(elem && elem.dummyElementOriginalPosition && elem.dummyElementOriginalPosition.father){
            addElementToCanvas(elem.type);
            elem.dummyElementCurrentPosition = c.tmpElement;
            if(elem.dummyElementCurrentPosition)
                elem.dummyElementCurrentPosition.sendToBack();
        }

    };

    function rectangleCollisionWithHorizontialElements(rect){
        var c = this.getInstance();
     
        _.each(
            instance.horizontalElements, 
            function(elem) {    
                if( !elem.element.containsRectangle(rect) && rectangesCollision( elem , rect ) ){
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

    function addElementToCanvas(elementId){

        var c =instance;
        console.log(c.elementsUnderDrag.length);
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
                else if( (elem1.father && elem1.father == elem2) || (elem2.father && elem1 == elem2.father) ){
                //else if( ( elem1.father == elem2) || ( elem1 == elem2.father) ){
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
                        c.tmpElement = father.addElement(elementId,0);
                    }
                    else{
                        c.tmpElement = father.addElement(elementId,father.elements.length);
                    } 
                }
                else if( elem1.father && elem2.father && elem1.father == elem2.father ){
                //else if( elem1.father == elem2.father ){
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
                    c.tmpElement = father.addElement(elementId,offset);

                }
                else{
                    console.log("Error no such case");
                    c.intersection = false;
                    c.elementsUnderDrag.length = 0;
                    c.tmpElement = null;
                }

                if(c.tmpElement){
                    c.tmpElement.setOpacity(CanvasData.lowOpacity);
                }
            }
            //no intersection
            else if(c.elementsUnderDrag.length < 1 && c.intersection==true){
                
                if(c.tmpElement)
                    c.tmpElement.removeElement();
                
                c.intersection = false;
                c.tmpElement = null;
            }

            c.elementsUnderDrag.length = 0;      
    };

})();
    
      