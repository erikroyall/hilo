  // Dom.prototype.anim = function (dur, prop, options) {
  //   var ease, easing = {}, fade = {}, animate;

  //   function parseCSS (value) {
  //     var n = parseFloat (value);
  //     return {
  //       number: n,
  //       units: value.replace(n, '')
  //     };
  //   }

  //   animate = function (dur, prop, options) {
      
  //   };

  //   easing.linear = function (pos) {
  //     return pos;
  //   };

  //   easing.sine = function (pos) {
  //     return (-Math.cos(pos * Math.PI) / 2) + 0.5;
  //   };

  //   easing.bounce = function (pos) {
  //     if (pos < (1 / 2.75 )) {
  //       return 7.6 * pos * pos ;
  //     } else if (pos < (2 /2.75 )) {
  //       return 7.6 * (pos -= (1.5 / 2.75 )) * pos + 0.74 ;
  //     } else if (pos < (2.5 / 2.75 )) {
  //       return 7.6 * (pos -= (2.25 / 2.75 )) * pos + 0.91 ;
  //     } else {
  //       return 7.6 * (pos -= (2.625 / 2.75 )) * pos + 0.98 ;
  //     }
  //   };

  //   fade.fadeIn = function (options) {
  //     element.style.opacity = options.from ;
  //     animate(dur, { 'opacity': options.to }, { 'easing': options.easing })
  //   };

  //   if (options.hasOwnProperty('easing')) {
  //     if (typeof options.easing === 'string') {
  //       ease = easing[options.easing];
  //     } else {
  //       ease = options.easing;
  //     }
  //   }
  // };
