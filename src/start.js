(function (A, M, D) {

  /* Register Hilo as an AMD module */

  /*globals YUI: false, module: false, define: false*/

  if (typeof module !== "undefined" && module.exports) {
    module.exports = D;
  } else if (typeof define === "function" && define.amd) {
    define(D);
  } else if (typeof YUI === "function") {
    YUI.add(A, D);
  } else {
    M[A] = D();
  }
}("Hilo", this, function () {
  /*jshint -W083, -W064, -W061, -W030*/

  /* JSHint escapes:
     - W083 - Don't make function within a loop (Evts)
     - W064 - Eval can be harmful (JSON)
     - W064 - Missing new prefix when invoking constructor (Sizzle)
     - W030 - Saw an expression (Sizzle, Me) */

  "use strict";
  
  var hilo             /* Public API */

    /* Used to measure performace (Hilo.perf) */
    , start

    /* References to browser objects */
    , win = window        // Reference to window
    , doc = win.document  // Reference to document

    /* Used for storing detected features */
    , detected

    /* Key mappings (Hilo.keys) */
    , key

    /*Array of callbacks to be exec.ed on DOMReady */
    , callbacks = []   // Array of functions to be executed on DOMReady

    /* Private Selector Function */
    , select

    /* Feature Detection (Hilo.feature) */
    , feature

    /* Main AJAX function (Hilo.ajax) */
    , hiloAjax

    /* hasOwnProperty helper */
    , own = function (obj, prop) {
      return obj.hasOwnProperty(prop);
    }

    /* Loop Variable */
    , _i;
  
  /* Start performace testing */
  start = new Date().getTime();