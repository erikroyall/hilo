  
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

  // --------------------------------------------------
  // Hilo.get()
  // --------------------------------------------------
  // 
  // Send an AJAX GET request
  // 
  //  .get( strOpt [, callback [, oOpt]] )
  //
  // Examples:
  // 
  // $.get({
  //   url: "path/to/file.js",
  //   success: function (data) {
  //     console.log(data);
  //   }
  // }) // Longer form, the below is preferred
  // 
  // $.get("path/to/file.js", function (data) {
  //   console.log(data);
  // }) // This does the exact same function as above
  // 
  // $.get("path/to/file.js", function (data) {
  //   console.log(data);
  // }, {
  //   error: function (err) {
  //     console.error(err);
  //   }
  // }) // Shortform, with more options
  // 

  hilo.get = function (strOpt, callback, oOpt) {
    ajaxRequest("GET", strOpt, callback, oOpt);
  };

  // --------------------------------------------------
  // Hilo.post()
  // --------------------------------------------------
  // 
  // Send an AJAX POST request
  // 
  //  .post( strOpt [, callback [, oOpt]] )
  //
  // Examples:
  // 
  // $.post({
  //   url: "path/to/file.js",
  //   success: function (data) {
  //     console.log(data);
  //   },
  //   data: JSON.encode(obj)
  // }) // Longer form, the below is preferred
  // 
  // $.post("path/to/file.js", function (data) {
  //   console.log(data);
  // }, {
  //   data: JSON.encode(obj),
  //   error: function (err) {
  //     console.error(err);
  //   }
  // }) // Shortform, with more options
  // 

  hilo.post = function (strOpt, callback, oOpt) {
    ajaxRequest("POST", strOpt, callback, oOpt);
  };