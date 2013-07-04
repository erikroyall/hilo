  
  Dom.prototype.ready = function (fn) {
    this.each(function (el) {
      el.onreadystatechange = function () {
        if (el.readyState = 'complete') {
          fn();
        }
      };
    });
  };

  Dom.prototype.click = function (fn) {
    this.on('click', fn);
  };

  Dom.prototype.hover = function (fn) {
    this.on('hover', fn);
  };

  Dom.prototype.focus = function (fn) {
    this.on('focus', fn);
  };

  Dom.prototype.drag = function (fn) {
    this.on('drag', fn);
  };

  Dom.prototype.dragenter = function (fn) {
    this.on('dragenter', fn);
  };

  Dom.prototype.dragend = function (fn) {
    this.on('dragend', fn);
  };

  Dom.prototype.dragleave = function (fn) {
    this.on('dragleave', fn);
  };

  Dom.prototype.dragover = function (fn) {
    this.on('dragover', fn);
  };

  Dom.prototype.dragstart = function (fn) {
    this.on('dragstart', fn);
  };

  Dom.prototype.drop = function (fn) {
    this.on('drop', fn);
  };

  Dom.prototype.keyup = function (fn) {
    this.on('keyup', fn);
  };

  Dom.prototype.keypress = function (fn) {
    this.on('keypress', fn);
  };

  Dom.prototype.keydown = function (fn) {
    this.on('keydown', fn);
  };

  Dom.prototype.load = function (fn) {
    this.on('load', fn);
  };

  Dom.prototype.mouseup = function (fn) {
    this.on('mouseup', fn);
  };

  Dom.prototype.mouseover = function (fn) {
    this.on('mouseover', fn);
  };

  Dom.prototype.mousedown = function (fn) {
    this.on('mousedown', fn);
  };

  Dom.prototype.mousewheel = function (fn) {
    this.on('mousewheel', fn);
  };

  Dom.prototype.change = function (fn) {
    this.on('change', fn);
  };

  Dom.prototype.blur = function (fn) {
    this.on('blur', fn);
  };

  Dom.prototype.submit = function (fn) {
    this.on('submit', fn);
  };
