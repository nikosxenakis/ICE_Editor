var Canvas = (function(){

    function Canvas(width, height) {

        //construction

        this.canvas = new fabric.Canvas('canvas', {
            //hoverCursor: 'pointer',
            height:height,
            width:width,
            backgroundColor:"white"
        });

         //elements
        this.verticalElements = new Array();
        this.horizontalElements = new Array();

        //add list of function elements
        
        this.elementsUnderDrag = new Array();
        //this.makeIntersection = false;

        //this.point = new Array(); // the point (x, y) of canvas  that elements will be added

        $("#canvas").droppable({
            accept: ".draggable",
            drag: function (event, ui) {
                //$(this).append($(ui.draggable).clone());
            },
            over: function( event, ui ) {
                console.log(" over started canvas");
            },
            drop: function (event, ui) {
                console.log("dropped on canvas");

                //canvas = $(this);
                //canvas.dragElement = $(ui.draggable).clone();

                //$(this).append($(ui.draggable).clone());
            },
            hoverClass:'drop-hover'
        });

        this.canvas.on('mouse:over', function(e) {
            console.log("over");
            e.target.setOpacity(0.6);
            this.renderAll();
        });
        
        this.canvas.on('mouse:out', function(e) {
            console.log("out");
            e.target.setOpacity(1);
            this.renderAll();
        });



        this.canvas.on ({ 
            'object:moving': updateCoordinatesForSubObjects 
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
        changeSize: changeSize
    };

    function updateCoordinates(elem){
            elem.left = elem.getLeft();
            elem.top = elem.getTop();   
           
    } 

    function updateCoordinatesForSubObjects(e){
        updateCoordinates(e.target);

    }

    function changeSize(){
        c = this.getInstance();

        diff = c.canvas.width - $("#wrapper").width();
        if( diff>=-10 && diff<=10 ){
            //it's maximized
            c.canvas._offset.left += 220;
            c.canvas.width -= 220;
        }
        else{
            //it's minimized
            c.canvas._offset.left = $('#wrapper').left;
            c.canvas.width = $('#wrapper').width()-2;

        }
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