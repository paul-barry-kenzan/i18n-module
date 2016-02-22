'use strict';

(function (angular) {

  angular
      .module('km.i18n')
      .directive('neLocaleSelector', neLocaleSelector)
      .run(loadTemplate);

  function neLocaleSelector() {
    return {
      scope: {},
      restrict: 'EA',
      templateUrl: 'locale-selector-directive-template.html',
      controller: neLocaleSelectorController,
      controllerAs: 'LocaleSelector',
      bindToController: {
        label: '@labelText'
      }
    };

  }

  neLocaleSelectorController.$inject = ['LocaleService'];

  function neLocaleSelectorController(LocaleService) {
    var vm = this; // jshint ignore:line

    vm.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
    vm.localesDisplayNames = LocaleService.getLocalesDisplayNames();
    vm.visible = vm.localesDisplayNames && (vm.localesDisplayNames.length > 1);

    vm.changeLanguage = function (locale) {
      LocaleService.setLocaleByDisplayName(locale);
    };
  }

  loadTemplate.$inject = ['$templateCache'];

  function loadTemplate($templateCache){
    $templateCache.put('locale-selector-directive-template.html',
    '<form class="form-inline">' +
      '<div class="form-group language-select" ng-if="LocaleSelector.visible"> ' +
        '<label>' +
          '<span ng-show="LocaleSelector.label.length">{{LocaleSelector.label}}:</span>' +
          '<select class="form-control" ng-model="LocaleSelector.currentLocaleDisplayName" ng-options="localesDisplayName for localesDisplayName in LocaleSelector.localesDisplayNames" ng-change="LocaleSelector.changeLanguage(LocaleSelector.currentLocaleDisplayName)"></select>' +
        '</label>' +
      '</div>' +
    '</form>');
  }

})(angular);