window.dotsAndBoxes = {};

$(function() {
    var game = new dotsAndBoxes.Game();
    
    dotsAndBoxes.render.gameStart(game);

    game.registerObserver('score', function(name, score) {
      dotsAndBoxes.render.playerScores(name, score);
    });

    game.registerObserver('turn', function(player) {
      dotsAndBoxes.render.currentTurn(player);
    });

    game.registerObserver('gameEnd', function(winner) {
      dotsAndBoxes.render.winner(winner);
    });

    game.start();
});
