  dom = function (els) {
    var _i, _l;

    for (_i = 0, _l = els.length; _i < _l; _i+=1) {
      this[_i] = els[_i];
    }

    this.length = els.length;
  };

  createEl = function (tagName, attrs) {
    var elm = new dom([document.createElement(tagName)]), key;

    if (attrs) {
      if (attrs.className) {
        el.addClass(className);
        delete attrs.className;
      }

      if (attrs.text) {
        el.text(attrs.text);
        delete attrs.text;
      }

      for (key in attrs) {
        if(attrs.hasOwnProperty(key)) {
          el.attr(key, attr['key']);
        }
      }
    }

    return elm;
  };

  hilo.create = createEl;
  