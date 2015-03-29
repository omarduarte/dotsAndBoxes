describe('Edges that connect dots in boxes', function() {

  var edge;

  beforeEach(function() {
    edge = new dotsAndBoxes.Edge();
  });

  it('has an Edge constructor', function() {
    expect(typeof dotsAndBoxes.Edge).toBe('function');
  });

  it('starts as unmarked', function() {
    expect(edge.isMarked).toBe(false);
  });

  it('can be marked by a player', function() {
    expect(edge.isMarked).toBe(false);
    edge.mark('Player 1');
    expect(edge.isMarked).toBe(true);
  });

  it('saves state of the player that marked it', function() {
    edge.mark('Player 1');
    expect(edge.player).toBe('Player 1');
  });

  it('can notify all their contained boxes when it is marked', function() {
    var actionhasBeenActivated = false;
    
    var action = function() {
      actionhasBeenActivated = true;
    };

    edge.registerObserver(action);
    edge.mark('Player 2');
    expect(actionhasBeenActivated).toBe(true);
  });
  
});
