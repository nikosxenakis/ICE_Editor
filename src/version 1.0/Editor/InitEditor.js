/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function InitEditor() {

    //$('#viewport').css('height', window.innerHeight - 3);
    //$('#viewport').css('height', CanvasData[0].height);
    //$('#viewport').css('width', CanvasData[0].width);

    //var canvas = new Canvas(CanvasData[0].width, CanvasData[0].height);
    var canvas = new Canvas(850, window.innerHeight - 3);

    addCanvasElements(canvas);


    //var canvas = CreateNewProgram();
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

    //var canvas = new Canvas(850, window.innerHeight - 3);

    //CreateOperatorsMenu(canvas.canvas);
    //CreateVarsMenu(canvas.canvas);
    //CreateRightClickMenu(canvas.canvas);
    //CreateFileExplorer(canvas.canvas);
    return canvas.canvas;
}

