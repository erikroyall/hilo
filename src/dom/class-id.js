  /**
   * Changes id of selected els
   *
   * @method id
   * @param string id The id to be set
   * @return object
   */

  Dom.prototype.id = function (id) {
    if(id) {
      return this.each(function(el) {
        el.id = id;
      });
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

  Dom.prototype.addClass = feature.classList === true ? function (className) {
    return this.each(function (el) {
    console.log('classList');
      var _i, parts;

      if (typeof className === 'string') { // String
        parts = className.split(" ");

        if (parts.length === 1) {
          if (!el.classList.contains(className)) {
            el.classList.add(className);
          }
        } else {
          for (_i = 0; _i < parts.length; _i += 1) {
            if (!el.classList.contains(parts[_i])) {
              el.classList.add(parts[_i]);
            }
          }
        }
      } else if (className.length) { // An array
        for (_i = 0; _i < className.length; _i += 1) {
          if (!el.classList.contains(className[_i])) {
            el.classList.add(className[_i]);
          }
        }
      }
    });
  } :
  function (className) {
    return this.each(function (el) {
    console.log('className');
      var _i, parts;

      if (typeof className === 'string') {
        parts = className.split(" ");
        if (parts.length === 1) {
          if (el.className === '') {
            el.className = className;
          } else {
            el.className += ' ' + className;
          }
        } else {
          for (_i = 0; _i < parts.length; _i += 1) {
            el.className += ' ' + parts[_i];
          }
        }
      } else if (className.length) {
        if (className.length > 1) {
          for (_i = 0; _i < className.length; _i += 1) {
            el.className += ' ' + className[_i];
          }
        } else {
          for (_i = 0; _i < className.length; _i += 1) {
            el.className += className[_i];
          }
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
