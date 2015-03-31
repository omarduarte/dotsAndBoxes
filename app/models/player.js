(function() {

  'use strict';

  var Player = function(name) {
    this.name  = name;
    this.score = 0;
    this.moves = 0;

  };

  Player.prototype.makeMove = function(next) {      
    this.moves--;
    next();
  };

  Player.prototype.boxClosed = function() {      
    this.score++;
    this.newTurn();
  };

  Player.prototype.newTurn = function() {
    this.moves++;
  };
  
  dotsAndBoxes.Player = Player;

})();
