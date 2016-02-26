/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//****Singleton Design Pattern****///

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

var mySingletonSideBar = (function() {

    // Instance stores a reference to the Singleton
    var sidebarDiv;

    function init(sideBarCategories, sideBarSubCategories, canvas) {
        sidebarDiv = $("#sideBar");

        //$("#sideBar").css('height',$("#sideBarContainer").height());
        //$("#sideBar").css('width',$("#sideBarContainer").width());

        var categories = document.createElement("ul");
        categories.id = "categories";
        document.getElementById("sideBar").appendChild(categories);

        _.each(sideBarCategories, function(category) {

            var liCategories = document.createElement("li");
            document.getElementById("categories").appendChild(liCategories);
            var a = document.createElement('a');
            var linkText = document.createTextNode(category.name);
            a.appendChild(linkText);
            a.href = category.href;
            liCategories.appendChild(a);

        });

        _.each(sideBarSubCategories, function(subCategory) {

            var category = document.createElement("div");
            category.id = subCategory.subCategoryId;
            document.getElementById("sideBar").appendChild(category);

            var subCategoriesNames = document.createElement("ul");
            subCategoriesNames.id = subCategory.ulId;
            category.appendChild(subCategoriesNames);
             _.each(subCategory.subCategoriesItems, function(item) {

                var lisubCategories = document.createElement("li");
                subCategoriesNames.appendChild(lisubCategories);
                var a = document.createElement('a');
                var linkText = document.createTextNode(item.name);
                a.appendChild(linkText);
                a.href = item.href;
                lisubCategories.appendChild(a);
            });

             _.each(subCategory.tools, function(item) {

                var divItems = document.createElement("div");
                divItems.id = item.id;
                category.appendChild(divItems);
                _.each(item.images, function(image) {
                    var elem = document.createElement("img");
                    elem.id = image.id;
                    elem.src = image.src;
                    divItems.appendChild(elem);

                });

            });
            $('#' + category.id)
                    .tabs()
                    .addClass('ui-tabs-vertical ui-helper-clearfix');

        });

        $('#sideBar')
                .tabs()
                .addClass('ui-tabs-vertical ui-helper-clearfix');

        var image = null;

        document.body.onmousemove = function(e) {

            if (image) {
                if(canvas){
                    if( rectangleColision( canvas._offset.left , canvas._offset.top , canvas.width , canvas.height , e.clientX , e.clientY , 10 , 10 ) ){
                        //mouse inside canvas
                        $("#yourDivId").offset({top: e.clientY, left: e.clientX});
                        canvas.elementsUnderDragElement.length = 0;

                        /*
                        if (canvas.makeIntersection) {

                            AddDoNothingElement(canvas.objectIntersected.left, canvas.objectIntersected.top, canvas, -4, false);
                            canvas.makeIntersection = false;
                        }
                        */
                       
                        var offsetTop = $("#canvasContainer").scrollTop();
                        var offsetLeft = $("#canvasContainer").scrollLeft();

                        //console.log("Mouse x = "+e.clientX+"\t"+"y = "+e.clientY);
                        //console.log("Image x = "+image.x+"\t"+"y = "+image.y);
                        
                        console.log(e.layerX, e.layerY);

                        _.each(canvas._objects, function(elem) {

                            //console.log("Elem id = "+elem.id+"\tx = "+elem.left+"\ty = "+elem.top+"\tw = "+elem.width+"\th = "+elem.height);

                            x1=e.layerX;//x1=image.x;
                            y1=e.layerY;//y1=image.y;
                            w1=image.width;
                            h1=image.height;
                            x2=elem.left;
                            y2=elem.top;
                            w2=elem.width;
                            h2=elem.height;

                            if( rectangleColision( x1 , y1 , w1 , h1 , x2 , y2 , w2 , h2 ) ){
                                canvas.elementsUnderDragElement.push(elem);
                                console.log("collision");
                            }

                        });
                    }

                    if (canvas.elementsUnderDragElement.length > 1) {
               
                        SortArray(canvas.elementsUnderDragElement);
                        if (/*canvas.elementsUnderDragElement[0].isMinus === false ||*/ canvas.elementsUnderDragElement[1].id === "groupLogicExprError" 
                        || !(canvas.elementsUnderDragElement[1].top <= canvas.elementsUnderDragElement[0].top + canvas.elementsUnderDragElement[0].height + 4)) 
                        {
                            canvas.elementsUnderDragElement.length = 0;  
                        }
                        else {
                            AddDoNothingElement(canvas.elementsUnderDragElement[1].left, canvas.elementsUnderDragElement[1].top, canvas, 4, false);
                            canvas.makeIntersection = true;
                            canvas.objectIntersected = canvas.elementsUnderDragElement[1];
                            canvas.renderAll();
                        }
                    }
                }
            }
        };

        document.body.onmousedown = function(e) {
            if (image) {
                $(".menu").hide();
                $(".ui-dialog-content").dialog("close");
                var imageType = image.imageType;
                image.remove();
                image = null;

                /*check this after onmousemove*/
                if (canvas.makeIntersection) {
                    AddDoNothingElement(canvas.objectIntersected.left, canvas.objectIntersected.top, canvas, -4, false);
                    canvas.makeIntersection = false;
                }

                if (canvas.elementsUnderDragElement.length > 1)
                    AddElementFromSideBar(canvas, imageType);


            }
            if (e.target) {
                if (e.target.id) {
                    if (document.getElementById(e.target.id)) {
                        if (document.getElementById(e.target.id).nodeName === "IMG") {
                            $(".menu").hide();
                            $(".ui-dialog-content").dialog("close");
                            image = document.getElementById(e.target.id).cloneNode(true);
                            image.id = 'yourDivId';
                            image.imageType = e.target.id;
                            sidebarDiv.append(image);
                            $("#yourDivId").offset({top: e.clientY, left: e.clientX});
                        }
                    }
                }
            }
        };

        return;
    };

    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function(sideBarCategories, sideBarSubCategories, canvas) {
            if (!sidebarDiv) {
                init(sideBarCategories, sideBarSubCategories, canvas);
            }
        }
    };
    
})();