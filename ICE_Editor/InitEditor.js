function InitEditor() {
         
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

    addSideBarEventListenners();

    var elem = Canvas.getElement('programName2');
    Canvas.setActiveElement(elem);
}

function initializeUndoManager(){

    undoManager = new UndoManager();

    btnUndo = document.getElementsByClassName("btnUndo")[0];
    btnRedo = document.getElementsByClassName("btnRedo")[0];
    
    function updateUI() {
        btnUndo.disabled = !undoManager.hasUndo();
        btnRedo.disabled = !undoManager.hasRedo();

        if(!undoManager.hasRedo()){
            $('.btnRedo').css('color', 'grey');
        }
        else{
            $('.btnRedo').css('color', '#34495e');
        }

        if(!undoManager.hasUndo()){
            $('.btnUndo').css('color', 'grey');
        }
        else{
            $('.btnUndo').css('color', '#34495e');
        }

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

    $('.btnUndo').mouseover(function(){
        $(this).css('cursor', 'pointer');
    });

    $('.btnRedo').mouseover(function(){
        $(this).css('cursor', 'pointer');
    });

    updateUI();
};

function rectangesCollision(r1,r2){
    return(!(
        r1.left           > r2.left+r2.width  ||
        r1.left+r1.width  < r2.left           ||
        r1.top           > r2.top+r2.height ||
        r1.top+r1.height < r2.top
    ));
};

var addSideBarEventListenners = function(){

    var addFunctionMouseDown = function(){
        var id = 'newF';
        var element = new FunctionElement(id);

        parser.addTopElement(element , null , id , '#functionList');

        var father = $(this).parent();

        var elem = $(this);
        var elem2 = $(father).find('.seeFunctions');

        $(elem).remove();
        $(elem2).remove();

        elem.appendTo(father);
        elem2.appendTo(father);

        elem2.mousedown(seeFunctionsMouseDown);
        elem.mousedown(addFunctionMouseDown);

        return false;
    };

	$('.addFunction').mousedown(addFunctionMouseDown);

    var addProgramMouseDown = function(){
        var id = 'newProgram';
        var element = new ProgramElement(id);

        parser.addTopElement(element , null , id , '#programList');
        
        var father = $(this).parent();

        var elem = $(this);

        $(elem).remove();

        elem.appendTo(father);
        
        elem.mousedown(addProgramMouseDown);

        return false;
    };

	$('.addProgram').mousedown(addProgramMouseDown);

    $('.addFunction').mouseover(function(){
        $(this).css('color','lightgreen');
    });

    $('.addFunction').mouseout(function(){
        $(this).css('color','mediumseagreen');
    });  

    $('.addProgram').mouseover(function(){
        $(this).css('color','lightgreen');
    });

    $('.addProgram').mouseout(function(){
        $(this).css('color','mediumseagreen');
    });  

    var seeFunctionsMouseDown = function(){
        
        var father = $(this).parent();

        var elem = $(father).find('.addFunction');
        var elem2 = $(this); 

        $(elem).remove();
        $(elem2).remove();

        elem.appendTo(father);
        elem2.appendTo(father);
        
        elem2.mousedown(seeFunctionsMouseDown);
        elem.mousedown(addFunctionMouseDown);

        Canvas.seeFunctions();

        return false;
    };

	$('.seeFunctions').mousedown(seeFunctionsMouseDown);



    $('.seeFunctions').mouseover(function(){
        $(this).css('color','cyan');
    });

    $('.seeFunctions').mouseout(function(){
        $(this).css('color','lightcyan');
    });
};