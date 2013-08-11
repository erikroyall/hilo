  
  // --------------------------------------------------
  // DOM Extensions
  // --------------------------------------------------

  /**
   * Get a NodeList of selected elements
   * 
   * @for Dom
   * @method get
   * @return {Dom}
   * @example
   * <div class="code"><pre class="prettyprint">
   * $("script").get();
   * </pre></div>
   * @since 0.1.0
   */
  Dom.prototype.get = function () {
    var els = [];

    this.each(function (el) {
      els.push(el);
    });

    return els;
  };