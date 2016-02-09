'use strict';

(function (angular) {

  angular
    .module('km.i18n')
    .service('LocaleService', LocaleService);

  LocaleService.$inject = ['$rootScope', '$log', '$translate', 'tmhDynamicLocale', 'LOCALES'];

  function LocaleService($rootScope, $log, $translate, tmhDynamicLocale, LOCALES) {

    // LOCALES should be provided by the consuming app.
    var _localesObj = LOCALES.locales;
    var _locales = Object.keys(_localesObj);
    var _localeDisplayNames = [];
    var _currentLocale = $translate.use();

    if (!_locales || _locales.length === 0) {
      $log.error('There are no _LOCALES provided');

    } else {
      _locales.forEach(function (locale) {
        _localeDisplayNames.push(_localesObj[locale]);
      });
      _updateLocale(_currentLocale);
    }

    this.getLocaleDisplayName = function () {
      return _localesObj[_currentLocale];
    };

    this.setLocaleByDisplayName = function (localeDisplayName) {
      _setLocale(_locales[_localeDisplayNames.indexOf(localeDisplayName)]);
    };

    this.getLocalesDisplayNames = function () {
      return _localeDisplayNames;
    };

    function _checkLocaleIsValid(locale) {
      return _locales.indexOf(locale) !== -1;
    }

    function _setLocale(locale) {
      if (!_checkLocaleIsValid(locale)) {
        $log.error('Locale name is invalid.');

      } else {
        _currentLocale = locale;
        $translate.use(_currentLocale);
      }
    }

    function _updateLocale(locale) {
      document.documentElement.setAttribute('lang', locale);
      tmhDynamicLocale.set(locale.toLowerCase().replace(/_/g, '-'));
    }

    $rootScope.$on('$translateChangeSuccess', function (event, data) {
      _updateLocale(data.language);
    });

  }

})(angular);