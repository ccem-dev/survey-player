(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusSurveyBackCover', {
      templateUrl: 'app/otusjs-player-component/survey-back-cover/survey-back-cover-template.html',
      controller: Controller,
      bindings: {
        onFinalize: '&',
        onStop: '&'
      }
    });

  Controller.$inject = [
    '$q',
    '$mdDialog',
    '$scope',
    'otusjs.player.data.activity.ActivityFacadeService',
    'otusjs.player.core.player.PlayerService'
  ];


  function Controller($q, $mdDialog, $scope, ActivityFacadeService, PlayerService) {
    const self = this;
    const CANCEL_TITLE = 'Sair da Atividade';
    const CANCEL_CONTENT = 'Todos os dados, não salvos, serão perdidos. Você tem certeza que deseja sair?';

    /* Public methods */
    self.$onInit = onInit;
    self.finalize = finalize;
    self.stop = stop;


    function onInit() {
      // $scope.$parent.$ctrl.playerBackCover = self;
      const activity = ActivityFacadeService.getCurrentSurvey().getSurvey();
      self.title = activity.getName();
    }

    function finalize() {
      PlayerService.eject();
    }

    function stop() {
      _confirmDialog(CANCEL_TITLE, CANCEL_CONTENT).then(
        function () {
          PlayerService.stop();
        });
    }

    function _confirmDialog(title, content) {
      var deferred = $q.defer();
      $mdDialog.show($mdDialog.confirm()
        .title(title)
        .textContent(content)
        .ariaLabel('Confirmar ação de atalho:' + title)
        .ok('Ok')
        .cancel('Cancelar')
      ).then(function () {
        deferred.resolve();
      }, function () {
        deferred.reject();
      });
      return deferred.promise;
    }
  }
}());
