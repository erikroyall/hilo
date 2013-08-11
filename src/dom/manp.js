  
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
  Dom.prototype.html = function (htmlCode) {
    if (typeof htmlCode !== "undefined") {
      return this.each(function(el) {
        el.innerHTML = htmlCode;
      });
    } else {
      return this.first(function(el) {
        return el.innerHTML;
      });
    }
  };

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
  Dom.prototype.empty = function () {
    return this.html("");
  };

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
  Dom.prototype.append = function (html) {
    return this.each(function (el) {
      el.innerHTML += html;
    });
  };

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
  Dom.prototype.prepend = function (html) {
    return this.each(function (el) {
      el.innerHTML = html + el.innerHTML;
    });
  };

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
  Dom.prototype.value = function (val) {
    if (val) {
      return this.each(function (el) {
        el.value = val;
      });
    } else {
      this.first(function (el) {
        return el.value;
      });
    }
  };