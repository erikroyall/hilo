
  // Element Selections

  Dom.prototype.first = function () {
    return this[0];
  };
  
  Dom.prototype.last = function () {
    return this[this.length - 1];
  };
  
  Dom.prototype.el = function (place) {
    return this[place];
  };
  
  Dom.prototype.children = function (sel) {
    var els = [];

    this.each(function (el) {
      els = els.concat(el.querySelectorAll(sel)[0]);
    });

    return new Dom(els);
  };
