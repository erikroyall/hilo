  
  // --------------------------------------------------
  // DOM Extensions
  // --------------------------------------------------

  // Get an array containig s.el.

  Dom.prototype.get = function () {
    var els = [];

    this.each(function (el) {
      els.push(el);
    });

    return els;
  };