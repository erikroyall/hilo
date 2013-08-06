  
  // Core Library

  /*
   * Select elements
   * 
   * !selector - Selector {String}
   * root - Root element {String|HTMLElement}
   * 
   * This function can be used throughout the code
   * to select elements
   */

  select = feature.qsa3 ? function (selector, root) {
    root = root || doc;
    return root.querySelectorAll(selector);
  } : function (selector, root) {
    return sizzle(selector, root);
  };

  /*
   * Local copy of the one and only global
   */

  hilo = function (input, root, en) {
    if (typeof input === "undefined") {
      return win.Hilo;
    } else if (typeof input === "string") {
      if (input.trim() === "") {
        return new Dom({length:0});
      }
      
      return new Dom(select(input, root, en), input);
    } else if (typeof input === "function") { // Function
      if (document.readyState === "complete") {
        input();
      } else {
        callbacks.push(input);
      }
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
  hilo.version = "0.1.0-pre-dev-beta-8";

  hilo.feature = feature;
  hilo.browser = detected.browser;
  hilo.engine = detected.engine;
  hilo.platform = detected.system;

  // ES Utils

  hilo.each = each;
  hilo.extend = extend;