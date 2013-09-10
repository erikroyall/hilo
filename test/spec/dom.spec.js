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
  it('.disappear() should set HTMLElement.style.visibility to "hidden"', function () {
    var el; 
    el = document.getElementsByTagName('div')[0];
    Hilo('div').disappear();
    expect(el.style.visibility).toEqual('hidden');
  });
  it('.appear() should set HTMLElement.style.visibility to "visible"', function () {
    var el; 
    Hilo('div').appear();
    el = document.getElementsByTagName('div')[0];
    expect(el.style.visibility).toEqual('visible');
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
  describe('.append()', function() {
    it('should append content', function () {
      var el = document.createElement('div');

      el.innerHTML = "Hello";

      Hilo(el).append(" World");

      expect(el.innerHTML).toEqual("Hello World");
    });
    it('should handle empty parameter', function () {
      var el = document.createElement('div');

      el.innerHTML = "Hello World";

      Hilo(el).append("");

      expect(el.innerHTML).toEqual("Hello World");
    });
  });
  describe('.attr()', function() {
    it('should set an attribute', function() {
      var el = document.createElement('div');

      Hilo(el).attr("hidden", "yes");

      expect(el.getAttribute("hidden")).toEqual("yes");
    });
    it('should get an attribute', function() {
      var el = document.createElement('div');

      el.setAttribute("shown", "yes");

      expect(Hilo(el).attr("shown")).toEqual("yes");
    });
    it('should return null in case of empty parameter', function() {
      var el = document.createElement('div');

      el.setAttribute("shown", "yes");

      expect(Hilo(el).attr("")).toEqual(null);
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
        , prop = 'background-color'
        , val = 'green';

      Hilo(el).css(prop, val);

      expect(el.style['backgroundColor']).toEqual(val);
    });
    it('should set multiple css props. at one', function () {
      var el = document.createElement('div')
        , props = {
          'background-color': 'green',
          'color': 'red',
          'margin-top': 6
        };

      Hilo(el).css(props);

      expect(el.style.backgroundColor).toEqual('green');
      expect(el.style.color).toEqual('red');
      expect(el.style.marginTop).toEqual('6px');
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
  describe('.empty()', function() {
    it('should set innerHTML to ""', function() {
      var el = document.createElement("div");

      el.innerHTML = "<p>Lorem ipsum dolor sit amet";

      Hilo(el).empty();

      expect(el.innerHTML).toEqual("");
    });
  });
  describe('.parent()', function () {
    it('should get the parent element', function () {
      var parent = document.createElement("div")
        , child = document.createElement("span");

      child.innerHTML = "Hello World!";

      parent.appendChild(child);

      expect(Hilo(child).parent()[0]).toEqual(parent);
    });
  });
  describe('.parents()', function () {
    it('should get the parent elements of all elements', function () {
      var parent1 = document.createElement("div")
        , child1 = document.createElement("span")
        , parent2 = document.createElement("div")
        , child2 = document.createElement("span");

      parent1.appendChild(child1);
      parent2.appendChild(child2);

      expect(Hilo([child1, child2]).parents().get()).toEqual([parent1, parent2]);
    });
  });
});