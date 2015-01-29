'use strict';

module.exports = function(grunt) {

  var version = "1.0.0";

  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*_test.js'],
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      platform: {
        options: {
          predef: ['SliderShow']
        },
        gruntfile: {
          src: [
          'slidershow/src/script/cmd.js',
          'slidershow/src/script/amd.js',
          'slidershow/src/script/platform.js'
          ]
        }
      },

      source: {
        src: ['slidershow/src/script/core.js']
      },
      test: {
        src: ['slidershow/test/**/*.js']
      },
      gruntfile:{
        src: ['slidershow/Gruntfile.js']
      }
    },

    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
      },
      source: {
        files: 'slidershow/src/**/*.js',
        tasks: ['jshint:source','rig','uglify']
      },
      template:{
        files:'slidershow/src/template/**/*.html',
        tasks:['tmod','rig','uglify']
      },
      lib:{
        files:'slidershow/lib/**/*.js',
        tasks:['rig','uglify']
      },
      test: {
        files: 'slidershow/test/**/*.js',
        tasks: ['jshint:test', 'nodeunit']
      },
    },

    /*模板工具*/
    

    rig: {
      options: {
        //banner: "'use strict';\n"
      },
      platform: {
        src: ['slidershow/src/script/platform.js'],
        dest: 'dist/slidershow-'+version+'.js'
      },
      cmd: {
        src: ['slidershow/src/script/cmd.js'],
        dest: 'dist/slidershow-cmd-'+version+'.js'
      },
      amd: {
        src: ['slidershow/src/script/amd.js'],
        dest: 'dist/slidershow-amd-'+version+'.js'
      }
    },

    uglify: {
      target: {
        files: grunt.file.expandMapping(['dist/*.js'], 'dist/', {
            rename: function(destBase, destPath) {
                return destPath.replace(destBase,'dist/min/').replace('.js', '.min.js');
            }
        })
      }
    },

    concurrent: {
    }

  });
  
  
    grunt.registerTask('default', ['jshint','rig','uglify', 'watch']);
  
};
