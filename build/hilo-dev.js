/*! Hilo - v0.1.0 - 2013-07-06
 *  http://erikroyall.github.com/hilo/
 *  Copyright (c) 2013 Erik Royall and Hilo contributors
 *  Licensed under MIT (see LICENSE-MIT) 
 */

window.Hilo = (function () {

  "use strict";
  
  var hilo          // Public API
    , Dom           // DOM Manipulation Methods
    , select        
    , feature = {}  // Feature Detection
    , hiloAjax      // AJAX Func.
    , createEl      // Create an Element
    , Animation
    , HiloObject
    , Test;

  /**
   * Selects and returns elements based on selector given
   *
   * @method select
   * @private
   * @param String sel selector
   * @param HTMLElement root root element
   * @return NodeList Array of HTMLElements
   */

  select = function (selector, root, e) {
    var rt, sel = selector, tempObj;

    function get (sel, root) {
      var els, c, rt;

      rt = root || document;

      if(sel.split(" ").length === 1 
      && sel.split(">").length === 1
      && sel.split(":").length === 1
      && sel.split("+").length === 1) {
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
        els = rt.querySelectorAll(sel);
      }

      return els;
    }

    if (typeof root === 'object') {
      rt = root;
    } else if (root === true) {
      tempObj = window.temporaryHiloStorageObject[sel];
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

  /**
   * The Main Class
   *
   * @class hilo
   * @constructor
   * 
   * @param {String|Function|Object|Array|HTMLElement} input MAGICal input
   * @root HTMLElement Where to start searching from
   */

  hilo = function (input, root, e) {
    if (typeof input === 'string') {
      return new Dom(select(input, root, e));
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

  hilo.version = '1.0.0-pre-dev-beta-2';

hilo.test = function (con) {
    return new Test(con);
  };

  /**
   * Main Test Class
   *
   * @class Test
   * @private
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

hiloAjax = function (config) {
    var xhr;

    if (window.XMLHttpRequest) {
      xhr = new window.XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
    }

    if (!config.url) {
      throw new TypeError("url parameter not provided to hilo.ajax");
    }

    config.async = config.async ? config.async : true;
    config.username = config.username ? config.username : null;
    config.password = config.password ? config.password : null;

    if(!config.contentType) {
      config.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
    }

    xhr.onreadystatechange = function () {
      if (config.callback) {
        config.callback(xhr);
      }
    };

    if (config.method === 'POST') {
      xhr.open('POST', config.url, config.async, config.username, config.password);
      xhr.send(config.data);
    } else {
      xhr.open('GET', config.url + (config.data ? "+" + config.data : ''), config.async, config.username, config.password);
      xhr.send();
    }
  };

  hilo.ajax = hiloAjax;

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
    return new Dom([this[0]]);
  };
  
  Dom.prototype.last = function () {
    return new Dom([this[this.length - 1]]);
  };
  
  Dom.prototype.el = function (place) {
    return new Dom([this[place - 1]]);
  };
  
  Dom.prototype.children = function (sel) {
    var children = [], _i;
    if (sel) {
      this.each(function (el) {
        var s = select(sel, el);
        for (_i = 0; _i < s.length; _i++) {
          children = children.concat(s[_i]);
        }
      });
    } else {
      this.each(function (el) {
        for (_i = 0; _i < el.children.length; _i++) {
          children = children.concat(el.children[_i]);
        }
      });
    }
  };

  Dom.prototype.rel = function (sul) {
    var els = [];

    this.each(function (el) {
      els.push(el[sul]);
    });

    return new Dom(els);
  };

  Dom.prototype.next = function () {
    this.rel('nextSibling');
  };

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

    return new Dom(this);
  };

  /**
   * Changes innerText of selected els
   *
   * @method text
   * @param string texy The text Code to be set
   * @return object
   */

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
  
  /**
   * Appends to innerHTML of selected els
   *
   * @method append
   * @param string html The HTML Code to be appended
   * @return object
   */

  Dom.prototype.append = function (html) {
    this.each(function (el) {
      el.innerHTML += html;
    });
  };
  
  /**
   * Appends to innerText if selected els
   *
   * @method appendText
   * @param string text The test to be appended
   * @return object
   */

  Dom.prototype.appendText = function (text) {
    this.each(function (el) {
      el.innerText += text;
    });

    return new Dom(this);
  };
  
  Dom.prototype.value = function (val) {
    if (val) {
      this.each(function (el) {
        el.value = val;
      });

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el.value;
      });
    }
  };

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

  /**
   * Adds a class of selected els
   *
   * @method addClass
   * @param {String|Array} className The class name of list of class names
   * @return object
   */

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
  
  Dom.prototype.attr = function (name, val) {
    if(val) {
      this.each(function(el) {
        el.setAttribute(name, val);
      });

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el[name];
      });
    }
  };

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
  
  /**
   * Set or return width of selected el(s)
   *
   * @method width
   * @param {String|Number} prop width
   * @return {object|String}
   */

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
  
  /**
   * Set or return height of selected el(s)
   *
   * @method height
   * @param {String|Number} height height
   * @return {object|String}
   */

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
  
  /**
   * Set or return color of selected el(s)
   *
   * @method color
   * @param String color color
   * @return {object|String}
   */

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
  
  /**
   * Set or return background color of selected el(s)
   *
   * @method backgroundColor
   * @param String backgroundColor background color
   * @return {object|String}
   */

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
  
  /**
   * Set or return background prop of selected el(s)
   *
   * @method background
   * @param String background background
   * @return {object|String}
   */

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
  
  /**
   * Set or return margin of selected el(s)
   *
   * @method margin
   * @param {String|Number} margin margin
   * @return {object|String}
   */

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
  
  /**
   * Set or return padding of selected el(s)
   *
   * @method padding
   * @param {String|Number} padding padding
   * @return {object|String}
   */

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
  
  /**
   * Set or return font size of selected el(s)
   *
   * @method fontSize
   * @param {String|Number} fontSize font size
   * @return {object|String}
   */

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
      els.push(el);
    });

    return els;
  };
  
  
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

  
  Dom.prototype.ready = function (fn) {
    this.each(function (el) {
      el.onreadystatechange = function () {
        if (el.readyState = 'complete') {
          fn();
        }
      };
    });
  };

  Dom.prototype.click = function (fn) {
    this.on('click', fn);
  };

  Dom.prototype.hover = function (fn) {
    this.on('hover', fn);
  };

  Dom.prototype.focus = function (fn) {
    this.on('focus', fn);
  };

  Dom.prototype.drag = function (fn) {
    this.on('drag', fn);
  };

  Dom.prototype.dragenter = function (fn) {
    this.on('dragenter', fn);
  };

  Dom.prototype.dragend = function (fn) {
    this.on('dragend', fn);
  };

  Dom.prototype.dragleave = function (fn) {
    this.on('dragleave', fn);
  };

  Dom.prototype.dragover = function (fn) {
    this.on('dragover', fn);
  };

  Dom.prototype.dragstart = function (fn) {
    this.on('dragstart', fn);
  };

  Dom.prototype.drop = function (fn) {
    this.on('drop', fn);
  };

  Dom.prototype.keyup = function (fn) {
    this.on('keyup', fn);
  };

  Dom.prototype.keypress = function (fn) {
    this.on('keypress', fn);
  };

  Dom.prototype.keydown = function (fn) {
    this.on('keydown', fn);
  };

  Dom.prototype.load = function (fn) {
    this.on('load', fn);
  };

  Dom.prototype.mouseup = function (fn) {
    this.on('mouseup', fn);
  };

  Dom.prototype.mouseover = function (fn) {
    this.on('mouseover', fn);
  };

  Dom.prototype.mousedown = function (fn) {
    this.on('mousedown', fn);
  };

  Dom.prototype.mousewheel = function (fn) {
    this.on('mousewheel', fn);
  };

  Dom.prototype.change = function (fn) {
    this.on('change', fn);
  };

  Dom.prototype.blur = function (fn) {
    this.on('blur', fn);
  };

  Dom.prototype.submit = function (fn) {
    this.on('submit', fn);
  };


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

  Animation = {
    // ease: function (dur, opt) {
      
    // }
  };
  // Dom.prototype.anim = function (dur, prop, options) {
  //   var ease, easing = {}, fade = {}, animate;

  //   function parseCSS (value) {
  //     var n = parseFloat (value);
  //     return {
  //       number: n,
  //       units: value.replace(n, '')
  //     };
  //   }

  //   animate = function (dur, prop, options) {
      
  //   };

  //   easing.linear = function (pos) {
  //     return pos;
  //   };

  //   easing.sine = function (pos) {
  //     return (-Math.cos(pos * Math.PI) / 2) + 0.5;
  //   };

  //   easing.bounce = function (pos) {
  //     if (pos < (1 / 2.75 )) {
  //       return 7.6 * pos * pos ;
  //     } else if (pos < (2 /2.75 )) {
  //       return 7.6 * (pos -= (1.5 / 2.75 )) * pos + 0.74 ;
  //     } else if (pos < (2.5 / 2.75 )) {
  //       return 7.6 * (pos -= (2.25 / 2.75 )) * pos + 0.91 ;
  //     } else {
  //       return 7.6 * (pos -= (2.625 / 2.75 )) * pos + 0.98 ;
  //     }
  //   };

  //   fade.fadeIn = function (options) {
  //     element.style.opacity = options.from ;
  //     animate(dur, { 'opacity': options.to }, { 'easing': options.easing })
  //   };

  //   if (options.hasOwnProperty('easing')) {
  //     if (typeof options.easing === 'string') {
  //       ease = easing[options.easing];
  //     } else {
  //       ease = options.easing;
  //     }
  //   }
  // };


  feature = (function () {
    var i = document.createElement("input");

    return {
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
      history: (function () {
        return !!(window.history && history.pushState);
      }()),
      indexeddb: (function () {
        return !!(window.indexedDB && window.IDBKeyRange && window.IDBTransaction);
      }()),
      input: {
        autofocus: (function () {
          return 'autofocus' in i;
        }()),
        placeholder: (function () {
          return 'placeholder' in i;
        }()),
        type: {
          color: (function () {
            i.setAttribute('type', 'color');
            return i.type !== 'text';
          }()),
          date: (function () {
            i.setAttribute('type', 'date');
            return i.type !== 'text';
          }()),
          datetime: (function () {
            i.setAttribute('type', 'datetime');
            return i.type !== 'text';
          }()),
          datetimeLocal: (function () {
            i.setAttribute('type', 'datetime-local');
            return i.type !== 'text';
          }()),
          email: (function () {
            i.setAttribute('type', 'email');
            return i.type !== 'text';
          }()),
          month: (function () {
            i.setAttribute('type', 'month');
            return i.type !== 'text';
          }()),
          number: (function () {
            i.setAttribute('type', 'number');
            return i.type !== 'text';
          }()),
          range: (function () {
            i.setAttribute('type', 'range');
            return i.type !== 'text';
          }()),
          search: (function () {
            i.setAttribute('type', 'search');
            return i.type !== 'text';
          }()),
          tel: (function () {
            i.setAttribute('type', 'tel');
            return i.type !== 'text';
          }()),
          time: (function () {
            i.setAttribute('type', 'time');
            return i.type !== 'text';
          }()),
          week: (function () {
            i.setAttribute('type', 'week');
            return i.type !== 'text';
          }())
        }
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
  }());

  hilo.feature = feature;


  hilo.noConflict = function () {
    delete window.$;
  };
  
  window.temporaryHiloStorageObject = {};
  window.$ = hilo;

  return hilo;
}());
