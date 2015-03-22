

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },

    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      css: {
        files: [
          'public/css/*.css',
          'public/sass/*.scss'
        ],
        tasks: ['develop', 'build'],
        options: {
          livereload: reloadPort
        },
      },
      views: {
        files: [
          'app/views/*.jade',
          'app/views/**/*.jade'
        ],
        options: { livereload: reloadPort }
      }
    },

    bower_concat: {
      all: {
        dest: 'public/js/bower.js',
        cssDest: 'public/css/bower.css',
        exclude: [
          'sass-web-fonts',
          'bourbon'
        ],
        mainFiles: ['../components/bourbon/app/assets/stylesheets/_bourbon.scss']
      }
    },

    uglify: {
      bower: {
        options: {
          mangle: true,
          compress: true
        },
        files: {
          'public/js/bower.min.js': 'public/js/bower.js',
        }
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'public/css',
          src: ['*.css', '!*.min.css'],
          dest: 'public/css',
          ext: '.min.css'
        }]
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'public/sass',
          src: ['*.scss'],
          dest: 'public/css',
          ext: '.css'
        }]
      }
    },

    mocha_istanbul: {
      coverage: {
        src: 'test',
        options: {
          mask: '*.spec.js'
        }
      },
      coveralls: {
        src: ['test'],
        options: {
          coverage: true,
          check: {
            lines: 75,
            statements: 75
          },
          root: './',
          reportFormats: ['cobertura', 'lcovonly', 'html']
        }
      }
    },
    istanbul_check_coverage: {
      default: {
        options: {
          coverageFolder: 'coverage*',
          check: {
            lines: 80,
            statements: 80
          }
        }
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

    grunt.event.on('coverage', function(lcov, done){
    require('coveralls').handleInput(lcov, function(err){
        if (err) {
            return done(err);
        }
        done();
    });
  });

  grunt.registerTask('coveralls', ['mocha_istanbul:coveralls']);
  grunt.registerTask('coverage', ['mocha_istanbul:coverage']);

  grunt.registerTask('build', [
    'bower_concat',
    'uglify:bower',
    'sass',
    'cssmin'
  ]);

  grunt.registerTask('default', [
    'develop',
    'watch'
  ]);
};
