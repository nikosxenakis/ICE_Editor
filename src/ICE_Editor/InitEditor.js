/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function InitEditor() {
    /*
    canvas.VPL_elementsInfo = sideBarSubCategories;
    InitMenuElements(canvas);
    CreateDialogs();
    InitDialogs();
    InitMenus();
    CreateOperatorsMenu(canvas.canvas);
    CreateVarsMenu(canvas.canvas);
    CreateRightClickMenu(canvas.canvas);    
    */
           
    cssModifications();
    
    //create ElementType
    for (key in Elements)
        ElementType[key] = key;


    Canvas.getInstance();
    DialogMenuController.getInstance();
    ImageHolder.getInstance();

    var parser = new Parser();
    parser.loadProgram(inputPrograms);
    //parser.saveProgram(Canvas.getActiveElement());

    var elem = Canvas.getElement('programName2');
    Canvas.setActiveElement(elem);
}


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
