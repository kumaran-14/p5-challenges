// depth first search with recursive backtracking

var w = 25
var rows, cols
var grid = []
var current
var stack = []


function Cell(i, j) {
  this.i = i
  this.j = j
  this.walls = [true, true, true, true]
  this.visited = false
  this.highlight = function() {
    let x = this.i*w
    let y = this.j*w
    fill(0,250,10)
    rect(x, y, w, w)
  }
  this.show = function () {
    let x = this.i*w
    let y = this.j*w
    noFill()
    stroke(0)
    if (this.walls[0] ) line(x    , y    , x + w, y    )
    if (this.walls[1] ) line(x + w, y    , x + w, y + w)
    if (this.walls[2] ) line(x + w, y + w, x    , y + w)
    if (this.walls[3] ) line(x    , y + w, x    , y    )

    if( this.visited) {
      noStroke()
      fill(0,0,0,50)
      rect(x, y, w, w)
    }
  }

  this.checkNeighbours = function () {
    let neighbours = []
    let top    = grid[index( i - 1, j    )]
    let right  = grid[index( i    , j + 1)]
    let bottom = grid[index( i + 1, j    )]
    let left   = grid[index( i    , j - 1)]

    if ( top && !top.visited ) neighbours.push(top)
    if ( right && !right.visited ) neighbours.push(right)
    if ( bottom && !bottom.visited ) neighbours.push(bottom)
    if ( left && !left.visited ) neighbours.push(left)

    if (neighbours.length > 0) {
      let r = floor(random(0, neighbours.length))
      return neighbours[r]
    } else {
      return undefined
    }
  }
}

function index( i, j) {
  if ( i < 0 || j < 0 || i > rows-1 || j > cols -1)
    return -1
  return i + (j)*cols
}

function setup() {
  createCanvas(500, 500)
  rows = width/w
  cols = height/w

  for( let j = 0; j < rows ; ++j) {
    for ( let i = 0; i < cols; ++i) {
      let cell = new Cell(i, j)
      grid.push(cell)
    }
  }
  current = grid[0]
}

function draw() {
  background(100, 0, 200)
  for( let i = 0; i < grid.length ; ++i) {
    grid[i].show()
  }

  current.visited = true
  current.highlight()
  //STEP 1
  let next = current.checkNeighbours()
  if (next) {

    // STEP 2
    stack.push(current)

    //STEP 3
    removeWalls(current, next)

    //STEP 4
    next.visted = true
    current = next
  } else if ( stack.length > 0 ) {
    current = stack.pop()
  }

}

function removeWalls(a, b) {
  let x = a.i - b.i
  let y = a.j - b.j

  if (x === 1) {
    a.walls[3] = false
    b.walls[1] = false
  } else if ( x === -1) {
    a.walls[1] = false
    b.walls[3] = false
  }

  if ( y === 1) {
    a.walls[0] = false
    b.walls[2] = false
  } else if ( y === -1) {
    a.walls[2] = false
    b.walls[0] = false
  }
}
