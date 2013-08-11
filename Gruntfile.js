/*global module:false*/

module.exports = function(grunt) {

  "use strict";

  // Run: "grunt --no-color --force" without the quotes
  // and keep it clean

  var itsbeen = " * "
    , st = new Date(1375182296792)
    , ct = new Date()
    , diff = {
      y: ct.getFullYear() - st.getFullYear(),
      m: ct.getMonth() - st.getMonth(),
      d: ct.getDate() - st.getDate()
    };

  itsbeen += "Project started before ";
  itsbeen += (diff.y === 0) ? "" : diff.y === 1 ? 1 + " year, " : ((diff.y < 0 ? 30 - Math.abs(diff.y) : diff.y) + " years") + " and "; 
  itsbeen += (diff.m === 0) ? "" : diff.m === 1 ? 1 + " month and " : ((diff.m < 0 ? 30 - Math.abs(diff.m) : diff.m) + " months") + " and "; 
  itsbeen += (diff.d === 0) ? "" : diff.d === 1 ? 1 + " day " : ((diff.d < 0 ? 30 - Math.abs(diff.d) : diff.d) + " days"); 
  itsbeen += "\n";
  
  grunt.initConfig({
    
    pkg: grunt.file.readJSON("package.json"),
    banner: "/*! \n * <%= pkg.title %> - <%= pkg.version %> - " +
      "<%= grunt.template.today(\"yyyy-mm-dd\") %>\n" +
      itsbeen +
      " * http://erikroyall.github.com/<%= pkg.name %>/\n" +
      " * Copyright (c) 2013 Erik Royall\n" +
      " * Licensed under <%= pkg.license %> (see LICENSE-MIT) \n */\n\n",
    
    concat: {
      options: {
        banner: "<%= banner %>",
        stripBanners: true
      },
      dist: {
        src: [
          "src/start.js",
          "src/detect/browser.js",
          "src/detect/feature.js",
          "src/dom/sizzle.js",
          "src/es/util.js",
          "src/core.js",
          "src/test/main.js",
          "src/test/comp.js",
          "src/shim/shims.js",
          "src/ajax/main.js",
          "src/ajax/more.js",
          "src/dom/main.js",
          "src/dom/helpers.js",
          "src/dom/els.js",
          "src/dom/manp.js",
          "src/dom/class-id.js",
          "src/dom/css.js",
          "src/dom/misc.js",
          "src/evt/helpers.js",
          "src/evt/simple.js",
          "src/fx/simple.js",
          "src/detect/classify.js",
          "src/evt/keymap.js",
          "src/ext.js",
          "src/end.js"
          ],
        dest: "build/<%= pkg.name %>-dev.js"
      }
    },
    uglify: {
      hilo: {
        files: {
          "build/<%= pkg.name %>-dev.min.js" : ["build/<%= pkg.name %>-dev.js"]
        }
      }
    },
    jasmine: {
      options: {
        helpers: "build/hilo-dev.js"
      },
      hilo: {
        src: "test/spec/**/*.spec.js"
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
        src: "Gruntfile.js"
      },
      hilo: {
        src: "build/<%= pkg.name %>-dev.js"
      }
    },
    watch: {
      gruntfile: {
        files: "<%= jshint.gruntfile.src %>",
        tasks: ["jshint:gruntfile", "concat", "uglify:hilo", "jshint:hilo", "jasmine:hilo"]
      },
      hilo: {
        files: "<%= concat.dist.src %>",
        tasks: ["concat", "uglify:hilo", "jshint:hilo", "jasmine:hilo"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jasmine");

  
  grunt.registerTask("default", ["concat", "uglify:hilo", "jasmine:hilo", "jshint", "watch"]);
  grunt.registerTask("release", ["concat"]);

};
