  
  // AJAX Simplifiers

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

        // 'success' and not 'callback' because that's what everyone wants
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