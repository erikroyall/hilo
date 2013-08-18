/*global module:false*/

module.exports = function(grunt) {

  "use strict";
  
  var itsbeen = "// "
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
    banner: "// ========================= \n" +
      "// <%= pkg.title %> - <%= pkg.version %>\n" +
      "// ========================= \n" + 
      "// <%= grunt.template.today(\"yyyy-mm-dd\") %>\n" +
      itsbeen +
      "// http://erikroyall.github.com/<%= pkg.name %>/\n" +
      "// Copyright (c) 2013 Erik Royall\n" +
      "// Licensed under <%= pkg.license %> (see LICENSE-MIT) \n\n",
    
    concat: {
      options: {
        banner: "<%= banner %>",
        stripBanners: true
      },
      dist: {
        src: [
          "src/start.js",
          "src/detect.js",
          "src/polyfill.js",
          "src/util.js",
          "src/core.js",
          "src/test.js",
          "src/ajax.js",
          "src/dom.js",
          "src/evt.js",
          "src/fx.js",
          "src/misc.js",
          "src/more.js",
          "src/end.js"
          ],
        dest: "build/<%= pkg.name %>.js"
      },
      legacy: {
        src: [
          "src/start.js",
          "src/detect.js",
          "src/polyfill.js",
          "src/sizzle.js",
          "src/util.js",
          "src/legacy.js",
          "src/core.js",
          "src/test.js",
          "src/ajax.js",
          "src/dom.js",
          "src/evt.js",
          "src/fx.js",
          "src/misc.js",
          "src/more.js",
          "src/end.js"
          ],
        dest: "build/<%= pkg.name %>-legacy.js"
      },
      release: {
        src: "<%= concat.dist.src %>",
        dest: "build/rls/<%= pkg.name %>-<%= pkg.version %>.js"
      }
    },
    uglify: {
      hilo: {
        files: {
          "build/<%= pkg.name %>.min.js" : ["build/<%= pkg.name %>.js"],
          "build/<%= pkg.name %>-legacy.min.js" : ["build/<%= pkg.name %>-legacy.js"]
        }
      }
    },
    jasmine: {
      options: {
        helpers: "build/hilo.js"
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
        src: "build/<%= pkg.name %>.js"
      },
      hiloLegacy: {
        src: "build/<%= pkg.name %>-legacy.js"
      }
    },
    watch: {
      gruntfile: {
        files: "<%= jshint.gruntfile.src %>",
        tasks: ["jshint:gruntfile", "concat:dist", "concat:legacy", "yuidoc", "uglify:hilo", "jshint:hilo", "jshint:hiloLegacy", "jasmine:hilo"]
      },
      hilo: {
        files: "<%= concat.dist.src %>",
        tasks: ["concat:dist", "concat:legacy", "yuidoc", "uglify:hilo", "jshint:hilo", "jshint:hiloLegacy", "jasmine:hilo"]
      }
    },
    yuidoc: {
      compile: {
        name: "<%= pkg.name %>",
        description: "<%= pkg.description %>",
        version: "<%= pkg.version %>",
        url: "<%= pkg.homepage %>",
        options: {
          paths: 'src',
          outdir: 'api_docs'
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-yuidoc");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jasmine");

  
  grunt.registerTask("default", ["concat:dist", "concat:legacy", "yuidoc", "uglify:hilo", "jasmine:hilo", "jshint", "watch"]);
  grunt.registerTask("release", ["concat:release", "yuidoc"]);

};
