let data, graph
let actors = []

function preload() {
	data = loadJSON('bacon.json')
}

function setup() {
	noCanvas()
	graph = new Graph()
	setupGraph()
}

function setupGraph() {

	data.movies.forEach( function(movie) {
		let movieNode = new Node(movie.title)
		graph.addNode(movieNode)
		movie.cast.forEach( function(actor) {
			actorNode = graph.getNode(actor)
			if (!actorNode) {
				actorNode = new Node(actor)
			}
			graph.addNode(actorNode)
			actors.push(actorNode);
			movieNode.addEdge(actorNode)
		})
	})
	bfs()
}
function bfs() {
	let start = actors[floor(random()*actors.length)].value;
	let end = actors[floor(random()*actors.length)].value;
	// let start = 'Kevin Bacon'
	// let end = 'Steve Guttenberg'
  graph.setStart(start);
	graph.setEnd(end);
	// console.log(start, end, graph.start, graph.end)
	let queue = []
	let path = []
	queue.push(graph.start)
	while (queue.length > 0) {
		let node = queue.shift()
		// console.log(node)
		if (node == graph.end){
			path.push(node)
			let next = node.parent
			while(next){
				path.push(next)
				next = next.parent
			}
		}
		else{
			node.searched = true
			let next = node.edges
			next.forEach(function(neighbour){
				if(!neighbour.searched){
					queue.push(neighbour)
					neighbour.parent = node
				}
			})
		}
	}

  var result = '';
  for (var i = path.length -1; i >= 0; i--) {
    result += path[i].value;
    if (i != 0) {
      result += ' → ';
    }
    // console.log(path[i].label);
	}
	createP(`Start: ${start}`)
	createP(`End: ${end}`)
  createP(result);
}
