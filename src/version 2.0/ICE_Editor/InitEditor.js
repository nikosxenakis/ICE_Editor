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
    
    Canvas.getInstance($("#canvasContainer").width()-2,$("#canvasContainer").height()-2);

    Canvas.addInitialElements();

    ImageHolder.getInstance();
    
    //CreateOperatorsMenu(canvas.canvas);
    //CreateVarsMenu(canvas.canvas);
    //CreateRightClickMenu(canvas.canvas);
    //CreateFileExplorer(canvas.canvas);
    
    //test
    var element1 = new Element("element1" , ElementFormat.C , ElementType.while , null);

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


function rectangleColision( x1 , y1 , w1 , h1 , x2 , y2 , w2 , h2 ){
    if (
        x1 < x2 + w2 &&
        x1 + w1 > x2 &&
        y1 < y2 + h2 &&
        h1 + y1> y2) {
        return true;
    }
    return false;
}
