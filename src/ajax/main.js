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
   *   method: "GET",
   *   url: "requestHandler.php",
   *   success: function (data, xhr) {
   *     console.log(data, xhr);
   *   }
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
          case 200:
            typeof config.success ? config.success.call(this, xhr) : null;
            break;

          case 404:
            typeof config.notfound ? config.notfound.call(this, xhr) : null;
            break;

          case 403:
            typeof config.forbidden ? config.forbidden.call(this, xhr) : null;
            break;

          case 500:
            typeof config.error ? config.error.call(this, xhr) : null;
            break;
        }
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
        config.url + (config.data ? "+" + config.data : ''),
        config.async,
        config.username,
        config.password
      );

      xhr.send(typeof config.data === "string" ? config.data : null);
    }
  };

  hilo.ajax = hiloAjax;