
  // Element Selections

  dom.prototype.first = function () {
    return this[0];
  };
  
  dom.prototype.last = function () {
    return this[this.length - 1];
  };
  
  dom.prototype.el = function (place) {
    return this[place];
  };
  
  dom.prototype.children = function (sel) {
    var els = [];

    this.each(function (el) {
      els = els.concat(el.querySelectorAll(sel)[0]);
    });

    return new dom(els);
  };