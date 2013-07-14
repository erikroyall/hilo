  
  var hilo          // Public API
    , win = window  // Reference to window
    , doc = document// Reference to document
    , callbacks = []// Array of funs. to be exec.ed on DOMReady
    , select        // Private Selector Function
    , feature       // Feature Detection
    , browser       // Browser Detection
    , hiloAjax      // AJAX Func.
    , createEl      // Create an Element
    , impEvts       // Array containing imp. evts.
    , impCss        // Array containing imp. css props.
    , _i            // Loop helper
    , Dom           // DOM Manipulation Methods
    , Test;         // Test class

  win.temporaryHiloStorageObject = {};

  select = function (selector, root, e) {
    var rt, sel = selector, tempObj;

    function get (sel, root) {
      var c, rt;

      rt = root || document;

      function dom (sel, rt) {
        var els;

        if(sel.split(" ").length === 1 && 
          sel.split(">").length === 1 && 
          sel.split(":").length === 1 && 
          sel.split("+").length === 1) {
          c = sel.slice(0,1);
          switch(c) {
            case "#":
              els = [rt.getElementById(sel.substr(1,sel.length))];
              break;
            case ".":
              els = rt.getElementsByClassName(sel);
              break;
            case "*":
              els = document.all;
              break;
            case "&":
              els = document.documentElement;
              break;
            default:
              els = rt.getElementsByTagName(sel);
              break;
          }
        } else {
          try {
            els = rt.querySelectorAll(sel);
          } catch (e) {
            els = win.Hilo.select(sel, rt);
          }
        }

        return els;
      }

      return dom(sel, rt);
    }

    if (typeof root === 'string') {

    } else if (root === true) {
      tempObj = win.temporaryHiloStorageObject[sel];
      if (tempObj) {
        return tempObj;
      } else {
        if (typeof e === 'object') {
          tempObj = get(sel, e);
        } else {
          tempObj = get(sel);
        }
        
        return tempObj;
      }
    } else {
      rt = document;
    }

    return get(sel, rt);
  };

  hilo = function (input, root, e) {
    if (typeof input === 'string') {
      return new Dom(select(input, root, e));
    } else if (typeof input === 'function') { // Function
      if (document.readyState === 'complete') {
        console.log('r');
        input();
      } else {
        console.log('q');
        callbacks.push(input);
      }
    } else if (input.length) { // DOM Node List / Hilo DOM Object
      return new Dom(input);
    } else { // DOM Node
      input = [input];
      return new Dom(input);
    }
  };

  hilo.version = '0.1.0-pre-dev-beta-4';