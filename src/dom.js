  
  // --------------------------------------------------
  // Hilo DOM
  // --------------------------------------------------

  /**
   * Main DOM Class
   * 
   * @class Dom
   * @constructor
   * @param {array} els The elements to manipulate
   * @param {string} sel The selector used
   * @return void
   * @example
   * <div class="code"><pre class="prettyprint">
   * new Dom (document.querySelectorAll(p:first-child);
   * new Dom ([document.createElement("div")]);
   * new Dom ([document.getElementByid("box")]);
   * new Dom (document.getElementsByClassName("hidden"));
   * new Dom (document.getElementsByTagName("mark"));
   * </pre></div>
   * @since 0.1.0
   */
  function Dom (els, sel) {
    var _i, _l;

    // Note that `this` is an object and"
    // NOT an Array

    // Loop thorugh the NodeList and set
    // this[index] for els[index]

    for (_i = 0, _l = els.length; _i < _l; _i += 1) {
      this[_i] = els[_i];
    }

    // Useful for looping through as ours
    // is an object and not an array

    this.length = els.length;

    // Know what selector is used to select
    // the elements

    this.sel = sel;
  }

  Dom.prototype = Array.prototype;

  extend(Dom.prototype, {
    constructor: Dom
  });

  // Hilo CSS Helper Methodss

  function unhyph (prop) {
    return prop.replace(/-(.)/g, function (m, m1) {
      return m1.toUpperCase();
    });
  }

  function unitize (unit, prop) {
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

    if (typeof unit === "string") {
      return unit;
    }

    if (pixel[prop] === true) {
      return unit + "px";
    }

    return unit;
  }

  /**
   * Create an element
   *
   * @for hilo
   * @method create
   * @param {string} tagName Tag Name or Node name of element
   * @attrs {object} attrs An object containing the attributes and values
   * @return {HTMLElement} The created element
   * @example
   * <div class="code"><pre class="prettyprint">
   * $.create("div", {
   *   class: "post",
   *   "data-id": 2
   * });
   * </pre></div>
   * @since 0.1.0
   */
  hilo.create = function (tagName, attrs) {
    var el = new Dom([document.createElement(tagName)]), key;

    if (attrs) {
      if (attrs.className) {
        el.addClass(attrs.className);
        delete attrs.className;
      }

      if (attrs.text) {
        el.text(attrs.text);
        delete attrs.text;
      }

      for (key in attrs) {
        if(attrs.hasOwnProperty(key)) {
          el.attr(key, attrs["key"]);
        }
      }
    }

    return el;
  };

  extend(Dom.prototype, {

    // --------------------------------------------------
    // Helper Functions
    // --------------------------------------------------

    /**
     * Execute a function on selected elements
     * 
     * @for Dom
     * @method each
     * @param {function} fn The function to be called on
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").each(function (el) {
     *   doSomethingWith(e);
     * });
     * </pre></div>
     * @since 0.1.0
     */
    each: function (fn) {
      this.map(fn);
      return this; // return the current Dom instance
    },

    /**
     * Return the results of executing a function 
     * on all the selected elements
     * 
     * @for Dom
     * @method map
     * @param {function} fn The function to be called on
     * @return {array} The results of execution
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div.need-cf").map(function (e) {
     *   doSomethingWith(e);
     * });
     * </pre></div>
     * @since 0.1.0
     */
    map: function (fn) {
      var results = [], _i, _l;
      for (_i = 0, _l = this.length; _i < _l; _i += 1) {
        results.push(fn.call(this, this[_i], _i));
      }
      return results;
    },

    /**
     * Map on selected elements and return them based 
     * on the number of selected elements
     * 
     * @for Dom
     * @method one
     * @param {function} fn Function to be called on
     * @return {Any|array}
     * @since 0.1.0
     */
    one: function (fn) {
      var m = this.map(fn);
      return m.length > 1 ? m : m[0];
    },

    /**
     * Execute a function on the first selected element
     * 
     * @for Dom
     * @method first
     * @param {function} fn The function to be called
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div").first(function (e) {
     *   console.log(e + " is the first div");
     * });
     * </pre></div>
     * @since 0.1.0
     */
    first: function (fn) {
      return fn(this[0]);
    },

    /**
     * Filters the selected elements and returns the 
     * elements that pass the test (or return true)
     * 
     * @for Dom
     * @method filter
     * @param {function} fn The filter function
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div").filter(function (el) {
     *   return el.className.split("hidden").length > 1;
     * });
     * </pre></div>
     * @since 0.1.0
     */
    filter: function (fn) {
      var len = this.length >>> 0
        , _i
        , t = Object(this)
        , res = []
        , val;

      for (_i = 0; _i < len; _i++)
      {
        if (_i in t)
        {
          val = t[_i];
          if (fn.call(this, val, _i, t)) {
            res.push(val);
          }
        }
      }

      return new Dom(res);
    },

    // --------------------------------------------------
    // Element Selections, etc.
    // --------------------------------------------------

    /**
     * Get a NodeList of selected elements
     * 
     * @for Dom
     * @method get
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("script").get();
     * </pre></div>
     * @since 0.1.0
     */
    get: function () {
      var els = [];

      this.each(function (el) {
        els.push(el);
      });

      return els;
    },

    /**
     * Return first element of the selected elements
     *
     * @for Dom
     * @method firstEl
     * @return {Dom} The first element
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p.hidden").firstEl().show();
     * </pre></div>
     * @since 0.1.0
     */
    firstEl: function () {
      return new Dom([this[0]]);
    },

    /**
     * Return last element of the selected elements
     *
     * @for Dom
     * @method lastEl
     * @return {Dom} The last element
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p.hidden").lastEl().show();
     * </pre></div>
     * @since 0.1.0
     */
    lastEl: function () {
      return new Dom([this[this.length - 1]]);
    },

    /**
     * Return nth element of the selected elements
     *
     * @for Dom
     * @method el
     * @return {number} place The index of element (Index Starts from 1)
     * @return {Dom} The nth element
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p.hidden").el(3).show();
     * </pre></div>
     * @since 0.1.0
     */
    el: function (place) {
      return new Dom([this[place - 1]]);
    },

    /**
     * Return the children of selected elements
     *
     * @for Dom
     * @method children
     * @param {string} sel Optional filtering selector
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * var childrenOfContainer = $("div.container").children();
     * $("div.container").children(":not(.hidden)").addClass("me");
     * </pre></div>
     * @since 0.1.0
     */
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

    /**
     * Returns the parents of selected elements
     *
     * @for Dom
     * @method parents
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div#editor").parent().hide()
     * </pre></div>
     * @since 0.1.0
     */
    parents: function () {
      var pars = [];

      this.each(function (el) {
        pars = pars.concat(el.parentElement);
      });

      return new Dom(pars);
    },

    /**
     * Return parent of first selected element
     *
     * @for Dom
     * @method parent
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div.editor").parent().hide();
     * </pre></div>
     * @since 0.1.0
     */
    parent: function () {
      return this.first(function (el) {
        return new Dom([el.parentElement]);
      });
    },

    /**
     * Return relative of selected elements based 
     * on the relation given
     * 
     * @for Dom
     * @method rel
     * @param {string} relation relation
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div#editor").rel("nextSibling").addClass("next-to-editor")
     * </pre></div>
     * @since 0.1.0
     */
    rel: function (sul) {
      var els = [];

      this.each(function (el) {
        els.push(el[sul]);
      });

      return els;
    },

    /**
     * Return next sibling elements of selected elements
     *
     * @for Dom
     * @method next
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div.editor").next().class("next-to-editor")
     * </pre></div>
     */
    next: function () {
      return this.rel("nextElementSibling");
    },

    /**
     * Return previous sibling elements of selected elements
     *
     * @for Dom
     * @method prev
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("div.editor").prev().class("prev-to-editor")
     * </pre></div>
     */
    prev: function () {
      return this.rel("previousElementSibling");
    },

    // --------------------------------------------------
    // DOM HTML
    // --------------------------------------------------

    /**
     * Set or return innerHTML of selected elements
     * 
     * @for Dom
     * @method html
     * @param {string} html HTML Code to be inserted
     * @return {string|void}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p:first-child").html("first-p")
     * var html = $("span").html()
     * </pre></div>
     * @since 0.1.0
     */
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

    /**
     * Empty the selected elements
     * 
     * @for Dom
     * @method empty
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("#todo-list").empty()
     * </pre></div>
     * @since 0.1.0
     */
    empty: function () {
      return this.html("");
    },

    /**
     * Append html to selected elements
     * 
     * @for Dom
     * @method append
     * @param {string} html The HTML Code to be appended
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p:first-child").append(" - From the first p child")
     * </pre></div>
     * @since 0.1.0
     */
    append: function (html) {
      return this.each(function (el) {
        el.innerHTML += html;
      });
    },

    /**
     * Prepend html to selected elements
     * 
     * @for Dom
     * @method prepend
     * @param {string} html The HTML Code to be prepended
     * @return {Dom}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p.subject").prepend("Subject: ")
     * </pre></div>
     * @since 0.1.0
     */
    prepend: function (html) {
      return this.each(function (el) {
        el.innerHTML = html + el.innerHTML;
      });
    },

    /**
     * Get or set the value attribute of selected element
     * 
     * @for Dom
     * @method value
     * @param val The value to set to
     * @return {string|void}
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("#my-form").children("input#name").value();
     * </pre></div>
     * @since 0.1.0
     */
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

    // --------------------------------------------------
    // Classes and IDs
    // --------------------------------------------------

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
     * <div class="code"><pre class="prettyprint">
     * $("p.hidden").attr("hidden"); 
     * $("div.edit").attr("contentEditable", "true"); 
     * $("body").attr("hilo", "0.1.0"); 
     * </pre></div>
     * @since 0.1.0
     */
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

    // --------------------------------------------------
    // Hilo CSS
    // --------------------------------------------------

    /**
     * Set or return css property
     *
     * @for Dom
     * @method css
     * @param {String|Object} prop Name of property | Properties
     * @param {string} value Value of property
     * @return {string|void}
     * @beta
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p").css("margin-left", "10em");
     * 
     * $("p.round").css({
     *   "border-radius": 10,
     *   width: 100
     * });
     * </pre></div>
     * @since 0.1.0
     */
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

    /**
     * Get computed property
     * 
     * @for Dom
     * @method computed
     * @param {string} prop Name of property
     * @return {number|boolean|string}
     * @beta
     * @since 0.1.0
     */
    computed: function (prop) {
      return this.one(function (el) {
        return win.getComputedStyle(el)[prop];
      });
    },

    outerWidth: function () {
      return parseFloat(this.computed("width")) + 
      parseFloat(this.computed("paddingLeft")) + 
      parseFloat(this.computed("paddingRight")) + 
      parseFloat(this.computed("borderLeft")) + 
      parseFloat(this.computed("borderRight")) + "px";
    },

    innerWidth: function () {
      return parseFloat(this.computed("width")) + 
      parseFloat(this.computed("paddingLeft")) + 
      parseFloat(this.computed("paddingRight")) + "px";
    },

    outerHeight: function () {
      return parseFloat(this.computed("height")) + 
      parseFloat(this.computed("paddingTop")) + 
      parseFloat(this.computed("paddingBottom")) + 
      parseFloat(this.computed("borderTop")) + 
      parseFloat(this.computed("borderBottom")) + "px";
    },

    innerHeight: function () {
      return parseFloat(this.computed("height")) + 
      parseFloat(this.computed("paddingTop")) + 
      parseFloat(this.computed("paddingBottom")) + "px";
    }
  });