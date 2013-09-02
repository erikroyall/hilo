
  // --------------------------------------------------
  // Hilo AJAX
  // --------------------------------------------------

  /**
   * Makes an AJAX request
   * 
   * @for hilo
   * @method ajax
   * @param {object} config AJAX configuration options
   * @return {Hilo}
   * @examples
   * <div class="code"><pre class="prettyprint">
   * $.ajax({
   *   url: "requestHandler.php",
   *   success: function (data, xhr) {
   *     console.log(data, xhr);
   *   },
   *   method: "GET"
   * });
   * </pre></div>
   * @since 0.1.0
   */
  hiloAjax = function (config) {
      
    /*
     *
     * config:
     *  
     * - method: HTTP Method "GET" or "POST" (default: "POST")
     * - url: The file to send request
     * - async: Whether to perform an asynchronous request (default: true)
     * - data: The data to be sent to the server
     * - response: Response type "text" or "XML"
     * - Event functions
     *   - callback: fn to be exec. on readystatechange
     *   - complete
     *   - error
     *   - timeout
     *   - success
     *   - notfound
     *   - forbidden
     * - username
     * - password
     * - contentType
     *
     */
    
    var xhr;

    if (win.XMLHttpRequest) {
      xhr = new win.XMLHttpRequest();
    } else if (win.ActiveXObject) {
      xhr = new win.ActiveXObject("Microsoft.XMLHTTP");
    }

    if (!config.url) {
      throw new TypeError("url parameter not provided to hilo.ajax");
    }

    // Set defaults

    // Asynchronous requests are preferred
    config.async = config.async || true;

    // Authentication params
    config.username = config.username || null;
    config.password = config.password || null;

    // contentType application/x-www-form-urlencoded; charset=UTF-8 is preferred
    config.contentType = config.contentType || "application/x-www-form-urlencoded; charset=UTF-8";

    xhr.onreadystatechange = function () {
      if (config.callback) {
        config.callback(xhr);
      }

      if (xhr.readyState === 4) { // Request is completed
        typeof config.complete ? config.complete.call(this, xhr) : null;
        
        switch (xhr.status) {
          case 200: // Success
            typeof config.success ? config.success.call(this, xhr) : null;
            typeof config.error ? config.error.call(this, xhr) : null;
            break;

          case 404: // Not Found
            typeof config.notfound ? config.notfound.call(this, xhr) : null;
            typeof config.error ? config.error.call(this, xhr) : null;
            break;

          case 403: // Forbidden
            typeof config.forbidden ? config.forbidden.call(this, xhr) : null;
            typeof config.error ? config.error.call(this, xhr) : null;
            break;

          default: // Some Error
            typeof config.error ? config.error.call(this, xhr) : null;
            break;
        }
      } else if (xhr.readyState === 3) {
        typeof config.sent ? config.sent.call(this, xhr) : null;
      }
    };

    xhr.timeout = config.timeout;

    if (typeof config.method === "string") {
      if (config.method.trim().toUpperCase() === "POST") {
        xhr.open(
          "POST",
          config.url,
          config.async,
          config.username,
          config.password
        );

        xhr.send(config.data);
      } else if (config.method.trim().toUpperCase() === "GET") {
        xhr.open(
          "GET",
          config.url + (config.data ? "+" + config.data : ""),
          config.async,
          config.username,
          config.password
        );

        xhr.send(typeof config.data === "string" ? config.data : null);
      }
    } else {
      xhr.open(
        config.method.trim().toUpperCase(),
        config.url + (config.data ? "+" + config.data : ""),
        config.async,
        config.username,
        config.password
      );

      xhr.send(typeof config.data === "string" ? config.data : null);
    }
  };

  hilo.ajax = hiloAjax;  

  // --------------------------------------------------
  // AJAX Simplifiers
  // --------------------------------------------------

  function ajaxRequest (method, strOpt, callback, oOpt) {

    //
    // How does this function work?
    //
    // Let's forget about the method parameter
    //
    // 1. If "strOpt" is a string, and "callback" is a function,
    //    a. If "oOpt" is an object, then all props. of "oOpt" and
    //       {method:method,url:strOpt,success:callback} is passed
    //       as the first parameter to the hiloAjax function.
    //    b. If "oOpt" is not an object, hiloAjax is called with
    //       {method:method,url:strOpt,success:callback} as the 
    //       first parameter.
    // 2. Else, hiloAjax is called with {method:method} and strOpt
    //    as the first parameter.
    //
    // Note: "method" is the HTTP Req. method ("GET", "POST" or alike)
    // 
    //

    oOpt = (typeof oOpt === "object" ? oOpt : undefined);
    
    if (typeof strOpt === "string" && typeof callback === "function") {
      hiloAjax(extend({
        method: method,
        url: strOpt,

        // `success` and not `callback` because that's what everyone wants
        success: callback
      }, oOpt));
    } else {
      hiloAjax(extend({
        method: method
      }, strOpt));
    }
  }

  /**
   * Send an AJAX GET Request
   *
   * @for hilo
   * @method get
   * @param {string|object} strOpt File path or Options
   * @param {function|object} callback The function to execute
   * @param {object} Options
   * @example
   * <div class="code"><pre class="prettyprint">
   * $.get({
   *   url: "path/to/file.js",
   *   success: function (data) {
   *     console.log(data);
   *   }
   * }); // Longer form, the below is preferred
   * </pre></div>
   *
   * <div class="code"><pre class="prettyprint">
   * $.get("path/to/file.js", function (data) {
   *   console.log(data);
   * }); // This does the exact same function as above
   * </pre></div>
   *
   * <div class="code"><pre class="prettyprint">
   * $.get("path/to/file.js", function (data) {
   *   console.log(data);
   * }, {
   *   error: function (err) {
   *     console.error(err);
   *   }
   * }); // Shortform, with more options
   * </pre></div>
   * @since 0.1.0
   */
  hilo.get = function (strOpt, callback, oOpt) {
    ajaxRequest("GET", strOpt, callback, oOpt);
  };

  /**
   * Send an AJAX POST Request
   *
   * @for hilo
   * @method post
   * @param {string|object} strOpt File path or Options
   * @param {function|object} callback The function to execute
   * @param {object} Options
   * @example
   * <div class="code"><pre class="prettyprint">
   * $.post({
   *   url: "path/to/file.js",
   *   success: function (data) {
   *     console.log(data);
   *   },
   *   data: JSON.encode(obj)
   * }); // Longer form, the below is preferred
   * </pre></div>
   *
   * <div class="code"><pre class="prettyprint">
   * $.post("path/to/file.js", function (data) {
   *   console.log(data);
   * }, {
   *   data: JSON.encode(obj),
   *   error: function (err) {
   *     console.error(err);
   *   }
   * }); // Shortform, with more options
   * </pre></div>
   * @since 0.1.0
   */
  hilo.post = function (strOpt, callback, oOpt) {
    ajaxRequest("POST", strOpt, callback, oOpt);
  };