
  // Manipulation

  Dom.prototype.html = function (htmlCode) {
    if (htmlCode) {
      this.each(function(el) {
        el.innerHTML = htmlCode;
      });
      return new Dom(this);
    } else {
      this.one(function(el) {
        return el.innerHTML;
      });
    }
  };

  Dom.prototype.text = function (text) {
    if (text) {
      this.each(function(el) {
        el.innerText = text;
      });
      return new Dom(this);
    } else {
      this.one(function(el) {
        return el.innerText;
      });
    }
  };
  
  Dom.prototype.append = function (html) {
    this.each(function (el) {
      el.innerHTML += html;
    });
  };
  
  Dom.prototype.appendText = function (text) {
    this.each(function (el) {
      el.innerText += text;
    });
  };
  