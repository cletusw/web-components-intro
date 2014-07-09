'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  grunt.initConfig({
    watch: {
      options: {
        livereload: {
          liveCSS: false
        }
      },
      other: {
        files: [
          '*.html',
          '*.js',
          '*.css'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.')
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    }
  });

  grunt.registerTask('serve', [
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('start', function() {
    // Instruct this task to wait until we call the done() method to continue
    var done = this.async();

    grunt.util.spawn({
      grunt: true,
      args: ['serve']
    });

    grunt.util.spawn({
      cmd: 'sh',
      args: ['git-step.sh', '--root-offset', '1'],
      opts: {
        stdio: 'inherit'
      }
    }, done);
  });

  grunt.registerTask('default', ['start']);
};
