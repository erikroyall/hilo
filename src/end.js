  
  doc.onreadystatechange = function () {
    console.log ('h');
    if (doc.readyState === 'complete') {
      console.log('f');
      for (_i = 0; _i < callbacks.length; _i += 1) {
        console.log('d');
        callbacks[_i]();
      }
    }
  };

  win.$ = hilo; // Shorthand

  return hilo;
}());
