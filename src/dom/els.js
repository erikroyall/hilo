
  // Element Selections

  Dom.prototype.first = function () {
    return new Dom([this[0]]);
  };
  
  Dom.prototype.last = function () {
    return new Dom([this[this.length - 1]]);
  };
  
  Dom.prototype.el = function (place) {
    return new Dom([this[place - 1]]);
  };
  
  Dom.prototype.children = function (sel) {
    var els = [];

    this.each(function (el) {
      els = els.concat(el.querySelectorAll(sel)[0]);
    });

    return new Dom(els);
  };

  Dom.prototype.rel = function (sul) {
    var els = [];

    this.each(function (el) {
      els.push(el[sul]);
    });

    return new Dom(els);
  };

  Dom.prototype.next = function () {
    this.rel('nextSibling');
  };
