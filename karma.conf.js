module.exports = function (config) {
  config.set({

    basePath: './',

    frameworks: ['mocha', 'chai', 'sinon-chai'],

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-*/angular-*.js',
      'bower_components/angular-dynamic-locale/dist/tmhDynamicLocale.js',
      'src/**/*-module.js',
      'src/**/*.js',
      'src/**/*.test.js'
    ],

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