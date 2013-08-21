
  // --------------------------------------------------
  // Utilities
  // --------------------------------------------------

  var boxedString = Object("a")
    , splitString = boxedString[0] !== "a" || !(0 in boxedString);

  var toObject = function toObject (o) {
    if (typeof o === "undefined") { // this matches both null and undefined
      throw new TypeError("can't convert "+o+" to object");
    }

    return Object(o);
  };

  var toInteger = function toInteger (value) {
    var number = +value;

    if (Number.isNaN(number)) {
      return 0;
    }

    if (number === 0 || !isFinite(number)) {
      return number;
    }

    return sign(number) * Math.floor(Math.abs(number));
  };

  var isPrimitive = function isPrimitive(input) {
    var type = typeof input;
    
    return (
      input === null ||
      type === "undefined" ||
      type === "boolean" ||
      type === "number" ||
      type === "string"
    );
  };

  var toPrimitive = function toPrimitive (input) {
    var val, valueOf, toString;

    if (isPrimitive(input)) {
      return input;
    }

    valueOf = input.valueOf;

    if (typeof valueOf === "function") {
      val = valueOf.call(input);

      if (isPrimitive(val)) {
        return val;
      }
    }
    toString = input.toString;
    
    if (typeof toString === "function") {
      val = toString.call(input);

      if (isPrimitive(val)) {
        return val;
      }
    }

    throw new TypeError();
  };

  var sign = function sign(value) {
    var number = +value;

    if (number === 0) {
      return number;
    }

    if (Number.isNaN(number)) {
      return number;
    }

    return number < 0 ? -1 : 1;
  };

  // --------------------------------------------------
  // Array Utilities
  // --------------------------------------------------

  // Executes a function on each of the element
  // in the array
  var each = function each (arr, fn, thisRef) {
    var _i, _l;

    // Use Array.prototype.forEach if available
    if (Array.prototype.forEach) {
      return Array.prototype.forEach.call(arr, fn);
    }

    // Throw an error if array and function are not provided
    if (!(arr && fn)) {
      throw new Error (
        "Not enough arguments provided for each()"
      );
    }

    // Make the this variable the array itself if not provided
    thisRef = thisRef || arr;

    for (_i = 0, _l = arr.length; _i < _l; _i += 1) {
      fn.call(thisRef, arr[_i]);
    }
  };

  // Iterate over an object and execute a function on each 'value'
  // of it
  var forIn = function forIn (obj, fn, thisRef) {
    var _i;

    // Throw an error if object and function are not provided
    if (!(obj && fn)) {
      throw new Error (
        "Not enough arguments provided for forIn()"
      );
    }

    // Make the given object as the `this` value if one is not provided
    thisRef = thisRef || obj;

    for (_i in obj) {
      if (own(obj, _i)) {
        fn.call(thisRef, _i);
      }
    }
  };

  // Append all the properties of the second object to the first
  var extend = function extend (obj, ext) {
    var _i;

    // Throw an error if object and extension are not provided
    if (!(obj && ext)) {
      throw new Error (
        "Not enough arguments provided for extend()"
      );
    }

    for (_i in ext) {
      if (own(ext, _i)) {
        obj[_i] = ext[_i];
      }
    }

    return obj;
  };

  // Check if every element in the object passes the test
  var every = function every (o, fun) {
    var t, len, thisp, _i;

    if (o === null) {
      throw new TypeError();
    }

    t = Object(o);
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

  // --------------------------------------------------
  // String Utilities
  // --------------------------------------------------

  // Remove whitespace at the start and end of a string
  var trim = function trim (str) {
    var ws = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003" + 
             "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028" + 
             "\u2029\uFEFF";

    ws = "[" + ws + "]";

    var trimBeginRegexp = new RegExp("^" + ws + ws + "*"),
      trimEndRegexp = new RegExp(ws + ws + "*$");

    if (str === void 0 || str === null) {
      throw new TypeError("can't convert "+ str +" to object");
    }

    return String(str).replace(trimBeginRegexp, "").replace(trimEndRegexp, "");
  };

  // Check if a string contains another string in it
  var contains = function contains (haystack, needle) {
    var position = arguments[1];

    return haystack.indexOf(needle, position) !== -1;
  };

  var indexOf = function indexOf(arr, sought /*, fromIndex */ ) {
    var self = splitString && arr.toString() === "[object String]" ?
            this.split("") :
            toObject(this)
      , length = self.length >>> 0;

    if (!length) {
        return -1;
    }

    var i = 0;

    if (arguments.length > 1) {
        i = toInteger(arguments[1]);
    }

    // handle negative indices
    i = i >= 0 ? i : Math.max(0, length + i);

    for (; i < length; i++) {
        if (i in self && self[i] === sought) {
            return i;
        }
    }
    return -1;
  };