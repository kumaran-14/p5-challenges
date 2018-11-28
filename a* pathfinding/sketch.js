//2d array
const rows = 50
const cols = 50
var w, h
var grid
var start
var end
var path = []
var openSet = []
var closedSet = []
var allowDiagonals = true

function visualDist(a, b) {
  return dist(a.i, a.j, b.i, b.j);
}

function Cell(i, j) {
  this.i = i
  this.j = j
  this.f = 0
  this.g = 0
  this.h = 0
  this.vh = 0
  this.neighbours = []
  this.previous = undefined
  this.wall = false;

  if (random(1) < 0.2) {
    this.wall = true;
  }

  this.show = function(col) {
    fill(col)
    if (this.wall) {
      fill(0);
      noStroke();
      ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
    } else {
      rect(this.i * w, this.j * h, w - 1, h - 1);
    }
  }

  this.addNeighbours = function(grid){
    var i = this.i
    var j = this.j
    if(i > 0) {
      this.neighbours.push(grid[i-1][j])
    }
    if(i < rows - 1) {
      this.neighbours.push(grid[i+1][j])
    }
    if(j > 0) {
      this.neighbours.push(grid[i][j-1])
    }
    if(i < cols - 1) {
      this.neighbours.push(grid[i][j+1])
    }
    if (allowDiagonals) {
      if (i > 0 && j > 0) {
        this.neighbours.push(grid[i - 1][j - 1]);
      }
      if (i < cols - 1 && j > 0) {
        this.neighbours.push(grid[i + 1][j - 1]);
      }
      if (i > 0 && j < rows - 1) {
        this.neighbours.push(grid[i - 1][j + 1]);
      }
      if (i < cols - 1 && j < rows - 1) {
        this.neighbours.push(grid[i + 1][j + 1]);
      }
    }
  }

}


function setup() {
  createCanvas(500,500)
  grid = createGrid()
  grid = assignGrid(Cell, grid)
  assignNeighbours(grid)
  console.table(grid)
  start = grid[0][0]
  end = grid[cols-1][rows-1]
  start.wall = false
  end.wall = false
  w = width/cols
  h = height/rows
  openSet.push(start)
}

function draw() {
  if ( openSet.length > 0) {
    var winner = 0
    for ( var i = 0 ; i < openSet.length ; i++) {
      if ( openSet[i].f < openSet[winner].f ) {
        winner = i
      }
      if (openSet[i].f == openSet[winner].f) {
        if (openSet[i].g > openSet[winner].g) {
          winner = i;
        }
        if (!allowDiagonals) {
          if (openSet[i].g == openSet[winner].g && openSet[i].vh < openSet[winner].vh) {
            winner = i;
          }
        }
      }
    }
    var current = openSet[winner]
    if (current === end) {
      noLoop()
      console.log("Found the optimal path")
    }
    removeEl(openSet, current)
    closedSet.push(current)
    var neighbours = current.neighbours
    for (var i = 0; i < neighbours.length; ++i) {
      var neighbour = neighbours[i]
      if (!closedSet.includes(neighbour) && !neighbour.wall) {
        var tempG = current.g + heuristic(neighbour, current);
        var newPath = false;
        if (openSet.includes(neighbour)) {
          if (tempG < neighbour.g) {
            neighbour.g = tempG;
            newPath = true;
          }
        } else {
          neighbour.g = tempG;
          newPath = true;
          openSet.push(neighbour);
        }
        if (newPath) {
          neighbour.h = heuristic(neighbour, end);
          if (allowDiagonals) {
            neighbour.vh = visualDist(neighbour, end);
          }
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = current;
        }
      }
    }
  } else {
    //nothing happens
    console.log('no solution');
    noLoop();
    return;
  }
  path = []
  var temp = current
  path.push(temp)
  while (temp.previous) {
    path.push(temp.previous)
    temp = temp.previous
  }
  background(255)
  drawGrid()
  drawClosedSet()
  drawOpenSet()
  drawPath()
}

function createGrid() {
  var grid = new Array(cols)
  for( var i = 0 ; i < cols ; i++) {
    for ( var j = 0 ; j < rows ; j++) {
      grid[i] = new Array(rows)
    }
  }
  return grid
}

function assignGrid(Cell, grid) {
  for( var i = 0 ; i < cols ; i++) {
    for ( var j = 0 ; j < rows ; j++) {
      grid[i][j] = new Cell(i, j)
    }
  }
  return grid
}


function drawGrid() {
    for( var i = 0 ; i < rows ; i++) {
      for ( var j = 0 ; j < cols ; j++) {
        grid[i][j].show(color(255))
      }
    }
}

function drawOpenSet() {
  for( var i = 0 ; i < openSet.length ; i++) {
      openSet[i].show(color(0,255,0))
  }
}

function drawClosedSet() {
  for( var i = 0 ; i < closedSet.length ; i++) {
    closedSet[i].show(color(255,10,0))
  }
}

function removeEl(arr, node) {
  for (var i = arr.length -1 ; i >= 0; i--){
    if(arr[i] == node){
      arr.splice(i, 1);
    }
  }
}

function assignNeighbours(grid) {
  for( var i = 0 ; i < cols ; i++) {
    for ( var j = 0 ; j < rows ; j++) {
      grid[i][j].addNeighbours(grid)
    }
  }
}

function heuristic(a, b) {
  return allowDiagonals ? dist(a.i, a.j, b.i, b.j) : (abs(a.i - b.i) + abs(a.j - b.j))
}

function drawPath(){
  noFill();
  stroke(255, 0, 200);
  strokeWeight(w / 2);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
  }
  endShape();
}