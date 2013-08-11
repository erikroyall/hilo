  
  // --------------------------------------------------
  // Hilo CSS
  // --------------------------------------------------

  extend(Dom.prototype, {

    /**
     * Set or return css property
     *
     * @for Dom
     * @method css
     * @param {string} prop Name of property
     * @param {string} value Value of property
     * @return {string|void}
     * @beta
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").css("marginLeft", "10em");
     * </pre></div>
     * @since 0.1.0
     */
    css: function (prop, value) {
      if (value) { // If value arg. is given
        return this.each(function (el) {
          el.style[prop] = value; // Set CSS prop. to value
        });
      } else { // Otherwise, if value arg. is not given
        return this.one(function (el) {
          return el.style[prop]; // Return the style of that element
        });
      }
    }
  });

  (function () {

    var cssObj = {}
      , impCss;

    impCss = [
      "width",
      "height",
      "fontFamily",
      "fontWeight",
      "fontDecoration",
      "textAlign",
      "textTransform",
      "color",
      "backgroundColor",
      "background",
      "margin",
      "padding",
      "top",
      "left",
      "bottom",
      "right"
    ];
    
    for (_i = 0; _i < impCss.length; _i += 1) {
      cssObj[impCss[_i]] = function (val) {
        return this.css(impCss[_i], val);
      };
    }

    extend(Dom.prototype, cssObj);

  }());

  // Get computed style of the first element

  extend(Dom.prototype, {

    /**
     * Get computed property
     * 
     * @for Dom
     * @method computed
     * @param {string} prop Name of property
     * @return {number|boolean|string}
     * @beta
     * @since 0.1.0
     */
    computed: function (prop) {
      return this.one(function (el) {
        return win.getComputedStyle(el)[prop];
      });
    },

    outerWidth: function () {
      return parseFloat(this.computed("width")) + 
      parseFloat(this.computed("paddingLeft")) + 
      parseFloat(this.computed("paddingRight")) + 
      parseFloat(this.computed("borderLeft")) + 
      parseFloat(this.computed("borderRight")) + "px";
    },

    innerWidth: function () {
      return parseFloat(this.computed("width")) + 
      parseFloat(this.computed("paddingLeft")) + 
      parseFloat(this.computed("paddingRight")) + "px";
    },

    outerHeight: function () {
      return parseFloat(this.computed("height")) + 
      parseFloat(this.computed("paddingTop")) + 
      parseFloat(this.computed("paddingBottom")) + 
      parseFloat(this.computed("borderTop")) + 
      parseFloat(this.computed("borderBottom")) + "px";
    },

    innerHeight: function () {
      return parseFloat(this.computed("height")) + 
      parseFloat(this.computed("paddingTop")) + 
      parseFloat(this.computed("paddingBottom")) + "px";
    }
  });