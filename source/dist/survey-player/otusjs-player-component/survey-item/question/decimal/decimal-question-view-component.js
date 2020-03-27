(function () {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusDecimalQuestionView', {
      template:'<md-content layout-padding><div layout="row"><md-input-container md-no-float class="md-block" flex-gt-sm="45"><input type="number" step="any" ng-model="$ctrl.answer" ng-change="$ctrl.update()" ng-if="!$ctrl.mobileInput" ui-decimal placeholder="Insira um valor decimal" ng-disabled="$ctrl.view"> <input type="number" inputmode="decimal" step="any" ng-model="$ctrl.answer" ng-change="$ctrl.update()" ng-if="$ctrl.mobileInput" placeholder="Insira um valor decimal" ng-disabled="$ctrl.view"></md-input-container><md-input-container class="md-block" flex-gt-sm="45"><otus-label item-label="$ctrl.itemData.unit"></otus-label></md-input-container></div></md-content>',
      controller: "otusDecimalQuestionViewCtrl as $ctrl",
      bindings: {
        itemData: '<'
      }
    }).controller("otusDecimalQuestionViewCtrl", Controller);

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.view = true;

    self.$onInit = function () {
      self.answer = self.itemData.data.answer.value;
    };

  }
}());
