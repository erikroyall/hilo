  dom = function (els) {
    var _i;

    for (_i = 0; _i < els.length; _i+=1) {
      this[_i] = els[_i];
    }

    this.length = els.length;
  };
