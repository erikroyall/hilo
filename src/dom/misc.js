  
  // --------------------------------------------------
  // DOM Extensions
  // --------------------------------------------------

  // -------------------------
  // .get()
  // -------------------------
  // 
  // Get an array of selected elements
  // 
  // .get()
  //
  // Examples:
  // 
  // $("script").get()
  //

  Dom.prototype.get = function () {
    var els = [];

    this.each(function (el) {
      els.push(el);
    });

    return els;
  };