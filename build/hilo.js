/*! Hilo - v0.1.0 - 2013-06-29
 * http://erikroyall.github.com/hilo/
 * Copyright (c) 2013 Erik Royall
 * Licensed under MIT (see LICENSE-MIT) 
 */
window.hilo = (function () {

  "use strict";
  

  var hilo          // Public API
    , dom           // DOM Manipulation Methods
    , feature = {}  // Feature Detection
    , htmlCode;     // HTMLCode for an element

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

      return new dom(els);
    } else if (typeof input === 'function') { // Function
      document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
          input();
        }
      }
    } else if (input.length) { // DOM Node List
      return new dom(input);
    } else { // DOM Node
      input = [input];
      return new dom(input);
    }
  };

  dom = function (els) {
    var _i;

    for (_i = 0; _i < els.length; _i+=1) {
      this[_i] = els[_i];
    }

    this.length = els.length;
  };

  // Helper Functions

  dom.prototype.each = function (fn) {
    var _i, _t;

    for (_i = 0, _t = this.length; _i < _t; _i+=1) {
      fn(this[_i]);
    }
  };
  
  dom.prototype.one = function (fn) {
    fn(this[0]);
  };


  // Element Selections

  dom.prototype.first = function () {
    return this[0];
  };
  
  dom.prototype.last = function () {
    return this[this.length - 1];
  };
  
  dom.prototype.el = function (place) {
    return this[place];
  };
  
  dom.prototype.children = function (sel) {
    var els = [];

    this.each(function (el) {
      els = els.concat(el.querySelectorAll(sel)[0]);
    });

    return new dom(els);
  };

  // Manipulation

  dom.prototype.html = function (htmlCode) {
    if (htmlCode) {
      this.each(function(el) {
        el.innerHTML = htmlCode;
      });
      return new dom(this);
    } else {
      this.one(function(el) {
        return el.innerHTML;
      });
    }
  };
  dom.prototype.text = function (text) {
    if (text) {
      this.each(function(el) {
        el.innerText = text;
      });
      return new dom(this);
    } else {
      this.one(function(el) {
        return el.innerText;
      });
    }
  }
  

  // Classes and IDs

  dom.prototype.id = function (id) {
    if(id) {
      this.each(function(el) {
        el.id = id;
      });

      return new dom(this);
    } else {
      this.one(function (el) {
        return el.id;
      });
    }
  };

  dom.prototype.addClass = function (className) {
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

  dom.prototype.css = function (prop, value) {
    this.each(function (el) {
      el.style[prop] = value;
    });

    return new dom(this);
  };
  
  dom.prototype.width = function (width) {
    if (width) {
      this.each(function (el) {
        el.style.width = width;

        return new dom(this);
      });
    } else {
      this.one(function (el) {
        return el.style.width;
      });
    }
  };
  
  dom.prototype.height = function (height) {
    if (height) {
      this.each(function (el) {
        el.style.height = height;

        return new dom(this);
      });
    } else {
      this.one(function (el) {
        return el.style.height;
      });
    }
  };
  
  dom.prototype.color = function (color) {
    if (color) {
      this.style('color', color);

      return new dom(this);
    } else {
      this.one(function (el) {
        return el.style['color'];
      });
    }
  };
  
  dom.prototype.backgroundColor = function (backgroundColor) {
    if (backgroundColor) {
      this.style('background-color', backgroundColor);

      return new dom(this);
    } else {
      this.one(function (el) {
        return el.style['background-color'];
      });
    }
  };
  
  dom.prototype.background = function (background) {
    if (background) {
      this.style('background', background);

      return new dom(this);
    } else {
      this.one(function (el) {
        return el.style['background'];
      });
    }
  };
  
  dom.prototype.margin = function (margin) {
    if (margin) {
      this.style('margin', margin);

      return new dom(this);
    } else {
      this.one(function (el) {
        return el.style['margin'];
      });
    }
  };
  
  dom.prototype.padding = function (padding) {
    if (padding) {
      this.style('padding', padding);

      return new dom(this);
    } else {
      this.one(function (el) {
        return el.style['padding'];
      });
    }
  };
  
  dom.prototype.fontSize = function (fontSize) {
    if (fontSize) {
      this.style('font-size', fontSize);

      return new dom(this);
    } else {
      this.one(function (el) {
        return el.style['font-size'];
      });
    }
  };


  dom.prototype.get = function () {
    var els = [];

    this.each(function (el) {
      console.dir(els);
      els = new Array().push(el);
    });

    return els;
  };
  
  // Events

  dom.prototype.on = function (evt, fn) {
    this.each(function(el) {
      try {
        el.addEventListener(evt, fn);
      } catch (e) {
        try {
          el.addEvent(evt, fn);
        } catch (e) {
          el['on' + evt] = fn;
        }
      }
    });

    return new dom(this);
  };

  dom.prototype.off = function (evt) {
    this.each(function(el) {
      el.removeEventListener(evt);
    });

    return new dom(this);
  };


  // Effects

  dom.prototype.show = function (display) {
    display = display || '';
    this.each(function (el) {
      el.style.display = display;
    });

    return new dom(this);
  };

  dom.prototype.hide = function () {
    this.each(function (el) {
      el.style.display = 'none';
    });

    return new dom(this);
  };

  dom.prototype.toggle = function (display) {
    this.each(function (el) {
      if (el.style.display === 'none') {
        el.style.display = display ? display : '';
      } else {
        el.style.display = 'none';
      }
    });

    return new dom(this);
  };

  dom.prototype.appear = function () {
    this.each(function (el) {
      el.style.opacity = "1";
    });

    return new dom(this);
  };

  dom.prototype.disappear = function () {
    this.each(function (el) {
      el.style.opacity = "0";
      el.style.cusor = "default";
    });

    return new dom(this);
  };

  dom.prototype.toggleVisibility = function () {
    this.each(function (el) {
      if (el.style.opacity === "0") {
        el.style.opacity = "1";
      } else {
        el.style.opacity = "0";
        el.style.cusor = "default";
      }
    });

    return new dom(this);
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
