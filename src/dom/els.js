
  // --------------------------------------------------
  // Element Selections, etc.
  // --------------------------------------------------

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
  // $('p.hidden').first().show()
  //

  Dom.prototype.first = function () {
    return new Dom([this[0]]);
  };

  // -------------------------
  // .ladt()
  // -------------------------
  // 
  // Return last element in the selected elements
  // 
  // .ladt( attr [, value] )
  //
  // Examples:
  // 
  // $('p.hidden').last().show()
  //
  
  Dom.prototype.last = function () {
    return new Dom([this[this.length - 1]]);
  };

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
  // $('p.hidden').el(3).show()
  //

  Dom.prototype.el = function (place) {
    return new Dom([this[place - 1]]);
  };

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
  // $('p.hidden').el().show()
  //

  Dom.prototype.children = function (sel) {
    var children = [], _i, _l;

    this.each(function (el) {
      var childNodes = select(sel ? sel : '*', el);

      for (_i = 0, _l = childNodes.length; _i < _l; _i += 1) {
        children = children.concat(childNodes[_i]);
      }
    });

    return children;
  };

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
  // $('div#editor').parent().hide()
  //

  Dom.prototype.parent = function () {
    return this.first(function (el) {
      return new Dom([el.parentElement]);
    });
  };

  // -------------------------
  // .parents()
  // -------------------------
  // 
  // Return parents of all selected elements
  // 
  // .parents( )
  //
  // Examples:
  // 
  // $('div.editor').parents().hide()
  //

  Dom.prototype.parents = function () {
    var pars = [];

    this.each(function (el) {
      pars = pars.concat(el.parentElement);
    });

    return new Dom(pars);
  };

  // -------------------------
  // .parent()
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
  // $('div#editor').parent().hide()
  //

  Dom.prototype.rel = function (sul) {
    var els = [];

    this.each(function (el) {
      els.push(el[sul]);
    });

    return els;
  };

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
  // $('div.editor').next().class('next-to-editor')
  //

  Dom.prototype.next = function () {
    return this.rel('nextElementSibling');
  };

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
  // $('div.editor').prev().class('prev-to-editor')
  //

  Dom.prototype.prev = function () {
    return this.rel('previousElementSibling');
  };