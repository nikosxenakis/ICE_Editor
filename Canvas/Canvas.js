var Canvas = (function(){

    function Canvas() {

        //construction
        this.canvas = new fabric.Canvas('canvas', {
            backgroundColor:"white",
            renderOnAddRemove: false,
            stateful: false,
        });

        this.canvas.setWidth($('#canvasContainer').width());
        //this.canvas.setHeight($('#canvasContainer').height());
        this.canvas.setHeight(screen.height);

        this.canvas.setHeight(2048);

        $('#canvas').parent().css('overflow','scroll');
        
        
        fabric.util.addListener(document.getElementById('canvasContainer'), 'scroll', function () {
            this.canvas.calcOffset();
        });

        //elements to check collision with dragged element
        this.verticalElements = new Array();
        this.horizontalElements = new Array();

        //bool if there is intersection with dragged element
        this.intersection = false;

        //bool if the element can be added
        this.addElementFlag = false;

        //elements in canvas under dragged element
        this.elementsUnderDrag = new Array();

        //tmp element in the canvas
        this.tmpElement = null;

        //main program element
        this.activeElement = null;
        this.elements = new Array();

        //seeFunctions
        this.seeFunctions = false;

        this.addedElements = new Array();
        this.addedElementsPos = -1;

        this.movedElements = new Array();
        this.movedElementsPos = -1;

        this.removedElements = new Array();
        this.removedElementsPos = -1;

        this.canvas.on('mouse:over', function(e) {
            if(e.target && e.target.class)
                var ret = e.target.class.mouseOver(e.e);
            
            this.renderAll();

            return ret;
        });

        this.canvas.on('mouse:out', function(e) {
            
            if(e.target && e.target.class)
                var ret = e.target.class.mouseOut(e.e);

            this.renderAll();

            return ret;
        });

        this.canvas.on('mouse:up', function(e) {

            if(e.target && e.target.class)
                var ret = e.target.class.mouseUp(e.e);

            this.renderAll();

            return ret;
        });
        
        this.canvas.on('mouse:down', function(e) {

            if(e.target && e.target.class)
                var ret = e.target.class.mouseDown(e.e);

            this.renderAll();

            return ret;
        });

        this.canvas.on ({ 
            'object:moving': updateCoordinates
        });  

        this.canvas.on('text:changed', function(e) {
            if(e.target && e.target.class){
                var textInput = e.target.class;
                textInput.updateSideBar();
            }
        });
    }

    var instance;
    
    return {
        getInstance: function(){
            if (instance == null) {
                instance = new Canvas();
                instance.constructor = null;
            }
            return instance;
        },

        getActiveElement: getActiveElement,
        setActiveElement: setActiveElement,
        getElement: getElement,
        removeElement: removeElement,
        addElement: addElement,
        seeFunctions: seeFunctions,
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

    function removeElement(id){

        for(var k=0; k<instance.elements.length; k++){
            if(instance.elements[k].id == id){
                var element = instance.elements[k];

                if(element == getActiveElement()){
                    if(k>0){
                        setActiveElement(instance.elements[k-1]);
                    }
                    else{
                        setActiveElement(instance.elements[instance.elements.length - 1]);
                    }
                }

                instance.elements.splice(k,1);
                element.removeElement();
                
                return;
            }
        }
    };

    function getActiveElement(){
        return instance.activeElement;
    };

    function setActiveElement(element){

        for(var k=0; k<instance.elements.length; k++){
            if(instance.elements[k] == element){
                if(instance.activeElement){
                    instance.activeElement.setVisibility(false);
                }
                instance.activeElement = element;
                element.setVisibility(true);
                element.setOpacity(CanvasData.highOpacity);
                instance.canvas.renderAll();
                return;
            }
        }

        console.log("There is no such element in canvas");    
    };

    function seeFunctions(){
        if(instance.seeFunctions == true){
            instance.seeFunctions = false;
            $('.seeFunctions').css('color','lightcyan');
            disableSeeFunctions();
        }
        else{
            instance.seeFunctions = true;
            $('.seeFunctions').css('color','cyan');
            enableSeeFunctions();
        }
    };

    function enableSeeFunctions(){
        console.log('enableSeeFunctions');

        if(instance.activeElement){
            instance.activeElement.setVisibility(false);
        }

        instance.activeElement = null;

        var targetLeft = CanvasData.left;
        var targetTop = CanvasData.top;

        for(var k=0; k<instance.elements.length; k++){
            var element = instance.elements[k];
            if(element.type == ElementType.function){

                element.setVisibility(true);
                element.setOpacity(CanvasData.highOpacity);

                var size = element.getElementSize();
                var currTop = size.top;
                var curLeft = size.left;
                var height = size.height;


                var dx = targetLeft - curLeft;
                var dy = targetTop - currTop;
                element.moveElement(null,dx,dy);

                targetTop += height + 10;
            }
        }

        instance.canvas.renderAll();

    };

    function disableSeeFunctions(){
        console.log('disableSeeFunctions');

        var targetLeft = CanvasData.left;
        var targetTop = CanvasData.top;

        for(var k=0; k<instance.elements.length; k++){
            var element = instance.elements[k];
            if(element.type == ElementType.function){

                element.setVisibility(false);

                var size = element.getElementSize();
                var currTop = size.top;
                var curLeft = size.left;

                var dx = targetLeft - curLeft;
                var dy = targetTop - currTop;
                element.moveElement(null,dx,dy);

            }
        }

        setActiveElement(instance.elements[0]);

        instance.canvas.renderAll();
    };

    function addElement(element){
        instance.elements.push(element);
        element.setVisibility(false);
    };

    function updateCoordinates(e){
        
        var targetObject = e.target;
        var classObject = targetObject.class;
        
        if(!classObject)
            return;

        var elem = classObject.element;

        if( !elem || (elem && elem.type == ElementType.doNothing) )
            return;

        if( classObject instanceof Rectangle ){

            elem.moveElement(classObject); 
            checkCollisionDragNDrop(elem); 
        }
        else if(! (classObject instanceof Rectangle) ){

            var dx = e.e.movementX;
            var dy = e.e.movementY;    

            elem.moveElement(null,dx,dy); 
            checkCollisionDragNDrop(elem); 
        }

    }; 

    function checkCollisionDragNDrop(elem){

        var c =instance;

        if(!elem || !elem.dummyElementOriginalPosition){
            //console.error('error in checkCollisionDragNDrop');
            return;
        }
        
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
        c.addElementFlag = true;

        for(var k=0; k<instance.horizontalElements.length; k++ ){
            rect = instance.horizontalElements[k];
                           
           if( rect.visible == true && rectangesCollision( rect , dragElementRect ) ){   
                if(!elem.containsRectangle(rect)){

                    if(elem.dummyElementOriginalPosition.containsRectangle(rect)){
                        c.addElementFlag = false;
                        return;
                    }
                    if( elem.dummyElementCurrentPosition && elem.dummyElementCurrentPosition.containsRectangle(rect) ){
                        c.addElementFlag = false;
                        return;
                    }
                    
                    c.elementsUnderDrag.push(rect);
                }
            }
        }

        addElementToCanvas(elem.type);
        
        elem.dummyElementCurrentPosition = c.tmpElement;

            if(elem.dummyElementCurrentPosition){
                elem.dummyElementCurrentPosition.sendToBack();
            }
    };

    function rectangleCollisionWithHorizontialElements(rect){
        var c = this.getInstance();

        c.elementsUnderDrag.length = 0;
        c.addElementFlag = true;

        for(var k=0; k<c.horizontalElements.length; k++ ){
            var elem = c.horizontalElements[k];

            if(elem.element.type == ElementType.doNothing && elem.rectangle.visibility == true){
                //console.log(elem);
            }
            
            if( elem.rectangle.visibility == true && rectangesCollision( elem , rect ) ){
                //if with tmp exit
                if(elem.element == c.tmpElement){
                    c.addElementFlag = false;
                    return;
                }
                c.elementsUnderDrag.push(elem);
            }
        }
        //console.log(c.elementsUnderDrag.length);
    };

    function setCanvasElementsCoords(){
        for (k=0; k < instance.canvas._objects.length ; k++){
            instance.canvas._objects[k].setCoords();
        }
    };

    function addElementToCanvas(elementId){

        var c =instance;

        if(c.addElementFlag == false)
            return;

        if( c.elementsUnderDrag.length >= 2){

            var elem1 = c.elementsUnderDrag[0].element;
            var elem2 = c.elementsUnderDrag[1].element;
            if(elem1==elem2 && c.elementsUnderDrag.length>2){
                for (var k=2; k<c.elementsUnderDrag.length; k++) {
                    if(c.elementsUnderDrag[k].element != elem1){
                        elem2 = c.elementsUnderDrag[k].element;
                        break; 
                    }
                };
            }

            if(c.intersection==false){ 
                addElementToCanvasBetween(elementId,elem1,elem2);
            }
            else{
                if(c.tmpElement && (elem1!=c.tmpElement.father || elem2!=c.tmpElement.father)){
                    c.tmpElement.removeElement();
                    addElementToCanvasBetween(elementId,elem1,elem2);
                }
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

    function addElementToCanvasBetween(elementId,elem1,elem2){

        var c =instance;
        c.intersection = true;

        //the first in a block
        if(elem1 == elem2){
            console.log("Error: it can't be the first in the block"); 
            c.intersection = false;
            c.elementsUnderDrag.length = 0;
            c.tmpElement = null;
        }
        //elem1 is inside elem2 or opposite
        else if( (elem1.father && elem1.father == elem2) || (elem2.father && elem1 == elem2.father) ){
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
            c.tmpElement.openEditMenu();
            
            c.addedElements.push(c.tmpElement);
            c.addedElementsPos++;
        
            undoManager.add({
                undo: function() {
                    if(c.addedElementsPos < 0)
                        return;

                    var elem = c.addedElements[c.addedElementsPos];
                    if(elem){
                        var father = elem.father;
                        console.log('undo remove elem: ',elem,father);
                        elem.removeElement();
                        c.addedElementsPos--;
                    }
                },
                redo: function() {
                    var elem = c.addedElements[c.addedElementsPos + 1];
                    if(elem){
                        c.addedElementsPos++;
                        var father = elem.father;
                        var offset = elem.elementOffset;
                        console.log('redo add elem: ',elem,father,offset);
                        father.addExistingElement(elem,offset);
                    }
                }
            });
            
        }
    };
})();
    
      