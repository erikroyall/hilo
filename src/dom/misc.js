
  dom.prototype.get = function () {
    var els = [];

    this.each(function (el) {
      console.dir(els);
      els = new Array().push(el);
    });

    return els;
  };