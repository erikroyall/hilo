
  // --------------------------------------------------
  // Effects (fx)
  // --------------------------------------------------

  extend(Dom.prototype, {

    /**
     * Sets the display property of sel.els. to "" or given value
     * 
     * @for Dom
     * @method show
     * @param {string} display Value of display prop.
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").show();
     * </pre></div>
     * @since 0.1.0
     */
    show: function (display) {
      display = display || "";

      return this.each(function (el) {
        el.style.display = display;
      });
    },

    /**
     * Sets the display property of sel.els. to "none"
     * 
     * @for Dom
     * @method hide
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").hide();
     * </pre></div>
     * @since 0.1.0
     */
    hide: function () {
      return this.each(function (el) {
        el.style.display = "none";
      });
    },

    /**
     * Shows hidden elements, hides shown elements
     * 
     * @for Dom
     * @method toggle
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").toggle();
     * </pre></div>
     * @since 0.1.0
     */
    toggle: function (display) {
      return this.each(function (el) {
        if (el.style.display === "none") {
          el.style.display = display ? display : "";
        } else {
          el.style.display = "none";
        }
      });
    },

    /**
     * Sets opacity to 1
     * 
     * @for Dom
     * @method appear
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").appear();
     * </pre></div>
     * @since 0.1.0
     */
    appear: function () {
      return this.each(function (el) {
        el.style.opacity = "1";
      });
    },

    /**
     * Sets opacity to 0
     * 
     * @for Dom
     * @method disappear
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").disappear();
     * </pre></div>
     * @since 0.1.0
     */
    disappear: function () {
      return this.each(function (el) {
        el.style.opacity = "0";
        el.style.cursor = "default";
      });
    },

    /**
     * Appears a disappeared element, disappears and appeared element
     * 
     * @for Dom
     * @method toggleVisibility
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").toggleVisibility();
     * </pre></div>
     * @since 0.1.0
     */
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

    /**
     * Animates opacity prop. from 0 to 1 or 1 to 0
     * 
     * @for Dom
     * @method fade
     * @param {string} inOut Whether "in" or "out"
     * @param {number|string} "fast", "slow", "normal" or a number 
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").fade("in");
     * $("p").fade("out");
     * $("p").fade("in", 140);
     * $("p").fade("out", 100);
     * </pre></div>
     * @since 0.1.0
     */
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

    /**
     * Animates opacity prop. from 0 to 1
     * 
     * @for Dom
     * @method fadeIn
     * @param {number|string} "fast", "slow", "normal" or a number 
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").fadeIn();
     * $("p").fadeIn(140);
     * </pre></div>
     * @since 0.1.0
     */
    fadeIn: function (timing) {
      this.fade("in", timing);
    },

    /**
     * Animates opacity prop. from 1 to 0
     * 
     * @for Dom
     * @method fadeOut
     * @param {number|string} "fast", "slow", "normal" or a number 
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").fadeOut();
     * $("p").fadeOut(140);
     * </pre></div>
     * @since 0.1.0
     */
    fadeOut: function (timing) {
      this.fade("out", timing);
    }
  });