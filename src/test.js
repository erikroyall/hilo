  
  // --------------------------------------------------
  // Testing
  // --------------------------------------------------

  extend(hilo, {

    /**
     * Public test function
     *
     * @for hilo
     * @method test
     * @param con
     * @return {Test}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $.test("hello");
     * </pre></div>
     * 
     * <div class="code"><pre class="prettyprint">
     * $.test({
     *   name: "Erik Royall",
     *   age: 14,
     *   projects: ["hilo", "helio"]
     * });
     * </pre></div>
     * @since 0.1.0
     */
    test: function (con) {
      return new Test(con);
    }
  });

  /**
   * Main Test Class
   *
   * @constructor
   * @class Test
   * @param {Any} con To compare
   * @param {boolean} neg Whether to inverse the result
   * @return void
   * @example
   * <div class="code"><pre class="prettyprint">
   * new Test({});
   * new Test("Hilo", true);
   * </pre></div>
   * @since 0.1.0
   */
  function Test (con, neg) {
    this.con = con;
    
    if (neg) {
      this.neg = true;
    }
  }
    
  // --------------------------------------------------
  // Test Comparisions
  // --------------------------------------------------

  extend(Test.prototype, {

    /**
     * Test if equal
     *
     * @for Test
     * @method ifEquals
     * @param {Any} tw Comparision object
     * @return {boolean}
     * @example
     * <div class="code"><pre class="prettyprint">
     * var isIt = $.test(hilo.version).ifEquals("v0.1.0-pre-dev-beta-9");
     * </pre></div>
     * @since 0.1.0
     */
    ifEquals: function (tw) {
      var val = this.con === tw;
      return this.neg ? !val : val;
    },

    /**
     * Test if contains
     *
     * @for Test
     * @method ifContains
     * @param {Any} tw Comparision object
     * @return {boolean}
     * @example
     * <div class="code"><pre class="prettyprint">
     * var isHiloBeta = $.test(hilo.version).ifContains("beta");
     * </pre></div>
     * @since 0.1.0
     */
    ifContains: function (tw) {
      var ifString = this.con.split(tw).length === 1 ? false : true;
      if (typeof tw === "string" && typeof this.con === "object" && this.con.length) {

      } else if (typeof tw === "string" && typeof this.con === "string") {
        return this.neg ? !ifString : ifString;
      }
    },

    /**
     * Inverse a test
     *
     * @for Test
     * @method not
     * @return {Test}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("Hilo.js").not().ifEquals("Hilo");
     * </pre></div>
     * @since 0.1.0
     */
    not: function () {
      return new Test(this, true);
    }
  });