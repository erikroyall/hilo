
  // --------------------------------------------------
  // Element Selections, etc.
  // --------------------------------------------------

  // Return first element in the selected elements

  Dom.prototype.first = function () {
    return new Dom([this[0]]);
  };

  // Return last element in the selected elements
  
  Dom.prototype.last = function () {
    return new Dom([this[this.length - 1]]);
  };

  // Return nth element in the selected elements
  
  Dom.prototype.el = function (place) {
    return new Dom([this[place - 1]]);
  };

  // Return children of selected elements

  Dom.prototype.children = function (sel) {
    var children = [], _i;
    if (sel) { // Based on selector
      return this.each(function (el) {
        var s = select(sel, el);
        for (_i = 0; _i < s.length; _i++) {
          children = children.concat(s[_i]);
        }
      });
    } else { // All Children
      return this.each(function (el) {
        for (_i = 0; _i < el.children.length; _i++) {
          children = children.concat(el.children[_i]);
        }
      });
    }
    return children;
  };

  // Return parent of first selected element

  Dom.prototype.parent = function () {
    return this.one(function (el) {
      return new Dom([el.parentElement]);
    });
  };

  // Return first element in the selected elements

  Dom.prototype.parents = function () {
    var pars = [];

    this.each(function (el) {
      pars = pars.concat(el.parentElement);
    });

    return new Dom(pars);
  };

  // Return array of values of property specified

  Dom.prototype.rel = function (sul) {
    var els = [];

    return this.each(function (el) {
      els.push(el[sul]);
    });
  };

  // Return next element siblings of every element

  Dom.prototype.next = function () {
    this.rel('nextSibling');
  };