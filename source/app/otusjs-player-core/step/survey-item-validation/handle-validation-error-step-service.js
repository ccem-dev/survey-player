(function () {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.HandleValidationErrorStepService', Service);

  Service.$inject = [
    'otusjs.player.data.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    var self = this;
    var _currentItemService;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
      _currentItemService = ActivityFacadeService.getCurrentItem();
      pipe.skipStep = _currentItemService.shouldIgnoreResponseEvaluation();
    }

    function effect(pipe, flowData) {
      ActivityFacadeService.attachItemValidationError(flowData.validationResult);
    }

    function afterEffect(pipe, flowData) {
      for (var itemID in flowData.validationResult) {
        if (flowData.validationResult[itemID].hasError) {
          pipe.isFlowing = false;
          break;
        }
      }
    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
