(function () {

  'use strict';

  angular.module('otusjs.player.standalone')
    .service('LoginService', Service);

  Service.$inject = [
    '$http',
    'SurveyApiService',
    '$mdDialog',
    '$rootScope'
  ];

  function Service($http, SurveyApiService, $mdDialog, $rootScope) {
    var self = this;
    self.isAuthenticated = isAuthenticated;
    self.authenticate = authenticate;

    const TITLE_LOGOUT = 'USUÁRIO CONECTADO';
    const CONTENT_LOGOUT = 'Deseja realmente sair?';
    const CONTENT_OFFLINE_LOGOUT = 'Você esta offline, deseja realmente sair?';
    const ARIA_LABEL_LOGOUT = 'Logout';
    const YES = 'Sim';
    const NO = 'Não';
    const AUTHENTICATED_USER = 'Usuário autenticado.';
    const ERROR_LOGIN = 'Email/Senha incorretos.';
    const USER_DESCONNECT = 'Usuário desconectado.';

    function isAuthenticated() {
      var _token = SurveyApiService.getAuthToken();
      return _token;
    }

    function authenticate() {
      if (!self.isAuthenticated()) {
        return _login();
      }
      return _logout();
    }

    function _login() {
      return $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/utils/login-template.html',
        parent: angular.element(document.body),
        clickOutsideToClose: true
      }).then(function (response) {
        return response;
      });
    }

    function _logout() {
      var confirm = $mdDialog.confirm()
        .title(TITLE_LOGOUT)
        .ariaLabel(ARIA_LABEL_LOGOUT)
        .ok(YES)
        .cancel(NO);

      if($rootScope.online){
        confirm.textContent(CONTENT_LOGOUT)
      } else {
        confirm.textContent(CONTENT_OFFLINE_LOGOUT)
      }

      return $mdDialog.show(confirm).then(function() {
        SurveyApiService.clearSession();
        SurveyApiService.setLoggedUser();
        return USER_DESCONNECT;
      });
    }

    function DialogController($scope, $mdDialog, $http, SurveyApiService) {
      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      function Auth(email, password) {
        return {email, password};
      }

      $scope.login = function () {
        var _auth = Auth($scope.emailUser, $scope.passUser);
        $http.post(SurveyApiService.getLoginUrl(), _auth).then(function (response) {
          var user = response['data']['data'];
          SurveyApiService.setLoggedUser(user).then(function () {
            $mdDialog.hide(AUTHENTICATED_USER);
          });
        }).catch(function (err) {
          $mdDialog.hide(ERROR_LOGIN);
        });
      };

      $scope.isValid = function () {
        return $scope.emailUser && $scope.passUser;
      };

      $scope.onEnter = function(event) {
        if (event.which === 13 && !SurveyApiService.getAuthToken()){
          $scope.login()
        }
      };
    }
  }
})();
