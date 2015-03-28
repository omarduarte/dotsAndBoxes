(function() {

  var Edge = function() {
    this.isMarked = false;
    this.player   = null;    
    this.observers = [];
  };

  Edge.prototype.mark = function(player) {
    if (!this.isMarked && player) {
      this.player = player;
      this.isMarked  = true;
      this.notify();
    }
  };

  Edge.prototype.notify = function() {
    this.observers.forEach(function(action) {
      action();
    });
  };

  Edge.prototype.register = function(action) {
    this.observers.push(action);
  };

  dotsAndBoxes.Edge = Edge;

})();
