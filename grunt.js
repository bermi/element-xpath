module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    lint: {
      files: ['grunt.js', 'element-xpath.js']
    },
    meta: {
      banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - https://github.com/bermi/element-xpath/ - © 2013 Bermi Ferrer <bermi@bermilabs.com> - MIT Licensed */"
    },
    min: {
      dist: {
        src: ['<banner>', 'element-xpath.js'],
        dest: 'element-xpath.min.js'
      }
    },
    jshint: {
      options: {
        bitwise: true,
        curly: true,
        eqeqeq: true,
        forin: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        nonew: true,
        plusplus: true,
        regexp: true,
        noempty: true,
        sub: true,
        undef: true,
        trailing: true,
        eqnull: true,
        browser: true,
        node: true,
        indent: 2,
        onevar: true,
        white: true
      },
      globals: {
        describe: true,
        expect: true,
        it: true,
        before: true
      }
    },
    uglify: {}
  });

  // Build task.
  grunt.registerTask('build', 'lint min');

  // Default task.
  grunt.registerTask('default', 'watch');

};