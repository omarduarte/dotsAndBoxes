// Karma configuration

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // lib files
      'app/lib/jquery/dist/jquery.js',

      // app - need to load feature modules first, otherwise app breaks
      'app/app.js',
      'app/models/**/*.js',
       
      // html templatess 
      'app/index.html',

      // all specs
      'app/test/**/*.js'
    ],

    // list of files to exclude
    exclude: [
      'karma.conf.js'
    ],    
    

    // progress reporter: lists each test run and whether they pass/fail
    // coverage reporter: creates coverage reports for every tested browser
    reporters: ['progress', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    browsers: ['Chrome', 'Safari'],

    // If browser does not capture in given timeout [ms], kill it
    singleRun: false,

    // report which specs run too slow
    reportSlowerThan: 500,

    // any additional plugins needed for testing
    plugins: [
      'karma-jasmine',      
      'karma-chrome-launcher',
      'karma-safari-launcher'
    ]
  });
};
