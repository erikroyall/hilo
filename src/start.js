(function (name, root, hilo) {
  var module = module || false
    , define = define || false;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = hilo;
  } else if (typeof define === "function" && define.amd) {
    define(hilo);
  } else {
    root[name] = hilo();
  }
}("Hilo", this, function () {
  /*jshint -W083, -W064, -W030*/

  // JSHint escapes:
  //  W083 - Don't make function within a loop (Evts)
  //  W064 - Missing new prefix when invoking constructor (Sizzle)
  //  W030 - Allow expressions

  "use strict";
  
  var hilo             // Public API
    , start            // Start time
    , elapsed          // Time elapsed
    , win = window     // Reference to window
    , doc = document   // Reference to document
    , sizzle           // Sizzle.js
    , detected
    , key
    , callbacks = []   // Array of functions to be executed on DOMReady
    , select           // Private Selector Function
    , feature          // Feature Detection
    , hiloAjax         // AJAX Func.
    , impEvts          // Array containing imp. evts.
    , impCss           // Array containing imp. css props.
    , _i               // Loop helper
    , Dom              // DOM Manipulation Methods
    , Test;            // Test class
  
  start = new Date().getTime();