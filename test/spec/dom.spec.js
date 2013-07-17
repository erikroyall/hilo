describe("Hilo DOM", function () {
  it('should return empty when selecting nothing', function() {
    expect($("").length).toEqual(0);
  });

  it('should return a (specialized) DOM Node List when passed a string', function () {
    var $elm, elmArr = [], _i, _j, dElm, dElmArr = [];

    $elm = $('div');

    for (_i = 0; _i < $elm.length; _i++) {
      elmArr[_i] = $elm[_i];
    }

    dElm = $('div');

    for (_j = 0; _j < dElm.length; _j++) {
      dElmArr[_j] = dElm[_j];
    }

    expect(elmArr).toEqual(dElmArr);
  });
  it('should treat * same as document.all', function () {
    expect($('*')).toEqual($(document.all));
  });
});

describe("DOM fx", function () {
  it('.hide() should set HTMLElement.style.display to none', function () {
    var el; 
    el = document.getElementsByTagName('div')[0];
    $('div').hide();
    expect(el.style.display).toEqual('none');
  });
  it('.show() should set HTMLElement.style.display apart from none', function () {
    var el; 
    $('div').show();
    el = document.getElementsByTagName('div')[0];
    expect(el.style.display).not.toEqual('none');
  });
  it('.disappear() should set HTMLElement.style.opacity to "0"', function () {
    var el; 
    el = document.getElementsByTagName('div')[0];
    $('div').disappear();
    expect(el.style.opacity).toEqual('0');
  });
  it('.appear() should set HTMLElement.style.opacity to "1"', function () {
    var el; 
    $('div').appear();
    el = document.getElementsByTagName('div')[0];
    expect(el.style.opacity).toEqual('1');
  });
});

describe("DOM Methods", function () {
  describe('.html()', function () {
    it("should set the innerHTML of an element", function () {
      var el = document.createElement('div')
        , he = $.create('div')
        , innerContent = 'Hello World';

      el.innerHTML = innerContent;
      he.html(innerContent);

      return el.innerHTML === he[0].innerHTML;
    });
    it("should return the innerHTML when no content is passed", function() {
      var el = document.createElement('div')
        , he
        , innerContent;

      el.innerHTML = innerContent;

      he = $(el);

      return he.html() === innerContent;
    });
  });
  describe('.text()', function () {
    it("should set the innerText of an element", function () {
      var el = document.createElement('div')
        , he = $.create('div')
        , innerContent = 'Hello World';

      el.innerText = innerContent;
      he.text(innerContent);

      return el.innerText === he[0].innerText;
    });
    it("should return the innerText when no content is passed", function() {
      var el = document.createElement('div')
        , he
        , innerContent;

      el.innerText = innerContent;

      he = $(el);

      return he.text() === innerContent;
    });
  });
  describe('.addClass()', function() {
    it('should add a class', function () {
      var el = document.createElement('div');
      $(el).addClass('box');
      return el.className.split('box').length > 1;
    });
    it("should accept an array", function() {
      var el = document.createElement('div')
        , classes = ['box', 'big', 'red'];

      $(el).addClass(classes);

      function hasClass (s, name) {
        return s.className.split(name).length > 1;
      }

      return hasClass(el, 'box') && hasClass(el, 'big') && hasClass(el, 'red');
    });
    it("should accept a string of separated values", function() {
      var el = document.createElement('div')
        , classes = 'box big red';

      $(el).addClass(classes);

      function hasClass (s, name) {
        return s.className.split(name).length > 1;
      }

      return hasClass(el, 'box') && hasClass(el, 'big') && hasClass(el, 'red');
    });
  });
  describe('.removeClass()', function() {
    it('should remove a class', function () {
      var el = document.createElement('div');
      el.className += 'box';
      $(el).removeClass('box');
      return el.className.split('box').length === 1;
    });
    it("should accept an array", function() {
      var el = document.createElement('div')
        , classes = ['box', 'big', 'red'];

      el.className += 'box big blue red';

      $(el).removeClass(classes);

      function hasClass (s, name) {
        return s.className.split(name).length > 1;
      }

      return !(hasClass(el, 'box') || hasClass(el, 'big') || hasClass(el, 'red'));
    });
    it("should accept a string of separated values", function() {
      var el = document.createElement('div')
        , classes = 'box big red';

      el.className += 'box big blue red';

      $(el).removeClass(classes);

      function hasClass (s, name) {
        return s.className.split(name).length > 1;
      }

      return !(hasClass(el, 'box') && hasClass(el, 'big') && hasClass(el, 'red'));
    });
  });
});