  
  // --------------------------------------------------
  // Classes and IDs
  // --------------------------------------------------

  // -------------------------
  // .id()
  // -------------------------
  // 
  // Set or return id attribute of selected elements
  // 
  // .get()
  //
  // Examples:
  // 
  // $("p.rect").first().id("square")
  // 

  Dom.prototype.id = function (id) {
    if(id) {

      // Setting id of only one element because
      // id is intended to be an unique identifier

      return this.first(function(el) {
        el.id = id;
      });
    } else {
      return this.first(function (el) {
        return el.id;
      });
    }
  };

  // -------------------------
  // .class()
  // -------------------------
  // 
  // Add, remove or check classes of selected elements
  // based on action given
  // 
  // .class( action, className )
  //   action (string) : add, remove or has
  //   className (string|array) : class name or list of class names
  //
  // Examples:
  // 
  // $("div#editor").parent().hide()
  //

  Dom.prototype["class"] = feature.classList === true ? function (action, className) {
    return this.each(function (el) {
      var _i, parts, contains, res = [];

      if (typeof className === "string") { // A String
        parts = className.split(" ");

        if (parts.length === 1) { // String, one class
          contains = el.classList.contains(className);

          switch (action) {
            case "add":
              if (!contains) {
                el.classList.add(className);
              }

              break;
            case "remove":
              if (contains) {
                el.classList.remove(className);
              }

              break;
            case "has":
              res = true;
              break;
            case "toggle":
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains) {
                  el.classList.remove(parts[_i]);
                } else {
                  el.classList.add(parts[_i]);
                }
              }
              break;
            default:
              throw new TypeError("Unknown value provided as first parameter to .class()");
          }
        } else { // String, many classes
          contains = function (className) {
            return el.classList.contains(className);
          };

          switch (action) {
            case "add":
              for (_i = 0; _i < parts.length; _i += 1) {
                if (!contains(parts[_i])) {
                  el.classList.add(parts[_i]);
                }
              }

              break;
            case "remove":
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.classList.remove(parts[_i]);
                }
              }

              break;
            case "has":
              for (_i = 0; _i < parts.length; _i += 1) {
                res.push(contains(parts[_i]));
              }

              break;
            case "toggle":
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.classList.remove(parts[_i]);
                } else {
                  el.classList.add(parts[_i]);
                }
              }
              break;
            default:
              throw new TypeError("Unknown value provided as first parameter to .class()");
          }
        }
      } else if (className.length) { // Array
        parts = className;

        contains = function (className) {
          return el.classList.contains(className);
        };

        switch (action) {
          case "add":
            for (_i = 0; _i < parts.length; _i += 1) {
              if (!contains(parts[_i])) {
                el.classList.add(parts[_i]);
              }
            }

            break;
          case "remove":
            for (_i = 0; _i < parts.length; _i += 1) {
              if (contains(parts[_i])) {
                el.classList.remove(parts[_i]);
              }
            }

            break;
          case "has":
            for (_i = 0; _i < parts.length; _i += 1) {
              res.push(contains(parts[_i]));
            }

            break;
          case "toggle":
            for (_i = 0; _i < parts.length; _i += 1) {
              if (contains(parts[_i])) {
                el.classList.remove(parts[_i]);
              } else {
                el.classList.add(parts[_i]);
              }
            }
            
            break;
          default:
            throw new TypeError("Unknown value provided as first parameter to .class()");
        }
      } else {
        throw new TypeError ("Please provide the right parameter (string or array) for .class()");
      }

      return typeof res === "boolean" ? res : res.every(function (el) {
        return el === true;
      });
    });
  } : function (action, className) {
    return this.each(function (el) {
      var _i, parts, contains, res = [];

      if (typeof className === "string") {
        parts = className.split(" ");

        if (parts.length === 1) {
          contains = el.className.split(className).length > 1;

          switch (action) {
            case "add":
              if (!contains) {
                el.className += (className);
              }

              break;
            case "remove":
              if (contains) {
                el.className.replace(className, "");
              }

              break;
            case "has":
              res = contains;
              
              break;
            case "toggle":
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains) {
                  el.className.replace(className, "");
                } else {
                  el.className += className;
                }
              }

              break;
            default:
              throw new TypeError("Unknown value provided as first parameter to .class()");
          }
        } else {
          contains = function (className) {
            return el.className.split(className).length > 1;
          };

          switch (action) {
            case "add":
              for (_i = 0; _i < parts.length; _i += 1) {
                if (!contains(parts[_i])) {
                  el.className += parts[_i];
                }
              }

              break;
            case "remove":
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.className.replace(parts[_i], "");
                }
              }

              break;
            case "has":
              for (_i = 0; _i < parts.length; _i += 1) {
                res.push(contains(parts[_i]));
              }

              break;
            case "toggle":
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.className.replace(parts[_i], "");
                } else {
                  el.className += parts[_i];
                }
              }

              break;
            default:
              throw new TypeError("Unknown value provided as first parameter to .class()");
          }
        }
      } else if (className.length) {
        parts = className;
        
        contains = function (className) {
          return el.className.split(className).length > 1;
        };

        switch (action) {
          case "add":
            for (_i = 0; _i < parts.length; _i += 1) {
              if (!contains(parts[_i])) {
                el.className += parts[_i];
              }
            }

            break;
          case "remove":
            for (_i = 0; _i < parts.length; _i += 1) {
              if (contains(parts[_i])) {
                el.className.replace(parts[_i], "");
              }
            }

            break;
          case "has":
            for (_i = 0; _i < parts.length; _i += 1) {
              res.push(contains(parts[_i]));
            }

            break;
          case "toggle":
            for (_i = 0; _i < parts.length; _i += 1) {
              if (contains(parts[_i])) {
                el.className.replace(parts[_i], "");
              } else {
                el.className += parts[_i];
              }
            }

            break;
          default:
            throw new TypeError("Unknown value provided as first parameter to .class()");
        }
      } else {
        throw new TypeError ("Please provide the right parameter (string or array) for .class()");
      }

      return typeof res === "boolean" ? res : res.every(function (el) {
        return el === true;
      });
    });
  };

  // -------------------------
  // .addClass()
  // -------------------------
  // 
  // Add class(es) to selected elements
  // 
  // .addClass( className )
  //   className (string|array) : The class(es to be added)
  //
  // Examples:
  // 
  // $("p").addClass("paragraph")
  // 

  Dom.prototype.addClass = function (className) {
    return this["class"]("add", className);
  };

  // -------------------------
  // .removeClass()
  // -------------------------
  // 
  // Remove class(es) from selected elements
  // 
  // .removeClass( className )
  //   className (string|array) : The class(es to be added)
  //
  // Examples:
  // 
  // $("p").removeClass("hidden")
  //

  Dom.prototype.removeClass = function (className) {
    return this["class"]("remove", className);
  };

  // -------------------------
  // .hasClass()
  // -------------------------
  // 
  // Check if all elements has class(es)
  // 
  // .hasClass( className )
  //   className (string|array) : The class(es to be added)
  //
  // Examples:
  // 
  // $("p").hasClass()
  //

  Dom.prototype.hasClass = function (className) {
    return this["class"]("has", className);
  };

  // -------------------------
  // .toggleClass()
  // -------------------------
  // 
  // Add or remove class(es) based on existence
  // 
  // .hasClass( className )
  //   className (string|array) : The class(es to be added)
  //
  // Examples:
  // 
  // $("p").hasClass()
  //

  Dom.prototype.toggleClass = function (className) {
    return this["class"]("toggle", className);
  };

  // -------------------------
  // .attr()
  // -------------------------
  // 
  // Set or return an attribute of selected elements
  // 
  // .attr( attr [, value] )
  //   attr (string) : Name of attribute
  //   value (any) : Value of attrib ute
  //
  // Examples:
  // 
  // $("p.hidden").attr("hidden")
  // $("div.edit").attr("contentEditable", "true")
  // $("body").attr("hilo", "0.1.0")
  //
  
  Dom.prototype.attr = function (name, val) {
    if(val) {
      return this.each(function(el) {
        el.setAttribute(name, val);
      });
    } else {
      return this.first(function (el) {
        return el[name];
      });
    }
  };