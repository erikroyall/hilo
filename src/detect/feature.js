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