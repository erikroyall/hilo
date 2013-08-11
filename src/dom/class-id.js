  
  // --------------------------------------------------
  // Classes and IDs
  // --------------------------------------------------

  extend(Dom.prototype, {

    /**
     * Set or return ID of first element
     *  
     * @for Dom
     * @method id
     * @param {string} id The id to set
     * @return {string|void}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p.rect").first().id("square")
     * </pre></div>
     * @since 0.1.0
     */
    id: function (id) {
      if (id) {

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
    },

    /**
     * Add, remove or check class(es)
     * 
     * @for Dom
     * @method class
     * @param {string} action Specifies the action to take
     * @param {string|array} className Class(es) to be checked or manipulated
     * @return {boolean|void}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div#editor").class("add", "no-js")
     * </pre></div>
     * @since 0.1.0
     */
    "class": feature.classList === true ? function (action, className) {
      return this.each(function (el) {
        var _i, parts, contains, res = [];

        if (typeof className === "string") { // A String
          parts = className.split(" ");

          if (parts.length === 1) { // String, one class
            contains = el.classList.contains(className);

            switch (action) {
              case "add": {
                if (!contains) {
                  el.classList.add(className);
                }
              } break;

              case "remove": {
                if (contains) {
                  el.classList.remove(className);
                }
              } break;

              case "has": {
                res = true;
              } break;

              case "toggle": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  if (contains) {
                    el.classList.remove(parts[_i]);
                  } else {
                    el.classList.add(parts[_i]);
                  }
                }
              } break;
            }
          } else { // String, many classes
            contains = function (className) {
              return el.classList.contains(className);
            };

            switch (action) {
              case "add": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  if (!contains(parts[_i])) {
                    el.classList.add(parts[_i]);
                  }
                }
              } break;

              case "remove": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  if (contains(parts[_i])) {
                    el.classList.remove(parts[_i]);
                  }
                }
              } break;

              case "has": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  res.push(contains(parts[_i]));
                }
              } break;

              case "toggle": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  if (contains(parts[_i])) {
                    el.classList.remove(parts[_i]);
                  } else {
                    el.classList.add(parts[_i]);
                  }
                }
              } break;
            }
          }
        } else if (className.length) { // Array
          parts = className;

          contains = function (className) {
            return el.classList.contains(className);
          };

          switch (action) {
            case "add": {
              for (_i = 0; _i < parts.length; _i += 1) {
                if (!contains(parts[_i])) {
                  el.classList.add(parts[_i]);
                }
              }

            } break;

            case "remove": {
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.classList.remove(parts[_i]);
                }
              }

            } break;

            case "has": {
              for (_i = 0; _i < parts.length; _i += 1) {
                res.push(contains(parts[_i]));
              }

            } break;

            case "toggle": {
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.classList.remove(parts[_i]);
                } else {
                  el.classList.add(parts[_i]);
                }
              }
            } break;
          }
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
              case "add": {
                if (!contains) {
                  el.className += " " +  (className);
                }
              } break;

              case "remove": {
                if (contains) {
                  el.className.replace(className, "");
                }
              } break;

              case "has": {
                res = contains;
               
              } break;

              case "toggle": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  if (contains) {
                    el.className.replace(className, "");
                  } else {
                    el.className += " " +  className;
                  }
                }
              } break;
            }
          } else {
            contains = function (className) {
              return el.className.split(className).length > 1;
            };

            switch (action) {
              case "add": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  if (!contains(parts[_i])) {
                    el.className += " " +  parts[_i];
                  }
                }
              } break;

              case "remove": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  if (contains(parts[_i])) {
                    el.className.replace(parts[_i], "");
                  }
                }
              } break;

              case "has": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  res.push(contains(parts[_i]));
                }
              } break;

              case "toggle": {
                for (_i = 0; _i < parts.length; _i += 1) {
                  if (contains(parts[_i])) {
                    el.className.replace(parts[_i], "");
                  } else {
                    el.className += " " +  parts[_i];
                  }
                }
              } break;
            }
          }
        } else if (className.length) {
          parts = className;
          
          contains = function (className) {
            return el.className.split(className).length > 1;
          };

          switch (action) {
            case "add": {
              for (_i = 0; _i < parts.length; _i += 1) {
                if (!contains(parts[_i])) {
                  el.className += " " +  parts[_i];
                }
              }

            } break;

            case "remove": {
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.className.replace(parts[_i], "");
                }
              }

            } break;

            case "has": {
              for (_i = 0; _i < parts.length; _i += 1) {
                res.push(contains(parts[_i]));
              }

            } break;

            case "toggle": {
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.className.replace(parts[_i], "");
                } else {
                  el.className += " " +  parts[_i];
                }
              }
            } break;
          }
        }

        return typeof res === "boolean" ? res : res.every(function (el) {
          return el === true;
        });
      });
    },

    /**
     * Adds class(es) to selected elements
     * 
     * @for Dom
     * @method addClass
     * @param {string|array} className The class(es) to add
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").addClass("paragraph")
     * </pre></div>
     * @since 0.1.0
     */
    addClass: function (className) {
      return this["class"]("add", className);
    },

    /**
     * Remove class(es) from selected elements
     * 
     * @for Dom
     * @method removeClass
     * @param classes {string|array} The class(es) to be removed
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p.hidden").removeClass("hidden")
     * </pre></div>
     * @since 0.1.0
     */
    removeClass: function (className) {
      return this["class"]("remove", className);
    },

    /**
     * Check for class(es) in selected elements
     * 
     * @for Dom
     * @method hasClass
     * @param {string|array} className The class(es) to be checked for existence
     * @return {Boolean}
     * @example
     * <div class="code"><pre class="prettyprint">
     * if(!$("audio:not([controls])").hasClass("hidden")) {
     *   $("audio:not([controls])").addClass("hidden");
     * }
     * </pre></div>
     * @since 0.1.0
     */
    hasClass: function (className) {
      return this["class"]("has", className);
    },

    /**
     * Add class(es) if not already, remove if added
     * 
     * @for Dom
     * @method toggleClass
     * @param {string|array} className The classes to be toggled
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $(".someClass").on("click", function () {
     *   $(this).toggleClass("opaque");
     * });
     * </pre></div>
     * @since 0.1.0
     */
    toggleClass: function (className) {
      return this["class"]("toggle", className);
    },
    
    /**
     * Set or return attributes
     * 
     * @for Dom
     * @method attr
     * @param {string} name Name of attribute
     * @param {string} val Value of the attribute
     * @return {string|void}
     * @example
     * <div class="code prettyprint">
     * $("p.hidden").attr("hidden"); 
     * $("div.edit").attr("contentEditable", "true"); 
     * $("body").attr("hilo", "0.1.0"); 
     * </div>
     * @since 0.1.0
     */
    attr: function (name, val) {
      if(val) {
        return this.each(function(el) {
          el.setAttribute(name, val);
        });
      } else {
        return this.first(function (el) {
          return el[name];
        });
      }
    }
  });