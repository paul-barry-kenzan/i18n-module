# i18n Module

## Overview
A simple AngularJS module that introduces the framework for internationalization.

## Information

## Installation

## Usage
```javascript
angular
    .module('i18nExampleApp', ['webui.i18n'])
    .config(function($translateProvider, tmhDynamicLocaleProvider, LocaleServiceProvider){

      // Use the $translateProvider from angular-translate to log an error if a translation is missing
      $translateProvider.useMissingTranslationHandlerLog();

      // Use the $translateProvider to set the translation file path
      $translateProvider.useStaticFilesLoader({
        prefix: './translations/locale-',
        suffix: '.json'
      });

      // Use the $translateProvider to determine the preferred language
      $translateProvider.determinePreferredLanguage();

      // Use the $translateProvider to choose to use local storage to store user selected locale
      $translateProvider.useLocalStorage();

      // Use tmhDynamicLocaleProvider to set the angular-i18n locale path
      tmhDynamicLocaleProvider.localeLocationPattern('./bower_components/angular-i18n/angular-locale_{{locale}}.js');

      // Use the LocaleServiceProvider to set the supported locales
      LocaleServiceProvider.setSupportedLocales({
        ru_RU: 'Русский',
        es_ES: 'Espanol'
      });
    });
```

## Testing

<dl>
  <dt>`npm test`</dt>
  <dd>Run the tests a single time, without a file watch</dd>
  <dt>`npm run test-watch`</dt>
  <dd>Run the tests, and watch for file changes</dd>
</dl>