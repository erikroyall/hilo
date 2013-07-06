
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
      classList: (function () {
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
