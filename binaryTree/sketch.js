var tree

function setup() {
	noCanvas()
	tree = new Tree()
	// for(let i = 0; i < 10; ++i){
	// 	let val = floor(random()*200)
	// 	tree.addVal(val)
	// 	// console.log(val)
	// }
	tree.traverse()
}