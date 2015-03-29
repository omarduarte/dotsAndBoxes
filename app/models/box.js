(function() {

  var Box = function(edges) {
    this.top    = edges[0];
    this.right  = edges[1];
    this.bottom = edges[2];
    this.left   = edges[3];

    this.subject = new dotsAndBoxes.Observer();

    this.openEdges = 4;
    this.isOpen = true;

    this.owner = null;
    
    this.observeEdges(edges, this.onClosedEdge);
  };

  Box.prototype.observeEdges = function(edges, action) {
    var _this = this;
    edges.forEach(function(edge) {      
      edge.registerObserver(action.bind(_this));
    });
  };

  Box.prototype.onClosedEdge = function(player) {    
    this.openEdges--;
    if (this.openEdges === 0) {
      this.isOpen = false;
      this.owner = player;
      this.subject.notifyObservers(this.owner);
    }
  };

  Box.prototype.registerObserver = function(action) {
    this.subject.register(action);
  };

  dotsAndBoxes.Box = Box;

})();
