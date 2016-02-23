'use strict';

describe('Locale Selector Directive', function () {

  var $rootScope;
  var $compile;
  var scope;
  var vm;
  var elm;
  var LocaleService;

  var defaultTemplate = '<div ne-locale-selector>';

  beforeEach(module('webui.i18n'));

  beforeEach(module(function ($provide) {

    $provide.service('$translate', function () {
      this.storageKey = angular.noop;
      this.storage = angular.noop;
      this.preferredLanguage = angular.noop;
      this.statefulFilter = angular.noop;
      this.use = angular.noop;
      this.instant = angular.noop;
    });

    $provide.service('LocaleService', function () {
      this.getLocaleDisplayName = function () {
        return 'English';
      };

      this.getLocalesDisplayNames = function () {
        return [
          'Russian',
          'English'
        ];
      };

      this.setLocaleByDisplayName = angular.noop;
    });

  }));

  beforeEach(inject(function (_$rootScope_, _$compile_, _LocaleService_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    LocaleService = _LocaleService_;

    scope = $rootScope.$new();
  }));

  function compileDirective(template, scope) {
    var elm = angular.element(template);
    $compile(elm)(scope);
    scope.$apply();
    return elm;
  }

  it('should declare a currentLocaleDisplayName property', function () {
    elm = compileDirective(defaultTemplate, scope);
    vm = elm.controller('neLocaleSelector');
    expect(vm.currentLocaleDisplayName).to.exist;
  });

  it('should declare a localesDisplayNames array property', function () {
    elm = compileDirective(defaultTemplate, scope);
    vm = elm.controller('neLocaleSelector');
    expect(vm.localesDisplayNames).to.exist;
  });

  it('should declare a visible property', function () {
    elm = compileDirective(defaultTemplate, scope);
    vm = elm.controller('neLocaleSelector');
    expect(vm.visible).to.exist;
  });

  it('should expose a changeLanguage method', function () {
    elm = compileDirective(defaultTemplate, scope);
    vm = elm.controller('neLocaleSelector');
    expect(vm.changeLanguage).to.exist;
  });

  it('should utilize the LocaleService.setLocaleByDisplayName method to store the selected locale', function () {
    var spy = sinon.spy(LocaleService, 'setLocaleByDisplayName');

    elm = compileDirective(defaultTemplate, scope);
    vm = elm.controller('neLocaleSelector');

    vm.changeLanguage('Russian');

    expect(spy).to.have.been.calledWith('Russian');

  });

});