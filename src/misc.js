
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

      if (hilo.browser.ie <= 6) {
        classes.push("lte-ie6");

        if (hilo.browser.ie < 6) {
          classes.push("lt-ie6");
        }
      }

      if (hilo.browser.ie <= 7) {
        classes.push("lte-ie7");

        if (hilo.browser.ie < 7) {
          classes.push("lt-ie7");
        }
      }

      if (hilo.browser.ie <= 8) {
        classes.push("lte-ie8");

        if (hilo.browser.ie < 8) {
          classes.push("lt-ie8");
        }
      }

      if (hilo.browser.ie <= 9) {
        classes.push("lte-ie9");

        if (hilo.browser.ie < 9) {
          classes.push("lt-ie9");
        }
      }

      if (hilo.browser.ie <= 10) {
        classes.push("lte-ie10");

        if (hilo.browser.ie < 10) {
          classes.push("lt-ie10");
        }
      }

      if (hilo.browser.ie >= 6) {
        classes.push("gte-ie6");

        if (hilo.browser.version > 6) {
          classes.push("gt-ie6");
        }
      }

      if (hilo.browser.ie >= 7) {
        classes.push("gte-ie7");

        if (hilo.browser.version > 7) {
          classes.push("gt-ie7");
        }
      }

      if (hilo.browser.ie >= 8) {
        classes.push("gte-ie8");

        if (hilo.browser.version > 8) {
          classes.push("gt-ie8");
        }
      }

      if (hilo.browser.ie >= 9) {
        classes.push("gte-ie9");

        if (hilo.browser.version > 9) {
          classes.push("gt-ie9");
        }
      }

      if (hilo.browser.ie >= 10) {
        classes.push("gte-ie10");

        if (hilo.browser.version > 10) {
          classes.push("gt-ie10");
        }
      }

      if (hilo.browser.ie === 6) {
        classes.push("ie6");
      } else if (hilo.browser.ie === 7) {
        classes.push("ie7");
      } else if (hilo.browser.ie === 8) {
        classes.push("ie8");
      } else if (hilo.browser.ie === 9) {
        classes.push("ie9");
      } else if (hilo.browser.ie === 10) {
        classes.push("ie10");
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