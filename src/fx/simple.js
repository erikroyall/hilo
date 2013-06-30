
  // Effects

  Dom.prototype.show = function (display) {
    display = display || '';
    this.each(function (el) {
      el.style.display = display;
    });

    return new Dom(this);
  };

  Dom.prototype.hide = function () {
    this.each(function (el) {
      el.style.display = 'none';
    });

    return new Dom(this);
  };

  Dom.prototype.toggle = function (display) {
    this.each(function (el) {
      if (el.style.display === 'none') {
        el.style.display = display ? display : '';
      } else {
        el.style.display = 'none';
      }
    });

    return new Dom(this);
  };

  Dom.prototype.appear = function () {
    this.each(function (el) {
      el.style.opacity = "1";
    });

    return new Dom(this);
  };

  Dom.prototype.disappear = function () {
    this.each(function (el) {
      el.style.opacity = "0";
      el.style.cusor = "default";
    });

    return new Dom(this);
  };

  Dom.prototype.toggleVisibility = function () {
    this.each(function (el) {
      if (el.style.opacity === "0") {
        el.style.opacity = "1";
      } else {
        el.style.opacity = "0";
        el.style.cusor = "default";
      }
    });

    return new Dom(this);
  };
