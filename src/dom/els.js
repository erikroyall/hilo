
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
    var children = [], _i;
    if (sel) {
      this.each(function (el) {
        var s = select(sel, el);
        for (_i = 0; _i < s.length; _i++) {
          children = children.concat(s[_i]);
        }
      });
    } else {
      this.each(function (el) {
        for (_i = 0; _i < el.children.length; _i++) {
          children = children.concat(el.children[_i]);
        }
      });
    }
    return children;
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
