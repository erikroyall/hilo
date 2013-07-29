
  // --------------------------------------------------
  // Effects (fx)
  // --------------------------------------------------

  Dom.prototype.show = function (display) {
    display = display || "";

    return this.each(function (el) {
      el.style.display = display;
    });
  };

  Dom.prototype.hide = function () {
    return this.each(function (el) {
      el.style.display = "none";
    });
  };

  Dom.prototype.toggle = function (display) {
    return this.each(function (el) {
      if (el.style.display === "none") {
        el.style.display = display ? display : "";
      } else {
        el.style.display = "none";
      }
    });
  };

  Dom.prototype.appear = function () {
    return this.each(function (el) {
      el.style.opacity = "1";
    });
  };

  Dom.prototype.disappear = function () {
    return this.each(function (el) {
      el.style.opacity = "0";
      el.style.cusor = "default";
    });
  };

  Dom.prototype.toggleVisibility = function () {
    return this.each(function (el) {
      if (el.style.opacity === "0") {
        el.style.opacity = "1";
      } else {
        el.style.opacity = "0";
        el.style.cusor = "default";
      }
    });
  };