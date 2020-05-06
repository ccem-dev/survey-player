(function () {
  'use strict';

  angular
    .module('otusjs.player.core.step')
    .service('otusjs.player.core.step.UpdateItemTrackingStepService', Service);

  Service.$inject = [
    'otusjs.player.data.navigation.NavigationService',
    'otusjs.player.data.activity.CurrentItemService',
    'otusjs.player.core.player.PlayerService',
  ];

  function Service(NavigationService) {
    var self = this;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) {
    }

    function effect(pipe, flowData) {
      NavigationService.updateItemTracking();
    }

    function afterEffect(pipe, flowData) {
    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
