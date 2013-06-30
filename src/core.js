  var hilo          // Public API
    , Dom           // DOM Manipulation Methods
    , feature = {}  // Feature Detection
    , createEl;     // Create an Element

  hilo = function (input, root) {
    var els, c, rt;

    rt = root || document;

    if (typeof input === 'string') { // Selector String
      if (input.split(" ").length === 1) {
        c = input.slice(0,1);
        switch(c) {
          case "#":
            els = [rt.getElementById(input.substr(0,input.length))];
            break;
          case ".":
            els = rt.getElementsByClassName(input);
            break;
          default:
            els = rt.getElementsByTagName(input);
            break;
        }
      } else {
        els = rt.querySelectorAll(input);
      }

      return new Dom(els);
    } else if (typeof input === 'function') { // Function
      document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
          input();
        }
      };
    } else if (input.length) { // DOM Node List
      return new Dom(input);
    } else { // DOM Node
      input = [input];
      return new Dom(input);
    }
  };
