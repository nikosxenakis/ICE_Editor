/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function InitEditor() {

    var canvas = CreateNewProgram();
    /*
    canvas.VPL_elementsInfo = sideBarSubCategories;
    InitMenuElements(canvas);
    CreateDialogs();
    InitDialogs();
    InitMenus();
    */
       
    mySingletonSideBar.getInstance(sideBarCategories, sideBarSubCategories, canvas);

}


function CreateNewProgram() {

    //$('#viewport').css('height', window.innerHeight - 3);
    //$('#viewport').css('height', CanvasData[0].height);
    //$('#viewport').css('width', CanvasData[0].width);
    //var canvas = new Canvas(CanvasData[0].width, CanvasData[0].height);
    //
    
    //$("#canvasContainer").height($("#mainContent").height());
    //1190 
    //$("#canvasContainer").height(1190);
    $("#canvasContainer").height($("#mainContent").height());

    var canvas = new Canvas($("#canvasContainer").width()-2,$("#canvasContainer").height()-2);
    addCanvasElements(canvas);

    //CreateOperatorsMenu(canvas.canvas);
    //CreateVarsMenu(canvas.canvas);
    //CreateRightClickMenu(canvas.canvas);
    //CreateFileExplorer(canvas.canvas);
    return canvas;
}

