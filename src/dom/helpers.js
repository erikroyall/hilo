  
  // --------------------------------------------------
  // Helper Functions
  // --------------------------------------------------

  extend(Dom.prototype, {

    // -------------------------
    // .each()
    // -------------------------
    // 
    // Just like .map() but returns the current Dom instance
    // 
    // .each ( fn ) 
    //   fn (function) : The function to be called
    //
    // Example:
    // 
    // $("p").each (function (el) {
    //   doSomethingWith(e);
    // });
    // 

    each: function (fn) {
      this.map(fn);
      return this; // return the current Dom instance
    },

    // -------------------------
    // .map()
    // -------------------------
    // 
    // Return the results of executing a function on all the selected elements
    // 
    // .map( fn )
    //    fn (function) : The function to be called
    //
    // Example:
    // 
    // $("div.need-cf").map(function (e) {
    //   doSomethingWith(e);
    // });
    // 

    map: function (fn) {
      var results = [], _i, _l;
      for (_i = 0, _l = this.length; _i < _l; _i += 1) {
        results.push(fn.call(this, this[_i], _i));
      }
      return results;
    },

    // -------------------------
    // .one()
    // -------------------------
    // 
    // .map fn on selected elements and return them based on length
    //

    one: function (fn) {
      var m = this.map(fn);
      return m.length > 1 ? m : m[0];
    },

    // -------------------------
    // .first()
    // -------------------------
    // 
    // Return the results of executing a function on all the selected elements
    // 
    // .first( fn )
    //    fn (function) : The function to be called
    //
    // Example:
    // 
    // $("div").first(function (e) {
    //   console.log(e + " is the first div");
    // });
    // 

    first: function (fn) {
      return (this.map(fn))[0];
    },

    // -------------------------
    // .filter()
    // -------------------------
    // 
    // Filters the selected elements and returns the
    // elements that pass the test (or return true)
    // 
    // .filter( fn )
    //    fn (function) : The function to be called
    // 
    // Example:
    // 
    // Filter to find divs with className hidden
    // 
    // $("div").filter(function (el) {
    //   return el.className.split("hidden").length > 1;
    // });
    // 

    filter: function (fun) {
      var len = this.length >>> 0
        , _i
        , t = Object(this)
        , res = []
        , val;

      for (_i = 0; _i < len; _i++)
      {
        if (_i in t)
        {
          val = t[_i];
          if (fun.call(this, val, _i, t)) {
            res.push(val);
          }
        }
      }

      return new Dom(res);
    }
  });