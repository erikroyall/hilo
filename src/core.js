  var hilo          // Public API
    , Dom           // DOM Manipulation Methods
    , select        
    , feature = {}  // Feature Detection
    , createEl;     // Create an Element

  select = function (sel, root) {
    var els, c, rt;

    rt = root || document;

    if(sel.split(" ").length === 1) {
      c = sel.slice(0,1);
      switch(c) {
        case "#":
          els = [rt.getElementById(sel.substr(0,1))];
          break;
        case ".":
          els = rt.getElementsByClassName(sel);
          break;
        case "*":
          els = document.all;
          break;
        default:
          els = rt.getElementsByTagName(sel);
          break;
      }
    } else {
      els = document.querySelectorAll(sel);
      console.log('Used querySelectorAll');
    }

    return els;
  };

  hilo = function (input, root) {
    if (typeof input === 'string') {
      return new Dom(select(input, root));
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
