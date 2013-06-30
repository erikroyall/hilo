  // Helper Functions

  Dom.prototype.each = function (fn) {
    this.map(fn);
    return this;
  };

  Dom.prototype.map = function (fn) {
    var results = [], _i;
    for (_i = 0; _i < this.length; _i++) {
      results.push(fn.call(this, this[_i], _i));
    }
    return results;
  };
  
  Dom.prototype.one = function (fn) {
    var m = this.map(fn);
    return m.length > 1 ? m : m[0];
  };
