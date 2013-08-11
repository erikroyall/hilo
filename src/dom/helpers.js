  
  // --------------------------------------------------
  // Helper Functions
  // --------------------------------------------------

  extend(Dom.prototype, {

    /**
     * Execute a function on selected elements
     * 
     * @for Dom
     * @method each
     * @param {function} fn The function to be called on
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").each(function (el) {
     *   doSomethingWith(e);
     * });
     * </pre></div>
     * @since 0.1.0
     */
    each: function (fn) {
      this.map(fn);
      return this; // return the current Dom instance
    },

    /**
     * Return the results of executing a function 
     * on all the selected elements
     * 
     * @for Dom
     * @method map
     * @param {function} fn The function to be called on
     * @return {array} The results of execution
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div.need-cf").map(function (e) {
     *   doSomethingWith(e);
     * });
     * </pre></div>
     * @since 0.1.0
     */
    map: function (fn) {
      var results = [], _i, _l;
      for (_i = 0, _l = this.length; _i < _l; _i += 1) {
        results.push(fn.call(this, this[_i], _i));
      }
      return results;
    },

    /**
     * Map on selected elements and return them based 
     * on the number of selected elements
     * 
     * @for Dom
     * @method one
     * @param {function} fn Function to be called on
     * @return {Any|array}
     * @since 0.1.0
     */
    one: function (fn) {
      var m = this.map(fn);
      return m.length > 1 ? m : m[0];
    },

    /**
     * Execute a function on the first selected element
     * 
     * @for Dom
     * @method first
     * @param {function} fn The function to be called
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div").first(function (e) {
     *   console.log(e + " is the first div");
     * });
     * </pre></div>
     * @since 0.1.0
     */
    first: function (fn) {
      return fn(this[0]);
    },

    /**
     * Filters the selected elements and returns the 
     * elements that pass the test (or return true)
     * 
     * @for Dom
     * @method filter
     * @param {function} fn The filter function
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div").filter(function (el) {
     *   return el.className.split("hidden").length > 1;
     * });
     * </pre></div>
     * @since 0.1.0
     */
    filter: function (fn) {
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
          if (fn.call(this, val, _i, t)) {
            res.push(val);
          }
        }
      }

      return new Dom(res);
    }
  });