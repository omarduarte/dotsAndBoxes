(function() {

  var Observer = function() {
    this.observers = [];
  };  

  Observer.prototype.notifyObservers = function() {
    var args = Array.prototype.slice.call(arguments);
    this.observers.forEach(function(action) {
      action.apply(this, args);
    });
  };

  Observer.prototype.register = function(action) {    
    this.observers.push(action);
  };

  dotsAndBoxes.Observer = Observer;

})();
