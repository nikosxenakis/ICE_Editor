var Canvas = (function(){

    function Canvas(width, height) {

        //construction

        this.canvas = new fabric.Canvas('canvas', {
            //hoverCursor: 'pointer',
            height:height,
            width:width,
            backgroundColor:"white"
        });

        //this.canvas.setWidth(1192);
        this.canvas.setHeight(11892);

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
                        return;

            console.log("mouse over");
            if(e.target.element){
                console.log("over "+e.target.element.id);

                e.target.element.setOpacity(0.6);
            }

            this.renderAll();
        });
        
        this.canvas.on('mouse:out', function(e) {
                        return;

            console.log("mouse out");
            if(e.target.element){
                console.log("out "+e.target.element.id);

                e.target.element.setOpacity(1);
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

        addInitialElements: addInitialElements,
        changeSize: changeSize,
        setCanvasElementsCoords: setCanvasElementsCoords,

    };

    function updateCoordinates(e){
        
        //console.log("dx = ",e.e.movementX," , dy = ",e.e.movementY);
        dx = e.e.movementX;
        dy = e.e.movementY;

        rect = e.target;
        rectangle = rect.rectangle
        elem = rect.element;
        //move all rectangles and subelements

        elem.moveElement(rectangle,dx,dy);
        //moveElement(elem,rectangle,dx,dy);

        setCanvasElementsCoords();
        instance.canvas.renderAll();  
 
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

    function addInitialElements() {
        
        //initial elements    
        HorizontialElements.forEach(function(entry) {
            var elem = new fabric.Rect({
                left: entry.left,
                top: entry.top,
                fill: entry.fill,
                width: entry.width,
                height: entry.height,
                selectable: entry.selectable,
                id: entry.id,
                hasControls: entry.hasControls,
                hasBorders: entry.hasBorders
            });
            instance.horizontalElements.push(elem);
            instance.canvas.add(elem);
        });

        VerticalElements.forEach(function(entry) {
            var elem = new fabric.Rect({
                left: entry.left,
                top: entry.top,
                fill: entry.fill,
                width: entry.width,
                height: entry.height,
                selectable: entry.selectable,
                id: entry.id,
                hasControls: entry.hasControls,
                hasBorders: entry.hasBorders
            });
            instance.verticalElements.push(elem);
            instance.canvas.add(elem);
        });

        TextElements.forEach(function(entry) {
            var elem = new fabric.IText(entry.id,{
                left: entry.left,
                top: entry.top,
                fill: entry.fill,
                fontSize: entry.fontSize,
                fontWeight: entry.fontWeight,
                fontFamily: entry.fontFamily,
                selectable: entry.selectable,
                id: entry.id,
                textAlign:"center",
                hasControls: entry.hasControls,
                hasBorders: entry.hasBorders
            });
            
            //r = _.find(instance.horizontalElements, function(obj) { return obj.id == 'EndProgramElement' })

            //console.log(canvas.horizontalElements);


            
        });

}

})();
    
      