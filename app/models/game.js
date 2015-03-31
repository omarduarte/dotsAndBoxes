(function() {

  "use strict";

  var Game = function(players, boardSize) {
    this.players = (players || ['player1', 'player2']).map(function(name) {
      return new dotsAndBoxes.Player(name);
    });

    this.currentPlayer = 0;
    this.boardSize = boardSize || 4;
    
    // Able to register an observer per action.
    this.subject = {
      'score'  : new dotsAndBoxes.Observer(),
      'turn'   : new dotsAndBoxes.Observer(),
      'gameEnd': new dotsAndBoxes.Observer()
    };
    
    this.winner = null;

    this.board = new dotsAndBoxes.Board(this.boardSize);
    this.board.registerObserver(this.onBoxClose.bind(this)); 
  };
  
  Game.prototype.start = function() {
    var player = this.players[this.currentPlayer];
    player.newTurn();
    this.onNewTurn(player);
  };

  Game.prototype.nextTurn = function() {
    if (this.players[this.currentPlayer].moves === 0) {
      this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
      this.players[this.currentPlayer].newTurn();
      this.onNewTurn(this.players[this.currentPlayer]);
    }
  };

  Game.prototype.onBoxClose = function(player) {        
    player.boxClosed();
    this.onPlayerScore(player);
    if (this.board.openBoxes === 0) {
      this.gameOver();
    }
  };

  Game.prototype.gameOver = function() {
    //TODO: Refactor for more than 2 players:
    var players = this.players;
    if(players[0].score !== players[1].score) {
      this.winner = (players[0].score > players[1].score) ? players[0] : players[1];
    }

    this.onGameEnd(this.winner);
  };
  
  Game.prototype.mark = function(edge) {
    var player = this.players[this.currentPlayer];
    
    if(edge.mark(player)) {
      player.makeMove(this.nextTurn.bind(this));
      return true;
    }
  };

  Game.prototype.registerObserver = function(type, action) {    
    this.subject[type].register(action);
  };

  Game.prototype.onNewTurn = function(player) {    
    this.subject.turn.notifyObservers(player.name);
  };

  Game.prototype.onPlayerScore = function(player) {
    this.subject.score.notifyObservers(player.name, player.score);
  };

  Game.prototype.onGameEnd = function(winner) {
    // Winner = null or the winner's name
    winner = winner && winner.name
    this.subject.gameEnd.notifyObservers(winner);
  };

  dotsAndBoxes.Game = Game;

})();
