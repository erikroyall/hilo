  
  // --------------------------------------------------
  // Hilo DOM
  // --------------------------------------------------

  /**
   * Main DOM Class
   * 
   * @class Dom
   * @constructor
   * @param {array} els The elements to manipulate
   * @param {string} sel The selector used
   * @return void
   * @example
   * <div class="code"><pre class="prettyprint">
   * new Dom (document.querySelectorAll(p:first-child);
   * new Dom ([document.createElement("div")]);
   * new Dom ([document.getElementByid("box")]);
   * new Dom (document.getElementsByClassName("hidden"));
   * new Dom (document.getElementsByTagName("mark"));
   * </pre></div>
   * @since 0.1.0
   */
  function Dom (els, sel) {
    var _i, _l;

    // Note that `this` is an object and"
    // NOT an Array

    // Loop thorugh the NodeList and set
    // this[index] for els[index]

    for (_i = 0, _l = els.length; _i < _l; _i += 1) {
      this[_i] = els[_i];
    }

    // Useful for looping through as ours
    // is an object and not an array

    this.length = els.length;

    // Know what selector is used to select
    // the elements

    this.sel = sel;
  }

  Dom.prototype = Array.prototype;