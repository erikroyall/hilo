Getting Started Tutorial
========================

## What is Hilo?

Hilo.js (pronounces he-lo) is a JavaScript Framework / Library that 
helps you create *interactive* web applications with ease. If this 
sounds confusing, Hilo is something that makes writing JavaScript 
easy. Whatever you write using Hilo's API is JavaScript. Hilo is
also supported by legacy browsers like IE 7,8,9. So, it's backwards
compatible.

## Is Backwards compatibility important?

Yeah, sometimes. But it's completely optional. And it's not so easy
to support the maximum number of user agents (browsers).

Hilo supports IE7+, Chrome 1+, Firefox 2+, Opera 10+ and Safari 5+. 

## How it makes writing JavaScript eas(ier)y

Let's consider a situation where you need to do something on *click*
of button or something. If you want to do it with vanilla JavaScript
with backwards compatibility (old/legacy browser support), you would
write something like this:

Markup:

```
<button id="clickMe">Click me</button>
<span id="content">Hello World</span>
```

JavaScript:

```
(function () {
  var cl = document.getElementById('#clickMe')
    , el = document.getElementById('#content');

  function changeContent = function () {
    el.innerHTML = 'Hilo Wald';
  }

  if (document.addEventListener) {
    cl.addEventListener('click', changeContent, false);
  } else if (document.attachEvent) {
    el.attachEvent('onclick', changeContent);
  } else {
    el.onclick = changeContent;
  }
}());
```

That's just little code, right? And if you're going to do it with
Hilo, there's just a little code and that's not so confusing.

Hilo Code:

```
Hilo('#clickMe').click(function() {
  Hilo('#content').html('Hilo Wald');
});
```

Both gives you the exact same compatibility with same efficiency but
which one do you think is better?

## Hilo let's you do awesome things with a short, easy to learn API

Hilo is designed to be used by both professional and beginner JavaScript
programmers. And you don't even need to know JavaScript to understand
or learn Hilo.
