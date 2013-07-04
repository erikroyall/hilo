  /**
  
    config:
    - method: HTTP Method "GET" or "POST" (default: "POST")
    - url: The file to send request
    - async: Whether to perform an asynchronous request (default: true)
    - response: Response type "text" or "XML"
    - Event functions
      - callback: The function to be executed each time onreadystatechange event is triggered
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
  
  **/

  hiloAjax = function (config) {
    var xhr;

    if (window.XMLHttpRequest) {
      xhr = new window.XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
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
    };

    if (config.method === 'POST') {
      xhr.open('POST', config.url, config.async, config.username, config.password);
      xhr.send(config.data);
    } else {
      xhr.open('GET', config.url + (config.data ? "+" + config.data : ''), config.async, config.username, config.password);
      xhr.send();
    }
  };

  hilo.ajax = hiloAjax;
