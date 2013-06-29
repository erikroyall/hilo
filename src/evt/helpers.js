  
  // Events

  dom.prototype.on = function (evt, fn) {
    this.each(function(el) {
      try {
        el.addEventListener(evt, fn);
      } catch (e) {
        try {
          el.addEvent(evt, fn);
        } catch (e) {
          el['on' + evt] = fn;
        }
      }
    });

    return new dom(this);
  };

  dom.prototype.off = function (evt) {
    this.each(function(el) {
      el.removeEventListener(evt);
    });

    return new dom(this);
  };
