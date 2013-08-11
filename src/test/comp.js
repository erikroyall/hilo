  
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
    }
  });