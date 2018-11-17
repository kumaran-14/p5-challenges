
function Graph() {
  this.graph = {}
}

Graph.prototype.addNode = function(n) {
  this.graph[n.value] = n
}

Graph.prototype.getNode = function(n) {
  return this.graph[n]
}

Graph.prototype.setStart = function(val) {
  this.start = this.graph[val]
}

Graph.prototype.setEnd = function(val) {
  this.end = this.graph[val]
}