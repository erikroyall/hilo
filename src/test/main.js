  
  // --------------------------------------------------
  // Testing
  // --------------------------------------------------

  hilo.test = function (con) {
    return new Test(con);
  };

  Test = function (con, neg) {
    this.con = con;
    if (neg) {
      this.neg = true;
    }
  };