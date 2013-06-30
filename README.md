Hilo
====
_0.1.0 pre dev beta_

Hilo is a lightning fast Open Source JavaScript Framework and library that makes developing awesome websites easy. With Hilo, you won't have to worry about speed or backwards compatibility. All these are provided to you. It all depends on how you make use of it.

## Features

- DOM Manipulation
- Feature Detection
- Events
- More JavaScript (Validation, Strings, etc.)
- Animation (soon..)
- AJAX (very soon..)

## Usage

**Note: Hilo is currently under development. Even a public beta version is not yet released. The current version is _0.1.0 pre dev beta_ .**

Add Hilo in the `<head>` or `<body>` section of your page.

```html
  <head>
    ...
    <script type="text/javascript"></script>
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
