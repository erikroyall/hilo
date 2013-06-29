
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
