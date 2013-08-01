
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
      el.style.cursor = "default";
    });
  };

  Dom.prototype.toggleVisibility = function () {
    return this.each(function (el) {
      if (el.style.opacity === "0") {
        el.style.opacity = "1";
      } else {
        el.style.opacity = "0";
        el.style.cursor = "default";
      }
    });
  };

  Dom.prototype.fade = function (inOut, timing) {
    if (inOut === "in") {
      this.show();
    }

    return this.each(function (el) {
      var time;

      switch(timing) {
        case "slow":
          time = 200;
          break;
        case "normal":
          time = 120;
          break;
        case "fast":
          time = 80;
          break;
        default:
          time = time || 120;
          break;
      }

      function animate () {
        var val = 0.3, end = 1;

        if (parseFloat(el.style.opacity) === (inOut === "in" ? 1 : 0)) {
          clearInterval(win.Hilo.temp.anim);
        } else {
          if (inOut === "out") {
            val = -val;
            end = 0;
          }

          el.style.opacity = parseFloat(el.style.opacity || end) + val; 
        }
      }

      win.Hilo.temp.anim = setInterval(animate, timing);
    });
  };

  Dom.prototype.fadeIn = function (timing) {
    this.fade("in", timing);
  };

  Dom.prototype.fadeOut = function (timing) {
    this.fade("out", timing);
  };