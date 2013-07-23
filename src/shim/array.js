
  /*!
   * ES5 Shims, adopted from ES5 Shim (MIT)
   * http://es5.github.com/
   */

  // --------------------------------------------------
  // Array Object Shims
  // --------------------------------------------------

  // http://es5.github.com/#x15.4.4.20

  if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp */) {
      var t, len, res, thisp, i, val;

      if (this.length === 0) {
        throw new TypeError();
      }

      t = Object(this);
      len = t.length >>> 0;

      if (typeof fun !== "function") {
        throw new TypeError();
      }

      res = [];
      thisp = arguments[1];

      for (i = 0; i < len; i++) {
        if (i in t) {
          val = t[i]; // in case fun mutates this
          if (fun.call(thisp, val, i, t)) {
            res.push(val);
          }
        }
      }

      return res;
    };
  }

  // http://es5.github.com/#x15.4.4.18

  if ( !Array.prototype.forEach ) {
    Array.prototype.forEach = function( callback, thisArg ) {
      var T, k, O, len, kValue;

      if (this.length === 0) {
        throw new TypeError( " this is null or not defined" );
      }

      O = Object(this);

      len = O.length >>> 0; // Hack to convert O.length to a UInt32

      if ( {}.toString.call(callback) !== "[object Function]" ) {
        throw new TypeError( callback + " is not a function" );
      }

      if (thisArg) {
        T = thisArg;
      }

      k = 0;

      while(k < len) {
        if (k in O) {
          kValue = O[k];
          callback.call(T, kValue, k, O);
        }
        k++;
      }
    };
  }

  // http://es5.github.com/#x15.4.4.14

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
      var t, len, n, k;

      if (this.length === 0) {
        throw new TypeError();
      }

      t = Object(this);
      len = t.length >>> 0;

      if (len === 0) {
        return -1;
      }

      n = 0;
      
      if (arguments.length > 0) {
        n = Number(arguments[1]);
        if (n !== n) { // shortcut for verifying if it's NaN
          n = 0;
        } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }
      
      if (n >= len) {
        return -1;
      }
      
      k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
      
      for (; k < len; k++) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }
      
      return -1;
    };
  }

  // http://es5.github.com/#x15.4.3.2

  if(!Array.isArray) {
    Array.isArray = function (arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }

  // http://es5.github.com/#x15.4.4.19

  if (!Array.prototype.map) {
    Array.prototype.map = function(callback, thisArg) {
      var T, A, k, O, len, kValue, mappedValue;

      if (this.length === 0) {
        throw new TypeError(" this is null or not defined");
      }

      O = Object(this);
      len = O.length >>> 0;

      if ({}.toString.call(callback) !== "[object Function]") {
        throw new TypeError(callback + " is not a function");
      }

      if (thisArg) {
        T = thisArg;
      }

      A = new Array(len);
      k = 0;

      while(k < len) {
        if (k in O) {
          kValue = O[ k ];
          mappedValue = callback.call(T, kValue, k, O);
          A[ k ] = mappedValue;
        }
        k++;
      }

      return A;
    };      
  }
