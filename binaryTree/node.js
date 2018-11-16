function Node(val) {
  this.val = val
  this.left = null
  this.right = null
}

Node.prototype.addNode = function(node) {
  if (node.val < this.val){
    if(this.left == null){
      this.left = node
    }
    else{
      this.left.addNode(node)
    }
  }
  else if (node.val > this.val){
    if(this.right == null){
      this.right = node
    }
    else{
      this.right.addNode(node)
    }
  }
}

Node.prototype.visit = function() {
  if(this.left == null){
    console.log(this.val)
  }
  else{
    this.left.visit()
  }
  if(this.right == null){
    console.log(this.val)
  }
  else{
    this.right.visit()
  }
}

Node.prototype.search = function(n){
  if(this.val == n )
    return this
  else if (this.val > n && this.left != null)
    return this.left.search(n)
  else if(this.val < n && this.right != null)
    return this.right.search(n)
  else
    return null
}