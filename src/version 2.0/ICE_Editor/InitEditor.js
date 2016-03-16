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
    */
       

    cssModifications();
    
    c = Canvas.getInstance($("#canvasContainer").width()-2,$("#canvasContainer").height()-2);

    //Canvas.addInitialElements();

    //test
    c.programElement = new Element("programElement" , ElementFormat.C , ElementType.program , {left:CanvasData[0].left,top:CanvasData[0].top} , null);
    
    pos = {
        left : c.programElement.getRectangle(RectangleType.vertical,0).getLeft()+c.programElement.getRectangle(RectangleType.vertical,0).width,
        top : c.programElement.getRectangle(RectangleType.vertical,0).getTop()
    };

    c.programElement.addElement("doNothingImage",pos,1);

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

    $('#sidebar-wrapper').css('height', $('#wrapper').height());

    //console.log($("#container").width(),$("#container").height());
    //console.log($("#wrapper").width(),$("#wrapper").height());
    //console.log($("#canvasContainer").width(),$("#canvasContainer").height());

}

function rectangesCollision(r1,r2){
    return(!(
        r1.left           > r2.left+r2.width  ||
        r1.left+r1.width  < r2.left           ||
        r1.top           > r2.top+r2.height ||
        r1.top+r1.height < r2.top
    ));
}
