(function () {
  'use strict';

  angular
    .module('otusjs.player.core.phase')
    .service('otusjs.player.core.phase.PlayerStartActionService', Service);

  Service.$inject = [
    'otusjs.player.core.phase.ActionPipeService',
    'otusjs.player.core.phase.PrePlayerStartActionService',
    'otusjs.player.core.phase.ExecutionPlayerStartActionService',
    'otusjs.player.core.phase.PostPlayerStartActionService'
  ];

  function Service(ActionPipeService, PrePlayerStartActionService, ExecutionPlayerStartActionService, PostPlayerStartActionService) {
    var self = this;

    /* Public methods */
    self.PrePlayerStartActionService = PrePlayerStartActionService;
    self.ExecutionPlayerStartActionService = ExecutionPlayerStartActionService;
    self.PostPlayerStartActionService = PostPlayerStartActionService;
    self.execute = execute;

    function execute() {
      var phaseData = PrePlayerStartActionService.execute(ActionPipeService.flowData);
      phaseData = ExecutionPlayerStartActionService.execute(phaseData);
      PostPlayerStartActionService.execute(phaseData);
    }
  }
})();
