
  // --------------------------------------------------
  // Events
  // --------------------------------------------------

  extend(Dom.prototype, {

    // -------------------------
    // .on()
    // -------------------------
    // 
    // Listen to an event and execute a function
    // when that event happens
    // 
    // .on( evt, fn )
    //   !evt (string) : The name of event
    //   fn (function) : Function to be executed when the event is fired
    //
    // Examples:
    // 
    // $("p.hidden").on("click", function () {
    //   $(this).show()
    // })
    //

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

    // -------------------------
    // .off()
    // -------------------------
    // 
    // Stop listening to an event
    // 
    // .off( evt, fn )
    //   !evt (string) : The name of event
    //   fn (function) : The Event handler function
    //
    // Examples:
    // 
    // $("p").off("click", fn)
    //

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

    // -------------------------
    // .fire()
    // -------------------------
    // 
    // Trigger (or fire) an event
    // 
    // .fire( evt )
    //   !evt (string) : The name of event
    //
    // Examples:
    // 
    // $("p.hidden").fire("click")
    //

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