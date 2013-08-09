  
  // --------------------------------------------------
  // Testing
  // --------------------------------------------------

  extend(hilo, {
    test: function (con) {
      return new Test(con);
    }
  });

  function Test (con, neg) {
    this.con = con;
    
    if (neg) {
      this.neg = true;
    }
  }