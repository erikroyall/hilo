/* Hilo - 0.1.0-pre-dev-beta-5 - 2013-07-14
 * http://erikroyall.github.com/hilo/
 * Copyright (c) 2013 Erik Royall and Hilo contributors
 * Licensed under MIT (see LICENSE-MIT) 
 */

window.Hilo = (function () {
  /*jshint -W083, -W040 */

  "use strict";
  
  var hilo             // Public API
    , win = window     // Reference to window
    , doc = document   // Reference to document
    , callbacks = []   // Array of functions to be executed on DOMReady
    , select           // Private Selector Function
    , feature          // Feature Detection
    , browser          // Browser Detection
    , hiloAjax         // AJAX Func.
    , createEl         // Create an Element
    , impEvts          // Array containing imp. evts.
    , impCss           // Array containing imp. css props.
    , _i               // Loop helper
    , Dom              // DOM Manipulation Methods
    , Test;            // Test class

  /* 
   * Select elements
   * 
   * !selector - Selector {String}
   * root - Root element {String|HTMLElement} | Whether to cache {Boolean}
   * e - Root element if cache is specfied {String|HTMLElement} 
   * 
   * This function can be used throughout the code
   * to select elements
   */

  select = function (selector, root, en) {
    var rt, sel = selector, tempObj;

    /*
     * Selects elements based on selector and root
     *
     * !sel - Selector {String}
     * root - Root element {String|HTMLElement}
     */

    function get (sel, root) {
      var c, rt;

      rt = root || document;

      /*
       * The main selecting engine. Written by me.
       *
       * !sel - Selector {String}
       * rt - Root element {String|HTMLElement}
       */

      function dom (sel, rt) {
        var els;

        if(                               // >
          sel.split(" ").length === 1 &&  // >>
          sel.split(">").length === 1 &&  // >>> Make sure sel doesn't have  ,>,: or +
          sel.split(":").length === 1 &&  // >>
          sel.split("+").length === 1) {  // >
          c = sel.slice(0,1); // Find out first ltr; Useful in next step
          switch(c) {
            case "#":
              els = [rt.getElementById(sel.substr(1,sel.length))];
              break;
            case ".":
              els = rt.getElementsByClassName(sel);
              break;
            case "*":
              els = document.all;
              break;
            case "&":
              els = document.documentElement;
              break;
            default:
              els = rt.getElementsByTagName(sel);
              break;
          }
        } else {
          try {
            els = rt.querySelectorAll(sel);
          } catch (en) {
            els = win.Hilo.select(sel, rt);
          }
        }

        return els;
      }

      return dom(sel, rt);
    }

    if (root === true) {
      // The temporary object
      tempObj = win.Hilo.temp[sel];
      if (tempObj) {
        return tempObj;
      } else {
        if (typeof en === 'object') {
          tempObj = get(sel, en);
        } else {
          tempObj = get(sel);
        }
        
        return tempObj;
      }
    } else if (typeof root === 'string') {

    } else {
      rt = document;
    }

    return get(sel, rt);
  };

  /*
   * Local copy of the one and only global
   */

  hilo = function (input, root, en) {
    if (typeof input === 'string') {
      return new Dom(select(input, root, en));
    } else if (typeof input === 'function') { // Function
      if (document.readyState === 'complete') {
        input();
      } else {
        callbacks.push(input);
      }
    } else if (input.length) { // DOM Node List | Hilo DOM Object
      return new Dom(input);
    } else { // DOM Node
      input = [input];
      return new Dom(input);
    }
  };

  // Enable Selector Caching
  hilo.temp = {};

  hilo.version = '0.1.0-pre-dev-beta-5';

  feature = (function () {
    var i = document.createElement("input");

    return {
      applicationcache: (function () {
        return !!window.applicationCache;
      }()),
      audiopreload: (function () {
        return 'preload' in document.createElement('audio');
      }()),
      canvas: (function () {
        return !!document.createElement('canvas').getContext;
      }()),
      classList: (function () {
        return 'classList' in document.createElement('p');
      }()),
      es6: (function () {
        return typeof String.prototype.contains === 'function';
      }()),
      geolocation: (function () {
        return 'geolocation' in window.navigator;
      }()),
      history: (function () {
        return !!(window.history && history.pushState);
      }()),
      indexeddb: (function () {
        return !!(window.indexedDB && window.IDBKeyRange && window.IDBTransaction);
      }()),
      input: {
        autofocus: (function () {
          return 'autofocus' in i;
        }()),
        placeholder: (function () {
          return 'placeholder' in i;
        }()),
        type: {
          color: (function () {
            i.setAttribute('type', 'color');
            return i.type !== 'text';
          }()),
          date: (function () {
            i.setAttribute('type', 'date');
            return i.type !== 'text';
          }()),
          datetime: (function () {
            i.setAttribute('type', 'datetime');
            return i.type !== 'text';
          }()),
          datetimeLocal: (function () {
            i.setAttribute('type', 'datetime-local');
            return i.type !== 'text';
          }()),
          email: (function () {
            i.setAttribute('type', 'email');
            return i.type !== 'text';
          }()),
          month: (function () {
            i.setAttribute('type', 'month');
            return i.type !== 'text';
          }()),
          number: (function () {
            i.setAttribute('type', 'number');
            return i.type !== 'text';
          }()),
          range: (function () {
            i.setAttribute('type', 'range');
            return i.type !== 'text';
          }()),
          search: (function () {
            i.setAttribute('type', 'search');
            return i.type !== 'text';
          }()),
          tel: (function () {
            i.setAttribute('type', 'tel');
            return i.type !== 'text';
          }()),
          time: (function () {
            i.setAttribute('type', 'time');
            return i.type !== 'text';
          }()),
          week: (function () {
            i.setAttribute('type', 'week');
            return i.type !== 'text';
          }())
        }
      },
      localstorage: (function () {
        try {
          return 'localStorage' in window && window['localStorage'] !== null && !!window.localStorage.setItem;
        } catch(e){
          return false;
        }
      }()),
      microdata: (function () {
        return 'getItems' in document;
      }()),
      template: (function () {
        return 'content' in document.createElement('template');
      }()),
      video: (function () {
        try {
          return !!document.createElement('video').canPlayType;
        } catch (e) {
          return false;
        }
      }()),
      h264: (function () {
        var v = document.createElement("video");
        try {
          return v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
        } catch (e) {
          return false;
        }
      }()),
      webm: (function () {
        var v = document.createElement("video");
        try {
          return v.canPlayType('video/webm; codecs="vp8, vorbis"');
        } catch (e) {
          return false;
        }
      }()),
      ogg: (function () {
        var v = document.createElement("video");
        try {
          return v.canPlayType('video/ogg; codecs="theora, vorbis"');
        } catch (e) {
          return false;
        }
      }()),
      webaudio: (function () {
        return !!(window.webkitAudioContext || window.AudioContext);
      }()),
      webworkers: (function () {
        return !!window.Worker;
      }())
    };
  }());

  hilo.feature = feature;
  
  browser = {};

  hilo.test = function (con) {
    return new Test(con);
  };

  Test = function (con, neg) {
    this.con = con;
    if (neg) {
      this.neg = true;
    }
  };
  
  Test.prototype.ifEquals = function (tw) {
    var val = this.con === tw;
    return this.neg ? !val : val;
  };

  Test.prototype.ifContains = function (tw) {
    var ifString = this.con.split(tw).length === 1 ? false : true;
    if (typeof tw === 'string' && typeof this.con === 'object' && this.con.length) {

    } else if (typeof tw === 'string' && typeof this.con === 'string') {
      return this.neg ? !ifString : ifString;
    }
  };
  
  Test.prototype.ifIs = function (tw) {
    var val = this.con === tw;
    return this.neg ? !val : val;
  };
  
  hiloAjax = function (config) {
      
    /*
    
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
    
    */

    
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
  
  Dom = function (els) {
    var _i, _l;

    for (_i = 0, _l = els.length; _i < _l; _i+=1) {
      this[_i] = els[_i];
    }

    this.length = els.length;
  };

  createEl = function (tagName, attrs) {
    var el = new Dom([document.createElement(tagName)]), key;

    if (attrs) {
      if (attrs.className) {
        el.addClass(attrs.className);
        delete attrs.className;
      }

      if (attrs.text) {
        el.text(attrs.text);
        delete attrs.text;
      }

      for (key in attrs) {
        if(attrs.hasOwnProperty(key)) {
          el.attr(key, attrs['key']);
        }
      }
    }

    return el;
  };

  hilo.create = createEl;
  
  /*!
   * Qwery - A Blazing Fast query selector engine
   * https://github.com/ded/qwery
   * copyright Dustin Diaz 2012
   * MIT License
   */

  select = (function () {
    var html = doc.documentElement
      , byClass = 'getElementsByClassName'
      , byTag = 'getElementsByTagName'
      , qSA = 'querySelectorAll'
      , useNativeQSA = 'useNativeQSA'
      , tagName = 'tagName'
      , nodeType = 'nodeType'
      , select // main select() method, assign later

      , id = /#([\w\-]+)/
      , clas = /\.[\w\-]+/g
      , idOnly = /^#([\w\-]+)$/
      , classOnly = /^\.([\w\-]+)$/
      , tagOnly = /^([\w\-]+)$/
      , tagAndOrClass = /^([\w]+)?\.([\w\-]+)$/
      , splittable = /(^|,)\s*[>~+]/
      , normalizr = /^\s+|\s*([,\s\+\~>]|$)\s*/g
      , splitters = /[\s\>\+\~]/
      , splittersMore = /(?![\s\w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^'"]*\]|[\s\w\+\-]*\))/
      , specialChars = /([.*+?\^=!:${}()|\[\]\/\\])/g
      , simple = /^(\*|[a-z0-9]+)?(?:([\.\#]+[\w\-\.#]+)?)/
      , attr = /\[([\w\-]+)(?:([\|\^\$\*\~]?\=)['"]?([ \w\-\/\?\&\=\:\.\(\)\!,@#%<>\{\}\$\*\^]+)["']?)?\]/
      , pseudo = /:([\w\-]+)(\(['"]?([^()]+)['"]?\))?/
      , easy = new RegExp(idOnly.source + '|' + tagOnly.source + '|' + classOnly.source)
      , dividers = new RegExp('(' + splitters.source + ')' + splittersMore.source, 'g')
      , tokenizr = new RegExp(splitters.source + splittersMore.source)
      , chunker = new RegExp(simple.source + '(' + attr.source + ')?' + '(' + pseudo.source + ')?')

      , walker = {
        ' ': function (node) {
          return node && node !== html && node.parentNode;
        }
      , '>': function (node, contestant) {
          return node && node.parentNode === contestant.parentNode && node.parentNode;
        }
      , '~': function (node) {
          return node && node.previousSibling;
        }
      , '+': function (node, contestant, p1, p2) {
          if (!node) {
            return false;
          }

          return (p1 = previous(node)) && (p2 = previous(contestant)) && p1 === p2 && p1;
        }
      }
      , classCache
      , cleanCache
      , attrCache
      , tokenCache
      , isAncestor
      , getAttr
      , hasByClass
      , hasQSA
      , selectQSA
      , selectNonNative
      , configure;

    function Cache() {
      this.c = {};
    }
    Cache.prototype = {
      g: function (k) {
        return this.c[k] || undefined;
      }
    , s: function (k, v, r) {
        v = r ? new RegExp(v) : v;
        return (this.c[k] = v);
      }
    };

    classCache = new Cache();
    cleanCache = new Cache();
    attrCache = new Cache();
    tokenCache = new Cache();

    function classRegex(c) {
      return classCache.g(c) || classCache.s(c, '(^|\\s+)' + c + '(\\s+|$)', 1);
    }
    // not quite as fast as inline loops in older browsers so don't use liberally
    function each(a, fn) {
      var i = 0, l = a.length;
      for (; i < l; i++) {
        fn(a[i]);
      }
    }
    function flatten(ar) {
      for (var r = [], i = 0, l = ar.length; i < l; ++i) {
        if (arrayLike(ar[i])) {
          r = r.concat(ar[i]);
        } else {
          r[r.length] = ar[i];
        }
      }
      return r;
    }
    function arrayify(ar) {
      var i = 0, l = ar.length, r = [];
      for (; i < l; i++) {
        r[i] = ar[i];
      }
      return r;
    }
    function previous(n) {
      while (n = n.previousSibling) {
        if (n[nodeType] === 1) {
          break;
        }
      }
      return n;
    }
    function q(query) {
      return query.match(chunker);
    }
    // called using `this` as element and arguments from regex group results.
    // given => div.hello[title="world"]:foo('bar')
    // div.hello[title="world"]:foo('bar'), div, .hello, [title="world"], title, =, world, :foo('bar'), foo, ('bar'), bar]
    function interpret(whole, tag, idsAndClasses, wholeAttribute, attribute, qualifier, value, wholePseudo, pseudo, wholePseudoVal, pseudoVal) {
      var i, m, k, o, classes, thisRef = this;
      if (thisRef[nodeType] !== 1) {
        return false;
      }
      if (tag && tag !== '*' && thisRef[tagName] && thisRef[tagName].toLowerCase() !== tag) {
        return false;
      }
      if (idsAndClasses && (m = idsAndClasses.match(id)) && m[1] !== thisRef.id) {
        return false;
      }
      if (idsAndClasses && (classes = idsAndClasses.match(clas))) {
        for (i = classes.length; i--;) {
          if (!classRegex(classes[i].slice(1)).test(thisRef.className)) {
            return false;
          }
        }
      }
      if (pseudo && qwery.pseudos[pseudo] && !qwery.pseudos[pseudo](thisRef, pseudoVal)) {
        return false;
      }
      if (wholeAttribute && !value) { // select is just for existance of attrib
        o = thisRef.attributes;
        for (k in o) {
          if (Object.prototype.hasOwnProperty.call(o, k) && (o[k].name || k) === attribute) {
            return thisRef;
          }
        }
      }
      if (wholeAttribute && !checkAttr(qualifier, getAttr(thisRef, attribute) || '', value)) {
        // select is for attrib equality
        return false;
      }
      return thisRef;
    }
    function clean(s) {
      return cleanCache.g(s) || cleanCache.s(s, s.replace(specialChars, '\\$1'));
    }
    function checkAttr(qualify, actual, val) {
      switch (qualify) {
      case '=':
        return actual === val;
      case '^=':
        return actual.match(attrCache.g('^=' + val) || attrCache.s('^=' + val, '^' + clean(val), 1));
      case '$=':
        return actual.match(attrCache.g('$=' + val) || attrCache.s('$=' + val, clean(val) + '$', 1));
      case '*=':
        return actual.match(attrCache.g(val) || attrCache.s(val, clean(val), 1));
      case '~=':
        return actual.match(attrCache.g('~=' + val) || attrCache.s('~=' + val, '(?:^|\\s+)' + clean(val) + '(?:\\s+|$)', 1));
      case '|=':
        return actual.match(attrCache.g('|=' + val) || attrCache.s('|=' + val, '^' + clean(val) + '(-|$)', 1));
      }
      return 0;
    }
    // given a selector, first check for simple cases then collect all base candidate matches and filter
    function _qwery(selector, _root) {
      var r = [], ret = [], i, l, m, token, els, intr, item, root = _root
        , tokens = tokenCache.g(selector) || tokenCache.s(selector, selector.split(tokenizr))
        , dividedTokens = selector.match(dividers);

      if (!tokens.length) {
        return r;
      }

      token = (tokens = tokens.slice(0)).pop(); // copy Cached tokens, take the last one
      if (tokens.length && (m = tokens[tokens.length - 1].match(idOnly))) {
        root = byId(_root, m[1]);
      }
      if (!root) {
        return r;
      }

      intr = q(token);
      // collect base candidates to filter
      els = root !== _root && root[nodeType] !== 9 && dividedTokens && /^[+~]$/.test(dividedTokens[dividedTokens.length - 1]) ?
        (function (r) {
          while (root = root.nextSibling) {
            return root[nodeType] === 1 && (intr[1] ? intr[1] === root[tagName].toLowerCase() : 1) && (r[r.length] = root);
          }
          return r;
        }([])) :
        root[byTag](intr[1] || '*');
      // filter elements according to the right-most part of the selector
      for (i = 0, l = els.length; i < l; i++) {
        if (item = interpret.apply(els[i], intr)) {
          r[r.length] = item;
        }
      }
      if (!tokens.length) {
        return r;
      }

      // filter further according to the rest of the selector (the left side)
      each(r, function (e) {
        if (ancestorMatch(e, tokens, dividedTokens)) {
          ret[ret.length] = e;
        }
      });

      return ret;
    }
    // compare element to a selector
    function is(el, selector, root) {
      if (isNode(selector)) {
        return el === selector;
      }
      if (arrayLike(selector)) {
        return !!~flatten(selector).indexOf(el); // if selector is an array, is el a member?
      }

      var selectors = selector.split(','), tokens, dividedTokens;
      while (selector = selectors.pop()) {
        tokens = tokenCache.g(selector) || tokenCache.s(selector, selector.split(tokenizr));
        dividedTokens = selector.match(dividers);
        tokens = tokens.slice(0); // copy array
        if (interpret.apply(el, q(tokens.pop())) && (!tokens.length || ancestorMatch(el, tokens, dividedTokens, root))) {
          return true;
        }
      }
      return false;
    }
    // given elements matching the right-most part of a selector, filter out any that don't match the rest
    function ancestorMatch(el, tokens, dividedTokens, root) {
      var cand;
      // recursively work backwards through the tokens and up the dom, covering all options
      function crawl(e, i, p) {
        while (p = walker[dividedTokens[i]](p, e)) {
          if (isNode(p) && (interpret.apply(p, q(tokens[i])))) {
            if (i) {
              if (cand = crawl(p, i - 1, p)) {
                return cand;
              }
            } else {
              return p;
            }
          }
        }
      }
      return (cand = crawl(el, tokens.length - 1, el)) && (!root || isAncestor(cand, root));
    }
    function isNode(el, t) {
      return el && typeof el === 'object' && (t = el[nodeType]) && (t === 1 || t === 9);
    }
    function uniq(ar) {
      var a = [], i, j;
      o:
      for (i = 0; i < ar.length; ++i) {
        for (j = 0; j < a.length; ++j) {
          if (a[j] === ar[i]) {
            continue o;
          }
        }
        a[a.length] = ar[i];
      }
      return a;
    }
    function arrayLike(o) {
      return (typeof o === 'object' && isFinite(o.length));
    }
    function normalizeRoot(root) {
      if (!root) {
        return doc;
      }
      if (typeof root === 'string') {
        return qwery(root)[0];
      }
      if (!root[nodeType] && arrayLike(root)) {
        return root[0];
      }

      return root;
    }
    function byId(root, id, el) {
      // if doc, query on it, else query the parent doc or if a detached fragment rewrite the query and run on the fragment
      return root[nodeType] === 9 ? root.getElementById(id) : root.ownerDocument &&
          (((el = root.ownerDocument.getElementById(id)) && isAncestor(el, root) && el) ||
            (!isAncestor(root, root.ownerDocument) && select('[id="' + id + '"]', root)[0]));
    }
    function qwery(selector, _root) {
      var m, el, root = normalizeRoot(_root);

      // easy, fast cases that we can dispatch with simple DOM calls
      if (!root || !selector) {
        return [];
      }
      if (selector === window || isNode(selector)) {
        return !_root || (selector !== window && isNode(root) && isAncestor(selector, root)) ? [selector] : [];
      }
      if (selector && arrayLike(selector)) {
        return flatten(selector);
      }
      if (m = selector.match(easy)) {
        if (m[1]) {
          return (el = byId(root, m[1])) ? [el] : [];
        }
        if (m[2]) {
          return arrayify(root[byTag](m[2]));
        }
        if (hasByClass && m[3]) {
          return arrayify(root[byClass](m[3]));
        }
      }

      return select(selector, root);
    }
    // where the root is not document and a relationship selector is first we have to
    // do some awkward adjustments to get it to work, even with qSA
    function collectSelector(root, collector) {
      return function (s) {
        var oid, nid;
        if (splittable.test(s)) {
          if (root[nodeType] !== 9) {
            // make sure the el has an id, rewrite the query, set root to doc and run it
            if (!(nid = oid = root.getAttribute('id'))) {
              root.setAttribute('id', nid = '__qwerymeupscotty');
            }
            s = '[id="' + nid + '"]' + s; // avoid byId and allow us to match context element
            collector(root.parentNode || root, s, true);
            return oid || root.removeAttribute('id');
          }
          return;
        }
        return s.length && collector(root, s, false);
      };
    }
    isAncestor = 'compareDocumentPosition' in html ?
      function (element, container) {
        return (container.compareDocumentPosition(element) & 16) === 16;
      } : 'contains' in html ?
      function (element, container) {
        container = container[nodeType] === 9 || container === window ? html : container;
        return container !== element && container.contains(element);
      } :
      function (element, container) {
        while (element = element.parentNode) {
          if (element === container) {
            return 1;
          }
        }
        return 0;
      };
    getAttr = (function () {
      // detect buggy IE src/href getAttribute() call
      var e = doc.createElement('p');
      return ((e.innerHTML = '<a href="#x">x</a>') && e.firstChild.getAttribute('href') !== '#x') ?
        function (e, a) {
          return a === 'class' ? e.className : (a === 'href' || a === 'src') ?
            e.getAttribute(a, 2) : e.getAttribute(a);
        } :
        function (e, a) { return e.getAttribute(a); };
    }());
    hasByClass = !!doc[byClass];
      // has native qSA support
    hasQSA = doc.querySelector && doc[qSA];
      // use native qSA
    selectQSA = function (selector, root) {
      var result = [], ss, e;
      try {
        if (root[nodeType] === 9 || !splittable.test(selector)) {
          // most work is done right here, defer to qSA
          return arrayify(root[qSA](selector));
        }
        // special case where we need the services of `collectSelector()`
        each(ss = selector.split(','), collectSelector(root, function (ctx, s) {
          e = ctx[qSA](s);
          if (e.length === 1) {
            result[result.length] = e.item(0);
          }
          else if (e.length) {
            result = result.concat(arrayify(e));
          }
        }));
        return ss.length > 1 && result.length > 1 ? uniq(result) : result;
      } catch (ex) { }
      return selectNonNative(selector, root);
    };
    // no native selector support
    selectNonNative = function (selector, root) {
      var result = [], items, m, i, l, r, ss;
      selector = selector.replace(normalizr, '$1');
      if (m = selector.match(tagAndOrClass)) {
        r = classRegex(m[2]);
        items = root[byTag](m[1] || '*');
        for (i = 0, l = items.length; i < l; i++) {
          if (r.test(items[i].className)) {
            result[result.length] = items[i];
          }
        }
        return result;
      }
      // more complex selector, get `_qwery()` to do the work for us
      each(ss = selector.split(','), collectSelector(root, function (ctx, s, rewrite) {
        r = _qwery(s, ctx);
        for (i = 0, l = r.length; i < l; i++) {
          if (ctx[nodeType] === 9 || rewrite || isAncestor(r[i], root)) {
            result[result.length] = r[i];
          }
        }
      }));
      return ss.length > 1 && result.length > 1 ? uniq(result) : result;
    };
    configure = function (options) {
      // configNativeQSA: use fully-internal selector or native qSA where present
      if (typeof options[useNativeQSA] !== 'undefined') {
        select = !options[useNativeQSA] ? selectNonNative : hasQSA ? selectQSA : selectNonNative;
      }
    };
    configure({ useNativeQSA: true });
    qwery.configure = configure;
    qwery.uniq = uniq;
    qwery.is = is;
    qwery.pseudos = {};
    return qwery;
  }());
  
  // Helper Functions

  Dom.prototype.each = function (fn) {
    this.map(fn);
    return this;
  };

  Dom.prototype.map = function (fn) {
    var results = [], _i, _l;
    for (_i = 0, _l = this.length; _i < _l; _i += 1) {
      results.push(fn.call(this, this[_i], _i));
    }
    return results;
  };
  
  Dom.prototype.one = function (fn) {
    var m = this.map(fn);
    return m.length > 1 ? m : m[0];
  };

  Dom.prototype.filter = function (fun) {
    var len = this.length >>> 0
      , _i
      , t = Object(this)
      , res = []
      , val;

    for (_i = 0; _i < len; _i++)
    {
      if (_i in t)
      {
        val = t[_i]; // in case fun mutates this
        if (fun.call(this, val, _i, t)) {
          res.push(val);
        }
      }
    }

    return new Dom(res);
  };

  // Element Selections

  Dom.prototype.first = function () {
    return new Dom([this[0]]);
  };
  
  Dom.prototype.last = function () {
    return new Dom([this[this.length - 1]]);
  };
  
  Dom.prototype.el = function (place) {
    return new Dom([this[place - 1]]);
  };

  Dom.prototype.children = function (sel) {
    var children = [], _i;
    if (sel) {
      return this.each(function (el) {
        var s = select(sel, el);
        for (_i = 0; _i < s.length; _i++) {
          children = children.concat(s[_i]);
        }
      });
    } else {
      return this.each(function (el) {
        for (_i = 0; _i < el.children.length; _i++) {
          children = children.concat(el.children[_i]);
        }
      });
    }
    return children;
  };

  Dom.prototype.parent = function () {
    return this.one(function (el) {
      return new Dom([el.parentElement]);
    });
  };

  Dom.prototype.parents = function () {
    var pars = [];

    this.each(function (el) {
      pars = pars.concat(el.parentElement);
    });

    return new Dom(pars);
  };

  Dom.prototype.rel = function (sul) {
    var els = [];

    return this.each(function (el) {
      els.push(el[sul]);
    });
  };

  Dom.prototype.next = function () {
    this.rel('nextSibling');
  };
  
  Dom.prototype.html = function (htmlCode) {
    if (htmlCode) {
      return this.each(function(el) {
        el.innerHTML = htmlCode;
      });
    } else {
      return this.one(function(el) {
        return el.innerHTML;
      });
    }
  };

  Dom.prototype.text = function (text) {
    if (text) {
      return this.each(function(el) {
        el.innerText = text;
      });
    } else {
      return this.one(function(el) {
        return el.innerText;
      });
    }
  };
  
  Dom.prototype.append = function (html) {
    return this.each(function (el) {
      el.innerHTML += html;
    });
  };
  
  Dom.prototype.appendText = function (text) {
    return this.each(function (el) {
      el.innerText += text;
    });
  };

  Dom.prototype.prepend = function (html) {
    return this.each(function (el) {
      el.innerHTML = html + el.innerHTML;
    });
  };
  
  Dom.prototype.value = function (val) {
    if (val) {
      return this.each(function (el) {
        el.value = val;
      });
    } else {
      this.one(function (el) {
        return el.value;
      });
    }
  };
  
  Dom.prototype.id = function (id) {
    if(id) {
      return this.each(function(el) {
        el.id = id;
      });
    } else {
      this.one(function (el) {
        return el.id;
      });
    }
  };

  Dom.prototype.addClass = feature.classList === true ? function (className) {
    return this.each(function (el) {
      var _i, parts;

      if (typeof className === 'string') { // String
        parts = className.split(" ");

        if (parts.length === 1) {
          if (!el.classList.contains(className)) {
            el.classList.add(className);
          }
        } else {
          for (_i = 0; _i < parts.length; _i += 1) {
            if (!el.classList.contains(parts[_i])) {
              el.classList.add(parts[_i]);
            }
          }
        }
      } else if (className.length) { // An array
        for (_i = 0; _i < className.length; _i += 1) {
          if (!el.classList.contains(className[_i])) {
            el.classList.add(className[_i]);
          }
        }
      }
    });
  } :
  function (className) {
    return this.each(function (el) {
      var _i, parts;

      if (typeof className === 'string') {
        parts = className.split(" ");
        if (parts.length === 1) {
          if (el.className === '') {
            el.className = className;
          } else {
            el.className += ' ' + className;
          }
        } else {
          for (_i = 0; _i < parts.length; _i += 1) {
            el.className += ' ' + parts[_i];
          }
        }
      } else if (className.length) {
        if (className.length > 1) {
          for (_i = 0; _i < className.length; _i += 1) {
            el.className += ' ' + className[_i];
          }
        } else {
          for (_i = 0; _i < className.length; _i += 1) {
            el.className += className[_i];
          }
        }
      }
    });
  };

  Dom.prototype.removeClass = feature.classList === true ? function (className) {
    this.each(function (el) {
      var _i, parts;
      if (typeof className === 'string') { // String
        parts = className.split(" ");

        if (parts.length === 1) {
          if (el.classList.contains(className)) {
            el.classList.remove(className);
          }
        } else {
          for (_i = 0; _i < parts.length; _i += 1) {
            if (el.classList.contains(parts[_i])) {
              el.classList.remove(parts[_i]);
            }
          }
        }
      } else if (className.length) { // An array
        for (_i = 0; _i < className.length; _i += 1) {
          if (el.classList.contains(className[_i])) {
            el.classList.remove(className[_i]);
          }
        }
      }
    });
  } : function (className) {
    return this.each(function (el) {
      var _i, parts;
      if (typeof className === 'string') {
        parts = className.split(" ");
        if (parts.length === 1) {
          el.className.replace(className, "");
        } else {
          for (_i = 0; _i < parts.length; _i += 1) {
            el.className.replace(parts[_i], "");
          }
        }
      } else if (className.length) {
        for (_i = 0; _i < className.length; _i += 1) {
          el.className.replace(className[_i], "");
        }
      }
    });
  };

  Dom.prototype.hasClass = feature.classList ? function (className) {
    this.one(function (el) {
      var _i, parts, res = [];
      if (typeof className === 'string') { // String
        parts = className.split(" ");

        if (parts.length === 1) {
          if (el.classList.contains(className)) {
            res = el.classList.has(className);
          }
        } else {
          for (_i = 0; _i < parts.length; _i += 1) {
            if (el.classList.contains(parts[_i])) {
              res = res.concat(el.classList.has(parts[_i]));
            }
          }
        }
      } else if (className.length) { // An array
        for (_i = 0; _i < className.length; _i += 1) {
          if (el.classList.contains(className[_i])) {
            res = res.concat(el.classList.has(className[_i]));
          }
        }
      }

      return typeof res === 'boolean' ? res : res.every(function (el) {
        return el === true;
      });
    });
  }: function (className) {
    return this.one(function (el) {
      var _i, parts, res;
      if (typeof className === 'string') {
        parts = className.split(" ");
        if (parts.length === 1) {
          return !!(el.className.indexOf(className));
        } else {
          for (_i = 0; _i < parts.length; _i += 1) {
            res = res.concat(el.className.indexOf(parts[_i]));
          }
        }
      } else if (className.length) {
        for (_i = 0; _i < className.length; _i += 1) {
          res = res.concat(el.className.indexOf(className[_i]));
        }
      }

      return res.every(function (el) {
        return el === true;
      });
    });
  };
  
  Dom.prototype.attr = function (name, val) {
    if(val) {
      this.each(function(el) {
        el.setAttribute(name, val);
      });

      return new Dom(this);
    } else {
      this.one(function (el) {
        return el[name];
      });
    }
  };
  
  Dom.prototype.css = function (prop, value) {
    if (value) {
      return this.each(function (el) {
        el.style[prop] = value;
      });
    } else {
      return this.one(function (el) {
        return el.style[prop];
      });
    }
  };

  impCss = [
    "width",
    "height",
    "fontFamily",
    "fontWeight",
    "fontDecoration",
    "textAlign",
    "textTransform",
    "color",
    "backgroundColor",
    "background",
    "margin",
    "padding",
    "top",
    "left",
    "bottom",
    "right"
    ];
  
  for(_i; _i < impCss; _i += 1) {
    Dom.prototype[impCss[_i]] = function (val) {
      this.css(impCss[_i], val);
    };
  }

  Dom.prototype.computed = function (prop) {
    return this.one(function (el) {
      return win.getComputedStyle(el)[prop];
    });
  };

  Dom.prototype.outerWidth = function () {
    return parseFloat(this.computed('width')) + parseFloat(this.computed('paddingLeft')) + parseFloat(this.computed('paddingRight')) + parseFloat(this.computed('borderLeft')) + parseFloat(this.computed('borderRight')) + "px";
  };

  Dom.prototype.innerWidth = function () {
    return parseFloat(this.computed('width')) + parseFloat(this.computed('paddingLeft')) + parseFloat(this.computed('paddingRight')) + "px";
  };

  Dom.prototype.outerHeight = function () {
    return parseFloat(this.computed('height')) + parseFloat(this.computed('paddingTop')) + parseFloat(this.computed('paddingBottom')) + parseFloat(this.computed('borderTop')) + parseFloat(this.computed('borderBottom')) + "px";
  };

  Dom.prototype.innerHeight = function () {
    return parseFloat(this.computed('height')) + parseFloat(this.computed('paddingTop')) + parseFloat(this.computed('paddingBottom')) + "px";
  };

  Dom.prototype.get = function () {
    var els = [];

    this.each(function (el) {
      els.push(el);
    });

    return els;
  };
  
  Dom.prototype.on = (function () {
    if (document.addEventListener) {
      return function (evt, fn) {
        return this.each(function (el) {
          el.addEventListener(evt, fn, false);
        });
      };
    } else if (document.attachEvent)  {
      return function (evt, fn) {
        return this.each(function (el) {
          el.attachEvent("on" + evt, fn);
        });
      };
    } else {
      return function (evt, fn) {
        return this.each(function (el) {
          el["on" + evt] = fn;
        });
      };
    }
  }());

  Dom.prototype.off = (function () {
    if (document.removeEventListener) {
      return function (evt, fn) {
        return this.each(function (el) {
          el.removeEventListener(evt, fn, false);
        });
      };
    } else if (document.detachEvent)  {
      return function (evt, fn) {
        return this.each(function (el) {
          el.detachEvent("on" + evt, fn);
        });
      };
    } else {
      return function (evt) {
        return this.each(function (el) {
          el["on" + evt] = null;
        });
      };
    }
  }());
  
  Dom.prototype.ready = function (fn) {
    this.each(function (el) {
      el.onreadystatechange = function () {
        if (el.readyState = 'complete') {
          fn();
        }
      };
    });
  };

  impEvts = [
    "click",
    "change",
    "dblclick",
    "drag",
    "dragstart",
    "dragend",
    "dragenter",
    "dragleave",
    "dragover",
    "drop",
    "error",
    "focus",
    "keyup",
    "keydown",
    "keypress",
    "mouseover",
    "mousemove",
    "mouseout",
    "ready",
    "load"
    ];

  for (_i = 0; _i < impEvts.length; _i += 1) {
    Dom.prototype[impEvts[_i]] = function (fn) {
      this.on(impEvts[_i], fn);
    };
  }

  // Effects

  Dom.prototype.show = function (display) {
    display = display || '';
    this.each(function (el) {
      el.style.display = display;
    });

    return new Dom(this);
  };

  Dom.prototype.hide = function () {
    this.each(function (el) {
      el.style.display = 'none';
    });

    return new Dom(this);
  };

  Dom.prototype.toggle = function (display) {
    this.each(function (el) {
      if (el.style.display === 'none') {
        el.style.display = display ? display : '';
      } else {
        el.style.display = 'none';
      }
    });

    return new Dom(this);
  };

  Dom.prototype.appear = function () {
    this.each(function (el) {
      el.style.opacity = "1";
    });

    return new Dom(this);
  };

  Dom.prototype.disappear = function () {
    this.each(function (el) {
      el.style.opacity = "0";
      el.style.cusor = "default";
    });

    return new Dom(this);
  };

  Dom.prototype.toggleVisibility = function () {
    this.each(function (el) {
      if (el.style.opacity === "0") {
        el.style.opacity = "1";
      } else {
        el.style.opacity = "0";
        el.style.cusor = "default";
      }
    });

    return new Dom(this);
  };
  
  Dom.prototype.ui = {};
  
  hilo.Dom = Dom.prototype;
  hilo.Test = Test.prototype;
  hilo.qwery = select.pseudos;
  
  doc.onreadystatechange = function () {
    if (doc.readyState === 'complete') {
      for (_i = 0; _i < callbacks.length; _i += 1) {
        callbacks[_i]();
      }
    }
  };

  win.$ = hilo; // Shorthand

  return hilo;
}());
