  
  // --------------------------------------------------
  // Core Library
  // --------------------------------------------------

  select = select || function (selector, root) {

    // Set root to given root or document
    root = root || doc;

    return root.querySelectorAll(selector);
  };

  /**
   * The main Hilo Object / function
   * 
   * @module Hilo
   * @static
   * @class hilo
   * @author Erik Royall
   */
  hilo = function (input, root, en) {
    if (typeof input === "undefined") {
      // It's better than not returning anything
      return win.Hilo;
    } else if (typeof input === "number") {
      return new NumberObject(input);
    } else if (typeof input === "string") {
      if (trim(input) === "") {
        // Can't pass empty string to querySelectorAll()
        return new Dom({length:0});
      }
      
      // Most common, return based on selector
      return new Dom(select(input, root, en), input);
    } else if (typeof input === "function") {
      if (document.readyState === "complete") {
        input();
      } else {
        callbacks.push(input);
      }

      // Allows to immediately start executing more code
      // It's better than not returning anything!
      return win.Hilo;
    } else if (input.length) { // DOM Node List | Hilo DOM Object
      return new Dom(input);
    } else { // DOM Node
      input = [input];
      return new Dom(input);
    }
  };

  // Enable Selector Caching
  hilo.temp = {};

  // Version info
  hilo.version = "0.1.0-pre-dev-beta-9";

  // Detections
  hilo.feature = feature;
  hilo.browser = detected.browser;
  hilo.engine = detected.engine;
  hilo.platform = detected.system;

  // ES Utils
  hilo.each = each;
  hilo.extend = extend;
  hilo.every = every;
  hilo.trim = trim;
  hilo.contains = contains;
  hilo.indexOf = indexOf;
  hilo.isPrimitive = isPrimitive;
  hilo.toObject = toObject;
  hilo.toInteger = toInteger;

  extend(hilo, {
    each: each,
    extend: extend,
    every: every,
    trim: trim,
    contains: contains,
    indexOf: indexOf,
    isPrimitive: isPrimitive,
    toObject: toObject,
    toInteger: toInteger,
    toPrimitive: toPrimitive
  });

  // JSON
  hilo.json = {
    parse: json.parse,
    stringify: json.stringify
  };

  // Legacy
  hilo.legacy = typeof sizzle === "function";