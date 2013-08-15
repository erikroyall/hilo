  
  function each (arr, fn, thisRef) {
    var _i, _l;

    if (!(arr && fn)) {
      return;
    }

    thisRef = thisRef || arr;

    if (Array.prototype.forEach) {
      return Array.prototype.forEach.call(arr, fn);
    }

    for (_i = 0, _l = arr.length; _i < _l; _i += 1) {
      fn.call(thisRef, arr[_i]);
    }
  }

  function forIn (obj, fn, thisRef) {
    var _i;

    if (!(obj && fn)) {
      return;
    }

    thisRef = thisRef || obj;

    for (_i in obj) {
      if (own(obj, _i)) {
        fn.call(thisRef, _i);
      }
    }
  }

  function extend (obj, ext) {
    var _i;

    for (_i in ext) {
      if (ext.hasOwnProperty(_i)) {
        obj[_i] = ext[_i];
      }
    }

    return obj;
  }