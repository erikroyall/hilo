  /**
   * Test API
   *
   * @method test
   * @param any con The whatever to be testes
   * @return object
   */

  hilo.test = function (con) {
    return new Test(con);
  };

  /**
   * Main Test Class
   *
   * @class Test
   * @constructor
   * @param any con The whatever to be tested
   * @param boolean neg To negate
   * @return void
   */

  Test = function (con, neg) {
    this.con = con;
    if (neg) {
      this.neg = true;
    }
  };
