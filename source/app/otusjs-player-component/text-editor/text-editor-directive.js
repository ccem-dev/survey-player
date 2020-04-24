(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .directive('otusTextEditor', directive);

  directive.$inject = ['OtusTextEditorWidgetFactory'];

  function directive(OtusTextEditorWidgetFactory) {
    var ddo = {
      scope: {
        placeholder: '@',
        label: '<',
        ariaLabel: '@',
        leftIcon: '@',
        ngModel: '<'
      },
      templateUrl: 'app/otusjs-player-component/text-editor/text-editor.html',
      retrict: 'E',
      link: function linkFunc(scope, element) {
        scope.widget = OtusTextEditorWidgetFactory.create(scope, element);
      }
    };

    return ddo;
  }

}());
