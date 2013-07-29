describe("HTML5", function () {
  it('Geolocation', function () {
    expect($.feature.geolocation).toEqual('geolocation' in window.navigator);
  });
  it('indexedDB', function () {
    expect($.feature.indexeddb).toEqual('indexedDB' in window && window['indexedDB'] !== undefined && !!(window.IDBTransaction && IDBKeyRange));
  });
  it('localStorage', function () {
    expect($.feature.localStorage).toEqual(!!window.localStorage);
  });
  it('WebWorkers', function () {
    expect($.feature.webWorkers).toEqual(!!window.Worker)
  });
  it('Application Cache (Offline Web)', function () {
    expect($.feature.applicationCache).toEqual(!!window.applicationCache);
  });

  describe('Input Types', function () {
    var i;
    beforeEach(function () {
      i = document.createElement('i');
    });

    it('color', function () {
      expect($.feature.input.type.color).toEqual((function () {
        i.setAttribute('type', 'color');
        return i.type !== 'text';
      }()));
    });
  });
});

describe("Multimedia", function () {
  it('Video', function () {
    expect($.feature.video).toEqual(!!document.createElement('video').canPlayType);
  });
  describe("Video Formats", function () {
    var v = document.createElement("video");

    it('h264', function () {
      expect($.feature.videoFormats.h264).toEqual(v.canPlayType("video/mp4; codecs='avc1.42E01E, mp4a.40.2'"));
    });
    it('webm', function () {
      expect($.feature.videoFormats.webm).toEqual(v.canPlayType("video/webm; codecs='vp8, vorbis'"));
    });
    it('ogg', function () {
      expect($.feature.videoFormats.ogg).toEqual(v.canPlayType("video/ogg; codecs='theora, vorbis'"));
    });
  });
});
