  
  // --------------------------------------------------
  // Animation
  // --------------------------------------------------

  /**
   * Animate a set of CSS properties given
   * 
   * @constructor
   * @class Animation
   * @private
   * @param {Object} css An object containing CSS properties
   * @param {Number} timing The timing
   * @param {Function} onanimationstart fn to exec. when animation starts
   * @param {Function} onanimationend fn to exec. when animation ends
   * @example
   * <div class="code"><pre class="prettyprint">
   * new Animation ({opacity:0});
   * </pre></div>
   * <div class="code"><pre class="prettyprint">
   * new Animation ({width:100,height:100})
   * </pre></div>
   * @since 0.1.0
   */

  function Animation (el, css, timing, onanimationstart, onanimationend) {
    if (typeof css !== "object") {
      return;
    }


  }

  function animateCss (el, prop, timing, from, to) {
    if (!(el && prop && timing && from)) {
      return;
    }

    // If `to` is not provided, treat `from` as `to`
    to = to || form;

    if (from === to) {
      var diff = to - el.style[prop];
    }
  }