/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//****Singleton Design Pattern****///

var mySingletonSideBar = (function() {

    // Instance stores a reference to the Singleton
    var sidebarDiv;

    function init(sideBarCategories, sideBarSubCategories, canvas) {

        sidebarDiv = document.createElement("div");
        sidebarDiv.id = "sidebar";
        document.body.appendChild(sidebarDiv);

        var categories = document.createElement("ul");
        categories.id = "categories";
        document.getElementById("sidebar").appendChild(categories);

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
            document.getElementById("sidebar").appendChild(category);

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

        $('#sidebar')
                .tabs()
                .addClass('ui-tabs-vertical ui-helper-clearfix');

        var image = null;
        document.body.onmousemove = function(e) {
            if (image) {
                $("#yourDivId").offset({top: e.clientY, left: e.clientX});
                canvas.elementsUnderDragElement.length = 0;
              
                if (canvas.makeIntersection) {

                    AddDoNothingElement(canvas.objectIntersected.left, canvas.objectIntersected.top, canvas, -4, false);
                    canvas.makeIntersection = false;
                }
                var offsetTop = $("#viewport").scrollTop();
                var offsetLeft = $("#viewport").scrollLeft();
        
               _.each(canvas.horizontalElements, function(elem) {

                    if(
                        (
                            (
                                elem.top > e.clientY + offsetTop &&
                                elem.top <= e.clientY + offsetTop + image.height
                            ) || 
                            (
                                elem.top + elem.height > e.clientY + offsetTop && 
                                elem.top + elem.height < e.clientY + offsetTop + image.height
                            ) || 
                            (
                                elem.top < e.clientY + offsetTop &&
                                elem.top + elem.height >= e.clientY + offsetTop
                            )
                        ) &&
                        (
                            true//elem.type0 === "element"
                        ) && 
                        (
                            (
                                elem.left < e.clientX + offsetLeft &&
                                elem.left + elem.width > e.clientX + offsetLeft
                            ) || 
                            (
                                elem.left > e.clientX + offsetLeft &&
                                elem.left < e.clientX + offsetLeft + image.width
                            )
                        )
                    ){

                        canvas.elementsUnderDragElement.push(elem);
                       
                    }

                });
                
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
        };

        document.body.onmousedown = function(e) {
            if (image) {
                $(".menu").hide();
                $(".ui-dialog-content").dialog("close");
                var imageType = image.imageType;
                image.remove();
                image = null;
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
                            sidebarDiv.appendChild(image);
                            $("#yourDivId").offset({top: e.clientY, left: e.clientX});
                        }
                    }
                }
            }
        };

        return;
    }
    ;

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