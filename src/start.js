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
