// Karma configuration
// Generated on Tue Apr 21 2015 10:34:13 GMT+0200 (CEST)

module.exports = function(config) {
  'use strict';

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'requirejs', 'chai', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'app/bower_components/jquery/jquery.js', included: false},
      {pattern: 'app/bower_components/underscore/underscore.js', included: false},
      {pattern: 'app/bower_components/backbone/backbone.js', included: false},
      {pattern: 'app/bower_components/handlebars/handlebars.js', included: false},
      {pattern: 'app/bower_components/requirejs/require.js', included: false},
      {pattern: 'app/bower_components/modernizr/modernizr.js', included: false},
      {pattern: 'app/bower_components/jquery.cookie/jquery.cookie.js', included: false},
      {pattern: 'app/bower_components/lil-uuid/uuid.js', included: false},
      {pattern: 'app/bower_components/foundation/js/vendor/fastclick.js', included: false},
      {pattern: 'app/bower_components/foundation/js/foundation.js', included: false},
      {pattern: 'app/bower_components/sio-client/socket.io.js', included: false},


      {pattern: 'tests/**/*Test.js', included: false},
      {pattern: 'app/scripts/**/*.js', included: false},

      'tests/test-main.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/scripts/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'junit', 'coverage'],


    junitReporter: {
      outputFile: 'xunit.xml',
      suite: ''
    },


    coverageReporter: {
      type : 'html',
      dir : 'coverage/',
      subdir: '.'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
