  /**
   * Changes id of selected els
   *
   * @method id
   * @param string id The id to be set
   * @return object
   */

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

  /**
   * Adds a class of selected els
   *
   * @method addClass
   * @param {String|Array} className The class name of list of class names
   * @return object
   */

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
  
  Dom.prototype.attr = function (name, val) {
    if(val) {
      this.each(function(el) {
        el.setAttribute(name, val);
      });

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el[name];
      });
    }
  };
