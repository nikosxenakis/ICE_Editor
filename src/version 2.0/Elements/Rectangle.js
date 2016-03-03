/*
define Rectangle{
		id,
		1 rect,
		type(vertical,horizontial),
		define 3 Area
}
 */

var RetangleType = {
    horizontial: 0,
    vertical: 1
};

function Rectangle (id , type) {
	this.id = id;
	this.type = type;
}
