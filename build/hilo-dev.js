/*! Hilo - v0.1.0 - 2013-07-01
 *  http://erikroyall.github.com/hilo/
 *  Copyright (c) 2013 Erik Royall and Hilo contributors
 *  Licensed under MIT (see LICENSE-MIT) 
 */

window.hilo = (function () {

  "use strict";
  
  var hilo          // Public API
    , Dom           // DOM Manipulation Methods
    , select        
    , feature = {}  // Feature Detection
    , createEl      // Create an Element
    , Test;

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

hilo.test = function (con) {
    return new Test(con);
  };

  /**
   * Main Test Class
   *
   * @class Test
   * @constructor
   * @param any con The whatever to be tested
   * @param boolean neg To negate
   * @return void
   */

  Test = function (con, neg) {
    this.con = con;
    if (neg) {
      this.neg = true;
    }
  };

  Test.prototype.not = (function () {
    return new Test(this.con, true);
  }());
  
Test.prototype.ifEquals = function (tw) {
    var val = this.con === tw;
    return this.neg ? !val : val;
  };

  /**
   * Tests if contains
   *
   * @method ifContains
   * @param any tw Comparative
   * @return boolean if contains
   */

  Test.prototype.ifContains = function (tw) {
    var ifString = this.con.split(tw).length === 1 ? false : true;
    if (typeof tw === 'string' && typeof this.con === 'object' && this.con.length) {

    } else if (typeof tw === 'string' && typeof this.con === 'string') {
      return this.neg ? !ifString : ifString;
    }
  };

  /**
   * Tests if it is the same object
   *
   * @method ifIs
   * @param any tw Comparative
   * @return boolean If it is
   */
  
  Test.prototype.ifIs = function (tw) {
    var val = this.con === tw;
    return this.neg ? !val : val;
  };

  Dom = function (els) {
    var _i, _l;

    for (_i = 0, _l = els.length; _i < _l; _i+=1) {
      this[_i] = els[_i];
    }

    this.length = els.length;
  };

  createEl = function (tagName, attrs) {
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

  hilo.create = createEl;

  // Helper Functions

  Dom.prototype.each = function (fn) {
    this.map(fn);
    return this;
  };

  Dom.prototype.map = function (fn) {
    var results = [], _i;
    for (_i = 0; _i < this.length; _i++) {
      results.push(fn.call(this, this[_i], _i));
    }
    return results;
  };
  
  Dom.prototype.one = function (fn) {
    var m = this.map(fn);
    return m.length > 1 ? m : m[0];
  };


  // Element Selections

  Dom.prototype.first = function () {
    return this[0];
  };
  
  Dom.prototype.last = function () {
    return this[this.length - 1];
  };
  
  Dom.prototype.el = function (place) {
    return this[place];
  };
  
  Dom.prototype.children = function (sel) {
    var els = [];

    this.each(function (el) {
      els = els.concat(el.querySelectorAll(sel)[0]);
    });

    return new Dom(els);
  };


  // Manipulation

  Dom.prototype.html = function (htmlCode) {
    if (htmlCode) {
      this.each(function(el) {
        el.innerHTML = htmlCode;
      });
      return new Dom(this);
    } else {
      this.one(function(el) {
        return el.innerHTML;
      });
    }
  };

  Dom.prototype.text = function (text) {
    if (text) {
      this.each(function(el) {
        el.innerText = text;
      });
      return new Dom(this);
    } else {
      this.one(function(el) {
        return el.innerText;
      });
    }
  };
  
  Dom.prototype.append = function (html) {
    this.each(function (el) {
      el.innerHTML += html;
    });
  };
  
  Dom.prototype.appendText = function (text) {
    this.each(function (el) {
      el.innerText += text;
    });
  };
  

  // Classes and IDs

  Dom.prototype.id = function (id) {
    if(id) {
      this.each(function(el) {
        el.id = id;
      });

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el.id;
      });
    }
  };

  Dom.prototype.addClass = function (className) {
    this.each(function (el) {
      var _i, parts  = className.split(" ");

      if (typeof className === 'string') { // String
        if (parts.length === 1) {
          el.classList.add(className);
        } else {
          for (_i = 0; _i < parts.length; _i++) {
            el.classList.add(parts[_i]);
          }
        }
      } else if (className.length) { // An array
        for (_i = 0; _i < className.length; _i++) {
          el.classList.add(className[_i]);
        }
      }
    });
  };
  

  // CSS

  Dom.prototype.css = function (prop, value) {
    if (value) {
      this.each(function (el) {
        el.style[prop] = value;
      });

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el.style[prop];
      });
    }
  };
  
  Dom.prototype.width = function (width) {
    if (width) {
      this.each(function (el) {
        el.style.width = width;

        return new Dom(this);
      });
    } else {
      this.one(function (el) {
        return el.style.width;
      });
    }
  };
  
  Dom.prototype.height = function (height) {
    if (height) {
      this.each(function (el) {
        el.style.height = height;

        return new Dom(this);
      });
    } else {
      this.one(function (el) {
        return el.style.height;
      });
    }
  };
  
  Dom.prototype.color = function (color) {
    if (color) {
      this.style('color', color);

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el.style['color'];
      });
    }
  };
  
  Dom.prototype.backgroundColor = function (backgroundColor) {
    if (backgroundColor) {
      this.style('background-color', backgroundColor);

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el.style['background-color'];
      });
    }
  };
  
  Dom.prototype.background = function (background) {
    if (background) {
      this.style('background', background);

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el.style['background'];
      });
    }
  };
  
  Dom.prototype.margin = function (margin) {
    if (margin) {
      this.style('margin', margin);

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el.style['margin'];
      });
    }
  };
  
  Dom.prototype.padding = function (padding) {
    if (padding) {
      this.style('padding', padding);

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el.style['padding'];
      });
    }
  };
  
  Dom.prototype.fontSize = function (fontSize) {
    if (fontSize) {
      this.style('font-size', fontSize);

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el.style['font-size'];
      });
    }
  };


  Dom.prototype.get = function () {
    var els = [];

    this.each(function (el) {
      console.dir(els);
      els = [].push(el);
    });

    return els;
  };
  
  // Events

  Dom.prototype.on = (function () {
    if (document.addEventListener) {
      return function (evt, fn) {
        return this.forEach(function (el) {
          el.addEventListener(evt, fn, false);
        });
      };
    } else if (document.attachEvent)  {
      return function (evt, fn) {
        return this.forEach(function (el) {
          el.attachEvent("on" + evt, fn);
        });
      };
    } else {
      return function (evt, fn) {
        return this.forEach(function (el) {
          el["on" + evt] = fn;
        });
      };
    }
  }());

  Dom.prototype.off = (function () {
    if (document.removeEventListener) {
      return function (evt, fn) {
        return this.forEach(function (el) {
          el.removeEventListener(evt, fn, false);
        });
      };
    } else if (document.detachEvent)  {
      return function (evt, fn) {
        return this.forEach(function (el) {
          el.detachEvent("on" + evt, fn);
        });
      };
    } else {
      return function (evt) {
        return this.forEach(function (el) {
          el["on" + evt] = null;
        });
      };
    }
  }());


  // Effects

  Dom.prototype.show = function (display) {
    display = display || '';
    this.each(function (el) {
      el.style.display = display;
    });

    return new Dom(this);
  };

  Dom.prototype.hide = function () {
    this.each(function (el) {
      el.style.display = 'none';
    });

    return new Dom(this);
  };

  Dom.prototype.toggle = function (display) {
    this.each(function (el) {
      if (el.style.display === 'none') {
        el.style.display = display ? display : '';
      } else {
        el.style.display = 'none';
      }
    });

    return new Dom(this);
  };

  Dom.prototype.appear = function () {
    this.each(function (el) {
      el.style.opacity = "1";
    });

    return new Dom(this);
  };

  Dom.prototype.disappear = function () {
    this.each(function (el) {
      el.style.opacity = "0";
      el.style.cusor = "default";
    });

    return new Dom(this);
  };

  Dom.prototype.toggleVisibility = function () {
    this.each(function (el) {
      if (el.style.opacity === "0") {
        el.style.opacity = "1";
      } else {
        el.style.opacity = "0";
        el.style.cusor = "default";
      }
    });

    return new Dom(this);
  };


  feature = {
    applicationcache: (function () {
      return !!window.applicationCache;
    }()),
    audiopreload: (function () {
      return 'preload' in document.createElement('audio');
    }()),
    canvas: (function () {
      return !!document.createElement('canvas').getContext;
    }()),
    classlist: (function () {
      return 'classList' in document.createElement('p');
    }()),
    es6: (function () {
      return typeof String.prototype.contains === 'function';
    }()),
    geolocation: (function () {
      return 'geolocation' in window.navigator;
    }()),
    indexeddb: (function () {
      return !!(window.indexedDB && window.IDBKeyRange && window.IDBTransaction);
    }()),
    input: {

    },
    localstorage: (function () {
      try {
        return 'localStorage' in window && window['localStorage'] !== null && !!window.localStorage.setItem;
      } catch(e){
        return false;
      }
    }()),
    microdata: (function () {
      return 'getItems' in document;
    }()),
    placeholder : (function () {
      return 'placeholder' in document.createElement('input');
    }()),
    template: (function () {
      return 'content' in document.createElement('template');
    }()),
    video: (function () {
      try {
        return !!document.createElement('video').canPlayType;
      } catch (e) {
        return false;
      }
    }()),
    h264: (function () {
      var v = document.createElement("video");
      try {
        return v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
      } catch (e) {
        return false;
      }
    }()),
    webm: (function () {
      var v = document.createElement("video");
      try {
        return v.canPlayType('video/webm; codecs="vp8, vorbis"');
      } catch (e) {
        return false;
      }
    }()),
    ogg: (function () {
      var v = document.createElement("video");
      try {
        return v.canPlayType('video/ogg; codecs="theora, vorbis"');
      } catch (e) {
        return false;
      }
    }()),
    webaudio: (function () {
      return !!(window.webkitAudioContext || window.AudioContext);
    }()),
    webworkers: (function () {
      return !!window.Worker;
    }())
  };

  hilo.feature = feature;


  window.$ = hilo;

  return hilo;
}());
