  
  // --------------------------------------------------
  // Feature Detection
  // --------------------------------------------------

  /**
   * Detected Features
   * 
   * @static
   * @class feature
   * @for hilo
   * @since 0.1.0
   */
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

      /**
       * addEventListener
       * 
       * @for feature
       * @property addEventListener
       * @type {boolean}
       * @since 0.1.0
       */
      addEventListener: (function () {
        return typeof win.addEventListener === "function";
      }()),

      // Application Cache (or Offline Web Apps)

      /**
       * Application Cache
       * 
       * @for feature
       * @property applicationCache
       * @type {boolean}
       * @since 0.1.0
       */      
      applicationCache: (function () {
        return !!win.applicationCache;
      }()),

      // Audio (tag)

      /**
       * Audio (tag)
       * 
       * @for feature
       * @property audio
       * @type {boolean}
       * @since 0.1.0
       */      
      audio: (function () {
        return !!a.canPlayType;
      }()),

      // Preload audio (hmm.. background music?)

      /**
       * Preload audio (hmm.. background music)
       * 
       * @for feature
       * @property audioPreload
       * @type {boolean}
       * @since 0.1.0
       */      
      audioPreload: (function () {
        return "preload" in a;
      }()),

      // Audio Types

      /**
       * Audio Types
       * 
       * @for feature
       * @static
       * @class audioType
       * @since 0.1.0
       */      
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

      /**
       * Canvas API
       * 
       * @for feature
       * @property canvas
       * @type {boolean}
       * @since 0.1.0
       */      
      canvas: (function () {
        return !!cn.getContext;
      }()),

      // Canvas Text

      /**
       * Canvas Text
       * 
       * @for feature
       * @property canvasText
       * @type {boolean}
       * @since 0.1.0
       */      
      canvasText: (function () {
        return !!cn.getContext && typeof cn.getContext("2d").fillText === "function";
      }()),

      // classList prop. in HTMLElement

      /**
       * HTMLElement.classList
       * 
       * @for feature
       * @property classList
       * @type {boolean}
       * @since 0.1.0
       */      
      classList: (function () {
        return "classList" in s;
      }()),

      // Command

      /**
       * <command>
       * 
       * @for feature
       * @property commans
       * @type {boolean}
       * @since 0.1.0
       */      
      command: (function () {
        return "type" in c("command");
      }()),

      // Form Constraint Validation

      /**
       * Form Constraint Validation
       * 
       * @for feature
       * @property consval
       * @type {boolean}
       * @since 0.1.0
       */      
      consval: (function () {
        return "noValidate" in c("form");
      }()),

      // contentEditable attribute

      /**
       * contentEditable attribute
       * 
       * @for feature
       * @property contentEditable
       * @type {boolean}
       * @since 0.1.0
       */      
      contentEditable: (function () {
        return "isContentEditable" in s;
      }()),

      // Datalist (tag)

      /**
       * HTMLElement.datalist
       * 
       * @for feature
       * @property datalist
       * @type {boolean}
       * @since 0.1.0
       */      
      datalist: (function () {
        return "options" in c("datalist");
      }()),

      // Details (tag)

      /**
       * <details>
       * 
       * @for feature
       * @property details
       * @type {boolean}
       * @since 0.1.0
       */      
      details: (function () {
        return "open" in c("details");
      }()),

      // Drag & Drop

      /**
       * Drag & Drop
       * 
       * @for feature
       * @property dragdrop
       * @type {boolean}
       * @since 0.1.0
       */      
      dragdrop: (function () {
        return "draggable" in s;
      }()),

      // ECMAScript 6

      /**
       * ECMAScript 6
       * 
       * @for feature
       * @property es6
       * @type {boolean}
       * @since 0.1.0
       */      
      es6: (function () {
        return typeof String.prototype.contains === "function";
      }()),

      // File system API

      /**
       * File System API
       * 
       * @for feature
       * @property fileapi
       * @type {boolean}
       * @since 0.1.0
       */      
      fileapi: (function () {
        return typeof FileReader !== "undefined";
      }()),

      // 5th Generation Rendering Engine

      /**
       * 5th Generation Rendering Engine
       * 
       * @for feature
       * @property gen5
       * @type {boolean}
       * @since 0.1.0
       */      
      gen5: (function () {
        return parseInt(win.navigator.appVersion, 10) === 5;
      }()),

      // Geolocation

      /**
       * Geolocation
       * 
       * @for feature
       * @property geolocation
       * @type {boolean}
       * @since 0.1.0
       */      
      geolocation: (function () {
        return "geolocation" in win.navigator;
      }()),

      // window.getSelection() method

      /**
       * window.getSelection() method
       * 
       * @for feature
       * @property getSelection
       * @type {boolean}
       * @since 0.1.0
       */
      getSelection: (function () {
        return typeof win.getSelection === "function";
      }()),

      // History API

      /**
       * History API
       * 
       * @for feature
       * @property history
       * @type {boolean}
       * @since 0.1.0
       */      
      history: (function () {
        return !!(win.history && history.pushState);
      }()),

      // IFrame

      /**
       * addEventListener
       * 
       * @for feature
       * @static
       * @class iframe
       * @since 0.1.0
       */      
      iframe: {
        sandbox: (function () {
          return "sandbox" in fr;
        }()),
        srdoc: (function () {
          return "srcdoc" in fr;
        }())
      },

      // IndexedDB (use this instead of WebSQL)

      /**
       * IndexedDB (use this instead of WebSQL)
       * 
       * @for feature
       * @property indexeddb
       * @type {boolean}
       * @since 0.1.0
       */      
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

      /**
       * Local Storage
       * 
       * @for feature
       * @property localStorage
       * @type {boolean}
       * @since 0.1.0
       */      
      localStorage: (function () {
        try {
          return "localStorage" in win && win["localStorage"] !== null && !!win.localStorage.setItem;
        } catch(e){
          return false;
        }
      }()),

      // Meter (tag)

      /**
       * <meter>
       * 
       * @for feature
       * @property meter
       * @type {boolean}
       * @since 0.1.0
       */      
      meter: (function () {
        return "value" in c("meter");
      }()),

      // Microdata

      /**
       * Microdata
       * 
       * @for feature
       * @property microdata
       * @type {boolean}
       * @since 0.1.0
       */      
      microdata: (function () {
        return "getItems" in doc;
      }()),

      // Offline (App Cache)

      /**
       * Offline (App Cache)
       * 
       * @for feature
       * @property offline
       * @type {boolean}
       * @since 0.1.0
       */      
      offline: (function () {
        return !!win.applicationCache;
      }()),

      // Output (tag)

      /**
       * <output>
       * 
       * @for feature
       * @property output
       * @type {boolean}
       * @since 0.1.0
       */      
      output: (function () {
        return "value" in c("output");
      }()),

      // Progress (tag)

      /**
       * <progress>
       * 
       * @for feature
       * @property progress
       * @type {boolean}
       * @since 0.1.0
       */
      progress: (function () {
        return "value" in c("progress");
      }()),

      // querySelector & querySelectorAll

      /**
       * querySelector & querySelectorAll
       * 
       * @for feature
       * @property qsa
       * @type {boolean}
       * @since 0.1.0
       */
      qsa: (function () {
        return "querySelector" in doc && "querySelectorAll" in doc;
      }()),

      // CSS3 Selectors in querySelectorAll

      /**
       * CSS3 Selectors in querySelectorAll
       * 
       * @for feature
       * @property qsa3
       * @type {boolean}
       * @since 0.1.0
       */
      qsa3: (function () {
        try {
          return doc.querySelectorAll(":root").length > 0;
        } catch (e) {
          return false;
        }
      }()),

      // requestAnimationFrame

      /**
       * requestAnimationFrame
       * 
       * @for feature
       * @property requestAnimationFrame
       * @type {String|Boolean}
       * @since 0.1.0
       */
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

      /**
       * Server-sent Events
       * 
       * @for feature
       * @property serverEvt
       * @type {boolean}
       * @since 0.1.0
       */
      serverEvt: (function () {
        return typeof EventSource !== "undefined";
      }()),

      // Session Storage

      /**
       * Session Storage
       * 
       * @for feature
       * @property sessionStorage
       * @type {boolean}
       * @since 0.1.0
       */
      sessionStorage: (function () {
        try {
          return "sessionStorage" in win && win["sessionStorage"] !== null;
        } catch(e) {
          return false;
        }
      }()),

      // Modal Dialog (showModalDialog)

      /**
       * Modal Dialog (showModalDialog)
       * 
       * @for feature
       * @property showModalDialog
       * @type {boolean}
       * @since 0.1.0
       */
      showModalDialog: (function () {
        return typeof win.showModalDialog === "function";
      }()),

      // SVG (Scalable Vector Graphics)

      /**
       * SVG (Scalable Vector Graphics)
       * 
       * @for feature
       * @property svg
       * @type {boolean}
       * @since 0.1.0
       */
      svg: (function () {
        return !!(doc.createElementNS && doc.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);
      }()),

      // SVG in text/html

      /**
       * SVG in text/html
       * 
       * @for feature
       * @property svginhtml
       * @type {boolean}
       * @since 0.1.0
       */
      svginhtml:(function () {
        d.innerHTML = "<svg></svg>";
        return !!(win.SVGSVGElement && d.firstChild instanceof win.SVGSVGElement);
      }()),

      // Template (tag)

      /**
       * <template>
       * 
       * @for feature
       * @property template
       * @type {boolean}
       * @since 0.1.0
       */
      template: (function () {
        return "content" in c("template");
      }()),

      // Time (tag)

      /**
       * <time>
       * 
       * @for feature
       * @property time
       * @type {boolean}
       * @since 0.1.0
       */
      time: (function () {
        return "datetime" in c("time");
      }()),

      // Undo (not just Ctrl + Z)

      /**
       * Undo (not just Ctrl + Z)
       * 
       * @for feature
       * @property undo
       * @type {boolean}
       * @since 0.1.0
       */
      undo: (function () {
        return typeof UndoManager !== "undefined";
      }()),

      // Video

      /**
       * Video
       * 
       * @for feature
       * @property video
       * @type {boolean}
       * @since 0.1.0
       */
      video: (function () {
        try {
          return !!v.canPlayType;
        } catch (e) {
          return false;
        }
      }()),

      // Video Captions

      /**
       * Video Captions
       * 
       * @for feature
       * @property videoCaptions
       * @type {boolean}
       * @since 0.1.0
       */
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

      /**
       * Video Poster
       * 
       * @for feature
       * @property videoPoster
       * @type {boolean}
       * @since 0.1.0
       */
      videoPoster: (function () {
        return "poster" in c("video");
      }()),

      // Web Audio API (NOT the <audio> tag)

      /**
       * Web Audio API (NOT the <audio> tag)
       * 
       * @for feature
       * @property webAudio
       * @type {String|Boolean}
       * @since 0.1.0
       */
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

      /**
       * WebSockets
       * 
       * @for feature
       * @property webSockets
       * @type {boolean}
       * @since 0.1.0
       */
      webSockets: (function () {
        return !!win.webSocket;
      }()),

      // WebSQL (a deprecated specification; use IndexedDB instead)

      /**
       * WebSQL (a deprecated specification; use IndexedDB instead)
       * 
       * @for feature
       * @property websql
       * @type {boolean}
       * @since 0.1.0
       */
      websql: (function () {
        return !!win.openDatabase;
      }()),

      // Web Workers

      /**
       * Web Workers
       * 
       * @for feature
       * @property webWorkers
       * @type {boolean}
       * @since 0.1.0
       */
      webWorkers: (function () {
        return !!win.Worker;
      }()),

      // Widgets

      /**
       * Widgets
       * 
       * @for feature
       * @property widgets
       * @type {boolean}
       * @since 0.1.0
       */
      widgets: (function () {
        return typeof widget !== "undefined";
      }()),

      // Cross-document messaging

      /**
       * Cross-document messages
       * 
       * @for feature
       * @property xdocmsg
       * @type {boolean}
       * @since 0.1.0
       */
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