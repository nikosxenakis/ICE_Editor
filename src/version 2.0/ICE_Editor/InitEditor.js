/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function testExistingElement() {
    var opac = 1;
    var father = null;
    var offset = 0;

    c.programElement = new ProgramElement("programElement",offset,father,opac);
    c.programElement.addElement("doNothingImage",offset,opac);

    var tmp = new WhileElement("whileTmp",offset,father,opac);
    tmp.addElement("doNothingImage",offset,opac);

    var tmp2 = new WhileElement("whileTmp2",offset,father,opac);
    tmp2.addElement("doNothingImage",offset,opac);

    c.programElement.addExistingElement(tmp,offset);
    c.programElement.addExistingElement(tmp2,offset);
}

function test() {
    var opac = 1;
    var father = null;
    var offset = 0;

    c.programElement = new ProgramElement("programElement",offset,father,opac);
    c.programElement.addElement("doNothingImage",offset,opac);

    c.programElement.addElement("whileImage",offset,opac);
    c.programElement.addElement("ifImage",offset+1,opac);
    c.programElement.elements[1].addElement("forImage",offset,opac);
  
}

function InitEditor() {
    /*
    canvas.VPL_elementsInfo = sideBarSubCategories;
    InitMenuElements(canvas);
    CreateDialogs();
    InitDialogs();
    InitMenus();
    */
           
    cssModifications();
    
    test();

    //CreateOperatorsMenu(canvas.canvas);
    //CreateVarsMenu(canvas.canvas);
    //CreateRightClickMenu(canvas.canvas);    


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
