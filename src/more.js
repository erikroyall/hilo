
  // --------------------------------------------------
  // More Functionality
  // --------------------------------------------------

  /**
   * NumberObject Class
   * 
   * @constructor
   * @class NumberObject
   * @param {Number} num Number
   * @example
   * <div class="code"><pre class="prettyprint">
   * new NumberObject(2);
   * new NumberObject(Math.PI);
   * </pre></div>
   * @since 0.1.0
   */
  function NumberObject (num) {
    this.num = num;
  }

  extend(NumberObject.prototype, {
    MAX_INTEGER: 9007199254740991,
    EPSILON: 2.220446049250313e-16,

    parseInt: function () {
      parseInt.call(this, this.num);
    },

    parseFloat: function () {
      parseFloat.call(this, this.num);
    },

    isFinite: function() {
      return typeof this.num === 'number' && isFinite(this.num);
    },

    isInteger: function() {
      return typeof this.num === 'number' &&
        !isNaN(this.num) &&
        isFinite(this.num) &&
        parseInt(this.num, 10) === this.num;
    },

    isNaN: function() {
      // NaN !== NaN, but they are identical.
      // NaNs are the only non-reflexive value, i.e., if x !== x,
      // then x is NaN.
      // isNaN is broken: it converts its argument to number, so
      // isNaN('foo') => true
      return this.num !== this.num;
    },

    toInteger: function() {
      var number = +this.num;
      if (isNaN(number)) {
        return 0;
      }

      if (number === 0 || !isFinite(number)) {
        return number;
      }
      
      return Math.sign(number) * Math.floor(Math.abs(number));
    },

    sign: function (value) {
      sign.call(this, this.num, value);
    },

    times: function (fn, args) {
      var _i = 0;

      while (_i < this.num) {
        fn.apply(this, args);
        _i += 1;
      }
    }
  });