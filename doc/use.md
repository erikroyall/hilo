## Using Hilo

To use Hilo in a web page, it needs to be downloaded and copied 
to a path in your working directory.

Add Hilo in the `<head>` or `<body>` section of your page.

```<head>
  ...
  <script type="text/javascript" src="hilo.js"></script>
</head>
...
```

or

```<body>
  ...
  <script type="text/javascript" src="hilo.js"></script>
</body>
```

Create another `<script>` and write Hilo code there.

```<script>
  $(function () {
    $('div').click(function () {
      $(this).toggle();
    });
  });
</script>
```
