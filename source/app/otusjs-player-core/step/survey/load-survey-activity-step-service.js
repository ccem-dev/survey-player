(function () {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.LoadSurveyActivityStepService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.data.navigation.NavigationService'
  ];

  function Service(ActivityFacadeService, NavigationService) {
    var self = this;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
    }

    function effect(pipe, flowData) {
      ActivityFacadeService.setup();
      NavigationService.initialize();
    }

    function afterEffect(pipe, flowData) {
    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
