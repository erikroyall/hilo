  
  // Set or return id of first element

  Dom.prototype.id = function (id) {
    if(id) {

      // Setting id of only one element because
      // id is intended to be an unique identifier

      return this.one(function(el) {
        el.id = id;
      });
    } else {
      return this.one(function (el) {
        return el.id;
      });
    }
  };

  // Add class(es) to selected elements

  Dom.prototype.addClass = feature.classList === true ? function (className) {
    return this.each(function (el) {
      var _i, parts;

      if (typeof className === 'string') { // String
        parts = className.split(" ");

        if (parts.length === 1) { // One Class
          if (!el.classList.contains(className)) {
            el.classList.add(className);
          }
        } else { // Multiple classes
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

  // Remove class(es) from selected elements

  Dom.prototype.removeClass = feature.classList === true ? function (className) {
    this.each(function (el) {
      var _i, parts;
      if (typeof className === 'string') { // String
        parts = className.split(" ");

        if (parts.length === 1) {
          if (el.classList.contains(className)) {
            el.classList.remove(className);
          }
        } else {
          for (_i = 0; _i < parts.length; _i += 1) {
            if (el.classList.contains(parts[_i])) {
              el.classList.remove(parts[_i]);
            }
          }
        }
      } else if (className.length) { // An array
        for (_i = 0; _i < className.length; _i += 1) {
          if (el.classList.contains(className[_i])) {
            el.classList.remove(className[_i]);
          }
        }
      }
    });
  } : function (className) {
    return this.each(function (el) {
      var _i, parts;
      if (typeof className === 'string') {
        parts = className.split(" ");
        if (parts.length === 1) {
          el.className.replace(className, "");
        } else {
          for (_i = 0; _i < parts.length; _i += 1) {
            el.className.replace(parts[_i], "");
          }
        }
      } else if (className.length) {
        for (_i = 0; _i < className.length; _i += 1) {
          el.className.replace(className[_i], "");
        }
      }
    });
  };

  // Check if all selected elements has a class

  Dom.prototype.hasClass = feature.classList ? function (className) {
    this.one(function (el) {
      var _i, parts, res = [];
      if (typeof className === 'string') { // String
        parts = className.split(" ");

        if (parts.length === 1) {
          if (el.classList.contains(className)) {
            res = el.classList.has(className);
          }
        } else {
          for (_i = 0; _i < parts.length; _i += 1) {
            if (el.classList.contains(parts[_i])) {
              res = res.concat(el.classList.has(parts[_i]));
            }
          }
        }
      } else if (className.length) { // An array
        for (_i = 0; _i < className.length; _i += 1) {
          if (el.classList.contains(className[_i])) {
            res = res.concat(el.classList.has(className[_i]));
          }
        }
      }

      return typeof res === 'boolean' ? res : res.every(function (el) {
        return el === true;
      });
    });
  }: function (className) {
    return this.one(function (el) {
      var _i, parts, res;
      if (typeof className === 'string') {
        parts = className.split(" ");
        if (parts.length === 1) {
          return !!(el.className.indexOf(className));
        } else {
          for (_i = 0; _i < parts.length; _i += 1) {
            res = res.concat(el.className.indexOf(parts[_i]));
          }
        }
      } else if (className.length) {
        for (_i = 0; _i < className.length; _i += 1) {
          res = res.concat(el.className.indexOf(className[_i]));
        }
      }

      return res.every(function (el) {
        return el === true;
      });
    });
  };

  // Set or return attribute of elements
  
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