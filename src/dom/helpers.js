  // Helper Functions

  dom.prototype.each = function (fn) {
    this.map(fn);
    return this;
  };

  dom.prototype.map = function () {
    var results = [], _i;
    for (_i = 0; _i < this.length; _i++) {
      results.push(callback.call(this, this[_i], _i));
    }
    return results;
  }
  
  dom.prototype.one = function (fn) {
    var m = this.map(callback);
    return m.length > 1 ? m : m[0];
  };
