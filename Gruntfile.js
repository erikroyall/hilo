/*global module:false*/

module.exports = function(grunt) {

  "use strict";

  // Run: "grunt --no-color --force" without the quotes
  // and keep it clean
  
  grunt.initConfig({
    
    concat: {
      options: {
        stripBanners: true
      },
      dist: {
        src: [
          "scripts/prettify.js",
          "scripts/run_prettify.js",
          "scripts/hilo-dev.js",
          "scripts/app.js"
          ],
        dest: "scripts/script.js"
      }
    },
    uglify: {
      hilo: {
        src: "scripts/script.js",
        dest: "scripts/script.min.js"
      }
    },
    watch: {
      gruntfile: {
        files: "Gruntfile.js",
        tasks: ["concat", "uglify:hilo"]
      },
      hilo: {
        files: "<%= concat.dist.src %>",
        tasks: ["concat", "uglify:hilo"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  
  grunt.registerTask("default", ["concat", "uglify:hilo", "watch"]);

};
