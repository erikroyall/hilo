
  // --------------------------------------------------
  // Events
  // --------------------------------------------------

  extend(Dom.prototype, {

    /**
     * Listen to an event and execute a function when that event happend
     * 
     * @for Dom
     * @method on
     * @param {String} evt Name of event
     * @param {Function} fn Function to be executed when the event is fired
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("#box").on("click", function (e) {
     *   console.log("#box was clicked");
     * });
     * </pre></div>
     * @since 0.1.0
     */
    on: (function () {
      if (document.addEventListener) {
        return function (evt, fn) {
          return this.each(function (el) {
            el.addEventListener(evt, fn, false);
          });
        };
      } else if (document.attachEvent)  {
        return function (evt, fn) {
          return this.each(function (el) {
            el.attachEvent("on" + evt, fn);
          });
        };
      } else {
        return function (evt, fn) {
          return this.each(function (el) {
            el["on" + evt] = fn;
          });
        };
      }
    }()),

    /**
     * Stop listening to an event
     * 
     * @for Dom
     * @method on
     * @param {String} evt Name of event
     * @param {Function} fn Function to stop listening to
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("#box").off("click", fn);
     * </pre></div>
     * @since 0.1.0
     */
    off: (function () {
      if (document.removeEventListener) {
        return function (evt, fn) {
          return this.each(function (el) {
            el.removeEventListener(evt, fn, false);
          });
        };
      } else if (document.detachEvent)  {
        return function (evt, fn) {
          return this.each(function (el) {
            el.detachEvent("on" + evt, fn);
          });
        };
      } else {
        return function (evt) {
          return this.each(function (el) {
            el["on" + evt] = null;
          });
        };
      }
    }()),

    /**
     * Trigger or fire an event
     * 
     * @for Dom
     * @method fire
     * @param {String} evt Name of event to fire
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("#uploadForm").fire("overload");
     * </pre></div>
     * @since 0.1.0
     */
    fire: (function () {
      if (document.dispatchEvent) {
        return function (event) {
          var evt = document.createEvent("UIEvents");
          evt.initUIEvent(event, true, true, window, 1);

          return this.each(function (el) {
            el.dispatchEvent(evt);
          });
        };
      } else if (document.fireEvent) {
        return function (event) {
          var evt = document.createEventObject();
          evt.button = 1;

          return this.each(function(el) {
            el.fireEvent("on" + event, evt);
          });
        };
      } else {
        return function (event) {
          return this.each(function (el) {
            el["on" + event].call();
          });
        };
      }
    }())
  });