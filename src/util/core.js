  
  // --------------------------------------------------
  // Utilities
  // --------------------------------------------------
  
  hilo.noConflict = function () {
    try {
      delete window.$;
    } catch (e) {
      window.$ = undefined;
    }
  };