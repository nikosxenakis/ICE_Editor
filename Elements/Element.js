const ElementFormat = {
  I: "I",
  C: "C",
  E: "E",
};

const ElementType = new Array();

const ElementTransformationType = {
  first: 0,
  intermediate: 1,
  last: 2,
};

function elementIdToElement(elementId) {
  if (Elements[elementId]) return Elements[elementId];
  else console.log("this element is not registered in var elements of json files");
}

class Element {
  constructor(id, elementId, elementOffset, father) {
    var elemInfo = elementIdToElement(elementId);

    if (father) var coords = father.elementOffsetToElementPos(elementOffset);

    else
      var coords = {
        left: CanvasData.left,
        top: CanvasData.top,
      };

    this.id = id;
    this.format = elemInfo.format;
    this.type = elementId;
    this.color = elemInfo.color;
    this.pos = this.setPositions(coords);
    this.father = father;
    this.opac = CanvasData.highOpacity;
    this.elementOffset = elementOffset;

    this.rectangles = this.createRectangles();

    this.getElementSize();

    if (this.type != ElementType.doNothing && this.type != ElementType.grey && father != null) {
      this.deleteImage = new DeleteImage(this);
    } else {
      this.deleteImage = null;
    }

    this.foldingItem = new FoldingItem(this);

    this.elements = new Array();

    return this;
  }
  createRectangles() {
    var rectangles = new Array();

    if (this.format == ElementFormat.I) {
      if (this.type == ElementType.grey) {
        this.pos.posStart.height = CanvasData.greyElementsHeight;
        rectangles.push(
          new Rectangle(
            this.id,
            this.pos.posStart,
            RectangleType.horizontial,
            this,
            RectangleOffset.firstHorizontial
          )
        );
      } else {
        rectangles.push(
          new Rectangle(
            this.id,
            this.pos.posStart,
            RectangleType.horizontial,
            this,
            RectangleOffset.firstHorizontial
          )
        );
      }
    } else if (this.format == ElementFormat.C) {
      rectangles.push(
        new Rectangle(
          this.id + "RectangleEnd",
          this.pos.posEnd,
          RectangleType.horizontial,
          this,
          RectangleOffset.secondHorizontial
        )
      );
      rectangles.push(
        new Rectangle(
          this.id + "RectangleBody",
          this.pos.posBody,
          RectangleType.vertical,
          this,
          RectangleOffset.firstVertical
        )
      );
      rectangles.push(
        new Rectangle(
          this.id + "RectangleStart",
          this.pos.posStart,
          RectangleType.horizontial,
          this,
          RectangleOffset.firstHorizontial
        )
      );
    } else if (this.format == ElementFormat.E) {
      console.log("Under Construction");
    } else {
      console.log("There is no element with format = ", this.format);
    }

    return rectangles;
  }
  setPositions(coords) {
    const r = {
      posStart: {
        left: coords.left,
        top: coords.top,
        width: CanvasData.horizontalElementsWidth,
        height: CanvasData.horizontalElementsHeight,
      },
      posBody: {
        left: coords.left,
        top: coords.top + CanvasData.horizontalElementsHeight,
        width: CanvasData.verticalElementsWidth,
        height: CanvasData.verticalElementsHeight,
      },
      posEnd: {
        left: coords.left,
        top: coords.top + CanvasData.horizontalElementsHeight + CanvasData.verticalElementsHeight,
        width: CanvasData.horizontalElementsWidth,
        height: CanvasData.horizontalElementsHeight,
      },
      posBody2: {
        left: coords.left,
        top: coords.top +
          CanvasData.horizontalElementsHeight +
          CanvasData.verticalElementsHeigth +
          CanvasData.horizontalElementsHeight,
        width: CanvasData.verticalElementsWidth,
        height: CanvasData.verticalElementsHeight,
      },
      posEnd2: {
        left: coords.left,
        top: coords.top +
          CanvasData.horizontalElementsHeight +
          CanvasData.verticalElementsHeight +
          CanvasData.horizontalElementsHeight +
          CanvasData.horizontalElementsHeight,
        width: CanvasData.horizontalElementsWidth,
        height: CanvasData.horizontalElementsHeight,
      },
    };

    return r;
  }
  getElementSize() {
    var value = {
      top: 10000,
      left: 10000,
      height: 0,
      width: 0,
    };

    for (let k = 0; k < this.rectangles.length; k++) {
      if (this.rectangles[k].rectangleInCanvas.top < value.top) {
        value.top = this.rectangles[k].rectangleInCanvas.top;
      }

      if (this.rectangles[k].rectangleInCanvas.left < value.left) {
        value.left = this.rectangles[k].rectangleInCanvas.left;
      }

      if (this.rectangles[k].rectangleInCanvas.width > value.width) {
        value.width = this.rectangles[k].rectangleInCanvas.width;
      }

      value.height += this.rectangles[k].rectangleInCanvas.height;
    }
    //update
    this.size = value;
    return value;
  }
  getInsideElementSize() {
    var value = this.getElementSize();

    value.height = 0;
    value.top += this.getRectangle(RectangleOffset.firstHorizontial).height;

    for (var i = 0; i < this.elements.length; i++) {
      value.height += this.elements[i].getElementSize().height;
    }

    return value;
  }
  setVisibility(flag) {
    if (this.visibility && this.visibility == flag) return;

    this.visibility = flag;

    if (flag == false) {
      if (this.deleteImage) this.deleteImage.setVisibility(flag);

      if (this.foldingItem) this.foldingItem.setVisibility(flag);
    }

    for (let k = 0; k < this.rectangles.length; k++) {
      this.rectangles[k].setVisibility(flag);
    }

    for (let k = 0; k < this.elements.length; k++) {
      this.elements[k].setVisibility(flag);
    }
  }
  getRectangle(rectangleOffset) {
    for (let k = 0; k < this.rectangles.length; k++) {
      if (this.rectangles[k].rectangleOffset == rectangleOffset) {
        return this.rectangles[k].rectangleInCanvas;
      }
    }

    return null;
  }
  changeElementInsideSpace(offsetHeight, offsetTop) {
    this.foldingItem.changeSize(offsetHeight);

    for (let k = 0; k < this.rectangles.length; k++) {
      if (this.rectangles[k].rectangleInCanvas.top >= offsetTop) {
        if (this.rectangles[k].type == RectangleType.vertical) {
          this.rectangles[k].rectangleInCanvas.set(
            "height",
            this.rectangles[k].rectangleInCanvas.height + offsetHeight
          );
          this.rectangles[k].rectangleInCanvas.setCoords();
        } else {
          this.rectangles[k].moveRectangle(null, offsetHeight);
        }
      }
    }

    if (this.father) {
      //to avoid moving horizontial objects
      this.father.changeElementInsideSpace(offsetHeight, this.father.getElementSize().top + 1);
    }
  }
  changeLastElementInsideSpace(offsetHeight, offsetTop) {
    this.foldingItem.changeSize(offsetHeight);

    for (let k = 0; k < this.rectangles.length; k++) {
      if (this.rectangles[k].type == RectangleType.vertical) {
        this.rectangles[k].rectangleInCanvas.set(
          "height",
          this.rectangles[k].rectangleInCanvas.height + offsetHeight
        );
      }

      if (this.rectangles[k].rectangleInCanvas.top >= offsetTop) {
        if (this.rectangles[k].type == RectangleType.horizontial) {
          this.rectangles[k].moveRectangle(null, offsetHeight);
        }
      }
    }

    if (this.father) {
      //to avoid moving horizontial objects
      this.father.changeLastElementInsideSpace(offsetHeight, this.father.getElementSize().top + 1);
    }
  }
  changeElementsTop(exceptElem, height) {
    for (let k = 0; k < this.elements.length; k++) {
      if (this.elements[k] != exceptElem) {
        if (this.elements[k].getElementSize().top >= exceptElem.getElementSize().top) {
          this.elements[k].moveElement(null, 0, height);
        }
      }
    }

    if (this.father) {
      this.father.changeElementsTop(this, height);
    }
  }
  transformElement(elem, elementTransformationType) {
    if (!elem) {
      console.log("No element to transform");
    }

    var size = elem.getElementSize();

    const c = Canvas.getInstance();

    if (elementTransformationType == ElementTransformationType.first)
      this.changeElementInsideSpace(size.height, size.top);
    else this.changeLastElementInsideSpace(size.height, size.top);

    Canvas.setCanvasElementsCoords();
    c.canvas.renderAll();

    this.changeElementsTop(elem, size.height);

    Canvas.setCanvasElementsCoords();
    c.canvas.renderAll();
  }
  elementOffsetToElementTransformationType(elementOffset) {
    if (elementOffset == 0) return ElementTransformationType.first;
    else if (elementOffset == this.elements.length) return ElementTransformationType.last;
    else return ElementTransformationType.intermediate;
  }
  elementOffsetToElementPos(elementOffset) {
    var pos;
    var firstHorizontialRect = this.getRectangle(RectangleOffset.firstHorizontial);

    var firstHorizontialRectLeft = firstHorizontialRect.left;
    var firstHorizontialRectTop = firstHorizontialRect.top;

    if (!firstHorizontialRectLeft || !firstHorizontialRectTop) {
      console.error("error in elementOffsetToElementPos");
      return;
    }

    var firstVerticalRect = this.getRectangle(RectangleOffset.firstVertical);
    if (firstVerticalRect) {
      var firstVerticalRectLeft = firstVerticalRect.left;
      var firstVerticalRectTop = firstVerticalRect.top;
    }

    var secondHorizontialRect = this.getRectangle(RectangleOffset.secondHorizontial);
    if (firstVerticalRect) {
      var secondHorizontialRectLeft = secondHorizontialRect.left;
      var secondHorizontialRectTop = secondHorizontialRect.top;
    }

    if (elementOffset == 0) {
      pos = {
        left: firstHorizontialRectLeft + CanvasData.verticalElementsWidth,
        top: firstHorizontialRectTop + CanvasData.horizontalElementsHeight,
      };
    } else if (elementOffset == this.elements.length) {
      pos = {
        left: firstVerticalRectLeft + CanvasData.verticalElementsWidth,
        top: secondHorizontialRectTop,
      };
    } else {
      pos = {
        left: secondHorizontialRectLeft + CanvasData.verticalElementsWidth,
        top: this.elements[elementOffset].getRectangle(RectangleOffset.firstHorizontial).top,
      };
    }

    return pos;
  }
  elementFactory(elementId, elementOffset, data) {
    //choose constructor class
    var elemInfo = elementIdToElement(elementId);
    if (!elemInfo) console.log("error in elementFactory");

    return new elemInfo.class(this.id + "_" + elementId, elementOffset, this, data);
  }
  addElement(elementId, elementOffset, data) {
    //from offset produce pos and elementTransformationType
    var pos = this.elementOffsetToElementPos(elementOffset);
    var elementTransformationType = this.elementOffsetToElementTransformationType(elementOffset);

    //remove doNothing element
    if (this.elements.length == 1 && this.elements[0].type == ElementType.doNothing) {
      if (elementTransformationType != ElementTransformationType.first) {
        pos.top = this.elements[0].getElementSize().top;
      }
      this.elements[0].removeElement();
      elementOffset = 0;
    }

    var elem = this.elementFactory(elementId, elementOffset, data);

    this.transformElement(elem, elementTransformationType);

    this.elements.splice(elementOffset, 0, elem);

    if (elem.format != ElementFormat.I) {
      var e = elem.addElement("doNothing", 0);
    }

    Canvas.setCanvasElementsCoords();
    Canvas.getInstance().canvas.renderAll();

    return elem;
  }
  addExistingElement(element, elementOffset) {
    //from offset produce pos and elementTransformationType
    var pos = this.elementOffsetToElementPos(elementOffset);
    var elementTransformationType = this.elementOffsetToElementTransformationType(elementOffset);

    //remove doNothing element
    if (this.elements.length == 1 && this.elements[0].type == ElementType.doNothing) {
      if (elementTransformationType != ElementTransformationType.first) {
        pos.top = pos.top - this.elements[0].getElementSize().height;
      }
      this.elements[0].removeElement();
    }

    //set the father
    element.father = this;

    element.setVisibility(true);

    //move the new element
    var coords = this.elementOffsetToElementPos(elementOffset);
    var dx = coords.left - element.getElementSize().left;
    var dy = coords.top - element.getElementSize().top;
    element.moveElement(null, dx, dy);

    this.transformElement(element, elementTransformationType);

    this.elements.splice(elementOffset, 0, element);

    Canvas.setCanvasElementsCoords();
    Canvas.getInstance().canvas.renderAll();

    return element;
  }
  moveElementRectangles(movedRectangle) {
    if (!movedRectangle) {
      console.error("error in moveElementRectangles");
      return;
    }

    var element = movedRectangle.element;

    if (element.format == ElementFormat.I) {
      return;
    }

    var firstHorizontialRectangle = element.getRectangle(RectangleOffset.firstHorizontial);
    var firstVerticalRectangle = element.getRectangle(RectangleOffset.firstVertical);
    var secondHorizontialRectangle = element.getRectangle(RectangleOffset.secondHorizontial);
    var movedRectangleInCanvas = movedRectangle.rectangleInCanvas;

    if (movedRectangleInCanvas == firstHorizontialRectangle) {
      firstVerticalRectangle.set(
        "top",
        movedRectangleInCanvas.top + movedRectangleInCanvas.height
      );
      firstVerticalRectangle.set("left", movedRectangleInCanvas.left);

      secondHorizontialRectangle.set(
        "top",
        firstVerticalRectangle.top + firstVerticalRectangle.height
      );
      secondHorizontialRectangle.set("left", movedRectangleInCanvas.left);
    } else if (movedRectangleInCanvas == firstVerticalRectangle) {
      firstHorizontialRectangle.set(
        "top",
        movedRectangleInCanvas.top - firstHorizontialRectangle.height
      );
      firstHorizontialRectangle.set("left", movedRectangleInCanvas.left);

      secondHorizontialRectangle.set(
        "top",
        movedRectangleInCanvas.top - movedRectangleInCanvas.height
      );
      secondHorizontialRectangle.set("left", movedRectangleInCanvas.left);
    } else if (movedRectangleInCanvas == secondHorizontialRectangle) {
      firstVerticalRectangle.set(
        "top",
        movedRectangleInCanvas.top - firstVerticalRectangle.height
      );
      firstVerticalRectangle.set("left", movedRectangleInCanvas.left);

      firstHorizontialRectangle.set(
        "top",
        firstVerticalRectangle.top - firstHorizontialRectangle.height
      );
      firstHorizontialRectangle.set("left", movedRectangleInCanvas.left);
    } else {
      console.error(
        "error in moveElementRectangles element = ",
        element,
        " and rect = ",
        movedRectangle
      );
    }

    firstHorizontialRectangle.setCoords();
    firstVerticalRectangle.setCoords();
    secondHorizontialRectangle.setCoords();
  }
  moveSubElements() {
    if (this.format == ElementFormat.I) {
      return;
    }

    var left = this.getRectangle(RectangleOffset.firstVertical).left +
      this.getRectangle(RectangleOffset.firstVertical).width;

    for (let k = 0; k < this.elements.length; k++) {
      if (this.elements[k]) {
        if (k == 0) {
          var top = this.getRectangle(RectangleOffset.firstVertical).top;
        } else {
          var prevElemSize = this.elements[k - 1].getElementSize();
          var prevElemTop = prevElemSize.top;
          var prevElemHeight = prevElemSize.height;
          var top = prevElemTop + prevElemHeight;
        }

        this.elements[k].fixElementAbsolutePosition(left, top);
      }
    }
  }
  fixElementAbsolutePosition(left, top) {
    //move movedRectangle
    var movedRectangle = this.getRectangle(RectangleOffset.firstHorizontial);
    movedRectangle.set("top", top);
    movedRectangle.set("left", left);
    movedRectangle.setCoords();

    this.moveElement(movedRectangle.rectangle);
  }
  moveElement(movedRectangle, dx, dy) {
    if (!movedRectangle) {
      var movedRectangle = this.getRectangle(RectangleOffset.firstHorizontial);
      movedRectangle.set("top", movedRectangle.top + dy);
      movedRectangle.set("left", movedRectangle.left + dx);
      movedRectangle.setCoords();
      movedRectangle = movedRectangle.rectangle;
    }

    this.moveElementRectangles(movedRectangle);

    for (let k = 0; k < this.rectangles.length; k++) {
      this.rectangles[k].moveRectangleElements();
    }

    if (this.type != ElementType.doNothing && this.type != ElementType.grey) {
      if (this.deleteImage) this.deleteImage.moveDeleteImage();
      if (this.foldingItem) this.foldingItem.moveFoldingItem();
    }

    this.moveSubElements();
  }
  //remove element functions
  removeElement() {
    if (!this.father) {
      console.log("There is no father for ", this.id);
    } else {
      //replace the deleting element with doNothing
      if (this.father.elements.length == 1 &&
        this.father.elements[0] == this &&
        this.type != ElementType.doNothing) {
        var e = this.father.addElement("doNothing", 0);
      }

      //revert transformation
      this.father.reverseTransformElement(this);

      //search in this.father.elements
      this.removeElementFromFather();
    }

    //this.removeDeleteImage();
    //this.removeFoldingItem();
    //this.removeRectangles();
    this.setVisibility(false);

    Canvas.getInstance().canvas.renderAll();

    return true;
  }
  removeElementFromFather() {
    for (let k = 0; k < this.father.elements.length; k++) {
      if (this.father.elements[k] == this) {
        this.father.elements.splice(k, 1);
        break;
      }
    }
  }
  removeRectangles() {
    const c = Canvas.getInstance();

    //search in horizontial and vertical elements
    for (let k = 0; k < this.rectangles.length; k++) {
      this.rectangles[k].removeRectangle();

      for (let l = 0; l < c.horizontalElements.length; l++) {
        if (this.rectangles[k].rectangleInCanvas == c.horizontalElements[l]) {
          c.horizontalElements.splice(l, 1);
        }
      }
      for (let m = 0; m < c.verticalElements.length; m++) {
        if (this.rectangles[k].rectangleInCanvas == c.verticalElements[m]) {
          c.horizontalElements.splice(l, 1);
        }
      }
    }

    //remove each subelement
    for (letk = 0; k < this.elements.length; k++) {
      this.elements[k].removeRectangles();
    }

    c.canvas.renderAll();
  }
  removeDeleteImage() {
    if (this.deleteImage) {
      this.deleteImage.removeDeleteImage();
      this.deleteImage = null;
    }
  }
  removeFoldingItem() {
    if (this.foldingItem) {
      this.foldingItem.removeFoldingItem();
      this.foldingItem = null;
    }
  }
  reverseElementInsideSpace(offsetHeight, offsetTop) {
    this.foldingItem.changeSize(-offsetHeight);

    for (let k = 0; k < this.rectangles.length; k++) {
      if (this.rectangles[k].type == RectangleType.vertical) {
        this.rectangles[k].rectangleInCanvas.set(
          "height",
          this.rectangles[k].rectangleInCanvas.height - offsetHeight
        );
        this.rectangles[k].rectangleInCanvas.setCoords();
      } else {
        if (this.rectangles[k].rectangleInCanvas.top >= offsetTop) {
          this.rectangles[k].moveRectangle(null, -offsetHeight);
        }
      }
    }

    if (this.father) {
      //to avoid moving horizontial objects
      this.father.reverseElementInsideSpace(offsetHeight, this.father.getElementSize().top + 1);
    }
  }
  reverseElementsTop(exceptElem, height) {
    for (let k = 0; k < this.elements.length; k++) {
      if (this.elements[k] != exceptElem) {
        if (this.elements[k].getElementSize().top >= exceptElem.getElementSize().top) {
          this.elements[k].moveElement(null, 0, -height);
        }
      }
    }

    if (this.father) {
      this.father.reverseElementsTop(this, height);
    }
  }
  reverseTransformElement(elem) {
    //no reverseTransformElement do as above
    if (!elem) {
      console.log("No element to reverse transform");
    }

    var size = elem.getElementSize();

    const c = Canvas.getInstance();

    this.reverseElementsTop(elem, size.height);

    Canvas.setCanvasElementsCoords();
    c.canvas.renderAll();

    this.reverseElementInsideSpace(size.height, size.top);

    Canvas.setCanvasElementsCoords();
    c.canvas.renderAll();
  }
  //opacity
  setOpacity(opac) {
    if (this.opac == opac || this.visibility == false) return;

    this.opac = opac;

    if (this.deleteImage) {
      if (opac == CanvasData.highOpacity) this.deleteImage.setVisibility(false);
      else if (opac == CanvasData.lowOpacity) this.deleteImage.setVisibility(true);
    }

    if (this.foldingItem) {
      if (opac == CanvasData.highOpacity) this.foldingItem.setVisibility(false);
      else if (opac == CanvasData.lowOpacity) this.foldingItem.setVisibility(true);
    }

    for (let k = 0; k < this.rectangles.length; k++) {
      if (this.rectangles[k]) this.rectangles[k].setOpacity(opac);
    }

    for (let k = 0; k < this.elements.length; k++) {
      if (this.elements[k]) this.elements[k].setOpacity(opac);
    }

    Canvas.getInstance().canvas.renderAll();
  }
  cloneElement() {
    //none
  }
  //folding
  unfoldAllSubElements() {
    if (this.foldingItem.foldingItemState == FoldingItemState.folded) {
      this.unfoldElement(this);
    }

    for (let k = 0; k < this.elements.length; k++) {
      this.elements[k].unfoldAllSubElements();
    }
  }
  foldElement(foldedElement) {
    //console.log("Fold Element : ",this);
    if (this != foldedElement) {
      this.setVisibility(false);
    } else if (this == foldedElement) {
      this.unfoldAllSubElements();

      this.reverseElementInsideSpace(
        this.getInsideElementSize().height,
        this.getInsideElementSize().top
      );

      if (this.father) {
        this.father.reverseElementsTop(this, this.getInsideElementSize().height);
      }

      for (let k = 0; k < this.elements.length; k++) {
        this.elements[k].foldElement(foldedElement);
      }
    }
    this.foldingItem.foldingItemState = FoldingItemState.folded;
  }
  unfoldElement(unfoldedElement) {
    //console.log("Unfold Element : ",this);
    if (this != unfoldedElement) {
      if (this.foldingItem.foldingItemState == FoldingItemState.unfolded) {
        //    this.foldElement(this);
      }

      this.setVisibility(true);
    }

    if (this.format == ElementFormat.I) return;

    if (this == unfoldedElement) {
      if (this.foldingItem.foldingItemState == FoldingItemState.unfolded) {
        return;
      }

      this.changeElementInsideSpace(
        this.getInsideElementSize().height,
        this.getInsideElementSize().top
      );

      if (this.father) {
        this.father.changeElementsTop(this, this.getInsideElementSize().height);
      }
    }

    for (let k = 0; k < this.elements.length; k++) {
      this.elements[k].unfoldElement(unfoldedElement);
    }

    this.foldingItem.foldingItemState = FoldingItemState.unfolded;

    if (this.deleteImage) this.deleteImage.setVisibility(false);

    if (this.foldingItem) this.foldingItem.setVisibility(false);
  }
  containsRectangle(rectangle) {
    for (let k = 0; k < this.rectangles.length; k++) {
      if (this.rectangles[k])
        if (this.rectangles[k].rectangleInCanvas)
          if (this.rectangles[k].rectangleInCanvas == rectangle) return true;
    }

    for (let k = 0; k < this.elements.length; k++) {
      if (this.elements[k].containsRectangle(rectangle)) return true;
    }

    return false;
  }
  getElemetOffset() {
    if (!this.father) return;

    for (let k = 0; k < this.father.elements.length; k++) {
      if (this.father.elements[k] == this) return k;
    }
  }
  bringToFront() {
    for (let k = 0; k < this.rectangles.length; k++) {
      this.rectangles[k].bringToFront();
    }

    this.deleteImage.bringToFront();
    this.foldingItem.bringToFront();
  }
  sendToBack() {
    for (let k = 0; k < this.elements.length; k++) {
      this.elements[k].sendToBack();
    }

    if (this.deleteImage) this.deleteImage.sendToBack();

    if (this.foldingItem) this.foldingItem.sendToBack();

    for (let k = 0; k < this.rectangles.length; k++) {
      this.rectangles[k].sendToBack();
    }
  }
  saveElement(array) {
    array.push({
      id: this.id,
      type: this.type,
      elements: new Array(),
    });

    for (let k = 0; k < this.elements.length; k++) {
      this.elements[k].saveElement(array[array.length - 1].elements);
    }
  }
}
