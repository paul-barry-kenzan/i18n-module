var wiredep = require('wiredep')({devDependencies:true}).js;

module.exports = function (config) {

  var appFiles = [
    'src/**/*-module.js',
    'src/**/*.js',
    'src/**/*.test.js'
  ];

  config.set({
    basePath: './',

    frameworks: [
      'mocha',
      'chai',
      'sinon-chai'
    ],

    files: [].concat(wiredep, appFiles),

    reporters: ['dots'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_WARN,

    autoWatch: false,

    browsers: ['PhantomJS'],

    singleRun: true,

    concurrency: Infinity
  });
};