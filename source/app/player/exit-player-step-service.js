(function() {
  'use strict';

  angular
    .module('otusjs.player.standalone')
    .service('ExitPlayerStepService', Service);

  Service.$inject = [
    'otusjs.model.activity.ActivityFacadeService'
  ];

  function Service(ActivityFacadeService) {
    var self = this;
    var _currentItem;

    /* Public methods */
    self.beforeEffect = beforeEffect;
    self.effect = effect;
    self.afterEffect = afterEffect;
    self.getEffectResult = getEffectResult;

    function beforeEffect(pipe, flowData) { }

    function effect(pipe, flowData) {
      //TODO: TIAGO
      console.log(ActivityFacadeService);

    }

    function afterEffect(pipe, flowData) {
    }

    function getEffectResult(pipe, flowData) {
      return flowData;
    }
  }
})();
