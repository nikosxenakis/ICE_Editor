/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function test() {
    var father = null;
    var offset = 0;

    var programElement = new ProgramElement("program",offset,father);
    Canvas.addElement(programElement);
    Canvas.setActiveElement(programElement);
    var activeElement = Canvas.getActiveElement();

    activeElement.addElement("doNothing",offset);
    activeElement.addElement("while",offset);
    activeElement.addElement("while",offset+1);

    activeElement.elements[0].addElement("assign",offset);
    activeElement.elements[0].addElement("array",offset);
    activeElement.elements[1].addElement("assign",offset);

    $('#example').typeahead()  
}

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
    
    //test();

    dialogMenu = new DialogMenu();  
    doNothingDialogMenu = new DoNothingDialogMenu();  

    var parser = new Parser();
    parser.loadProgram(inputPrograms);
    //parser.saveProgram(Canvas.getActiveElement());

    var elem = Canvas.getElement('programName');
    Canvas.setActiveElement(elem);
    
    ImageHolder.getInstance();

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
