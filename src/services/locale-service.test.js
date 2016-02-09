'use strict';

// jshint camelcase: false
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
describe('Locale Service', function () {

  var $rootScope;
  var $log;
  var $translate;
  var $document;
  var LocaleService;
  var tmhDynamicLocale;

  var mockLOCALES;
  var mockDisplayNames;

  beforeEach(module('km.i18n'));

  beforeEach(module(function ($provide) {

    $provide.service('$translate', function () {
      this.storage = angular.noop;
      this.storageKey = angular.noop;
      this.preferredLanguage = angular.noop;
      this.use = function () {
        return 'en_US';
      };

      $provide.service('tmhDynamicLocale', function () {
        this.set = angular.noop;
      });
    });

    $provide.constant('LOCALES', {

      locales: {
        ru_RU: 'Русский',
        en_US: 'English'
      },

      preferredLocale: 'en_US'
    });

  }));

  beforeEach(inject(function (_$rootScope_, _$log_, _$translate_, _$document_, _LocaleService_, _tmhDynamicLocale_, _LOCALES_) {
    $rootScope = _$rootScope_;
    $log = _$log_;
    $translate = _$translate_;
    $document = _$document_;
    LocaleService = _LocaleService_;
    tmhDynamicLocale = _tmhDynamicLocale_;

    mockLOCALES = _LOCALES_;
    mockDisplayNames = ['Русский', 'English'];
  }));

  describe('Service API', function () {

    it('should exist', function () {
      expect(LocaleService).to.not.be.undefined;
    });

    describe('Locale Display Name', function () {

      it('should expose a getLocaleDisplayName method', function () {
        expect(LocaleService.getLocaleDisplayName).to.exist;
        expect(angular.isFunction(LocaleService.getLocaleDisplayName)).to.be.true;
      });

      it('should return the locale display name', function () {
        expect(LocaleService.getLocaleDisplayName()).to.equal(mockLOCALES.locales[mockLOCALES.preferredLocale]);
      });

    });

    describe('Setting Locale By Display Name', function () {

      it('should expose a setLocaleByDisplayName method', function () {
        expect(LocaleService.setLocaleByDisplayName).to.exist;
        expect(angular.isFunction(LocaleService.setLocaleByDisplayName)).to.be.true;
      });

      it('should $log a "Locale name is invalid." error when the provided locale name is not found', function () {
        var spy = sinon.spy($log, 'error');

        LocaleService.setLocaleByDisplayName('NOMATCH');

        expect(spy).to.have.been.calledWith('Locale name is invalid.');
      });

      it('should return undefined when the provided locale name is not found', function () {
        expect(LocaleService.setLocaleByDisplayName('NOMATCH')).to.be.undefined;
      });

      it('should update the active locale when provided a valid locale name', function () {
        LocaleService.setLocaleByDisplayName(mockLOCALES.locales.ru_RU);

        expect(LocaleService.getLocaleDisplayName()).to.equal(mockLOCALES.locales.ru_RU);
      });

      it('should utilize the $translate.use method to load and apply the locale changes', function () {
        var spy = sinon.spy($translate, 'use');

        LocaleService.setLocaleByDisplayName(mockLOCALES.locales[mockLOCALES.preferredLocale]);

        expect(spy).to.have.been.calledWith(mockLOCALES.preferredLocale);
      });

    });

    describe('Retrieve all Locale display names', function () {

      it('should expose a getLocalesDisplayNames method', function () {
        expect(LocaleService.getLocalesDisplayNames).to.exist;
        expect(angular.isFunction(LocaleService.getLocalesDisplayNames)).to.be.true;
      });

      it('should return an array of the supported locale display names', function () {
        expect(LocaleService.getLocalesDisplayNames()).to.deep.equal(mockDisplayNames);
      });

    });

  });

  describe('Service Events', function () {

    describe('angular-translate $translateChangeSuccess event', function () {

      it('should set the document "lang" attribute to the locale language', function () {
        $rootScope.$broadcast('$translateChangeSuccess', {language: mockLOCALES.preferredLocale});

        expect(document.documentElement.getAttribute('lang')).to.equal(mockLOCALES.preferredLocale);
      });

      it('should utilize the tmhDynamicLocale.set method to load and apply updated locale', function () {
        var spy = sinon.spy(tmhDynamicLocale, 'set');

        $rootScope.$broadcast('$translateChangeSuccess', {language: mockLOCALES.preferredLocale});

        expect(spy).to.have.been.calledWith(mockLOCALES.preferredLocale.toLowerCase().replace(/_/g, '-'));

      });

    });

  });

});