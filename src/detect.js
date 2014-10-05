  
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