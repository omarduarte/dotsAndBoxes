describe('Boxes that are in the board', function() {

  var Box;
  var edges;
  var Edge;

  beforeEach(function() {
    Edge = dotsAndBoxes.Edge;
    edges = [new Edge(), new Edge(), new Edge(), new Edge()];
    Box = dotsAndBoxes.Box;
  });

  it('has a Box constructor', function() {
    expect(typeof dotsAndBoxes.Box).toBe('function');
  });  

  it('has an edge for top, right, bottom, and left', function() {    
    var box = new Box(edges);

    expect(box.top instanceof Edge).toBe(true);
    expect(box.right instanceof Edge).toBe(true);
    expect(box.bottom instanceof Edge).toBe(true);
    expect(box.left instanceof Edge).toBe(true);
  });

  it('has starts as open when one or more sides are unmarked', function() {
    var box = new Box(edges);
    expect(box.isOpen).toBe(true);
  });

  it('observes if any of the sides has been marked', function() {
    var box = new Box(edges);
    var edgeHasBeenMarked = false;
    var edge = new Edge();

    box.observeEdges([edge], function() {
      edgeHasBeenMarked = true;
    });

    edge.mark('Player 1');

    expect(edgeHasBeenMarked).toBe(true);
  });

  it('it closes a side when an edge is marked', function() {
    var box = new Box(edges);

    box.top.mark('Player 1');

    expect(box.openEdges).toBe(3);
  });

  describe('When closing the box: ', function() {
    var box;

    beforeEach(function() {
      box = new Box(edges);

      box.top.mark('Player 1');
      box.right.mark('Player 2');
      box.bottom.mark('Player 1');      
    });

    it('it closes the box when all of the sides are marked', function() {
      box.left.mark('Player 2');
      expect(box.openEdges).toBe(0);
      expect(box.isOpen).toBe(false);
    });

    it('it belongs to the player that marked the last edge', function() {
      box.left.mark('Player 2');
      expect(box.owner).toBe('Player 2');
    });

    it('can notify its observers when the box is closed', function() {
      var observerHasBeenNotified = false;

      box.registerObserver(function() {
        observerHasBeenNotified = true;
      })

      box.left.mark('Player 2');
      expect(observerHasBeenNotified).toBe(true);

    });

  });

});
