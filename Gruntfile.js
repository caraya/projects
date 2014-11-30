(function () {
  'use strict';
  module.exports = function (grunt) {
    // require it at the top and pass in the grunt instance
    // it will measure how long things take for performance
    //testing
    require('time-grunt')(grunt);

    // load-grunt will read the package file and automatically
    // load all our packages configured there. 
    // Yay for laziness
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

      // Hint the grunt file and all files under js/ 
      // and one directory below
      jshint: {
        files: ['Gruntfile.js', 'js/{,*/}*.js'],
        options: {
          reporter: require('jshint-stylish')
          // options here to override JSHint defaults
        }
      },

      autoprefixer: {
        options: {
          browsers: ['last 2 versions']
        },
        main: {
          files: [{
            expand: true,
            cwd: 'css',
            src: [
              '*.css', 
              '!*.prefixed.css',
              '!*.min.css'
            ],
            dest: 'css',
            ext: '.prefixed.css',
            extDot: 'last'
          }]
        }
      },

      //Can't seem to make the copy task create the directory if it doesn't
      // exist so we go to another task to create the fn directory

      mkdir: {
        build: {
          options: {
            create: ['build']
          },
        },
      },

      'copy': {
        build: {
          files: [
            {
              expand: true,
              src: [
                  'js/*.js',
                  'css/*.css',
                  'lib/**/*',
                  '*.html',
                  'controllers/**/*',
                  'directives/**/*'
                ],
              dest: 'build/'
            }
          ]
        }
      },

      clean: {
        production: [
          'css/*.prefixed.css',
          'build/'
        ]
      },

      'gh-pages': {
        options: {
          message: 'Content committed from Grunt gh-pages',
          base: './build',
          dotfiles: true
        },
        // These files will get pushed to the `
        // gh-pages` branch (the default)
        // We have to specifically remove node_modules
              src: [
                  'js/*.js',
                  'css/*.css',
                  'lib/**/*',
                  '*.html',
                  'controllers/**/*',
                  'directives/**/*'
                ],      },

      watch: {
        options: {
          nospawn: true,
        },
        // Watch all javascript files and hint them
        js: {
          files: ['js/{,*/}*.js'],
          tasks: ['jshint']
        },
        // watch all css files and auto prefix if needed
        styles: {
          files: ['css/{,*/}*.css'],
          tasks: ['autoprefixer:main']
        },
      },
    }); // closes initConfig

    grunt.task.registerTask(
      'publish', [
      'clean:production',
      'mkdir:build',
      'jshint',
      'autoprefixer:main',
      'copy:build',
      'gh-pages'
    ]);
  }; // closes module.exports
}()); // closes the use strict function