function InitEditor() {
      
    cssModifications();
    
    //create ElementType
    for (key in Elements)
        ElementType[key] = key;

    //initialize singleton classes
    Canvas.getInstance();
    DialogMenuController.getInstance();
    ImageHolder.getInstance();
    IdController.getInstance();
    
    initializeUndoManager();
    
    //parse
    parser = new Parser();
    parser.load(inputPrograms);
    parser.saveProgram(Canvas.getActiveElement());

    var elem = Canvas.getElement('programName2');
    Canvas.setActiveElement(elem);

}

function initializeUndoManager(){

    undoManager = new UndoManager();

    btnUndo = document.getElementById("btnUndo");
    btnRedo = document.getElementById("btnRedo");
    
    function updateUI() {
        btnUndo.disabled = !undoManager.hasUndo();
        btnRedo.disabled = !undoManager.hasRedo();
    }
    undoManager.setCallback(updateUI);
    
    btnUndo.onclick = function () {
        undoManager.undo();
        updateUI();
    };
    btnRedo.onclick = function () {
        undoManager.redo();
        updateUI();
    };
};

function cssModifications(){
     $('.draggable').css('z-index', 1001);   //to be in the front

    $('.hamburger').css('top', $('#wrapper')[0].offsetTop+10);

    $('#sideBarButton').css('z-index', 1);   //to be in the front

    $('#canvasContainer').css('top', $('#wrapper')[0].offsetTop);
    $('#canvasContainer').css('left', $('#wrapper')[0].offsetLeft);
    $('#canvasContainer').css('width', $('#wrapper').width());
    $('#canvasContainer').css('height', $('#wrapper').height());

    $('#recycleBin').css('top', $('#canvasContainer')[0].offsetTop+$('#canvasContainer').height() - 70);
    $('#recycleBin').css('left', $('#canvasContainer')[0].offsetLeft+$('#canvasContainer').width() - 70);

    $('#sidebar-wrapper').css('height', $('#wrapper').height());

    c = Canvas.getInstance($("#canvasContainer").width()-2,11892);

    
}

function rectangesCollision(r1,r2){
    return(!(
        r1.left           > r2.left+r2.width  ||
        r1.left+r1.width  < r2.left           ||
        r1.top           > r2.top+r2.height ||
        r1.top+r1.height < r2.top
    ));
}
