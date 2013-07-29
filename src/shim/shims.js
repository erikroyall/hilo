  
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