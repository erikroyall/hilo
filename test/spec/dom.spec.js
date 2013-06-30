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
    el = document.querySelector('div');
    $('div').hide();
    expect(el.style.display).toEqual('none');
  });
  it('.show() should set HTMLElement.style.display apart from none', function () {
    var el; 
    $('div').show();
    el = document.querySelector('div');
    expect(el.style.display).not.toEqual('none');
  });
  it('.disappear() should set HTMLElement.style.opacity to "0"', function () {
    var el; 
    el = document.querySelector('div');
    $('div').disappear();
    expect(el.style.opacity).toEqual('0');
  });
  it('.appear() should set HTMLElement.style.opacity to "1"', function () {
    var el; 
    $('div').appear();
    el = document.querySelector('div');
    expect(el.style.opacity).toEqual('1');
  });
});
