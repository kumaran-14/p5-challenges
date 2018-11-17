function Tree() {
  this.root = null
}

Tree.prototype.addVal = function(n) {
  const node = new Node(n)
  if(this.root == null){
    this.root = node;
  }
  else{
    this.root.addNode(node)
  }
}

Tree.prototype.traverse = function() {
  this.root.visit()
}

Tree.prototype.search = function(n) {
  let foundNode = this.root.search(n)
  console.log(foundNode)
}