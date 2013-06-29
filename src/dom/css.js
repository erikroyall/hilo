
  // CSS

  dom.prototype.css = function (prop, value) {
    this.each(function (el) {
      el.style[prop] = value;
    });

    return new dom(this);
  };
  
  dom.prototype.width = function (width) {
    if (width) {
      this.each(function (el) {
        el.style.width = width;

        return new dom(this);
      });
    } else {
      this.one(function (el) {
        return el.style.width;
      });
    }
  };
  
  dom.prototype.height = function (height) {
    if (height) {
      this.each(function (el) {
        el.style.height = height;

        return new dom(this);
      });
    } else {
      this.one(function (el) {
        return el.style.height;
      });
    }
  };
  
  dom.prototype.color = function (color) {
    if (color) {
      this.style('color', color);

      return new dom(this);
    } else {
      this.one(function (el) {
        return el.style['color'];
      });
    }
  };
  
  dom.prototype.backgroundColor = function (backgroundColor) {
    if (backgroundColor) {
      this.style('background-color', backgroundColor);

      return new dom(this);
    } else {
      this.one(function (el) {
        return el.style['background-color'];
      });
    }
  };
  
  dom.prototype.background = function (background) {
    if (background) {
      this.style('background', background);

      return new dom(this);
    } else {
      this.one(function (el) {
        return el.style['background'];
      });
    }
  };
  
  dom.prototype.margin = function (margin) {
    if (margin) {
      this.style('margin', margin);

      return new dom(this);
    } else {
      this.one(function (el) {
        return el.style['margin'];
      });
    }
  };
  
  dom.prototype.padding = function (padding) {
    if (padding) {
      this.style('padding', padding);

      return new dom(this);
    } else {
      this.one(function (el) {
        return el.style['padding'];
      });
    }
  };
  
  dom.prototype.fontSize = function (fontSize) {
    if (fontSize) {
      this.style('font-size', fontSize);

      return new dom(this);
    } else {
      this.one(function (el) {
        return el.style['font-size'];
      });
    }
  };
