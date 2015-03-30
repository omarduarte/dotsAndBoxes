(function() {
  
  "use strict";

  var Board = function(size) {
    this.size = size;

    this.subject = new dotsAndBoxes.Observer();

    this.boxes = [];
    
    this.createAndPopulateBoxes();
    this.openBoxes = size * size;

    this.observeBoxes(this.boxes, this.onBoxClose.bind(this));

  };

  Board.prototype.createAndPopulateBoxes = function() {
    var topEdge;
    var rightEdge;
    var bottomEdge;
    var leftEdge;

    var Edge = dotsAndBoxes.Edge;
    var Box  = dotsAndBoxes.Box;

    for (var i = 0; i < this.size; i++) {
      this.boxes[i] = [];
      for (var j = 0; j < this.size; j++) {
        topEdge    = (i === 0) ? new Edge() : this.boxes[i-1][j].bottom;
        leftEdge   = (j === 0) ? new Edge() : this.boxes[i][j-1].right;
        rightEdge  = new Edge();
        bottomEdge = new Edge();

        this.boxes[i][j] = new Box([topEdge, rightEdge, bottomEdge, leftEdge]);
      }
    }
  };

  Board.prototype.onBoxClose = function(boxOwner) {
    this.openBoxes--;
    this.subject.notifyObservers(boxOwner);
  };

  Board.prototype.observeBoxes = function(boxes, action) {    
    boxes.forEach(function(rowOfBoxes) {
      rowOfBoxes.forEach(function(box) {
        box.registerObserver(action);
      });
    });
  };

  Board.prototype.registerObserver = function(action) {
    this.subject.register(action);
  };

  dotsAndBoxes.Board = Board;

})();
