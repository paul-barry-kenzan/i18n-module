'use strict';

(function (angular) {

  angular
      .module('km.i18n')
      .provider('LocaleService', LocaleProvider);

  LocaleProvider.$inject = [];

  function LocaleProvider() {

    var _this = this;
    var _localesObj = {
      locales: {
        en_US: 'English'
      },
      preferredLocale: 'en_US'
    };
    var _locales;
    var _localeDisplayNames = [];
    var _currentLocale;

    _this.setSupportedLocales = function(localObj){
      _localesObj.locales = angular.extend(_localesObj.locales, localObj);
      _locales = Object.keys(_localesObj);
    };

    _this.$get = [
      '$rootScope',
      '$log',
      '$translate',
      'tmhDynamicLocale',
      function ($rootScope, $log, $translate, tmhDynamicLocale) {

        _currentLocale = $translate.use();
        _locales = Object.keys(_localesObj.locales);

        if (!_locales || _locales.length === 0) {
          $log.error('There are no _LOCALES provided');

        } else {
          _locales.forEach(function (locale) {
            _localeDisplayNames.push(_localesObj.locales[locale]);
          });
          _updateLocale(_currentLocale);
        }

        function getSupportedLocales (){
          return _localesObj.locales;
        }

        function getLocaleDisplayName () {
          return _localesObj.locales[_currentLocale];
        }

        function setLocaleByDisplayName (localeDisplayName) {
          _setLocale(_locales[_localeDisplayNames.indexOf(localeDisplayName)]);
        }

        function getLocalesDisplayNames () {
          return _localeDisplayNames;
        }

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
          if(locale){

          document.documentElement.setAttribute('lang', locale);
          tmhDynamicLocale.set(locale.toLowerCase().replace(/_/g, '-'));
          }
        }

        $rootScope.$on('$translateChangeSuccess', function (event, data) {
          _updateLocale(data.language);
        });

        return {
          getSupportedLocales: getSupportedLocales,
          getLocaleDisplayName: getLocaleDisplayName,
          setLocaleByDisplayName: setLocaleByDisplayName,
          getLocalesDisplayNames: getLocalesDisplayNames
        }

      }
    ];
  }

})(angular);