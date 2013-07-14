  
  doc.onreadystatechange = function () {
    if (doc.readyState === 'complete') {
      for (_i = 0; _i < callbacks.length; _i += 1) {
        callbacks[_i]();
      }
    }
  };

  win.$ = hilo; // Shorthand

  return hilo;
}());
