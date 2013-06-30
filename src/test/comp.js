  /**
   * Tests if Equal to
   *
   * @method ifEquals
   * @param any tw Comparative
   * @return boolean If Equal
   */

  Test.prototype.ifEquals = function (tw) {
    var val = this.con === tw;
    return this.neg ? !val : val;
  };

  /**
   * Tests if contains
   *
   * @method ifContains
   * @param any tw Comparative
   * @return boolean if contains
   */

  Test.prototype.ifContains = function (tw) {
    var ifString = this.con.split(tw).length === 1 ? false : true;
    if (typeof tw === 'string' && typeof this.con === 'object' && this.con.length) {

    } else if (typeof tw === 'string' && typeof this.con === 'string') {
      return this.neg ? !ifString : ifString;
    }
  };

  /**
   * Tests if it is the same object
   *
   * @method ifIs
   * @param any tw Comparative
   * @return boolean If it is
   */
  
  Test.prototype.ifIs = function (tw) {
    var val = this.con === tw;
    return this.neg ? !val : val;
  };
