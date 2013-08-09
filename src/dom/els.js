
  // --------------------------------------------------
  // Element Selections, etc.
  // --------------------------------------------------

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

    // -------------------------
    // .first()
    // -------------------------
    // 
    // Return the first element in the selected elements
    // 
    // .first( )
    //
    // Examples:
    // 
    // $("p.hidden").first().show()
    //

    first: function () {
      return new Dom([this[0]]);
    },

    // -------------------------
    // .last()
    // -------------------------
    // 
    // Return last element in the selected elements
    // 
    // .last( attr [, value] )
    //
    // Examples:
    // 
    // $("p.hidden").last().show()
    //

    last: function () {
      return new Dom([this[this.length - 1]]);
    },

    // -------------------------
    // .el()
    // -------------------------
    // 
    // Return nth element in the selected elements
    // 
    // .el( place )
    //   place (number) : A number representing place of element
    //
    // Examples:
    // 
    // $("p.hidden").el(3).show()
    //

    el: function (place) {
      return new Dom([this[place - 1]]);
    },

    // -------------------------
    // .children()
    // -------------------------
    // 
    // Return nth element in the selected elements
    // 
    // .children( )
    //
    // Examples:
    // 
    // $("p.hidden").el().show()
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

    // -------------------------
    // .parent()
    // -------------------------
    // 
    // Return parent of the first selected element
    // 
    // .parent( )
    //
    // Examples:
    // 
    // $("div#editor").parent().hide()
    //

    parents: function () {
      var pars = [];

      this.each(function (el) {
        pars = pars.concat(el.parentElement);
      });

      return new Dom(pars);
    },

    // -------------------------
    // .parent()
    // -------------------------
    // 
    // Return parent of first selected element
    // 
    // .parent( )
    //
    // Examples:
    // 
    // $("div.editor").parent().hide()
    //

    parent: function () {
      return this.first(function (el) {
        return new Dom([el.parentElement]);
      });
    },

    // -------------------------
    // .rel()
    // -------------------------
    // 
    // Return relative of selected elements based
    // on the relation given
    // 
    // .rel( rel )
    //   rel (string) : The relation between curent and 
    //
    // Examples:
    // 
    // $("div#editor").rel("nextSibling").addClass("next-to-editor")
    //

    rel: function (sul) {
      var els = [];

      this.each(function (el) {
        els.push(el[sul]);
      });

      return els;
    },

    // -------------------------
    // .next()
    // -------------------------
    // 
    // Return next element siblings of the selected elements
    // 
    // .next( )
    //
    // Examples:
    // 
    // $("div.editor").next().class("next-to-editor")
    //

    next: function () {
      return this.rel("nextElementSibling");
    },

    // -------------------------
    // .prev()
    // -------------------------
    // 
    // Return previous element siblings of the selected elements
    // 
    // .prev( )
    //
    // Examples:
    // 
    // $("div.editor").prev().class("prev-to-editor")
    //

    prev: function () {
      return this.rel("previousElementSibling");
    }
  });