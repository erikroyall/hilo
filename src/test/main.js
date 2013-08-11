  
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