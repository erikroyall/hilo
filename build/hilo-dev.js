/*! 
 * Hilo - 0.1.0-pre-dev-beta-6 - 2013-07-23
 * http://erikroyall.github.com/hilo/
 * Copyright (c) 2013 Erik Royall and Hilo contributors
 * Licensed under MIT (see LICENSE-MIT) 
 */

window.Hilo = (function (undefined) {
  /*jshint -W083, -W040 */

  "use strict";
  
  var hilo             // Public API
    , win = window     // Reference to window
    , doc = document   // Reference to document
    , callbacks = []   // Array of functions to be executed on DOMReady
    , select           // Private Selector Function
    , feature          // Feature Detection
    , hiloAjax         // AJAX Func.
    , impEvts          // Array containing imp. evts.
    , impCss           // Array containing imp. css props.
    , _i               // Loop helper
    , Dom              // DOM Manipulation Methods
    , Test;            // Test class

  /* 
   * Select elements
   * 
   * !selector - Selector {String}
   * root - Root element {String|HTMLElement} | Whether to cache {Boolean}
   * e - Root element if cache is specfied {String|HTMLElement} 
   * 
   * This function can be used throughout the code
   * to select elements
   */

  select = function (selector, root /*, en */) {
    // var rt, sel = selector, tempObj;

    /*
     * Selects elements based on selector and root
     *
     * !sel - Selector {String}
     * root - Root element {String|HTMLElement}
     */

    // function get (sel, root) {
    //   var c, rt;

    //   rt = root || doc;

    //   /*
    //    * The main selecting engine. Written by me.
    //    *
    //    * !sel - Selector {String}
    //    * rt - Root element {String|HTMLElement}
    //    */

    //   function dom (sel, rt) {
    //     var els;

    //     function isNotComplexSelector(sel) {
    //       function h (sel, str) {
    //         return sel.split(str).length === 1;
    //       }

    //       return (
    //         h(sel, " ") &&
    //         h(sel, ">") &&
    //         h(sel, ":") &&
    //         h(sel, "[") &&
    //         h(sel, "]") &&
    //         h(sel, "=") &&
    //         h(sel, "~") &&
    //         h(sel, "?")
    //       );
    //     }

    //     if(isNotComplexSelector(sel)) {
    //       c = sel.slice(0,1); // Find out first ltr; Useful in next step
    //       switch(c) {
    //         case "#":
    //           els = [rt.getElementById(sel.substr(1,sel.length))];
    //           break;
    //         case ".":
    //           els = rt.getElementsByClassName(sel);
    //           break;
    //         case "*":
    //           els = rt.getElementsByTagName('*');
    //           break;
    //         case "&":
    //           els = doc.documentElement;
    //           break;
    //         default:
    //           els = rt.getElementsByTagName(sel);
    //           break;
    //       }
    //     } else {
    //       try {
    //         els = rt.querySelectorAll(sel);
    //       } catch (e) {
    //         els = win.Hilo.select(sel, rt);
    //       }
    //     }

    //     return els;
    //   }

    //   return dom(sel, rt);
    // }

    // if (root === true) {
    //   // The temporary object
    //   tempObj = win.Hilo.temp[sel];
    //   if (tempObj) {
    //     return tempObj;
    //   } else {
    //     if (typeof en === 'object') {
    //       tempObj = get(sel, en);
    //     } else {
    //       tempObj = get(sel);
    //     }
        
    //     return tempObj;
    //   }
    // } else if (typeof root === 'string') {

    // } else {
    //   rt = document;
    // }

    // return get(sel, rt);

    return win.Hilo.select(selector, root);
  };

  /*
   * Local copy of the one and only global
   */

  hilo = function (input, root, en) {
    if (!input) {
      return win.Hilo;
    }

    if (typeof input === 'string') {
      return new Dom(select(input, root, en));
    } else if (typeof input === 'function') { // Function
      if (document.readyState === 'complete') {
        input();
      } else {
        callbacks.push(input);
      }
    } else if (input.length) { // DOM Node List | Hilo DOM Object
      return new Dom(input);
    } else { // DOM Node
      input = [input];
      return new Dom(input);
    }
  };

  // Enable Selector Caching
  hilo.temp = {};

  // Version info
  hilo.version = '0.1.0-pre-dev-beta-6';
  // --------------------------------------------------
  // Feature Detection
  // --------------------------------------------------

  feature = (function () {
    var c = function (tagName) {
        return doc.createElement(tagName);
      }
      , i = c("input")
      , d = c("div")
      , cn = c("canvas")
      , fr = c("iframe")
      , is = function (attr, val) {
        return i.setAttribute (attr, val);
      }
      , a = c("audio")
      , s = c("span")
      , v = c("video")
      , xr = new XMLHttpRequest();

    return {

      // Application Cache (or Offline Web Apps)
      
      applicationcache: (function () {
        return !!win.applicationCache;
      }()),

      // Audio (tag)
      
      audio: (function () {
        return !!a.canPlayType;
      }()),

      // Preload audio (hmm.. background music?)
      
      audiopreload: (function () {
        return 'preload' in a;
      }()),

      // Audio Types
      
      audiotypes: {

        // MP3 audio format

        mp3: (function () {
          return !!(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
        }()),

        // Vorbis audio format
        
        vorbis: (function () {
          return !!(a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));
        }()),

        // MS WAV audio format
        
        wav: (function () {
          return !!(a.canPlayType && a.canPlayType('audio/wav; codecs="1"').replace(/no/, ''));
        }()),

        // AAC audio format
        
        aac: (function () {
          return !!(a.canPlayType && a.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, ''));
        }())
      },

      // Canvas API
      
      canvas: (function () {
        return !!cn.getContext;
      }()),

      // Canvas Text
      
      canvastext: (function () {
        return !!cn.getContext && typeof cn.getContext('2d').fillText === 'function';
      }()),

      // classList prop. in HTMLElement
      
      classList: (function () {
        return 'classList' in s;
      }()),

      // Command
      
      command: (function () {
        return 'type' in c("command");
      }()),

      // Form Constraint Validation
      
      consval: (function () {
        return 'noValidate' in c("form");
      }()),

      // contentEditable
      
      contenteditable: (function () {
        return 'isContentEditable' in s;
      }()),

      // Datalist (tag)
      
      datalist: (function () {
        return 'options' in c("datalist");
      }()),

      // Details (tag)
      
      details: (function () {
        return 'open' in c("details");
      }()),

      // Drag & Drop
      
      dragdrop: (function () {
        return 'draggable' in s;
      }()),

      // ECMAScript 6
      
      es6: (function () {
        return typeof String.prototype.contains === 'function';
      }()),

      // File system API
      
      fileapi: (function () {
        return typeof FileReader !== 'undefined';
      }()),

      // Geolocation
      
      geolocation: (function () {
        return 'geolocation' in win.navigator;
      }()),

      // History API
      
      history: (function () {
        return !!(win.history && history.pushState);
      }()),

      // IFrame
      
      iframe: {
        sandbox: (function () {
          return 'sandbox' in fr;
        }()),
        srdoc: (function () {
          return 'srcdoc' in fr;
        }())
      },

      // IndexedDB (use this instead of WebSQL)
      
      indexeddb: (function () {
        return !!(win.indexedDB && win.IDBKeyRange && win.IDBTransaction);
      }()),

      // Input
      
      input: {

        // Input Auto Focus
        
        autofocus: (function () {
          return 'autofocus' in i;
        }()),

        // Placeholder
        
        placeholder: (function () {
          return 'placeholder' in i;
        }()),

        // Input Types (they are pretty self-explanatory)
        
        type: {
          color: (function () {
            is('type', 'color');
            return i.type !== 'text';
          }()),
          date: (function () {
            is('type', 'date');
            return i.type !== 'text';
          }()),
          datetime: (function () {
            is('type', 'datetime');
            return i.type !== 'text';
          }()),
          datetimeLocal: (function () {
            is('type', 'datetime-local');
            return i.type !== 'text';
          }()),
          email: (function () {
            is('type', 'email');
            return i.type !== 'text';
          }()),
          month: (function () {
            is('type', 'month');
            return i.type !== 'text';
          }()),
          number: (function () {
            is('type', 'number');
            return i.type !== 'text';
          }()),
          range: (function () {
            is('type', 'range');
            return i.type !== 'text';
          }()),
          search: (function () {
            is('type', 'search');
            return i.type !== 'text';
          }()),
          tel: (function () {
            is('type', 'tel');
            return i.type !== 'text';
          }()),
          time: (function () {
            is('type', 'time');
            return i.type !== 'text';
          }()),
          week: (function () {
            is('type', 'week');
            return i.type !== 'text';
          }())
        }
      },

      // Local Storage
      
      localstorage: (function () {
        try {
          return 'localStorage' in win && win['localStorage'] !== null && !!win.localStorage.setItem;
        } catch(e){
          return false;
        }
      }()),

      // Meter (tag)
      
      meter: (function () {
        return 'value' in c("meter");
      }()),

      // Microdata
      
      microdata: (function () {
        return 'getItems' in doc;
      }()),

      // Offline (App Cache)
      
      offline: (function () {
        return !!win.applicationCache;
      }()),

      // Output (tag)
      
      output: (function () {
        return 'value' in c("output");
      }()),

      // Progress (tag)

      progress: (function () {
        return 'value' in c("progress");
      }()),

      // Server-sent Events

      serverevt: (function () {
        return typeof EventSource !== 'undefined';
      }()),

      // Session Storage

      sessionstorage: (function () {
        try {
          return 'sessionStorage' in win && win['sessionStorage'] !== null;
        } catch(e) {
          return false;
        }
      }()),

      // SVG (Scalable Vector Graphics)
      svg: (function () {
        return !!(doc.createElementNS && doc.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);
      }()),

      // SVG in text/html

      svginhtml:(function () {
        d.innerHTML = '<svg></svg>';
        return !!(win.SVGSVGElement && d.firstChild instanceof win.SVGSVGElement);
      }()),

      // Template (tag)

      template: (function () {
        return 'content' in c('template');
      }()),

      // Time (tag)

      time: (function () {
        return 'datetime' in c("time");
      }()),

      // Undo (not just Ctrl + Z)
      undo: (function () {
        return typeof UndoManager !== 'undefined';
      }()),

      // Video

      video: (function () {
        try {
          return !!v.canPlayType;
        } catch (e) {
          return false;
        }
      }()),

      // Video Captions

      videocaptions: (function () {
        return 'src' in c("track");
      }()),

      // Video Formats

      videoformats: {

        // H264 Video Format (MP4)

        h264: (function () {
          try {
            return v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
          } catch (e) {
            return false;
          }
        }()),

        // WebM Video Format

        webm: (function () {
          try {
            return v.canPlayType('video/webm; codecs="vp8, vorbis"');
          } catch (e) {
            return false;
          }
        }()),

        // OGG Theora Video Format

        ogg: (function () {
          try {
            return v.canPlayType('video/ogg; codecs="theora, vorbis"');
          } catch (e) {
            return false;
          }
        }())
      },

      // Video posters

      videoposter: (function () {
        return 'poster' in c("video");
      }()),

      // Web Audio API (NOT the <audio> tag)

      webaudio: (function () {
        return !!(win.webkitAudioContext || win.AudioContext);
      }()),

      // WebSockets

      websockets: (function () {
        return !!win.webSocket;
      }()),

      // WebSQL (a deprecated specification; use IndexedDB instead)

      websql: (function () {
        return !!win.openDatabase;
      }()),

      // Web Workers

      webworkers: (function () {
        return !!win.Worker;
      }()),

      // Widgets

      widgets: (function () {
        return typeof widget !== 'undefined';
      }()),

      // Cross-document messaging

      xdocmsg: (function () {
        return !!win.postMessage;
      }()),
      xhr: {

        // Cross-domain requests

        xdr: (function () {
          return 'withCredentials' in xr;
        }()),

        // Send as form data

        formdata: (function () {
          return !!win.FormData;
        }()),

        // Upload progress events

        upe: (function () {
          return 'upload' in xr;
        }())
      }
    };
  }());

  hilo.feature = feature;
  
  // --------------------------------------------------
  // Testing
  // --------------------------------------------------

  hilo.test = function (con) {
    return new Test(con);
  };

  Test = function (con, neg) {
    this.con = con;
    if (neg) {
      this.neg = true;
    }
  };
  
  // --------------------------------------------------
  // Test Comparisions
  // --------------------------------------------------

  Test.prototype.ifEquals = function (tw) {
    var val = this.con === tw;
    return this.neg ? !val : val;
  };

  Test.prototype.ifContains = function (tw) {
    var ifString = this.con.split(tw).length === 1 ? false : true;
    if (typeof tw === 'string' && typeof this.con === 'object' && this.con.length) {

    } else if (typeof tw === 'string' && typeof this.con === 'string') {
      return this.neg ? !ifString : ifString;
    }
  };
  
  Test.prototype.ifIs = function (tw) {
    var val = this.con === tw;
    return this.neg ? !val : val;
  };

  /*!
   * ES5 Shims, adopted from ES5 Shim (MIT)
   * http://es5.github.com/
   */

  // --------------------------------------------------
  // Array Object Shims
  // --------------------------------------------------

  // http://es5.github.com/#x15.4.4.20

  if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp */) {
      var t, len, res, thisp, i, val;

      if (this.length === 0) {
        throw new TypeError();
      }

      t = Object(this);
      len = t.length >>> 0;

      if (typeof fun !== "function") {
        throw new TypeError();
      }

      res = [];
      thisp = arguments[1];

      for (i = 0; i < len; i++) {
        if (i in t) {
          val = t[i]; // in case fun mutates this
          if (fun.call(thisp, val, i, t)) {
            res.push(val);
          }
        }
      }

      return res;
    };
  }

  // http://es5.github.com/#x15.4.4.18

  if ( !Array.prototype.forEach ) {
    Array.prototype.forEach = function( callback, thisArg ) {
      var T, k, O, len, kValue;

      if (this.length === 0) {
        throw new TypeError( " this is null or not defined" );
      }

      O = Object(this);

      len = O.length >>> 0; // Hack to convert O.length to a UInt32

      if ( {}.toString.call(callback) !== "[object Function]" ) {
        throw new TypeError( callback + " is not a function" );
      }

      if (thisArg) {
        T = thisArg;
      }

      k = 0;

      while(k < len) {
        if (k in O) {
          kValue = O[k];
          callback.call(T, kValue, k, O);
        }
        k++;
      }
    };
  }

  // http://es5.github.com/#x15.4.4.14

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
      var t, len, n, k;

      if (this.length === 0) {
        throw new TypeError();
      }

      t = Object(this);
      len = t.length >>> 0;

      if (len === 0) {
        return -1;
      }

      n = 0;
      
      if (arguments.length > 0) {
        n = Number(arguments[1]);
        if (n !== n) { // shortcut for verifying if it's NaN
          n = 0;
        } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }
      
      if (n >= len) {
        return -1;
      }
      
      k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
      
      for (; k < len; k++) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }
      
      return -1;
    };
  }

  // http://es5.github.com/#x15.4.3.2

  if(!Array.isArray) {
    Array.isArray = function (arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }

  // http://es5.github.com/#x15.4.4.19

  if (!Array.prototype.map) {
    Array.prototype.map = function(callback, thisArg) {
      var T, A, k, O, len, kValue, mappedValue;

      if (this.length === 0) {
        throw new TypeError(" this is null or not defined");
      }

      O = Object(this);
      len = O.length >>> 0;

      if ({}.toString.call(callback) !== "[object Function]") {
        throw new TypeError(callback + " is not a function");
      }

      if (thisArg) {
        T = thisArg;
      }

      A = new Array(len);
      k = 0;

      while(k < len) {
        if (k in O) {
          kValue = O[ k ];
          mappedValue = callback.call(T, kValue, k, O);
          A[ k ] = mappedValue;
        }
        k++;
      }

      return A;
    };      
  }

  
  // --------------------------------------------------
  // String Shims
  // --------------------------------------------------

  // http://es5.github.com/#x15.5.4.20

  (function () {
    var ws = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003" +
      "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028" +
      "\u2029\uFEFF";

    if(!String.prototype.trim) {
      String.prototype.trim = function trim() {
        ws = "[" + ws + "]";

        var trimBeginRegexp = new RegExp("^" + ws + ws + "*"),
          trimEndRegexp = new RegExp(ws + ws + "*$");

        if (this === void 0 || this === null) {
          throw new TypeError("can't convert "+this+" to object");
        }
        return String(this).replace(trimBeginRegexp, "").replace(trimEndRegexp, "");
      };
    }
  }());

  // --------------------------------------------------
  // Hilo AJAX
  // --------------------------------------------------

  hiloAjax = function (config) {
      
    /*
    
      config:
      - method: HTTP Method "GET" or "POST" (default: "POST")
      - url: The file to send request
      - async: Whether to perform an asynchronous request (default: true)
      - response: Response type "text" or "XML"
      - Event functions
        - callback: fn to be exec. on readystatechange
        - completed
        - error
        - abort
        - success
        - progress
        - load
        - loadStart
        - loadEnd
      - username
      - password
      - contentType
    
    */

    
    var xhr;

    if (win.XMLHttpRequest) {
      xhr = new win.XMLHttpRequest();
    } else if (win.ActiveXObject) {
      xhr = new win.ActiveXObject('Microsoft.XMLHTTP');
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

      if (xhr.readyState === 4) {
        switch (xhr.status) {
          case 200:
            if (config.success) {
              config.success();
            }
            
            break;
        }
      }
    };

    if (config.method.trim().toUpperCase() === 'POST') {
      xhr.open(
        'POST',
        config.url,
        config.async,
        config.username,
        config.password
      );
      xhr.send(config.data);
    } else if (config.method.trim().toUpperCase() === 'GET') {
      xhr.open(
        'GET',
        config.url + (config.data ? "+" + config.data : ''),
        config.async,
        config.username,
        config.password
      );
      xhr.send();
    } else {
      xhr.open(
        config.method.trim().toUpperCase(),
        config.url + (config.data ? "+" + config.data : ''),
        (config.async ? config.async: true),
        (config.username ? config.username : null),
        (config.password ? config.password : null)
      );
      xhr.send();
    }
  };

  hilo.ajax = hiloAjax;
  
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
  
  /*!
   * Qwery - A Blazing Fast query selector engine
   * https://github.com/ded/qwery
   * copyright Dustin Diaz 2012
   * MIT License
   */

  select = (function () {
    var html = doc.documentElement
      , byClass = 'getElementsByClassName'
      , byTag = 'getElementsByTagName'
      , qSA = 'querySelectorAll'
      , useNativeQSA = 'useNativeQSA'
      , tagName = 'tagName'
      , nodeType = 'nodeType'
      , select // main select() method, assign later

      , id = /#([\w\-]+)/
      , clas = /\.[\w\-]+/g
      , idOnly = /^#([\w\-]+)$/
      , classOnly = /^\.([\w\-]+)$/
      , tagOnly = /^([\w\-]+)$/
      , tagAndOrClass = /^([\w]+)?\.([\w\-]+)$/
      , splittable = /(^|,)\s*[>~+]/
      , normalizr = /^\s+|\s*([,\s\+\~>]|$)\s*/g
      , splitters = /[\s\>\+\~]/
      , splittersMore = /(?![\s\w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^'"]*\]|[\s\w\+\-]*\))/
      , specialChars = /([.*+?\^=!:${}()|\[\]\/\\])/g
      , simple = /^(\*|[a-z0-9]+)?(?:([\.\#]+[\w\-\.#]+)?)/
      , attr = /\[([\w\-]+)(?:([\|\^\$\*\~]?\=)['"]?([ \w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^]+)["']?)?\]/
      , pseudo = /:([\w\-]+)(\(['"]?([^()]+)['"]?\))?/
      , easy = new RegExp(idOnly.source + '|' + tagOnly.source + '|' + classOnly.source)
      , dividers = new RegExp('(' + splitters.source + ')' + splittersMore.source, 'g')
      , tokenizr = new RegExp(splitters.source + splittersMore.source)
      , chunker = new RegExp(simple.source + '(' + attr.source + ')?' + '(' + pseudo.source + ')?')

      , walker = {
        ' ': function (node) {
          return node && node !== html && node.parentNode;
        }
      , '>': function (node, contestant) {
          return node && node.parentNode === contestant.parentNode && node.parentNode;
        }
      , '~': function (node) {
          return node && node.previousSibling;
        }
      , '+': function (node, contestant, p1, p2) {
          if (!node) {
            return false;
          }

          return (p1 = previous(node)) && (p2 = previous(contestant)) && p1 === p2 && p1;
        }
      }
      , classCache
      , cleanCache
      , attrCache
      , tokenCache
      , isAncestor
      , getAttr
      , hasByClass
      , hasQSA
      , selectQSA
      , selectNonNative
      , configure;

    function Cache() {
      this.c = {};
    }

    Cache.prototype = {
      g: function (k) {
        return this.c[k] || undefined;
      },
      s: function (k, v, r) {
        v = r ? new RegExp(v) : v;
        return (this.c[k] = v);
      }
    };

    classCache = new Cache();
    cleanCache = new Cache();
    attrCache = new Cache();
    tokenCache = new Cache();

    function classRegex(c) {
      return classCache.g(c) || classCache.s(c, '(^|\\s+)' + c + '(\\s+|$)', 1);
    }

    // not quite as fast as inline loops in older browsers so don't use liberally
    function each(a, fn) {
      var i = 0, l = a.length;
      for (; i < l; i += 1) {
        fn(a[i]);
      }
    }

    function flatten(ar) {
      for (var r = [], i = 0, l = ar.length; i < l; ++i) {
        if (arrayLike(ar[i])) {
          r = r.concat(ar[i]);
        } else {
          r[r.length] = ar[i];
        }
      }
      return r;
    }

    function arrayify(ar) {
      var i = 0, l = ar.length, r = [];
      for (; i < l; i++) {
        r[i] = ar[i];
      }
      return r;
    }

    function previous(n) {
      while (n = n.previousSibling) {
        if (n[nodeType] === 1) {
          break;
        }
      }
      return n;
    }

    function q(query) {
      return query.match(chunker);
    }
    // called using `this` as element and arguments from regex group results.
    // given => div.hello[title="world"]:foo('bar')
    // div.hello[title="world"]:foo('bar'), div, .hello, [title="world"], title, =, world, :foo('bar'), foo, ('bar'), bar]
    
    function interpret(whole, tag, idsAndClasses, wholeAttribute, attribute, qualifier, value, wholePseudo, pseudo, wholePseudoVal, pseudoVal) {
      var i, m, k, o, classes, thisRef = this;
      if (thisRef[nodeType] !== 1) {
        return false;
      }
      if (tag && tag !== '*' && thisRef[tagName] && thisRef[tagName].toLowerCase() !== tag) {
        return false;
      }
      if (idsAndClasses && (m = idsAndClasses.match(id)) && m[1] !== thisRef.id) {
        return false;
      }
      if (idsAndClasses && (classes = idsAndClasses.match(clas))) {
        for (i = classes.length; i--;) {
          if (!classRegex(classes[i].slice(1)).test(thisRef.className)) {
            return false;
          }
        }
      }
      if (pseudo && qwery.pseudos[pseudo] && !qwery.pseudos[pseudo](thisRef, pseudoVal)) {
        return false;
      }
      if (wholeAttribute && !value) { // select is just for existance of attrib
        o = thisRef.attributes;
        for (k in o) {
          if (Object.prototype.hasOwnProperty.call(o, k) && (o[k].name || k) === attribute) {
            return thisRef;
          }
        }
      }
      if (wholeAttribute && !checkAttr(qualifier, getAttr(thisRef, attribute) || '', value)) {
        // select is for attrib equality
        return false;
      }
      return thisRef;
    }
    function clean(s) {
      return cleanCache.g(s) || cleanCache.s(s, s.replace(specialChars, '\\$1'));
    }
    function checkAttr(qualify, actual, val) {
      switch (qualify) {
      case '=':
        return actual === val;
      case '^=':
        return actual.match(attrCache.g('^=' + val) || attrCache.s('^=' + val, '^' + clean(val), 1));
      case '$=':
        return actual.match(attrCache.g('$=' + val) || attrCache.s('$=' + val, clean(val) + '$', 1));
      case '*=':
        return actual.match(attrCache.g(val) || attrCache.s(val, clean(val), 1));
      case '~=':
        return actual.match(attrCache.g('~=' + val) || attrCache.s('~=' + val, '(?:^|\\s+)' + clean(val) + '(?:\\s+|$)', 1));
      case '|=':
        return actual.match(attrCache.g('|=' + val) || attrCache.s('|=' + val, '^' + clean(val) + '(-|$)', 1));
      }
      return 0;
    }
    
    // given a selector, first check for simple cases then collect all base candidate matches and filter
    function _qwery(selector, _root) {
      var r = [], ret = [], i, l, m, token, els, intr, item, root = _root
        , tokens = tokenCache.g(selector) || tokenCache.s(selector, selector.split(tokenizr))
        , dividedTokens = selector.match(dividers);

      if (!tokens.length) {
        return r;
      }

      token = (tokens = tokens.slice(0)).pop(); // copy Cached tokens, take the last one
      if (tokens.length && (m = tokens[tokens.length - 1].match(idOnly))) {
        root = byId(_root, m[1]);
      }
      if (!root) {
        return r;
      }

      intr = q(token);
      // collect base candidates to filter
      els = root !== _root && root[nodeType] !== 9 && dividedTokens && /^[+~]$/.test(dividedTokens[dividedTokens.length - 1]) ?
        (function (r) {
          while (root = root.nextSibling) {
            return root[nodeType] === 1 && (intr[1] ? intr[1] === root[tagName].toLowerCase() : 1) && (r[r.length] = root);
          }
          return r;
        }([])) :
        root[byTag](intr[1] || '*');
      // filter elements according to the right-most part of the selector
      for (i = 0, l = els.length; i < l; i++) {
        if (item = interpret.apply(els[i], intr)) {
          r[r.length] = item;
        }
      }
      if (!tokens.length) {
        return r;
      }

      // filter further according to the rest of the selector (the left side)
      each(r, function (e) {
        if (ancestorMatch(e, tokens, dividedTokens)) {
          ret[ret.length] = e;
        }
      });

      return ret;
    }
    
    // compare element to a selector
    function is(el, selector, root) {
      if (isNode(selector)) {
        return el === selector;
      }
      if (arrayLike(selector)) {
        return !!~flatten(selector).indexOf(el); // if selector is an array, is el a member?
      }

      var selectors = selector.split(','), tokens, dividedTokens;
      while (selector = selectors.pop()) {
        tokens = tokenCache.g(selector) || tokenCache.s(selector, selector.split(tokenizr));
        dividedTokens = selector.match(dividers);
        tokens = tokens.slice(0); // copy array
        if (interpret.apply(el, q(tokens.pop())) && (!tokens.length || ancestorMatch(el, tokens, dividedTokens, root))) {
          return true;
        }
      }
      return false;
    }
    
    // given elements matching the right-most part of a selector, filter out any that don't match the rest
    function ancestorMatch(el, tokens, dividedTokens, root) {
      var cand;
      // recursively work backwards through the tokens and up the dom, covering all options
      function crawl(e, i, p) {
        while (p = walker[dividedTokens[i]](p, e)) {
          if (isNode(p) && (interpret.apply(p, q(tokens[i])))) {
            if (i) {
              if (cand = crawl(p, i - 1, p)) {
                return cand;
              }
            } else {
              return p;
            }
          }
        }
      }
      return (cand = crawl(el, tokens.length - 1, el)) && (!root || isAncestor(cand, root));
    }
    
    function isNode(el, t) {
      return el && typeof el === 'object' && (t = el[nodeType]) && (t === 1 || t === 9);
    }
    
    function uniq(ar) {
      var a = [], i, j;
      o:
      for (i = 0; i < ar.length; ++i) {
        for (j = 0; j < a.length; ++j) {
          if (a[j] === ar[i]) {
            continue o;
          }
        }
        a[a.length] = ar[i];
      }
      return a;
    }
    
    function arrayLike(o) {
      return (typeof o === 'object' && isFinite(o.length));
    }
    
    function normalizeRoot(root) {
      if (!root) {
        return doc;
      }
      if (typeof root === 'string') {
        return qwery(root)[0];
      }
      if (!root[nodeType] && arrayLike(root)) {
        return root[0];
      }

      return root;
    }

    function byId(root, id, el) {
      // if doc, query on it, else query the parent doc or if a detached fragment rewrite the query and run on the fragment
      return root[nodeType] === 9 ? root.getElementById(id) : root.ownerDocument &&
          (((el = root.ownerDocument.getElementById(id)) && isAncestor(el, root) && el) ||
            (!isAncestor(root, root.ownerDocument) && select('[id="' + id + '"]', root)[0]));
    }

    function qwery(selector, _root) {
      var m, el, root = normalizeRoot(_root);

      // easy, fast cases that we can dispatch with simple DOM calls
      if (!root || !selector) {
        return [];
      }
      if (selector === win || isNode(selector)) {
        return !_root || (selector !== win && isNode(root) && isAncestor(selector, root)) ? [selector] : [];
      }
      if (selector && arrayLike(selector)) {
        return flatten(selector);
      }
      if (m = selector.match(easy)) {
        if (m[1]) {
          return (el = byId(root, m[1])) ? [el] : [];
        }
        if (m[2]) {
          return arrayify(root[byTag](m[2]));
        }
        if (hasByClass && m[3]) {
          return arrayify(root[byClass](m[3]));
        }
      }

      return select(selector, root);
    }

    // where the root is not document and a relationship selector is first we have to
    // do some awkward adjustments to get it to work, even with qSA
    function collectSelector(root, collector) {
      return function (s) {
        var oid, nid;
        if (splittable.test(s)) {
          if (root[nodeType] !== 9) {
            // make sure the el has an id, rewrite the query, set root to doc and run it
            if (!(nid = oid = root.getAttribute('id'))) {
              root.setAttribute('id', nid = '__qwerymeupscotty');
            }
            s = '[id="' + nid + '"]' + s; // avoid byId and allow us to match context element
            collector(root.parentNode || root, s, true);
            return oid || root.removeAttribute('id');
          }
          return;
        }
        return s.length && collector(root, s, false);
      };
    }
    
    isAncestor = 'compareDocumentPosition' in html ?
      function (element, container) {
        return (container.compareDocumentPosition(element) & 16) === 16;
      } : 'contains' in html ?
      function (element, container) {
        container = container[nodeType] === 9 || container === win ? html : container;
        return container !== element && container.contains(element);
      } :
      function (element, container) {
        while (element = element.parentNode) {
          if (element === container) {
            return 1;
          }
        }
        return 0;
      };

    getAttr = (function () {
      // detect buggy IE src/href getAttribute() call
      var e = doc.createElement('p');
      return ((e.innerHTML = '<a href="#x">x</a>') && e.firstChild.getAttribute('href') !== '#x') ?
        function (e, a) {
          return a === 'class' ? e.className : (a === 'href' || a === 'src') ?
            e.getAttribute(a, 2) : e.getAttribute(a);
        } :
        function (e, a) { return e.getAttribute(a); };
    }());

    hasByClass = !!doc[byClass];
      // has native qSA support

    hasQSA = doc.querySelector && doc[qSA];
      // use native qSA

    selectQSA = function (selector, root) {
      var result = [], ss, e;
      try {
        if (root[nodeType] === 9 || !splittable.test(selector)) {
          // most work is done right here, defer to qSA
          return arrayify(root[qSA](selector));
        }
        // special case where we need the services of `collectSelector()`
        each(ss = selector.split(','), collectSelector(root, function (ctx, s) {
          e = ctx[qSA](s);
          if (e.length === 1) {
            result[result.length] = e.item(0);
          }
          else if (e.length) {
            result = result.concat(arrayify(e));
          }
        }));
        return ss.length > 1 && result.length > 1 ? uniq(result) : result;
      } catch (ex) { }
      return selectNonNative(selector, root);
    };

    // no native selector support
    selectNonNative = function (selector, root) {
      var result = [], items, m, i, l, r, ss;
      selector = selector.replace(normalizr, '$1');
      if (m = selector.match(tagAndOrClass)) {
        r = classRegex(m[2]);
        items = root[byTag](m[1] || '*');
        for (i = 0, l = items.length; i < l; i++) {
          if (r.test(items[i].className)) {
            result[result.length] = items[i];
          }
        }
        return result;
      }
      // more complex selector, get `_qwery()` to do the work for us
      each(ss = selector.split(','), collectSelector(root, function (ctx, s, rewrite) {
        r = _qwery(s, ctx);
        for (i = 0, l = r.length; i < l; i++) {
          if (ctx[nodeType] === 9 || rewrite || isAncestor(r[i], root)) {
            result[result.length] = r[i];
          }
        }
      }));
      return ss.length > 1 && result.length > 1 ? uniq(result) : result;
    };

    configure = function (options) {
      // configNativeQSA: use fully-internal selector or native qSA where present
      if (typeof options[useNativeQSA] !== 'undefined') {
        select = !options[useNativeQSA] ? selectNonNative : hasQSA ? selectQSA : selectNonNative;
      }
    };
    
    configure({ useNativeQSA: true });
    qwery.configure = configure;
    qwery.uniq = uniq;
    qwery.is = is;
    qwery.pseudos = {};
    return qwery;
  }());
  
  // --------------------------------------------------
  // Helper Functions
  // --------------------------------------------------

  // -------------------------
  // .each()
  // -------------------------
  // 
  // Just like .map() but returns the current Dom instance
  // 
  // .each ( fn ) 
  //   fn (function) : The function to be called
  //
  // Example:
  // 
  // $('p').each (function (el) {
  //   doSomethingWith(e);
  // });
  // 

  Dom.prototype.each = function (fn) {
    this.map(fn);
    return this; // return the current Dom instance
  };

  // -------------------------
  // .map()
  // -------------------------
  // 
  // Return the results of executing a function on all the selected elements
  // 
  // .map( fn )
  //    fn (function) : The function to be called
  //
  // Example:
  // 
  // $('div.need-cf').map(function (e) {
  //   doSomethingWith(e);
  // });
  // 

  Dom.prototype.map = function (fn) {
    var results = [], _i, _l;
    for (_i = 0, _l = this.length; _i < _l; _i += 1) {
      results.push(fn.call(this, this[_i], _i));
    }
    return results;
  };

  // -------------------------
  // .one()
  // -------------------------
  // 
  // .map fn on selected elements and return them based on length
  //

  Dom.prototype.one = function (fn) {
    var m = this.map(fn);
    return m.length > 1 ? m : m[0];
  };

  // -------------------------
  // .first()
  // -------------------------
  // 
  // Return the results of executing a function on all the selected elements
  // 
  // .first( fn )
  //    fn (function) : The function to be called
  //
  // Example:
  // 
  // $('div').first(function (e) {
  //   console.log(e + ' is the first div');
  // });
  // 

  Dom.prototype.first = function (fn) {
    return (this.map(fn))[0];
  };

  // -------------------------
  // .next()
  // -------------------------
  // 
  // Return next element siblings of the selected elements
  // 
  // .next( )
  //
  // Examples:
  // 
  // $('div.editor').next().class('next-to-editor')
  //

  Dom.prototype.next = function () {
    return this.rel('nextElementSibling');
  };

  // -------------------------
  // .filter()
  // -------------------------
  // 
  // Filters the selected elements and returns the
  // elements that pass the test (or return true)
  // 
  // .filter( fn )
  //    fn (function) : The function to be called
  // 
  // Example:
  // 
  // Filter to find divs with className hidden
  // 
  // $('div').filter(function (el) {
  //   return el.className.split('hidden').length > 1;
  // });
  // 

  Dom.prototype.filter = function (fun) {
    var len = this.length >>> 0
      , _i
      , t = Object(this)
      , res = []
      , val;

    for (_i = 0; _i < len; _i++)
    {
      if (_i in t)
      {
        val = t[_i];
        if (fun.call(this, val, _i, t)) {
          res.push(val);
        }
      }
    }

    return new Dom(res);
  };

  // --------------------------------------------------
  // Element Selections, etc.
  // --------------------------------------------------

  // -------------------------
  // .first()
  // -------------------------
  // 
  // Return the first element in the selected elements
  // 
  // .first( )
  //
  // Examples:
  // 
  // $('p.hidden').first().show()
  //

  Dom.prototype.first = function () {
    return new Dom([this[0]]);
  };

  // -------------------------
  // .ladt()
  // -------------------------
  // 
  // Return last element in the selected elements
  // 
  // .ladt( attr [, value] )
  //
  // Examples:
  // 
  // $('p.hidden').last().show()
  //
  
  Dom.prototype.last = function () {
    return new Dom([this[this.length - 1]]);
  };

  // -------------------------
  // .el()
  // -------------------------
  // 
  // Return nth element in the selected elements
  // 
  // .el( place )
  //   place (number) : A number representing place of element
  //
  // Examples:
  // 
  // $('p.hidden').el(3).show()
  //

  Dom.prototype.el = function (place) {
    return new Dom([this[place - 1]]);
  };

  // -------------------------
  // .children()
  // -------------------------
  // 
  // Return nth element in the selected elements
  // 
  // .children( )
  //
  // Examples:
  // 
  // $('p.hidden').el().show()
  //

  Dom.prototype.children = function (sel) {
    var children = [], _i, _l;

    this.each(function (el) {
      var childNodes = select(sel ? sel : '*', el);

      for (_i = 0, _l = childNodes.length; _i < _l; _i += 1) {
        children = children.concat(childNodes[_i]);
      }
    });

    return children;
  };

  // -------------------------
  // .parent()
  // -------------------------
  // 
  // Return parent of the first selected element
  // 
  // .parent( )
  //
  // Examples:
  // 
  // $('div#editor').parent().hide()
  //

  Dom.prototype.parent = function () {
    return this.first(function (el) {
      return new Dom([el.parentElement]);
    });
  };

  // -------------------------
  // .parents()
  // -------------------------
  // 
  // Return parents of all selected elements
  // 
  // .parents( )
  //
  // Examples:
  // 
  // $('div.editor').parents().hide()
  //

  Dom.prototype.parents = function () {
    var pars = [];

    this.each(function (el) {
      pars = pars.concat(el.parentElement);
    });

    return new Dom(pars);
  };

  // -------------------------
  // .parent()
  // -------------------------
  // 
  // Return relative of selected elements based
  // on the relation given
  // 
  // .rel( rel )
  //   rel (string) : The relation between curent and 
  //
  // Examples:
  // 
  // $('div#editor').parent().hide()
  //

  Dom.prototype.rel = function (sul) {
    var els = [];

    this.each(function (el) {
      els.push(el[sul]);
    });

    return els;
  };

  // -------------------------
  // .next()
  // -------------------------
  // 
  // Return next element siblings of the selected elements
  // 
  // .next( )
  //
  // Examples:
  // 
  // $('div.editor').next().class('next-to-editor')
  //

  Dom.prototype.next = function () {
    return this.rel('nextElementSibling');
  };

  // -------------------------
  // .prev()
  // -------------------------
  // 
  // Return previous element siblings of the selected elements
  // 
  // .prev( )
  //
  // Examples:
  // 
  // $('div.editor').prev().class('prev-to-editor')
  //

  Dom.prototype.prev = function () {
    return this.rel('previousElementSibling');
  };
  
  // --------------------------------------------------
  // DOM HTML
  // --------------------------------------------------

  // -------------------------
  // .html()
  // -------------------------
  // 
  // Set or return innerHTML of selected elements
  // 
  // .html( [htmlCode] )
  //    htmlCode (string) : The htmlCode to be set
  //
  // Examples:
  // 
  // $('p:first-child').html('first-p')
  // var html = $('span').html()
  // 

  Dom.prototype.html = function (htmlCode) {
    if (htmlCode) {
      return this.each(function(el) {
        el.innerHTML = htmlCode;
      });
    } else {
      return this.first(function(el) {
        return el.innerHTML;
      });
    }
  };

  // -------------------------
  // .text()
  // -------------------------
  // 
  // Set or return innerHTML of selected elements
  // 
  // .text( [text] )
  //    text (string) : The text to be set
  //
  // Examples:
  // 
  // $('p:first-child').text('first-p')
  // var text = $('span').text()
  // 

  Dom.prototype.text = function (text) {
    if (text) {
      return this.each(function(el) {
        el.innerText = text;
      });
    } else {
      return this.first(function(el) {
        return el.innerText;
      });
    }
  };

  // -------------------------
  // .append()
  // -------------------------
  // 
  // Set or return innerHTML of selected elements
  // 
  // .append( [html] )
  //    html (string) : The html to be appended
  //
  // Examples:
  // 
  // $('p:first-child').append(' - From the first p child')
  // 
  
  Dom.prototype.append = function (html) {
    return this.each(function (el) {
      el.innerHTML += html;
    });
  };

  // -------------------------
  // .appendText()
  // -------------------------
  // 
  // Set or return innerHTML of selected elements
  // 
  // .appendText( [text] )
  //    text (string) : The text to be set
  //
  // Examples:
  // 
  // $('p:first-child').appendText('The same thing here, too.')
  // 
  
  Dom.prototype.appendText = function (text) {
    return this.each(function (el) {
      el.innerText += text;
    });
  };

  // -------------------------
  // .prepend()
  // -------------------------
  // 
  // Set or return innerHTML of selected elements
  // 
  // .prepend( [html] )
  //    html (string) : The html to be prepended
  //
  // Examples:
  // 
  // $('p:first-child').prepend(' - From the first p child')
  // 

  Dom.prototype.prepend = function (html) {
    return this.each(function (el) {
      el.innerHTML = html + el.innerHTML;
    });
  };

  // -------------------------
  // .append()
  // -------------------------
  // 
  // Set or return innerHTML of selected elements
  // 
  // .append( [html] )
  //    html (string) : The html to be appended
  //
  // Examples:
  // 
  // $('p:first-child').append(' - From the first p child')
  // 
  
  Dom.prototype.value = function (val) {
    if (val) {
      return this.each(function (el) {
        el.value = val;
      });
    } else {
      this.first(function (el) {
        return el.value;
      });
    }
  };
  
  // --------------------------------------------------
  // Classes and IDs
  // --------------------------------------------------

  // -------------------------
  // .id()
  // -------------------------
  // 
  // Set or return id attribute of selected elements
  // 
  // .get()
  //
  // Examples:
  // 
  // $('p.rect').first().id('square')
  // 

  Dom.prototype.id = function (id) {
    if(id) {

      // Setting id of only one element because
      // id is intended to be an unique identifier

      return this.first(function(el) {
        el.id = id;
      });
    } else {
      return this.first(function (el) {
        return el.id;
      });
    }
  };

  // -------------------------
  // .class()
  // -------------------------
  // 
  // Add, remove or check classes of selected elements
  // based on action given
  // 
  // .class( action, className )
  //   action (string) : add, remove or has
  //   className (string|array) : class name or list of class names
  //
  // Examples:
  // 
  // $('div#editor').parent().hide()
  //

  Dom.prototype['class'] = feature.classList === true ? function (action, className) {
    return this.each(function (el) {
      var _i, parts, contains, res = [];

      if (typeof className === 'string') { // A String
        parts = className.split(" ");

        if (parts.length === 1) { // String, one class
          contains = el.classList.contains(className);

          switch (action) {
            case 'add':
              if (!contains) {
                el.classList.add(className);
              }

              break;
            case 'remove':
              if (contains) {
                el.classList.remove(className);
              }

              break;
            case 'has':
              res = true;
              break;
            case 'toggle':
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains) {
                  el.classList.remove(parts[_i]);
                } else {
                  el.classList.add(parts[_i]);
                }
              }
              break;
            default:
              throw new TypeError("Unknown value provided as first parameter to .class()");
          }
        } else { // String, many classes
          contains = function (className) {
            return el.classList.contains(className);
          };

          switch (action) {
            case 'add':
              for (_i = 0; _i < parts.length; _i += 1) {
                if (!contains(parts[_i])) {
                  el.classList.add(parts[_i]);
                }
              }

              break;
            case 'remove':
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.classList.remove(parts[_i]);
                }
              }

              break;
            case 'has':
              for (_i = 0; _i < parts.length; _i += 1) {
                res.push(contains(parts[_i]));
              }

              break;
            case 'toggle':
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.classList.remove(parts[_i]);
                } else {
                  el.classList.add(parts[_i]);
                }
              }
              break;
            default:
              throw new TypeError("Unknown value provided as first parameter to .class()");
          }
        }
      } else if (className.length) { // Array
        parts = className;

        contains = function (className) {
          return el.classList.contains(className);
        };

        switch (action) {
          case 'add':
            for (_i = 0; _i < parts.length; _i += 1) {
              if (!contains(parts[_i])) {
                el.classList.add(parts[_i]);
              }
            }

            break;
          case 'remove':
            for (_i = 0; _i < parts.length; _i += 1) {
              if (contains(parts[_i])) {
                el.classList.remove(parts[_i]);
              }
            }

            break;
          case 'has':
            for (_i = 0; _i < parts.length; _i += 1) {
              res.push(contains(parts[_i]));
            }

            break;
          case 'toggle':
            for (_i = 0; _i < parts.length; _i += 1) {
              if (contains(parts[_i])) {
                el.classList.remove(parts[_i]);
              } else {
                el.classList.add(parts[_i]);
              }
            }
            
            break;
          default:
            throw new TypeError("Unknown value provided as first parameter to .class()");
        }
      } else {
        throw new TypeError ("Please provide the right parameter (string or array) for .class()");
      }

      return typeof res === 'boolean' ? res : res.every(function (el) {
        return el === true;
      });
    });
  } : function (action, className) {
    return this.each(function (el) {
      var _i, parts, contains, res = [];

      if (typeof className === 'string') {
        parts = className.split(" ");

        if (parts.length === 1) {
          contains = el.className.split(className).length > 1;

          switch (action) {
            case 'add':
              if (!contains) {
                el.className += (className);
              }

              break;
            case 'remove':
              if (contains) {
                el.className.replace(className, '');
              }

              break;
            case 'has':
              res = contains;
              
              break;
            case 'toggle':
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains) {
                  el.className.replace(className, '');
                } else {
                  el.className += className;
                }
              }

              break;
            default:
              throw new TypeError("Unknown value provided as first parameter to .class()");
          }
        } else {
          contains = function (className) {
            return el.className.split(className).length > 1;
          };

          switch (action) {
            case 'add':
              for (_i = 0; _i < parts.length; _i += 1) {
                if (!contains(parts[_i])) {
                  el.className += parts[_i];
                }
              }

              break;
            case 'remove':
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.className.replace(parts[_i], '');
                }
              }

              break;
            case 'has':
              for (_i = 0; _i < parts.length; _i += 1) {
                res.push(contains(parts[_i]));
              }

              break;
            case 'toggle':
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.className.replace(parts[_i], '');
                } else {
                  el.className += parts[_i];
                }
              }

              break;
            default:
              throw new TypeError("Unknown value provided as first parameter to .class()");
          }
        }
      } else if (className.length) {
        contains = function (className) {
          return el.className.split(className).length > 1;
        };

        switch (action) {
          case 'add':
            for (_i = 0; _i < parts.length; _i += 1) {
              if (!contains(parts[_i])) {
                el.className += parts[_i];
              }
            }

            break;
          case 'remove':
            for (_i = 0; _i < parts.length; _i += 1) {
              if (contains(parts[_i])) {
                el.className.replace(parts[_i], '');
              }
            }

            break;
          case 'has':
            for (_i = 0; _i < parts.length; _i += 1) {
              res.push(contains(parts[_i]));
            }

            break;
          case 'toggle':
            for (_i = 0; _i < parts.length; _i += 1) {
              if (contains(parts[_i])) {
                el.className.replace(parts[_i], '');
              } else {
                el.className += parts[_i];
              }
            }

            break;
          default:
            throw new TypeError("Unknown value provided as first parameter to .class()");
        }
      } else {
        throw new TypeError ("Please provide the right parameter (string or array) for .class()");
      }

      return typeof res === 'boolean' ? res : res.every(function (el) {
        return el === true;
      });
    });
  };

  // -------------------------
  // .addClass()
  // -------------------------
  // 
  // Add class(es) to selected elements
  // 
  // .addClass( className )
  //   className (string|array) : The class(es to be added)
  //
  // Examples:
  // 
  // $('p').addClass('paragraph')
  // 

  Dom.prototype.addClass = function (className) {
    return this['class']('add', className);
  };

  // -------------------------
  // .removeClass()
  // -------------------------
  // 
  // Remove class(es) from selected elements
  // 
  // .removeClass( className )
  //   className (string|array) : The class(es to be added)
  //
  // Examples:
  // 
  // $('p').removeClass('hidden')
  //

  Dom.prototype.removeClass = function (className) {
    return this['class']('remove', className);
  };

  // -------------------------
  // .hasClass()
  // -------------------------
  // 
  // Check if all elements has class(es)
  // 
  // .hasClass( className )
  //   className (string|array) : The class(es to be added)
  //
  // Examples:
  // 
  // $('p').hasClass()
  //

  Dom.prototype.hasClass = function (className) {
    return this['class']('has', className);
  };

  // -------------------------
  // .toggleClass()
  // -------------------------
  // 
  // Add or remove class(es) based on existence
  // 
  // .hasClass( className )
  //   className (string|array) : The class(es to be added)
  //
  // Examples:
  // 
  // $('p').hasClass()
  //

  Dom.prototype.toggleClass = function (className) {
    return this['class']('toggle', className);
  };

  // -------------------------
  // .attr()
  // -------------------------
  // 
  // Set or return an attribute of selected elements
  // 
  // .attr( attr [, value] )
  //   attr (string) : Name of attribute
  //   value (any) : Value of attrib ute
  //
  // Examples:
  // 
  // $('p.hidden').attr('hidden')
  // $('div.edit').attr('contentEditable', 'true')
  // $('body').attr('hilo', '0.1.0')
  //
  
  Dom.prototype.attr = function (name, val) {
    if(val) {
      return this.each(function(el) {
        el.setAttribute(name, val);
      });
    } else {
      return this.first(function (el) {
        return el[name];
      });
    }
  };
  
  // --------------------------------------------------
  // Hilo CSS
  // --------------------------------------------------

  // Set a css prop. to s.el.
  // 
  // Syntax .css( prop [, value] )
  //
  // Examples:
  // 
  // $(selector).css('background-color', '#444')
  // var fontColor = $(selector).css('color')
  //

  Dom.prototype.css = function (prop, value) {
    if (value) { // If value arg. is given
      return this.each(function (el) {
        el.style[prop] = value; // Set CSS prop. to value
      });
    } else { // Otherwise, if value arg. is not given
      return this.first(function (el) {
        return el.style[prop]; // Return the style of that element
      });
    }
  };

  // Important CSS Properties
  //
  // Important CSS methods that are provided as public methods
  //

  impCss = [
    "width",
    "height",
    "fontFamily",
    "fontWeight",
    "fontDecoration",
    "textAlign",
    "textTransform",
    "color",
    "backgroundColor",
    "background",
    "margin",
    "padding",
    "top",
    "left",
    "bottom",
    "right"
    ];
  
  for(_i; _i < impCss; _i += 1) {
    Dom.prototype[impCss[_i]] = function (val) {
      this.css(impCss[_i], val);
    };
  }

  // Get computed style of the first element

  Dom.prototype.computed = function (prop) {
    return this.one(function (el) {
      return win.getComputedStyle(el)[prop];
    });
  };

  Dom.prototype.outerWidth = function () {
    return parseFloat(this.computed('width')) + 
    parseFloat(this.computed('paddingLeft')) + 
    parseFloat(this.computed('paddingRight')) + 
    parseFloat(this.computed('borderLeft')) + 
    parseFloat(this.computed('borderRight')) + "px";
  };

  Dom.prototype.innerWidth = function () {
    return parseFloat(this.computed('width')) + 
    parseFloat(this.computed('paddingLeft')) + 
    parseFloat(this.computed('paddingRight')) + "px";
  };

  Dom.prototype.outerHeight = function () {
    return parseFloat(this.computed('height')) + 
    parseFloat(this.computed('paddingTop')) + 
    parseFloat(this.computed('paddingBottom')) + 
    parseFloat(this.computed('borderTop')) + 
    parseFloat(this.computed('borderBottom')) + "px";
  };

  Dom.prototype.innerHeight = function () {
    return parseFloat(this.computed('height')) + 
    parseFloat(this.computed('paddingTop')) + 
    parseFloat(this.computed('paddingBottom')) + "px";
  };
  
  // --------------------------------------------------
  // DOM Extensions
  // --------------------------------------------------

  // -------------------------
  // .get()
  // -------------------------
  // 
  // Get an array of selected elements
  // 
  // .get()
  //
  // Examples:
  // 
  // $('script').get()
  //

  Dom.prototype.get = function () {
    var els = [];

    this.each(function (el) {
      els.push(el);
    });

    return els;
  };

  // --------------------------------------------------
  // Events
  // --------------------------------------------------

  Dom.prototype.on = (function () {
    if (document.addEventListener) {
      return function (evt, fn) {
        return this.each(function (el) {
          el.addEventListener(evt, fn, false);
        });
      };
    } else if (document.attachEvent)  {
      return function (evt, fn) {
        return this.each(function (el) {
          el.attachEvent("on" + evt, fn);
        });
      };
    } else {
      return function (evt, fn) {
        return this.each(function (el) {
          el["on" + evt] = fn;
        });
      };
    }
  }());

  Dom.prototype.off = (function () {
    if (document.removeEventListener) {
      return function (evt, fn) {
        return this.each(function (el) {
          el.removeEventListener(evt, fn, false);
        });
      };
    } else if (document.detachEvent)  {
      return function (evt, fn) {
        return this.each(function (el) {
          el.detachEvent("on" + evt, fn);
        });
      };
    } else {
      return function (evt) {
        return this.each(function (el) {
          el["on" + evt] = null;
        });
      };
    }
  }());
  
  // --------------------------------------------------
  // Events (imp.)
  // --------------------------------------------------

  Dom.prototype.ready = function (fn) {
    this.each(function (el) {
      el.onreadystatechange = function () {
        if (el.readyState = 'complete') {
          fn();
        }
      };
    });
  };

  impEvts = [
    "blur",
    "click",
    "change",
    "dblclick",
    "drag",
    "dragstart",
    "dragend",
    "dragenter",
    "dragleave",
    "dragover",
    "drop",
    "error",
    "focus",
    "keyup",
    "keydown",
    "keypress",
    "load",
    "mousedown",
    "mouseleave",
    "mouseenter",
    "mouseover",
    "mousemove",
    "mouseout",
    "ready",
    "submit"
  ];

  for (_i = 0; _i < impEvts.length; _i += 1) {
    Dom.prototype[impEvts[_i]] = function (fn) {
      this.on(impEvts[_i], fn);
    };
  }

  // --------------------------------------------------
  // Effects (fx)
  // --------------------------------------------------

  Dom.prototype.show = function (display) {
    display = display || '';

    return this.each(function (el) {
      el.style.display = display;
    });
  };

  Dom.prototype.hide = function () {
    return this.each(function (el) {
      el.style.display = 'none';
    });
  };

  Dom.prototype.toggle = function (display) {
    return this.each(function (el) {
      if (el.style.display === 'none') {
        el.style.display = display ? display : '';
      } else {
        el.style.display = 'none';
      }
    });
  };

  Dom.prototype.appear = function () {
    return this.each(function (el) {
      el.style.opacity = "1";
    });
  };

  Dom.prototype.disappear = function () {
    return this.each(function (el) {
      el.style.opacity = "0";
      el.style.cusor = "default";
    });
  };

  Dom.prototype.toggleVisibility = function () {
    return this.each(function (el) {
      if (el.style.opacity === "0") {
        el.style.opacity = "1";
      } else {
        el.style.opacity = "0";
        el.style.cusor = "default";
      }
    });
  };
  
  // --------------------------------------------------
  // Hilo Extension API
  // --------------------------------------------------
    
  hilo.Dom = Dom.prototype;
  hilo.Test = Test.prototype;
  hilo.qwery = select.pseudos;
  
  // --------------------------------------------------
  // Set event handler for triggering DOM Evenets
  // --------------------------------------------------
  
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
