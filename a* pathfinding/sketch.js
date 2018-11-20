//2d array
const rows = 5
const cols = 5
let w, h
let grid
let start
let end
let openSet = []
let closedSet = []

function Cell(i, j) {
  this.i = i
  this.j = j
  this.f = 0
  this.g = 0
  this.h = 0
  this.show = function() {
    fill(col)
    noStoke()
    rect( this.i*w, this.i*h, w-1, h-1 )
  }
}


function setup() {
  createCanvas(500,500)
  grid = createGrid()
  grid = assignGrid(Cell, grid)
  start = grid[0][0]
  end = grid[cols-1][rows-1]
  w = width/cols
  h = height/rows
  console.log(grid)

}

function draw() {
  background(50, 50, 50)
  openSet.push(start)
  while ( openSet.length > 0) {
    let winner = 0
    for ( let i = 0 ; i < openSet.length ; i++) {
      if ( openSet[i].f < openSet[winner].f ) {
        winner = i
      }
    }
    let current = openSet[winner]
    if (current == end) {
      console.log("Found the optimal path")
      return reconstructPath(cameFrom, current)
    }
  }
  // drawGrid()

}

















































function createGrid() {
  let grid = new Array(cols)
  for( let i = 0 ; i < cols ; i++) {
    for ( let j = 0 ; j < rows ; j++) {
      grid[i] = new Array(rows)
    }
  }
  return grid
}

function assignGrid(Func, grid) {
  // console.log(val, grid, 5)
  for( let i = 0 ; i < cols ; i++) {
    for ( let j = 0 ; j < rows ; j++) {
      grid[i][j] = new Func(i, j)
    }
  }
  return grid
}

// function reconstructPath(cameFrom, current) {
//   let path = []
//   path.push(current)
//   while (path.length > 0) {
//     let temp = current.parent
//     path.push(temp)
//   }
//   return path
// }

function drawGrid() {
    // console.log(val, grid, 5)
    for( let i = 0 ; i < cols ; i++) {
      for ( let j = 0 ; j < rows ; j++) {
        // grid[i][j].show(color(0,0,255))
      }
    }

}