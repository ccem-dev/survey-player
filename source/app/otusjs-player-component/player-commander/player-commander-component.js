(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusPlayerCommander', {
      templateUrl: 'app/otusjs-player-component/player-commander/player-commander-template.html',
      controller: Controller,
      bindings: {
        onGoAhead: '&',
        onGoBack: '&',
        onPause: '&',
        onStop: '&',
        onIsLockingOpenClose: '&'
      }
    });

  Controller.$inject = [
    '$q',
    '$mdDialog',
    '$scope',
    '$document',
    '$element',
    '$timeout',
    'otusjs.player.core.player.OnProcessingService'
  ];

  function Controller($q, $mdDialog, $scope, $document, $element, $timeout,
                      OnProcessingService) {
    const SAVE_TITLE = 'Salvar Atividade';
    const SAVE_CONTENT = 'Você tem certeza que deseja salvar a atividade?';
    const CANCEL_TITLE = 'Cancelar Atividade';
    const CANCEL_CONTENT = 'Todos os dados, não salvos, serão perdidos. Você tem certeza que deseja cancelar?';

    const self = this;
    let pressedControl = false;

    /* Public methods */
    self.goBack = goBack;
    self.goAhead = goAhead;
    self.pause = pause;
    self.stop = stop;
    self.remove = remove;
    self.buttomStaticVarible = buttomStaticVarible;
    self.$onInit = onInit;
    self.$postLink = postLink;

    function onInit() {
      $scope.$parent.$ctrl.playerCommander = self;
    }

    function postLink() {
      shortcutAction();
    }

    function goAhead() {
      OnProcessingService.loadingAhead = true;
      OnProcessingService.isGoAheadDisabled = true;

      self.onGoAhead();
    }

    function goBack() {
      OnProcessingService.loadingBack = true;
      OnProcessingService.isGoBackDisabled = true;

      self.onGoBack();
    }

    function pause() {
      confirmDialog(SAVE_TITLE, SAVE_CONTENT).then(
        function () {
          self.onPause();
        });
    }

    function stop() {
      confirmDialog(CANCEL_TITLE, CANCEL_CONTENT).then(
        function () {
          self.onStop();
        });
    }

    function remove() {
      $element.remove();
    }

    function shortcutAction() {
      $(document).unbind('keydown').bind('keydown', function (event) {
        switch (event.key) {
          case 'Control': {
            pressedControl = true;
            break;
          }
          case 'ArrowLeft': {
            if (pressedControl) {
              event.preventDefault();
              $element.find('#previousQuestion').focus();
              self.goBack();
              $scope.$apply();
            }
            break;
          }
          case 'ArrowRight': {
            if (pressedControl) {
              event.preventDefault();
              $element.find('#nextQuestion').focus();
              self.goAhead();
              $scope.$apply();
            }
            break;
          }
          case 'End': {
            if (pressedControl) {
              $element.find('#cancelActivity').focus();
              self.stop();
            }
            break;
          }
          case 'Home': {
            if (pressedControl) {
              $element.find('#saveActivity').focus();
              self.pause();
            }
            break;
          }
          default:
            return;
        }
      });

      $(document).bind("keyup", function (event) {
        if (event.which === 17) {
          pressedControl = false;
          return false;
        }
      });
    }

    function confirmDialog(title, content) {
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

    function buttomStaticVarible() {
      self.onIsLockingOpenClose();
    }

  }
}());
