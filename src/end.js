  
  // --------------------------------------------------
  // Set event handler for triggering DOM Evenets
  // --------------------------------------------------
  
  doc.onreadystatechange = function () {
    if (doc.readyState === "complete") {
      for (_i = 0; _i < callbacks.length; _i += 1) {
        callbacks[_i]();
      }
    }
  };

  win.$ = hilo; // Shorthand

  elapsed = new Date().getTime() - start;

  /**
   * Time taken to load (in ms)
   * 
   * @for hilo
   * @property perf
   * @type {number}
   * @since 0.1.0
   */
  hilo.perf = elapsed;

  return hilo;
}));
