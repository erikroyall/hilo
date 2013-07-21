  // --------------------------------------------------
  // Feature Detection
  // --------------------------------------------------

  feature = (function () {
    var c = document.createElement
      , i = c("input")
      , is = i.setAttribute
      , ad = c("audio")
      , p = c("p")
      , v = c("video");

    return {
      applicationcache: (function () {
        return !!win.applicationCache;
      }()),
      audiopreload: (function () {
        return 'preload' in ad;
      }()),
      canvas: (function () {
        return !!c('canvas').getContext;
      }()),
      classList: (function () {
        return 'classList' in p;
      }()),
      es6: (function () {
        return typeof String.prototype.contains === 'function';
      }()),
      geolocation: (function () {
        return 'geolocation' in win.navigator;
      }()),
      history: (function () {
        return !!(win.history && history.pushState);
      }()),
      indexeddb: (function () {
        return !!(win.indexedDB && win.IDBKeyRange && win.IDBTransaction);
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
      localstorage: (function () {
        try {
          return 'localStorage' in win && win['localStorage'] !== null && !!win.localStorage.setItem;
        } catch(e){
          return false;
        }
      }()),
      microdata: (function () {
        return 'getItems' in document;
      }()),
      template: (function () {
        return 'content' in c('template');
      }()),
      video: (function () {
        try {
          return !!v.canPlayType;
        } catch (e) {
          return false;
        }
      }()),
      h264: (function () {
        try {
          return v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
        } catch (e) {
          return false;
        }
      }()),
      webm: (function () {
        try {
          return v.canPlayType('video/webm; codecs="vp8, vorbis"');
        } catch (e) {
          return false;
        }
      }()),
      ogg: (function () {
        try {
          return v.canPlayType('video/ogg; codecs="theora, vorbis"');
        } catch (e) {
          return false;
        }
      }()),
      webaudio: (function () {
        return !!(win.webkitAudioContext || win.AudioContext);
      }()),
      webworkers: (function () {
        return !!win.Worker;
      }())
    };
  }());

  hilo.feature = feature;