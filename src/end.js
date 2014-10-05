  
  // ## Hilo Extension API
  
  /* Provide Extension API */
  extend(hilo, {
    Dom: Dom.prototype,
    Test: Test.prototype
  });

  /* Set event handler for triggering DOM Events */
  doc.onreadystatechange = function () {
    if (doc.readyState === "complete") {
      for (_i = 0; _i < callbacks.length; _i += 1) {
        callbacks[_i]();
      }
    }
  };

  /* Get the total time took to execute the script */
  hilo.perf = new Date().getTime() - start;

  // Finally return Hilo
  return hilo;
}));
