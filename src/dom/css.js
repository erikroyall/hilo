  
  // --------------------------------------------------
  // Hilo CSS
  // --------------------------------------------------

  // Set a css prop. to s.el.
  // 
  // Syntax .css( prop [, value] )
  //
  // Examples:
  // 
  // $(selector).css("background-color", "#444")
  // var fontColor = $(selector).css("color")
  //

  Dom.prototype.css = function (prop, value) {
    if (value) { // If value arg. is given
      return this.each(function (el) {
        el.style[prop] = value; // Set CSS prop. to value
      });
    } else { // Otherwise, if value arg. is not given
      return this.one(function (el) {
        return el.style[prop]; // Return the style of that element
      });
    }
  };

  // Important CSS Properties
  //
  // Important CSS methods that are provided as public methods
  //

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
  
  for(_i; _i < impCss; _i += 1) {
    Dom.prototype[impCss[_i]] = function (val) {
      this.css(impCss[_i], val);
    };
  }

  // Get computed style of the first element

  Dom.prototype.computed = function (prop) {
    return this.one(function (el) {
      return win.getComputedStyle(el)[prop];
    });
  };

  Dom.prototype.outerWidth = function () {
    return parseFloat(this.computed("width")) + 
    parseFloat(this.computed("paddingLeft")) + 
    parseFloat(this.computed("paddingRight")) + 
    parseFloat(this.computed("borderLeft")) + 
    parseFloat(this.computed("borderRight")) + "px";
  };

  Dom.prototype.innerWidth = function () {
    return parseFloat(this.computed("width")) + 
    parseFloat(this.computed("paddingLeft")) + 
    parseFloat(this.computed("paddingRight")) + "px";
  };

  Dom.prototype.outerHeight = function () {
    return parseFloat(this.computed("height")) + 
    parseFloat(this.computed("paddingTop")) + 
    parseFloat(this.computed("paddingBottom")) + 
    parseFloat(this.computed("borderTop")) + 
    parseFloat(this.computed("borderBottom")) + "px";
  };

  Dom.prototype.innerHeight = function () {
    return parseFloat(this.computed("height")) + 
    parseFloat(this.computed("paddingTop")) + 
    parseFloat(this.computed("paddingBottom")) + "px";
  };