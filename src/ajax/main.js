  // --------------------------------------------------
  // Hilo AJAX
  // --------------------------------------------------

  hiloAjax = function (config) {
      
    /*
    
      config:
      - method: HTTP Method "GET" or "POST" (default: "POST")
      - url: The file to send request
      - async: Whether to perform an asynchronous request (default: true)
      - response: Response type "text" or "XML"
      - Event functions
        - callback: fn to be exec. on readystatechange
        - completed
        - error
        - abort
        - success
        - progress
        - load
        - loadStart
        - loadEnd
      - username
      - password
      - contentType
    
    */

    
    var xhr;

    if (win.XMLHttpRequest) {
      xhr = new win.XMLHttpRequest();
    } else if (win.ActiveXObject) {
      xhr = new win.ActiveXObject('Microsoft.XMLHTTP');
    }

    if (!config.url) {
      throw new TypeError("url parameter not provided to hilo.ajax");
    }

    config.async = config.async ? config.async : true;
    config.username = config.username ? config.username : null;
    config.password = config.password ? config.password : null;

    if(!config.contentType) {
      config.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
    }

    xhr.onreadystatechange = function () {
      if (config.callback) {
        config.callback(xhr);
      }

      if (xhr.readyState === 4) {
        switch (xhr.status) {
          case 200:
            if (config.success) {
              config.success();
            }
            
            break;
        }
      }
    };

    if (config.method.trim().toUpperCase() === 'POST') {
      xhr.open(
        'POST',
        config.url,
        config.async,
        config.username,
        config.password
      );
      xhr.send(config.data);
    } else if (config.method.trim().toUpperCase() === 'GET') {
      xhr.open(
        'GET',
        config.url + (config.data ? "+" + config.data : ''),
        config.async,
        config.username,
        config.password
      );
      xhr.send();
    } else {
      xhr.open(
        config.method.trim().toUpperCase(),
        config.url + (config.data ? "+" + config.data : ''),
        (config.async ? config.async: true),
        (config.username ? config.username : null),
        (config.password ? config.password : null)
      );
      xhr.send();
    }
  };

  hilo.ajax = hiloAjax;