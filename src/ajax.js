
  //
  // ** `hiloAjax` **
  //
  // Makes an AJAX request
  //
  // Param:
  // 
  // `config // {Object} Configuration Options`
  //
  // For the list of all config opts, see below.
  //
  // Example:
  //
  // ```
  // Hilo.ajax({
  //   url: "requestHandler.php",
  //   success: function (data, xhr) {
  //     console.log(data, xhr);
  //   },
  //   method: "GET"
  // });
  // ```
  //
  hiloAjax = function (config) {
    
    // ```
    // config.
    //  method // HTTP Method (default: "POST")
    //  url // The file to send request
    //  async // Whether to perform an asynchronous request (default: true)
    //  data // Data to be sent to the server
    //  response // HTTP Response type
    //  callback // function to be executed on readystatechange
    //  complete // {Function} (xhr.readyState = 4) To be triggered when request is complete
    //  error // {Function} To be triggered when request fails with an error
    //  timeout // {Function} To be triggered when request time's out
    //  success // {Function} (200) To be triggered when request is successfully made (Commonly registered event)
    //  notfound // {Function} (404) To be triggered when there has been a 4oh4 NotFound exception
    //  forbidden // {Function} (403) To be triggered when making the request is forbidden
    //  username // {String} Username to be provided, if authentication is required
    //  password // {String} Password to be provided, if...
    //  contentType // HTTP Content-Type
    // ```
    
    var xhr;

    /* Use the `XMLHttpRequest` object if available
       or use `ActiveXObject` */
    if (win.XMLHttpRequest) {
      xhr = new win.XMLHttpRequest();
    } else if (win.ActiveXObject) {
      xhr = new win.ActiveXObject("Microsoft.XMLHTTP");
    }

    /* Throw an error if a URL hasn't been provided
       Seriously, wth can this do without a target url? */
    if (!config.url) {
      throw new TypeError("url parameter not provided to hilo.ajax");
    }

    /* Perform an asynchronous request by default */
    config.async = config.async || true;

    /* Authentication params */
    config.username = config.username || null;
    config.password = config.password || null;

    /* contentType.. "application/x-www-form-urlencoded; charset=UTF-8" is preferred */
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

    /* Run this function when the request has timed out :'( */
    xhr.timeout = config.timeout;

    /* Open the request (Could've been more verbose) */
    xhr.open(
      config.method.trim().toUpperCase() || "POST",
      config.url,
      config.async,
      config.username,
      config.password
    );

    /* If config.data is an object, JSON.encode it */
    if (typeof config.data === "object") {
      config.data = JSON.encode(config.data);
    }

    /* Lauch the request */
    xhr.send(typeof config.data === "string" ? config.data : null);
  };

  hilo.ajax = hiloAjax;  

  //
  // `ajaxRequest` _Internal_
  // 
  // Param:
  // 
  // * `method`: {String} HTTP Method
  // * `strOpt`: {String} URL, or options object (see above)
  // * `callback`: {Function} To be executed on `success`
  // * `oOpt`: {Object} For providing more options
  // 

  function ajaxRequest (method, strOpt, callback, oOpt) {

    oOpt = (typeof oOpt === "object" ? oOpt : undefined);
    
    if (typeof strOpt === "string" && typeof callback === "function") {
      hiloAjax(extend({
        method: method,
        url: strOpt,
        success: callback
      }, oOpt));
    } else {
      hiloAjax(extend({
        method: method
      }, strOpt));
    }
  }

  //
  // ### Make an asynchronous GET Request
  // 
  // Params are similar to those of the internal `ajaxRequest` method (see above)
  // 
  // ```
  // $.get({
  //   url: "path/to/file.js",
  //   success: function (data) {
  //     console.log(data);
  //   }
  // }); // Long form
  // ```
  //
  // ```
  // $.get("path/to/file.js", function (data) {
  //   console.log(data);
  // }); // This does the exact same function as above
  // ```
  //
  // ```
  // $.get("path/to/file.js", function (data) {
  //   console.log(data);
  // }, {
  //   error: function (err) {
  //     console.error(err);
  //   }
  // }); // Short form, with more options
  // ```
  //

  hilo.get = function (strOpt, callback, oOpt) {
    ajaxRequest("GET", strOpt, callback, oOpt);
  };

  //
  // ### Make an asynchronous POST Request
  //
  // Params are similar to those of the internal `ajaxRequest` method (see above)
  // 
  // ```
  // $.post({
  //   url: "path/to/file.js",
  //   success: function (data) {
  //     console.log(data);
  //   },
  //   data: JSON.encode(obj)
  // }); // Long form
  // ```
  //
  // ```
  // $.post("path/to/file.js", function (data) {
  //   console.log(data);
  // }, {
  //   data: JSON.encode(obj),
  //   error: function (err) {
  //     console.error(err);
  //   }
  // }); // Short form, with more options
  // ```
  //
  hilo.post = function (strOpt, callback, oOpt) {
    ajaxRequest("POST", strOpt, callback, oOpt);
  };