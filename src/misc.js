
  /**
   * Attaches classes to <body>
   * 
   * @for hilo
   * @method classify
   * @return {Array} List of classes applied
   * @examples
   * <div class="code"><pre class="prettyprint">
   * var classes = Hilo.classify();
   * </pre></div>
   * @since 0.1.0
   */
  hilo.classify = function () {
    var body = win.Hilo("body")
      , classes = ["js"]
      , _i;

    // Remove the default no-js class
    body.removeClass("no-js");

    if (hilo.browser.chrome) {
      classes.push("chrome");
    } else if (hilo.browser.firefox) {
      classes.push("firefox");
    } else if (hilo.browser.safari) {
      classes.push("safari");
    } else if (hilo.browser.ie) {

      for (_i = 6; _i <= 11; _i++) {
        if (hilo.browser.ie <= _i) {
          classes.push("lte-ie" + _i);

          if (hilo.browser.ie < _i) {
            classes.push("lt-ie" + _i);
          }
        }

        if (hilo.browser.ie >= _i) {
          classes.push("gte-ie" + _i);

          if (hilo.browser.ie > _i) {
            classes.push("gt-ie" + _i);
          }
        }

        if (hilo.browser.ie === _i) {
          classes.push("ie" + _i);
        }
      }

      classes.push("ie");
    } else if (hilo.browser.opera) {
      classes.push("opera");
    } else if (hilo.browser.konq) {
      classes.push("konqueror");
    }

    if (hilo.platform.win) {
      classes.push("windows");
    } else if (hilo.platform.mac) {
      classes.push("mac");
    } else if (hilo.platform.x11) {
      classes.push("linux");
    }

    if (hilo.engine.webkit) {
      classes.push("webkit");
    } else if (hilo.engine.ie) {
      classes.push("trident");
    } else if (hilo.engine.opera) {
      classes.push("presto");
    } else if (hilo.engine.gecko) {
      classes.push("gecko");
    }

    classes.push(hilo.browser.name.toLowerCase() + parseInt(hilo.browser.version, 10));

    function getBrowserVersion () {
      return String(hilo.browser.version).replace(".", "-");
    }

    if (getBrowserVersion() !== parseInt(hilo.browser.version, 10)) {
      classes.push(hilo.browser.name.toLowerCase() + getBrowserVersion());
    }

    for (_i in hilo.feature) {
      if (hilo.feature.hasOwnProperty(_i)) {
        if (hilo.feature[_i] === true) {
          classes.push(_i.toLowerCase());
        } else if (hilo.feature[_i] === false) {
          classes.push("no-" + _i.toLowerCase());
        }
      }
    }

    body.addClass(classes);

    return classes;
  };