  
  // Core Library

  // --------------------------------------------------
  // select()
  // --------------------------------------------------
  // 
  // Select elements
  // 
  // This function can be used throughout the code
  // to select elements
  // 
  // Usage:
  //
  // select(selector, root)
  //   selector - Selector {String}
  //   root - Root element {String|HTMLElement}
  //

  select = feature.qsa3 ? function (selector, root) {
    // Set root to given root or document
    root = root || doc;

    return root.querySelectorAll(selector);
  } : function (selector, root) {
    return sizzle(selector, root);
  };

  // --------------------------------------------------
  // hilo
  // --------------------------------------------------
  // 
  // The main hilo global function
  //

  hilo = function (input, root, en) {
    if (typeof input === "undefined") {
      // It's better than not returning anything
      return win.Hilo;
    } else if (typeof input === "string") {
      if (input.trim() === "") {
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