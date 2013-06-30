
  // CSS

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
