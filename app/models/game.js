(function() {

  "use strict";

  var Player = function(name) {
    this.name  = name;
    this.score = 0;
    this.moves = 0;

    this.makeMove = function(move, next) {
      move();
      this.moves--;
      next();
    };

    this.boxClosed = function() {      
      this.score++;
      this.newTurn();
    };

    this.newTurn = function() {
      this.moves++;
    };
  };

  var Game = function(players, boardSize) {
    this.players = (players || ['Player 1', 'Player 2']).map(function(name) {
      return new Player(name);
    });

    this.currentPlayer = 0;
    this.boardSize = boardSize || 4;
    this.subject = new dotsAndBoxes.Observer();

    this.boxHasClosed = false;
    this.winner = null;

    this.board = new dotsAndBoxes.Board(this.boardSize);
    this.board.registerObserver(this.onBoxClose.bind(this));    
  };
  
  Game.prototype.start = function() {
    this.players[this.currentPlayer].nextTurn();
  };

  Game.prototype.nextTurn = function() {
    if (this.players[this.currentPlayer].moves === 0) {      
      this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
      this.players[this.currentPlayer].newTurn();        
    }
  };

  Game.prototype.onBoxClose = function(player) {    
    this.boxHasClosed = true;
    player.boxClosed();    
    if (this.board.openBoxes === 0) {
      this.gameOver();
    }
  };

  Game.prototype.gameOver = function() {    
    this.winner = this.players.reduce(function(prev, next) {
      return (prev.score > next.score) ? prev : next;
    });
  };

  dotsAndBoxes.Game = Game;

})();
