Hilo
====
_0.1.0 pre dev beta_ - **0.1.0-pre-dev-beta-4**

Hilo is a lightning fast Open Source JavaScript Framework and library that makes developing awesome websites easy. With Hilo, you won't have to worry about speed or backwards compatibility. All these are provided to you. It all depends on how you make use of it.

## Features

- DOM Manipulation
- Feature Detection
- Events
- AJAX

## Usage

**Note: Hilo is currently under development. Even a public beta version is not yet released. The current version is _0.1.0 pre dev beta_ .**

Add Hilo in the `<head>` or `<body>` section of your page.

```html
  <head>
    ...
    <script type="text/javascript" src="hilo.js"></script>
  </head>
  ...
```

Create another `<script>` and write Hilo code there.

```html
<script>
  $(function () {
    $('div').click(function () {
      $(this).toggle();
    });
  });
</script>
```

## About Hilo

### Name

Well, it's a weird name. The reason behind choosing this name is
that the author of Hilo, Erik Royall, likes to write *Hilo Wald*
programs instead of _Hello World_ programs. And when he got the
idea of writing a JavaScript library he used the first word in
*Hilo Wald* as the name for the library. 
_Note: The name **Wald** will undoubtedly be used as a name for_
_his next project so..._

### License

Copyright (c) 2013 **Erik Royall**

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
