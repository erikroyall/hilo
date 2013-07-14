/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/* <%= pkg.title %> - <%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * http://erikroyall.github.com/<%= pkg.name %>/\n' +
      ' * Copyright (c) 2013 Erik Royall and <%= pkg.title %> contributors\n' +
      ' * Licensed under <%= pkg.license %> (see LICENSE-MIT) \n */\n\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: [
          'src/start.js',
          'src/core.js',
          'src/detect/feature.js',
          'src/detect/browser.js',
          'src/test/main.js',
          'src/test/comp.js',
          'src/ajax/main.js',
          'src/dom/main.js',
          'src/dom/qwery.js',
          'src/dom/helpers.js',
          'src/dom/els.js',
          'src/dom/manp.js',
          'src/dom/class-id.js',
          'src/dom/css.js',
          'src/dom/misc.js',
          'src/evt/helpers.js',
          'src/evt/simple.js',
          'src/fx/simple.js',
          'src/dom/ui.js',
          'src/ext.js',
          'src/end.js'
          ],
        dest: 'build/<%= pkg.name %>-dev.js'
      }
    },
    uglify: {
      hilo: {
        files: {
          'build/<%= pkg.name %>-dev.min.js' : ['build/<%= pkg.name %>-dev.js']
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        laxcomma: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          console: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      hilo: {
        src: 'build/<%= pkg.name %>-dev.js'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      hilo: {
        files: '<%= concat.dist.src %>',
        tasks: ['concat', 'uglify:hilo', 'jshint:hilo']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask('default', ['concat', 'uglify:hilo', 'jshint', 'watch']);
  grunt.registerTask('release', ['concat']);

};
