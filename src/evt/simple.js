  
  // --------------------------------------------------
  // Events (imp.)
  // --------------------------------------------------

  Dom.prototype.ready = function (fn) {
    this.each(function (el) {
      el.onreadystatechange = function () {
        if (el.readyState = 'complete') {
          fn();
        }
      };
    });
  };

  impEvts = [
    "click",
    "change",
    "dblclick",
    "drag",
    "dragstart",
    "dragend",
    "dragenter",
    "dragleave",
    "dragover",
    "drop",
    "error",
    "focus",
    "keyup",
    "keydown",
    "keypress",
    "mouseover",
    "mousemove",
    "mouseout",
    "ready",
    "load"
  ];

  for (_i = 0; _i < impEvts.length; _i += 1) {
    Dom.prototype[impEvts[_i]] = function (fn) {
      this.on(impEvts[_i], fn);
    };
  }