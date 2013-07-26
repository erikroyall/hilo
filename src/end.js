  
  // --------------------------------------------------
  // Set event handler for triggering DOM Evenets
  // --------------------------------------------------
  
  doc.onreadystatechange = function () {
    if (doc.readyState === 'complete') {
      for (_i = 0; _i < callbacks.length; _i += 1) {
        callbacks[_i]();
      }
    }
  };

  hilo.select = Sizzle || qwery || Quicksand || undefined;

  win.$ = hilo; // Shorthand

  return hilo;
}));
