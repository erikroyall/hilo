
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
    
  // --------------------------------------------------
  // Events (imp.)
  // --------------------------------------------------

  extend(Dom.prototype, {
    ready: function (fn) {
      this.each(function (el) {
        el.onreadystatechange = function () {
          if (el.readyState = "complete") {
            fn();
          }
        };
      });
    }
  });

  (function () {
    var evtObj = {}
      , impEvts;

    impEvts = [
      "blur",
      "click",
      "change",
      "dblclick",
      "drag",
      "dragstart",
      "dragend",
      "dragenter",
      "dragleave",
      "dragover",
      "drop",
      "error",
      "focus",
      "keyup",
      "keydown",
      "keypress",
      "load",
      "mousedown",
      "mouseleave",
      "mouseenter",
      "mouseover",
      "mousemove",
      "mouseout",
      "submit"
    ];

    for (_i = 0; _i < impEvts.length; _i += 1) {
      evtObj[impEvts[_i]] = function (fn) {
        if (typeof fn === "function") {
          return this.on(impEvts[_i], fn);
        }

        return this.fire(impEvts[_i]);
      };
    }

    extend(Dom.prototype, evtObj);
  }());
    
  // These keyborad key mappings will be later used
  // to enable use of shortcut keys or the like

  key = {

    // Numbers

    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,

    // Uppercase letters

    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,

    // Lowecase letters

    a: 97,
    b: 98,
    c: 99,
    d: 100,
    e: 101,
    f: 102,
    g: 103,
    h: 104,
    i: 105,
    j: 106,
    k: 107,
    l: 108,
    m: 109,
    n: 110,
    o: 111,
    p: 112,
    q: 113,
    r: 114,
    s: 115,
    t: 116,
    u: 117,
    v: 118,
    w: 119,
    x: 120,
    y: 121,
    z: 122,

    // Other Important Keys

    alt: 18,
    caps: 20,
    ctrl: 17,
    cmd: 17,
    enter: 13,
    esc: 27,
    del: 46,
    end: 35,
    back: 8,

    // Arrows

    left: 37,
    up: 38,
    right: 39,
    down: 40,

    // F-keys

    f1: 112,
    f2: 113,
    f3: 114,
    f4: 115,
    f5: 116,
    f6: 117,
    f7: 118,
    f8: 119,
    f9: 120,
    f10: 121,
    f11: 122,
    f12: 123,

    // Less-used keys

    home: 36,
    insert: 45,
    numlock: 144,

    // Symbols

    "`": 222,
    "-": 189,
    ",": 188,
    ".": 190,
    "/": 191,
    ";": 186,
    "[": 219,
    "\\": 220,
    "]": 221,
    "=": 187

  };

  hilo.keys = key;