  
  /**
   * Changes innerHTML of selected els
   *
   * @method html
   * @param String htmlCode The HTML Code to be set
   * @return object
   */

  Dom.prototype.html = function (htmlCode) {
    if (htmlCode) {
      return this.each(function(el) {
        el.innerHTML = htmlCode;
      });
    } else {
      this.one(function(el) {
        return el.innerHTML;
      });
    }
  };

  /**
   * Changes innerText of selected els
   *
   * @method text
   * @param string texy The text Code to be set
   * @return object
   */

  Dom.prototype.text = function (text) {
    if (text) {
      return this.each(function(el) {
        el.innerText = text;
      });
    } else {
      this.one(function(el) {
        return el.innerText;
      });
    }
  };
  
  /**
   * Appends to innerHTML of selected els
   *
   * @method append
   * @param string html The HTML Code to be appended
   * @return object
   */

  Dom.prototype.append = function (html) {
    return this.each(function (el) {
      el.innerHTML += html;
    });
  };
  
  /**
   * Appends to innerText if selected els
   *
   * @method appendText
   * @param string text The test to be appended
   * @return object
   */

  Dom.prototype.appendText = function (text) {
    return this.each(function (el) {
      el.innerText += text;
    });
  };
  
  Dom.prototype.value = function (val) {
    if (val) {
      return this.each(function (el) {
        el.value = val;
      });
    } else {
      this.one(function (el) {
        return el.value;
      });
    }
  };
