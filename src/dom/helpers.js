  
  /* Helper Functions */

  // Just like map, but returns the new Dom object

  Dom.prototype.each = function (fn) {
    this.map(fn);
    return this;
  };

  // Return the results of executing a function on all the selected elements

  Dom.prototype.map = function (fn) {
    var results = [], _i, _l;
    for (_i = 0, _l = this.length; _i < _l; _i += 1) {
      results.push(fn.call(this, this[_i], _i));
    }
    return results;
  };

  // Map on the first element
  
  Dom.prototype.one = function (fn) {
    var m = this.map(fn);
    return m.length > 1 ? m : m[0];
  };

  // Filters the selected elements and returns the
  // elements that pass the test (or return true)

  Dom.prototype.filter = function (fun) {
    var len = this.length >>> 0
      , _i
      , t = Object(this)
      , res = []
      , val;

    for (_i = 0; _i < len; _i++)
    {
      if (_i in t)
      {
        val = t[_i]; // in case fun mutates this
        if (fun.call(this, val, _i, t)) {
          res.push(val);
        }
      }
    }

    return new Dom(res);
  };