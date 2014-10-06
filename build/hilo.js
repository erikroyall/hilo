// # Hilo

// `0.1.0-pre-dev-beta-10`<br/>

// Built on: 2014-10-06<br/>
// Project started before 1 year, 3 months and 6 days<br/>
// http://erikroyall.github.com/hilo<br/>
// Copyright (c) 2013 Erik Royall<br/>
// Licensed under MIT (see LICENSE-MIT) 

(function (A, M, D) {

  /* Register Hilo as an AMD module */

  /*globals YUI: false, module: false, define: false*/

  if (typeof module !== "undefined" && module.exports) {
    module.exports = D;
  } else if (typeof define === "function" && define.amd) {
    define(D);
  } else if (typeof YUI === "function") {
    YUI.add(A, D);
  } else {
    M[A] = D();
  }
}("Hilo", this, function () {
  /*jshint -W083, -W064, -W061, -W030*/

  /* JSHint escapes:
     - W083 - Don't make function within a loop (Evts)
     - W064 - Eval can be harmful (JSON)
     - W064 - Missing new prefix when invoking constructor (Sizzle)
     - W030 - Saw an expression (Sizzle, Me) */

  "use strict";
  
  var hilo             /* Public API */

    /* Used to measure performace (Hilo.perf) */
    , start

    /* References to browser objects */
    , win = window        // Reference to window
    , doc = win.document  // Reference to document

    /* Used for storing detected features */
    , detected

    /* Key mappings (Hilo.keys) */
    , key

    /*Array of callbacks to be exec.ed on DOMReady */
    , callbacks = []   // Array of functions to be executed on DOMReady

    /* Private Selector Function */
    , select

    /* Feature Detection (Hilo.feature) */
    , feature

    /* Main AJAX function (Hilo.ajax) */
    , hiloAjax

    /* hasOwnProperty helper */
    , own = function (obj, prop) {
      return obj.hasOwnProperty(prop);
    }

    /* Loop Variable */
    , _i;
  
  /* Start performace testing */
  start = new Date().getTime();
  
  // ## Feature Detection
  feature = (function () {
    var c = function (tagName) {
        return doc.createElement(tagName);
      }
      , i = c("input")
      , d = c("div")
      , cn = c("canvas")
      , fr = c("iframe")
      , is = function (i, attr, val) {
        return !!(i.setAttribute (attr, val));
      }
      , a = c("audio")
      , s = c("span")
      , v = c("video")
      , xr = new XMLHttpRequest();

    return {

      // addEventListener()
      addEventListener: (function () {
        return typeof win.addEventListener === "function";
      }()),

      // Application Cache (or Offline Web Apps)
      applicationCache: (function () {
        return !!win.applicationCache;
      }()),

      // Audio (tag)
      audio: (function () {
        return !!a.canPlayType;
      }()),

      // Preload audio (hmm.. background music?)
      audioPreload: (function () {
        return "preload" in a;
      }()),

      // Audio Types
      audioType: {

        // MP3 audio format
        mp3: (function () {
          return !!(a.canPlayType && a.canPlayType("audio/mpeg;").replace(/no/, ""));
        }()),

        // Vorbis audio format
        vorbis: (function () {
          return !!(a.canPlayType && a.canPlayType("audio/ogg; codecs='vorbis'").replace(/no/, ""));
        }()),

        // MS WAV audio format
        wav: (function () {
          return !!(a.canPlayType && a.canPlayType("audio/wav; codecs='1'").replace(/no/, ""));
        }()),

        // AAC audio format
        aac: (function () {
          return !!(a.canPlayType && a.canPlayType("audio/mp4; codecs='mp4a.40.2'").replace(/no/, ""));
        }())
      },

      // Canvas API  
      canvas: (function () {
        return !!cn.getContext;
      }()),

      // Canvas Text
      canvasText: (function () {
        return !!cn.getContext && typeof cn.getContext("2d").fillText === "function";
      }()),

      // classList prop. in HTMLElement  
      classList: (function () {
        return "classList" in s;
      }()),

      // Command  
      command: (function () {
        return "type" in c("command");
      }()),

      // Form Constraint Validation
      consval: (function () {
        return "noValidate" in c("form");
      }()),

      // contentEditable attribute
      contentEditable: (function () {
        return "isContentEditable" in s;
      }()),

      // Datalist (tag)   
      datalist: (function () {
        return "options" in c("datalist");
      }()),

      // Details (tag)
      details: (function () {
        return "open" in c("details");
      }()),

      // Drag & Drop   
      dragdrop: (function () {
        return "draggable" in s;
      }()),

      // ECMAScript 6   
      es6: (function () {
        return typeof String.prototype.contains === "function";
      }()),

      // File system API  
      fileapi: (function () {
        return typeof FileReader !== "undefined";
      }()),

      // 5th Generation Rendering Engine 
      gen5: (function () {
        return parseInt(win.navigator.appVersion, 10) === 5;
      }()),

      // Geolocation
      geolocation: (function () {
        return "geolocation" in win.navigator;
      }()),

      // window.getSelection() method
      getSelection: (function () {
        return typeof win.getSelection === "function";
      }()),

      // History API
      history: (function () {
        return !!(win.history && history.pushState);
      }()),

      // IFrame
      iframe: {
        sandbox: (function () {
          return "sandbox" in fr;
        }()),
        srdoc: (function () {
          return "srcdoc" in fr;
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
          return "autofocus" in i;
        }()),

        // Placeholder
        placeholder: (function () {
          return "placeholder" in i;
        }()),

        // Input Types (they are pretty self-explanatory)
        type: {
          color: (function () {
            is(i, "type", "color");
            return i.type !== "text";
          }()),
          date: (function () {
            is(i, "type", "date");
            return i.type !== "text";
          }()),
          datetime: (function () {
            is(i, "type", "datetime");
            return i.type !== "text";
          }()),
          datetimeLocal: (function () {
            is(i, "type", "datetime-local");
            return i.type !== "text";
          }()),
          email: (function () {
            is(i, "type", "email");
            return i.type !== "text";
          }()),
          month: (function () {
            is(i, "type", "month");
            return i.type !== "text";
          }()),
          number: (function () {
            is(i, "type", "number");
            return i.type !== "text";
          }()),
          range: (function () {
            is(i, "type", "range");
            return i.type !== "text";
          }()),
          search: (function () {
            is(i, "type", "search");
            return i.type !== "text";
          }()),
          tel: (function () {
            is(i, "type", "tel");
            return i.type !== "text";
          }()),
          time: (function () {
            is(i, "type", "time");
            return i.type !== "text";
          }()),
          week: (function () {
            is(i, "type", "week");
            return i.type !== "text";
          }())
        }
      },

      // Local Storage 
      localStorage: (function () {
        try {
          return "localStorage" in win && win["localStorage"] !== null && !!win.localStorage.setItem;
        } catch(e){
          return false;
        }
      }()),

      // Meter (tag)  
      meter: (function () {
        return "value" in c("meter");
      }()),

      // Microdata 
      microdata: (function () {
        return "getItems" in doc;
      }()),

      // Offline (App Cache)    
      offline: (function () {
        return !!win.applicationCache;
      }()),

      // Output (tag) 
      output: (function () {
        return "value" in c("output");
      }()),

      // Progress (tag)
      progress: (function () {
        return "value" in c("progress");
      }()),

      // querySelector & querySelectorAll
      qsa: (function () {
        return "querySelector" in doc && "querySelectorAll" in doc;
      }()),

      // CSS3 Selectors in querySelectorAll
      qsa3: (function () {
        try {
          return doc.querySelectorAll(":root").length > 0;
        } catch (e) {
          return false;
        }
      }()),

      // requestAnimationFrame
      requestAnimationFrame: (function () {
        if (typeof requestAnimationFrame === "function") {
          return true;
        } else if (typeof msRequestAnimationFrame === "function") {
          return "ms";
        } else if (typeof webkitRequestAnimationFrame === "function") {
          return "webkit";
        } else if (typeof mozRequestAnimationFrame === "function") {
          return "moz";
        } else {
          return false;
        }
      }()),

      // Server-sent Events
      serverEvt: (function () {
        return typeof EventSource !== "undefined";
      }()),

      // Session Storage
      sessionStorage: (function () {
        try {
          return "sessionStorage" in win && win["sessionStorage"] !== null;
        } catch(e) {
          return false;
        }
      }()),

      // Modal Dialog (showModalDialog)
      showModalDialog: (function () {
        return typeof win.showModalDialog === "function";
      }()),

      // SVG (Scalable Vector Graphics)
      svg: (function () {
        return !!(doc.createElementNS && doc.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);
      }()),

      // SVG in text/html
      svginhtml:(function () {
        d.innerHTML = "<svg></svg>";
        return !!(win.SVGSVGElement && d.firstChild instanceof win.SVGSVGElement);
      }()),

      // Template (tag)
      template: (function () {
        return "content" in c("template");
      }()),

      // Time (tag)
      time: (function () {
        return "datetime" in c("time");
      }()),

      // Undo (not just Ctrl + Z)
      undo: (function () {
        return typeof UndoManager !== "undefined";
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
      videoCaptions: (function () {
        return "src" in c("track");
      }()),

      // Video Formats
      videoFormats: {

        // H264 Video Format (MP4)
        h264: (function () {
          try {
            return v.canPlayType("video/mp4; codecs='avc1.42E01E, mp4a.40.2'");
          } catch (e) {
            return false;
          }
        }()),

        // WebM Video Format
        webm: (function () {
          try {
            return v.canPlayType("video/webm; codecs='vp8, vorbis'");
          } catch (e) {
            return false;
          }
        }()),

        // OGG Theora Video Format
        ogg: (function () {
          try {
            return v.canPlayType("video/ogg; codecs='theora, vorbis'");
          } catch (e) {
            return false;
          }
        }())
      },

      // Video Poster
      videoPoster: (function () {
        return "poster" in c("video");
      }()),

      // Web Audio API (NOT the <audio> tag)
      webAudio: (function () {
        // return !!(win.webkitAudioContext || win.AudioContext);
        if (win.AudioContext) {
          return true;
        } else if (win.webkitAudioContext) {
          return "webkit";
        }

        return false;
      }()),

      // WebSockets
      webSockets: (function () {
        return !!win.webSocket;
      }()),

      // WebSQL (a deprecated specification; use IndexedDB instead)
      websql: (function () {
        return !!win.openDatabase;
      }()),

      // Web Workers
      webWorkers: (function () {
        return !!win.Worker;
      }()),

      // Widgets
      widgets: (function () {
        return typeof widget !== "undefined";
      }()),

      // Cross-document messaging
      xdocmsg: (function () {
        return !!win.postMessage;
      }()),

      // XML HTTP Request
      xhr: {

        // Cross-domain requests
        xdr: (function () {
          return "withCredentials" in xr;
        }()),

        // Send as form data
        formdata: (function () {
          return !!win.FormData;
        }()),

        // Upload progress events
        upe: (function () {
          return "upload" in xr;
        }())
      }
    };
  }());  
  
  // ## Browser, Engine, Platform Detection

  detected = (function () {
    var engine
      , browser
      , system
      , ua = win.navigator.userAgent
      , safariVersion
      , p;

    // Browser
    browser = {
      ie: 0,
      firefox: 0,
      safari: 0,
      konq: 0,
      opera: 0,
      chrome: 0,

      // Specific Version
      ver: null
    };

    // System
    system = {
      win: false,
      mac: false,
      x11: false,

      /* Mobile Devices */
      iphone: false,
      ipod: false,
      ipad: false,
      ios: false,
      android: false,
      nokiaN: false,
      winMobile: false,

      /* Game Consoles */
      wii: false,
      ps: false
    };

    // Redering engine
    engine = {
      ie: 0,
      gecko: 0,
      webkit: 0,
      khtml: 0,
      opera: 0,

      /* Complete version*/
      ver: null
    };

    if(window.opera) {
      engine.ver = browser.ver = window.opera.version();
      engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
      engine.ver = RegExp["$1"];
      engine.webkit = parseFloat(engine.ver);

      /* Figures out if chrome or Safari */

      if (/Chrome\/(\S+)/.test(ua)) {
        browser.ver = RegExp["$1"];
        browser.chrome = parseFloat(browser.ver);
      } else if (/Version\/(\S+)/.test(ua)) {
        browser.ver = RegExp["$1"];
        browser.safari = parseFloat(browser.ver);
      } else {
        
        /* Approximate version */
        safariVersion = 1;

        if (engine.webkit < 100) {
          safariVersion = 1;
        } else if (engine.webkit < 312) {
          safariVersion = 1.2;
        } else if (engine.webkit < 412) {
          safariVersion = 1.3;
        } else {
          safariVersion = 2;
        }

        browser.safari = browser.ver = safariVersion;
      }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
      engine.ver = browser.ver = RegExp["$1"];
      engine.khtml = browser.konq = parseFloat(engine.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
      engine.ver = RegExp["$1"];
      engine.gecko = parseFloat(engine.ver);

      /* Determine if it's firefox */
      if (/Firefox\/(\S+)/.test(ua)) {
        browser.ver = RegExp["$1"];
        browser.firefox = parseFloat(browser.ver);
      }
    } else if (/MSIE ([^;]+)/.test(ua)) {
      engine.ver = browser.ver = RegExp["$1"];
      engine.ie = browser.ie = parseFloat(engine.ver);
    }

    /* Detect browsers */
    browser.ie = engine.ie;
    browser.opera = engine.opera;

    /* Detect platform */
    p = navigator.platform;

    system.win = p.indexOf("Win") === 0;
    system.mac = p.indexOf("Mac") === 0;
    system.x11 = (p === "X11") || (p.indexOf("Linux") === 0);

    /* Detecting Windows OSs */
    if (system.win) {
      if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
        if (RegExp["$1"] === "NT") {
          switch(RegExp["$2"]) {
            case "5.0":
              system.win = "2000";
              break;
            
            case "5.1":
              system.win = "XP";
              break;
            
            case "6.0":
              system.win = "Vista";
              break;
            
            case "6.1":
              system.win = "7";
              break;
            
            default:
              system.win = "NT";
              break;
          }
        } else if (RegExp["$1"] === "9x") {
          system.win = "ME";
        } else {
          system.win = RegExp["$1"];
        }
      }
    }

    /* Mobile Devices */
    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.ipad = ua.indexOf("iPad") > -1;
    system.nokiaN = ua.indexOf("NokiaN") > -1;

    /* Windows Mobile */
    if (system.win === "CE") {
      system.winMobile = system.win;
    } else if (system.win === "Ph") {
      if (/Windows Phone OS(\d+.\d+)/.test(ua)) {
        system.win = "Phone";
        system.winMobile = parseFloat(RegExp["$1"]);
      }
    }

    /* Determine iOS Version */
    if (system.mac && ua.indexOf("Mobile") > -1) {
      if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
        system.ios = parseFloat(RegExp["$1"].replace("_", "."));
      } else {
        system.ios = 2; // Can't really detect - so guess
      }
    }

    /* Determine Android Version */
    if (/Android (\d+\.\d+)/.test(ua)) {
      system.android = parseFloat(RegExp["$1"]);
    }

    /* Gaming Consoles */
    system.wii = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);

    /* Name and Version */
    if (system.win) {
      system.name = "Windows";
      system.version = system.win;
    } else if (system.mac) {
      system.name = "Mac";
    } else if (system.x11) {
      system.name = "Linux";
    } else {
      system.name = "Some other";
    }

    /* Engines */
    if (browser.ie) {
      browser.name = "IE";
      browser.version = browser.ie;
    } else if (browser.chrome) {
      browser.name = "Chrome";
      browser.version = browser.chrome;
    } else if (browser.safari) {
      browser.name = "Safari";
      browser.version = browser.safari;
    } else if (browser.konq) {
      browser.name = "Konqueror";
      browser.version = browser.konq;
    } else if (browser.opera) {
      browser.name = "Opera";
      browser.version = browser.opera;
    } else if (browser.firefox) {
      browser.name = "Firefox";
      browser.version = browser.firefox;
    }

    /* return them */
    return {
      engine: engine,
      browser: browser,
      system: system
    };
  }());

  // --------------------------------------------------
  // JSON
  // --------------------------------------------------

  /*!
   * JSON Parser (Public Domain)
   * by Douglas Crockford
   * http://javascript.crockford.com/
   */

  // Create a json object only if one does not already exist. We create the
  // methods in a closure to avoid creating global variables.

  var json = {};

  (function () {

    if (typeof window.JSON === "object" && typeof window.JSON.parse === "function") {
      json = window.JSON;
      
      return;
    }

    function f (n) {
      // Format integers to have at least two digits.
      return n < 10 ? "0" + n : n;
    }

    if (typeof Date.prototype.tojson !== "function") {

      Date.prototype.tojson = function () {

        return isFinite(this.valueOf()) ?
            this.getUTCFullYear()     + "-" +
            f(this.getUTCMonth() + 1) + "-" +
            f(this.getUTCDate())      + "T" +
            f(this.getUTCHours())     + ":" +
            f(this.getUTCMinutes())   + ":" +
            f(this.getUTCSeconds())   + "Z"
          : null;
      };

      String.prototype.tojson =
        Number.prototype.tojson  =
        Boolean.prototype.tojson = function () {
          return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {    // table of character substitutions
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        "\"" : "\\\"",
        "\\": "\\\\"
      },
      rep;

    function quote(string) {

      // If the string contains no control characters, no quote characters, and no
      // backslash characters, then we can safely slap some quotes around it.
      // Otherwise we must also replace the offending characters with safe escape
      // sequences.

      escapable.lastIndex = 0;
      return escapable.test(string) ? "\"" + string.replace(escapable, function (a) {
        var c = meta[a];
        return typeof c === "string" ? c
          : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
      }) + "\"" : "\"" + string + "\"";
    }


    function str(key, holder) {

      // Produce a string from holder[key].

      var i,          // The loop counter.
        k,          // The member key.
        v,          // The member value.
        length,
        mind = gap,
        partial,
        value = holder[key];

      // If the value has a tojson method, call it to obtain a replacement value.

      if (value && typeof value === "object" &&
          typeof value.tojson === "function") {
        value = value.tojson(key);
      }

      // If we were called with a replacer function, then call the replacer to
      // obtain a replacement value.

      if (typeof rep === "function") {
        value = rep.call(holder, key, value);
      }

      // What happens next depends on the value"s type.

      switch (typeof value) {
      case "string":
        return quote(value);

      case "number":

        // json numbers must be finite. Encode non-finite numbers as null.

        return isFinite(value) ? String(value) : "null";

      case "boolean":
      case "null":

        // If the value is a boolean or null, convert it to a string. Note:
        // typeof null does not produce "null". The case is included here in
        // the remote chance that this gets fixed someday.

        return String(value);

      // If the type is "object", we might be dealing with an object or an array or
      // null.

      case "object":

        // Due to a specification blunder in ECMAScript, typeof null is "object",
        // so watch out for that case.

        if (!value) {
          return "null";
        }

        // Make an array to hold the partial results of stringifying this object value.

        gap += indent;
        partial = [];

        // Is the value an array?

        if (Object.prototype.toString.apply(value) === "[object Array]") {

          // The value is an array. Stringify every element. Use null as a placeholder
          // for non-json values.

          length = value.length;
          
          for (i = 0; i < length; i += 1) {
            partial[i] = str(i, value) || "null";
          }

          // Join all of the elements together, separated with commas, and wrap them in
          // brackets.

          v = partial.length === 0 ? "[]"
            : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
            : "[" + partial.join(",") + "]";

          gap = mind;

          return v;
        }

        // If the replacer is an array, use it to select the members to be stringified.

        if (rep && typeof rep === "object") {
          length = rep.length;
          for (i = 0; i < length; i += 1) {
            if (typeof rep[i] === "string") {
              k = rep[i];
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        } else {

          // Otherwise, iterate through all of the keys in the object.

          for (k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = str(k, value);
              if (v) {
                partial.push(quote(k) + (gap ? ": " : ":") + v);
              }
            }
          }
        }

        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.

        v = partial.length === 0 ? "{}"
          : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
          : "{" + partial.join(",") + "}";

        gap = mind;

        return v;
      }
    }

    // If the json object does not yet have a stringify method, give it one.

    if (typeof json.stringify !== "function") {
      json.stringify = function (value, replacer, space) {

        // The stringify method takes a value and an optional replacer, and an optional
        // space parameter, and returns a json text. The replacer can be a function
        // that can replace values, or an array of strings that will select the keys.
        // A default replacer method can be provided. Use of the space parameter can
        // produce text that is more easily readable.

        var i;
        gap = "";
        indent = "";

        // If the space parameter is a number, make an indent string containing that
        // many spaces.

        if (typeof space === "number") {
          for (i = 0; i < space; i += 1) {
            indent += " ";
          }

        // If the space parameter is a string, it will be used as the indent string.

        } else if (typeof space === "string") {
          indent = space;
        }

        // If there is a replacer, it must be a function or an array.
        // Otherwise, throw an error.

        rep = replacer;
        if (replacer && typeof replacer !== "function" &&
            (typeof replacer !== "object" ||
            typeof replacer.length !== "number")) {
          throw new Error("json.stringify");
        }

        // Make a fake root object containing our value under the key of "".
        // Return the result of stringifying the value.

        return str("", {"": value});
      };
    }


    // If the json object does not yet have a parse method, give it one.

    if (typeof json.parse !== "function") {
      json.parse = function (text, reviver) {

        // The parse method takes a text and an optional reviver function, and returns
        // a JavaScript value if the text is a valid json text.

        var j;

        function walk(holder, key) {

          // The walk method is used to recursively walk the resulting structure so
          // that modifications can be made.

          var k, v, value = holder[key];
          if (value && typeof value === "object") {
            for (k in value) {
              if (Object.prototype.hasOwnProperty.call(value, k)) {
                v = walk(value, k);
                if (v !== undefined) {
                  value[k] = v;
                } else {
                  delete value[k];
                }
              }
            }
          }
          return reviver.call(holder, key, value);
        }


        // Parsing happens in four stages. In the first stage, we replace certain
        // Unicode characters with escape sequences. JavaScript handles many characters
        // incorrectly, either silently deleting them, or treating them as line endings.

        text = String(text);
        cx.lastIndex = 0;
        if (cx.test(text)) {
          text = text.replace(cx, function (a) {
            return "\\u" +
              ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
          });
        }

        // In the second stage, we run the text against regular expressions that look
        // for non-json patterns. We are especially concerned with "()" and "new"
        // because they can cause invocation, and "=" because it can cause mutation.
        // But just to be safe, we want to reject all unexpected forms.

        // We split the second stage into 4 regexp operations in order to work around
        // crippling inefficiencies in IE's and Safari's regexp engines. First we
        // replace the json backslash pairs with "@" (a non-json character). Second, we
        // replace all simple value tokens with "]" characters. Third, we delete all
        // open brackets that follow a colon or comma or that begin the text. Finally,
        // we look to see that the remaining characters are only whitespace or "]" or
        // "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

        if (/^[\],:{}\s]*$/
            .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
              .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
              .replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {

          // In the third stage we use the eval function to compile the text into a
          // JavaScript structure. The "{" operator is subject to a syntactic ambiguity
          // in JavaScript: it can begin a block or an object literal. We wrap the text
          // in parens to eliminate the ambiguity.

          j = eval("(" + text + ")");

          // In the optional fourth stage, we recursively walk the new structure, passing
          // each name/value pair to a reviver function for possible transformation.

          return typeof reviver === "function" ? walk({"": j}, "") : j;
        }

        // If the text is not json parseable, then a SyntaxError is thrown.

        throw new SyntaxError("json.parse");
      };
    }
  }());


  // --------------------------------------------------
  // Utilities
  // --------------------------------------------------

  var boxedString = Object("a")
    , splitString = boxedString[0] !== "a" || !(0 in boxedString);

  var toObject = function toObject (o) {
    if (typeof o === "undefined") { // this matches both null and undefined
      throw new TypeError("can't convert "+o+" to object");
    }

    return Object(o);
  };

  var toInteger = function toInteger (value) {
    var number = +value;

    if (Number.isNaN(number)) {
      return 0;
    }

    if (number === 0 || !isFinite(number)) {
      return number;
    }

    return sign(number) * Math.floor(Math.abs(number));
  };

  var isPrimitive = function isPrimitive(input) {
    var type = typeof input;
    
    return (
      input === null ||
      type === "undefined" ||
      type === "boolean" ||
      type === "number" ||
      type === "string"
    );
  };

  var toPrimitive = function toPrimitive (input) {
    var val, valueOf, toString;

    if (isPrimitive(input)) {
      return input;
    }

    valueOf = input.valueOf;

    if (typeof valueOf === "function") {
      val = valueOf.call(input);

      if (isPrimitive(val)) {
        return val;
      }
    }
    toString = input.toString;
    
    if (typeof toString === "function") {
      val = toString.call(input);

      if (isPrimitive(val)) {
        return val;
      }
    }

    throw new TypeError();
  };

  var sign = function sign(value) {
    var number = +value;

    if (number === 0) {
      return number;
    }

    if (Number.isNaN(number)) {
      return number;
    }

    return number < 0 ? -1 : 1;
  };

  // --------------------------------------------------
  // Array Utilities
  // --------------------------------------------------

  // Executes a function on each of the element
  // in the array
  var each = function each (arr, fn, thisRef) {
    var _i, _l;

    // Use Array.prototype.forEach if available
    if (Array.prototype.forEach) {
      return Array.prototype.forEach.call(arr, fn);
    }

    // Throw an error if array and function are not provided
    if (!(arr && fn)) {
      throw new Error (
        "Not enough arguments provided for each()"
      );
    }

    // Make the this variable the array itself if not provided
    thisRef = thisRef || arr;

    for (_i = 0, _l = arr.length; _i < _l; _i += 1) {
      fn.call(thisRef, arr[_i]);
    }
  };

  // Iterate over an object and execute a function on each 'value'
  // of it
  var forIn = function forIn (obj, fn, thisRef) {
    var _i;

    // Throw an error if object and function are not provided
    if (!(obj && fn)) {
      throw new Error (
        "Not enough arguments provided for forIn()"
      );
    }

    // Make the given object as the `this` value if one is not provided
    thisRef = thisRef || obj;

    for (_i in obj) {
      if (own(obj, _i)) {
        fn.call(thisRef, _i);
      }
    }
  };

  // Append all the properties of the second object to the first
  var extend = function extend (obj, ext) {
    var _i;

    // Throw an error if object and extension are not provided
    if (!(obj && ext)) {
      throw new Error (
        "Not enough arguments provided for extend()"
      );
    }

    for (_i in ext) {
      if (own(ext, _i)) {
        obj[_i] = ext[_i];
      }
    }

    return obj;
  };

  // Check if every element in the object passes the test
  var every = function every (o, fun) {
    var t, len, thisp, _i;

    if (o === null) {
      throw new TypeError();
    }

    t = Object(o);
    len = t.length >>> 0;

    if (typeof fun !== "function") {
      throw new TypeError();
    }

    thisp = arguments[1];

    for (_i = 0; _i < len; _i++) {
      if (_i in t && !fun.call(thisp, t[_i], _i, t)) {
        return false;
      }
    }

    return true;
  };

  // --------------------------------------------------
  // String Utilities
  // --------------------------------------------------

  // Remove whitespace at the start and end of a string
  var trim = function trim (str) {
    var ws = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003" + 
             "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028" + 
             "\u2029\uFEFF";

    ws = "[" + ws + "]";

    var trimBeginRegexp = new RegExp("^" + ws + ws + "*"),
      trimEndRegexp = new RegExp(ws + ws + "*$");

    if (str === void 0 || str === null) {
      throw new TypeError("can't convert "+ str +" to object");
    }

    return String(str).replace(trimBeginRegexp, "").replace(trimEndRegexp, "");
  };

  // Check if a string contains another string in it
  var contains = function contains (haystack, needle) {
    var position = arguments[1];

    return haystack.indexOf(needle, position) !== -1;
  };

  var indexOf = function indexOf(arr, sought /*, fromIndex */ ) {
    var self = splitString && arr.toString() === "[object String]" ?
            this.split("") :
            toObject(this)
      , length = self.length >>> 0;

    if (!length) {
        return -1;
    }

    var i = 0;

    if (arguments.length > 1) {
        i = toInteger(arguments[1]);
    }

    // handle negative indices
    i = i >= 0 ? i : Math.max(0, length + i);

    for (; i < length; i++) {
        if (i in self && self[i] === sought) {
            return i;
        }
    }
    
    return -1;
  };
  
  // --------------------------------------------------
  // Core Library
  // --------------------------------------------------

  // If there is a select function (sizzle), use it
  // or use the native querySelectorAll()
  select = select || function (selector, root) {

    // Set root to given root or document
    root = root || doc;

    // Use the native querySelectorAll
    return root.querySelectorAll(selector);
  };

  /**
   * The main Hilo Object / function
   * 
   * @module Hilo
   * @static
   * @class hilo
   * @author Erik Royall
   */
  hilo = function (input, root, en) {
    if (typeof input === "undefined") {
      // It's better than not returning anything
      return win.Hilo;
    } else if (typeof input === "number") {
      return new NumberObject(input);
    } else if (typeof input === "string") {
      if (trim(input) === "") {
        // Can't pass empty string to querySelectorAll()
        return new Dom({length:0});
      }
      
      // Most common, return based on selector
      return new Dom(select(input, root, en), input);
    } else if (typeof input === "function") {
      if (document.readyState === "complete") {
        input();
      } else {
        callbacks.push(input);
      }

      // Allows to immediately start executing more code
      // It's better than not returning anything!
      return win.Hilo;
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
  hilo.version = "0.1.0-pre-dev-beta-9";

  // Detections
  hilo.feature = feature;
  hilo.browser = detected.browser;
  hilo.engine = detected.engine;
  hilo.platform = detected.system;

  // ES Utils
  extend(hilo, {
    each: each,
    extend: extend,
    every: every,
    trim: trim,
    contains: contains,
    indexOf: indexOf,
    isPrimitive: isPrimitive,
    toObject: toObject,
    toInteger: toInteger,
    toPrimitive: toPrimitive
  });

  // JSON
  hilo.json = {
    parse: json.parse,
    stringify: json.stringify
  };

  // Legacy
  hilo.legacy = typeof sizzle === "function";
  
  // --------------------------------------------------
  // Testing
  // --------------------------------------------------

  extend(hilo, {

    /**
     * Public test function
     *
     * @for hilo
     * @method test
     * @param con
     * @return {Test}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $.test("hello");
     * </pre></div>
     * 
     * <div class="code"><pre class="prettyprint">
     * $.test({
     *   name: "Erik Royall",
     *   age: 14,
     *   projects: ["hilo", "helio"]
     * });
     * </pre></div>
     * @since 0.1.0
     */
    test: function (con) {
      return new Test(con);
    }
  });

  /**
   * Main Test Class
   *
   * @constructor
   * @class Test
   * @param {Any} con To compare
   * @param {boolean} neg Whether to inverse the result
   * @return void
   * @example
   * <div class="code"><pre class="prettyprint">
   * new Test({});
   * new Test("Hilo", true);
   * </pre></div>
   * @since 0.1.0
   */
  function Test (con, neg) {
    this.con = con;
    
    if (neg) {
      this.neg = true;
    }
  }
    
  // --------------------------------------------------
  // Test Comparisions
  // --------------------------------------------------

  extend(Test.prototype, {

    /**
     * Test if equal
     *
     * @for Test
     * @method ifEquals
     * @param {Any} tw Comparision object
     * @return {boolean}
     * @example
     * <div class="code"><pre class="prettyprint">
     * var isIt = $.test(hilo.version).ifEquals("v0.1.0-pre-dev-beta-9");
     * </pre></div>
     * @since 0.1.0
     */
    ifEquals: function (tw) {
      var val = this.con === tw;
      return this.neg ? !val : val;
    },

    /**
     * Test if contains
     *
     * @for Test
     * @method ifContains
     * @param {Any} tw Comparision object
     * @return {boolean}
     * @example
     * <div class="code"><pre class="prettyprint">
     * var isHiloBeta = $.test(hilo.version).ifContains("beta");
     * </pre></div>
     * @since 0.1.0
     */
    ifContains: function (tw) {
      var ifString = this.con.split(tw).length === 1 ? false : true;
      if (typeof tw === "string" && typeof this.con === "object" && this.con.length) {

      } else if (typeof tw === "string" && typeof this.con === "string") {
        return this.neg ? !ifString : ifString;
      }
    },

    /**
     * Inverse a test
     *
     * @for Test
     * @method not
     * @return {Test}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("Hilo.js").not().ifEquals("Hilo");
     * </pre></div>
     * @since 0.1.0
     */
    not: function () {
      return new Test(this, true);
    }
  });

  //
  // ** `hiloAjax` **
  //
  // Makes an AJAX request
  //
  // Param:
  // 
  // `config // {Object} Configuration Options`
  //
  // For the list of all config opts, see below.
  //
  // Example:
  //
  // ```
  // Hilo.ajax({
  //   url: "requestHandler.php",
  //   success: function (data, xhr) {
  //     console.log(data, xhr);
  //   },
  //   method: "GET"
  // });
  // ```
  //
  hiloAjax = function (config) {
    
    // ```
    // config.
    //  method // HTTP Method (default: "POST")
    //  url // The file to send request
    //  async // Whether to perform an asynchronous request (default: true)
    //  data // Data to be sent to the server
    //  response // HTTP Response type
    //  callback // function to be executed on readystatechange
    //  complete // {Function} (xhr.readyState = 4) To be triggered when request is complete
    //  error // {Function} To be triggered when request fails with an error
    //  timeout // {Function} To be triggered when request time's out
    //  success // {Function} (200) To be triggered when request is successfully made (Commonly registered event)
    //  notfound // {Function} (404) To be triggered when there has been a 4oh4 NotFound exception
    //  forbidden // {Function} (403) To be triggered when making the request is forbidden
    //  username // {String} Username to be provided, if authentication is required
    //  password // {String} Password to be provided, if...
    //  contentType // HTTP Content-Type
    // ```
    
    var xhr;

    /* Use the `XMLHttpRequest` object if available
       or use `ActiveXObject` */
    if (win.XMLHttpRequest) {
      xhr = new win.XMLHttpRequest();
    } else if (win.ActiveXObject) {
      xhr = new win.ActiveXObject("Microsoft.XMLHTTP");
    }

    /* Throw an error if a URL hasn't been provided
       Seriously, wth can this do without a target url? */
    if (!config.url) {
      throw new TypeError("url parameter not provided to hilo.ajax");
    }

    /* Perform an asynchronous request by default */
    config.async = config.async || true;

    /* Authentication params */
    config.username = config.username || null;
    config.password = config.password || null;

    /* contentType.. "application/x-www-form-urlencoded; charset=UTF-8" is preferred */
    config.contentType = config.contentType || "application/x-www-form-urlencoded; charset=UTF-8";

    xhr.onreadystatechange = function () {
      if (config.callback) {
        config.callback(xhr);
      }

      if (xhr.readyState === 4) { // Request is completed
        typeof config.complete ? config.complete.call(this, xhr) : null;
        
        switch (xhr.status) {
          case 200: // Success
            typeof config.success ? config.success.call(this, xhr) : null;
            typeof config.error ? config.error.call(this, xhr) : null;
            break;

          case 404: // Not Found
            typeof config.notfound ? config.notfound.call(this, xhr) : null;
            typeof config.error ? config.error.call(this, xhr) : null;
            break;

          case 403: // Forbidden
            typeof config.forbidden ? config.forbidden.call(this, xhr) : null;
            typeof config.error ? config.error.call(this, xhr) : null;
            break;

          default: // Some Error
            typeof config.error ? config.error.call(this, xhr) : null;
            break;
        }
      } else if (xhr.readyState === 3) {
        typeof config.sent ? config.sent.call(this, xhr) : null;
      }
    };

    /* Run this function when the request has timed out :'( */
    xhr.timeout = config.timeout;

    /* Open the request (Could've been more verbose) */
    xhr.open(
      config.method.trim().toUpperCase() || "POST",
      config.url,
      config.async,
      config.username,
      config.password
    );

    /* If config.data is an object, JSON.encode it */
    if (typeof config.data === "object") {
      config.data = JSON.encode(config.data);
    }

    /* Lauch the request */
    xhr.send(typeof config.data === "string" ? config.data : null);
  };

  hilo.ajax = hiloAjax;  

  //
  // `ajaxRequest` _Internal_
  // 
  // Param:
  // 
  // * `method`: {String} HTTP Method
  // * `strOpt`: {String} URL, or options object (see above)
  // * `callback`: {Function} To be executed on `success`
  // * `oOpt`: {Object} For providing more options
  // 

  function ajaxRequest (method, strOpt, callback, oOpt) {

    oOpt = (typeof oOpt === "object" ? oOpt : undefined);
    
    if (typeof strOpt === "string" && typeof callback === "function") {
      hiloAjax(extend({
        method: method,
        url: strOpt,
        success: callback
      }, oOpt));
    } else {
      hiloAjax(extend({
        method: method
      }, strOpt));
    }
  }

  //
  // ### Make an asynchronous GET Request
  // 
  // Params are similar to those of the internal `ajaxRequest` method (see above)
  // 
  // ```
  // $.get({
  //   url: "path/to/file.js",
  //   success: function (data) {
  //     console.log(data);
  //   }
  // }); // Long form
  // ```
  //
  // ```
  // $.get("path/to/file.js", function (data) {
  //   console.log(data);
  // }); // This does the exact same function as above
  // ```
  //
  // ```
  // $.get("path/to/file.js", function (data) {
  //   console.log(data);
  // }, {
  //   error: function (err) {
  //     console.error(err);
  //   }
  // }); // Short form, with more options
  // ```
  //

  hilo.get = function (strOpt, callback, oOpt) {
    ajaxRequest("GET", strOpt, callback, oOpt);
  };

  //
  // ### Make an asynchronous POST Request
  //
  // Params are similar to those of the internal `ajaxRequest` method (see above)
  // 
  // ```
  // $.post({
  //   url: "path/to/file.js",
  //   success: function (data) {
  //     console.log(data);
  //   },
  //   data: JSON.encode(obj)
  // }); // Long form
  // ```
  //
  // ```
  // $.post("path/to/file.js", function (data) {
  //   console.log(data);
  // }, {
  //   data: JSON.encode(obj),
  //   error: function (err) {
  //     console.error(err);
  //   }
  // }); // Short form, with more options
  // ```
  //
  hilo.post = function (strOpt, callback, oOpt) {
    ajaxRequest("POST", strOpt, callback, oOpt);
  };

  //
  // ### Main DOM Class
  //
  // ** Params: **
  // - `els` {Array} The elements to manipulate
  // - `sel` {String} The selector used
  //
  // ** Examples **
  //
  // ```
  // new Dom (document.querySelectorAll(p:first-child);
  // ```
  // ```
  // new Dom ([document.createElement("div")]);
  // ```
  // ```
  // new Dom ([document.getElementByid("box")]);
  // ```
  // ```
  // new Dom (document.getElementsByClassName("hidden"));
  // ```
  // ```
  // new Dom (document.getElementsByTagName("mark"));
  // ```
  // 
  function Dom (els, sel) {
    var _i, _l;

    /* Note that `this` is an object and NOT an Array */

    /* Loop thorugh the NodeList and set `this[index]` for `els[index]` */
    for (_i = 0, _l = els.length; _i < _l; _i += 1) {
      this[_i] = els[_i];
    }

    /* Useful for looping through as ours is an object and not an array */
    this.length = els.length;

    /* Know what selector is used to select the elements */
    this.sel = sel;
  }

  /* Make it _look_ like an array */
  Dom.prototype = Array.prototype;

  extend(Dom.prototype, {
    /* Set the constructor to Dom. It defaults to Array. We don't that */
    constructor: Dom
  });

  // ### Hilo CSS Helper Methods

  // 
  // **_unhyph_** *Internal*
  // 
  // Return a string repacing all `-`s with `""` and making the letter
  // next to every `-` uppercase
  // 
  // **Param**:
  // - `prop`: {String} CSS Property Name
  // 
  // **Examples**:
  // ```
  // unhyph("background-color"); // backgroundColor
  // unhyph("color"); // color
  // ```
  // 
  function unhyph (prop) {
    return prop.toLowerCase().replace(/-(.)/g, function (m, m1) {
      return m1.toUpperCase();
    });
  }

  // 
  // **_unitize_** *Internal*
  // 
  // Add necessary suffix to the number for certain CSS properties
  // _This will later be used by .css() and a number of other methods_
  // 
  // **Param**:
  // - `unit`: {String|Number} Valid CSS Unit (`unitize()` Returns the same thing if {String})
  // - `prop`: {String} CSS Property Name
  // 
  // **Examples**:
  // ```
  // unitize("background-color"); // backgroundColor
  // unhyph("color"); // color
  // ```
  // 
  function unitize (unit, prop) {

    /* All the CSS props. that are to be defaulted to px values */
    var pixel = {
      "width": true,
      "maxWidth": true,
      "minWidth": true,

      "height": true,
      "maxHeight": true,
      "minHeight": true,

      "borderWidth": true,
      "borderTopWidth": true,
      "borderLeftWidth": true,
      "borderBottomWidth": true,
      "borderRightWidth": true,
      "borderRadius": true,

      "outlineWidth": true,
      "outlineOffset": true,
      "strokeWidth": true,

      "fontSize": true,
      "lineHeight": true,
      "letterSpacing": true,
      "textIndent": true,
      "textUnderlineWidth": true,

      "margin": true,
      "marginTop": true,
      "marginLeft": true,
      "marginBottom": true,
      "marginRight": true,

      "padding": true,
      "paddingTop": true,
      "paddingLeft": true,
      "paddingBottom": true,
      "paddingRight": true,

      "top": true,
      "left": true,
      "bottom": true,
      "right": true
    };

    /* String values are not be unitized no matter what */
    if (typeof unit === "string") {
      return unit;
    }

    /* If the property is present in the previously mentioned
       object, the unit is suffixed with "px" */
    if (pixel[prop] === true) {
      return unit + "px";
    }

    return unit;
  }

  // 
  // **_hilo.create_**
  // 
  // Create an element
  // 
  // **Params**:
  // - `tagName`: {String} Tag Name or Node name of element
  // - `attrs`: {Object} An object containing the attributes and values
  // 
  // **Example**:
  // ```
  // $.create("div", {
  //   class: "post",
  //   "data-id": 2
  // });
  // ```
  // 
  hilo.create = function (tagName, attrs) {
    var el = new Dom([document.createElement(tagName)]), key;

    if (attrs) {
      /* Add Class if the `className` is set */
      if (attrs.className) {
        el.addClass(attrs.className);
        delete attrs.className;
      }

      /* Set html to if `text` content is given */
      if (attrs.text) {
        el.html(attrs.text);
        delete attrs.text;
      }

      /* Set other attributes */
      for (key in attrs) {
        if(attrs.hasOwnProperty(key)) {
          el.attr(key, attrs[key]);
        }
      }
    }

    return el;
  };

  extend(Dom.prototype, {

    // ## Helper Functions

    // 
    // **_Hilo.Dom.prototype.each_**
    // 
    // Execute a function on selected elements
    // 
    // **Param**:
    // - `fn`: {Function} The function to be called
    // 
    // **Example**:
    // ```
    // $("p").each(function (el) {
    //   doSomethingWith(e);
    // });
    // ```
    // 
    each: function (fn) {
      this.map(fn);
      return this; /* return the current Dom instance */
    },

    // 
    // **_Hilo.Dom.prototype.map_**
    // 
    // Return the results of executing a function
    // on all the selected elements
    // 
    // **Param**:
    // - `fn`: {Function} The function to be called
    // 
    // **Example**:
    // ```
    // $("div.need-cf").map(function (e) {
    //   doSomethingWith(e);
    // });
    // ```
    // 
    map: function (fn) {
      var results = []
        , _i
        , _l;

      for (_i = 0, _l = this.length; _i < _l; _i += 1) {
        results.push(fn.call(this, this[_i], _i));
      }

      return results;
    },

    // 
    // **_Hilo.Dom.prototype.one_**
    // 
    // Map on selected elements and return them based
    // on the number of selected elements
    // 
    // **Param**:
    // - `fn`: {Function} The function to be called
    // 
    one: function (fn) {
      var m = this.map(fn);
      return m.length > 1 ? m : m[0];
    },

    // 
    // **_Hilo.Dom.prototype.first_**
    // 
    // Execute a function on the first selected element
    // 
    // **Param**:
    // - `fn`: {Function} The function to be called
    // 
    // **Example**:
    // ```
    // $("div").first(function (e) {
    //   console.log(e + " is the first div");
    // });
    // ```
    // 
    first: function (fn) {
      return fn(this[0]);
    },

    // 
    // **_Hilo.Dom.prototype.filter_**
    // 
    // Filter the selected element and return the
    // elements that pass the test (or return true)
    // 
    // **Param**:
    // - `fn`: {Function} The function to be called
    // 
    // **Example**:
    // ```
    // $("div").filter(function (el) {
    //   return el.className.split("hidden").length > 1;
    // });
    // ```
    // 
    filter: function (fn) {
      var len = this.length >>> 0
        , _i
        , t = Object(this)
        , res = []
        , val;

      for (_i = 0; _i < len; _i++) {
        if (_i in t) {
          val = t[_i];

          if (fn.call(this, val, _i, t)) {
            res.push(val);
          }
        }
      }

      return new Dom(res);
    },

    // ## Element Selections, etc.

    // 
    // **_Hilo.Dom.prototype.get_**
    // 
    // Get a JavaScript Array containing selected elements
    // 
    // **Example**:
    // ```
    // $("script").get();
    // ```
    // 
    get: function () {
      var els = [];

      this.each(function (el) {
        els.push(el);
      });

      return els;
    },

    // 
    // **_Hilo.Dom.prototype.firstEl_**
    // 
    // Return first element of the selected elements
    // 
    // **Example**:
    // ```
    // $("p.hidden").firstEl().show();
    // ```
    // 
    firstEl: function () {
      return new Dom([this[0]]);
    },

    // 
    // **_Hilo.Dom.prototype.lastEl_**
    // 
    // Return last element of the selected elements
    // 
    // **Example**:
    // ```
    // $("p.hidden").lastEl().show();
    // ```
    // 
    lastEl: function () {
      return new Dom([this[this.length - 1]]);
    },

    // 
    // **_Hilo.Dom.prototype.el_**
    // 
    // Return nth element of the selected elements
    // 
    // **Param**:
    // - `place`: {Number} The index of the element (Starts from 1)
    // 
    // **Example**:
    // ```
    // $("p.hidden").el(3).show();
    // ```
    // 
    el: function (place) {
      return new Dom([this[place - 1]]);
    },

    // 
    // **_Hilo.Dom.prototype.children_**
    // 
    // Return the children of selected elements
    // 
    // **Param**:
    // - `sel`: {String} Optional filtering selector
    // 
    // **Example**:
    // ```
    // var childrenOfContainer = $("div.container").children();
    // $("div.container").children(":not(.hidden)").addClass("me");
    // ```
    // 
    children: function (sel) {
      var children = [], _i, _l;

      this.each(function (el) {
        var childNodes = select(sel ? sel : "*", el);

        for (_i = 0, _l = childNodes.length; _i < _l; _i += 1) {
          children = children.concat(childNodes[_i]);
        }
      });

      return children;
    },

    // 
    // **_Hilo.Dom.prototype.parents_**
    // 
    // Return the parents of selected elements
    // 
    // **Example**:
    // ```
    // $("div#editor").parent().hide()
    // ```
    // 
    parents: function () {
      var pars = [];

      this.each(function (el) {
        pars = pars.concat(el.parentElement);
      });

      return new Dom(pars);
    },

    // 
    // **_Hilo.Dom.prototype.parent_**
    // 
    // Return the parent of the first selected element
    // 
    // **Example**:
    // ```
    // $("div#editor").parent().hide()
    // ```
    // 
    parent: function () {
      return this.first(function (el) {
        return new Dom([el.parentElement]);
      });
    },

    // 
    // **_Hilo.Dom.prototype.rel_**
    // 
    // Return relatives of selected elements based
    // on the given relation
    // 
    // **Param**:
    // - `sul`: {String} Relation
    // 
    // **Example**:
    // ```
    // $("div#editor").rel("nextSibling").addClass("next-to-editor");
    // ```
    // 
    rel: function (sul) {
      var els = [];

      this.each(function (el) {
        els.push(el[sul]);
      });

      return els;
    },

    // 
    // **_Hilo.Dom.prototype.next_**
    // 
    // Return next sibling elements of selected elements
    // 
    // **Example**:
    // ```
    // $("div#editor").next().addClass("next-to-editor");
    // ```
    // 
    next: function () {
      return this.rel("nextElementSibling");
    },
    
    // 
    // **_Hilo.Dom.prototype.prev_**
    // 
    // Return next sibling elements of selected elements
    // 
    // **Example**:
    // ```
    // $("div#editor").prev().addClass("prev-to-editor");
    // ```
    // 
    prev: function () {
      return this.rel("previousElementSibling");
    },

    // 
    // **_Hilo.Dom.prototype.html_**
    // 
    // Set or return innerHTML of selected elements
    // 
    // **Param**:
    // - `html`: {String} HTML Code to be inserted
    // 
    // **Example**:
    // ```
    // $("p:first-child").html("first-p");
    // var html = $("span").html();
    // ```
    // 
    html: function (htmlCode) {
      if (typeof htmlCode !== "undefined") {
        return this.each(function(el) {
          el.innerHTML = htmlCode;
        });
      } else {
        return this.first(function(el) {
          return el.innerHTML;
        });
      }
    },

    // 
    // **_Hilo.Dom.prototype.empty_**
    // 
    // Empty the selected elements
    //
    // **Example**:
    // ```
    // $("#todo-list").empty();
    // ```
    // 
    empty: function () {
      return this.html("");
    },

    // 
    // **_Hilo.Dom.prototype.append_**
    // 
    // Append html to selected elements
    // 
    // **Param**:
    // - `html`: {String} HTML Code to be appeneded
    // 
    // **Example**:
    // ```
    // $("p:first-child").append(" - From the first p child")
    // ```
    // 
    append: function (html) {
      return this.each(function (el) {
        el.innerHTML += html;
      });
    },

    // 
    // **_Hilo.Dom.prototype.prepend_**
    // 
    // Prepend html to selected elements
    // 
    // **Param**:
    // - `html`: {String} HTML Code to be appeneded
    // 
    // **Example**:
    // ```
    // $("p:first-child").append(" - From the first p child")
    // ```
    // 
    prepend: function (html) {
      return this.each(function (el) {
        el.innerHTML = html + el.innerHTML;
      });
    },

    // 
    // **_Hilo.Dom.prototype.value_**
    // 
    // Get or set the value attribute of the selected element
    // 
    // **Param**:
    // - `val`: {String} Value to set to
    // 
    // **Example**:
    // ```
    // $("#my-form").children("input#name").value();
    // ```
    // 
    value: function (val) {
      if (val) {
        return this.each(function (el) {
          el.value = val;
        });
      } else {
        this.first(function (el) {
          return el.value;
        });
      }
    },

    // 
    // **_Hilo.Dom.prototype.id_**
    // 
    // Get or set the ID of first element
    // 
    // **Param**:
    // - `id`: {String} ID to set
    // 
    // **Example**:
    // ```
    // $("p.rect").first().id("square");
    // ```
    // 
    id: function (id) {
      if (id) {

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
    },

    // ### Classes and IDs

    // 
    // **_Hilo.Dom.prototype.class_**
    // 
    // Add, remove, or check class(es)
    // 
    // **Param**:
    // - `action`: {String} Action to take ("add", "remove", "has")
    // - `className`: {String|Array} Class(es) to add or remove
    // 
    // **Examples**:
    // ```
    // $("div#editor").class("add", "no-js");
    // ```
    // ```
    // $("div#editor").class("remove", "no-js");
    // ```
    // ```
    // var isHidden = $("p").class("has", "hidden");
    // ```
    //
    "class": feature.classList === true ? function (action, className) {
      return this.each(function (el) {
        var _i, parts, contains, res = [];

        if (typeof className === "string") { // A String
          parts = className.split(" ");

          if (parts.length === 1) { // String, one class
            contains = el.classList.contains(className);

            switch (action) {
              case "add": {
                if (!contains) {
                  el.classList.add(className);
                }
              } break;

              case "remove": {
                if (contains) {
                  el.classList.remove(className);
                }
              } break;

              case "has": {
                res = true;
              } break;

              case "toggle": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  if (contains) {
                    el.classList.remove(parts[_i]);
                  } else {
                    el.classList.add(parts[_i]);
                  }
                }
              } break;
            }
          } else { // String, many classes
            contains = function (className) {
              return el.classList.contains(className);
            };

            switch (action) {
              case "add": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  if (!contains(parts[_i])) {
                    el.classList.add(parts[_i]);
                  }
                }
              } break;

              case "remove": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  if (contains(parts[_i])) {
                    el.classList.remove(parts[_i]);
                  }
                }
              } break;

              case "has": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  res.push(contains(parts[_i]));
                }
              } break;

              case "toggle": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  if (contains(parts[_i])) {
                    el.classList.remove(parts[_i]);
                  } else {
                    el.classList.add(parts[_i]);
                  }
                }
              } break;
            }
          }
        } else if (className.length) { // Array
          parts = className;

          contains = function (className) {
            return el.classList.contains(className);
          };

          switch (action) {
            case "add": {
              for (_i = 0; _i < parts.length; _i += 1) {
                if (!contains(parts[_i])) {
                  el.classList.add(parts[_i]);
                }
              }

            } break;

            case "remove": {
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.classList.remove(parts[_i]);
                }
              }

            } break;

            case "has": {
              for (_i = 0; _i < parts.length; _i += 1) {
                res.push(contains(parts[_i]));
              }

            } break;

            case "toggle": {
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.classList.remove(parts[_i]);
                } else {
                  el.classList.add(parts[_i]);
                }
              }
            } break;
          }
        }

        return typeof res === "boolean" ? res : res.every(function (el) {
          return el === true;
        });
      });
    } : function (action, className) {
      return this.each(function (el) {
        var _i, parts, contains, res = [];

        if (typeof className === "string") {
          parts = className.split(" ");

          if (parts.length === 1) {
            contains = el.className.split(className).length > 1;

            switch (action) {
              case "add": {
                if (!contains) {
                  el.className += " " +  (className);
                }
              } break;

              case "remove": {
                if (contains) {
                  el.className.replace(className, "");
                }
              } break;

              case "has": {
                res = contains;
               
              } break;

              case "toggle": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  if (contains) {
                    el.className.replace(className, "");
                  } else {
                    el.className += " " +  className;
                  }
                }
              } break;
            }
          } else {
            contains = function (className) {
              return el.className.split(className).length > 1;
            };

            switch (action) {
              case "add": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  if (!contains(parts[_i])) {
                    el.className += " " +  parts[_i];
                  }
                }
              } break;

              case "remove": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  if (contains(parts[_i])) {
                    el.className.replace(parts[_i], "");
                  }
                }
              } break;

              case "has": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  res.push(contains(parts[_i]));
                }
              } break;

              case "toggle": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  if (contains(parts[_i])) {
                    el.className.replace(parts[_i], "");
                  } else {
                    el.className += " " +  parts[_i];
                  }
                }
              } break;
            }
          }
        } else if (className.length) {
          parts = className;
          
          contains = function (className) {
            return el.className.split(className).length > 1;
          };

          switch (action) {
            case "add": {
              for (_i = 0; _i < parts.length; _i += 1) {
                if (!contains(parts[_i])) {
                  el.className += " " +  parts[_i];
                }
              }

            } break;

            case "remove": {
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.className.replace(parts[_i], "");
                }
              }

            } break;

            case "has": {
              for (_i = 0; _i < parts.length; _i += 1) {
                res.push(contains(parts[_i]));
              }

            } break;

            case "toggle": {
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.className.replace(parts[_i], "");
                } else {
                  el.className += " " +  parts[_i];
                }
              }
            } break;
          }
        }

        return typeof res === "boolean" ? res : res.every(function (el) {
          return el === true;
        });
      });
    },

    // 
    // **_Hilo.Dom.prototype.addClass_**
    // 
    // Adds class(es) to selected elements
    // 
    // **Param**:
    // - `className`: {String|Array} The class(es) to add
    // 
    // **Example**:
    // ```
    // $("p").addClass("paragraph");
    // ```
    // 
    addClass: function (className) {
      return this["class"]("add", className);
    },

    // 
    // **_Hilo.Dom.prototype.removeClass_**
    // 
    // Remove class(es) from selected elements
    // 
    // **Param**:
    // - `className`: {String|Array} The class(es) to remove
    // 
    // **Example**:
    // ```
    // $("p.hidden").removeClass("hidden");
    // ```
    // 
    removeClass: function (className) {
      return this["class"]("remove", className);
    },

    // 
    // **_Hilo.Dom.prototype.hasClass_**
    // 
    // Check if selected elements have the specified class(es)
    // 
    // **Param**:
    // - `className`: {String|Array} The class(es) to check if exists
    // 
    // **Example**:
    // ```
    // $("pre").hasClass("prettyprint");
    // ```
    // 
    hasClass: function (className) {
      return this["class"]("has", className);
    },

    // 
    // **_Hilo.Dom.prototype.toggleClass_**
    // 
    // Add class(es) if it/they do(es) not exist(s),
    // remove if exist(s)
    // 
    // **Param**:
    // - `className`: {String|Array} The class(es) to toggle
    // 
    // **Example**:
    // ```
    // $(".someClass").on("click", function () {
    //   $(this).toggleClass("opaque");
    // });
    // ```
    // 
    toggleClass: function (className) {
      return this["class"]("toggle", className);
    },

    // 
    // **_Hilo.Dom.prototype.attr_**
    // 
    // Set or return attribute values
    // 
    // **Param**:
    // - `name`: {String} Name of attribute
    // - `val`: {String} Value of attribute
    // 
    // **Example**:
    // ```
    // $("p.hidden").attr("hidden");
    // ```
    // ```
    // $("div.edit").attr("contentEditable", "true");
    // ```
    // ```
    // $("body").attr("hilo", "0.1.0"); 
    // ```
    // 
    attr: function (name, val) {
      if(val) {
        return this.each(function(el) {
          el.setAttribute(name, val);
        });
      } else {
        return this.first(function (el) {
          return el.getAttribute(name);
        });
      }
    },

    // ### Hilo CSS

    // 
    // **_Hilo.Dom.prototype.css_**
    // 
    // Set or return css property values
    // 
    // **Param**:
    // - `prop`: {String|Object} Name of the propety | Properties
    // - `value`: {String} Value of property
    // 
    // **Example**:
    // ```
    // $("p").css("margin-left", "10em");
    // ```
    // ```
    // $("p.round").css({
    //   "border-radius": 10,
    //   width: 100
    // });
    // ```
    // 
    css: function (prop, value) {
      var unhyphed;

      if (typeof prop === "string") {
        unhyphed = unhyph(prop);

        if (value) {
          return this.each(function (el) {
            el.style[unhyphed] = unitize(value, unhyphed);
          });
        } else {
          return this.first(function (el) {
            return el.style[unhyphed];
          });
        }
      } else if (typeof prop === "object") {
        forIn(prop, function (pr) {
          unhyphed = unhyph(pr);

          this.each(function (el) {
            el.style[unhyphed] = unitize(prop[pr], unhyphed);
          });
        }, this);
      }
    },

    // 
    // **_Hilo.Dom.prototype.computed_**
    // 
    // Get computed property
    // 
    // **Param**:
    // - `prop`: {String|Object} Name of property
    // 
    // **Example**:
    // ```
    // $("#box").computed("width");
    // ```
    // 
    computed: function (prop) {
      return this.first(function (el) {
        return win.getComputedStyle(el)[prop];
      });
    },

    // Get outer width

    outerWidth: function () {
      return parseFloat(this.computed("width")) + 
      parseFloat(this.computed("paddingLeft")) + 
      parseFloat(this.computed("paddingRight")) + 
      parseFloat(this.computed("borderLeft")) + 
      parseFloat(this.computed("borderRight")) + "px";
    },

    // Get inner width

    innerWidth: function () {
      return parseFloat(this.computed("width")) + 
      parseFloat(this.computed("paddingLeft")) + 
      parseFloat(this.computed("paddingRight")) + "px";
    },

    // Get outer height

    outerHeight: function () {
      return parseFloat(this.computed("height")) + 
      parseFloat(this.computed("paddingTop")) + 
      parseFloat(this.computed("paddingBottom")) + 
      parseFloat(this.computed("borderTop")) + 
      parseFloat(this.computed("borderBottom")) + "px";
    },

    // Get inner height

    innerHeight: function () {
      return parseFloat(this.computed("height")) + 
      parseFloat(this.computed("paddingTop")) + 
      parseFloat(this.computed("paddingBottom")) + "px";
    }
  });

  // --------------------------------------------------
  // Events
  // --------------------------------------------------

  extend(Dom.prototype, {

    // Listen to an event and execute a function when that event happend

    /**
     * Listen to an event and execute a function when that event happend
     * 
     * @for Dom
     * @method on
     * @param {String} evt Name of event
     * @param {Function} fn Function to be executed when the event is fired
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("#box").on("click", function (e) {
     *   console.log("#box was clicked");
     * });
     * </pre></div>
     * @since 0.1.0
     */
    on: (function () {

      // Check if `document.addEventListener` method
      // is available and use it if it is
      if (document.addEventListener) {
        return function (evt, fn) {
          return this.each(function (el) {
            el.addEventListener(evt, fn, false);
          });
        };

      // Otherwise check if `document.attachEvent` 
      // legacy method is available and use it if it is
      } else if (document.attachEvent)  {
        return function (evt, fn) {
          return this.each(function (el) {
            el.attachEvent("on" + evt, fn);
          });
        };

      // Add event the DOM Level 0 Style
      } else {
        return function (evt, fn) {
          return this.each(function (el) {
            el["on" + evt] = fn;
          });
        };
      }
    }()),

    // Stop listening to an event

    /**
     * Stop listening to an event
     * 
     * @for Dom
     * @method on
     * @param {String} evt Name of event
     * @param {Function} fn Function to stop listening to
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("#box").off("click", fn);
     * </pre></div>
     * @since 0.1.0
     */
    off: (function () {
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
    }()),

    /**
     * Trigger or fire an event
     * 
     * @for Dom
     * @method fire
     * @param {String} evt Name of event to fire
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("#uploadForm").fire("overload");
     * </pre></div>
     * @since 0.1.0
     */
    fire: (function () {
      if (document.dispatchEvent) {
        return function (event) {
          var evt;
          
          try {
            evt = document.createEvent("Events");
          } catch (e) {
            evt = document.createEvent("UIEvents");
          }

          evt.initUIEvent(event, true, true, window, 1);

          return this.each(function (el) {
            el.dispatchEvent(evt);
          });
        };
      } else if (document.fireEvent) {
        return function (event) {
          var evt = document.createEventObject();
          evt.button = 1;

          return this.each(function(el) {
            el.fireEvent("on" + event, evt);
          });
        };
      } else {
        return function (event) {
          return this.each(function (el) {
            el["on" + event].call();
          });
        };
      }
    }())
  });
    
  // --------------------------------------------------
  // Events (imp.)
  // --------------------------------------------------

  extend(Dom.prototype, {
    ready: function (fn) {
      this.each(function (el) {
        el.onreadystatechange = function () {
          if (el.readyState = "complete") {
            fn();
          }
        };
      });
    }
  });

  (function () {
    var evtObj = {}
      , impEvts;

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
      "submit"
    ];

    for (_i = 0; _i < impEvts.length; _i += 1) {
      evtObj[impEvts[_i]] = function (fn) {
        if (typeof fn === "function") {
          return this.on(impEvts[_i], fn);
        }

        return this.fire(impEvts[_i]);
      };
    }

    extend(Dom.prototype, evtObj);
  }());
    
  // These keyborad key mappings will be later used
  // to enable use of shortcut keys or the like

  key = {

    // Numbers

    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,

    // Uppercase letters

    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,

    // Lowecase letters

    a: 97,
    b: 98,
    c: 99,
    d: 100,
    e: 101,
    f: 102,
    g: 103,
    h: 104,
    i: 105,
    j: 106,
    k: 107,
    l: 108,
    m: 109,
    n: 110,
    o: 111,
    p: 112,
    q: 113,
    r: 114,
    s: 115,
    t: 116,
    u: 117,
    v: 118,
    w: 119,
    x: 120,
    y: 121,
    z: 122,

    // Other Important Keys

    alt: 18,
    caps: 20,
    ctrl: 17,
    cmd: 17,
    enter: 13,
    esc: 27,
    del: 46,
    end: 35,
    back: 8,

    // Arrows

    left: 37,
    up: 38,
    right: 39,
    down: 40,

    // F-keys

    f1: 112,
    f2: 113,
    f3: 114,
    f4: 115,
    f5: 116,
    f6: 117,
    f7: 118,
    f8: 119,
    f9: 120,
    f10: 121,
    f11: 122,
    f12: 123,

    // Less-used keys

    home: 36,
    insert: 45,
    numlock: 144,

    // Symbols

    "`": 222,
    "-": 189,
    ",": 188,
    ".": 190,
    "/": 191,
    ";": 186,
    "[": 219,
    "\\": 220,
    "]": 221,
    "=": 187

  };

  hilo.keys = key;

  // --------------------------------------------------
  // Effects (fx)
  // --------------------------------------------------

  extend(Dom.prototype, {

    /**
     * Sets the display property of sel.els. to "" or given value
     * 
     * @for Dom
     * @method show
     * @param {string} display Value of display prop.
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").show();
     * </pre></div>
     * @since 0.1.0
     */
    show: function (display) {
      display = display || "";

      return this.each(function (el) {
        el.style.display = display;
        el.setAttribute("aria-hidden", false);
      });
    },

    /**
     * Sets the display property of sel.els. to "none"
     * 
     * @for Dom
     * @method hide
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").hide();
     * </pre></div>
     * @since 0.1.0
     */
    hide: function () {
      return this.each(function (el) {
        el.style.display = "none";
        // ARIA
        el.setAttribute("aria-hidden", true);
      });
    },

    /**
     * Shows hidden elements, hides shown elements
     * 
     * @for Dom
     * @method toggle
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").toggle();
     * </pre></div>
     * @since 0.1.0
     */
    toggle: function (display) {
      return this.each(function (el) {
        if (el.style.display === "none") {
          el.style.display = display ? display : "";
          // ARIA
          el.setAttribute("aria-hidden", false);
        } else {
          el.style.display = "none";
          // ARIA
          el.setAttribute("aria-hidden", true);
        }
      });
    },

    /**
     * Sets visibility to "visible"
     * 
     * @for Dom
     * @method appear
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").appear();
     * </pre></div>
     * @since 0.1.0
     */
    appear: function () {
      return this.each(function (el) {
        el.style.visibility = "visible";
        // ARIA
        el.setAttribute("aria-hidden", false);
      });
    },

    /**
     * Sets visiblity to "hidden"
     * 
     * @for Dom
     * @method disappear
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").disappear();
     * </pre></div>
     * @since 0.1.0
     */
    disappear: function () {
      return this.each(function (el) {
        el.style.visibility = "hidden";
        // ARIA
        el.setAttribute("aria-hidden", true);
      });
    },

    /**
     * Appears a disappeared element, disappears an appeared element
     * 
     * @for Dom
     * @method toggleVisibility
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").toggleVisibility();
     * </pre></div>
     * @since 0.1.0
     */
    toggleVisibility: function () {
      return this.each(function (el) {
        if (el.style.opacity === "0") {
          el.style.visibility = "visible";
          // ARIA
          el.setAttribute("aria-hidden", true);
        } else {
          el.style.visibility = "hidden";
          // ARIA
          el.setAttribute("aria-hidden", true);
        }
      });
    },

    /**
     * Animates opacity prop. from 0 to 1 or 1 to 0
     * 
     * @for Dom
     * @method fade
     * @param {string} inOut Whether "in" or "out"
     * @param {number|string} "fast", "slow", "normal" or a number 
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").fade("in");
     * $("p").fade("out");
     * $("p").fade("in", 140);
     * $("p").fade("out", 100);
     * </pre></div>
     * @since 0.1.0
     */
    fade: function (inOut, timing) {
      if (inOut === "in") {
        this.show();
      }

      return this.each(function (el) {
        var time;

        switch(timing) {
          case "slow":
            time = 200;
            break;
          case "normal":
            time = 120;
            break;
          case "fast":
            time = 80;
            break;
          default:
            time = time || 120;
            break;
        }

        function animate () {
          var val = 0.3
            , end = 1;

          if (parseFloat(el.style.opacity) === (inOut === "in" ? 1 : 0)) {
            // Stop the animation if the opacity is set to the final value
            clearInterval(win.Hilo.temp.anim);
          } else {
            if (inOut === "out") {
              val = -val;
              end = 0;
            }

            el.style.opacity = parseFloat(el.style.opacity || end) + val; 
          }
        }

        win.Hilo.temp.anim = setInterval(animate, timing);
      });
    },

    /**
     * Animates opacity prop. from 0 to 1
     * 
     * @for Dom
     * @method fadeIn
     * @param {number|string} "fast", "slow", "normal" or a number 
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").fadeIn();
     * $("p").fadeIn(140);
     * </pre></div>
     * @since 0.1.0
     */
    fadeIn: function (timing) {
      this.fade("in", timing);
    },

    /**
     * Animates opacity prop. from 1 to 0
     * 
     * @for Dom
     * @method fadeOut
     * @param {number|string} "fast", "slow", "normal" or a number 
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").fadeOut();
     * $("p").fadeOut(140);
     * </pre></div>
     * @since 0.1.0
     */
    fadeOut: function (timing) {
      this.fade("out", timing);
    }
  });
