  
  // --------------------------------------------------
  // Hilo DOM
  // --------------------------------------------------

  // -------------------------
  // Dom Class (private)
  // -------------------------
  // 
  // The main DOM Class.
  //
  // Note: This class is accessible inside
  // the source code only and is not mutable
  // from outside the code
  // 
  // new Dom ( els )
  //   els (NodeList) : An array of elements to be selected
  //
  // Examples:
  //
  // new Dom (document.querySelectorAll(p:first-child))
  // new Dom ([document.createElement('div')])
  // new Dom ([document.getElementByid('box')])
  // new Dom (document.getElementsByClassName('hidden'))
  // new Dom (document.getElementsByTagName('mark'))
  //

  Dom = function (els) {
    var _i, _l;

    // Note that `this` is an object and'
    // NOT an Array

    // Loop thorugh the NodeList and set
    // this[index] for els[index]

    for (_i = 0, _l = els.length; _i < _l; _i += 1) {
      this[_i] = els[_i];
    }

    // Useful for looping through as ours
    // is an object and not an array

    this.length = els.length;
  };

  Dom.prototype = Array.prototype;

  // Create an element and return it

  hilo.create = function (tagName, attrs) {
    var el = new Dom([document.createElement(tagName)]), key;

    if (attrs) {
      if (attrs.className) {
        el.addClass(attrs.className);
        delete attrs.className;
      }

      if (attrs.text) {
        el.text(attrs.text);
        delete attrs.text;
      }

      for (key in attrs) {
        if(attrs.hasOwnProperty(key)) {
          el.attr(key, attrs['key']);
        }
      }
    }

    return el;
  };