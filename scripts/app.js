'use strict';

(function (angular) {

  angular
    .module('i18nExampleApp', ['webui.i18n'])
    .config(function($translateProvider, tmhDynamicLocaleProvider, LocaleServiceProvider){
      $translateProvider.useMissingTranslationHandlerLog();

      $translateProvider.useStaticFilesLoader({
        prefix: './translations/locale-',
        suffix: '.json'
      });

      $translateProvider.determinePreferredLanguage();
      $translateProvider.useLocalStorage();

      tmhDynamicLocaleProvider.localeLocationPattern('./bower_components/angular-i18n/angular-locale_{{locale}}.js');

      // jshint camelcase: false
      // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
      LocaleServiceProvider.setSupportedLocales({
        ru_RU: 'Русский',
        es_ES: 'Espanol'
      });
    });

})(angular);