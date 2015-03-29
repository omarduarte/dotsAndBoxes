(function() {

  var Edge = function() {
    this.isMarked  = false;
    this.player    = null;    
    this.subject   = new dotsAndBoxes.Observer();
  };

  Edge.prototype.mark = function(player) {
    if (!this.isMarked && player) {
      this.player = player;
      this.isMarked  = true;
      this.subject.notifyObservers(player);
    }
  };

  Edge.prototype.registerObserver = function(action) {    
    this.subject.register(action);
  };

  dotsAndBoxes.Edge = Edge;

})();
