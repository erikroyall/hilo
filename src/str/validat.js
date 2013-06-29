
  hilo.isEmail = function (str) {
    return /[\w\_]+[\+]?[\w-\-]+/gi.test(str);
  };

  