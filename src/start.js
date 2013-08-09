(function (A, M, D) {

  // Asynchronous Module Definition, if available

  var module = module || false
    , define = define || false;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = D;
  } else if (typeof define === "function" && define.amd) {
    define(D);
  } else {
    M[A] = D();
  }
}("Hilo", this, function () {
  /*jshint -W083, -W064, -W030*/

  // JSHint escapes:
  //  W083 - Don't make function within a loop (Evts)
  //  W064 - Missing new prefix when invoking constructor (Sizzle)
  //  W030 - Allow expressions

  "use strict";
  
  var hilo             // Public API

    // Later used to measure performace (Hilo.perf)
    , start
    , elapsed

    // References
    , win = window     // Reference to window
    , doc = document   // Reference to document

    // Sizzle.js wrapper
    , sizzle

    // Later stores detected features
    , detected

    // Key mappings (Hilo.keys)
    , key

    // Array of callbacks to be exec.ed on DOMReady
    , callbacks = []   // Array of functions to be executed on DOMReady

    // Private Selector Function
    , select

    // Feature Detection (Hilo.feature)
    , feature          // Feature Detection

    // Main AJAX function (Hilo.ajax)
    , hiloAjax

    // Important Events/CSS props.
    , impEvts
    , impCss

    // Loop Variable
    , _i

    // -------------------------
    // DOM
    // -------------------------
    // 
    // The main DOM Class
    //
    , Dom              // DOM Manipulation Methods

    // -------------------------
    // Test
    // -------------------------
    // 
    // The main Test Class
    //
    , Test;            // Test class
  
  start = new Date().getTime();