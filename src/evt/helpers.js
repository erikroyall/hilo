  
  // Events

  dom.prototype.on = (function () {
    if (document.addEventListener) {
      return function (evt, fn) {
        return this.forEach(function (el) {
          el.addEventListener(evt, fn, false);
        });
      };
    } else if (document.attachEvent)  {
      return function (evt, fn) {
        return this.forEach(function (el) {
          el.attachEvent("on" + evt, fn);
        });
      };
    } else {
      return function (evt, fn) {
        return this.forEach(function (el) {
          el["on" + evt] = fn;
        });
      };
    }
  }());

  dom.prototype.off = (function () {
    if (document.removeEventListener) {
      return function (evt, fn) {
        return this.forEach(function (el) {
          el.removeEventListener(evt, fn, false);
        });
      };
    } else if (document.detachEvent)  {
      return function (evt, fn) {
        return this.forEach(function (el) {
          el.detachEvent("on" + evt, fn);
        });
      };
    } else {
      return function (evt, fn) {
        return this.forEach(function (el) {
          el["on" + evt] = null;
        });
      };
    }
  }());
