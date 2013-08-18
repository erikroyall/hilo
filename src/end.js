  
  // --------------------------------------------------
  // Hilo Extension API
  // --------------------------------------------------
  
  // Provide Extension API
  extend(hilo, {
    Dom: Dom.prototype,
    Test: Test.prototype
  });

  // Set event handler for triggering DOM Evenets
  
  doc.onreadystatechange = function () {
    if (doc.readyState === "complete") {
      for (_i = 0; _i < callbacks.length; _i += 1) {
        callbacks[_i]();
      }
    }
  };

  // Provide shorthand `$`
  win.$ = hilo;

  // Get the total time took to execute the script
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

  // Finally return Hilo
  return hilo;
}));
