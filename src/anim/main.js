  
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
   * new Animation ({width:100,height:100})
   * </pre></div>
   * @since 0.1.0
   */

  function Animation (css, timing, onanimationstart, onanimationend) {
    if (typeof css !== "object") {
      return;
    }

    
  }