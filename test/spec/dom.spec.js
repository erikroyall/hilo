describe("Hilo DOM", function () {
  it('should return empty when selecting nothing', function() {
    expect(Hilo("").length).toEqual(0);
  });

  it('should return a (specialized) DOM Node List when passed a string', function () {
    var $elm, elmArr = [], _i, _j, dElm, dElmArr = [];

    $elm = Hilo('div');

    for (_i = 0; _i < $elm.length; _i++) {
      elmArr[_i] = $elm[_i];
    }

    dElm = Hilo('div');

    for (_j = 0; _j < dElm.length; _j++) {
      dElmArr[_j] = dElm[_j];
    }

    expect(elmArr).toEqual(dElmArr);
  });
});

describe("DOM fx", function () {
  it('.hide() should set HTMLElement.style.display to none', function () {
    var el; 
    el = document.getElementsByTagName('div')[0];
    Hilo('div').hide();
    expect(el.style.display).toEqual('none');
  });
  it('.show() should set HTMLElement.style.display apart from none', function () {
    var el; 
    Hilo('div').show();
    el = document.getElementsByTagName('div')[0];
    expect(el.style.display).not.toEqual('none');
  });
  it('.disappear() should set HTMLElement.style.opacity to "0"', function () {
    var el; 
    el = document.getElementsByTagName('div')[0];
    Hilo('div').disappear();
    expect(el.style.opacity).toEqual('0');
  });
  it('.appear() should set HTMLElement.style.opacity to "1"', function () {
    var el; 
    Hilo('div').appear();
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

      he = Hilo(el);

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

      he = Hilo(el);

      return he.text() === innerContent;
    });
  });
  describe('.addClass()', function() {
    it('should add a class', function () {
      var el = document.createElement('div');
      Hilo(el).addClass('box');
      return el.className.split('box').length > 1;
    });
    it("should accept an array", function() {
      var el = document.createElement('div')
        , classes = ['box', 'big', 'red'];

      Hilo(el).addClass(classes);

      function hasClass (s, name) {
        return s.className.split(name).length > 1;
      }

      return hasClass(el, 'box') && hasClass(el, 'big') && hasClass(el, 'red');
    });
    it("should accept a string of separated values", function() {
      var el = document.createElement('div')
        , classes = 'box big red';

      Hilo(el).addClass(classes);

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
      Hilo(el).removeClass('box');
      return el.className.split('box').length === 1;
    });
    it("should accept an array", function() {
      var el = document.createElement('div')
        , classes = ['box', 'big', 'red'];

      el.className += 'box big blue red';

      Hilo(el).removeClass(classes);

      function hasClass (s, name) {
        return s.className.split(name).length > 1;
      }

      return !(hasClass(el, 'box') || hasClass(el, 'big') || hasClass(el, 'red'));
    });
    it("should accept a string of separated values", function() {
      var el = document.createElement('div')
        , classes = 'box big red';

      el.className += 'box big blue red';

      Hilo(el).removeClass(classes);

      function hasClass (s, name) {
        return s.className.split(name).length > 1;
      }

      return !(hasClass(el, 'box') && hasClass(el, 'big') && hasClass(el, 'red'));
    });
  });
  describe('.css()', function () {
    it('should set css of an element', function () {
      var el = document.createElement('div')
        , styl = el.style
        , prop = 'backgroundColor'
        , val = 'green';

      Hilo(el).css(prop, val);

      expect(el.style[prop]).toEqual(val);
    });
    it('should get css val of prop. of an element', function () {
      var el = document.createElement('div')
        , styl = el.style
        , prop = 'margin'
        , val = '10px';

      el.style[prop] = val;

      expect(Hilo(el).css(prop)).toEqual(val);
    });
  });
});