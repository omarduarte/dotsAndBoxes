describe('Dots and Boxes game', function() {  

  var game;
  var dummyFn = function(){};
  var Game = dotsAndBoxes.Game;

  it('has a Game constructor', function() {
    expect(typeof Game).toBe('function');
  });

  it('defaults to 2 players, but may have more', function() {
    var gameWith2Players = new Game(['1','2','3']);
    expect(gameWith2Players.players.length).toBe(3);

    var gameWith1Player = new Game();
    expect(gameWith1Player.players.length).toBe(2);
  });

  it('has a customizable board size that defaults to 4x4', function() {
    var gameWith6x6Board = new Game(['Player 1', 'Player 2'], 6);
    expect(gameWith6x6Board.boardSize).toBe(6);

    var gameWith4x4Board = new Game(['Player 1', 'Player 2']);
    expect(gameWith4x4Board.boardSize).toBe(4);
  });  

  describe('Score', function() {    
    it('increases the player\'s score when the player closes a box', function() {
      game = new Game();
      player = game.players[0];
      expect(player.score).toBe(0);
      
      player.newTurn();
      game.board.boxes[0][0].close(player);
      player.makeMove(game.nextTurn.bind(game));

      expect(player.score).toBe(1);      
    });
  });

  describe('Logic', function() {

    beforeEach(function() {
      game = new Game();
    })

    it('starts with player 1', function() {      
      expect(game.currentPlayer).toBe(0);
    });

    it('allows each player to have one move on each turn', function() {
      game.players[0].newTurn();
      expect(game.players[0].moves).toBe(1);
    });

    it('registers a move when a player marks an edge', function() {
      var player = game.players[0];

      player.newTurn();
      expect(player.moves).toBe(1);

      player.makeMove(dummyFn);
      expect(player.moves).toBe(0);
    });    

    it('allows the next player to move after the previous player is out of moves', function() {
      var player = game.players[0];

      player.newTurn();
      expect(game.currentPlayer).toBe(0);
      player.makeMove(game.nextTurn.bind(game));
      expect(game.currentPlayer).toBe(1);
      
    });

    it('allows a player to have an additional move if they close a box', function() {
      var player = game.players[0];

      player.newTurn();
      expect(player.moves).toBe(1);
      game.board.boxes[0][0].close(player);
      player.makeMove(game.nextTurn.bind(game));

      expect(game.players[game.currentPlayer]).toBe(player);
      expect(player.moves).toBe(1);
    });
    
  });

  describe('Game end', function() {
    var game = new Game(['Player 1', 'Player 2'], 2);
    var player1 = game.players[0];
    var player2 = game.players[1];

    game.board.boxes[0][0].close(player1);
    game.board.boxes[0][1].close(player2);
    game.board.boxes[1][0].close(player1);

    it('selects a winner when the last box is closed', function() {
      game.board.boxes[1][1].close(player1);
      expect(game.winner).toBe(player1);
    });

  });
});
