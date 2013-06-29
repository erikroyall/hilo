
  // Manipulation

  dom.prototype.html = function (htmlCode) {
    if (htmlCode) {
      this.each(function(el) {
        el.innerHTML = htmlCode;
      });
      return new dom(this);
    } else {
      this.one(function(el) {
        return el.innerHTML;
      });
    }
  };

  dom.prototype.text = function (text) {
    if (text) {
      this.each(function(el) {
        el.innerText = text;
      });
      return new dom(this);
    } else {
      this.one(function(el) {
        return el.innerText;
      });
    }
  };
  
  dom.prototype.append = function (html) {
    this.each(function (el) {
      el.innerHTML += html;
    });
  };
  
  dom.prototype.appendText = function (text) {
    this.each(function (el) {
      el.innerText += text;
    });
  };
  