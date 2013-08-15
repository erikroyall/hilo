  
  // --------------------------------------------------
  // Hilo CSS
  // --------------------------------------------------

  function unhyph (prop) {
    return prop.replace(/-(.)/g, function (m, m1) {
      return m1.toUpperCase();
    });
  }

  function unitize (unit, prop) {
    var pixel = {
      "width": true,
      "maxWidth": true,
      "minWidth": true,

      "height": true,
      "maxHeight": true,
      "minHeight": true,

      "borderWidth": true,
      "borderTopWidth": true,
      "borderLeftWidth": true,
      "borderBottomWidth": true,
      "borderRightWidth": true,
      "borderRadius": true,

      "outlineWidth": true,
      "outlineOffset": true,
      "strokeWidth": true,

      "fontSize": true,
      "lineHeight": true,
      "letterSpacing": true,
      "textIndent": true,
      "textUnderlineWidth": true,

      "margin": true,
      "marginTop": true,
      "marginLeft": true,
      "marginBottom": true,
      "marginRight": true,

      "padding": true,
      "paddingTop": true,
      "paddingLeft": true,
      "paddingBottom": true,
      "paddingRight": true,

      "top": true,
      "left": true,
      "bottom": true,
      "right": true
    };

    if (typeof unit === "string") {
      return unit;
    }

    if (pixel[prop] === true) {
      return unit + "px";
    }

    return unit;
  }

  extend(Dom.prototype, {

    /**
     * Set or return css property
     *
     * @for Dom
     * @method css
     * @param {String|Object} prop Name of property | Properties
     * @param {string} value Value of property
     * @return {string|void}
     * @beta
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").css("margin-left", "10em");
     * 
     * $("p.round").css({
     *   "border-radius": 10,
     *   width: 100
     * });
     * </pre></div>
     * @since 0.1.0
     */
    css: function (prop, value) {
      var unhyphed;

      if (typeof prop === "string") {
        unhyphed = unhyph(prop);

        if (value) {
          return this.each(function (el) {
            el.style[unhyphed] = unitize(value, unhyphed);
          });
        } else {
          return this.first(function (el) {
            return el.style[unhyphed];
          });
        }
      } else if (typeof prop === "object") {
        forIn(prop, function (pr) {
          unhyphed = unhyph(pr);

          this.each(function (el) {
            el.style[unhyphed] = unitize(prop[pr], unhyphed);
          });
        }, this);
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