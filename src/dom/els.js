
  // --------------------------------------------------
  // Element Selections, etc.
  // --------------------------------------------------

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

    /**
     * Return first element of the selected elements
     *
     * @for Dom
     * @method first
     * @return {Dom} The first element
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p.hidden").first().show();
     * </pre></div>
     * @since 0.1.0
     */
    first: function () {
      return new Dom([this[0]]);
    },

    /**
     * Return last element of the selected elements
     *
     * @for Dom
     * @method last
     * @return {Dom} The last element
     * @example
     * <div class="code"><pre class="prettyprint">
     * $("p.hidden").last().show();
     * </pre></div>
     * @since 0.1.0
     */
    last: function () {
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
    }
  });