(function() {

  var render = {
    gameStart : gameStart,
    playerScores: playerScores,
    currentTurn: currentTurn,
    board: board,
    box: box,
    edge: edge,    
    winner: winner
  };


  function gameStart(game) {
    render.board(game);
  }

  function board(game) {
    var $boardRow;
    var $box;
    var box;
    var boxes = game.board.boxes;

    for (var i = 0; i < game.board.size; i++) {      
      $boardRow = $('<div></div>').addClass('row').appendTo('.board');      
      for (var j = 0; j < game.board.size; j++) {
        $box = render.box($boardRow);
        box = boxes[i][j];

        if (i === 0) render.edge($box, box.top, 'top', game);
        if (j === 0) render.edge($box, box.left, 'left', game);
        render.edge($box, box.right, 'right', game);
        render.edge($box, box.bottom, 'bottom', game);
      }
    }
  }

  function box($row) {
    var $box = $('<div></div>').addClass('box').appendTo($row);

    return $box;
  }

  function edge($box, edge, location, game) {    
    var $edge = $('<div></div>').addClass('edge ' + location).appendTo($box);
    
    $edge.on('click', function() {              
      if(game.mark(edge)) $edge.addClass('marked');      
    });
  }  

  function playerScores(player, score) {
    //TODO: Refactor for more than 2 players
    $('.' + player).find('.score').text(score);
  }

  function currentTurn(player) {    
    $('.game-status').text('It is ' + player + '\'s turn');
  }

  function winner(winner) {
    if(winner) {
      $('.game-status').text(winner + ' is the winner!');
    } else {
      $('.game-status').text('It\'s a tie!');
    }
  }

  dotsAndBoxes.render = render;

})();