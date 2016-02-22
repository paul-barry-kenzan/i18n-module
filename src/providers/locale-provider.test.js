'use strict';

// jshint camelcase: false
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
describe.only('Locale Service', function () {

  var $rootScope;
  var $log;
  var $translate;
  var $document;
  var LocaleService;
  var LocaleServiceProvider;
  var tmhDynamicLocale;
  var fakeModule;

  var defaultLocales;
  var customLocales;
  var mockDisplayNames;

  beforeEach(module('km.i18n'));

  describe('Provider Tests', function () {

    beforeEach(function () {

      fakeModule = angular.module('locale.test.module', [], function () {
      });

      fakeModule.config(function (_LocaleServiceProvider_) {
        LocaleServiceProvider = _LocaleServiceProvider_;
      });

      module('locale.test.module');

      inject(function (_LocaleService_) {
        LocaleService = _LocaleService_;
      });

      customLocales = {
        ru_RU: 'Русский',
        en_US: 'English'
      };

    });

    it('should expose a supportedLocales provider method', function () {
      expect(LocaleServiceProvider.setSupportedLocales).to.not.be.undefined;
    });

    it('should store the supported locales object', function () {
      LocaleServiceProvider.setSupportedLocales({ru_RU: 'Русский'});
      expect(LocaleService.getSupportedLocales()).to.deep.equal(customLocales);
    });

  });

  describe('Service Tests', function () {

    beforeEach(function () {
      fakeModule = angular.module('locale.test.module', [], function () {
      });

      fakeModule.config(function (_LocaleServiceProvider_) {
        LocaleServiceProvider = _LocaleServiceProvider_;
        LocaleServiceProvider.setSupportedLocales({ru_RU: 'Русский'});
      });

      module('locale.test.module');
    });

    beforeEach(module(function ($provide) {

      $provide.service('$translate', function ($q) {
        this.storage = angular.noop;
        this.storageKey = angular.noop;
        this.preferredLanguage = angular.noop;
        this.proposedLanguage = sinon.stub().returns('en_US');
        this.use = sinon.stub().returns($q.resolve('en_US'));

        $provide.service('tmhDynamicLocale', function () {
          this.set = angular.noop;
        });
      });

    }));

    beforeEach(inject(function (_$rootScope_, _$log_, _$translate_, _$document_, _tmhDynamicLocale_, _LocaleService_) {
      $rootScope = _$rootScope_;
      $log = _$log_;
      $translate = _$translate_;
      $document = _$document_;
      LocaleService = _LocaleService_;
      tmhDynamicLocale = _tmhDynamicLocale_;

      defaultLocales = {
        en_US: 'English'
      };

      mockDisplayNames = [
        'English',
        'Русский'
      ];
    }));

    describe('Service API', function () {

      it('should exist', function () {
        expect(LocaleService).to.not.be.undefined;
      });

      describe('Supported Locales', function () {

        it('should expose a getSupportedLocales provider method', function () {
          expect(LocaleService.getSupportedLocales).to.not.be.undefined;
        });

        it('should return an object with the locales', function () {
          expect(LocaleService.getSupportedLocales()).to.deep.equal(customLocales);
        });

      });

      describe('Locale Display Name', function () {

        it('should expose a getLocaleDisplayName method', function () {
          expect(LocaleService.getLocaleDisplayName).to.exist;
          expect(angular.isFunction(LocaleService.getLocaleDisplayName)).to.be.true;
        });

        it('should return the locale display name', function () {
          expect(LocaleService.getLocaleDisplayName()).to.equal(defaultLocales['en_US']);
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
          LocaleService.setLocaleByDisplayName(customLocales.ru_RU);

          expect(LocaleService.getLocaleDisplayName()).to.equal(customLocales.ru_RU);
        });

        it('should utilize the $translate.use method to load and apply the locale changes', function () {
          var spy = $translate.use;

          LocaleService.setLocaleByDisplayName(customLocales['en_US']);

          expect(spy).to.have.been.calledWith('en_US');
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
          $rootScope.$broadcast('$translateChangeSuccess', {language: 'en_US'});

          expect(document.documentElement.getAttribute('lang')).to.equal('en_US');
        });

        it('should utilize the tmhDynamicLocale.set method to load and apply updated locale', function () {
          var spy = sinon.spy(tmhDynamicLocale, 'set');

          $rootScope.$broadcast('$translateChangeSuccess', {language: 'en_US'});

          expect(spy).to.have.been.calledWith('en-us');

        });

      });

    });

  });

});