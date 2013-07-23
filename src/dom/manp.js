  
  // --------------------------------------------------
  // DOM HTML
  // --------------------------------------------------

  // -------------------------
  // .html()
  // -------------------------
  // 
  // Set or return innerHTML of selected elements
  // 
  // .html( [htmlCode] )
  //    htmlCode (string) : The htmlCode to be set
  //
  // Examples:
  // 
  // $('p:first-child').html('first-p')
  // var html = $('span').html()
  // 

  Dom.prototype.html = function (htmlCode) {
    if (htmlCode) {
      return this.each(function(el) {
        el.innerHTML = htmlCode;
      });
    } else {
      return this.first(function(el) {
        return el.innerHTML;
      });
    }
  };

  // -------------------------
  // .text()
  // -------------------------
  // 
  // Set or return innerHTML of selected elements
  // 
  // .text( [text] )
  //    text (string) : The text to be set
  //
  // Examples:
  // 
  // $('p:first-child').text('first-p')
  // var text = $('span').text()
  // 

  Dom.prototype.text = function (text) {
    if (text) {
      return this.each(function(el) {
        el.innerText = text;
      });
    } else {
      return this.first(function(el) {
        return el.innerText;
      });
    }
  };

  // -------------------------
  // .append()
  // -------------------------
  // 
  // Set or return innerHTML of selected elements
  // 
  // .append( [html] )
  //    html (string) : The html to be appended
  //
  // Examples:
  // 
  // $('p:first-child').append(' - From the first p child')
  // 
  
  Dom.prototype.append = function (html) {
    return this.each(function (el) {
      el.innerHTML += html;
    });
  };

  // -------------------------
  // .appendText()
  // -------------------------
  // 
  // Set or return innerHTML of selected elements
  // 
  // .appendText( [text] )
  //    text (string) : The text to be set
  //
  // Examples:
  // 
  // $('p:first-child').appendText('The same thing here, too.')
  // 
  
  Dom.prototype.appendText = function (text) {
    return this.each(function (el) {
      el.innerText += text;
    });
  };

  // -------------------------
  // .prepend()
  // -------------------------
  // 
  // Set or return innerHTML of selected elements
  // 
  // .prepend( [html] )
  //    html (string) : The html to be prepended
  //
  // Examples:
  // 
  // $('p:first-child').prepend(' - From the first p child')
  // 

  Dom.prototype.prepend = function (html) {
    return this.each(function (el) {
      el.innerHTML = html + el.innerHTML;
    });
  };

  // -------------------------
  // .append()
  // -------------------------
  // 
  // Set or return innerHTML of selected elements
  // 
  // .append( [html] )
  //    html (string) : The html to be appended
  //
  // Examples:
  // 
  // $('p:first-child').append(' - From the first p child')
  // 
  
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