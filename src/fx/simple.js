
  // --------------------------------------------------
  // Effects (fx)
  // --------------------------------------------------

  extend(Dom.prototype, {

    // -------------------------
    // .show()
    // -------------------------
    // 
    // Sets the display property of sel.els. to "" or given value
    // 
    // .show ( [display] ) 
    //   display (string) : Value of display prop.
    //
    // Example:
    // 
    // $("p").show();
    // 

    show: function (display) {
      display = display || "";

      return this.each(function (el) {
        el.style.display = display;
      });
    },

    // -------------------------
    // .hide()
    // -------------------------
    // 
    // Sets the display property of sel.els. to "none"
    // 
    // .hide () 
    //
    // Example:
    // 
    // $("p").hide();
    // 

    hide: function () {
      return this.each(function (el) {
        el.style.display = "none";
      });
    },

    // -------------------------
    // .toggle()
    // -------------------------
    // 
    // Shows hidden elements,
    // Hides visible elements
    // 
    // .toggle ( [display] ) 
    //   display (string) : Value of display prop.
    //
    // Example:
    // 
    // $("p").toggle();
    // 

    toggle: function (display) {
      return this.each(function (el) {
        if (el.style.display === "none") {
          el.style.display = display ? display : "";
        } else {
          el.style.display = "none";
        }
      });
    },

    // -------------------------
    // .appear()
    // -------------------------
    // 
    // Sets opacity to 1
    // 
    // .appear ()
    //
    // Example:
    // 
    // $("p").appear();
    // 

    appear: function () {
      return this.each(function (el) {
        el.style.opacity = "1";
      });
    },

    // -------------------------
    // .disappear()
    // -------------------------
    // 
    // Sets opacity to 0
    // 
    // .disappear () 
    //   display (string) : Value of display prop.
    //
    // Example:
    // 
    // $("p").disappear();
    // 

    disappear: function () {
      return this.each(function (el) {
        el.style.opacity = "0";
        el.style.cursor = "default";
      });
    },

    // -------------------------
    // .toggleVisibility()
    // -------------------------
    // 
    // appears a disappeared element,
    // disappears a appeared element
    // 
    // .toggleVisibility ()
    //
    // Example:
    // 
    // $("p").toggleVisibility();
    // 

    toggleVisibility: function () {
      return this.each(function (el) {
        if (el.style.opacity === "0") {
          el.style.opacity = "1";
        } else {
          el.style.opacity = "0";
          el.style.cursor = "default";
        }
      });
    },

    // -------------------------
    // .fade()
    // -------------------------
    // 
    // Animates opacity prop. from 0 to 1 or 1 to 0
    // 
    // .fade ( inOut [, timing] ) 
    //   !inOut (in|out) : Whether to fadeIn ("in") or fadeOut ("out")
    //   timing (number) : Rate of animation (the lesser, the faster)
    //
    // Example:
    // 
    // $("p").fade("in");
    // $("p").fade("out");
    // $("p").fade("in", 140);
    // $("p").fade("out", 100);
    // 

    fade: function (inOut, timing) {
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
    },

    // -------------------------
    // .fadeIn()
    // -------------------------
    // 
    // Animates opacity prop. from 0 to 1
    // 
    // .fadeIn ( [timing] )
    //   timing (number) : Rate of animation (the lesser the faster; default:120)
    //
    // Examples:
    // 
    // $("p").fadeIn(200); // Slow
    // $("p").fadeIn(); // Normal
    // $("p").fadeIn(80); // Fast
    // 

    fadeIn: function (timing) {
      this.fade("in", timing);
    },

    // -------------------------
    // .fadeOut()
    // -------------------------
    // 
    // Animates opacity prop. from 1 to 0
    // 
    // .fadeOut ( [timing] )
    //   timing (number) : Rate of animation (the lesser, the faster)
    //
    // Examples:
    // 
    // $("p").fadeOut(200); // Slow
    // $("p").fadeOut(); // Normal
    // $("p").fadeOut(80); // Fast
    // 

    fadeOut: function (timing) {
      this.fade("out", timing);
    }
  });