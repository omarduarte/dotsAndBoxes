describe('The board that holds the game boxes and edges', function() {
  var board;

  beforeEach(function() {
    board = new dotsAndBoxes.Board(4);
  });

  it('has a Board constructor', function() {
    expect(typeof dotsAndBoxes.Box).toBe('function');
  });

  it('has a size of 4', function() {
    expect(board.size).toBe(4);
  });

  it('has 16 boxes', function() {
    var firstRow = board.boxes[0];
    var lastRow = board.boxes[3];

    expect(firstRow.length).toBe(4);
    expect(lastRow.length).toBe(4);

    expect(firstRow[0] instanceof dotsAndBoxes.Box).toBe(true);
  });

  it('has adjacent boxes that share edges', function() {
    expect(board.boxes[0][0].right).toBe(board.boxes[0][1].left);
  });

  it('informs observers when a box is closed', function() {
    var observerHasBeenNotified = false;

    board.registerObserver(function() {
      observerHasBeenNotified = true;
    });

    board.boxes[0][0].close('Player 1');

    expect(observerHasBeenNotified).toBe(true);
  });

});