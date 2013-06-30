
  // Classes and IDs

  Dom.prototype.id = function (id) {
    if(id) {
      this.each(function(el) {
        el.id = id;
      });

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el.id;
      });
    }
  };

  Dom.prototype.addClass = function (className) {
    this.each(function (el) {
      var _i, parts  = className.split(" ");

      if (typeof className === 'string') { // String
        if (parts.length === 1) {
          el.classList.add(className);
        } else {
          for (_i = 0; _i < parts.length; _i++) {
            el.classList.add(parts[_i]);
          }
        }
      } else if (className.length) { // An array
        for (_i = 0; _i < className.length; _i++) {
          el.classList.add(className[_i]);
        }
      }
    });
  };
  