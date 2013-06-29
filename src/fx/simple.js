
  // Effects

  dom.prototype.show = function (display) {
    display = display || '';
    this.each(function (el) {
      el.style.display = display;
    });

    return new dom(this);
  };

  dom.prototype.hide = function () {
    this.each(function (el) {
      el.style.display = 'none';
    });

    return new dom(this);
  };

  dom.prototype.toggle = function (display) {
    this.each(function (el) {
      if (el.style.display === 'none') {
        el.style.display = display ? display : '';
      } else {
        el.style.display = 'none';
      }
    });

    return new dom(this);
  };

  dom.prototype.appear = function () {
    this.each(function (el) {
      el.style.opacity = "1";
    });

    return new dom(this);
  };

  dom.prototype.disappear = function () {
    this.each(function (el) {
      el.style.opacity = "0";
      el.style.cusor = "default";
    });

    return new dom(this);
  };

  dom.prototype.toggleVisibility = function () {
    this.each(function (el) {
      if (el.style.opacity === "0") {
        el.style.opacity = "1";
      } else {
        el.style.opacity = "0";
        el.style.cusor = "default";
      }
    });

    return new dom(this);
  };
