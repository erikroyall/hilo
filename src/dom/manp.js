  
  Dom.prototype.html = function (htmlCode) {
    if (htmlCode) {
      return this.each(function(el) {
        el.innerHTML = htmlCode;
      });
    } else {
      return this.one(function(el) {
        return el.innerHTML;
      });
    }
  };

  Dom.prototype.text = function (text) {
    if (text) {
      return this.each(function(el) {
        el.innerText = text;
      });
    } else {
      return this.one(function(el) {
        return el.innerText;
      });
    }
  };
  
  Dom.prototype.append = function (html) {
    return this.each(function (el) {
      el.innerHTML += html;
    });
  };
  
  Dom.prototype.appendText = function (text) {
    return this.each(function (el) {
      el.innerText += text;
    });
  };

  Dom.prototype.prepend = function (html) {
    return this.each(function (el) {
      el.innerHTML = html + el.innerHTML;
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