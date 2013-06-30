
  Dom.prototype.get = function () {
    var els = [];

    this.each(function (el) {
      console.dir(els);
      els = [].push(el);
    });

    return els;
  };