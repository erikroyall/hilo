  /**
   * Set or return CSS Property of selected el(s)
   *
   * @method css
   * @param string prop property to be set or returned
   * @param string value value to be set
   * @return object
   */

  Dom.prototype.css = function (prop, value) {
    if (value) {
      this.each(function (el) {
        el.style[prop] = value;
      });

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el.style[prop];
      });
    }
  };
  
  /**
   * Set or return width of selected el(s)
   *
   * @method width
   * @param {String|Number} prop width
   * @return {object|String}
   */

  Dom.prototype.width = function (width) {
    if (width) {
      this.each(function (el) {
        el.style.width = width;

        return new Dom(this);
      });
    } else {
      this.one(function (el) {
        return el.style.width;
      });
    }
  };
  
  /**
   * Set or return height of selected el(s)
   *
   * @method height
   * @param {String|Number} height height
   * @return {object|String}
   */

  Dom.prototype.height = function (height) {
    if (height) {
      this.each(function (el) {
        el.style.height = height;

        return new Dom(this);
      });
    } else {
      this.one(function (el) {
        return el.style.height;
      });
    }
  };
  
  /**
   * Set or return color of selected el(s)
   *
   * @method color
   * @param String color color
   * @return {object|String}
   */

  Dom.prototype.color = function (color) {
    if (color) {
      this.style('color', color);

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el.style['color'];
      });
    }
  };
  
  /**
   * Set or return background color of selected el(s)
   *
   * @method backgroundColor
   * @param String backgroundColor background color
   * @return {object|String}
   */

  Dom.prototype.backgroundColor = function (backgroundColor) {
    if (backgroundColor) {
      this.style('background-color', backgroundColor);

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el.style['background-color'];
      });
    }
  };
  
  /**
   * Set or return background prop of selected el(s)
   *
   * @method background
   * @param String background background
   * @return {object|String}
   */

  Dom.prototype.background = function (background) {
    if (background) {
      this.style('background', background);

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el.style['background'];
      });
    }
  };
  
  /**
   * Set or return margin of selected el(s)
   *
   * @method margin
   * @param {String|Number} margin margin
   * @return {object|String}
   */

  Dom.prototype.margin = function (margin) {
    if (margin) {
      this.style('margin', margin);

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el.style['margin'];
      });
    }
  };
  
  /**
   * Set or return padding of selected el(s)
   *
   * @method padding
   * @param {String|Number} padding padding
   * @return {object|String}
   */

  Dom.prototype.padding = function (padding) {
    if (padding) {
      this.style('padding', padding);

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el.style['padding'];
      });
    }
  };
  
  /**
   * Set or return font size of selected el(s)
   *
   * @method fontSize
   * @param {String|Number} fontSize font size
   * @return {object|String}
   */

  Dom.prototype.fontSize = function (fontSize) {
    if (fontSize) {
      this.style('font-size', fontSize);

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el.style['font-size'];
      });
    }
  };
