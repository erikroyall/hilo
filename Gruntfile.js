/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title %> - v0.1.0 - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * http://erikroyall.github.com/hilo/\n' +
      ' * Copyright (c) 2013 Erik Royall\n' +
      ' * Licensed under <%= pkg.license %> (see LICENSE-MIT) \n */\n',
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
          'src/dom/main.js',
          'src/dom/helpers.js',
          'src/dom/els.js',
          'src/dom/manp.js',
          'src/dom/class-id.js',
          'src/dom/css.js',
          'src/dom/misc.js',
          'src/evt/helpers.js',
          'src/fx/simple.js',
          'src/feat/all.js',
          'src/end.js'
          ],
        dest: 'build/<%= pkg.name %>.js'
      }
    },
    uglify: {
      dist: {
        src: 'build/<% pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
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
        src: 'build/<%= pkg.name %>.js'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      }
    },
    yuidoc: {
    compile: {
      name: '<%= pkg.title %>',
      description: '<%= pkg.description %>',
      version: '<%= pkg.version %>',
      url: '<%= pkg.homepage %>',
      options: {
        paths: 'src/',
        outdir: 'doc/'
      }
    }
  }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-devtools');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'yuidoc', 'watch']);

};
