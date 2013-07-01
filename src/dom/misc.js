
  /**
   * Returns a DOM NodeList of selected elements
   *
   * @method get
   * @return Array the DOM NodeList
   */

  Dom.prototype.get = function () {
    var els = [];

    this.each(function (el) {
      console.dir(els);
      els = [].push(el);
    });

    return els;
  };
  