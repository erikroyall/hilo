
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
   * </pre></div>
   * <div class="code"><pre class="prettyprint">
   * new NumberObject(Math.PI);
   * </pre></div>
   * @since 0.1.0
   */
  function NumberObject (num) {
    this.num = num;
  }

  extend(NumberObject.prototype, {
    
    /**
     * NumberObject.MAX_INTEGER = 9007199254740991
     * The maximum value of a JavaScript integer
     * 
     * @for NumberObject
     * @property MAX_INTEGER
     * @type Number
     * @since 0.1.0
     */
    MAX_INTEGER: 9007199254740991,

    /**
     * Epsilon
     * 
     * @for NumberObject
     * @property EPSILON
     * @type Number
     * @since 0.1.0
     */
    EPSILON: 2.220446049250313e-16,

    /**
     * Parses integer value from a string or number
     * 
     * @for NumberObject
     * @method parseInt
     * @return {Number}
     * @example
     * <div class="code"><pre class="prettyprint">
     * new NumberObject(3.5).parseInt() // 3
     * </pre></div>
     * @since 0.1.0
     */
    parseInt: function () {
      parseInt.call(this, this.num);
    },

    /**
     * Parses float point number value from a string or number
     * 
     * @for NumberObject
     * @method parseFloat
     * @return {Number}
     * @example
     * <div class="code"><pre class="prettyprint">
     * new NumberObject("5.3").parseFloat() // 5.3
     * </pre></div>
     * @since 0.1.0
     */
    parseFloat: function () {
      parseFloat.call(this, this.num);
    },

    /**
     * Returns true if a number is a finite value
     * 
     * @for NumberObject
     * @method isFinite
     * @return {Bolean} Whether the number is finite
     * @example
     * <div class="code"><pre class="prettyprint">
     * new NumberObject(NaN).isFinite() // false
     * new NumberObject(3).isFinite() // true
     * </pre></div>
     * @since 0.1.0
     */
    isFinite: function() {
      return typeof this.num === 'number' && isFinite(this.num);
    },

    /**
     * If the number is an integer
     * 
     * @for NumberObject
     * @method isInteger
     * @return {Number} Whether the number is an integer
     * @example
     * <div class="code"><pre class="prettyprint">
     * new NumberObject(5.3).isInteger() // false
     * new NumberObject(4).isInteger() // true
     * </pre></div>
     * @since 0.1.0
     */
    isInteger: function() {
      return typeof this.num === 'number' &&
        !isNaN(this.num) &&
        isFinite(this.num) &&
        parseInt(this.num, 10) === this.num;
    },

    /**
     * Returns if the number is NaN (Not a number)
     * 
     * @for NumberObject
     * @method isNan
     * @return {Number} Whether the number is not a number (NaN)
     * @example
     * <div class="code"><pre class="prettyprint">
     * new NumberObject(5).isNan() // false
     * new NumberObject(NaN).isNan() // true
     * </pre></div>
     * @since 0.1.0
     */
    isNaN: function() {
      // NaN !== NaN, but they are identical.
      // NaNs are the only non-reflexive value, i.e., if x !== x,
      // then x is NaN.
      // isNaN is broken: it converts its argument to number, so
      // isNaN('foo') => true
      return this.num !== this.num;
    },

    /**
     * Converts ant value to an integer
     * 
     * @for NumberObject
     * @method toInteger
     * @return {Number} The converted integer
     * @example
     * <div class="code"><pre class="prettyprint">
     * new NumberObject(5).toInteger() // 5
     * new NumberObject(NaN).toInteger() // 0
     * </pre></div>
     * @since 0.1.0
     */
    toInteger: function() {
      var number = +this.num;
      if (isNaN(number)) {
        return 0;
      }

      if (number === 0 || !isFinite(number)) {
        return number;
      }
      
      return sign.call(this, number) * Math.floor(Math.abs(number));
    },

    sign: function (value) {
      sign.call(this, this.num, value);
    },

    /**
     * Call a function n times
     * 
     * @for NumberObject
     * @method times
     * @param {Function} fn The function to be called
     * @param {Array} args The arguments to be passed
     * @return {Number} The converted integer
     * @example
     * <div class="code"><pre class="prettyprint">
     * var i = 0;
     * new NumberObject(100).times(function () {
     *   console.log(i++);
     * });
     * </pre></div>
     * <div class="code"><pre class="prettyprint">
     * new NumberObject(100).times(function () {
     *   consolee.log
     * });
     * </pre></div>
     * @since 0.1.0
     */
    times: function (fn, args) {
      var _i = 0;

      while (_i < this.num) {
        fn.apply(this, args);
        _i += 1;
      }
    }
  });