hilo.classify = function () {
    var body = win.Hilo("body")
      , classes = ["js"]
      , _i;
    // Remove the default no-js class
    body.removeClass("no-js");

    if (hilo.browser.chrome) {
      classes.push("chrome");
    } else if (hilo.browser.firefox) {
      classes.push("firefox");
    } else if (hilo.browser.safari) {
      classes.push("safari");
    } else if (hilo.browser.ie) {

      for (_i = 6; _i <= 11; _i++) {
        if (hilo.browser.ie <= _i) {
          classes.push("lte-ie" + _i);

          if (hilo.browser.ie < _i) {
            classes.push("lt-ie" + _i);
          }
        }

        if (hilo.browser.ie >= _i) {
          classes.push("gte-ie" + _i);

          if (hilo.browser.ie > _i) {
            classes.push("gt-ie" + _i);
          }
        }

        if (hilo.browser.ie === _i) {
          classes.push("ie" + _i);
        }
      }

      classes.push("ie");
    } else if (hilo.browser.opera) {
      classes.push("opera");
    } else if (hilo.browser.konq) {
      classes.push("konqueror");
    }

    classes.push((function () {
      switch (hilo.platform.name) {
        case "Windows":
          return "windows";
        case "Mac":
          return "mac";
        case "Linux":
          return "linux";
      }
    })());

    if (hilo.engine.webkit) {
      classes.push("webkit");
    } else if (hilo.engine.ie) {
      classes.push("trident");
    } else if (hilo.engine.opera) {
      classes.push("presto");
    } else if (hilo.engine.gecko) {
      classes.push("gecko");
    }

    classes.push(hilo.browser.name.toLowerCase() + parseInt(hilo.browser.version, 10));

    function getBrowserVersion () {
      return String(hilo.browser.version).replace(".", "-");
    }

    if (getBrowserVersion() !== parseInt(hilo.browser.version, 10)) {
      classes.push(hilo.browser.name.toLowerCase() + getBrowserVersion());
    }

    for (_i in hilo.feature) {
      if (hilo.feature.hasOwnProperty(_i)) {
        if (hilo.feature[_i] === true) {
          classes.push(_i.toLowerCase());
        } else if (hilo.feature[_i] === false) {
          classes.push("no-" + _i.toLowerCase());
        }
      }
    }

    body.addClass(classes);

    return classes;
  };

  // --------------------------------------------------
  // More Functionality
  // --------------------------------------------------

  /**
   * NumberObject Class
   * 
   * @constructor
   * @class NumberObject
   * @param {Number} num Number
   * @example
   * <div class="code"><pre class="prettyprint">
   * new NumberObject(2);
   * </pre></div>
   * <div class="code"><pre class="prettyprint">
   * new NumberObject(Math.PI);
   * </pre></div>
   * @since 0.1.0
   */
  function NumberObject (num) {
    this.num = num;
  }

  extend(NumberObject.prototype, {
    
    /**
     * NumberObject.MAX_INTEGER = 9007199254740991
     * The maximum value of a JavaScript integer
     * 
     * @for NumberObject
     * @property MAX_INTEGER
     * @type Number
     * @since 0.1.0
     */
    MAX_INTEGER: 9007199254740991,

    /**
     * Epsilon
     * 
     * @for NumberObject
     * @property EPSILON
     * @type Number
     * @since 0.1.0
     */
    EPSILON: 2.220446049250313e-16,

    /**
     * Parses integer value from a string or number
     * 
     * @for NumberObject
     * @method parseInt
     * @return {Number}
     * @example
     * <div class="code"><pre class="prettyprint">
     * new NumberObject(3.5).parseInt() // 3
     * </pre></div>
     * @since 0.1.0
     */
    parseInt: function () {
      parseInt.call(this, this.num);
    },

    /**
     * Parses float point number value from a string or number
     * 
     * @for NumberObject
     * @method parseFloat
     * @return {Number}
     * @example
     * <div class="code"><pre class="prettyprint">
     * new NumberObject("5.3").parseFloat() // 5.3
     * </pre></div>
     * @since 0.1.0
     */
    parseFloat: function () {
      parseFloat.call(this, this.num);
    },

    /**
     * Returns true if a number is a finite value
     * 
     * @for NumberObject
     * @method isFinite
     * @return {Bolean} Whether the number is finite
     * @example
     * <div class="code"><pre class="prettyprint">
     * new NumberObject(NaN).isFinite() // false
     * new NumberObject(3).isFinite() // true
     * </pre></div>
     * @since 0.1.0
     */
    isFinite: function() {
      return typeof this.num === 'number' && isFinite(this.num);
    },

    /**
     * If the number is an integer
     * 
     * @for NumberObject
     * @method isInteger
     * @return {Number} Whether the number is an integer
     * @example
     * <div class="code"><pre class="prettyprint">
     * new NumberObject(5.3).isInteger() // false
     * new NumberObject(4).isInteger() // true
     * </pre></div>
     * @since 0.1.0
     */
    isInteger: function() {
      return typeof this.num === 'number' &&
        !isNaN(this.num) &&
        isFinite(this.num) &&
        parseInt(this.num, 10) === this.num;
    },

    /**
     * Returns if the number is NaN (Not a number)
     * 
     * @for NumberObject
     * @method isNan
     * @return {Number} Whether the number is not a number (NaN)
     * @example
     * <div class="code"><pre class="prettyprint">
     * new NumberObject(5).isNan() // false
     * new NumberObject(NaN).isNan() // true
     * </pre></div>
     * @since 0.1.0
     */
    isNaN: function() {
      // NaN !== NaN, but they are identical.
      // NaNs are the only non-reflexive value, i.e., if x !== x,
      // then x is NaN.
      // isNaN is broken: it converts its argument to number, so
      // isNaN('foo') => true
      return this.num !== this.num;
    },

    /**
     * Converts ant value to an integer
     * 
     * @for NumberObject
     * @method toInteger
     * @return {Number} The converted integer
     * @example
     * <div class="code"><pre class="prettyprint">
     * new NumberObject(5).toInteger() // 5
     * new NumberObject(NaN).toInteger() // 0
     * </pre></div>
     * @since 0.1.0
     */
    toInteger: function() {
      var number = +this.num;
      if (isNaN(number)) {
        return 0;
      }

      if (number === 0 || !isFinite(number)) {
        return number;
      }
      
      return sign.call(this, number) * Math.floor(Math.abs(number));
    },

    sign: function (value) {
      sign.call(this, this.num, value);
    },

    /**
     * Call a function n times
     * 
     * @for NumberObject
     * @method times
     * @param {Function} fn The function to be called
     * @param {Array} args The arguments to be passed
     * @return {Number} The converted integer
     * @example
     * <div class="code"><pre class="prettyprint">
     * var i = 0;
     * new NumberObject(100).times(function () {
     *   console.log(i++);
     * });
     * </pre></div>
     * <div class="code"><pre class="prettyprint">
     * new NumberObject(100).times(function () {
     *   consolee.log
     * });
     * </pre></div>
     * @since 0.1.0
     */
    times: function (fn, args) {
      var _i = 0;

      while (_i < this.num) {
        fn.apply(this, args);
        _i += 1;
      }
    }
  });
  
  // ## Hilo Extension API
  
  /* Provide Extension API */
  extend(hilo, {
    Dom: Dom.prototype,
    Test: Test.prototype
  });

  /* Set event handler for triggering DOM Events */
  doc.onreadystatechange = function () {
    if (doc.readyState === "complete") {
      for (_i = 0; _i < callbacks.length; _i += 1) {
        callbacks[_i]();
      }
    }
  };

  /* Get the total time took to execute the script */
  hilo.perf = new Date().getTime() - start;

  // Finally return Hilo
  return hilo;
}));
