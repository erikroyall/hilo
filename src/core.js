  var hilo          // Public API
    , Dom           // DOM Manipulation Methods
    , select        
    , feature = {}  // Feature Detection
    , createEl;     // Create an Element

  /**
   * Selects and returns elements based on selector given
   *
   * @param String sel selector
   * @param HTMLElement root root element
   * @return NodeList Array of HTMLElements
   */

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

  /**
   * The Main Class
   *
   * @class hilo
   * @constructor
   * 
   * @param {String|Function|Object|Array|HTMLElement} input MAGICal input
   * @root HTMLElement Where to start searching from
   */

  hilo = function (input, root) {
    if (typeof input === 'string') {
      return new Dom(select(input, root));
    } else if (typeof input === 'function') { // Function
      document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
          input();
        }
      };
    } else if (input.length) { // DOM Node List / Hilo DOM Object
      return new Dom(input);
    } else { // DOM Node
      input = [input];
      return new Dom(input);
    }
  };
