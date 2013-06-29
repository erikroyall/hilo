
  hilo.isEmail = function (str) {
    return /[\w\_]+[\+]?[\w-\-]+\@[\w\-]+\.[\w\.]{2,}/gi.test(str);
  };
  