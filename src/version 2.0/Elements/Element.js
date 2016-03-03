/*
define Element{
		id,
		format( I C E ),
		type(if,while,do,for),
		a group element{
			5 Rectangle
		},
		father Element,
		2 lists of Elements
	}
 */
var ElementFormat = {
    I: 0,
    C: 1,
    E: 2
};

var ElementType = {
    if: 0,
    while: 1,
    for: 2
};

function Element (id , format , type , father) {
    this.id = id;
    this.format = format;
    this.type = type;
    this.father = father;

    this.rectangles = this.createRectangles(format,type);
    this.elements = new Array();

    

    return this;
}
 
Element.prototype.createRectangles = function(format , type) {
    var rectangles = new Array();

    if(format == ElementFormat.I){

    }
    else if(format == ElementFormat.C){
        if(type == ElementType.while){
            rectangles.push(new Rectangle("Rectangle1"),RetangleType.horizontial);
            rectangles.push(new Rectangle("Rectangle2"),RetangleType.vertical);
            rectangles.push(new Rectangle("Rectangle3"),RetangleType.horizontial);
        }
    }
    else if(format == ElementFormat.E){
        
    }

    return rectangles;
};