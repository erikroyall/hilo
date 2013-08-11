/*! 
 * Hilo - 0.1.0-pre-dev-beta-9 - 2013-08-11
 * Project started before 1 month and 11 days
 * http://erikroyall.github.com/hilo/
 * Copyright (c) 2013 Erik Royall
 * Licensed under MIT (see LICENSE-MIT) 
 */

(function (A, M, D) {

  // Asynchronous Module Definition, if available

  var module = module || false
    , define = define || false;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = D;
  } else if (typeof define === "function" && define.amd) {
    define(D);
  } else {
    M[A] = D();
  }
}("Hilo", this, function () {
  /*jshint -W083, -W064, -W030*/

  // JSHint escapes:
  //  W083 - Don't make function within a loop (Evts)
  //  W064 - Missing new prefix when invoking constructor (Sizzle)
  //  W030 - Allow expressions

  "use strict";
  
  var hilo             // Public API

    // Later used to measure performace (Hilo.perf)
    , start
    , elapsed

    // References
    , win = window     // Reference to window
    , doc = document   // Reference to document

    // Sizzle.js wrapper
    , sizzle

    // Later stores detected features
    , detected

    // Key mappings (Hilo.keys)
    , key

    // Array of callbacks to be exec.ed on DOMReady
    , callbacks = []   // Array of functions to be executed on DOMReady

    // Private Selector Function
    , select

    // Feature Detection (Hilo.feature)
    , feature          // Feature Detection

    // Main AJAX function (Hilo.ajax)
    , hiloAjax

    // Loop Variable
    , _i;
  
  // Start performace testing
  start = new Date().getTime();
  
  // --------------------------------------------------
  // Browser, Engine, Platform Detection
  // --------------------------------------------------

  detected = (function () {
    var engine
      , browser
      , system
      , ua = win.navigator.userAgent
      , safariVersion
      , p;

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

    system = {
      win: false,
      mac: false,
      x11: false,

      // Mobile Devices
      iphone: false,
      ipod: false,
      ipad: false,
      ios: false,
      android: false,
      nokiaN: false,
      winMobile: false,

      // Game Systems
      wii: false,
      ps: false
    };

    engine = {
      ie: 0,
      gecko: 0,
      webkit: 0,
      khtml: 0,
      opera: 0,

      // Complete version
      ver: null
    };

    if(window.opera) {
      engine.ver = browser.ver = window.opera.version();
      engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
      engine.ver = RegExp["$1"];
      engine.webkit = parseFloat(engine.ver);

      // Figures out if chrome or Safari

      if (/Chrome\/(\S+)/.test(ua)) {
        browser.ver = RegExp["$1"];
        browser.chrome = parseFloat(browser.ver);
      } else if (/Version\/(\S+)/.test(ua)) {
        browser.ver = RegExp["$1"];
        browser.safari = parseFloat(browser.ver);
      } else {
        // Approximate version

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

      // Determine if it's firefox

      if (/Firefox\/(\S+)/.test(ua)) {
        browser.ver = RegExp["$1"];
        browser.firefox = parseFloat(browser.ver);
      }
    } else if (/MSIE ([^;]+)/.test(ua)) {
      engine.ver = browser.ver = RegExp["$1"];
      engine.ie = browser.ie = parseFloat(engine.ver);
    }

    // Detect browsers

    browser.ie = engine.ie;
    browser.opera = engine.opera;

    // Detect platform

    p = navigator.platform;

    system.win = p.indexOf("Win") === 0;
    system.mac = p.indexOf("Mac") === 0;
    system.x11 = (p === "X11") || (p.indexOf("Linux") === 0);

    // Detecting Windows OSs

    if (system.win) {
      if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
        if (RegExp["$1"] === "NT") {
          switch(RegExp["$2"]) {
            case "5.0": {
              system.win = "2000";
            } break;
            
            case "5.1": {
              system.win = "XP";
            } break;
            
            case "6.0": {
              system.win = "Vista";
            } break;
            
            case "6.1": {
              system.win = "7";
            } break;
            
            default: {
              system.win = "NT";
            } break;
          }
        } else if (RegExp["$1"] === "9x") {
          system.win = "ME";
        } else {
          system.win = RegExp["$1"];
        }
      }
    }

    // Mobile Devices

    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.ipad = ua.indexOf("iPad") > -1;
    system.nokiaN = ua.indexOf("NokiaN") > -1;

    // Windows Mobile

    if (system.win === "CE") {
      system.winMobile = system.win;
    } else if (system.win === "Ph") {
      if (/Windows Phone OS(\d+.\d+)/.test(ua)) {
        system.win = "Phone";
        system.winMobile = parseFloat(RegExp["$1"]);
      }
    }

    // Determine iOS Version

    if (system.mac && ua.indexOf("Mobile") > -1) {
      if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
        system.ios = parseFloat(RegExp["$1"].replace("_", "."));
      } else {
        system.ios = 2; // Can't really detect - so guess
      }
    }

    // Determine Android Version

    if (/Android (\d+\.\d+)/.test(ua)) {
      system.android = parseFloat(RegExp["$1"]);
    }

    // Gaming Systems

    system.wii = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);

    // Name and Version

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

    // Engines

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

    // return them

    return {
      engine: engine,
      browser: browser,
      system: system
    };
  }());
  
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

      // contentEditable
      
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

      // gen5
      
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

      // Video posters

      videoPoster: (function () {
        return "poster" in c("video");
      }()),

      // Web Audio API (NOT the <audio> tag)

      webAudio: (function () {
        return !!(win.webkitAudioContext || win.AudioContext);
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

  // querySelector pollyfill using Sizzle

  sizzle = (function(){

    if (feature.qsa3 === true) {
      return;
    }

    /*!
     * Sizzle CSS Selector Engine v1.10.6-pre
     * http://sizzlejs.com/
     *
     * Copyright 2013 jQuery Foundation, Inc. and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     */

    var i,
      support,
      cachedruns = function () {
        var keys = [];

        function cache( key, value ) {
          // Use (key + " ") to avoid collision 
          // with native prototype properties (see Issue #157)
          if ( keys.push( key += " " ) > Expr.cacheLength ) {
            // Only keep the most recent entries
            delete cache[ keys.shift() ];
          }
          return (cache[ key ] = value);
        }
        return cache;
      },
      Expr,
      getText,
      isXML,
      compile,
      outermostContext,
      sortInput,

      // Local document vars
      setDocument,
      document,
      docElem,
      documentIsHTML,
      rbuggyQSA,
      rbuggyMatches,
      matches,
      contains,

      // Instance-specific data
      expando = "sizzle" + -(new Date()),
      preferredDoc = win.document,
      dirruns = 0,
      done = 0,
      classCache,
      tokenCache,
      compilerCache,
      hasDuplicate = false,
      sortOrder = function( a, b ) {
        if ( a === b ) {
          hasDuplicate = true;
          return 0;
        }
        return 0;
      },

      // General-purpose constants
      strundefined = typeof undefined,
      MAX_NEGATIVE = 1 << 31,

      // Instance methods
      hasOwn = ({}).hasOwnProperty,
      arr = [],
      pop = arr.pop,
      push_native = arr.push,
      push = arr.push,
      slice = arr.slice,
      // Use a stripped-down indexOf if we can't use a native one
      indexOf = arr.indexOf || function( elem ) {
        var i = 0,
          len = this.length;
        for ( ; i < len; i++ ) {
          if ( this[i] === elem ) {
            return i;
          }
        }
        return -1;
      },

      booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

      // Regular expressions

      // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
      whitespace = "[\\x20\\t\\r\\n\\f]",
      // http://www.w3.org/TR/css3-syntax/#characters
      characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

      // Loosely modeled on CSS identifier characters
      // An unquoted value should be a CSS identifier 
      // http://www.w3.org/TR/css3-selectors/#attribute-selectors
      // Proper syntax: 
      // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
      identifier = characterEncoding.replace( "w", "w#" ),

      // Acceptable operators 
      // http://www.w3.org/TR/selectors/#attribute-selectors
      attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + 
        whitespace +
        "*(?:([*^$|!~]?=)" + whitespace + 
        "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + 
        whitespace + "*\\]",

      // Prefer arguments quoted,
      //   then not containing pseudos/brackets,
      //   then attribute selectors/non-parenthetical expressions,
      //   then anything else
      // These preferences are here to reduce the number of selectors
      //   needing tokenize in the PSEUDO preFilter
      pseudos = ":(" + characterEncoding + 
        ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + 
        attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

      // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
      rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + 
        whitespace + "+$", "g" ),

      rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
      rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace +
        ")" + whitespace + "*" ),

      rsibling = new RegExp( whitespace + "*[+~]" ),
      rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + 
        whitespace + "*\\]", "g" ),

      rpseudo = new RegExp( pseudos ),
      ridentifier = new RegExp( "^" + identifier + "$" ),

      matchExpr = {
        "ID": new RegExp( "^#(" + characterEncoding + ")" ),
        "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
        "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
        "ATTR": new RegExp( "^" + attributes ),
        "PSEUDO": new RegExp( "^" + pseudos ),
        "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
          "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
          "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
        "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
        // For use in libraries implementing .is()
        // We use this for POS matching in `select`
        "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
          whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
      },

      rnative = /^[^{]+\{\s*\[native \w/,

      // Easily-parseable/retrievable ID or TAG or CLASS selectors
      rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

      rinputs = /^(?:input|select|textarea|button)$/i,
      rheader = /^h\d$/i,

      rescape = /'|\\/g,

      // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
      runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + 
        whitespace + ")|.)", "ig" ),
      funescape = function( _, escaped, escapedWhitespace ) {
        var high = "0x" + escaped - 0x10000;
        // NaN means non-codepoint
        // Support: Firefox
        // Workaround erroneous numeric interpretation of +"0x"
        return high !== high || escapedWhitespace ?
          escaped :
          // BMP codepoint
          high < 0 ?
            String.fromCharCode( high + 0x10000 ) :
            // Supplemental Plane codepoint (surrogate pair)
            String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
      };

    // Optimize for push.apply( _, NodeList )
    try {
      push.apply(
        (arr = slice.call( preferredDoc.childNodes )),
        preferredDoc.childNodes
      );
      // Support: Android<4.0
      // Detect silently failing push.apply
      arr[ preferredDoc.childNodes.length ].nodeType;
    } catch ( e ) {
      push = { apply: arr.length ?

        // Leverage slice if possible
        function( target, els ) {
          push_native.apply( target, slice.call(els) );
        } :

        // Support: IE<9
        // Otherwise append directly
        function( target, els ) {
          var j = target.length,
            i = 0;
          // Can't trust NodeList.length
          while ( (target[j++] = els[i++]) ) {}
          target.length = j - 1;
        }
      };
    }

    /**
     * Create key-value caches of limited size
     * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
     *  property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
     *  deleting the oldest entry
     */

    function select( selector, context, results, seed ) {
      var i, tokens, token, type, find,
        match = tokenize( selector );

      if ( !seed ) {
        // Try to minimize operations if there is only one group
        if ( match.length === 1 ) {

          // Take a shortcut and set the context if the root selector is an ID
          tokens = match[0] = match[0].slice( 0 );
          if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
              support.getById && context.nodeType === 9 && documentIsHTML &&
              Expr.relative[ tokens[1].type ] ) {

            context = ( Expr.find["ID"]( token.matches[0].replace(runescape, 
              funescape), context ) || [] )[0];
            if ( !context ) {
              return results;
            }
            selector = selector.slice( tokens.shift().value.length );
          }

          // Fetch a seed set for right-to-left matching
          i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
          while ( i-- ) {
            token = tokens[i];

            // Abort if we hit a combinator
            if ( Expr.relative[ (type = token.type) ] ) {
              break;
            }
            if ( (find = Expr.find[ type ]) ) {
              // Search, expanding context for leading sibling combinators
              if ( (seed = find(
                token.matches[0].replace( runescape, funescape ),
                rsibling.test( tokens[0].type ) && context.parentNode || context
              )) ) {

                // If seed is empty or no tokens remain, we can return early
                tokens.splice( i, 1 );
                selector = seed.length && toSelector( tokens );
                if ( !selector ) {
                  push.apply( results, seed );
                  return results;
                }

                break;
              }
            }
          }
        }
      }

      // Compile and execute a filtering function
      // Provide `match` to avoid retokenization if we modified the selector above
      compile( selector, match )(
        seed,
        context,
        !documentIsHTML,
        results,
        rsibling.test( selector )
      );
      return results;
    }

    function Sizzle( selector, context, results, seed ) {
      var match, elem, m, nodeType,
        // QSA vars
        i, groups, old, nid, newContext, newSelector;

      if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
        setDocument( context );
      }

      context = context || document;
      results = results || [];

      if ( !selector || typeof selector !== "string" ) {
        return results;
      }

      if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
        return [];
      }

      if ( documentIsHTML && !seed ) {

        // Shortcuts
        if ( (match = rquickExpr.exec( selector )) ) {
          // Speed-up: Sizzle("#ID")
          if ( (m = match[1]) ) {
            if ( nodeType === 9 ) {
              elem = context.getElementById( m );
              // Check parentNode to catch when Blackberry 4.6 returns
              // nodes that are no longer in the document #6963
              if ( elem && elem.parentNode ) {
                // Handle the case where IE, Opera, and Webkit return items
                // by name instead of ID
                if ( elem.id === m ) {
                  results.push( elem );
                  return results;
                }
              } else {
                return results;
              }
            } else {
              // Context is not a document
              if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
                contains( context, elem ) && elem.id === m ) {
                results.push( elem );
                return results;
              }
            }

          // Speed-up: Sizzle("TAG")
          } else if ( match[2] ) {
            push.apply( results, context.getElementsByTagName( selector ) );
            return results;

          // Speed-up: Sizzle(".CLASS")
          } else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
            push.apply( results, context.getElementsByClassName( m ) );
            return results;
          }
        }

        // QSA path
        if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
          nid = old = expando;
          newContext = context;
          newSelector = nodeType === 9 && selector;

          // qSA works strangely on Element-rooted queries
          // We can work around this by specifying an extra ID on the root
          // and working up from there (Thanks to Andrew Dupont for the technique)
          // IE 8 doesn't work on object elements
          if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
            groups = tokenize( selector );

            if ( (old = context.getAttribute("id")) ) {
              nid = old.replace( rescape, "\\$&" );
            } else {
              context.setAttribute( "id", nid );
            }
            nid = "[id='" + nid + "'] ";

            i = groups.length;
            while ( i-- ) {
              groups[i] = nid + toSelector( groups[i] );
            }
            newContext = rsibling.test( selector ) && context.parentNode || context;
            newSelector = groups.join(",");
          }

          if ( newSelector ) {
            try {
              push.apply( results,
                newContext.querySelectorAll( newSelector )
              );
              return results;
            } catch(qsaError) {
            } finally {
              if ( !old ) {
                context.removeAttribute("id");
              }
            }
          }
        }
      }

      // All others
      return select( selector.replace( rtrim, "$1" ), context, results, seed );
    }

    function createCache () {
      var keys = [];

      function cache( key, value ) {
        // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
        if ( keys.push( key += " " ) > Expr.cacheLength ) {
          // Only keep the most recent entries
          delete cache[ keys.shift() ];
        }
        return (cache[ key ] = value);
      }
      return cache;
    }


    classCache = createCache();
    tokenCache = createCache();
    compilerCache = createCache();

    /**
     * Mark a function for special use by Sizzle
     * @param {Function} fn The function to mark
     */
    function markFunction( fn ) {
      fn[ expando ] = true;
      return fn;
    }

    /**
     * Support testing using an element
     * @param {Function} fn Passed the created div and expects a boolean result
     */
    function assert( fn ) {
      var div = document.createElement("div");

      try {
        return !!fn( div );
      } catch (e) {
        return false;
      } finally {
        // Remove from its parent by default
        if ( div.parentNode ) {
          div.parentNode.removeChild( div );
        }
        // release memory in IE
        div = null;
      }
    }

    /**
     * Adds the same handler for all of the specified attrs
     * @param {String} attrs Pipe-separated list of attributes
     * @param {Function} handler The method that will be applied
     */
    function addHandle( attrs, handler ) {
      var arr = attrs.split("|"),
        i = attrs.length;

      while ( i-- ) {
        Expr.attrHandle[ arr[i] ] = handler;
      }
    }

    /**
     * Checks document order of two siblings
     * @param {Element} a
     * @param {Element} b
     * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
     */
    function siblingCheck( a, b ) {
      var cur = b && a,
        diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
          ( ~b.sourceIndex || MAX_NEGATIVE ) -
          ( ~a.sourceIndex || MAX_NEGATIVE );

      // Use IE sourceIndex if available on both nodes
      if ( diff ) {
        return diff;
      }

      // Check if b follows a
      if ( cur ) {
        while ( (cur = cur.nextSibling) ) {
          if ( cur === b ) {
            return -1;
          }
        }
      }

      return a ? 1 : -1;
    }

    /**
     * Returns a function to use in pseudos for input types
     * @param {String} type
     */
    function createInputPseudo( type ) {
      return function( elem ) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
      };
    }

    /**
     * Returns a function to use in pseudos for buttons
     * @param {String} type
     */
    function createButtonPseudo( type ) {
      return function( elem ) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
      };
    }

    /**
     * Returns a function to use in pseudos for positionals
     * @param {Function} fn
     */
    function createPositionalPseudo( fn ) {
      return markFunction(function( argument ) {
        argument = +argument;
        return markFunction(function( seed, matches ) {
          var j,
            matchIndexes = fn( [], seed.length, argument ),
            i = matchIndexes.length;

          // Match elements found at the specified indexes
          while ( i-- ) {
            if ( seed[ (j = matchIndexes[i]) ] ) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }

    /**
     * Detect xml
     * @param {Element|Object} elem An element or a document
     */
    isXML = Sizzle.isXML = function( elem ) {
      // documentElement is verified for cases where it doesn't yet exist
      // (such as loading iframes in IE - #4833)
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== "HTML" : false;
    };

    // Expose support vars for convenience
    support = Sizzle.support = {};

    /**
     * Sets document-related variables once based on the current document
     * @param {Element|Object} [doc] An element or document object to use to set the document
     * @returns {Object} Returns the current document
     */
    setDocument = Sizzle.setDocument = function( node ) {
      var doc = node ? node.ownerDocument || node : preferredDoc,
        parent = doc.defaultView;

      // If no document and documentElement is available, return
      if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
        return document;
      }

      // Set our document
      document = doc;
      docElem = doc.documentElement;

      // Support tests
      documentIsHTML = !isXML( doc );

      // Support: IE>8
      // If iframe document is assigned to "document" variable and if iframe has been reloaded,
      // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
      // IE6-8 do not support the defaultView property so parent will be undefined
      if ( parent && parent.attachEvent && parent !== parent.top ) {
        parent.attachEvent( "onbeforeunload", function() {
          setDocument();
        });
      }

      /* Attributes
      ---------------------------------------------------------------------- */

      // Support: IE<8
      // Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
      support.attributes = assert(function( div ) {
        div.className = "i";
        return !div.getAttribute("className");
      });

      /* getElement(s)By*
      ---------------------------------------------------------------------- */

      // Check if getElementsByTagName("*") returns only elements
      support.getElementsByTagName = assert(function( div ) {
        div.appendChild( doc.createComment("") );
        return !div.getElementsByTagName("*").length;
      });

      // Check if getElementsByClassName can be trusted
      support.getElementsByClassName = assert(function( div ) {
        div.innerHTML = "<div class='a'></div><div class='a i'></div>";

        // Support: Safari<4
        // Catch class over-caching
        div.firstChild.className = "i";
        // Support: Opera<10
        // Catch gEBCN failure to find non-leading classes
        return div.getElementsByClassName("i").length === 2;
      });

      // Support: IE<10
      // Check if getElementById returns elements by name
      // The broken getElementById methods don't pick up programatically-set names,
      // so use a roundabout getElementsByName test
      support.getById = assert(function( div ) {
        docElem.appendChild( div ).id = expando;
        return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
      });

      // ID find and filter
      if ( support.getById ) {
        Expr.find["ID"] = function( id, context ) {
          if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
            var m = context.getElementById( id );
            // Check parentNode to catch when Blackberry 4.6 returns
            // nodes that are no longer in the document #6963
            return m && m.parentNode ? [m] : [];
          }
        };
        Expr.filter["ID"] = function( id ) {
          var attrId = id.replace( runescape, funescape );
          return function( elem ) {
            return elem.getAttribute("id") === attrId;
          };
        };
      } else {
        // Support: IE6/7
        // getElementById is not reliable as a find shortcut
        delete Expr.find["ID"];

        Expr.filter["ID"] =  function( id ) {
          var attrId = id.replace( runescape, funescape );
          return function( elem ) {
            var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        };
      }

      // Tag
      Expr.find["TAG"] = support.getElementsByTagName ?
        function( tag, context ) {
          if ( typeof context.getElementsByTagName !== strundefined ) {
            return context.getElementsByTagName( tag );
          }
        } :
        function( tag, context ) {
          var elem,
            tmp = [],
            i = 0,
            results = context.getElementsByTagName( tag );

          // Filter out possible comments
          if ( tag === "*" ) {
            while ( (elem = results[i++]) ) {
              if ( elem.nodeType === 1 ) {
                tmp.push( elem );
              }
            }

            return tmp;
          }
          return results;
        };

      // Class
      Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
        if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
          return context.getElementsByClassName( className );
        }
      };

      /* QSA/matchesSelector
      ---------------------------------------------------------------------- */

      // QSA and matchesSelector support

      // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
      rbuggyMatches = [];

      // qSa(:focus) reports false when true (Chrome 21)
      // We allow this because of a bug in IE8/9 that throws an error
      // whenever `document.activeElement` is accessed on an iframe
      // So, we allow :focus to pass through QSA all the time to avoid the IE error
      // See http://bugs.jquery.com/ticket/13378
      rbuggyQSA = [];

      if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
        // Build QSA regex
        // Regex strategy adopted from Diego Perini
        assert(function( div ) {
          // Select is set to empty string on purpose
          // This is to test IE's treatment of not explicitly
          // setting a boolean content attribute,
          // since its presence should be enough
          // http://bugs.jquery.com/ticket/12359
          div.innerHTML = "<select><option selected=''></option></select>";

          // Support: IE8
          // Boolean attributes and "value" are not treated correctly
          if ( !div.querySelectorAll("[selected]").length ) {
            rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
          }

          // Webkit/Opera - :checked should return selected option elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          // IE8 throws error here and will not see later tests
          if ( !div.querySelectorAll(":checked").length ) {
            rbuggyQSA.push(":checked");
          }
        });

        assert(function( div ) {

          // Support: Opera 10-12/IE8
          // ^= $= *= and empty values
          // Should not select anything
          // Support: Windows 8 Native Apps
          // The type attribute is restricted during .innerHTML assignment
          var input = doc.createElement("input");
          input.setAttribute( "type", "hidden" );
          div.appendChild( input ).setAttribute( "t", "" );

          if ( div.querySelectorAll("[t^='']").length ) {
            rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
          }

          // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
          // IE8 throws error here and will not see later tests
          if ( !div.querySelectorAll(":enabled").length ) {
            rbuggyQSA.push( ":enabled", ":disabled" );
          }

          // Opera 10-11 does not throw on post-comma invalid pseudos
          div.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }

      if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
        docElem.mozMatchesSelector ||
        docElem.oMatchesSelector ||
        docElem.msMatchesSelector) )) ) {

        assert(function( div ) {
          // Check to see if it's possible to do matchesSelector
          // on a disconnected node (IE 9)
          support.disconnectedMatch = matches.call( div, "div" );

          // This should fail with an exception
          // Gecko does not error, returns false instead
          matches.call( div, "[s!='']:x" );
          rbuggyMatches.push( "!=", pseudos );
        });
      }

      rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
      rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

      /* Contains
      ---------------------------------------------------------------------- */

      // Element contains another
      // Purposefully does not implement inclusive descendent
      // As in, an element does not contain itself
      contains = rnative.test( docElem.contains ) || docElem.compareDocumentPosition ?
        function( a, b ) {
          var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
          return a === bup || !!( bup && bup.nodeType === 1 && (
            adown.contains ?
              adown.contains( bup ) :
              a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
          ));
        } :
        function( a, b ) {
          if ( b ) {
            while ( (b = b.parentNode) ) {
              if ( b === a ) {
                return true;
              }
            }
          }
          return false;
        };

      /* Sorting
      ---------------------------------------------------------------------- */

      // Document order sorting
      sortOrder = docElem.compareDocumentPosition ?
      function( a, b ) {

        // Flag for duplicate removal
        if ( a === b ) {
          hasDuplicate = true;
          return 0;
        }

        var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

        if ( compare ) {
          // Disconnected nodes
          if ( compare & 1 ||
            (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

            // Choose the first element that is related to our preferred document
            if ( a === doc || contains(preferredDoc, a) ) {
              return -1;
            }
            if ( b === doc || contains(preferredDoc, b) ) {
              return 1;
            }

            // Maintain original order
            return sortInput ?
              ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
              0;
          }

          return compare & 4 ? -1 : 1;
        }

        // Not directly comparable, sort on existence of method
        return a.compareDocumentPosition ? -1 : 1;
      } :
      function( a, b ) {
        var cur,
          i = 0,
          aup = a.parentNode,
          bup = b.parentNode,
          ap = [ a ],
          bp = [ b ];

        // Exit early if the nodes are identical
        if ( a === b ) {
          hasDuplicate = true;
          return 0;

        // Parentless nodes are either documents or disconnected
        } else if ( !aup || !bup ) {
          return a === doc ? -1 :
            b === doc ? 1 :
            aup ? -1 :
            bup ? 1 :
            sortInput ?
            ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
            0;

        // If the nodes are siblings, we can do a quick check
        } else if ( aup === bup ) {
          return siblingCheck( a, b );
        }

        // Otherwise we need full lists of their ancestors for comparison
        cur = a;
        while ( (cur = cur.parentNode) ) {
          ap.unshift( cur );
        }
        cur = b;
        while ( (cur = cur.parentNode) ) {
          bp.unshift( cur );
        }

        // Walk down the tree looking for a discrepancy
        while ( ap[i] === bp[i] ) {
          i++;
        }

        return i ?
          // Do a sibling check if the nodes have a common ancestor
          siblingCheck( ap[i], bp[i] ) :

          // Otherwise nodes in our document sort first
          ap[i] === preferredDoc ? -1 :
          bp[i] === preferredDoc ? 1 :
          0;
      };

      return doc;
    };

    // Sizzle.matches = function( expr, elements ) {
    //   return Sizzle( expr, null, null, elements );
    // };

    Sizzle.matchesSelector = function( elem, expr ) {
      // Set document vars if needed
      if ( ( elem.ownerDocument || elem ) !== document ) {
        setDocument( elem );
      }

      // Make sure that attribute selectors are quoted
      expr = expr.replace( rattributeQuotes, "='$1']" );

      if ( support.matchesSelector && documentIsHTML &&
        ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
        ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

        try {
          var ret = matches.call( elem, expr );

          // IE 9's matchesSelector returns false on disconnected nodes
          if ( ret || support.disconnectedMatch ||
              // As well, disconnected nodes are said to be in a document
              // fragment in IE 9
              elem.document && elem.document.nodeType !== 11 ) {
            return ret;
          }
        } catch(e) {}
      }

      return Sizzle( expr, document, null, [elem] ).length > 0;
    };

    Sizzle.contains = function( context, elem ) {
      // Set document vars if needed
      if ( ( context.ownerDocument || context ) !== document ) {
        setDocument( context );
      }
      return contains( context, elem );
    };

    Sizzle.attr = function( elem, name ) {
      // Set document vars if needed
      if ( ( elem.ownerDocument || elem ) !== document ) {
        setDocument( elem );
      }

      var fn = Expr.attrHandle[ name.toLowerCase() ],
        // Don't get fooled by Object.prototype properties (jQuery #13807)
        val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
          fn( elem, name, !documentIsHTML ) :
          undefined;

      return val === undefined ?
        support.attributes || !documentIsHTML ?
          elem.getAttribute( name ) :
          (val = elem.getAttributeNode(name)) && val.specified ?
            val.value :
            null :
        val;
    };

    Sizzle.error = function( msg ) {
      throw new Error( "Syntax error, unrecognized expression: " + msg );
    };

    /**
     * Document sorting and removing duplicates
     * @param {ArrayLike} results
     */
    Sizzle.uniqueSort = function( results ) {
      var elem,
        duplicates = [],
        j = 0,
        i = 0;

      // Unless we *know* we can detect duplicates, assume their presence
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice( 0 );
      results.sort( sortOrder );

      if ( hasDuplicate ) {
        while ( (elem = results[i++]) ) {
          if ( elem === results[ i ] ) {
            j = duplicates.push( i );
          }
        }
        while ( j-- ) {
          results.splice( duplicates[ j ], 1 );
        }
      }

      return results;
    };

    /**
     * Utility function for retrieving the text value of an array of DOM nodes
     * @param {Array|Element} elem
     */
    getText = Sizzle.getText = function( elem ) {
      var node,
        ret = "",
        i = 0,
        nodeType = elem.nodeType;

      if ( !nodeType ) {
        // If no nodeType, this is expected to be an array
        for ( ; (node = elem[i]); i++ ) {
          // Do not traverse comment nodes
          ret += getText( node );
        }
      } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
        // Use textContent for elements
        // innerText usage removed for consistency of new lines (see #11153)
        if ( typeof elem.textContent === "string" ) {
          return elem.textContent;
        } else {
          // Traverse its children
          for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
            ret += getText( elem );
          }
        }
      } else if ( nodeType === 3 || nodeType === 4 ) {
        return elem.nodeValue;
      }
      // Do not include comment or processing instruction nodes

      return ret;
    };

    Expr = Sizzle.selectors = {

      // Can be adjusted by the user
      cacheLength: 50,

      createPseudo: markFunction,

      match: matchExpr,

      attrHandle: {},

      find: {},

      relative: {
        ">": { dir: "parentNode", first: true },
        " ": { dir: "parentNode" },
        "+": { dir: "previousSibling", first: true },
        "~": { dir: "previousSibling" }
      },

      preFilter: {
        "ATTR": function( match ) {
          match[1] = match[1].replace( runescape, funescape );

          // Move the given value to match[3] whether quoted or unquoted
          match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

          if ( match[2] === "~=" ) {
            match[3] = " " + match[3] + " ";
          }

          return match.slice( 0, 4 );
        },

        "CHILD": function( match ) {
          /* matches from matchExpr["CHILD"]
            1 type (only|nth|...)
            2 what (child|of-type)
            3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
            4 xn-component of xn+y argument ([+-]?\d*n|)
            5 sign of xn-component
            6 x of xn-component
            7 sign of y-component
            8 y of y-component
          */
          match[1] = match[1].toLowerCase();

          if ( match[1].slice( 0, 3 ) === "nth" ) {
            // nth-* requires argument
            if ( !match[3] ) {
              Sizzle.error( match[0] );
            }

            // numeric x and y parameters for Expr.filter.CHILD
            // remember that false/true cast respectively to 0/1
            match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
            match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

          // other types prohibit arguments
          } else if ( match[3] ) {
            Sizzle.error( match[0] );
          }

          return match;
        },

        "PSEUDO": function( match ) {
          var excess,
            unquoted = !match[5] && match[2];

          if ( matchExpr["CHILD"].test( match[0] ) ) {
            return null;
          }

          // Accept quoted arguments as-is
          if ( match[3] && match[4] !== undefined ) {
            match[2] = match[4];

          // Strip excess characters from unquoted arguments
          } else if ( unquoted && rpseudo.test( unquoted ) &&
            // Get excess from tokenize (recursively)
            (excess = tokenize( unquoted, true )) &&
            // advance to the next closing parenthesis
            (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

            // excess is a negative index
            match[0] = match[0].slice( 0, excess );
            match[2] = unquoted.slice( 0, excess );
          }

          // Return only captures needed by the pseudo filter method (type and argument)
          return match.slice( 0, 3 );
        }
      },

      filter: {

        "TAG": function( nodeNameSelector ) {
          var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
          return nodeNameSelector === "*" ?
            function() { return true; } :
            function( elem ) {
              return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
            };
        },

        "CLASS": function( className ) {
          var pattern = classCache[ className + " " ];

          return pattern ||
            (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
            classCache( className, function( elem ) {
              return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
            });
        },

        "ATTR": function( name, operator, check ) {
          return function( elem ) {
            var result = Sizzle.attr( elem, name );

            if ( result == null ) {
              return operator === "!=";
            }
            if ( !operator ) {
              return true;
            }

            result += "";

            return operator === "=" ? result === check :
              operator === "!=" ? result !== check :
              operator === "^=" ? check && result.indexOf( check ) === 0 :
              operator === "*=" ? check && result.indexOf( check ) > -1 :
              operator === "$=" ? check && result.slice( -check.length ) === check :
              operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
              operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
              false;
          };
        },

        "CHILD": function( type, what, argument, first, last ) {
          var simple = type.slice( 0, 3 ) !== "nth",
            forward = type.slice( -4 ) !== "last",
            ofType = what === "of-type";

          return first === 1 && last === 0 ?

            // Shortcut for :nth-*(n)
            function( elem ) {
              return !!elem.parentNode;
            } :

            function( elem, context, xml ) {
              var cache, outerCache, node, diff, nodeIndex, start,
                dir = simple !== forward ? "nextSibling" : "previousSibling",
                parent = elem.parentNode,
                name = ofType && elem.nodeName.toLowerCase(),
                useCache = !xml && !ofType;

              if ( parent ) {

                // :(first|last|only)-(child|of-type)
                if ( simple ) {
                  while ( dir ) {
                    node = elem;
                    while ( (node = node[ dir ]) ) {
                      if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
                        return false;
                      }
                    }
                    // Reverse direction for :only-* (if we haven't yet done so)
                    start = dir = type === "only" && !start && "nextSibling";
                  }
                  return true;
                }

                start = [ forward ? parent.firstChild : parent.lastChild ];

                // non-xml :nth-child(...) stores cache data on `parent`
                if ( forward && useCache ) {
                  // Seek `elem` from a previously-cached index
                  outerCache = parent[ expando ] || (parent[ expando ] = {});
                  cache = outerCache[ type ] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = cache[0] === dirruns && cache[2];
                  node = nodeIndex && parent.childNodes[ nodeIndex ];

                  while ( (node = ++nodeIndex && node && node[ dir ] ||

                    // Fallback to seeking `elem` from the start
                    (diff = nodeIndex = 0) || start.pop()) ) {

                    // When found, cache indexes on `parent` and break
                    if ( node.nodeType === 1 && ++diff && node === elem ) {
                      outerCache[ type ] = [ dirruns, nodeIndex, diff ];
                      break;
                    }
                  }

                // Use previously-cached element index if available
                } else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
                  diff = cache[1];

                // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
                } else {
                  // Use the same loop as above to seek `elem` from the start
                  while ( (node = ++nodeIndex && node && node[ dir ] ||
                    (diff = nodeIndex = 0) || start.pop()) ) {

                    if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
                      // Cache the index of each encountered element
                      if ( useCache ) {
                        (node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
                      }

                      if ( node === elem ) {
                        break;
                      }
                    }
                  }
                }

                // Incorporate the offset, then check against cycle size
                diff -= last;
                return diff === first || ( diff % first === 0 && diff / first >= 0 );
              }
            };
        },

        "PSEUDO": function( pseudo, argument ) {
          // pseudo-class names are case-insensitive
          // http://www.w3.org/TR/selectors/#pseudo-classes
          // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
          // Remember that SetFilters inherits from pseudos
          var args,
            fn = Expr.pseudos[ pseudo ] || Expr.SetFilters[ pseudo.toLowerCase() ] ||
              Sizzle.error( "unsupported pseudo: " + pseudo );

          // The user may use createPseudo to indicate that
          // arguments are needed to create the filter function
          // just as Sizzle does
          if ( fn[ expando ] ) {
            return fn( argument );
          }

          // But maintain support for old signatures
          if ( fn.length > 1 ) {
            args = [ pseudo, pseudo, "", argument ];
            return Expr.SetFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
              markFunction(function( seed, matches ) {
                var idx,
                  matched = fn( seed, argument ),
                  i = matched.length;
                while ( i-- ) {
                  idx = indexOf.call( seed, matched[i] );
                  seed[ idx ] = !( matches[ idx ] = matched[i] );
                }
              }) :
              function( elem ) {
                return fn( elem, 0, args );
              };
          }

          return fn;
        }
      },

      pseudos: {
        // Potentially complex pseudos
        "not": markFunction(function( selector ) {
          // Trim the selector passed to compile
          // to avoid treating leading and trailing
          // spaces as combinators
          var input = [],
            results = [],
            matcher = compile( selector.replace( rtrim, "$1" ) );

          return matcher[ expando ] ?
            markFunction(function( seed, matches, context, xml ) {
              var elem,
                unmatched = matcher( seed, null, xml, [] ),
                i = seed.length;

              // Match elements unmatched by `matcher`
              while ( i-- ) {
                if ( (elem = unmatched[i]) ) {
                  seed[i] = !(matches[i] = elem);
                }
              }
            }) :
            function( elem, context, xml ) {
              input[0] = elem;
              matcher( input, null, xml, results );
              return !results.pop();
            };
        }),

        "has": markFunction(function( selector ) {
          return function( elem ) {
            return Sizzle( selector, elem ).length > 0;
          };
        }),

        "contains": markFunction(function( text ) {
          return function( elem ) {
            return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
          };
        }),

        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // http://www.w3.org/TR/selectors/#lang-pseudo
        "lang": markFunction( function( lang ) {
          // lang value must be a valid identifier
          if ( !ridentifier.test(lang || "") ) {
            Sizzle.error( "unsupported lang: " + lang );
          }
          lang = lang.replace( runescape, funescape ).toLowerCase();
          return function( elem ) {
            var elemLang;
            do {
              if ( (elemLang = documentIsHTML ?
                elem.lang :
                elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
              }
            } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
            return false;
          };
        }),

        // Miscellaneous
        "target": function( elem ) {
          var hash = win.location && win.location.hash;
          return hash && hash.slice( 1 ) === elem.id;
        },

        "root": function( elem ) {
          return elem === docElem;
        },

        "focus": function( elem ) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },

        // Boolean properties
        "enabled": function( elem ) {
          return elem.disabled === false;
        },

        "disabled": function( elem ) {
          return elem.disabled === true;
        },

        "checked": function( elem ) {
          // In CSS3, :checked should return both checked and selected elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          var nodeName = elem.nodeName.toLowerCase();
          return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
        },

        "selected": function( elem ) {
          // Accessing this property makes selected-by-default
          // options in Safari work properly
          if ( elem.parentNode ) {
            elem.parentNode.selectedIndex;
          }

          return elem.selected === true;
        },

        // Contents
        "empty": function( elem ) {
          // http://www.w3.org/TR/selectors/#empty-pseudo
          // :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
          //   not comment, processing instructions, or others
          // Thanks to Diego Perini for the nodeName shortcut
          //   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
          for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
            if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
              return false;
            }
          }
          return true;
        },

        "parent": function( elem ) {
          return !Expr.pseudos["empty"]( elem );
        },

        // Element/input types
        "header": function( elem ) {
          return rheader.test( elem.nodeName );
        },

        "input": function( elem ) {
          return rinputs.test( elem.nodeName );
        },

        "button": function( elem ) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button";
        },

        "text": function( elem ) {
          var attr;
          // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
          // use getAttribute instead to test this case
          return elem.nodeName.toLowerCase() === "input" &&
            elem.type === "text" &&
            ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
        },

        // Position-in-collection
        "first": createPositionalPseudo(function() {
          return [ 0 ];
        }),

        "last": createPositionalPseudo(function( matchIndexes, length ) {
          return [ length - 1 ];
        }),

        "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
          return [ argument < 0 ? argument + length : argument ];
        }),

        "even": createPositionalPseudo(function( matchIndexes, length ) {
          var i = 0;
          for ( ; i < length; i += 2 ) {
            matchIndexes.push( i );
          }
          return matchIndexes;
        }),

        "odd": createPositionalPseudo(function( matchIndexes, length ) {
          var i = 1;
          for ( ; i < length; i += 2 ) {
            matchIndexes.push( i );
          }
          return matchIndexes;
        }),

        "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
          var i = argument < 0 ? argument + length : argument;
          for ( ; --i >= 0; ) {
            matchIndexes.push( i );
          }
          return matchIndexes;
        }),

        "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
          var i = argument < 0 ? argument + length : argument;
          for ( ; ++i < length; ) {
            matchIndexes.push( i );
          }
          return matchIndexes;
        })
      }
    };

    Expr.pseudos["nth"] = Expr.pseudos["eq"];

    // Add button/input type pseudos
    for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
      Expr.pseudos[ i ] = createInputPseudo( i );
    }
    for ( i in { submit: true, reset: true } ) {
      Expr.pseudos[ i ] = createButtonPseudo( i );
    }

    // Easy API for creating new SetFilters
    function SetFilters() {}
    SetFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.SetFilters = new SetFilters();

    function tokenize( selector, parseOnly ) {
      var matched, match, tokens, type,
        soFar, groups, preFilters,
        cached = tokenCache[ selector + " " ];

      if ( cached ) {
        return parseOnly ? 0 : cached.slice( 0 );
      }

      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;

      while ( soFar ) {

        // Comma and first run
        if ( !matched || (match = rcomma.exec( soFar )) ) {
          if ( match ) {
            // Don't consume trailing commas as valid
            soFar = soFar.slice( match[0].length ) || soFar;
          }
          groups.push( tokens = [] );
        }

        matched = false;

        // Combinators
        if ( (match = rcombinators.exec( soFar )) ) {
          matched = match.shift();
          tokens.push({
            value: matched,
            // Cast descendant combinators to space
            type: match[0].replace( rtrim, " " )
          });
          soFar = soFar.slice( matched.length );
        }

        // Filters
        for ( type in Expr.filter ) {
          if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
            (match = preFilters[ type ]( match ))) ) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice( matched.length );
          }
        }

        if ( !matched ) {
          break;
        }
      }

      // Return the length of the invalid excess
      // if we're just parsing
      // Otherwise, throw an error or return tokens
      return parseOnly ?
        soFar.length :
        soFar ?
          Sizzle.error( selector ) :
          // Cache the tokens
          tokenCache( selector, groups ).slice( 0 );
    }

    function toSelector( tokens ) {
      var i = 0,
        len = tokens.length,
        selector = "";
      for ( ; i < len; i++ ) {
        selector += tokens[i].value;
      }
      return selector;
    }

    function addCombinator( matcher, combinator, base ) {
      var dir = combinator.dir,
        checkNonElements = base && dir === "parentNode",
        doneName = done++;

      return combinator.first ?
        // Check against closest ancestor/preceding element
        function( elem, context, xml ) {
          while ( (elem = elem[ dir ]) ) {
            if ( elem.nodeType === 1 || checkNonElements ) {
              return matcher( elem, context, xml );
            }
          }
        } :

        // Check against all ancestor/preceding elements
        function( elem, context, xml ) {
          var data, cache, outerCache,
            dirkey = dirruns + " " + doneName;

          // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
          if ( xml ) {
            while ( (elem = elem[ dir ]) ) {
              if ( elem.nodeType === 1 || checkNonElements ) {
                if ( matcher( elem, context, xml ) ) {
                  return true;
                }
              }
            }
          } else {
            while ( (elem = elem[ dir ]) ) {
              if ( elem.nodeType === 1 || checkNonElements ) {
                outerCache = elem[ expando ] || (elem[ expando ] = {});
                if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
                  if ( (data = cache[1]) === true || data === cachedruns ) {
                    return data === true;
                  }
                } else {
                  cache = outerCache[ dir ] = [ dirkey ];
                  cache[1] = matcher( elem, context, xml ) || cachedruns;
                  if ( cache[1] === true ) {
                    return true;
                  }
                }
              }
            }
          }
        };
    }

    function elementMatcher( matchers ) {
      return matchers.length > 1 ?
        function( elem, context, xml ) {
          var i = matchers.length;
          while ( i-- ) {
            if ( !matchers[i]( elem, context, xml ) ) {
              return false;
            }
          }
          return true;
        } :
        matchers[0];
    }

    function condense( unmatched, map, filter, context, xml ) {
      var elem,
        newUnmatched = [],
        i = 0,
        len = unmatched.length,
        mapped = map != null;

      for ( ; i < len; i++ ) {
        if ( (elem = unmatched[i]) ) {
          if ( !filter || filter( elem, context, xml ) ) {
            newUnmatched.push( elem );
            if ( mapped ) {
              map.push( i );
            }
          }
        }
      }

      return newUnmatched;
    }

    function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
      if ( postFilter && !postFilter[ expando ] ) {
        postFilter = setMatcher( postFilter );
      }
      if ( postFinder && !postFinder[ expando ] ) {
        postFinder = setMatcher( postFinder, postSelector );
      }
      return markFunction(function( seed, results, context, xml ) {
        var temp, i, elem,
          preMap = [],
          postMap = [],
          preexisting = results.length,

          // Get initial elements from seed or context
          elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

          // Prefilter to get matcher input, preserving a map for seed-results synchronization
          matcherIn = preFilter && ( seed || !selector ) ?
            condense( elems, preMap, preFilter, context, xml ) :
            elems,

          matcherOut = matcher ?
            // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
            postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

              // ...intermediate processing is necessary
              [] :

              // ...otherwise use results directly
              results :
            matcherIn;

        // Find primary matches
        if ( matcher ) {
          matcher( matcherIn, matcherOut, context, xml );
        }

        // Apply postFilter
        if ( postFilter ) {
          temp = condense( matcherOut, postMap );
          postFilter( temp, [], context, xml );

          // Un-match failing elements by moving them back to matcherIn
          i = temp.length;
          while ( i-- ) {
            if ( (elem = temp[i]) ) {
              matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
            }
          }
        }

        if ( seed ) {
          if ( postFinder || preFilter ) {
            if ( postFinder ) {
              // Get the final matcherOut by condensing this intermediate into postFinder contexts
              temp = [];
              i = matcherOut.length;
              while ( i-- ) {
                if ( (elem = matcherOut[i]) ) {
                  // Restore matcherIn since elem is not yet a final match
                  temp.push( (matcherIn[i] = elem) );
                }
              }
              postFinder( null, (matcherOut = []), temp, xml );
            }

            // Move matched elements from seed to results to keep them synchronized
            i = matcherOut.length;
            while ( i-- ) {
              if ( (elem = matcherOut[i]) &&
                (temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

                seed[temp] = !(results[temp] = elem);
              }
            }
          }

        // Add elements to results, through postFinder if defined
        } else {
          matcherOut = condense(
            matcherOut === results ?
              matcherOut.splice( preexisting, matcherOut.length ) :
              matcherOut
          );
          if ( postFinder ) {
            postFinder( null, results, matcherOut, xml );
          } else {
            push.apply( results, matcherOut );
          }
        }
      });
    }

    function matcherFromTokens( tokens ) {
      var checkContext, matcher, j,
        len = tokens.length,
        leadingRelative = Expr.relative[ tokens[0].type ],
        implicitRelative = leadingRelative || Expr.relative[" "],
        i = leadingRelative ? 1 : 0,

        // The foundational matcher ensures that elements are reachable from top-level context(s)
        matchContext = addCombinator( function( elem ) {
          return elem === checkContext;
        }, implicitRelative, true ),
        matchAnyContext = addCombinator( function( elem ) {
          return indexOf.call( checkContext, elem ) > -1;
        }, implicitRelative, true ),
        matchers = [ function( elem, context, xml ) {
          return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
            (checkContext = context).nodeType ?
              matchContext( elem, context, xml ) :
              matchAnyContext( elem, context, xml ) );
        } ];

      for ( ; i < len; i++ ) {
        if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
          matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
        } else {
          matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

          // Return special upon seeing a positional matcher
          if ( matcher[ expando ] ) {
            // Find the next relative operator (if any) for proper handling
            j = ++i;
            for ( ; j < len; j++ ) {
              if ( Expr.relative[ tokens[j].type ] ) {
                break;
              }
            }
            return setMatcher(
              i > 1 && elementMatcher( matchers ),
              i > 1 && toSelector(
                // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
              ).replace( rtrim, "$1" ),
              matcher,
              i < j && matcherFromTokens( tokens.slice( i, j ) ),
              j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
              j < len && toSelector( tokens )
            );
          }
          matchers.push( matcher );
        }
      }

      return elementMatcher( matchers );
    }

    function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
      // A counter to specify which element is currently being matched
      var matcherCachedRuns = 0,
        bySet = setMatchers.length > 0,
        byElement = elementMatchers.length > 0,
        superMatcher = function( seed, context, xml, results, expandContext ) {
          var elem, j, matcher,
            setMatched = [],
            matchedCount = 0,
            i = "0",
            unmatched = seed && [],
            outermost = expandContext != null,
            contextBackup = outermostContext,
            // We must always have either seed elements or context
            elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
            // Use integer dirruns iff this is the outermost matcher
            dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
            len = elems.length;

          if ( outermost ) {
            outermostContext = context !== document && context;
            cachedruns = matcherCachedRuns;
          }

          // Add elements passing elementMatchers directly to results
          // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
          // Support: IE<9, Safari
          // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
          for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
            if ( byElement && elem ) {
              j = 0;
              while ( (matcher = elementMatchers[j++]) ) {
                if ( matcher( elem, context, xml ) ) {
                  results.push( elem );
                  break;
                }
              }
              if ( outermost ) {
                dirruns = dirrunsUnique;
                cachedruns = ++matcherCachedRuns;
              }
            }

            // Track unmatched elements for set filters
            if ( bySet ) {
              // They will have gone through all possible matchers
              if ( (elem = !matcher && elem) ) {
                matchedCount--;
              }

              // Lengthen the array for every element, matched or not
              if ( seed ) {
                unmatched.push( elem );
              }
            }
          }

          // Apply set filters to unmatched elements
          matchedCount += i;
          if ( bySet && i !== matchedCount ) {
            j = 0;
            while ( (matcher = setMatchers[j++]) ) {
              matcher( unmatched, setMatched, context, xml );
            }

            if ( seed ) {
              // Reintegrate element matches to eliminate the need for sorting
              if ( matchedCount > 0 ) {
                while ( i-- ) {
                  if ( !(unmatched[i] || setMatched[i]) ) {
                    setMatched[i] = pop.call( results );
                  }
                }
              }

              // Discard index placeholder values to get only actual matches
              setMatched = condense( setMatched );
            }

            // Add matches to results
            push.apply( results, setMatched );

            // Seedless set matches succeeding multiple successful matchers stipulate sorting
            if ( outermost && !seed && setMatched.length > 0 &&
              ( matchedCount + setMatchers.length ) > 1 ) {

              Sizzle.uniqueSort( results );
            }
          }

          // Override manipulation of globals by nested matchers
          if ( outermost ) {
            dirruns = dirrunsUnique;
            outermostContext = contextBackup;
          }

          return unmatched;
        };

      return bySet ?
        markFunction( superMatcher ) :
        superMatcher;
    }

    compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
      var i,
        setMatchers = [],
        elementMatchers = [],
        cached = compilerCache[ selector + " " ];

      if ( !cached ) {
        // Generate a function of recursive functions that can be used to check each element
        if ( !group ) {
          group = tokenize( selector );
        }
        i = group.length;
        while ( i-- ) {
          cached = matcherFromTokens( group[i] );
          if ( cached[ expando ] ) {
            setMatchers.push( cached );
          } else {
            elementMatchers.push( cached );
          }
        }

        // Cache the compiled function
        cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
      }
      return cached;
    };

    function multipleContexts( selector, contexts, results ) {
      var i = 0,
        len = contexts.length;
      for ( ; i < len; i++ ) {
        Sizzle( selector, contexts[i], results );
      }
      return results;
    }

    // One-time assignments

    // Sort stability
    support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

    // Support: Chrome<14
    // Always assume duplicates if they aren't passed to the comparison function
    support.detectDuplicates = hasDuplicate;

    // Initialize against the default document
    setDocument();

    // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
    // Detached nodes confoundingly follow *each other*
    support.sortDetached = assert(function( div1 ) {
      // Should return 1, but returns 4 (following)
      return div1.compareDocumentPosition( document.createElement("div") ) & 1;
    });

    // Support: IE<8
    // Prevent attribute/property "interpolation"
    // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
    if ( !assert(function( div ) {
      div.innerHTML = "<a href='#'></a>";
      return div.firstChild.getAttribute("href") === "#" ;
    }) ) {
      addHandle( "type|href|height|width", function( elem, name, isXML ) {
        if ( !isXML ) {
          return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
        }
      });
    }

    // Support: IE<9
    // Use defaultValue in place of getAttribute("value")
    if ( !support.attributes || !assert(function( div ) {
      div.innerHTML = "<input/>";
      div.firstChild.setAttribute( "value", "" );
      return div.firstChild.getAttribute( "value" ) === "";
    }) ) {
      addHandle( "value", function( elem, name, isXML ) {
        if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
          return elem.defaultValue;
        }
      });
    }

    // Support: IE<9
    // Use getAttributeNode to fetch booleans when getAttribute lies
    if ( !assert(function( div ) {
      return div.getAttribute("disabled") == null;
    }) ) {
      addHandle( booleans, function( elem, name, isXML ) {
        var val;
        if ( !isXML ) {
          return (val = elem.getAttributeNode( name )) && val.specified ?
            val.value :
            elem[ name ] === true ? name.toLowerCase() : null;
        }
      });
    }

    // document.querySelectorAll = function querySelectorAll (selector) {
    //   return Sizzle(selector, this);
    // };

    // document.querySelector = function querySelector (selector) {
    //   return (document.querySelectorAll.call(this, selector)[0] || null);
    // };

    return Sizzle;

  }());
  
  function each (arr, fn, thisRef) {
    var _i, _l;

    if (!(arr && fn)) {
      return;
    }

    thisRef = thisRef || arr;

    if (Array.prototype.forEach) {
      return Array.prototype.forEach.call(arr, fn);
    }

    for (_i = 0, _l = arr.length; _i < _l; _i += 1) {
      fn.call(thisRef, arr[_i]);
    }
  }

  function extend (obj, ext) {
    var _i;

    if (!(typeof obj === "object" && typeof ext === "object")) {
      return;
    }

    for (_i in ext) {
      if (ext.hasOwnProperty(_i)) {
        obj[_i] = ext[_i];
      }
    }

    return obj;
  }
  
  // Core Library

  // --------------------------------------------------
  // select()
  // --------------------------------------------------
  // 
  // Select elements
  // 
  // This function can be used throughout the code
  // to select elements
  // 
  // Usage:
  //
  // select(selector, root)
  //   selector - Selector {String}
  //   root - Root element {String|HTMLElement}
  //

  select = feature.qsa3 ? function (selector, root) {
    // Set root to given root or document
    root = root || doc;

    return root.querySelectorAll(selector);
  } : function (selector, root) {
    return sizzle(selector, root);
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
    } else if (typeof input === "string") {
      if (input.trim() === "") {
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
  hilo.each = each;
  hilo.extend = extend;
  
  // --------------------------------------------------
  // Testing
  // --------------------------------------------------

  extend(hilo, {
    test: function (con) {
      return new Test(con);
    }
  });

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
    ifEquals: function (tw) {
      var val = this.con === tw;
      return this.neg ? !val : val;
    },

    ifIs: function (tw) {
      var val = this.con === tw;
      return this.neg ? !val : val;
    },

    ifContains: function (tw) {
      var ifString = this.con.split(tw).length === 1 ? false : true;
      if (typeof tw === "string" && typeof this.con === "object" && this.con.length) {

      } else if (typeof tw === "string" && typeof this.con === "string") {
        return this.neg ? !ifString : ifString;
      }
    }
  });
  
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
        return String(this).replace(trimBeginRegexp, "")
          .replace(trimEndRegexp, "");
      };
    }
  }());

  // Array Shims

  if (!Array.prototype.every) {
    Array.prototype.every = function(fun /*, thisp */) {
      var t, len, thisp, _i;

      if (this === null) {
        throw new TypeError();
      }

      t = Object(this);
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
  }
  // --------------------------------------------------
  // Hilo AJAX
  // --------------------------------------------------

  /**
   * Makes an AJAX request
   * 
   * @param {object} config AJAX configuration options
   * @return {Hilo}
   */
  hiloAjax = function (config) {
      
    /*
     *
     * config:
     *  
     * - method: HTTP Method "GET" or "POST" (default: "POST")
     * - url: The file to send request
     * - async: Whether to perform an asynchronous request (default: true)
     * - data: The data to be sent to the server
     * - response: Response type "text" or "XML"
     * - Event functions
     *   - callback: fn to be exec. on readystatechange
     *   - complete
     *   - error
     *   - timeout
     *   - success
     *   - notfound
     *   - forbidden
     * - username
     * - password
     * - contentType
     *
     */
    
    var xhr;

    if (win.XMLHttpRequest) {
      xhr = new win.XMLHttpRequest();
    } else if (win.ActiveXObject) {
      xhr = new win.ActiveXObject("Microsoft.XMLHTTP");
    }

    if (!config.url) {
      throw new TypeError("url parameter not provided to hilo.ajax");
    }

    // Set defaults

    // Asynchronous requests are preferred
    config.async = config.async || true;

    // Authentication params
    config.username = config.username || null;
    config.password = config.password || null;

    // contentType application/x-www-form-urlencoded; charset=UTF-8 is preferred
    config.contentType = config.contentType || "application/x-www-form-urlencoded; charset=UTF-8";

    xhr.onreadystatechange = function () {
      if (config.callback) {
        config.callback(xhr);
      }

      if (xhr.readyState === 4) { // Request is completed
        typeof config.complete ? config.complete.call(this, xhr) : null;
        
        switch (xhr.status) {
          case 200: {
            typeof config.success ? config.success.call(this, xhr) : null;
          } break;

          case 404: {
            typeof config.notfound ? config.notfound.call(this, xhr) : null;
          } break;

          case 403: {
            typeof config.forbidden ? config.forbidden.call(this, xhr) : null;
          } break;

          case 500: {
            typeof config.error ? config.error.call(this, xhr) : null;
          } break;
        }
      }
    };

    xhr.timeout = config.timeout;

    if (typeof config.method === "string") {
      if (config.method.trim().toUpperCase() === "POST") {
        xhr.open(
          "POST",
          config.url,
          config.async,
          config.username,
          config.password
        );

        xhr.send(config.data);
      } else if (config.method.trim().toUpperCase() === "GET") {
        xhr.open(
          "GET",
          config.url + (config.data ? "+" + config.data : ""),
          config.async,
          config.username,
          config.password
        );

        xhr.send(typeof config.data === "string" ? config.data : null);
      }
    } else {
      xhr.open(
        config.method.trim().toUpperCase(),
        config.url + (config.data ? "+" + config.data : ''),
        config.async,
        config.username,
        config.password
      );

      xhr.send(typeof config.data === "string" ? config.data : null);
    }
  };

  hilo.ajax = hiloAjax;
  
  // AJAX Simplifiers

  function ajaxRequest (method, strOpt, callback, oOpt) {

    //
    // How does this function work?
    //
    // Let's forget about the method parameter
    //
    // 1. If "strOpt" is a string, and "callback" is a function,
    //    a. If "oOpt" is an object, then all props. of "oOpt" and
    //       {method:method,url:strOpt,success:callback} is passed
    //       as the first parameter to the hiloAjax function.
    //    b. If "oOpt" is not an object, hiloAjax is called with
    //       {method:method,url:strOpt,success:callback} as the 
    //       first parameter.
    // 2. Else, hiloAjax is called with {method:method} and strOpt
    //    as the first parameter.
    //
    // Note: "method" is the HTTP Req. method ("GET", "POST" or alike)
    // 
    //

    oOpt = (typeof oOpt === "object" ? oOpt : undefined);
    
    if (typeof strOpt === "string" && typeof callback === "function") {
      hiloAjax(extend({
        method: method,
        url: strOpt,

        // 'success' and not 'callback' because that's what everyone wants
        success: callback
      }, oOpt));
    } else {
      hiloAjax(extend({
        method: method
      }, strOpt));
    }
  }

  // --------------------------------------------------
  // Hilo.get()
  // --------------------------------------------------
  // 
  // Send an AJAX GET request
  // 
  //  .get( strOpt [, callback [, oOpt]] )
  //
  // Examples:
  // 
  // $.get({
  //   url: "path/to/file.js",
  //   success: function (data) {
  //     console.log(data);
  //   }
  // }) // Longer form, the below is preferred
  // 
  // $.get("path/to/file.js", function (data) {
  //   console.log(data);
  // }) // This does the exact same function as above
  // 
  // $.get("path/to/file.js", function (data) {
  //   console.log(data);
  // }, {
  //   error: function (err) {
  //     console.error(err);
  //   }
  // }) // Shortform, with more options
  // 

  hilo.get = function (strOpt, callback, oOpt) {
    ajaxRequest("GET", strOpt, callback, oOpt);
  };

  // --------------------------------------------------
  // Hilo.post()
  // --------------------------------------------------
  // 
  // Send an AJAX POST request
  // 
  //  .post( strOpt [, callback [, oOpt]] )
  //
  // Examples:
  // 
  // $.post({
  //   url: "path/to/file.js",
  //   success: function (data) {
  //     console.log(data);
  //   },
  //   data: JSON.encode(obj)
  // }) // Longer form, the below is preferred
  // 
  // $.post("path/to/file.js", function (data) {
  //   console.log(data);
  // }, {
  //   data: JSON.encode(obj),
  //   error: function (err) {
  //     console.error(err);
  //   }
  // }) // Shortform, with more options
  // 

  hilo.post = function (strOpt, callback, oOpt) {
    ajaxRequest("POST", strOpt, callback, oOpt);
  };
  
  // --------------------------------------------------
  // Hilo DOM
  // --------------------------------------------------

  /**
   * Main DOM Class
   * 
   * @class Dom
   * @constructor
   * @param {array} els The elements to manipulate
   * @param {string} sel The selector used
   * @return void
   * @example
   * <div class="code"><pre class="prettyprint">
   * new Dom (document.querySelectorAll(p:first-child);
   * new Dom ([document.createElement("div")]);
   * new Dom ([document.getElementByid("box")]);
   * new Dom (document.getElementsByClassName("hidden"));
   * new Dom (document.getElementsByTagName("mark"));
   * </pre></div>
   * @since 0.1.0
   */
  function Dom (els, sel) {
    var _i, _l;

    // Note that `this` is an object and"
    // NOT an Array

    // Loop thorugh the NodeList and set
    // this[index] for els[index]

    for (_i = 0, _l = els.length; _i < _l; _i += 1) {
      this[_i] = els[_i];
    }

    // Useful for looping through as ours
    // is an object and not an array

    this.length = els.length;

    // Know what selector is used to select
    // the elements

    this.sel = sel;
  }

  Dom.prototype = Array.prototype;
  
  // --------------------------------------------------
  // Helper Functions
  // --------------------------------------------------

  extend(Dom.prototype, {

    /**
     * Execute a function on selected elements
     * 
     * @for Dom
     * @method each
     * @param {function} fn The function to be called on
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").each(function (el) {
     *   doSomethingWith(e);
     * });
     * </pre></div>
     * @since 0.1.0
     */
    each: function (fn) {
      this.map(fn);
      return this; // return the current Dom instance
    },

    /**
     * Return the results of executing a function 
     * on all the selected elements
     * 
     * @for Dom
     * @method map
     * @param {function} fn The function to be called on
     * @return {array} The results of execution
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div.need-cf").map(function (e) {
     *   doSomethingWith(e);
     * });
     * </pre></div>
     * @since 0.1.0
     */
    map: function (fn) {
      var results = [], _i, _l;
      for (_i = 0, _l = this.length; _i < _l; _i += 1) {
        results.push(fn.call(this, this[_i], _i));
      }
      return results;
    },

    /**
     * Map on selected elements and return them based 
     * on the number of selected elements
     * 
     * @for Dom
     * @method one
     * @param {function} fn Function to be called on
     * @return {Any|array}
     * @since 0.1.0
     */
    one: function (fn) {
      var m = this.map(fn);
      return m.length > 1 ? m : m[0];
    },

    /**
     * Execute a function on the first selected element
     * 
     * @for Dom
     * @method first
     * @param {function} fn The function to be called
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div").first(function (e) {
     *   console.log(e + " is the first div");
     * });
     * </pre></div>
     * @since 0.1.0
     */
    first: function (fn) {
      return fn(this[0]);
    },

    /**
     * Filters the selected elements and returns the 
     * elements that pass the test (or return true)
     * 
     * @for Dom
     * @method filter
     * @param {function} fn The filter function
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div").filter(function (el) {
     *   return el.className.split("hidden").length > 1;
     * });
     * </pre></div>
     * @since 0.1.0
     */
    filter: function (fn) {
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
          if (fn.call(this, val, _i, t)) {
            res.push(val);
          }
        }
      }

      return new Dom(res);
    }
  });

  // --------------------------------------------------
  // Element Selections, etc.
  // --------------------------------------------------

  /**
   * Create an element
   *
   * @for hilo
   * @method create
   * @param {string} tagName Tag Name or Node name of element
   * @attrs {object} attrs An object containing the attributes and values
   * @return {HTMLElement} The created element
   * @example
   * <div class="code"><pre class="prettyprint">
   * $.create("div", {
   *   class: "post",
   *   "data-id": 2
   * });
   * </pre></div>
   * @since 0.1.0
   */
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
          el.attr(key, attrs["key"]);
        }
      }
    }

    return el;
  };

  extend(Dom.prototype, {

    /**
     * Return first element of the selected elements
     *
     * @for Dom
     * @method first
     * @return {Dom} The first element
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p.hidden").first().show();
     * </pre></div>
     * @since 0.1.0
     */
    first: function () {
      return new Dom([this[0]]);
    },

    /**
     * Return last element of the selected elements
     *
     * @for Dom
     * @method last
     * @return {Dom} The last element
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p.hidden").last().show();
     * </pre></div>
     * @since 0.1.0
     */
    last: function () {
      return new Dom([this[this.length - 1]]);
    },

    /**
     * Return nth element of the selected elements
     *
     * @for Dom
     * @method el
     * @return {number} place The index of element (Index Starts from 1)
     * @return {Dom} The nth element
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p.hidden").el(3).show();
     * </pre></div>
     * @since 0.1.0
     */
    el: function (place) {
      return new Dom([this[place - 1]]);
    },

    /**
     * Return the children of selected elements
     *
     * @for Dom
     * @method children
     * @param {string} sel Optional filtering selector
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * var childrenOfContainer = $("div.container").children();
     * $("div.container").children(":not(.hidden)").addClass("me");
     * </pre></div>
     * @since 0.1.0
     */
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

    /**
     * Returns the parents of selected elements
     *
     * @for Dom
     * @method parents
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div#editor").parent().hide()
     * </pre></div>
     * @since 0.1.0
     */
    parents: function () {
      var pars = [];

      this.each(function (el) {
        pars = pars.concat(el.parentElement);
      });

      return new Dom(pars);
    },

    /**
     * Return parent of first selected element
     *
     * @for Dom
     * @method parent
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div.editor").parent().hide();
     * </pre></div>
     * @since 0.1.0
     */
    parent: function () {
      return this.first(function (el) {
        return new Dom([el.parentElement]);
      });
    },

    /**
     * Return relative of selected elements based 
     * on the relation given
     * 
     * @for Dom
     * @method rel
     * @param {string} relation relation
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div#editor").rel("nextSibling").addClass("next-to-editor")
     * </pre></div>
     * @since 0.1.0
     */
    rel: function (sul) {
      var els = [];

      this.each(function (el) {
        els.push(el[sul]);
      });

      return els;
    },

    /**
     * Return next sibling elements of selected elements
     *
     * @for Dom
     * @method next
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div.editor").next().class("next-to-editor")
     * </pre></div>
     */
    next: function () {
      return this.rel("nextElementSibling");
    },

    /**
     * Return previous sibling elements of selected elements
     *
     * @for Dom
     * @method prev
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div.editor").prev().class("prev-to-editor")
     * </pre></div>
     */
    prev: function () {
      return this.rel("previousElementSibling");
    }
  });
  
  // --------------------------------------------------
  // DOM HTML
  // --------------------------------------------------

  /**
   * Set or return innerHTML of selected elements
   * 
   * @for Dom
   * @method html
   * @param {string} html HTML Code to be inserted
   * @return {string|void}
   * @example
   * <div class="code"><pre class="prettyprint">
   * $("p:first-child").html("first-p")
   * var html = $("span").html()
   * </pre></div>
   * @since 0.1.0
   */
  Dom.prototype.html = function (htmlCode) {
    if (typeof htmlCode !== "undefined") {
      return this.each(function(el) {
        el.innerHTML = htmlCode;
      });
    } else {
      return this.first(function(el) {
        return el.innerHTML;
      });
    }
  };

  /**
   * Empty the selected elements
   * 
   * @for Dom
   * @method empty
   * @return {Dom}
   * @example
   * <div class="code"><pre class="prettyprint">
   * $("#todo-list").empty()
   * </pre></div>
   * @since 0.1.0
   */
  Dom.prototype.empty = function () {
    return this.html("");
  };

  /**
   * Append html to selected elements
   * 
   * @for Dom
   * @method append
   * @param {string} html The HTML Code to be appended
   * @return {Dom}
   * @example
   * <div class="code"><pre class="prettyprint">
   * $("p:first-child").append(" - From the first p child")
   * </pre></div>
   * @since 0.1.0
   */
  Dom.prototype.append = function (html) {
    return this.each(function (el) {
      el.innerHTML += html;
    });
  };

  /**
   * Prepend html to selected elements
   * 
   * @for Dom
   * @method prepend
   * @param {string} html The HTML Code to be prepended
   * @return {Dom}
   * @example
   * <div class="code"><pre class="prettyprint">
   * $("p.subject").prepend("Subject: ")
   * </pre></div>
   * @since 0.1.0
   */
  Dom.prototype.prepend = function (html) {
    return this.each(function (el) {
      el.innerHTML = html + el.innerHTML;
    });
  };

  /**
   * Get or set the value attribute of selected element
   * 
   * @for Dom
   * @method value
   * @param val The value to set to
   * @return {string|void}
   * @example
   * <div class="code"><pre class="prettyprint">
   * $("#my-form").children("input#name").value();
   * </pre></div>
   * @since 0.1.0
   */
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

  extend(Dom.prototype, {

    /**
     * Set or return ID of first element
     *  
     * @for Dom
     * @method id
     * @param {string} id The id to set
     * @return {string|void}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p.rect").first().id("square")
     * </pre></div>
     * @since 0.1.0
     */
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

    /**
     * Add, remove or check class(es)
     * 
     * @for Dom
     * @method class
     * @param {string} action Specifies the action to take
     * @param {string|array} className Class(es) to be checked or manipulated
     * @return {boolean|void}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div#editor").class("add", "no-js")
     * </pre></div>
     * @since 0.1.0
     */
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

    /**
     * Adds class(es) to selected elements
     * 
     * @for Dom
     * @method addClass
     * @param {string|array} className The class(es) to add
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").addClass("paragraph")
     * </pre></div>
     * @since 0.1.0
     */
    addClass: function (className) {
      return this["class"]("add", className);
    },

    /**
     * Remove class(es) from selected elements
     * 
     * @for Dom
     * @method removeClass
     * @param classes {string|array} The class(es) to be removed
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p.hidden").removeClass("hidden")
     * </pre></div>
     * @since 0.1.0
     */
    removeClass: function (className) {
      return this["class"]("remove", className);
    },

    /**
     * Check for class(es) in selected elements
     * 
     * @for Dom
     * @method hasClass
     * @param {string|array} className The class(es) to be checked for existence
     * @return {Boolean}
     * @example
     * <div class="code"><pre class="prettyprint">
     * if(!$("audio:not([controls])").hasClass("hidden")) {
     *   $("audio:not([controls])").addClass("hidden");
     * }
     * </pre></div>
     * @since 0.1.0
     */
    hasClass: function (className) {
      return this["class"]("has", className);
    },

    /**
     * Add class(es) if not already, remove if added
     * 
     * @for Dom
     * @method toggleClass
     * @param {string|array} className The classes to be toggled
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $(".someClass").on("click", function () {
     *   $(this).toggleClass("opaque");
     * });
     * </pre></div>
     * @since 0.1.0
     */
    toggleClass: function (className) {
      return this["class"]("toggle", className);
    },
    
    /**
     * Set or return attributes
     * 
     * @for Dom
     * @method attr
     * @param {string} name Name of attribute
     * @param {string} val Value of the attribute
     * @return {string|void}
     * @example
     * <div class="code prettyprint">
     * $("p.hidden").attr("hidden"); 
     * $("div.edit").attr("contentEditable", "true"); 
     * $("body").attr("hilo", "0.1.0"); 
     * </div>
     * @since 0.1.0
     */
    attr: function (name, val) {
      if(val) {
        return this.each(function(el) {
          el.setAttribute(name, val);
        });
      } else {
        return this.first(function (el) {
          return el[name];
        });
      }
    }
  });
  
  // --------------------------------------------------
  // Hilo CSS
  // --------------------------------------------------

  extend(Dom.prototype, {

    /**
     * Set or return css property
     *
     * @for Dom
     * @method css
     * @param {string} prop Name of property
     * @param {string} value Value of property
     * @return {string|void}
     * @beta
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").css("marginLeft", "10em");
     * </pre></div>
     * @since 0.1.0
     */
    css: function (prop, value) {
      if (value) { // If value arg. is given
        return this.each(function (el) {
          el.style[prop] = value; // Set CSS prop. to value
        });
      } else { // Otherwise, if value arg. is not given
        return this.one(function (el) {
          return el.style[prop]; // Return the style of that element
        });
      }
    }
  });

  (function () {

    var cssObj = {}
      , impCss;

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
    
    for (_i = 0; _i < impCss.length; _i += 1) {
      cssObj[impCss[_i]] = function (val) {
        return this.css(impCss[_i], val);
      };
    }

    extend(Dom.prototype, cssObj);

  }());

  // Get computed style of the first element

  extend(Dom.prototype, {

    /**
     * Get computed property
     * 
     * @for Dom
     * @method computed
     * @param {string} prop Name of property
     * @return {number|boolean|string}
     * @beta
     * @since 0.1.0
     */
    computed: function (prop) {
      return this.one(function (el) {
        return win.getComputedStyle(el)[prop];
      });
    },

    outerWidth: function () {
      return parseFloat(this.computed("width")) + 
      parseFloat(this.computed("paddingLeft")) + 
      parseFloat(this.computed("paddingRight")) + 
      parseFloat(this.computed("borderLeft")) + 
      parseFloat(this.computed("borderRight")) + "px";
    },

    innerWidth: function () {
      return parseFloat(this.computed("width")) + 
      parseFloat(this.computed("paddingLeft")) + 
      parseFloat(this.computed("paddingRight")) + "px";
    },

    outerHeight: function () {
      return parseFloat(this.computed("height")) + 
      parseFloat(this.computed("paddingTop")) + 
      parseFloat(this.computed("paddingBottom")) + 
      parseFloat(this.computed("borderTop")) + 
      parseFloat(this.computed("borderBottom")) + "px";
    },

    innerHeight: function () {
      return parseFloat(this.computed("height")) + 
      parseFloat(this.computed("paddingTop")) + 
      parseFloat(this.computed("paddingBottom")) + "px";
    }
  });
  
  // --------------------------------------------------
  // DOM Extensions
  // --------------------------------------------------

  /**
   * Get a NodeList of selected elements
   * 
   * @for Dom
   * @method get
   * @return {Dom}
   * @example
   * <div class="code"><pre class="prettyprint">
   * $("script").get();
   * </pre></div>
   * @since 0.1.0
   */
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

  extend(Dom.prototype, {

    // -------------------------
    // .on()
    // -------------------------
    // 
    // Listen to an event and execute a function
    // when that event happens
    // 
    // .on( evt, fn )
    //   !evt (string) : The name of event
    //   fn (function) : Function to be executed when the event is fired
    //
    // Examples:
    // 
    // $("p.hidden").on("click", function () {
    //   $(this).show()
    // })
    //

    on: (function () {
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
    }()),

    // -------------------------
    // .off()
    // -------------------------
    // 
    // Stop listening to an event
    // 
    // .off( evt, fn )
    //   !evt (string) : The name of event
    //   fn (function) : The Event handler function
    //
    // Examples:
    // 
    // $("p").off("click", fn)
    //

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

    // -------------------------
    // .fire()
    // -------------------------
    // 
    // Trigger (or fire) an event
    // 
    // .fire( evt )
    //   !evt (string) : The name of event
    //
    // Examples:
    // 
    // $("p.hidden").fire("click")
    //

    fire: (function () {
      if (document.dispatchEvent) {
        return function (event) {
          var evt = document.createEvent("UIEvents");
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

  // --------------------------------------------------
  // Effects (fx)
  // --------------------------------------------------

  extend(Dom.prototype, {

    // -------------------------
    // .show()
    // -------------------------
    // 
    // Sets the display property of sel.els. to "" or given value
    // 
    // .show ( [display] ) 
    //   display (string) : Value of display prop.
    //
    // Example:
    // 
    // $("p").show();
    // 

    show: function (display) {
      display = display || "";

      return this.each(function (el) {
        el.style.display = display;
      });
    },

    // -------------------------
    // .hide()
    // -------------------------
    // 
    // Sets the display property of sel.els. to "none"
    // 
    // .hide () 
    //
    // Example:
    // 
    // $("p").hide();
    // 

    hide: function () {
      return this.each(function (el) {
        el.style.display = "none";
      });
    },

    // -------------------------
    // .toggle()
    // -------------------------
    // 
    // Shows hidden elements,
    // Hides visible elements
    // 
    // .toggle ( [display] ) 
    //   display (string) : Value of display prop.
    //
    // Example:
    // 
    // $("p").toggle();
    // 

    toggle: function (display) {
      return this.each(function (el) {
        if (el.style.display === "none") {
          el.style.display = display ? display : "";
        } else {
          el.style.display = "none";
        }
      });
    },

    // -------------------------
    // .appear()
    // -------------------------
    // 
    // Sets opacity to 1
    // 
    // .appear ()
    //
    // Example:
    // 
    // $("p").appear();
    // 

    appear: function () {
      return this.each(function (el) {
        el.style.opacity = "1";
      });
    },

    // -------------------------
    // .disappear()
    // -------------------------
    // 
    // Sets opacity to 0
    // 
    // .disappear () 
    //   display (string) : Value of display prop.
    //
    // Example:
    // 
    // $("p").disappear();
    // 

    disappear: function () {
      return this.each(function (el) {
        el.style.opacity = "0";
        el.style.cursor = "default";
      });
    },

    // -------------------------
    // .toggleVisibility()
    // -------------------------
    // 
    // appears a disappeared element,
    // disappears a appeared element
    // 
    // .toggleVisibility ()
    //
    // Example:
    // 
    // $("p").toggleVisibility();
    // 

    toggleVisibility: function () {
      return this.each(function (el) {
        if (el.style.opacity === "0") {
          el.style.opacity = "1";
        } else {
          el.style.opacity = "0";
          el.style.cursor = "default";
        }
      });
    },

    // -------------------------
    // .fade()
    // -------------------------
    // 
    // Animates opacity prop. from 0 to 1 or 1 to 0
    // 
    // .fade ( inOut [, timing] ) 
    //   !inOut (in|out) : Whether to fadeIn ("in") or fadeOut ("out")
    //   timing (number) : Rate of animation (the lesser, the faster)
    //
    // Example:
    // 
    // $("p").fade("in");
    // $("p").fade("out");
    // $("p").fade("in", 140);
    // $("p").fade("out", 100);
    // 

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
          var val = 0.3, end = 1;

          if (parseFloat(el.style.opacity) === (inOut === "in" ? 1 : 0)) {
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

    // -------------------------
    // .fadeIn()
    // -------------------------
    // 
    // Animates opacity prop. from 0 to 1
    // 
    // .fadeIn ( [timing] )
    //   timing (number) : Rate of animation (the lesser the faster; default:120)
    //
    // Examples:
    // 
    // $("p").fadeIn(200); // Slow
    // $("p").fadeIn(); // Normal
    // $("p").fadeIn(80); // Fast
    // 

    fadeIn: function (timing) {
      this.fade("in", timing);
    },

    // -------------------------
    // .fadeOut()
    // -------------------------
    // 
    // Animates opacity prop. from 1 to 0
    // 
    // .fadeOut ( [timing] )
    //   timing (number) : Rate of animation (the lesser, the faster)
    //
    // Examples:
    // 
    // $("p").fadeOut(200); // Slow
    // $("p").fadeOut(); // Normal
    // $("p").fadeOut(80); // Fast
    // 

    fadeOut: function (timing) {
      this.fade("out", timing);
    }
  });

  hilo.classify = function () {
    var html = win.Hilo("html")
      , classes = ["js"]
      , _i;

    html.removeClass("no-js");

    if (hilo.browser.chrome) {
      classes.push("chrome");
    } else if (hilo.browser.firefox) {
      classes.push("firefox");
    } else if (hilo.browser.safari) {
      classes.push("safari");
    } else if (hilo.browser.ie) {

      if (hilo.browser.ie <= 6) {
        classes.push("lte-ie6");

        if (hilo.browser.ie < 6) {
          classes.push("lt-ie6");
        }
      }

      if (hilo.browser.ie <= 7) {
        classes.push("lte-ie7");

        if (hilo.browser.ie < 7) {
          classes.push("lt-ie7");
        }
      }

      if (hilo.browser.ie <= 8) {
        classes.push("lte-ie8");

        if (hilo.browser.ie < 8) {
          classes.push("lt-ie8");
        }
      }

      if (hilo.browser.ie <= 9) {
        classes.push("lte-ie9");

        if (hilo.browser.ie < 9) {
          classes.push("lt-ie9");
        }
      }

      if (hilo.browser.ie <= 10) {
        classes.push("lte-ie10");

        if (hilo.browser.ie < 10) {
          classes.push("lt-ie10");
        }
      }

      if (hilo.browser.ie >= 6) {
        classes.push("gte-ie6");

        if (hilo.browser.version > 6) {
          classes.push("gt-ie6");
        }
      }

      if (hilo.browser.ie >= 7) {
        classes.push("gte-ie7");

        if (hilo.browser.version > 7) {
          classes.push("gt-ie7");
        }
      }

      if (hilo.browser.ie >= 8) {
        classes.push("gte-ie8");

        if (hilo.browser.version > 8) {
          classes.push("gt-ie8");
        }
      }

      if (hilo.browser.ie >= 9) {
        classes.push("gte-ie9");

        if (hilo.browser.version > 9) {
          classes.push("gt-ie9");
        }
      }

      if (hilo.browser.ie >= 10) {
        classes.push("gte-ie10");

        if (hilo.browser.version > 10) {
          classes.push("gt-ie10");
        }
      }

      if (hilo.browser.ie === 6) {
        classes.push("ie6");
      } else if (hilo.browser.ie === 7) {
        classes.push("ie7");
      } else if (hilo.browser.ie === 8) {
        classes.push("ie8");
      } else if (hilo.browser.ie === 9) {
        classes.push("ie9");
      } else if (hilo.browser.ie === 10) {
        classes.push("ie10");
      }

      classes.push("ie");
    } else if (hilo.browser.opera) {
      classes.push("opera");
    } else if (hilo.browser.konq) {
      classes.push("konqueror");
    }

    if (hilo.platform.win) {
      classes.push("windows");
    } else if (hilo.platform.mac) {
      classes.push("mac");
    } else if (hilo.platform.x11) {
      classes.push("linux");
    }

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

    html.addClass(classes);

    return classes;
  };
  
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

  extend(hilo, {
    keys: key
  });
  
  // --------------------------------------------------
  // Hilo Extension API
  // --------------------------------------------------
    
  extend(hilo, {
    Dom: Dom.prototype,
    Test: Test.prototype
  });
  
  // --------------------------------------------------
  // Set event handler for triggering DOM Evenets
  // --------------------------------------------------
  
  doc.onreadystatechange = function () {
    if (doc.readyState === "complete") {
      for (_i = 0; _i < callbacks.length; _i += 1) {
        callbacks[_i]();
      }
    }
  };

  win.$ = hilo; // Shorthand

  elapsed = new Date().getTime() - start;

  extend(hilo, {
    perf: elapsed
  });

  return hilo;
}));
