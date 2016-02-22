/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function InitEditor() {

    var sideBarCategories = [{name: "Elements", href: "#subCategories"}];
    var sideBarSubCategories = [{subCategoryId: "subCategories", ulId: "subCategories1",
            subCategoriesItems: [{name: "Loop", href: "#condition"},
            {name: "Statement", href: "#statement"}],
            tools: [
                {   id: "condition",
                    images: [
                        {id: "While", src: "images/while.png", startElementWords : ["while", "repeat"], endElementWords : ["end while"], color:'#FF9999', endElementWidth: 215 ,startElementWidth: 405, functionCallNameFromSideBar: "AddFromSideBarElement", translateLength: 135, functionCallNameFromDoNothing: "AddFlowControlElement", translateLengthFromSideBar: 188, insideElementOffset:25, functionToCreateElement: "IFWhileElement"},
                        {id: "DoWhile", src: "images/dowhile.png", startElementWords : ["while", ""], endElementWords : ["do"], color:'#FF9966', endElementWidth: 170 , startElementWidth: 305, functionCallNameFromSideBar: "AddFromSideBarElement", translateLength: 135, functionCallNameFromDoNothing: "AddFlowControlElement", translateLengthFromSideBar: 188, insideElementOffset:15, functionToCreateElement: "DoWhileElement"},
                        {id: "WaitUntil", src: "images/waituntil.png", startElementWords : ["wait until", ""], color:'#FFCC00', startElementWidth: 345, functionCallNameFromSideBar: "AddFromSideBarElement", translateLength: 29, functionCallNameFromDoNothing: "AddFlowControlElement", translateLengthFromSideBar: 82, insideElementOffset:15, functionToCreateElement: "WaitUntilElement"},
                        {id: "forever", src: "images/forever.png", startElementWords : ["forever"], endElementWords : ["end forever"], color:'#FF9999', endElementWidth: 215 ,startElementWidth: 220, functionCallNameFromSideBar: "AddFromSideBarElement", translateLength: 106, functionCallNameFromDoNothing: "AddFlowControlElement", translateLengthFromSideBar: 159, insideElementOffset:25, functionToCreateElement: "FlowControlElementsCreator", functionToCreateCondition:null},
                        {id: "repeat", src: "images/repeat.png", startElementWords : ["repeat"], endElementWords : ["end repeat"], color:'#FF9999', endElementWidth: 215 ,startElementWidth: 170, functionCallNameFromSideBar: "AddFromSideBarElement", translateLength: 106, functionCallNameFromDoNothing: "AddFlowControlElement", translateLengthFromSideBar: 159, insideElementOffset:25, functionToCreateElement: "FlowControlElementsCreator", functionToCreateCondition:"CreateRepeatElementCondition"},
                        {id: "for", src: "images/for.png", startElementWords : ["for", "do"], endElementWords : ["end for"], color:'#6699FF', endElementWidth: 215 ,startElementWidth: 240, functionCallNameFromSideBar: "AddFromSideBarElement", translateLength: 106, functionCallNameFromDoNothing: "AddFlowControlElement", translateLengthFromSideBar: 159, insideElementOffset:25, functionToCreateElement: "FlowControlElementsCreator", functionToCreateCondition:"CreateForElementCondition"},
                        {id: "foreach", src: "images/foreach.png", startElementWords : ["foreach", "do"], endElementWords : ["end foreach"], color:'#33CCFF', endElementWidth: 215 ,startElementWidth: 280, functionCallNameFromSideBar: "AddFromSideBarElement", translateLength: 106, functionCallNameFromDoNothing: "AddFlowControlElement", translateLengthFromSideBar: 159, insideElementOffset:25, functionToCreateElement: "FlowControlElementsCreator", functionToCreateCondition:"CreateForEachElementCondition"},
                        {id: "If", src: "images/if.png",  startElementWords : ["if", "then"], endElementWords : ["else ", "do nothing", "end if"], color:'#FFCC33', endElementWidth: 280, startElementWidth: 340, functionCallNameFromSideBar: "AddFromSideBarElement", translateLength: 135, functionCallNameFromDoNothing: "AddIfElement", translateLengthFromSideBar: 188, insideElementOffset:25, functionToCreateElement: "IFWhileElement"}
                    ]
                },
                {id: "statement",
                    images: [{id: "Assign", src: "images/assign.png", functionCallNameFromSideBar: "AddFromSideBarElement", translateLength: 34, functionCallNameFromDoNothing: "AddAssignElement", translateLengthFromSideBar: 87, functionToCreateElement: "AssignElement"},
                    {id: "Array", src: "images/array.png", functionCallNameFromSideBar: "AddFromSideBarElement", translateLength: 34, functionCallNameFromDoNothing: "AddAssignElement", translateLengthFromSideBar: 87, functionToCreateElement: "InitArray"},
                    {id: "DoNothing", src: "images/doNothing.png", functionCallNameFromSideBar: "AddFromSideBarDoNothingElement", translateLength: "", functionCallNameFromDoNothing: "", translateLengthFromSideBar: 53}]}]}];

    $('#viewport ').css('height', window.innerHeight - 3);
    var canvas = CreateNewProgram();
    canvas.VPL_elementsInfo = sideBarSubCategories;
    InitMenuElements(canvas);
    CreateDialogs();
    InitDialogs();
    InitMenus();
    mySingletonSideBar.getInstance(sideBarCategories, sideBarSubCategories, canvas);
}

function CreateNewProgram() {

    var canvas = new Canvas(850, window.innerHeight - 3);
    CreateOperatorsMenu(canvas.canvas);
    CreateVarsMenu(canvas.canvas);
    CreateRightClickMenu(canvas.canvas);
    ProgramElement(canvas.canvas);
    return canvas.canvas;
}