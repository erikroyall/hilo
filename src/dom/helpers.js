  // Helper Functions

  dom.prototype.each = function (fn) {
    var _i, _t;

    for (_i = 0, _t = this.length; _i < _t; _i+=1) {
      fn(this[_i]);
    }
  };
  
  dom.prototype.one = function (fn) {
    fn(this[0]);
  };
