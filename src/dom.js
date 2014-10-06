
  //
  // ### Main DOM Class
  //
  // ** Params: **
  // - `els` {Array} The elements to manipulate
  // - `sel` {String} The selector used
  //
  // ** Examples **
  //
  // ```
  // new Dom (document.querySelectorAll(p:first-child);
  // ```
  // ```
  // new Dom ([document.createElement("div")]);
  // ```
  // ```
  // new Dom ([document.getElementByid("box")]);
  // ```
  // ```
  // new Dom (document.getElementsByClassName("hidden"));
  // ```
  // ```
  // new Dom (document.getElementsByTagName("mark"));
  // ```
  // 
  function Dom (els, sel) {
    var _i, _l;

    /* Note that `this` is an object and NOT an Array */

    /* Loop thorugh the NodeList and set `this[index]` for `els[index]` */
    for (_i = 0, _l = els.length; _i < _l; _i += 1) {
      this[_i] = els[_i];
    }

    /* Useful for looping through as ours is an object and not an array */
    this.length = els.length;

    /* Know what selector is used to select the elements */
    this.sel = sel;
  }

  /* Make it _look_ like an array */
  Dom.prototype = Array.prototype;

  extend(Dom.prototype, {
    /* Set the constructor to Dom. It defaults to Array. We don't that */
    constructor: Dom
  });

  // ### Hilo CSS Helper Methods

  // 
  // **_unhyph_** *Internal*
  // 
  // Return a string repacing all `-`s with `""` and making the letter
  // next to every `-` uppercase
  // 
  // **Param**:
  // - `prop`: {String} CSS Property Name
  // 
  // **Examples**:
  // ```
  // unhyph("background-color"); // backgroundColor
  // unhyph("color"); // color
  // ```
  // 
  function unhyph (prop) {
    return prop.toLowerCase().replace(/-(.)/g, function (m, m1) {
      return m1.toUpperCase();
    });
  }

  // 
  // **_unitize_** *Internal*
  // 
  // Add necessary suffix to the number for certain CSS properties
  // _This will later be used by .css() and a number of other methods_
  // 
  // **Param**:
  // - `unit`: {String|Number} Valid CSS Unit (`unitize()` Returns the same thing if {String})
  // - `prop`: {String} CSS Property Name
  // 
  // **Examples**:
  // ```
  // unitize("background-color"); // backgroundColor
  // unhyph("color"); // color
  // ```
  // 
  function unitize (unit, prop) {

    /* All the CSS props. that are to be defaulted to px values */
    var pixel = {
      "width": true,
      "maxWidth": true,
      "minWidth": true,

      "height": true,
      "maxHeight": true,
      "minHeight": true,

      "borderWidth": true,
      "borderTopWidth": true,
      "borderLeftWidth": true,
      "borderBottomWidth": true,
      "borderRightWidth": true,
      "borderRadius": true,

      "outlineWidth": true,
      "outlineOffset": true,
      "strokeWidth": true,

      "fontSize": true,
      "lineHeight": true,
      "letterSpacing": true,
      "textIndent": true,
      "textUnderlineWidth": true,

      "margin": true,
      "marginTop": true,
      "marginLeft": true,
      "marginBottom": true,
      "marginRight": true,

      "padding": true,
      "paddingTop": true,
      "paddingLeft": true,
      "paddingBottom": true,
      "paddingRight": true,

      "top": true,
      "left": true,
      "bottom": true,
      "right": true
    };

    /* String values are not be unitized no matter what */
    if (typeof unit === "string") {
      return unit;
    }

    /* If the property is present in the previously mentioned
       object, the unit is suffixed with "px" */
    if (pixel[prop] === true) {
      return unit + "px";
    }

    return unit;
  }

  // 
  // **_hilo.create_**
  // 
  // Create an element
  // 
  // **Params**:
  // - `tagName`: {String} Tag Name or Node name of element
  // - `attrs`: {Object} An object containing the attributes and values
  // 
  // **Example**:
  // ```
  // $.create("div", {
  //   class: "post",
  //   "data-id": 2
  // });
  // ```
  // 
  hilo.create = function (tagName, attrs) {
    var el = new Dom([document.createElement(tagName)]), key;

    if (attrs) {
      /* Add Class if the `className` is set */
      if (attrs.className) {
        el.addClass(attrs.className);
        delete attrs.className;
      }

      /* Set html to if `text` content is given */
      if (attrs.text) {
        el.html(attrs.text);
        delete attrs.text;
      }

      /* Set other attributes */
      for (key in attrs) {
        if(attrs.hasOwnProperty(key)) {
          el.attr(key, attrs[key]);
        }
      }
    }

    return el;
  };

  extend(Dom.prototype, {

    // ## Helper Functions

    // 
    // **_Hilo.Dom.prototype.each_**
    // 
    // Execute a function on selected elements
    // 
    // **Param**:
    // - `fn`: {Function} The function to be called
    // 
    // **Example**:
    // ```
    // $("p").each(function (el) {
    //   doSomethingWith(e);
    // });
    // ```
    // 
    each: function (fn) {
      this.map(fn);
      return this; /* return the current Dom instance */
    },

    // 
    // **_Hilo.Dom.prototype.map_**
    // 
    // Return the results of executing a function
    // on all the selected elements
    // 
    // **Param**:
    // - `fn`: {Function} The function to be called
    // 
    // **Example**:
    // ```
    // $("div.need-cf").map(function (e) {
    //   doSomethingWith(e);
    // });
    // ```
    // 
    map: function (fn) {
      var results = []
        , _i
        , _l;

      for (_i = 0, _l = this.length; _i < _l; _i += 1) {
        results.push(fn.call(this, this[_i], _i));
      }

      return results;
    },

    // 
    // **_Hilo.Dom.prototype.one_**
    // 
    // Map on selected elements and return them based
    // on the number of selected elements
    // 
    // **Param**:
    // - `fn`: {Function} The function to be called
    // 
    one: function (fn) {
      var m = this.map(fn);
      return m.length > 1 ? m : m[0];
    },

    // 
    // **_Hilo.Dom.prototype.first_**
    // 
    // Execute a function on the first selected element
    // 
    // **Param**:
    // - `fn`: {Function} The function to be called
    // 
    // **Example**:
    // ```
    // $("div").first(function (e) {
    //   console.log(e + " is the first div");
    // });
    // ```
    // 
    first: function (fn) {
      return fn(this[0]);
    },

    // 
    // **_Hilo.Dom.prototype.filter_**
    // 
    // Filter the selected element and return the
    // elements that pass the test (or return true)
    // 
    // **Param**:
    // - `fn`: {Function} The function to be called
    // 
    // **Example**:
    // ```
    // $("div").filter(function (el) {
    //   return el.className.split("hidden").length > 1;
    // });
    // ```
    // 
    filter: function (fn) {
      var len = this.length >>> 0
        , _i
        , t = Object(this)
        , res = []
        , val;

      for (_i = 0; _i < len; _i++) {
        if (_i in t) {
          val = t[_i];

          if (fn.call(this, val, _i, t)) {
            res.push(val);
          }
        }
      }

      return new Dom(res);
    },

    // ## Element Selections, etc.

    // 
    // **_Hilo.Dom.prototype.get_**
    // 
    // Get a JavaScript Array containing selected elements
    // 
    // **Example**:
    // ```
    // $("script").get();
    // ```
    // 
    get: function () {
      var els = [];

      this.each(function (el) {
        els.push(el);
      });

      return els;
    },

    // 
    // **_Hilo.Dom.prototype.firstEl_**
    // 
    // Return first element of the selected elements
    // 
    // **Example**:
    // ```
    // $("p.hidden").firstEl().show();
    // ```
    // 
    firstEl: function () {
      return new Dom([this[0]]);
    },

    // 
    // **_Hilo.Dom.prototype.lastEl_**
    // 
    // Return last element of the selected elements
    // 
    // **Example**:
    // ```
    // $("p.hidden").lastEl().show();
    // ```
    // 
    lastEl: function () {
      return new Dom([this[this.length - 1]]);
    },

    // 
    // **_Hilo.Dom.prototype.el_**
    // 
    // Return nth element of the selected elements
    // 
    // **Param**:
    // - `place`: {Number} The index of the element (Starts from 1)
    // 
    // **Example**:
    // ```
    // $("p.hidden").el(3).show();
    // ```
    // 
    el: function (place) {
      return new Dom([this[place - 1]]);
    },

    // 
    // **_Hilo.Dom.prototype.children_**
    // 
    // Return the children of selected elements
    // 
    // **Param**:
    // - `sel`: {String} Optional filtering selector
    // 
    // **Example**:
    // ```
    // var childrenOfContainer = $("div.container").children();
    // $("div.container").children(":not(.hidden)").addClass("me");
    // ```
    // 
    children: function (sel) {
      var children = [], _i, _l;

      this.each(function (el) {
        var childNodes = select(sel ? sel : "*", el);

        for (_i = 0, _l = childNodes.length; _i < _l; _i += 1) {
          children = children.concat(childNodes[_i]);
        }
      });

      return children;
    },

    // 
    // **_Hilo.Dom.prototype.parents_**
    // 
    // Return the parents of selected elements
    // 
    // **Example**:
    // ```
    // $("div#editor").parent().hide()
    // ```
    // 
    parents: function () {
      var pars = [];

      this.each(function (el) {
        pars = pars.concat(el.parentElement);
      });

      return new Dom(pars);
    },

    // 
    // **_Hilo.Dom.prototype.parent_**
    // 
    // Return the parent of the first selected element
    // 
    // **Example**:
    // ```
    // $("div#editor").parent().hide()
    // ```
    // 
    parent: function () {
      return this.first(function (el) {
        return new Dom([el.parentElement]);
      });
    },

    // 
    // **_Hilo.Dom.prototype.rel_**
    // 
    // Return relatives of selected elements based
    // on the given relation
    // 
    // **Param**:
    // - `sul`: {String} Relation
    // 
    // **Example**:
    // ```
    // $("div#editor").rel("nextSibling").addClass("next-to-editor");
    // ```
    // 
    rel: function (sul) {
      var els = [];

      this.each(function (el) {
        els.push(el[sul]);
      });

      return els;
    },

    // 
    // **_Hilo.Dom.prototype.next_**
    // 
    // Return next sibling elements of selected elements
    // 
    // **Example**:
    // ```
    // $("div#editor").next().addClass("next-to-editor");
    // ```
    // 
    next: function () {
      return this.rel("nextElementSibling");
    },
    
    // 
    // **_Hilo.Dom.prototype.prev_**
    // 
    // Return next sibling elements of selected elements
    // 
    // **Example**:
    // ```
    // $("div#editor").prev().addClass("prev-to-editor");
    // ```
    // 
    prev: function () {
      return this.rel("previousElementSibling");
    },

    // 
    // **_Hilo.Dom.prototype.html_**
    // 
    // Set or return innerHTML of selected elements
    // 
    // **Param**:
    // - `html`: {String} HTML Code to be inserted
    // 
    // **Example**:
    // ```
    // $("p:first-child").html("first-p");
    // var html = $("span").html();
    // ```
    // 
    html: function (htmlCode) {
      if (typeof htmlCode !== "undefined") {
        return this.each(function(el) {
          el.innerHTML = htmlCode;
        });
      } else {
        return this.first(function(el) {
          return el.innerHTML;
        });
      }
    },

    // 
    // **_Hilo.Dom.prototype.empty_**
    // 
    // Empty the selected elements
    //
    // **Example**:
    // ```
    // $("#todo-list").empty();
    // ```
    // 
    empty: function () {
      return this.html("");
    },

    // 
    // **_Hilo.Dom.prototype.append_**
    // 
    // Append html to selected elements
    // 
    // **Param**:
    // - `html`: {String} HTML Code to be appeneded
    // 
    // **Example**:
    // ```
    // $("p:first-child").append(" - From the first p child")
    // ```
    // 
    append: function (html) {
      return this.each(function (el) {
        el.innerHTML += html;
      });
    },

    // 
    // **_Hilo.Dom.prototype.prepend_**
    // 
    // Prepend html to selected elements
    // 
    // **Param**:
    // - `html`: {String} HTML Code to be appeneded
    // 
    // **Example**:
    // ```
    // $("p:first-child").append(" - From the first p child")
    // ```
    // 
    prepend: function (html) {
      return this.each(function (el) {
        el.innerHTML = html + el.innerHTML;
      });
    },

    // 
    // **_Hilo.Dom.prototype.value_**
    // 
    // Get or set the value attribute of the selected element
    // 
    // **Param**:
    // - `val`: {String} Value to set to
    // 
    // **Example**:
    // ```
    // $("#my-form").children("input#name").value();
    // ```
    // 
    value: function (val) {
      if (val) {
        return this.each(function (el) {
          el.value = val;
        });
      } else {
        this.first(function (el) {
          return el.value;
        });
      }
    },

    // 
    // **_Hilo.Dom.prototype.id_**
    // 
    // Get or set the ID of first element
    // 
    // **Param**:
    // - `id`: {String} ID to set
    // 
    // **Example**:
    // ```
    // $("p.rect").first().id("square");
    // ```
    // 
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

    // ### Classes and IDs

    // 
    // **_Hilo.Dom.prototype.class_**
    // 
    // Add, remove, or check class(es)
    // 
    // **Param**:
    // - `action`: {String} Action to take ("add", "remove", "has")
    // - `className`: {String|Array} Class(es) to add or remove
    // 
    // **Examples**:
    // ```
    // $("div#editor").class("add", "no-js");
    // ```
    // ```
    // $("div#editor").class("remove", "no-js");
    // ```
    // ```
    // var isHidden = $("p").class("has", "hidden");
    // ```
    //
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

    // 
    // **_Hilo.Dom.prototype.addClass_**
    // 
    // Adds class(es) to selected elements
    // 
    // **Param**:
    // - `className`: {String|Array} The class(es) to add
    // 
    // **Example**:
    // ```
    // $("p").addClass("paragraph");
    // ```
    // 
    addClass: function (className) {
      return this["class"]("add", className);
    },

    // 
    // **_Hilo.Dom.prototype.removeClass_**
    // 
    // Remove class(es) from selected elements
    // 
    // **Param**:
    // - `className`: {String|Array} The class(es) to remove
    // 
    // **Example**:
    // ```
    // $("p.hidden").removeClass("hidden");
    // ```
    // 
    removeClass: function (className) {
      return this["class"]("remove", className);
    },

    // 
    // **_Hilo.Dom.prototype.hasClass_**
    // 
    // Check if selected elements have the specified class(es)
    // 
    // **Param**:
    // - `className`: {String|Array} The class(es) to check if exists
    // 
    // **Example**:
    // ```
    // $("pre").hasClass("prettyprint");
    // ```
    // 
    hasClass: function (className) {
      return this["class"]("has", className);
    },

    // 
    // **_Hilo.Dom.prototype.toggleClass_**
    // 
    // Add class(es) if it/they do(es) not exist(s),
    // remove if exist(s)
    // 
    // **Param**:
    // - `className`: {String|Array} The class(es) to toggle
    // 
    // **Example**:
    // ```
    // $(".someClass").on("click", function () {
    //   $(this).toggleClass("opaque");
    // });
    // ```
    // 
    toggleClass: function (className) {
      return this["class"]("toggle", className);
    },

    // 
    // **_Hilo.Dom.prototype.attr_**
    // 
    // Set or return attribute values
    // 
    // **Param**:
    // - `name`: {String} Name of attribute
    // - `val`: {String} Value of attribute
    // 
    // **Example**:
    // ```
    // $("p.hidden").attr("hidden");
    // ```
    // ```
    // $("div.edit").attr("contentEditable", "true");
    // ```
    // ```
    // $("body").attr("hilo", "0.1.0"); 
    // ```
    // 
    attr: function (name, val) {
      if(val) {
        return this.each(function(el) {
          el.setAttribute(name, val);
        });
      } else {
        return this.first(function (el) {
          return el.getAttribute(name);
        });
      }
    },

    // ### Hilo CSS

    // 
    // **_Hilo.Dom.prototype.css_**
    // 
    // Set or return css property values
    // 
    // **Param**:
    // - `prop`: {String|Object} Name of the propety | Properties
    // - `value`: {String} Value of property
    // 
    // **Example**:
    // ```
    // $("p").css("margin-left", "10em");
    // ```
    // ```
    // $("p.round").css({
    //   "border-radius": 10,
    //   width: 100
    // });
    // ```
    // 
    css: function (prop, value) {
      var unhyphed;

      if (typeof prop === "string") {
        unhyphed = unhyph(prop);

        if (value) {
          return this.each(function (el) {
            el.style[unhyphed] = unitize(value, unhyphed);
          });
        } else {
          return this.first(function (el) {
            return el.style[unhyphed];
          });
        }
      } else if (typeof prop === "object") {
        forIn(prop, function (pr) {
          unhyphed = unhyph(pr);

          this.each(function (el) {
            el.style[unhyphed] = unitize(prop[pr], unhyphed);
          });
        }, this);
      }
    },

    // 
    // **_Hilo.Dom.prototype.computed_**
    // 
    // Get computed property
    // 
    // **Param**:
    // - `prop`: {String|Object} Name of property
    // 
    // **Example**:
    // ```
    // $("#box").computed("width");
    // ```
    // 
    computed: function (prop) {
      return this.first(function (el) {
        return win.getComputedStyle(el)[prop];
      });
    },

    // Get outer width

    outerWidth: function () {
      return parseFloat(this.computed("width")) + 
      parseFloat(this.computed("paddingLeft")) + 
      parseFloat(this.computed("paddingRight")) + 
      parseFloat(this.computed("borderLeft")) + 
      parseFloat(this.computed("borderRight")) + "px";
    },

    // Get inner width

    innerWidth: function () {
      return parseFloat(this.computed("width")) + 
      parseFloat(this.computed("paddingLeft")) + 
      parseFloat(this.computed("paddingRight")) + "px";
    },

    // Get outer height

    outerHeight: function () {
      return parseFloat(this.computed("height")) + 
      parseFloat(this.computed("paddingTop")) + 
      parseFloat(this.computed("paddingBottom")) + 
      parseFloat(this.computed("borderTop")) + 
      parseFloat(this.computed("borderBottom")) + "px";
    },

    // Get inner height

    innerHeight: function () {
      return parseFloat(this.computed("height")) + 
      parseFloat(this.computed("paddingTop")) + 
      parseFloat(this.computed("paddingBottom")) + "px";
    }
  });