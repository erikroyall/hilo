  
  // --------------------------------------------------
  // Hilo CSS
  // --------------------------------------------------

  extend(Dom.prototype, {

    // --------------------------------------------------
    // .css()
    // --------------------------------------------------
    // 
    // Set a css prop. to s.el.
    // 
    // Syntax .css( prop [, value] )
    //
    // Examples:
    // 
    // $(selector).css("background-color", "#444")
    // var fontColor = $(selector).css("color")
    // 

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