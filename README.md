# i18n Module

## Overview
A simple AngularJS module that introduces the framework for internationalization.

## Information
This library is a collection of resources necessary to enable internationalization in an AngularJS 1.x application.

### Dependencies
This collection includes the following dependencies

- [Angular v1.4.9](https://code.angularjs.org/1.4.9/angular.js)
- [Angular Cookies v1.4.9](https://code.angularjs.org/1.4.9/angular-cookies.js)
- [Angular Sanitize  v1.4.9](https://code.angularjs.org/1.4.9/angular-sanitize.js)
- [Angular Dynamic Locale v0.1.30](https://github.com/lgalfaso/angular-dynamic-locale/tree/0.1.30)
- [Angular i18n v1.4.9](https://code.angularjs.org/1.4.9/i18n/)
- [Angular Translate v2.9.0](https://github.com/angular-translate/angular-translate/tree/2.9.0)
- [Angular Translate handler log v2.9.0](https://github.com/angular-translate/bower-angular-translate-handler-log/tree/2.9.0)
- [Angular Static File Loader v2.9.0](https://github.com/angular-translate/bower-angular-translate-loader-static-files/tree/2.9.0)
- [Angular Local Storage v2.9.0](https://github.com/angular-translate/bower-angular-translate-storage-local/tree/2.9.0)

## Installation
As this package is not registered with Bower, you must specify a full path

`bower install git@github.com:ThomsonReuters-IPS/webui-i18n.git --save`

## Usage
### Providers

| Name | Package | Use |
| :--- | :------ | :-- |
| $translateProvider | Angular Translate | Configure $translate service |
| tmhDynamicLocaleProvider | Angular Dynamic Locale | Configure loading of locale translations |
| LocaleServiceProvider | This library | Configure supported locales |

### Services
| Name | Package | Methods |
| :--- | :------ | :-- |
| LocaleSerivce | This Library | getSupportedLocales()<br />getLocaleDisplayName()<br />setLocaleByDisplayName()<br />getLocalesDisplayNames()

### Directives
| Name | Package | Methods |
| :--- | :------ | :-- |
| neLocaleSelector | This library | Output a `<select>` element displaying the supported locale as options |

## Example
Filename: `app.js`
```javascript
'use strict';

(function(angular){

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

})(angular);
```
Filename: `index.html`
```html
<!doctype html>
<html lang="en_US">
    <head>
        <meta charset="UTF-8">
        <title>Internationalization Demo</title>

        <link rel="stylesheet" href="bower_components/bootstrap-css-only/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="bower_components/bootstrap-css-only/css/bootstrap-theme.min.css"/>
        <link rel="stylesheet" href="css/demo.css"/>
    </head>
    <body data-ng-app="i18nExampleApp" ng-cloak>

        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Internationalization (i18n) Example</a>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <!-- neLocaleSelector directive -->
                    <div data-ne-locale-selector data-label-text="Language" class="nav navbar-nav navbar-right"></div>
                </div>
            </div>
        </nav>
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12">
                    <div class="jumbotron">
                        <h2>{{"homepage.welcome" | translate}}</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <p>{{"homepage.paragraph.1" | translate}}</p>
                </div>
            </div>
        </div>
        <script src="bower_components/angular/angular.min.js"></script>
        <script src="bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
        <script src="bower_components/angular-cookies/angular-cookies.min.js"></script>
        <script src="bower_components/angular-dynamic-locale/dist/tmhDynamicLocale.min.js"></script>
        <script src="bower_components/angular-sanitize/angular-sanitize.min.js"></script>
        <script src="bower_components/angular-translate/angular-translate.min.js"></script>
        <script src="bower_components/angular-translate-handler-log/angular-translate-handler-log.min.js"></script>
        <script src="bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js"></script>
        <script src="bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js"></script>
        <script src="bower_components/angular-translate-storage-local/angular-translate-storage-local.min.js"></script>
        <script src="bower_components/i18n-module/src/i18n-module.js"></script>
        <script src="bower_components/i18n-module/src/providers/locale-provider.js"></script>
        <script src="bower_components/i18n-module/src/directives/locale-selector-directive.js"></script>

        <script src="scripts/app.js"></script>

    </body>
</html>
```

## Testing

<dl>
  <dt>`npm test`</dt>
  <dd>Run the tests a single time, without a file watch</dd>
  <dt>`npm run test-watch`</dt>
  <dd>Run the tests, and watch for file changes</dd>
</dl>