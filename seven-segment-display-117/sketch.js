config = {
	origin:{
		x:550,
		y:50
	},
	rect : {
		height: 200,
		width: 20
	},
	triangle: {
		height:10,
		base:40
	}
};

//segment's rectangle coordinate values and dimensions
const rectArr = [
	{
		x:config.origin.x,
		y:config.origin.y,
		ht:config.rect.height,
		wt:config.rect.width
	},{
		x:config.origin.x + config.rect.height,
		y:config.origin.y + config.rect.width,
		ht:config.rect.width,
		wt:config.rect.height
	},{
		x:config.origin.x + config.rect.height,
		y:config.origin.y + 2*config.rect.width + config.rect.height,
		ht:config.rect.width,
		wt:config.rect.height
	},{
		x:config.origin.x,
		y:config.origin.y + 2*config.rect.width + 2*config.rect.height,
		ht:config.rect.height,
		wt:config.rect.width
	},{
		x:config.origin.x - config.rect.width,
		y:config.origin.y + 2*config.rect.width + config.rect.height,
		ht:config.rect.width,
		wt:config.rect.height
	},{
		x:config.origin.x - config.rect.width,
		y:config.origin.y + 1*config.rect.width,
		ht:config.rect.width,
		wt:config.rect.height
	},{
		x:config.origin.x,
		y:config.origin.y + config.rect.width + config.rect.height,
		ht:config.rect.height,
		wt:config.rect.width
	}
]

//segments triangle coordinates and dimensions
// const triangleArr = [
// 	{
// 		x1:config.origin.x - ,
// 		y1;,
// 		x2:,
// 		y2:,
// 		x3:,
// 		y3:
// 	},
// 	{},{},{},{},{},{},{},{},{},{},{},{},{}]
// segments array
const segments = [];
// hexavalues for 0-9
const hexVals = [0x7E, 0x30, 0x6D, 0x79, 0x33, 0x5B, 0x5F, 0x70, 0x7F, 0x7B, 0x77, 0x1F, 0x4E, 0x3D, 0x4F, 0x47]
// index
let index = 0
//class for all rectangular segments
class Rect {
	constructor(x, y, ht, wt) {
		this.x = x
		this.y = y
		this.ht = ht
		this.wt = wt
	}
}

//class for all triangular segments
class Triangle {
	constructor(ht, base) {
		this.ht = ht
		this.base = base
	}
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	initializeSevenSegment()
	frameRate(6)
}

function initializeSevenSegment(){
	rectArr.forEach( val => segments.push(new Rect(val.x, val.y, val.ht, val.wt)))
}
function draw() {
	sevenSegement(hexVals[index])
	index = (index + 1)%(hexVals.length)
}

function getColor(val, shift){
	let a = 255*((val >> shift) & 1)
	let r = 188
	let g = 44
	let b = 37
	return color(r, g, b, a)
}

function sevenSegement(hex){
	push()
	background(22)
	noStroke()
	segments.forEach( (segment, index) => {
		fill(getColor(hex,segments.length - index -1));
		rect(segment.x, segment.y, segment.ht, segment.wt)
	})
	
	pop()
}

